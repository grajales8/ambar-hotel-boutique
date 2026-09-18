"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Trash2,
  Plus,
  ChevronUp,
  ChevronDown,
  Package,
  Tags,
  FolderTree,
  GripVertical,
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
}: {
  storageKey: string;
  categoriesStorageKey: string;
  initialCategories: MenuCategory[];
  initialItems: MenuItem[];
}) {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string>(initialCategories[0]?.id ?? "");

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

  function onDropSubcategory(dropTargetId: string) {
    if (!dragSubId || dragSubId === dropTargetId || !activeCategory) return;
    const subs = activeCategory.subcategories;
    const from = subs.findIndex((s) => s.id === dragSubId);
    const to = subs.findIndex((s) => s.id === dropTargetId);
    if (from < 0 || to < 0) return;
    const nextSubs = reorderInPlace(subs, from, to);
    persistCategories(
      categories.map((c) => (c.id === activeCategory.id ? { ...c, subcategories: nextSubs } : c))
    );
  }

  function onDropItem(dropTargetId: string) {
    if (!dragItemId || dragItemId === dropTargetId) return;
    const pool = filteredItems;
    const fromPool = pool.findIndex((i) => i.id === dragItemId);
    const toPool = pool.findIndex((i) => i.id === dropTargetId);
    if (fromPool < 0 || toPool < 0) return;
    const nextPool = reorderInPlace(pool, fromPool, toPool);
    const srcCat = activeCategoryId;
    const out: MenuItem[] = [];
    const byCat = new Map<string, MenuItem[]>();
    for (const it of items) {
      if (!byCat.has(it.categoryId)) byCat.set(it.categoryId, []);
      if (it.categoryId === srcCat) continue;
      byCat.get(it.categoryId)!.push(it);
    }
    byCat.set(srcCat, nextPool);
    for (const c of categories) {
      const lst = byCat.get(c.id);
      if (lst) out.push(...lst);
    }
    persistItems(out);
  }

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
    setItems(next);
    debouncedSaveItems(next);
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

  if (loading) {
    return <p className="text-sm text-[var(--color-ink-soft)]">Cargando…</p>;
  }

  return (
    <div className="space-y-8">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm text-[#D4CCBF]">
          {items.length} productos · {categories.length} categorías · cambios guardados automáticamente
        </p>
        {saved && <span className="text-xs font-medium text-emerald-500">Guardado ✓</span>}
      </div>

      {/* CATEGORIES */}
      <section
        className="rounded-2xl bg-[#1E1C1A] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
        style={{ border: "1px solid rgba(184,147,92,0.22)" }}
      >
        <header className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderTree size={18} className="text-[#B8935C]" />
            <h3 className="text-[#F5EFE6] text-lg font-semibold">Categorías</h3>
            <span className="text-xs text-[#D4CCBF]">
              (agarrar del ico ⋮⋮ para arrastrar y soltar)
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

        <div className="space-y-2.5">
          {categories.map((cat, idx) => {
            const isActive = cat.id === activeCategoryId;
            const isDragging = dragCatId === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => setActiveCategoryId(cat.id)}
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
                className={`rounded-xl px-3.5 py-3 cursor-pointer transition-all ${
                  isActive
                    ? "bg-[#2A2724]"
                    : "bg-[#161414] hover:bg-[#1f1c1a]"
                } ${isDragging ? "opacity-60 scale-[0.99] ring-2 ring-[#B8935C]/60" : ""}`}
                style={{ border: isActive ? "1px solid rgba(184,147,92,0.45)" : "1px solid rgba(184,147,92,0.15)" }}
              >
                <div className="flex flex-wrap items-center gap-2">
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
                    onClick={(e) => e.stopPropagation()}
                    className="ml-auto flex items-center gap-1.5"
                  >
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
              </div>
            );
          })}
        </div>
      </section>

      {/* SUBCATEGORIES */}
      <section
        className="rounded-2xl bg-[#1E1C1A] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
        style={{ border: "1px solid rgba(184,147,92,0.22)" }}
      >
        <header className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tags size={18} className="text-[#B8935C]" />
            <h3 className="text-[#F5EFE6] text-lg font-semibold">
              Subcategorías de{" "}
              <span className="text-[#B8935C]">{activeCategory?.name ?? "Selecciona"}</span>
            </h3>
            <span className="text-xs text-[#D4CCBF]">
              (son los botones pequeños que aparecen debajo de la categoría)
            </span>
          </div>
          {activeCategory && (
            <button
              onClick={() => addSubcategory(activeCategory.id)}
              className="flex items-center gap-2 rounded-full bg-[#2A2724] px-4 py-2 text-sm text-[#F5EFE6] active:scale-95"
              style={{ border: "1px solid rgba(184,147,92,0.28)" }}
            >
              <Plus size={15} className="text-[#B8935C]" />
              Nueva subcategoría
            </button>
          )}
        </header>
        {!activeCategory ? (
          <p className="text-sm text-[#D4CCBF]/70 py-4">
            Selecciona una categoría primero para gestionar sus subcategorías.
          </p>
        ) : activeCategory.subcategories.length === 0 ? (
          <p className="text-sm text-[#D4CCBF]/70 py-4">
            Aún no hay subcategorías para esta sección. Puedes crear una arriba y luego desde
            la ficha de cada producto elegirla del desplegable.
          </p>
        ) : (
          <div className="space-y-2">
            {orderByOrder(activeCategory.subcategories).map((sub, idx, arr) => {
              const isDragging = dragSubId === sub.id;
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
                    onDropSubcategory(sub.id);
                    setDragSubId(null);
                  }}
                  onDragEnd={() => setDragSubId(null)}
                  className={`flex flex-wrap items-center gap-2 rounded-xl bg-[#161414] px-3.5 py-2.5 transition-all ${
                    isDragging ? "opacity-60 scale-[0.99] ring-2 ring-[#B8935C]/60" : ""
                  }`}
                  style={{ border: "1px solid rgba(184,147,92,0.15)" }}
                >
                  <span
                    className="flex h-8 w-6 items-center justify-center text-[#B8935C]/90 shrink-0 cursor-grab active:cursor-grabbing"
                    title="Agarrar para arrastrar y reordenar"
                  >
                    <GripVertical size={18} strokeWidth={2} />
                  </span>
                  <span className="text-xs font-medium text-[#B8935C] tracking-widest uppercase w-7">
                    #{idx + 1}
                  </span>
                  <input
                    value={sub.label}
                    onChange={(e) =>
                      updateSubcategory(activeCategory.id, sub.id, { label: e.target.value })
                    }
                    className="flex-1 min-w-0 rounded-lg border border-[rgba(184,147,92,0.18)] bg-[#0B0B0C] px-3 py-1.5 text-sm font-medium text-[#F5EFE6] outline-none focus:border-[#B8935C]"
                  />
                  <div className="ml-auto flex items-center gap-1.5">
                    <button
                      onClick={() => removeSubcategory(activeCategory.id, sub.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/15 text-red-400"
                      style={{ border: "1px solid rgba(248,113,113,0.25)" }}
                      aria-label="Eliminar subcategoría"
                    >
                      <Trash2 size={14} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* PRODUCTS */}
      <section
        className="rounded-2xl bg-[#1E1C1A] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
        style={{ border: "1px solid rgba(184,147,92,0.22)" }}
      >
        <header className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package size={18} className="text-[#B8935C]" />
            <h3 className="text-[#F5EFE6] text-lg font-semibold">
              Productos · {activeCategory?.name ?? ""}
            </h3>
            <span className="text-xs text-[#D4CCBF]">
              ({filteredItems.length} en esta categoría)
            </span>
          </div>
          <button
            onClick={addItem}
            className="flex items-center gap-2 rounded-full bg-[#2A2724] px-4 py-2 text-sm text-[#F5EFE6] active:scale-95"
            style={{ border: "1px solid rgba(184,147,92,0.28)" }}
          >
            <Plus size={15} className="text-[#B8935C]" />
            Añadir producto
          </button>
        </header>

        {filteredItems.length === 0 ? (
          <p className="text-sm text-[#D4CCBF]/70 py-4 text-center">
            Esta categoría aún no tiene productos. Añade uno con el botón de arriba.
          </p>
        ) : (
          <div className="space-y-3">
            {filteredItems.map((item, idx, arr) => {
              const subs = activeCategory?.subcategories ?? [];
              const isDragging = dragItemId === item.id;
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
                    onDropItem(item.id);
                    setDragItemId(null);
                  }}
                  onDragEnd={() => setDragItemId(null)}
                  className={`rounded-xl bg-[#161414] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-all ${
                    isDragging ? "opacity-60 scale-[0.995] ring-2 ring-[#B8935C]/60" : ""
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
                        <ImageUploader
                          value={item.image}
                          onChange={(url) => updateItem(item.id, { image: url })}
                        />
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
                          {orderByOrder(subs).map((s) => (
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

                        <select
                          value={item.categoryId}
                          onChange={(e) =>
                            updateItem(item.id, {
                              categoryId: e.target.value,
                              subcategory: undefined,
                            })
                          }
                          className="rounded-lg border border-[rgba(184,147,92,0.18)] bg-[#0B0B0C] px-2 py-2 text-xs text-[#F5EFE6] outline-none focus:border-[#B8935C]"
                        >
                          {orderByOrder(categories).map((c) => (
                            <option key={c.id} value={c.id} className="bg-[#1E1C1A]">
                              {c.name}
                            </option>
                          ))}
                        </select>

                        <label className="flex items-center gap-1.5 text-xs text-[#D4CCBF]">
                          <input
                            type="checkbox"
                            checked={item.available}
                            onChange={(e) =>
                              updateItem(item.id, { available: e.target.checked })
                            }
                          />
                          Disponible
                        </label>

                        <div className="ml-auto flex items-center gap-1.5">
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
      </section>
    </div>
  );
}
