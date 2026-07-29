"use client";

import { useEffect, useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { MenuItem, MenuCategory } from "@/lib/types";
import { loadCollection, saveCollection } from "@/lib/storage";
import { formatCOP } from "@/lib/cart-context";

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
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setItems(loadCollection<MenuItem>(storageKey, initialItems));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function persist(next: MenuItem[]) {
    setItems(next);
    saveCollection(storageKey, next);
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
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
          <div key={item.id} className="rounded-2xl bg-white p-4 shadow-[var(--shadow-card)]">
            <div className="flex items-start gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt=""
                className="h-16 w-16 shrink-0 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1 space-y-2">
                <input
                  value={item.name}
                  onChange={(e) => updateItem(item.id, { name: e.target.value })}
                  className="w-full rounded-lg border border-[var(--color-sand-2)] px-3 py-2 text-sm font-medium text-[var(--color-navy)] outline-none focus:border-[var(--color-gold)]"
                  placeholder="Nombre"
                />
                <textarea
                  value={item.description}
                  onChange={(e) => updateItem(item.id, { description: e.target.value })}
                  rows={2}
                  className="w-full resize-none rounded-lg border border-[var(--color-sand-2)] px-3 py-2 text-xs text-[var(--color-ink-soft)] outline-none focus:border-[var(--color-gold)]"
                  placeholder="Descripción"
                />
                <input
                  value={item.image}
                  onChange={(e) => updateItem(item.id, { image: e.target.value })}
                  className="w-full rounded-lg border border-[var(--color-sand-2)] px-3 py-2 text-xs text-[var(--color-ink-soft)] outline-none focus:border-[var(--color-gold)]"
                  placeholder="URL de la fotografía"
                />

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => updateItem(item.id, { price: Number(e.target.value) })}
                    className="w-28 rounded-lg border border-[var(--color-sand-2)] px-3 py-2 text-sm text-[var(--color-navy)] outline-none focus:border-[var(--color-gold)]"
                  />
                  <span className="text-xs text-[var(--color-ink-soft)]">{formatCOP(item.price)}</span>

                  <select
                    value={item.categoryId}
                    onChange={(e) => updateItem(item.id, { categoryId: e.target.value })}
                    className="rounded-lg border border-[var(--color-sand-2)] px-2 py-2 text-xs text-[var(--color-navy)] outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>

                  <label className="flex items-center gap-1.5 text-xs text-[var(--color-ink-soft)]">
                    <input
                      type="checkbox"
                      checked={item.available}
                      onChange={(e) => updateItem(item.id, { available: e.target.checked })}
                    />
                    Disponible
                  </label>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500"
                    aria-label="Eliminar producto"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addItem}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-dashed border-[var(--color-gold)] py-3 text-sm font-medium text-[var(--color-navy)]"
      >
        <Plus size={16} />
        Añadir producto
      </button>
    </div>
  );
}
