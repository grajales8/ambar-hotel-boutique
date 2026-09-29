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
import { ExperienceService, MenuCategory, Subcategory } from "@/lib/types";
import { loadCollection, saveCollection, debounce } from "@/lib/storage";
import { formatCOP } from "@/lib/cart-context";
import {
  experienceCategories as initialCategories,
  experienceServices as initialServices,
} from "@/data/experiences";
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

const STORAGE_KEY = "experiences";
const CATEGORIES_STORAGE_KEY = "experienceCategories";

export default function ExperiencesEditor() {
  const [services, setServices] = useState<ExperienceService[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string>(initialCategories[0]?.id ?? "");
  const [expandedCatId, setExpandedCatId] = useState<string | null>(initialCategories[0]?.id ?? null);
  const [restoring, setRestoring] = useState(false);
  const [activeSubByCat, setActiveSubByCat] = useState<Record<string, string>>({});

  const [dragCatId, setDragCatId] = useState<string | null>(null);
  const [dragSubId, setDragSubId] = useState<string | null>(null);
  const [dragItemId, setDragItemId] = useState<string | null>(null);

  const activeCategory = categories.find((c) => c.id === activeCategoryId);

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
    const pool = services.filter((s) => s.categoryId === categoryId);
    const fromPool = pool.findIndex((i) => i.id === dragItemId);
    const toPool = pool.findIndex((i) => i.id === dropTargetId);
    if (fromPool < 0 || toPool < 0) return;
    const nextPool = reorderInPlace(pool, fromPool, toPool);
    const out: ExperienceService[] = [];
    const byCat = new Map<string, ExperienceService[]>();
    for (const it of services) {
      if (!byCat.has(it.categoryId)) byCat.set(it.categoryId, []);
      if (it.categoryId === categoryId) continue;
      byCat.get(it.categoryId)!.push(it);
    }
    byCat.set(categoryId, nextPool);
    for (const c of categories) {
      const lst = byCat.get(c.id);
      if (lst) out.push(...lst);
    }
    persistServices(out);
  }

  function addItemInto(categoryId: string) {
    const cat = categories.find((c) => c.id === categoryId);
    const id = `exp-${Date.now()}`;
    const activeSub = activeSubByCat[categoryId] ?? "__all__";
    const subcategory =
      activeSub !== "__all__" && activeSub !== "__unassigned__"
        ? activeSub
        : cat?.subcategories?.[0]?.id ?? undefined;
    const next: ExperienceService = {
      id,
      categoryId,
      subcategory,
      name: "Nuevo servicio",
      shortDescription: "",
      fullDescription: "",
      includes: [],
      benefits: [],
      price: undefined,
      images: [],
      active: true,
      order: services.filter((s) => s.categoryId === categoryId).length,
    };
    persistServices([...services, next]);
  }

  useEffect(() => {
    let active = true;
    Promise.all([
      loadCollection<MenuCategory>(CATEGORIES_STORAGE_KEY, initialCategories),
      loadCollection<ExperienceService>(STORAGE_KEY, initialServices),
    ]).then(([cats, data]) => {
      if (!active) return;
      const sortedCats = orderByOrder(cats);
      const mapped = data.map((s) => {
        const cat = sortedCats.find((c) => c.id === s.categoryId);
        if (!cat) return s;
        const newSub = normalizeSubcategoryFromLegacy(s.subcategory, cat.subcategories);
        if (newSub === s.subcategory) return s;
        return { ...s, subcategory: newSub };
      });
      setCategories(sortedCats);
      setServices(mapped.sort((a, b) => a.order - b.order));
      setActiveCategoryId((prev) =>
        sortedCats.some((c) => c.id === prev) ? prev : sortedCats[0]?.id ?? prev
      );
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const debouncedSaveServices = useMemo(
    () =>
      debounce((next: ExperienceService[]) => {
        saveCollection(STORAGE_KEY, next).then(() => {
          setSaved(true);
          setTimeout(() => setSaved(false), 1200);
        });
      }, 700),
    []
  );

  const debouncedSaveCategories = useMemo(
    () =>
      debounce((next: MenuCategory[]) => {
        saveCollection(CATEGORIES_STORAGE_KEY, next).then(() => {
          setSaved(true);
          setTimeout(() => setSaved(false), 1200);
        });
      }, 700),
    []
  );

  function persistServices(next: ExperienceService[]) {
    const byCat = new Map<string, number>();
    const indexed = next.map((s) => {
      const n = (byCat.get(s.categoryId) ?? 0) + 1;
      byCat.set(s.categoryId, n);
      return { ...s, order: n };
    });
    setServices(indexed);
    debouncedSaveServices(indexed);
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

  function updateService(id: string, patch: Partial<ExperienceService>) {
    persistServices(services.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }
  function removeService(id: string) {
    persistServices(services.filter((s) => s.id !== id));
  }

  function addCategory() {
    const id = `exp-cat-${Date.now()}`;
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
    persistServices(
      services.map((s) => (s.categoryId === id ? { ...s, categoryId: next[0]?.id ?? "" } : s))
    );
    if (activeCategoryId === id) {
      setActiveCategoryId(next[0]?.id ?? "");
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
    persistServices(
      services.map((s) =>
        s.categoryId === categoryId && s.subcategory === subId
          ? { ...s, subcategory: undefined }
          : s
      )
    );
  }

  // --- Galería múltiples fotos (característica exclusiva de Experiencias) ---
  function addServiceImage(serviceId: string, url: string) {
    const service = services.find((s) => s.id === serviceId);
    if (!service || !url) return;
    updateService(serviceId, { images: [...service.images, url] });
  }

  function removeServiceImage(serviceId: string, index: number) {
    const service = services.find((s) => s.id === serviceId);
    if (!service) return;
    updateService(serviceId, { images: service.images.filter((_, i) => i !== index) });
  }

  function moveServiceImage(serviceId: string, index: number, direction: "up" | "down") {
    const service = services.find((s) => s.id === serviceId);
    if (!service) return;
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= service.images.length) return;
    const next = [...service.images];
    [next[index], next[targetIdx]] = [next[targetIdx], next[index]];
    updateService(serviceId, { images: next });
  }

  function makeServiceImageCover(serviceId: string, index: number) {
    const service = services.find((s) => s.id === serviceId);
    if (!service || index === 0) return;
    const next = [...service.images];
    const [picked] = next.splice(index, 1);
    next.unshift(picked);
    updateService(serviceId, { images: next });
  }

  async function restoreSeedDefaults() {
    try {
      setRestoring(true);
      await saveCollection(CATEGORIES_STORAGE_KEY, initialCategories);
      const sortedCats = orderByOrder(initialCategories);
      const mapped = initialServices.map((s) => {
        const cat = sortedCats.find((c) => c.id === s.categoryId);
        if (!cat) return s;
        const newSub = normalizeSubcategoryFromLegacy(s.subcategory, cat.subcategories);
        if (newSub === s.subcategory) return s;
        return { ...s, subcategory: newSub };
      });
      await saveCollection(STORAGE_KEY, mapped);
      setCategories(sortedCats);
      setActiveCategoryId(sortedCats[0]?.id ?? "");
      setExpandedCatId(sortedCats[0]?.id ?? null);
      const byCat = new Map<string, number>();
      const indexed = mapped.map((s) => {
        const n = (byCat.get(s.categoryId) ?? 0) + 1;
        byCat.set(s.categoryId, n);
        return { ...s, order: n };
      });
      setServices(indexed);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } finally {
      setRestoring(false);
    }
  }

  if (loading) {
    return <p className="text-sm text-[var(--color-ink-soft)]">Cargando…</p>;
  }

  return (
    <div className="space-y-8">
      <div className="mb-2 flex items-center justify-between gap-3 flex-wrap">
        <p className="text-sm text-[#D4CCBF]">
          {services.length} servicios · {categories.length} categorías · cambios guardados automáticamente
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
            aria-label="Restaurar datos iniciales de servicios (sobrescribe Firestore)"
            title="Restaura servicios/datos iniciales de ejemplo (sobrescribe los datos actuales en Firestore)."
          >
            <RotateCcw size={14} className={`text-[#B8935C] ${restoring ? "animate-spin" : ""}`} strokeWidth={2.2} />
            {restoring ? "Cargando…" : "Restaurar datos iniciales"}
          </button>
          {saved && <span className="text-xs font-medium text-emerald-500 shrink-0">Guardado ✓</span>}
        </div>
      </div>

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
            const catServices = services.filter((s) => s.categoryId === cat.id);
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
                      title={isExpanded ? "Cerrar (colapsar)" : "Desplegar subcategorías y servicios"}
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
                          Aún no hay subcategorías. Crea una con el botón, luego asígnasela al servicio.
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

                    {/* BARRA CHIPS: filtrar por subcategoría */}
                    {(() => {
                      const activeSub = activeSubByCat[cat.id] ?? "__all__";
                      const unassignedCount = catServices.filter((s) => !s.subcategory).length;
                      const subOptions = orderByOrder(cat.subcategories);
                      const filteredServices: ExperienceService[] = (() => {
                        if (activeSub === "__all__") return catServices;
                        if (activeSub === "__unassigned__") return catServices.filter((s) => !s.subcategory);
                        return catServices.filter((s) => s.subcategory === activeSub);
                      })();
                      const addLabel = (() => {
                        if (activeSub === "__all__") return "Añadir";
                        if (activeSub === "__unassigned__") return "Añadir sin asignar";
                        const s = subOptions.find((s) => s.id === activeSub);
                        return `Añadir a ${s?.label ?? "subcategoría"}`;
                      })();
                      const emptyMsg = (() => {
                        if (catServices.length === 0) return "Esta categoría aún no tiene servicios.";
                        if (activeSub === "__unassigned__") return "No hay servicios sin asignar en esta categoría.";
                        if (activeSub === "__all__") return "Esta categoría aún no tiene servicios.";
                        const s = subOptions.find((s) => s.id === activeSub);
                        return `Aún no hay servicios en "${s?.label ?? "esta subcategoría"}`;
                      })();
                      return (
                        <>
                          <div className="mb-3">
                            <div className="scrollbar-thin flex items-center gap-1.5 overflow-x-auto pb-1">
                              <button
                                onClick={() =>
                                  setActiveSubByCat((prev) => ({ ...prev, [cat.id]: "__all__" }))}
                                className={`shrink-0 rounded-full px-3 py-1.5 text-[11.5px] font-medium transition-colors ${
                                  activeSub === "__all__" ? "bg-[#B8935C] text-[#0B0B0C]" : "bg-[#161414] text-[#F5EFE6]"
                                }`}
                                style={activeSub !== "__all__" ? { border: "1px solid rgba(184,147,92,0.22)" } : undefined}
                              >
                                Todos ({catServices.length})
                              </button>
                              <button
                                onClick={() =>
                                  setActiveSubByCat((prev) => ({ ...prev, [cat.id]: "__unassigned__" }))}
                                className={`shrink-0 rounded-full px-3 py-1.5 text-[11.5px] font-medium transition-colors ${
                                  activeSub === "__unassigned__" ? "bg-[#B8935C] text-[#0B0B0C]" : "bg-[#161414] text-[#F5EFE6]"
                                }`}
                                style={activeSub !== "__unassigned__" ? { border: "1px solid rgba(184,147,92,0.22)" } : undefined}
                              >
                                Sin asignar ({unassignedCount})
                              </button>
                              {subOptions.map((sub) => {
                                const count = catServices.filter((s) => s.subcategory === sub.id).length;
                                const isOn = activeSub === sub.id;
                                return (
                                  <button
                                    key={sub.id}
                                    onClick={() =>
                                      setActiveSubByCat((prev) => ({ ...prev, [cat.id]: sub.id }))}
                                    className={`shrink-0 rounded-full px-3 py-1.5 text-[11.5px] font-medium transition-colors ${
                                      isOn ? "bg-[#B8935C] text-[#0B0B0C]" : "bg-[#161414] text-[#F5EFE6]"
                                    }`}
                                    style={!isOn ? { border: "1px solid rgba(184,147,92,0.22)" } : undefined}
                                  >
                                    {sub.label} ({count})
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* BLOQUE SERVICIOS */}
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 min-w-0">
                                <Package size={16} className="text-[#B8935C] shrink-0" />
                                <h4 className="text-[#F5EFE6] text-[15px] font-semibold truncate">
                                  Servicios
                                </h4>
                                <span className="text-xs text-[#D4CCBF]">
                                  ({filteredServices.length}/{catServices.length})
                                </span>
                              </div>
                              <button
                                onClick={() => addItemInto(cat.id)}
                                className="flex items-center gap-1.5 rounded-full bg-[#2A2724] px-3.5 py-1.5 text-xs text-[#F5EFE6] active:scale-95"
                                style={{ border: "1px solid rgba(184,147,92,0.28)" }}
                              >
                                <Plus size={13} className="text-[#B8935C]" />
                                {addLabel}
                              </button>
                            </div>

                            {filteredServices.length === 0 ? (
                              <p className="text-xs text-[#D4CCBF]/70 py-2 text-center">{emptyMsg}</p>
                            ) : (
                              <div className="space-y-3">
                                {orderByOrder(filteredServices).map((service, iIdx) => {
                            const isItemDrag = dragItemId === service.id;
                            return (
                              <div
                                key={service.id}
                                draggable
                                onDragStart={(e) => {
                                  setDragItemId(service.id);
                                  e.dataTransfer.effectAllowed = "move";
                                  e.dataTransfer.setData("text/plain", service.id);
                                }}
                                onDragOver={(e) => {
                                  e.preventDefault();
                                  e.dataTransfer.dropEffect = "move";
                                }}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  onDropItemWithin(cat.id, service.id);
                                  setDragItemId(null);
                                }}
                                onDragEnd={() => setDragItemId(null)}
                                className={`rounded-xl bg-[#161414] p-3.5 sm:p-4 shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-all ${
                                  isItemDrag ? "opacity-60 scale-[0.995] ring-2 ring-[#B8935C]/60" : ""
                                }`}
                                style={{ border: "1px solid rgba(184,147,92,0.22)" }}
                              >
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                                  <div className="w-full sm:w-56 flex sm:block items-start gap-2">
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
                                    <div className="flex-1 sm:flex-none w-full">
                                      {/* Galería exclusiva de Experiencias: múltiples fotos */}
                                      <div>
                                        <label className="mb-1.5 block text-xs font-medium text-[#D4CCBF]">
                                          Galería de fotos ({service.images.length})
                                        </label>
                                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                                          {service.images.map((img, i) => (
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
                                                    onClick={() => makeServiceImageCover(service.id, i)}
                                                    className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2A2724] text-[#B8935C]"
                                                    style={{ border: "1px solid rgba(184,147,92,0.28)" }}
                                                    aria-label="Usar como portada"
                                                    title="Usar como portada"
                                                  >
                                                    <Star size={12} strokeWidth={2} />
                                                  </button>
                                                )}
                                                <button
                                                  onClick={() => moveServiceImage(service.id, i, "up")}
                                                  disabled={i === 0}
                                                  className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2A2724] text-[#B8935C] disabled:opacity-30"
                                                  style={{ border: "1px solid rgba(184,147,92,0.28)" }}
                                                  aria-label="Mover antes"
                                                >
                                                  <ChevronUp size={12} strokeWidth={2.5} />
                                                </button>
                                                <button
                                                  onClick={() => moveServiceImage(service.id, i, "down")}
                                                  disabled={i === service.images.length - 1}
                                                  className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2A2724] text-[#B8935C] disabled:opacity-30"
                                                  style={{ border: "1px solid rgba(184,147,92,0.28)" }}
                                                  aria-label="Mover después"
                                                >
                                                  <ChevronDown size={12} strokeWidth={2.5} />
                                                </button>
                                                <button
                                                  onClick={() => removeServiceImage(service.id, i)}
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
                                            <ImageUploader value="" onChange={(url) => url && addServiceImage(service.id, url)} />
                                          </div>
                                        </div>
                                        {service.images.length === 0 && (
                                          <p className="mt-1 flex items-center gap-1 text-xs text-[#D4CCBF]">
                                            <ImagePlus size={12} className="text-[#B8935C]" strokeWidth={2} />
                                            Agrega al menos una foto. Recomendado: 1200 × 900 px (4:3).
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="min-w-0 flex-1 space-y-2.5">
                                    <div className="flex flex-col sm:flex-row sm:gap-2">
                                      <input
                                        value={service.name}
                                        onChange={(e) => updateService(service.id, { name: e.target.value })}
                                        className="w-full sm:flex-1 rounded-lg border border-[rgba(184,147,92,0.18)] bg-[#0B0B0C] px-3 py-2 text-sm font-medium text-[#F5EFE6] outline-none placeholder-[#D4CCBF]/60 focus:border-[#B8935C]"
                                        placeholder="Nombre del servicio"
                                      />
                                      <select
                                        value={service.subcategory ?? ""}
                                        onChange={(e) =>
                                          updateService(service.id, {
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
                                      value={service.shortDescription}
                                      onChange={(e) => updateService(service.id, { shortDescription: e.target.value })}
                                      rows={2}
                                      className="w-full resize-none rounded-lg border border-[rgba(184,147,92,0.18)] bg-[#0B0B0C] px-3 py-2 text-xs text-[#D4CCBF] outline-none placeholder-[#D4CCBF]/60 focus:border-[#B8935C]"
                                      placeholder="Descripción corta (para la tarjeta del catálogo)"
                                    />
                                    <textarea
                                      value={service.fullDescription}
                                      onChange={(e) => updateService(service.id, { fullDescription: e.target.value })}
                                      rows={3}
                                      className="w-full resize-none rounded-lg border border-[rgba(184,147,92,0.18)] bg-[#0B0B0C] px-3 py-2 text-xs text-[#D4CCBF] outline-none placeholder-[#D4CCBF]/60 focus:border-[#B8935C]"
                                      placeholder="Descripción completa (para la página de detalle)"
                                    />
                                    <div>
                                      <label className="mb-1 block text-xs font-medium text-[#D4CCBF]">
                                        Qué incluye (una línea por ítem)
                                      </label>
                                      <textarea
                                        value={service.includes.join("\n")}
                                        onChange={(e) =>
                                          updateService(service.id, {
                                            includes: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean),
                                          })
                                        }
                                        rows={3}
                                        className="w-full resize-none rounded-lg border border-[rgba(184,147,92,0.18)] bg-[#0B0B0C] px-3 py-2 text-xs text-[#D4CCBF] outline-none placeholder-[#D4CCBF]/60 focus:border-[#B8935C]"
                                        placeholder={"Pétalos de rosa\nVelas decorativas\nBotella de vino"}
                                      />
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2 pt-1">
                                      <span className="text-xs text-[#D4CCBF]">Precio (deja vacío para &quot;Consultar&quot;)</span>
                                      <input
                                        type="number"
                                        value={service.price ?? ""}
                                        onChange={(e) =>
                                          updateService(service.id, {
                                            price: e.target.value === "" ? undefined : Number(e.target.value),
                                          })
                                        }
                                        className="w-32 rounded-lg border border-[rgba(184,147,92,0.18)] bg-[#0B0B0C] px-3 py-2 text-sm text-[#F5EFE6] outline-none focus:border-[#B8935C]"
                                      />
                                      {service.price != null && (
                                        <span className="text-xs text-[#D4CCBF]">{formatCOP(service.price)}</span>
                                      )}
                                      <label className="flex items-center gap-1.5 text-xs text-[#D4CCBF] ml-auto sm:ml-0">
                                        <input
                                          type="checkbox"
                                          checked={service.active}
                                          onChange={(e) =>
                                            updateService(service.id, { active: e.target.checked })
                                          }
                                        />
                                        Disponible (visible para huéspedes)
                                      </label>
                                      <div className="ml-auto">
                                        <button
                                          onClick={() => removeService(service.id)}
                                          className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/15 text-red-400"
                                          style={{ border: "1px solid rgba(248,113,113,0.25)" }}
                                          aria-label="Eliminar servicio"
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
                        </>
                      );
                    })()}
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
