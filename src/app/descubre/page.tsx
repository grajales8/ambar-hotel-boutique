"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Globe } from "lucide-react";
import { places as defaultPlaces } from "@/data/places";
import { loadCollection } from "@/lib/storage";
import { PlaceOfInterest } from "@/lib/types";
import PageHeader from "@/components/ui/PageHeader";

export default function DiscoverPage() {
  const [places, setPlaces] = useState<PlaceOfInterest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    loadCollection<PlaceOfInterest>("places", defaultPlaces).then((data) => {
      if (active) {
        setPlaces([...data].sort((a, b) => a.order - b.order));
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const activePlaces = places.filter((p) => p.active);

  return (
    <main className="min-h-screen bg-[var(--color-sand)] pb-10">
      <PageHeader title="Descubre Cali" subtitle="Recomendaciones cerca de AMBAR" />

      <div className="space-y-4 px-5 pt-4">
        {loading && (
          <p className="pt-4 text-center text-sm text-[var(--color-ink-soft)]">Cargando…</p>
        )}
        {!loading && activePlaces.map((place, i) => (
          <motion.div
            key={place.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.06 * i }}
            className="overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)]"
          >
            <div className="relative h-44 w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={place.image}
                alt={place.name}
                className="h-full w-full object-cover"
              />
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[var(--color-navy)]">
                {place.category}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-display text-lg text-[var(--color-navy)]">{place.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[var(--color-ink-soft)]">
                {place.description}
              </p>

              <div className="mt-3 space-y-1 text-xs text-[var(--color-ink-soft)]">
                {place.address && <p>{place.address}</p>}
                {place.hours && <p>{place.hours}</p>}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <a
                  href={place.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--color-navy)] px-4 py-2.5 text-sm font-medium text-white active:scale-95 transition-transform"
                >
                  <MapPin size={15} />
                  Abrir en Google Maps
                </a>
                {place.phone && (
                  <a
                    href={`tel:${place.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--color-sand-2)] px-4 py-2.5 text-sm font-medium text-[var(--color-navy)]"
                  >
                    <Phone size={15} />
                    Llamar
                  </a>
                )}
                {place.website && (
                  <a
                    href={place.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--color-sand-2)] px-4 py-2.5 text-sm font-medium text-[var(--color-navy)]"
                  >
                    <Globe size={15} />
                    Sitio web
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
