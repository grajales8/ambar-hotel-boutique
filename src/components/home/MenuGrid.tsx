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
      className="h-full flex flex-col justify-between px-4 py-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)]"
      style={{ backgroundColor: "#0B0B0C" }}
    >
      <div className="grid flex-1 grid-cols-3 gap-2 min-h-0 content-evenly">
        {gridEntries.map((entry, i) => {
          const Icon = entry.icon;
          const card = (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 * i, ease: "easeOut" }}
              whileTap={{ scale: 0.95 }}
              className="flex aspect-[4/3.4] min-h-[88px] w-full flex-col items-center justify-center gap-1.5 rounded-xl px-1 py-2 text-center"
              style={{ backgroundColor: "#1E1C1A", border: "1px solid rgba(184,147,92,0.22)" }}
            >
              <Icon style={{ color: BRONZE, height: "clamp(28px, 4.2svh, 36px)", width: "clamp(28px, 4.2svh, 36px)" }} strokeWidth={2} />
              <span style={{ fontSize: "clamp(12px, 1.65svh, 14px)" }} className="font-medium leading-tight text-[#F5EFE6]">
                {entry.label}
              </span>
            </motion.div>
          );
          return renderAction(entry.action, card, entry.id);
        })}
      </div>

      <div className="mt-2 mb-1 space-y-2.5 flex-shrink-0">
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
          className="flex items-center gap-3 rounded-xl"
          style={{
            backgroundColor: "#1E1C1A",
            border: "1px solid rgba(184,147,92,0.22)",
            padding: "clamp(10px, 1.7svh, 16px) clamp(12px, 2svw, 16px)",
          }}
        >
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center -ml-1 text-[#B8935C]"
          >
            <ChatBubbleIcon style={{ height: "clamp(18px, 2.6svh, 22px)", width: "clamp(18px, 2.6svh, 22px)" }} strokeWidth={2} />
          </span>
          <span className="min-w-0 flex-1">
            <span style={{ fontSize: "clamp(15px, 2.1svh, 18px)" }} className="block font-semibold text-[#F5EFE6]">
              Chatear con recepción
            </span>
            <span style={{ fontSize: "clamp(11px, 1.55svh, 13px)" }} className="block text-[#D4CCBF]">
              Estamos para ayudarte
            </span>
          </span>
          <ChevronRight style={{ height: "clamp(16px, 2.3svh, 20px)", width: "clamp(16px, 2.3svh, 20px)" }} className="shrink-0 text-[#B8935C]" />
        </motion.a>

        <motion.a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 * gridEntries.length + 0.05 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 rounded-xl"
          style={{
            backgroundColor: "#1E1C1A",
            border: "1px solid rgba(184,147,92,0.22)",
            padding: "clamp(10px, 1.7svh, 16px) clamp(12px, 2svw, 16px)",
          }}
        >
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center -ml-1 text-[#B8935C]"
          >
            <StarOutlineIcon style={{ height: "clamp(18px, 2.6svh, 22px)", width: "clamp(18px, 2.6svh, 22px)" }} strokeWidth={2} />
          </span>
          <span className="min-w-0 flex-1">
            <span style={{ fontSize: "clamp(15px, 2.1svh, 18px)" }} className="block font-semibold text-[#F5EFE6]">
              Calificar experiencia
            </span>
            <span style={{ fontSize: "clamp(11px, 1.55svh, 13px)" }} className="block text-[#D4CCBF]">
              Tu opinión nos ayuda a mejorar
            </span>
          </span>
          <ChevronRight style={{ height: "clamp(16px, 2.3svh, 20px)", width: "clamp(16px, 2.3svh, 20px)" }} className="shrink-0 text-[#B8935C]" />
        </motion.a>
      </div>
    </div>
  );
}
