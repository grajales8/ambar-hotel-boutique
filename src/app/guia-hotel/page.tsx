"use client";

import { motion } from "framer-motion";
import {
  Hotel,
  Leaf,
  Clock,
  Info,
  MapPin,
  Heart,
  Car,
  Users,
  Laptop,
  Armchair,
  Droplets,
  UtensilsCrossed,
  CigaretteOff,
  UserCheck,
  Moon,
  CreditCard,
  Building2,
  Search,
  BellRing,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";
import {
  hotelIntro,
  hotelSpaces,
  hotelSchedules,
  hotelInfoPoints,
  hotelLocation,
  hotelCommitment,
} from "@/data/hotelGuideContent";
import PageHeader from "@/components/ui/PageHeader";

const iconMap: Record<string, LucideIcon> = {
  Car,
  Users,
  Laptop,
  Armchair,
  Droplets,
  UtensilsCrossed,
  CigaretteOff,
  UserCheck,
  Moon,
  CreditCard,
  Building2,
  Search,
  BellRing,
  AlertTriangle,
};

function Card({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="rounded-2xl bg-white p-5 shadow-[var(--shadow-card)]"
    >
      {children}
    </motion.div>
  );
}

function CardTitle({ icon: Icon, title }: { icon: LucideIcon; title: string }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-sand)] text-[var(--color-navy)]">
        <Icon size={18} strokeWidth={1.75} />
      </span>
      <h2 className="font-display text-base text-[var(--color-navy)]">{title}</h2>
    </div>
  );
}

export default function HotelGuidePage() {
  const mapsQuery = encodeURIComponent(hotelLocation.address);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
  const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

  return (
    <main className="min-h-screen bg-[var(--color-sand)] pb-10">
      <PageHeader title="Guía del Hotel" subtitle="Todo sobre AMBAR, en un solo lugar" />

      <div className="space-y-4 px-5 pt-4">
        {/* 1. Sobre AMBAR Hotel Boutique */}
        <Card>
          <CardTitle icon={Hotel} title={hotelIntro.title} />
          <div className="space-y-2.5">
            {hotelIntro.paragraphs.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-[var(--color-ink-soft)]">
                {p}
              </p>
            ))}
          </div>
        </Card>

        {/* 2. Nuestros espacios */}
        <Card delay={0.05}>
          <CardTitle icon={Leaf} title="Nuestros espacios" />
          <div className="space-y-3">
            {hotelSpaces.map((space) => {
              const Icon = iconMap[space.icon] ?? Building2;
              return (
                <div key={space.label} className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      space.disabled
                        ? "bg-[var(--color-sand-2)] text-[var(--color-ink-soft)]"
                        : "bg-[var(--color-sand)] text-[var(--color-navy)]"
                    }`}
                  >
                    <Icon size={15} strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <p
                      className={`text-sm font-medium ${
                        space.disabled ? "text-[var(--color-ink-soft)]" : "text-[var(--color-navy)]"
                      }`}
                    >
                      {space.label}
                      {space.disabled && (
                        <span className="ml-2 rounded-full bg-[var(--color-sand-2)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-ink-soft)]">
                          Fuera de servicio
                        </span>
                      )}
                    </p>
                    {space.note && (
                      <p className="text-xs text-[var(--color-ink-soft)]">{space.note}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* 3. Horarios */}
        <Card delay={0.1}>
          <CardTitle icon={Clock} title="Horarios" />
          <div className="divide-y divide-[var(--color-sand-2)] overflow-hidden rounded-xl bg-[var(--color-sand)]">
            {hotelSchedules.map((s) => (
              <div key={s.label} className="flex items-center justify-between px-4 py-3 text-sm">
                <span className="font-medium text-[var(--color-navy)]">{s.label}</span>
                <span className="text-right text-[var(--color-ink-soft)]">{s.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* 4. Información importante */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
          className="flex items-center gap-2 pt-2"
        >
          <Info size={16} className="text-[var(--color-navy)]" />
          <h2 className="font-display text-base text-[var(--color-navy)]">Información importante</h2>
        </motion.div>

        <div className="space-y-3">
          {hotelInfoPoints.map((point, i) => {
            const Icon = iconMap[point.icon] ?? Info;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: 0.03 * i, ease: "easeOut" }}
                className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-[var(--shadow-card)]"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-sand)] text-[var(--color-navy)]">
                  <Icon size={16} strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[var(--color-navy)]">{point.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-[var(--color-ink-soft)]">
                    {point.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 5. Nuestra ubicación */}
        <Card delay={0.05}>
          <CardTitle icon={MapPin} title={hotelLocation.title} />
          <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">{hotelLocation.text}</p>
          <p className="mt-2 flex items-start gap-1.5 text-sm font-medium text-[var(--color-navy)]">
            <MapPin size={15} className="mt-0.5 shrink-0 text-[var(--color-gold)]" />
            {hotelLocation.address}
          </p>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-navy)] py-3 text-sm font-medium text-white active:scale-[0.98] transition-transform"
          >
            <MapPin size={15} />
            Abrir en Google Maps
          </a>

          <div className="relative mt-4 h-[200px] w-full overflow-hidden rounded-xl">
            <iframe
              src={mapsEmbedUrl}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de AMBAR Hotel Boutique"
            />
            {/* Capa transparente: al tocar el mapa se abre Google Maps
                directamente (app si está instalada, o navegador si no),
                en vez de interactuar con el mapa incrustado. */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir ubicación en Google Maps"
              className="absolute inset-0"
            />
          </div>
        </Card>

        {/* 6. Nuestro compromiso */}
        <Card delay={0.05}>
          <CardTitle icon={Heart} title="Nuestro compromiso" />
          <p className="font-display text-[15px] italic leading-relaxed text-[var(--color-navy)]">
            {hotelCommitment}
          </p>
        </Card>
      </div>
    </main>
  );
}
