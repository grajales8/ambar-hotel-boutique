"use client";

import Link from "next/link";
import type { SVGProps } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import {
  HotelIcon,
  DoorHangerIcon,
  ServiceBellIcon,
  WifiIcon,
  MinibarIcon,
  UtensilsCrossedIcon,
  BoutiqueBagIcon,
  SparkleServiceIcon,
  DiscoverPinIcon,
  ChatBubbleIcon,
  StarOutlineIcon,
} from "@/components/ui/HomeIcons";
import { buildWhatsappLink } from "@/lib/whatsapp";
import { GOOGLE_REVIEW_URL } from "@/lib/config";

const BRONZE = "#B8935C";

type MenuAction = { type: "link"; href: string } | { type: "whatsapp"; message: string };

type MenuEntry = {
  id: string;
  label: string;
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  action: MenuAction;
};

// Los 9 accesos que forman la grilla 3x3, en el orden solicitado, con
// íconos propios en línea fina (ver /components/ui/HomeIcons.tsx). Tema
// negro mate + bronce: tarjetas en gris carbón, íconos y texto en bronce
// — solo en esta pantalla de inicio.
const gridEntries: MenuEntry[] = [
  { id: "hotel", label: "Hotel", icon: HotelIcon, action: { type: "link", href: "/guia-hotel" } },
  { id: "guia-habitacion", label: "Guía habitación", icon: DoorHangerIcon, action: { type: "link", href: "/guia" } },
  { id: "servicio", label: "Solicitar servicio", icon: ServiceBellIcon, action: { type: "link", href: "/servicio" } },
  { id: "wifi", label: "WiFi", icon: WifiIcon, action: { type: "link", href: "/wifi" } },
  { id: "minibar", label: "Minibar", icon: MinibarIcon, action: { type: "link", href: "/minibar" } },
  { id: "restaurante", label: "Restaurante", icon: UtensilsCrossedIcon, action: { type: "link", href: "/restaurante" } },
  { id: "boutique", label: "Boutique", icon: BoutiqueBagIcon, action: { type: "link", href: "/boutique" } },
  { id: "experiencias", label: "Servicios y experiencias", icon: SparkleServiceIcon, action: { type: "link", href: "/experiencias" } },
  { id: "descubre", label: "Descubre Cali", icon: DiscoverPinIcon, action: { type: "link", href: "/descubre" } },
];

function renderAction(action: MenuAction, children: React.ReactNode, key: string) {
  if (action.type === "link") {
    return (
      <Link key={key} href={action.href}>
        {children}
      </Link>
    );
  }
  return (
    <a key={key} href={buildWhatsappLink(action.message)} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default function MenuGrid() {
  return (
    <div
      className="h-full flex flex-col justify-between px-4 py-1 md:py-2 pb-[calc(env(safe-area-inset-bottom)+0.25rem)] md:pb-[calc(env(safe-area-inset-bottom)+0.5rem)]"
      style={{ backgroundColor: "#0B0B0C" }}
    >
      <div className="grid flex-1 grid-cols-3 gap-2 py-2 md:py-3 min-h-0 content-evenly">
        {gridEntries.map((entry, i) => {
          const Icon = entry.icon;
          const card = (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 * i, ease: "easeOut" }}
              whileTap={{ scale: 0.95 }}
              className="flex min-h-[88px] md:min-h-[108px] flex-col items-center justify-center gap-1.5 rounded-xl px-1 py-2 text-center"
              style={{ backgroundColor: "#1E1C1A", border: "1px solid rgba(184,147,92,0.22)" }}
            >
              <Icon className="h-8 w-8 md:h-9 md:w-9" style={{ color: BRONZE }} strokeWidth={2} />
              <span className="text-[13px] md:text-[14.5px] font-medium leading-tight text-[#F5EFE6]">
                {entry.label}
              </span>
            </motion.div>
          );
          return renderAction(entry.action, card, entry.id);
        })}
      </div>

      <div className="mt-1 md:mt-2 mb-1 space-y-2 md:space-y-2.5 flex-shrink-0">
        <motion.a
          href={buildWhatsappLink(
            "Hola, soy huésped de AMBAR Hotel Boutique y quisiera hacer una consulta."
          )}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 * gridEntries.length }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2.5 md:gap-3 rounded-xl px-3 md:px-4 py-3 md:py-3.5"
          style={{ backgroundColor: "#1E1C1A", border: "1px solid rgba(184,147,92,0.22)" }}
        >
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center -ml-1 text-[#B8935C]"
          >
            <ChatBubbleIcon className="h-5 w-5 md:h-[22px] md:w-[22px]" strokeWidth={2} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-base md:text-[18px] font-semibold text-[#F5EFE6]">
              Chatear con recepción
            </span>
            <span className="block text-[12px] md:text-[13.5px] text-[#D4CCBF]">
              Estamos para ayudarte
            </span>
          </span>
          <ChevronRight size={18} className="md:h-5 md:w-5 shrink-0 text-[#B8935C]" />
        </motion.a>

        <motion.a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 * gridEntries.length + 0.05 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2.5 md:gap-3 rounded-xl px-3 md:px-4 py-3 md:py-3.5"
          style={{ backgroundColor: "#1E1C1A", border: "1px solid rgba(184,147,92,0.22)" }}
        >
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center -ml-1 text-[#B8935C]"
          >
            <StarOutlineIcon className="h-5 w-5 md:h-[22px] md:w-[22px]" strokeWidth={2} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-base md:text-[18px] font-semibold text-[#F5EFE6]">
              Calificar experiencia
            </span>
            <span className="block text-[12px] md:text-[13.5px] text-[#D4CCBF]">
              Tu opinión nos ayuda a mejorar
            </span>
          </span>
          <ChevronRight size={18} className="md:h-5 md:w-5 shrink-0 text-[#B8935C]" />
        </motion.a>
      </div>
    </div>
  );
}
