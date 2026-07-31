"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { experienceCategories, experienceServices as defaultServices } from "@/data/experiences";
import { loadCollection } from "@/lib/storage";
import { ExperienceService } from "@/lib/types";
import { formatCOP } from "@/lib/cart-context";
import PageHeader from "@/components/ui/PageHeader";
import CategoryTabs from "@/components/ui/CategoryTabs";

export default function ExperiencesPage() {
  const [category, setCategory] = useState(experienceCategories[0].id);
  const [services, setServices] = useState<ExperienceService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    loadCollection<ExperienceService>("experiences", defaultServices).then((data) => {
      if (active) {
        setServices([...data].sort((a, b) => a.order - b.order));
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const filtered = services.filter((s) => s.categoryId === category && s.active);

  return (
    <main className="min-h-screen bg-[var(--color-sand)] pb-10">
      <PageHeader title="Servicios & Experiencias" subtitle="El portafolio de AMBAR para tu ocasión" />

      <div className="sticky top-[86px] z-20 bg-[var(--color-sand)]/90 backdrop-blur-md py-3">
        <CategoryTabs categories={experienceCategories} active={category} onChange={setCategory} />
      </div>

      <div className="grid grid-cols-2 gap-4 px-5 pt-4">
        {loading && (
          <p className="col-span-2 pt-6 text-center text-sm text-[var(--color-ink-soft)]">Cargando…</p>
        )}
        {!loading && filtered.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: 0.04 * i, ease: "easeOut" }}
            className="overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)]"
          >
            <div className="relative h-32 w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={service.images[0]}
                alt={service.name}
                className="h-full w-full object-cover"
              />
              <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium text-[var(--color-navy)]">
                {experienceCategories.find((c) => c.id === service.categoryId)?.name}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-display text-base text-[var(--color-navy)]">{service.name}</h3>
              <p className="mt-1 text-xs leading-snug text-[var(--color-ink-soft)] line-clamp-2">
                {service.shortDescription}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--color-ink-soft)]">
                  {service.price ? formatCOP(service.price) : "Consultar"}
                </span>
                <Link
                  href={`/experiencias/${service.id}`}
                  className="flex items-center gap-1 text-xs font-medium text-[var(--color-navy)]"
                >
                  Ver más
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}

        {!loading && filtered.length === 0 && (
          <p className="col-span-2 pt-6 text-center text-sm text-[var(--color-ink-soft)]">
            Próximamente más experiencias en esta categoría.
          </p>
        )}
      </div>
    </main>
  );
}
