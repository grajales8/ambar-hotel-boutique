"use client";

import { useEffect, useMemo, useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { MenuItem, MenuCategory } from "@/lib/types";
import { loadCollection, saveCollection, debounce } from "@/lib/storage";
import { formatCOP } from "@/lib/cart-context";
import ImageUploader from "@/components/admin/ImageUploader";

export default function CatalogEditor({
  storageKey,
  categories,
  initialItems,
}: {
  storageKey: string;
  categories: MenuCategory[];
  initialItems: MenuItem[];
}) {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let active = true;
    loadCollection<MenuItem>(storageKey, initialItems).then((data) => {
      if (active) {
        setItems(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  // Escritura diferida: espera a que dejes de escribir antes de mandar el
  // guardado a Firestore, para no disparar una escritura por cada tecla.
  const debouncedSave = useMemo(
    () =>
      debounce((next: MenuItem[]) => {
        saveCollection(storageKey, next).then(() => {
          setSaved(true);
          setTimeout(() => setSaved(false), 1200);
        });
      }, 700),
    [storageKey]
  );

  function persist(next: MenuItem[]) {
    setItems(next);
    debouncedSave(next);
  }

  function updateItem(id: string, patch: Partial<MenuItem>) {
    persist(items.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }

  function removeItem(id: string) {
    persist(items.filter((it) => it.id !== id));
  }

  function addItem() {
    const id = `${storageKey}-${Date.now()}`;
    const next: MenuItem = {
      id,
      categoryId: categories[0]?.id ?? "",
      name: "Nuevo producto",
      description: "",
      price: 0,
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
      available: true,
    };
    persist([...items, next]);
  }

  if (loading) {
    return <p className="text-sm text-[var(--color-ink-soft)]">Cargando…</p>;
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-[var(--color-ink-soft)]">
          {items.length} productos · los cambios se guardan automáticamente
        </p>
        {saved && <span className="text-xs font-medium text-emerald-600">Guardado ✓</span>}
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl bg-[#1E1C1A] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.3)]" style={{ border: "1px solid rgba(184,147,92,0.22)" }}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
              <div className="w-full sm:w-40">
                <ImageUploader
                  value={item.image}
                  onChange={(url) => updateItem(item.id, { image: url })}
                />
              </div>
              <div className="min-w-0 flex-1 space-y-2">
                <input
                  value={item.name}
                  onChange={(e) => updateItem(item.id, { name: e.target.value })}
                  className="w-full rounded-lg border border-[rgba(184,147,92,0.18)] bg-[#0B0B0C] px-3 py-2 text-sm font-medium text-[#F5EFE6] outline-none placeholder-[#D4CCBF]/60 focus:border-[#B8935C]"
                  placeholder="Nombre"
                />
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
                    onChange={(e) => updateItem(item.id, { price: Number(e.target.value) })}
                    className="w-28 rounded-lg border border-[rgba(184,147,92,0.18)] bg-[#0B0B0C] px-3 py-2 text-sm text-[#F5EFE6] outline-none focus:border-[#B8935C]"
                  />
                  <span className="text-xs text-[var(--color-ink-soft)]">{formatCOP(item.price)}</span>

                  <select
                    value={item.categoryId}
                    onChange={(e) => updateItem(item.id, { categoryId: e.target.value })}
                    className="rounded-lg border border-[rgba(184,147,92,0.18)] bg-[#0B0B0C] px-2 py-2 text-xs text-[#F5EFE6] outline-none focus:border-[#B8935C]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id} className="bg-[#1E1C1A]">
                        {c.name}
                      </option>
                    ))}
                  </select>

                  <label className="flex items-center gap-1.5 text-xs text-[#D4CCBF]">
                    <input
                      type="checkbox"
                      checked={item.available}
                      onChange={(e) => updateItem(item.id, { available: e.target.checked })}
                    />
                    Disponible
                  </label>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-red-500/15 text-red-400"
                    aria-label="Eliminar producto"
                    style={{ border: "1px solid rgba(248,113,113,0.25)" }}
                  >
                    <Trash2 size={14} strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addItem}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-dashed border-[#B8935C] py-3 text-sm font-medium text-[#F5EFE6]"
      >
        <Plus size={16} className="text-[#B8935C]" strokeWidth={2} />
        Añadir producto
      </button>
    </div>
  );
}
