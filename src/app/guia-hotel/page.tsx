"use client";

import { useEffect, useState } from "react";
import type { ComponentType, SVGProps } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  LeafIcon,
  ClockIcon,
  InfoIcon,
  HeartIcon,
  CarIcon,
  UsersIcon,
  LaptopIcon,
  ArmchairIcon,
  DropletsIcon,
  UtensilsIcon,
  CigaretteOffIcon,
  UserCheckIcon,
  MoonIcon,
  CreditCardIcon,
  BuildingIcon,
  SearchIcon,
  BellRingIcon,
  AlertTriangleIcon,
} from "@/components/ui/AppIcons";
import { HotelIcon, DiscoverPinIcon } from "@/components/ui/HomeIcons";
import {
  hotelIntro,
  hotelSpaces,
  hotelInfoPoints,
  hotelLocation,
  hotelCommitment,
} from "@/data/hotelGuideContent";
import { hotelInfo as defaultHotelInfo } from "@/data/hotelInfo";
import { loadSingleton } from "@/lib/storage";
import type { HotelInfo } from "@/lib/types";
import PageHeader from "@/components/ui/PageHeader";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const iconMap: Record<string, IconComponent> = {
  Car: CarIcon,
  Users: UsersIcon,
  Laptop: LaptopIcon,
  Armchair: ArmchairIcon,
  Droplets: DropletsIcon,
  UtensilsCrossed: UtensilsIcon,
  CigaretteOff: CigaretteOffIcon,
  UserCheck: UserCheckIcon,
  Moon: MoonIcon,
  CreditCard: CreditCardIcon,
  Building2: BuildingIcon,
  Search: SearchIcon,
  BellRing: BellRingIcon,
  AlertTriangle: AlertTriangleIcon,
};

// Mismo patrón visual de acordeón que usa "Guía de la habitación"
// (ver /components/ui/GuideAccordion.tsx): encabezado con ícono circular,
// título y flecha que rota; el contenido se expande/contrae con animación.
function AccordionSection({
  id,
  icon: Icon,
  title,
  isOpen,
  onToggle,
  children,
}: {
  id: string;
  icon: IconComponent;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#1E1C1A] shadow-[var(--shadow-card)]" style={{ border: "1px solid rgba(184,147,92,0.22)" }}>
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-4 text-left"
        aria-expanded={isOpen}
        aria-controls={`section-${id}`}
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center -ml-1 text-[#B8935C]">
          <Icon className="h-5 w-5" strokeWidth={2} />
        </span>
        <span className="flex-1 font-display text-[15px] text-[#F5EFE6]">{title}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={18} className="text-[#D4CCBF]" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`section-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HotelGuidePage() {
  const [openId, setOpenId] = useState<string | null>("intro");
  const [hotelInfo, setHotelInfo] = useState<HotelInfo>(defaultHotelInfo);

  useEffect(() => {
    let active = true;
    loadSingleton<HotelInfo>("hotelInfo", "main", defaultHotelInfo).then((data) => {
      if (active) setHotelInfo(data);
    });
    return () => {
      active = false;
    };
  }, []);

  function toggle(id: string) {
    setOpenId((cur) => (cur === id ? null : id));
  }

  const mapsQuery = encodeURIComponent(hotelLocation.address);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
  const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

  return (
    <main className="min-h-screen bg-[#0B0B0C] pb-10">
      <PageHeader title="Guía del Hotel" subtitle="Todo sobre AMBAR, en un solo lugar" />

      <div className="space-y-3 px-5 pt-4">
        {/* 1. Sobre AMBAR Hotel Boutique */}
        <AccordionSection
          id="intro"
          icon={HotelIcon}
          title={hotelIntro.title}
          isOpen={openId === "intro"}
          onToggle={() => toggle("intro")}
        >
          <div className="space-y-2.5">
            {hotelIntro.paragraphs.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-[#D4CCBF]">
                {p}
              </p>
            ))}
          </div>
        </AccordionSection>

        {/* 2. Nuestros espacios */}
        <AccordionSection
          id="espacios"
          icon={LeafIcon}
          title="Nuestros espacios"
          isOpen={openId === "espacios"}
          onToggle={() => toggle("espacios")}
        >
          <div className="space-y-3">
            {hotelSpaces.map((space) => {
              const Icon = iconMap[space.icon] ?? BuildingIcon;
              return (
                <div
                  key={space.title}
                  className="flex items-start gap-3 rounded-xl bg-[#0B0B0C] p-3"
                >
                  <span
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center -ml-1 ${
                      space.disabled ? "text-[#B8935C]/40" : "text-[#B8935C]"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <div className="min-w-0">
                    <p
                      className={`text-sm font-medium ${
                        space.disabled ? "text-[#D4CCBF]/50" : "text-[#F5EFE6]"
                      }`}
                    >
                      {space.title}
                      {space.disabled && (
                        <span className="ml-2 rounded-full bg-[#1E1C1A] px-2 py-0.5 text-[10px] font-medium text-[#D4CCBF]/70" style={{ border: "1px solid rgba(184,147,92,0.22)" }}>
                          Fuera de servicio
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-[#D4CCBF]">
                      {space.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </AccordionSection>

        {/* 3. Horarios */}
        <AccordionSection
          id="horarios"
          icon={ClockIcon}
          title="Horarios"
          isOpen={openId === "horarios"}
          onToggle={() => toggle("horarios")}
        >
          <div className="divide-y divide-[#1E1C1A] overflow-hidden rounded-xl bg-[#0B0B0C]">
            {(hotelInfo.schedules ?? []).map((s, i) => (
              <div key={`${s.label}-${i}`} className="flex items-center justify-between px-4 py-3 text-sm">
                <span className="font-medium text-[#F5EFE6]">{s.label}</span>
                <span className="text-right text-[#D4CCBF]">{s.value}</span>
              </div>
            ))}
          </div>
        </AccordionSection>

        {/* 4. Información importante */}
        <AccordionSection
          id="info"
          icon={InfoIcon}
          title="Información importante"
          isOpen={openId === "info"}
          onToggle={() => toggle("info")}
        >
          <div className="space-y-3">
            {hotelInfoPoints.map((point) => {
              const Icon = iconMap[point.icon] ?? InfoIcon;
              return (
                <div
                  key={point.title}
                  className="flex items-start gap-3 rounded-xl bg-[#0B0B0C] p-3"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center -ml-1 text-[#B8935C]">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#F5EFE6]">{point.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-[#D4CCBF]">
                      {point.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </AccordionSection>

        {/* 5. Nuestra ubicación */}
        <AccordionSection
          id="ubicacion"
          icon={DiscoverPinIcon}
          title={hotelLocation.title}
          isOpen={openId === "ubicacion"}
          onToggle={() => toggle("ubicacion")}
        >
          <p className="text-sm leading-relaxed text-[#D4CCBF]">{hotelLocation.text}</p>
          <p className="mt-2 flex items-start gap-1.5 text-sm font-medium text-[#F5EFE6]">
            <DiscoverPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#B8935C]" strokeWidth={2} />
            {hotelLocation.address}
          </p>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#B8935C] py-3 text-sm font-medium text-[#0B0B0C] active:scale-[0.98] transition-transform"
          >
            <DiscoverPinIcon className="h-4 w-4" />
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
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir ubicación en Google Maps"
              className="absolute inset-0"
            />
          </div>
        </AccordionSection>

        {/* 6. Nuestro compromiso */}
        <AccordionSection
          id="compromiso"
          icon={HeartIcon}
          title="Nuestro compromiso"
          isOpen={openId === "compromiso"}
          onToggle={() => toggle("compromiso")}
        >
          <p className="text-sm leading-relaxed text-[#D4CCBF]">
            {hotelCommitment}
          </p>
        </AccordionSection>
      </div>
    </main>
  );
}
