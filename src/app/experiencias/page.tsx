"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { experienceCategories, experienceServices as defaultServices } from "@/data/experiences";
import { loadCollection } from "@/lib/storage";
import { ExperienceService } from "@/lib/types";
import { formatCOP } from "@/lib/cart-context";
import PageHeader from "@/components/ui/PageHeader";
import CategoryTabs from "@/components/ui/CategoryTabs";
import ProductLightbox, { LightboxAction } from "@/components/ui/ProductLightbox";
import { openWhatsapp } from "@/lib/whatsapp";

function buildServiceMsg(service: ExperienceService) {
  return `Hola, soy huésped de AMBAR Hotel Boutique y quisiera más información sobre: ${service.name}.`;
}

export default function ExperiencesPage() {
  const [category, setCategory] = useState(experienceCategories[0].id);
  const [services, setServices] = useState<ExperienceService[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightSvc, setLightSvc] = useState<ExperienceService | null>(null);

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

  const lightAction: LightboxAction = lightSvc
    ? {
        kind: "button",
        label: "Más información",
        variant: "primary",
        onClick: () => {
          openWhatsapp(buildServiceMsg(lightSvc));
        },
      }
    : null;

  return (
    <main className="min-h-screen bg-[#0B0B0C] pb-10">
      <PageHeader title="Servicios & Experiencias" subtitle="El portafolio de AMBAR para tu ocasión" />

      <div className="sticky top-[86px] z-20 bg-[#0B0B0C]/90 backdrop-blur-md py-3">
        <CategoryTabs categories={experienceCategories} active={category} onChange={setCategory} />
      </div>

      <div className="grid grid-cols-2 gap-4 px-5 pt-4">
        {loading && (
          <p className="col-span-2 pt-6 text-center text-sm text-[#D4CCBF]">Cargando…</p>
        )}
        {!loading &&
          filtered.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: 0.04 * i, ease: "easeOut" }}
              className="overflow-hidden rounded-2xl bg-[#1E1C1A] shadow-[var(--shadow-card)] flex flex-col"
              style={{ border: "1px solid rgba(184,147,92,0.22)" }}
            >
              <div
                className="relative h-32 w-full cursor-zoom-in"
                onClick={() => setLightSvc(service)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setLightSvc(service);
                  }
                }}
                aria-label={`Ver ${service.name} en grande`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.images[0]}
                  alt={service.name}
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-2 top-2 rounded-full bg-[#1E1C1A]/90 px-2.5 py-1 text-[10px] font-medium text-[#B8935C]">
                  {experienceCategories.find((c) => c.id === service.categoryId)?.name}
                </span>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-display text-base text-[#F5EFE6]">{service.name}</h3>
                <p className="mt-1 text-xs leading-snug text-[#D4CCBF] line-clamp-2">
                  {service.shortDescription}
                </p>
                <div className="mt-3 pt-3 border-t border-white/5 flex flex-col gap-2">
                  <span className="text-xs font-medium text-[#D4CCBF]">
                    {service.price ? formatCOP(service.price) : "Consultar"}
                  </span>
                  <button
                    onClick={() => openWhatsapp(buildServiceMsg(service))}
                    className="flex w-full items-center justify-center gap-1.5 rounded-full bg-[#B8935C] py-2.5 text-xs font-semibold text-[#0B0B0C] active:scale-[0.97] transition-transform"
                  >
                    <MessageCircle size={13} strokeWidth={2.4} />
                    Más información
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

        {!loading && filtered.length === 0 && (
          <p className="col-span-2 pt-6 text-center text-sm text-[#D4CCBF]">
            Próximamente más experiencias en esta categoría.
          </p>
        )}
      </div>

      <ProductLightbox
        open={!!lightSvc}
        onClose={() => setLightSvc(null)}
        images={lightSvc?.images ?? []}
        name={lightSvc?.name ?? ""}
        description={lightSvc?.fullDescription ?? lightSvc?.shortDescription ?? ""}
        priceText={lightSvc ? (lightSvc.price ? formatCOP(lightSvc.price) : "Consultar precio") : undefined}
        action={lightAction}
      />
    </main>
  );
}
