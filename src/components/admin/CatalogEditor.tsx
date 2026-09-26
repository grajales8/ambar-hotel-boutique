"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Trash2,
  Plus,
  ChevronDown,
  ChevronUp,
  Package,
  Tags,
  FolderTree,
  GripVertical,
  RotateCcw,
  Star,
  ImagePlus,
} from "lucide-react";
import { MenuItem, MenuCategory, Subcategory } from "@/lib/types";
import { loadCollection, saveCollection, debounce } from "@/lib/storage";
import { formatCOP } from "@/lib/cart-context";
import ImageUploader from "@/components/admin/ImageUploader";

function orderByOrder<T extends { order?: number; id: string }>(list: T[]): T[] {
  return [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || String(a.id).localeCompare(String(b.id)));
}

function normalizeSubcategoryFromLegacy(
  input: string | undefined,
  subcategories: Subcategory[]
): string | undefined {
  if (!input) return undefined;
  if (subcategories.some((s) => s.id === input)) return input;
  const found = subcategories.find((s) => s.label.trim().toLowerCase() === input.trim().toLowerCase());
  if (found) return found.id;
  return undefined;
}

function reorderInPlace<T>(list: T[], fromIndex: number, toIndex: number): T[] {
  const next = [...list];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
}

export default function CatalogEditor({
  storageKey,
  categoriesStorageKey,
  initialCategories,
  initialItems,
  allowGallery = true,
}: {
  storageKey: string;
  categoriesStorageKey: string;
  initialCategories: MenuCategory[];
  initialItems: MenuItem[];
  allowGallery?: boolean;
}) {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string>(initialCategories[0]?.id ?? "");
  const [expandedCatId, setExpandedCatId] = useState<string | null>(initialCategories[0]?.id ?? null);
  const [restoring, setRestoring] = useState(false);

  const [dragCatId, setDragCatId] = useState<string | null>(null);
  const [dragSubId, setDragSubId] = useState<string | null>(null);
  const [dragItemId, setDragItemId] = useState<string | null>(null);

  const activeCategory = categories.find((c) => c.id === activeCategoryId);
  const filteredItems = items.filter((it) => it.categoryId === activeCategoryId);

  function onDropCategory(dropTargetId: string) {
    if (!dragCatId || dragCatId === dropTargetId) return;
    const from = categories.findIndex((c) => c.id === dragCatId);
    const to = categories.findIndex((c) => c.id === dropTargetId);
    if (from < 0 || to < 0) return;
    persistCategories(reorderInPlace(categories, from, to));
  }

  function onDropSubcategoryWithin(categoryId: string, dropTargetId: string) {
    if (!dragSubId || dragSubId === dropTargetId) return;
    const cat = categories.find((c) => c.id === categoryId);
    if (!cat) return;
    const subs = cat.subcategories;
    const from = subs.findIndex((s) => s.id === dragSubId);
    const to = subs.findIndex((s) => s.id === dropTargetId);
    if (from < 0 || to < 0) return;
    const nextSubs = reorderInPlace(subs, from, to);
    persistCategories(
      categories.map((c) => (c.id === categoryId ? { ...c, subcategories: nextSubs } : c))
    );
  }

  function onDropItemWithin(categoryId: string, dropTargetId: string) {
    if (!dragItemId || dragItemId === dropTargetId) return;
    const pool = items.filter((it) => it.categoryId === categoryId);
    const fromPool = pool.findIndex((i) => i.id === dragItemId);
    const toPool = pool.findIndex((i) => i.id === dropTargetId);
    if (fromPool < 0 || toPool < 0) return;
    const nextPool = reorderInPlace(pool, fromPool, toPool);
    const out: MenuItem[] = [];
    const byCat = new Map<string, MenuItem[]>();
    for (const it of items) {
      if (!byCat.has(it.categoryId)) byCat.set(it.categoryId, []);
      if (it.categoryId === categoryId) continue;
      byCat.get(it.categoryId)!.push(it);
    }
    byCat.set(categoryId, nextPool);
    for (const c of categories) {
      const lst = byCat.get(c.id);
      if (lst) out.push(...lst);
    }
    persistItems(out);
  }

  function addItemInto(categoryId: string) {
    const id = `${storageKey}-${Date.now()}`;
    const next: MenuItem = {
      id,
      categoryId,
      subcategory: undefined,
      name: "Nuevo producto",
      description: "",
      price: 0,
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
      available: true,
    };
    persistItems([...items, next]);
  }

  const onDropSubcategory = onDropSubcategoryWithin.bind(null, activeCategoryId);
  const onDropItem = onDropItemWithin.bind(null, activeCategoryId);

  useEffect(() => {
    let active = true;
    Promise.all([
      loadCollection<MenuCategory>(categoriesStorageKey, initialCategories),
      loadCollection<MenuItem>(storageKey, initialItems),
    ]).then(([cats, its]) => {
      if (!active) return;
      const sortedCats = orderByOrder(cats);
      const mappedItems = its.map((it) => {
        const cat = sortedCats.find((c) => c.id === it.categoryId);
        if (!cat) return it;
        const newSub = normalizeSubcategoryFromLegacy(it.subcategory, cat.subcategories);
        if (newSub === it.subcategory) return it;
        return { ...it, subcategory: newSub };
      });
      setCategories(sortedCats);
      setItems(mappedItems);
      setActiveCategoryId((prev) =>
        sortedCats.some((c) => c.id === prev) ? prev : sortedCats[0]?.id ?? prev
      );
      setLoading(false);
    });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey, categoriesStorageKey]);

  const debouncedSaveItems = useMemo(
    () =>
      debounce((next: MenuItem[]) => {
        saveCollection(storageKey, next).then(() => {
          setSaved(true);
          setTimeout(() => setSaved(false), 1200);
        });
      }, 700),
    [storageKey]
  );

  const debouncedSaveCategories = useMemo(
    () =>
      debounce((next: MenuCategory[]) => {
        saveCollection(categoriesStorageKey, next).then(() => {
          setSaved(true);
          setTimeout(() => setSaved(false), 1200);
        });
      }, 700),
    [categoriesStorageKey]
  );

  function persistItems(next: MenuItem[]) {
    // Reindexa order por categoría (estable) para que drag & drop de productos
    // dentro de una categoría sí quede guardado y se renderice en ese orden al recargar.
    const byCat = new Map<string, number>();
    const indexed = next.map((it) => {
      const n = (byCat.get(it.categoryId) ?? 0) + 1;
      byCat.set(it.categoryId, n);
      return { ...it, order: n };
    });
    setItems(indexed);
    debouncedSaveItems(indexed);
  }

  function persistCategories(next: MenuCategory[]) {
    const reordered = next.map((c, i) => ({
      ...c,
      order: i + 1,
      subcategories: (c.subcategories ?? []).map((s, j) => ({ ...s, order: j + 1 })),
    }));
    setCategories(reordered);
    debouncedSaveCategories(reordered);
  }

  function updateItem(id: string, patch: Partial<MenuItem>) {
    persistItems(items.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }
  function removeItem(id: string) {
    persistItems(items.filter((it) => it.id !== id));
  }
  function moveItem(id: string, direction: "up" | "down") {
    const idx = items.findIndex((it) => it.id === id);
    if (idx < 0) return;
    if (direction === "up" && idx === 0) return;
    if (direction === "down" && idx === items.length - 1) return;
    const next = [...items];
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    [next[idx], next[swapIdx]] = [next[swapIdx], next[idx]];
    persistItems(next);
  }

  function addCategory() {
    const id = `${categoriesStorageKey}-cat-${Date.now()}`;
    const nextCat: MenuCategory = {
      id,
      name: `Nueva categoría ${categories.length + 1}`,
      order: categories.length + 1,
      subcategories: [],
    };
    persistCategories([...categories, nextCat]);
    setActiveCategoryId(id);
  }

  function updateCategory(id: string, patch: Partial<MenuCategory>) {
    persistCategories(
      categories.map((c) => (c.id === id ? { ...c, ...patch } : c))
    );
  }

  function removeCategory(id: string) {
    const next = categories.filter((c) => c.id !== id);
    persistCategories(next);
    persistItems(items.map((it) => (it.categoryId === id ? { ...it, categoryId: next[0]?.id ?? "" } : it)));
    if (activeCategoryId === id) {
      setActiveCategoryId(next[0]?.id ?? "");
    }
  }

  function moveCategory(id: string, direction: "up" | "down") {
    const idx = categories.findIndex((c) => c.id === id);
    if (idx < 0) return;
    if (direction === "up" && idx === 0) return;
    if (direction === "down" && idx === categories.length - 1) return;
    const next = [...categories];
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    [next[idx], next[swapIdx]] = [next[swapIdx], next[idx]];
    persistCategories(next);
  }

  async function restoreSeedDefaults() {
    try {
      setRestoring(true);
      // 1) Guardamos categorías iniciales (sobrescribe en Firestore,
      //    crea las que faltan, borra las que sobran).
      await saveCollection(categoriesStorageKey, initialCategories);
      // 2) Guardamos items iniciales.
      const sortedCats = orderByOrder(initialCategories);
      const mappedItems = initialItems.map((it) => {
        const cat = sortedCats.find((c) => c.id === it.categoryId);
        if (!cat) return it;
        const newSub = normalizeSubcategoryFromLegacy(it.subcategory, cat.subcategories);
        if (newSub === it.subcategory) return it;
        return { ...it, subcategory: newSub };
      });
      await saveCollection(storageKey, mappedItems);
      // 3) Seteamos estado local (no esperamos al loadCollection useEffect,
      //    para que se vean los cambios inmediatamente).
      setCategories(sortedCats);
      setActiveCategoryId(sortedCats[0]?.id ?? "");
      setExpandedCatId(sortedCats[0]?.id ?? null);
      const byCat = new Map<string, number>();
      const indexed = mappedItems.map((it) => {
        const n = (byCat.get(it.categoryId) ?? 0) + 1;
        byCat.set(it.categoryId, n);
        return { ...it, order: n };
      });
      setItems(indexed);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } finally {
      setRestoring(false);
    }
  }

  function addSubcategory(categoryId: string) {
    const cat = categories.find((c) => c.id === categoryId);
    if (!cat) return;
    const id = `${categoryId}-sub-${Date.now()}`;
    const newSub: Subcategory = {
      id,
      label: `Subcategoría ${cat.subcategories.length + 1}`,
      order: cat.subcategories.length + 1,
    };
    persistCategories(
      categories.map((c) =>
        c.id === categoryId ? { ...c, subcategories: [...c.subcategories, newSub] } : c
      )
    );
  }

  function updateSubcategory(categoryId: string, subId: string, patch: Partial<Subcategory>) {
    persistCategories(
      categories.map((c) =>
        c.id === categoryId
          ? {
              ...c,
              subcategories: c.subcategories.map((s) => (s.id === subId ? { ...s, ...patch } : s)),
            }
          : c
      )
    );
  }

  function removeSubcategory(categoryId: string, subId: string) {
    persistCategories(
      categories.map((c) =>
        c.id === categoryId
          ? { ...c, subcategories: c.subcategories.filter((s) => s.id !== subId) }
          : c
      )
    );
    persistItems(
      items.map((it) =>
        it.categoryId === categoryId && it.subcategory === subId
          ? { ...it, subcategory: undefined }
          : it
      )
    );
  }

  function moveSubcategory(categoryId: string, subId: string, direction: "up" | "down") {
    const cat = categories.find((c) => c.id === categoryId);
    if (!cat) return;
    const idx = cat.subcategories.findIndex((s) => s.id === subId);
    if (idx < 0) return;
    if (direction === "up" && idx === 0) return;
    if (direction === "down" && idx === cat.subcategories.length - 1) return;
    const subs = [...cat.subcategories];
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    [subs[idx], subs[swapIdx]] = [subs[swapIdx], subs[idx]];
    persistCategories(
      categories.map((c) => (c.id === categoryId ? { ...c, subcategories: subs } : c))
    );
  }

  function addItem() {
    const id = `${storageKey}-${Date.now()}`;
    const next: MenuItem = {
      id,
      categoryId: activeCategoryId || categories[0]?.id || "",
      subcategory: undefined,
      name: "Nuevo producto",
      description: "",
      price: 0,
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
      available: true,
    };
    persistItems([...items, next]);
  }

  // --- Galería de imágenes por producto (Minibar / Restaurante / Boutique) ---
  function getItemImages(item: MenuItem): string[] {
    if (Array.isArray(item.images) && item.images.length > 0) return item.images;
    return item.image ? [item.image] : [];
  }
  function setItemImages(itemId: string, nextImages: string[]) {
    const patch: Partial<MenuItem> = { images: nextImages };
    if (nextImages.length > 0) patch.image = nextImages[0];
    updateItem(itemId, patch);
  }
  function addItemImage(itemId: string, url: string) {
    if (!url) return;
    const cur = items.find((it) => it.id === itemId);
    setItemImages(itemId, [...getItemImages(cur!), url]);
  }
  function removeItemImage(itemId: string, index: number) {
    const item = items.find((it) => it.id === itemId);
    if (!item) return;
    setItemImages(itemId, getItemImages(item).filter((_, i) => i !== index));
  }
  function moveItemImage(itemId: string, index: number, direction: "up" | "down") {
    const item = items.find((it) => it.id === itemId);
    if (!item) return;
    const arr = getItemImages(item);
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= arr.length) return;
    const next = [...arr];
    [next[index], next[targetIdx]] = [next[targetIdx], next[index]];
    setItemImages(itemId, next);
  }
  function makeItemImageCover(itemId: string, index: number) {
    const item = items.find((it) => it.id === itemId);
    if (!item || index === 0) return;
    const arr = getItemImages(item);
    const [picked] = arr.splice(index, 1);
    arr.unshift(picked);
    setItemImages(itemId, arr);
  }

  if (loading) {
    return <p className="text-sm text-[var(--color-ink-soft)]">Cargando…</p>;
  }

  return (
    <div className="space-y-8">
      <div className="mb-2 flex items-center justify-between gap-3 flex-wrap">
        <p className="text-sm text-[#D4CCBF]">
          {items.length} productos · {categories.length} categorías · cambios guardados automáticamente
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={restoreSeedDefaults}
            disabled={restoring}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm text-[#F5EFE6] active:scale-95 transition-transform disabled:opacity-50"
            style={{
              border: "1px solid rgba(184,147,92,0.35)",
              backgroundColor: "rgba(184,147,92,0.08)",
            }}
            aria-label="Cargar productos demo desde el seed (sobrescribe Firestore)"
            title="Restaura los productos/datos iniciales de ejemplo para esta sección (sobrescribe los datos actuales en Firestore)."
          >
            <RotateCcw size={14} className={`text-[#B8935C] ${restoring ? "animate-spin" : ""}`} strokeWidth={2.2} />
            {restoring ? "Cargando…" : "Restaurar datos iniciales"}
          </button>
          {saved && <span className="text-xs font-medium text-emerald-500 shrink-0">Guardado ✓</span>}
        </div>
      </div>

      {/* CATEGORIES (ACORDEÓN: cada categoría expandible muestra sus subcats + sus productos) */}
      <section
        className="rounded-2xl bg-[#1E1C1A] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
        style={{ border: "1px solid rgba(184,147,92,0.22)" }}
      >
        <header className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <FolderTree size={18} className="text-[#B8935C]" />
            <h3 className="text-[#F5EFE6] text-lg font-semibold">Categorías</h3>
            <span className="text-xs text-[#D4CCBF]">
              (agarrar ⋮⋮ para reordenar · flecha ↓ para desplegar)
            </span>
          </div>
          <button
            onClick={addCategory}
            className="flex items-center gap-2 rounded-full bg-[#2A2724] px-4 py-2 text-sm text-[#F5EFE6] active:scale-95"
            style={{ border: "1px solid rgba(184,147,92,0.28)" }}
          >
            <Plus size={15} className="text-[#B8935C]" />
            Nueva categoría
          </button>
        </header>

        <div className="space-y-3">
          {categories.map((cat, idx) => {
            const isActive = cat.id === activeCategoryId;
            const isDragging = dragCatId === cat.id;
            const isExpanded = expandedCatId === cat.id;
            const catItems = items.filter((it) => it.categoryId === cat.id);
            return (
              <div
                key={cat.id}
                draggable
                onDragStart={(e) => {
                  setDragCatId(cat.id);
                  e.dataTransfer.effectAllowed = "move";
                  e.dataTransfer.setData("text/plain", cat.id);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = "move";
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  onDropCategory(cat.id);
                  setDragCatId(null);
                }}
                onDragEnd={() => setDragCatId(null)}
                className={`rounded-xl transition-all ${
                  isDragging ? "opacity-60 scale-[0.99] ring-2 ring-[#B8935C]/60" : ""
                }`}
                style={{
                  border: isActive
                    ? "1px solid rgba(184,147,92,0.45)"
                    : "1px solid rgba(184,147,92,0.15)",
                  background: isActive ? "#2A2724" : "#161414",
                }}
              >
                {/* HEADER DE LA CATEGORÍA (fila principal) */}
                <div
                  className="flex flex-wrap items-center gap-2 px-3.5 py-3"
                  onClick={() => setActiveCategoryId(cat.id)}
                >
                  <span
                    className="flex h-8 w-6 items-center justify-center text-[#B8935C]/90 shrink-0 cursor-grab active:cursor-grabbing"
                    onClick={(e) => e.stopPropagation()}
                    draggable={false}
                    title="Agarrar para arrastrar y reordenar"
                  >
                    <GripVertical size={18} strokeWidth={2} />
                  </span>
                  <span className="text-xs font-medium text-[#B8935C] tracking-widest uppercase w-7">
                    #{idx + 1}
                  </span>
                  <input
                    value={cat.name}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => updateCategory(cat.id, { name: e.target.value })}
                    className="flex-1 min-w-0 rounded-lg border border-[rgba(184,147,92,0.18)] bg-[#0B0B0C] px-3 py-1.5 text-sm font-medium text-[#F5EFE6] outline-none focus:border-[#B8935C]"
                  />
                  <div
                    className="ml-auto flex items-center gap-1.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() =>
                        setExpandedCatId((prev) => (prev === cat.id ? null : cat.id))
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0B0B0C] text-[#B8935C] active:scale-95 transition-transform"
                      style={{ border: "1px solid rgba(184,147,92,0.28)" }}
                      title={isExpanded ? "Cerrar (colapsar)" : "Desplegar subcategorías y productos"}
                      aria-label={isExpanded ? "Colapsar categoría" : "Expandir categoría"}
                    >
                      <ChevronDown
                        size={17}
                        strokeWidth={2.3}
                        className={`transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => removeCategory(cat.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/15 text-red-400"
                      style={{ border: "1px solid rgba(248,113,113,0.25)" }}
                      aria-label="Eliminar categoría"
                    >
                      <Trash2 size={14} strokeWidth={2} />
                    </button>
                  </div>
                </div>

                {/* CUERPO ACORDEÓN: Subcategorías + Productos inline */}
                {isExpanded && (
                  <div
                    className="border-t px-3.5 pt-4 pb-4 space-y-5 animate-[fadeIn_.18s_ease]"
                    style={{
                      borderTopColor: "rgba(184,147,92,0.18)",
                      backgroundColor: "rgba(11,11,12,0.35)",
                      borderBottomLeftRadius: "inherit",
                      borderBottomRightRadius: "inherit",
                    }}
                  >
                    {/* BLOQUE SUBCATEGORÍAS */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                          <Tags size={16} className="text-[#B8935C] shrink-0" />
                          <h4 className="text-[#F5EFE6] text-[15px] font-semibold truncate">
                            Subcategorías de <span className="text-[#B8935C]">{cat.name}</span>
                          </h4>
                          <span className="text-xs text-[#D4CCBF]">
                            ({cat.subcategories.length})
                          </span>
                        </div>
                        <button
                          onClick={() => addSubcategory(cat.id)}
                          className="flex items-center gap-1.5 rounded-full bg-[#2A2724] px-3.5 py-1.5 text-xs text-[#F5EFE6] active:scale-95"
                          style={{ border: "1px solid rgba(184,147,92,0.28)" }}
                        >
                          <Plus size={13} className="text-[#B8935C]" />
                          Nueva
                        </button>
                      </div>

                      {cat.subcategories.length === 0 ? (
                        <p className="text-xs text-[#D4CCBF]/70 py-2">
                          Aún no hay subcategorías. Crea una con el botón, luego asígnasela al producto.
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {orderByOrder(cat.subcategories).map((sub, sIdx) => {
                            const isSubDrag = dragSubId === sub.id;
                            return (
                              <div
                                key={sub.id}
                                draggable
                                onDragStart={(e) => {
                                  setDragSubId(sub.id);
                                  e.dataTransfer.effectAllowed = "move";
                                  e.dataTransfer.setData("text/plain", sub.id);
                                }}
                                onDragOver={(e) => {
                                  e.preventDefault();
                                  e.dataTransfer.dropEffect = "move";
                                }}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  onDropSubcategoryWithin(cat.id, sub.id);
                                  setDragSubId(null);
                                }}
                                onDragEnd={() => setDragSubId(null)}
                                className={`flex flex-wrap items-center gap-2 rounded-xl bg-[#161414] px-3 py-2 transition-all ${
                                  isSubDrag ? "opacity-60 scale-[0.99] ring-2 ring-[#B8935C]/60" : ""
                                }`}
                                style={{ border: "1px solid rgba(184,147,92,0.15)" }}
                              >
                                <span
                                  className="flex h-7 w-6 items-center justify-center text-[#B8935C]/90 shrink-0 cursor-grab active:cursor-grabbing"
                                  title="Agarrar para arrastrar y reordenar"
                                >
                                  <GripVertical size={17} strokeWidth={2} />
                                </span>
                                <span className="text-[10px] font-medium text-[#B8935C] tracking-widest uppercase w-7">
                                  #{sIdx + 1}
                                </span>
                                <input
                                  value={sub.label}
                                  onChange={(e) =>
                                    updateSubcategory(cat.id, sub.id, { label: e.target.value })
                                  }
                                  className="flex-1 min-w-0 rounded-lg border border-[rgba(184,147,92,0.18)] bg-[#0B0B0C] px-3 py-1.5 text-sm font-medium text-[#F5EFE6] outline-none focus:border-[#B8935C]"
                                />
                                <button
                                  onClick={() => removeSubcategory(cat.id, sub.id)}
                                  className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/15 text-red-400"
                                  style={{ border: "1px solid rgba(248,113,113,0.25)" }}
                                  aria-label="Eliminar subcategoría"
                                >
                                  <Trash2 size={14} strokeWidth={2} />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* BLOQUE PRODUCTOS */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                          <Package size={16} className="text-[#B8935C] shrink-0" />
                          <h4 className="text-[#F5EFE6] text-[15px] font-semibold truncate">
                            Productos
                          </h4>
                          <span className="text-xs text-[#D4CCBF]">
                            ({catItems.length})
                          </span>
                        </div>
                        <button
                          onClick={() => addItemInto(cat.id)}
                          className="flex items-center gap-1.5 rounded-full bg-[#2A2724] px-3.5 py-1.5 text-xs text-[#F5EFE6] active:scale-95"
                          style={{ border: "1px solid rgba(184,147,92,0.28)" }}
                        >
                          <Plus size={13} className="text-[#B8935C]" />
                          Añadir
                        </button>
                      </div>

                      {catItems.length === 0 ? (
                        <p className="text-xs text-[#D4CCBF]/70 py-2 text-center">
                          Esta categoría aún no tiene productos.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {orderByOrder(catItems).map((item, iIdx) => {
                            const isItemDrag = dragItemId === item.id;
                            return (
                              <div
                                key={item.id}
                                draggable
                                onDragStart={(e) => {
                                  setDragItemId(item.id);
                                  e.dataTransfer.effectAllowed = "move";
                                  e.dataTransfer.setData("text/plain", item.id);
                                }}
                                onDragOver={(e) => {
                                  e.preventDefault();
                                  e.dataTransfer.dropEffect = "move";
                                }}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  onDropItemWithin(cat.id, item.id);
                                  setDragItemId(null);
                                }}
                                onDragEnd={() => setDragItemId(null)}
                                className={`rounded-xl bg-[#161414] p-3.5 sm:p-4 shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-all ${
                                  isItemDrag ? "opacity-60 scale-[0.995] ring-2 ring-[#B8935C]/60" : ""
                                }`}
                                style={{ border: "1px solid rgba(184,147,92,0.22)" }}
                              >
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                                  <div className="w-full sm:w-40 flex sm:block items-start gap-2">
                                    <span
                                      className="hidden sm:flex h-8 w-6 -ml-2 mt-1 mr-1 items-center justify-center text-[#B8935C]/90 shrink-0 cursor-grab active:cursor-grabbing"
                                      title="Agarrar para arrastrar y reordenar"
                                    >
                                      <GripVertical size={18} strokeWidth={2} />
                                    </span>
                                    <span
                                      className="sm:hidden inline-flex h-8 w-8 items-center justify-center text-[#B8935C]/90 shrink-0 cursor-grab active:cursor-grabbing rounded-lg bg-[#0B0B0C]"
                                      style={{ border: "1px solid rgba(184,147,92,0.28)" }}
                                      title="Agarrar para arrastrar y reordenar"
                                    >
                                      <GripVertical size={18} strokeWidth={2} />
                                    </span>
                                <div className="flex-1 sm:flex-none">
                                    {allowGallery ? (
                                      <div>
                                        <label className="mb-1.5 block text-xs font-medium text-[#D4CCBF]">
                                          Galería de fotos ({getItemImages(item).length})
                                        </label>
                                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                                          {getItemImages(item).map((img, i) => (
                                            <div key={i} className="space-y-1">
                                              <div className="relative h-20 w-full overflow-hidden rounded-lg">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={img} alt="" className="h-full w-full object-cover" />
                                                {i === 0 && (
                                                  <span className="absolute left-1 top-1 flex items-center gap-0.5 rounded-full bg-[#2A2724] px-1.5 py-0.5 text-[9px] font-medium text-[#F5EFE6]" style={{ border: "1px solid rgba(184,147,92,0.35)" }}>
                                                    <Star size={9} className="fill-[#B8935C] text-[#B8935C]" />
                                                    Portada
                                                  </span>
                                                )}
                                              </div>
                                              <div className="flex items-center justify-center gap-1">
                                                {i !== 0 && (
                                                  <button
                                                    onClick={() => makeItemImageCover(item.id, i)}
                                                    className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2A2724] text-[#B8935C]"
                                                    style={{ border: "1px solid rgba(184,147,92,0.28)" }}
                                                    aria-label="Usar como portada"
                                                    title="Usar como portada"
                                                  >
                                                    <Star size={12} strokeWidth={2} />
                                                  </button>
                                                )}
                                                <button
                                                  onClick={() => moveItemImage(item.id, i, "up")}
                                                  disabled={i === 0}
                                                  className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2A2724] text-[#B8935C] disabled:opacity-30"
                                                  style={{ border: "1px solid rgba(184,147,92,0.28)" }}
                                                  aria-label="Mover antes"
                                                >
                                                  <ChevronUp size={12} strokeWidth={2.5} />
                                                </button>
                                                <button
                                                  onClick={() => moveItemImage(item.id, i, "down")}
                                                  disabled={i === getItemImages(item).length - 1}
                                                  className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2A2724] text-[#B8935C] disabled:opacity-30"
                                                  style={{ border: "1px solid rgba(184,147,92,0.28)" }}
                                                  aria-label="Mover después"
                                                >
                                                  <ChevronDown size={12} strokeWidth={2.5} />
                                                </button>
                                                <button
                                                  onClick={() => removeItemImage(item.id, i)}
                                                  className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/15 text-red-400"
                                                  style={{ border: "1px solid rgba(248,113,113,0.25)" }}
                                                  aria-label="Eliminar foto"
                                                >
                                                  <Trash2 size={12} strokeWidth={2} />
                                                </button>
                                              </div>
                                            </div>
                                          ))}
                                          <div className="w-full">
                                            <ImageUploader value="" onChange={(url) => url && addItemImage(item.id, url)} />
                                          </div>
                                        </div>
                                        {getItemImages(item).length === 0 && (
                                          <p className="mt-1 flex items-center gap-1 text-xs text-[#D4CCBF]">
                                            <ImagePlus size={12} className="text-[#B8935C]" strokeWidth={2} />
                                            Agrega al menos una foto para que se muestre en el catálogo.
                                          </p>
                                        )}
                                      </div>
                                    ) : (
                                      <ImageUploader
                                        value={item.image}
                                        onChange={(url) => updateItem(item.id, { image: url })}
                                      />
                                    )}
                                  </div>
                                  </div>
                                  <div className="min-w-0 flex-1 space-y-2">
                                    <div className="flex flex-col sm:flex-row sm:gap-2">
                                      <input
                                        value={item.name}
                                        onChange={(e) => updateItem(item.id, { name: e.target.value })}
                                        className="w-full sm:flex-1 rounded-lg border border-[rgba(184,147,92,0.18)] bg-[#0B0B0C] px-3 py-2 text-sm font-medium text-[#F5EFE6] outline-none placeholder-[#D4CCBF]/60 focus:border-[#B8935C]"
                                        placeholder="Nombre del producto"
                                      />
                                      <select
                                        value={item.subcategory ?? ""}
                                        onChange={(e) =>
                                          updateItem(item.id, {
                                            subcategory: e.target.value ? e.target.value : undefined,
                                          })
                                        }
                                        className="w-full sm:w-56 mt-2 sm:mt-0 rounded-lg border border-[rgba(184,147,92,0.18)] bg-[#0B0B0C] px-3 py-2 text-xs text-[#F5EFE6] outline-none focus:border-[#B8935C]"
                                      >
                                        <option value="">(Sin subcategoría)</option>
                                        {orderByOrder(cat.subcategories).map((s) => (
                                          <option key={s.id} value={s.id} className="bg-[#1E1C1A]">
                                            {s.label}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                    <textarea
                                      value={item.description}
                                      onChange={(e) => updateItem(item.id, { description: e.target.value })}
                                      rows={2}
                                      className="w-full resize-none rounded-lg border border-[rgba(184,147,92,0.18)] bg-[#0B0B0C] px-3 py-2 text-xs text-[#D4CCBF] outline-none placeholder-[#D4CCBF]/60 focus:border-[#B8935C]"
                                      placeholder="Descripción"
                                    />
                                    <div className="flex flex-wrap items-center gap-2 pt-1">
                                      <input
                                        type="number"
                                        value={item.price}
                                        onChange={(e) =>
                                          updateItem(item.id, { price: Number(e.target.value) })
                                        }
                                        className="w-28 rounded-lg border border-[rgba(184,147,92,0.18)] bg-[#0B0B0C] px-3 py-2 text-sm text-[#F5EFE6] outline-none focus:border-[#B8935C]"
                                      />
                                      <span className="text-xs text-[#D4CCBF]">{formatCOP(item.price)}</span>
                                      <label className="flex items-center gap-1.5 text-xs text-[#D4CCBF] ml-auto sm:ml-0">
                                        <input
                                          type="checkbox"
                                          checked={item.available}
                                          onChange={(e) =>
                                            updateItem(item.id, { available: e.target.checked })
                                          }
                                        />
                                        Disponible
                                      </label>
                                      <div className="ml-auto">
                                        <button
                                          onClick={() => removeItem(item.id)}
                                          className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/15 text-red-400"
                                          style={{ border: "1px solid rgba(248,113,113,0.25)" }}
                                          aria-label="Eliminar producto"
                                        >
                                          <Trash2 size={14} strokeWidth={2} />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
