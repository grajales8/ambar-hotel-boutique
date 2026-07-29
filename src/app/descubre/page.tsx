"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { places } from "@/data/places";
import PageHeader from "@/components/ui/PageHeader";

export default function DiscoverPage() {
  return (
    <main className="min-h-screen bg-[var(--color-sand)] pb-10">
      <PageHeader title="Descubre Cali" subtitle="Recomendaciones cerca de AMBAR" />

      <div className="space-y-4 px-5 pt-4">
        {places.map((place, i) => (
          <motion.div
            key={place.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.06 * i }}
            className="overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)]"
          >
            <div className="relative h-44 w-full">
              <Image
                src={place.image}
                alt={place.name}
                fill
                sizes="(max-width: 480px) 100vw, 500px"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-display text-lg text-[var(--color-navy)]">{place.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[var(--color-ink-soft)]">
                {place.description}
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  place.mapsQuery
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-navy)] px-4 py-2.5 text-sm font-medium text-white active:scale-95 transition-transform"
              >
                <MapPin size={15} />
                Abrir en Google Maps
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
