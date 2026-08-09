"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass,
  BookOpenText,
  BellRing,
  Wifi,
  CupSoda,
  UtensilsCrossed,
  ShoppingBag,
  Sparkles,
  MapPinned,
  MessageCircle,
  Star,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { buildWhatsappLink } from "@/lib/whatsapp";
import { GOOGLE_REVIEW_URL } from "@/lib/config";

type MenuAction = { type: "link"; href: string } | { type: "whatsapp"; message: string };

type MenuEntry = {
  id: string;
  label: string;
  icon: LucideIcon;
  action: MenuAction;
};

// Los 9 accesos que forman la grilla 3x3, en el orden solicitado. El hero
// de bienvenida vive aparte (WelcomeHero).
const gridEntries: MenuEntry[] = [
  { id: "hotel", label: "Hotel", icon: Compass, action: { type: "link", href: "/guia-hotel" } },
  { id: "guia-habitacion", label: "Guía habitación", icon: BookOpenText, action: { type: "link", href: "/guia" } },
  { id: "servicio", label: "Solicitar servicio", icon: BellRing, action: { type: "link", href: "/servicio" } },
  { id: "wifi", label: "WiFi", icon: Wifi, action: { type: "link", href: "/wifi" } },
  { id: "minibar", label: "Minibar", icon: CupSoda, action: { type: "link", href: "/minibar" } },
  { id: "restaurante", label: "Restaurante", icon: UtensilsCrossed, action: { type: "link", href: "/restaurante" } },
  { id: "boutique", label: "Boutique", icon: ShoppingBag, action: { type: "link", href: "/boutique" } },
  { id: "experiencias", label: "Servicios y experiencias", icon: Sparkles, action: { type: "link", href: "/experiencias" } },
  { id: "descubre", label: "Descubre Cali", icon: MapPinned, action: { type: "link", href: "/descubre" } },
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
    <div className="px-5 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-3">
      <div className="gold-hairline w-8" />
      <p className="mt-1.5 text-[13px] leading-snug text-[var(--color-ink-soft)]">
        Todo lo que necesitas durante tu estadía, a un toque de distancia.
      </p>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {gridEntries.map((entry, i) => {
          const Icon = entry.icon;
          const card = (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.06 * i, ease: "easeOut" }}
              whileTap={{ scale: 0.95 }}
              className="flex h-20 flex-col items-center justify-center gap-1.5 rounded-2xl bg-white px-1.5 py-2.5 text-center shadow-[var(--shadow-card)]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-sand)] text-[var(--color-navy)]">
                <Icon size={15} strokeWidth={1.75} />
              </span>
              <span className="text-[11.5px] font-medium leading-tight text-[var(--color-navy)]">
                {entry.label}
              </span>
              <span className="h-px w-3 bg-[var(--color-gold)]" />
            </motion.div>
          );
          return renderAction(entry.action, card, entry.id);
        })}
      </div>

      {/* Accesos anchos, con más presencia: chatear (primario) y calificar
          (secundario), con el mismo lenguaje de color que ya usa la app —
          el dorado se queda como detalle, nunca como relleno grande. */}
      <div className="mt-3 space-y-2">
        <motion.a
          href={buildWhatsappLink(
            "Hola, soy huésped de AMBAR Hotel Boutique y quisiera hacer una consulta."
          )}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.06 * gridEntries.length }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 rounded-2xl bg-[var(--color-sand-2)] px-4 py-2.5 shadow-[var(--shadow-card)]"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[var(--color-navy)]">
            <MessageCircle size={16} strokeWidth={1.75} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-medium text-[var(--color-navy)]">Chatear con recepción</span>
            <span className="block text-xs text-[var(--color-ink-soft)]">Estamos para ayudarte</span>
          </span>
          <ChevronRight size={16} className="shrink-0 text-[var(--color-ink-soft)]" />
        </motion.a>

        <motion.a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.06 * gridEntries.length + 0.06 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 rounded-2xl border border-[var(--color-sand-2)] bg-white px-4 py-2.5"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-sand)] text-[var(--color-gold)]">
            <Star size={16} strokeWidth={1.75} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-medium text-[var(--color-navy)]">
              Calificar experiencia
            </span>
            <span className="block text-xs text-[var(--color-ink-soft)]">
              Tu opinión nos ayuda a mejorar
            </span>
          </span>
          <ChevronRight size={16} className="shrink-0 text-[var(--color-ink-soft)]" />
        </motion.a>
      </div>
    </div>
  );
}
