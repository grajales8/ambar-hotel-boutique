"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  UtensilsCrossed,
  CupSoda,
  BellRing,
  BookOpenText,
  Compass,
  MapPinned,
  Wifi,
  MessageCircle,
  Star,
  type LucideIcon,
} from "lucide-react";
import { buildWhatsappLink } from "@/lib/whatsapp";
import { GOOGLE_REVIEW_URL } from "@/lib/config";

type MenuAction =
  | { type: "link"; href: string }
  | { type: "whatsapp"; message: string }
  | { type: "external"; href: string };

type MenuEntry = {
  id: string;
  label: string;
  icon: LucideIcon;
  action: MenuAction;
};

// Los 8 accesos principales de la app, en tarjetas del mismo tamaño para
// mantener la grilla perfectamente simétrica (4 filas x 2 columnas).
const mainEntries: MenuEntry[] = [
  { id: "restaurante", label: "Restaurante", icon: UtensilsCrossed, action: { type: "link", href: "/restaurante" } },
  { id: "minibar", label: "Minibar", icon: CupSoda, action: { type: "link", href: "/minibar" } },
  { id: "servicio", label: "Solicitar servicio", icon: BellRing, action: { type: "link", href: "/servicio" } },
  { id: "guia-habitacion", label: "Guía de la habitación", icon: BookOpenText, action: { type: "link", href: "/guia" } },
  { id: "guia-hotel", label: "Guía del Hotel", icon: Compass, action: { type: "link", href: "/guia-hotel" } },
  { id: "descubre", label: "Descubre Cali", icon: MapPinned, action: { type: "link", href: "/descubre" } },
  { id: "wifi", label: "WiFi", icon: Wifi, action: { type: "link", href: "/wifi" } },
  {
    id: "chat",
    label: "Chatear con recepción",
    icon: MessageCircle,
    action: {
      type: "whatsapp",
      message: "Hola, soy huésped de AMBAR Hotel Boutique y quisiera hacer una consulta.",
    },
  },
];

function renderAction(action: MenuAction, children: React.ReactNode, key: string) {
  if (action.type === "link") {
    return (
      <Link key={key} href={action.href}>
        {children}
      </Link>
    );
  }
  if (action.type === "external") {
    return (
      <a key={key} href={action.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
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
    <div className="px-5 pb-10">
      <div className="grid grid-cols-2 gap-4">
        {mainEntries.map((entry, i) => {
          const Icon = entry.icon;
          const card = (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 * i, ease: "easeOut" }}
              whileTap={{ scale: 0.96 }}
              className="flex h-32 flex-col items-center justify-center gap-2.5 rounded-2xl bg-white p-4 text-center shadow-[var(--shadow-card)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-sand)] text-[var(--color-navy)]">
                <Icon size={20} strokeWidth={1.75} />
              </span>
              <span className="text-sm font-medium leading-tight text-[var(--color-navy)]">
                {entry.label}
              </span>
            </motion.div>
          );
          return renderAction(entry.action, card, entry.id);
        })}
      </div>

      {/* Acción secundaria y discreta: no compite con los accesos principales */}
      <motion.a
        href={GOOGLE_REVIEW_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.08 * mainEntries.length }}
        whileTap={{ scale: 0.97 }}
        className="mx-auto mt-5 flex w-fit items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium text-[var(--color-ink-soft)]"
      >
        <Star size={13} strokeWidth={1.75} className="text-[var(--color-gold)]" />
        Calificar experiencia
      </motion.a>
    </div>
  );
}
