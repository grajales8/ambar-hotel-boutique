"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { MenuItem } from "@/lib/types";
import { formatCOP } from "@/lib/cart-context";

// Misma tarjeta-acordeón que Minibar/Boutique, sin el bloque de "Agregar":
// el Restaurante es únicamente un menú informativo.
export default function ProductCardReadOnly({
  item,
  isOpen,
  onToggle,
}: {
  item: MenuItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      aria-expanded={isOpen}
      className="cursor-pointer overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)]"
    >
      <div className="relative h-36 w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
        {!item.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[var(--color-navy)]">
              No disponible
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base text-[var(--color-navy)]">{item.name}</h3>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="mt-1 shrink-0 text-[var(--color-ink-soft)]"
            aria-hidden="true"
          >
            <ChevronDown size={16} />
          </motion.span>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="pt-2 text-sm leading-snug text-[var(--color-ink-soft)]">
                {item.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-2">
          <span className="font-semibold text-[var(--color-navy)]">{formatCOP(item.price)}</span>
        </div>
      </div>
    </motion.div>
  );
}
