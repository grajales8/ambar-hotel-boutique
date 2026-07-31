"use client";

import { useEffect, useMemo, useState } from "react";
import { Trash2, Plus, ChevronUp, ChevronDown, ImagePlus, Star } from "lucide-react";
import { ExperienceService } from "@/lib/types";
import { loadCollection, saveCollection, debounce } from "@/lib/storage";
import { experienceServices as defaultServices, experienceCategories } from "@/data/experiences";
import ImageUploader from "@/components/admin/ImageUploader";

const STORAGE_KEY = "experiences";

export default function ExperiencesEditor() {
  const [services, setServices] = useState<ExperienceService[]>([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let active = true;
    loadCollection<ExperienceService>(STORAGE_KEY, defaultServices).then((data) => {
      if (active) {
        setServices([...data].sort((a, b) => a.order - b.order));
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const debouncedSave = useMemo(
    () =>
      debounce((next: ExperienceService[]) => {
        saveCollection(STORAGE_KEY, next).then(() => {
          setSaved(true);
          setTimeout(() => setSaved(false), 1200);
        });
      }, 700),
    []
  );

  function persist(next: ExperienceService[]) {
    setServices(next);
    debouncedSave(next);
  }

  function update(id: string, patch: Partial<ExperienceService>) {
    persist(services.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }

  function remove(id: string) {
    persist(services.filter((s) => s.id !== id));
  }

  function add() {
    const id = `exp-${Date.now()}`;
    const next: ExperienceService = {
      id,
      name: "Nuevo servicio",
      categoryId: experienceCategories[0]?.id ?? "",
      shortDescription: "",
      fullDescription: "",
      includes: [],
      benefits: [],
      images: [],
      active: true,
      order: services.length,
    };
    persist([...services, next]);
  }

  function move(id: string, direction: "up" | "down") {
    const index = services.findIndex((s) => s.id === id);
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= services.length) return;
    const next = [...services];
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    persist(next.map((s, i) => ({ ...s, order: i })));
  }

  // --- Galería: agregar, eliminar, reordenar (controles arriba/abajo) ---
  function addImage(serviceId: string, url: string) {
    const service = services.find((s) => s.id === serviceId);
    if (!service) return;
    update(serviceId, { images: [...service.images, url] });
  }

  function removeImage(serviceId: string, index: number) {
    const service = services.find((s) => s.id === serviceId);
    if (!service) return;
    update(serviceId, { images: service.images.filter((_, i) => i !== index) });
  }

  function moveImage(serviceId: string, index: number, direction: "up" | "down") {
    const service = services.find((s) => s.id === serviceId);
    if (!service) return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= service.images.length) return;
    const nextImages = [...service.images];
    [nextImages[index], nextImages[targetIndex]] = [nextImages[targetIndex], nextImages[index]];
    update(serviceId, { images: nextImages });
  }

  // La primera imagen del arreglo es siempre la portada (se usa en la
  // tarjeta del catálogo); este atajo la mueve directo a esa posición.
  function makeCover(serviceId: string, index: number) {
    const service = services.find((s) => s.id === serviceId);
    if (!service || index === 0) return;
    const nextImages = [...service.images];
    const [chosen] = nextImages.splice(index, 1);
    nextImages.unshift(chosen);
    update(serviceId, { images: nextImages });
  }

  if (loading) {
    return <p className="text-sm text-[var(--color-ink-soft)]">Cargando…</p>;
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-[var(--color-ink-soft)]">
          {services.length} servicios · los cambios se guardan automáticamente
        </p>
        {saved && <span className="text-xs font-medium text-emerald-600">Guardado ✓</span>}
      </div>

      <div className="space-y-4">
        {services.map((service, index) => (
          <div key={service.id} className="rounded-2xl bg-white p-4 shadow-[var(--shadow-card)] space-y-3">
            <div className="flex gap-2">
              <input
                value={service.name}
                onChange={(e) => update(service.id, { name: e.target.value })}
                placeholder="Nombre del servicio"
                className="flex-1 rounded-lg border border-[var(--color-sand-2)] px-3 py-2 text-sm font-medium text-[var(--color-navy)] outline-none focus:border-[var(--color-gold)]"
              />
              <select
                value={service.categoryId}
                onChange={(e) => update(service.id, { categoryId: e.target.value })}
                className="w-40 rounded-lg border border-[var(--color-sand-2)] px-2 py-2 text-xs text-[var(--color-navy)] outline-none"
              >
                {experienceCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              value={service.shortDescription}
              onChange={(e) => update(service.id, { shortDescription: e.target.value })}
              rows={2}
              placeholder="Descripción corta (para la tarjeta del catálogo)"
              className="w-full resize-none rounded-lg border border-[var(--color-sand-2)] px-3 py-2 text-xs text-[var(--color-ink-soft)] outline-none focus:border-[var(--color-gold)]"
            />

            <textarea
              value={service.fullDescription}
              onChange={(e) => update(service.id, { fullDescription: e.target.value })}
              rows={3}
              placeholder="Descripción completa (para la página de detalle)"
              className="w-full resize-none rounded-lg border border-[var(--color-sand-2)] px-3 py-2 text-xs text-[var(--color-ink-soft)] outline-none focus:border-[var(--color-gold)]"
            />

            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--color-ink-soft)]">
                Qué incluye (una línea por ítem)
              </label>
              <textarea
                value={service.includes.join("\n")}
                onChange={(e) =>
                  update(service.id, {
                    includes: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean),
                  })
                }
                rows={3}
                placeholder={"Pétalos de rosa\nVelas decorativas\nBotella de vino"}
                className="w-full resize-none rounded-lg border border-[var(--color-sand-2)] px-3 py-2 text-xs text-[var(--color-ink-soft)] outline-none focus:border-[var(--color-gold)]"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--color-ink-soft)]">
                Beneficios (una línea por ítem, opcional)
              </label>
              <textarea
                value={service.benefits.join("\n")}
                onChange={(e) =>
                  update(service.id, {
                    benefits: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean),
                  })
                }
                rows={2}
                className="w-full resize-none rounded-lg border border-[var(--color-sand-2)] px-3 py-2 text-xs text-[var(--color-ink-soft)] outline-none focus:border-[var(--color-gold)]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--color-ink-soft)]">Precio (deja vacío para &quot;Consultar&quot;)</span>
              <input
                type="number"
                value={service.price ?? ""}
                onChange={(e) =>
                  update(service.id, {
                    price: e.target.value === "" ? undefined : Number(e.target.value),
                  })
                }
                className="w-32 rounded-lg border border-[var(--color-sand-2)] px-3 py-2 text-sm text-[var(--color-navy)] outline-none focus:border-[var(--color-gold)]"
              />
            </div>

            {/* Galería de imágenes */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--color-ink-soft)]">
                Galería de fotos ({service.images.length})
              </label>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {service.images.map((img, i) => (
                  <div key={i} className="space-y-1">
                    <div className="relative h-20 w-full overflow-hidden rounded-lg">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt="" className="h-full w-full object-cover" />
                      {i === 0 && (
                        <span className="absolute left-1 top-1 flex items-center gap-0.5 rounded-full bg-[var(--color-navy)] px-1.5 py-0.5 text-[9px] font-medium text-white">
                          <Star size={9} className="fill-white" />
                          Portada
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      {i !== 0 && (
                        <button
                          onClick={() => makeCover(service.id, i)}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-sand)] text-[var(--color-navy)]"
                          aria-label="Usar como portada"
                          title="Usar como portada"
                        >
                          <Star size={12} />
                        </button>
                      )}
                      <button
                        onClick={() => moveImage(service.id, i, "up")}
                        disabled={i === 0}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-sand)] text-[var(--color-navy)] disabled:opacity-30"
                        aria-label="Mover antes"
                      >
                        <ChevronUp size={12} />
                      </button>
                      <button
                        onClick={() => moveImage(service.id, i, "down")}
                        disabled={i === service.images.length - 1}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-sand)] text-[var(--color-navy)] disabled:opacity-30"
                        aria-label="Mover después"
                      >
                        <ChevronDown size={12} />
                      </button>
                      <button
                        onClick={() => removeImage(service.id, i)}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50 text-red-500"
                        aria-label="Eliminar foto"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="w-full">
                  <ImageUploader value="" onChange={(url) => url && addImage(service.id, url)} />
                </div>
              </div>
              {service.images.length === 0 && (
                <p className="mt-1 flex items-center gap-1 text-xs text-[var(--color-ink-soft)]">
                  <ImagePlus size={12} />
                  Agrega al menos una foto para que se muestre en el catálogo.
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 border-t border-[var(--color-sand-2)] pt-3">
              <label className="flex items-center gap-1.5 text-xs text-[var(--color-ink-soft)]">
                <input
                  type="checkbox"
                  checked={service.active}
                  onChange={(e) => update(service.id, { active: e.target.checked })}
                />
                Disponible (visible para huéspedes)
              </label>

              <div className="ml-auto flex items-center gap-1.5">
                <button
                  onClick={() => move(service.id, "up")}
                  disabled={index === 0}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-sand)] text-[var(--color-navy)] disabled:opacity-30"
                  aria-label="Subir en el orden"
                >
                  <ChevronUp size={14} />
                </button>
                <button
                  onClick={() => move(service.id, "down")}
                  disabled={index === services.length - 1}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-sand)] text-[var(--color-navy)] disabled:opacity-30"
                  aria-label="Bajar en el orden"
                >
                  <ChevronDown size={14} />
                </button>
                <button
                  onClick={() => remove(service.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500"
                  aria-label="Eliminar servicio"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={add}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-dashed border-[var(--color-gold)] py-3 text-sm font-medium text-[var(--color-navy)]"
      >
        <Plus size={16} />
        Añadir servicio
      </button>
    </div>
  );
}
