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
      className="h-full flex min-h-0 flex-col justify-between px-4 py-2 pb-[max(env(safe-area-inset-bottom),4px)]"
      style={{ backgroundColor: "#0B0B0C" }}
    >
      <div className="grid flex-1 min-h-0 grid-cols-3 gap-3 py-2 content-evenly">
        {gridEntries.map((entry, i) => {
          const Icon = entry.icon;
          const card = (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 * i, ease: "easeOut" }}
              whileTap={{ scale: 0.95 }}
              className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl px-1 py-2 text-center"
              style={{ backgroundColor: "#1E1C1A", border: "1px solid rgba(184,147,92,0.22)" }}
            >
              <Icon className="h-[34px] w-[34px]" style={{ color: BRONZE }} strokeWidth={2} />
              <span className="text-[14px] font-medium leading-tight text-center text-[#F5EFE6]">
                {entry.label}
              </span>
            </motion.div>
          );
          return renderAction(entry.action, card, entry.id);
        })}
      </div>

      <div className="mt-4 mb-1 space-y-3 flex-shrink-0">
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
          className="flex items-center gap-2.5 rounded-2xl px-4 py-3.5"
          style={{ backgroundColor: "#1E1C1A", border: "1px solid rgba(184,147,92,0.22)" }}
        >
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center -ml-1 text-[#B8935C]"
          >
            <ChatBubbleIcon className="h-[22px] w-[22px]" strokeWidth={2} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[18px] font-semibold text-[#F5EFE6]">
              Chatear con recepcion
            </span>
            <span className="block text-[14px] text-[#D4CCBF]">
              Estamos para ayudarte
            </span>
          </span>
          <ChevronRight size={20} className="shrink-0 text-[#B8935C]" />
        </motion.a>

        <motion.a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 * gridEntries.length + 0.05 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2.5 rounded-2xl px-4 py-3.5"
          style={{ backgroundColor: "#1E1C1A", border: "1px solid rgba(184,147,92,0.22)" }}
        >
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center -ml-1 text-[#B8935C]"
          >
            <StarOutlineIcon className="h-[22px] w-[22px]" strokeWidth={2} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[18px] font-semibold text-[#F5EFE6]">
              Calificar experiencia
            </span>
            <span className="block text-[14px] text-[#D4CCBF]">
              Tu opinión nos ayuda a mejorar
            </span>
          </span>
          <ChevronRight size={20} className="shrink-0 text-[#B8935C]" />
        </motion.a>
      </div>
    </div>
  );
}
