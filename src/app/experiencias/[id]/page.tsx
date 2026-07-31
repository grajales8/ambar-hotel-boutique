"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Check, Sparkles, MessageCircle } from "lucide-react";
import { experienceCategories, experienceServices as defaultServices } from "@/data/experiences";
import { loadCollection } from "@/lib/storage";
import { ExperienceService } from "@/lib/types";
import { formatCOP } from "@/lib/cart-context";
import { buildWhatsappLink } from "@/lib/whatsapp";
import PageHeader from "@/components/ui/PageHeader";
import Carousel from "@/components/ui/Carousel";

export default function ExperienceDetailPage() {
  const params = useParams<{ id: string }>();
  const [services, setServices] = useState<ExperienceService[]>(defaultServices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    loadCollection<ExperienceService>("experiences", defaultServices).then((data) => {
      if (active) {
        setServices(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const service = services.find((s) => s.id === params.id);
  const categoryName = experienceCategories.find((c) => c.id === service?.categoryId)?.name;

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--color-sand)]">
        <PageHeader title="Servicios & Experiencias" backHref="/experiencias" />
        <p className="px-5 pt-6 text-sm text-[var(--color-ink-soft)]">Cargando…</p>
      </main>
    );
  }

  if (!service) {
    return (
      <main className="min-h-screen bg-[var(--color-sand)]">
        <PageHeader title="Servicios & Experiencias" backHref="/experiencias" />
        <p className="px-5 pt-6 text-sm text-[var(--color-ink-soft)]">
          No encontramos esta experiencia. Puede que ya no esté disponible.
        </p>
      </main>
    );
  }

  const whatsappMessage = `Hola, quisiera más información sobre "${service.name}" en AMBAR Hotel Boutique.`;

  return (
    <main className="min-h-screen bg-[var(--color-sand)] pb-12">
      <PageHeader title={service.name} subtitle={categoryName} backHref="/experiencias" />

      <div className="mx-5 mt-4 overflow-hidden rounded-2xl shadow-[var(--shadow-card)]">
        <Carousel images={service.images} alt={service.name} />
      </div>

      <div className="px-5 pt-5">
        <div className="flex items-start justify-between gap-3">
          <h1 className="font-display text-xl text-[var(--color-navy)]">{service.name}</h1>
          <span className="shrink-0 font-display text-lg text-[var(--color-navy)]">
            {service.price ? formatCOP(service.price) : "Consultar"}
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-soft)]">
          {service.fullDescription}
        </p>

        {service.includes.length > 0 && (
          <div className="mt-5">
            <h2 className="font-display text-sm text-[var(--color-navy)]">Qué incluye</h2>
            <ul className="mt-2 space-y-1.5">
              {service.includes.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-ink-soft)]">
                  <Check size={15} className="mt-0.5 shrink-0 text-[var(--color-gold)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {service.benefits.length > 0 && (
          <div className="mt-5">
            <h2 className="font-display text-sm text-[var(--color-navy)]">Beneficios</h2>
            <ul className="mt-2 space-y-1.5">
              {service.benefits.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-ink-soft)]">
                  <Sparkles size={15} className="mt-0.5 shrink-0 text-[var(--color-gold)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <a
          href={buildWhatsappLink(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-navy)] py-4 font-medium text-white active:scale-[0.98] transition-transform"
        >
          <MessageCircle size={16} />
          Más información
        </a>
      </div>
    </main>
  );
}
