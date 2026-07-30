"use client";

import { useEffect, useMemo, useState } from "react";
import { Trash2, Plus, ChevronUp, ChevronDown } from "lucide-react";
import { PlaceOfInterest } from "@/lib/types";
import { loadCollection, saveCollection, debounce } from "@/lib/storage";
import { places as defaultPlaces } from "@/data/places";
import ImageUploader from "@/components/admin/ImageUploader";

const STORAGE_KEY = "places";

export default function PlacesEditor() {
  const [places, setPlaces] = useState<PlaceOfInterest[]>([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let active = true;
    loadCollection<PlaceOfInterest>(STORAGE_KEY, defaultPlaces).then((data) => {
      if (active) {
        setPlaces([...data].sort((a, b) => a.order - b.order));
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const debouncedSave = useMemo(
    () =>
      debounce((next: PlaceOfInterest[]) => {
        saveCollection(STORAGE_KEY, next).then(() => {
          setSaved(true);
          setTimeout(() => setSaved(false), 1200);
        });
      }, 700),
    []
  );

  function persist(next: PlaceOfInterest[]) {
    setPlaces(next);
    debouncedSave(next);
  }

  function updatePlace(id: string, patch: Partial<PlaceOfInterest>) {
    persist(places.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }

  function removePlace(id: string) {
    persist(places.filter((p) => p.id !== id));
  }

  function addPlace() {
    const id = `place-${Date.now()}`;
    const next: PlaceOfInterest = {
      id,
      name: "Nuevo lugar",
      category: "General",
      description: "",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop",
      address: "",
      hours: "",
      mapsUrl: "",
      active: true,
      order: places.length,
    };
    persist([...places, next]);
  }

  function move(id: string, direction: "up" | "down") {
    const index = places.findIndex((p) => p.id === id);
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= places.length) return;
    const next = [...places];
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    // Reasigna `order` según la nueva posición, para que el orden
    // sobreviva a una relectura desde Firestore.
    const reordered = next.map((p, i) => ({ ...p, order: i }));
    persist(reordered);
  }

  if (loading) {
    return <p className="text-sm text-[var(--color-ink-soft)]">Cargando…</p>;
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-[var(--color-ink-soft)]">
          {places.length} lugares · el orden de esta lista es el orden en que aparecen para el huésped
        </p>
        {saved && <span className="text-xs font-medium text-emerald-600">Guardado ✓</span>}
      </div>

      <div className="space-y-3">
        {places.map((place, index) => (
          <div key={place.id} className="rounded-2xl bg-white p-4 shadow-[var(--shadow-card)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
              <div className="w-full sm:w-40">
                <ImageUploader
                  value={place.image}
                  onChange={(url) => updatePlace(place.id, { image: url })}
                />
              </div>

              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex gap-2">
                  <input
                    value={place.name}
                    onChange={(e) => updatePlace(place.id, { name: e.target.value })}
                    placeholder="Nombre"
                    className="flex-1 rounded-lg border border-[var(--color-sand-2)] px-3 py-2 text-sm font-medium text-[var(--color-navy)] outline-none focus:border-[var(--color-gold)]"
                  />
                  <input
                    value={place.category}
                    onChange={(e) => updatePlace(place.id, { category: e.target.value })}
                    placeholder="Categoría"
                    className="w-32 rounded-lg border border-[var(--color-sand-2)] px-3 py-2 text-xs text-[var(--color-navy)] outline-none focus:border-[var(--color-gold)]"
                  />
                </div>

                <textarea
                  value={place.description}
                  onChange={(e) => updatePlace(place.id, { description: e.target.value })}
                  rows={2}
                  placeholder="Descripción"
                  className="w-full resize-none rounded-lg border border-[var(--color-sand-2)] px-3 py-2 text-xs text-[var(--color-ink-soft)] outline-none focus:border-[var(--color-gold)]"
                />

                <div className="flex gap-2">
                  <input
                    value={place.address}
                    onChange={(e) => updatePlace(place.id, { address: e.target.value })}
                    placeholder="Dirección"
                    className="flex-1 rounded-lg border border-[var(--color-sand-2)] px-3 py-2 text-xs text-[var(--color-ink-soft)] outline-none focus:border-[var(--color-gold)]"
                  />
                  <input
                    value={place.hours}
                    onChange={(e) => updatePlace(place.id, { hours: e.target.value })}
                    placeholder="Horario"
                    className="w-32 rounded-lg border border-[var(--color-sand-2)] px-3 py-2 text-xs text-[var(--color-ink-soft)] outline-none focus:border-[var(--color-gold)]"
                  />
                </div>

                <div className="flex gap-2">
                  <input
                    value={place.phone ?? ""}
                    onChange={(e) => updatePlace(place.id, { phone: e.target.value || undefined })}
                    placeholder="Teléfono (opcional)"
                    className="flex-1 rounded-lg border border-[var(--color-sand-2)] px-3 py-2 text-xs text-[var(--color-ink-soft)] outline-none focus:border-[var(--color-gold)]"
                  />
                  <input
                    value={place.website ?? ""}
                    onChange={(e) => updatePlace(place.id, { website: e.target.value || undefined })}
                    placeholder="Sitio web (opcional)"
                    className="flex-1 rounded-lg border border-[var(--color-sand-2)] px-3 py-2 text-xs text-[var(--color-ink-soft)] outline-none focus:border-[var(--color-gold)]"
                  />
                </div>

                <input
                  value={place.mapsUrl}
                  onChange={(e) => updatePlace(place.id, { mapsUrl: e.target.value })}
                  placeholder="Enlace de Google Maps"
                  className="w-full rounded-lg border border-[var(--color-sand-2)] px-3 py-2 text-xs text-[var(--color-ink-soft)] outline-none focus:border-[var(--color-gold)]"
                />

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <label className="flex items-center gap-1.5 text-xs text-[var(--color-ink-soft)]">
                    <input
                      type="checkbox"
                      checked={place.active}
                      onChange={(e) => updatePlace(place.id, { active: e.target.checked })}
                    />
                    Activo (visible para huéspedes)
                  </label>

                  <div className="ml-auto flex items-center gap-1.5">
                    <button
                      onClick={() => move(place.id, "up")}
                      disabled={index === 0}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-sand)] text-[var(--color-navy)] disabled:opacity-30"
                      aria-label="Subir"
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      onClick={() => move(place.id, "down")}
                      disabled={index === places.length - 1}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-sand)] text-[var(--color-navy)] disabled:opacity-30"
                      aria-label="Bajar"
                    >
                      <ChevronDown size={14} />
                    </button>
                    <button
                      onClick={() => removePlace(place.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500"
                      aria-label="Eliminar lugar"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addPlace}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-dashed border-[var(--color-gold)] py-3 text-sm font-medium text-[var(--color-navy)]"
      >
        <Plus size={16} />
        Añadir lugar
      </button>
    </div>
  );
}
