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

type MenuAction = { type: "link"; href: string } | { type: "whatsapp"; message: string };

type MenuEntry = {
  id: string;
  label: string;
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  action: MenuAction;
};

// Los 9 accesos que forman la grilla 3x3, en el orden solicitado, con
// íconos propios en línea fina (ver /components/ui/HomeIcons.tsx). Tema
// oscuro: tarjetas en azul marino, íconos y detalles en dorado, texto
// blanco — solo en esta pantalla de inicio.
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
    <div className="bg-[var(--color-navy)] px-5 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-6">
      <div className="grid grid-cols-3 gap-2">
        {gridEntries.map((entry, i) => {
          const Icon = entry.icon;
          const card = (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.06 * i, ease: "easeOut" }}
              whileTap={{ scale: 0.95 }}
              className="flex h-28 flex-col items-center justify-center gap-2 rounded-2xl bg-[var(--color-navy-2)] px-1.5 py-3 text-center"
            >
              <Icon className="h-10 w-10 text-[var(--color-gold)]" />
              <span className="text-[13px] font-medium leading-tight text-white">
                {entry.label}
              </span>
              <span className="h-px w-3 bg-[var(--color-gold)]" />
            </motion.div>
          );
          return renderAction(entry.action, card, entry.id);
        })}
      </div>

      {/* Accesos anchos: chatear y calificar, mismo tratamiento oscuro con
          ícono en círculo de borde dorado (sin relleno). */}
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
          className="flex items-center gap-3 rounded-2xl bg-[var(--color-navy-2)] px-4 py-3.5"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--color-gold)] text-[var(--color-gold)]">
            <ChatBubbleIcon className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-base font-semibold text-white">Chatear con recepción</span>
            <span className="block text-sm text-white/60">Estamos para ayudarte</span>
          </span>
          <ChevronRight size={18} className="shrink-0 text-white/50" />
        </motion.a>

        <motion.a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.06 * gridEntries.length + 0.06 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 rounded-2xl bg-[var(--color-navy-2)] px-4 py-3.5"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--color-gold)] text-[var(--color-gold)]">
            <StarOutlineIcon className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-base font-semibold text-white">
              Calificar experiencia
            </span>
            <span className="block text-sm text-white/60">
              Tu opinión nos ayuda a mejorar
            </span>
          </span>
          <ChevronRight size={18} className="shrink-0 text-white/50" />
        </motion.a>
      </div>
    </div>
  );
}
