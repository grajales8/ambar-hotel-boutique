"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { MenuItem } from "@/lib/types";
import { formatCOP } from "@/lib/cart-context";

// Tarjeta-acordeón: toda la tarjeta es el botón. Colapsada muestra solo
// imagen + nombre + precio; al tocarla se expande revelando la descripción
// (entre el nombre y el precio) y, debajo del precio, el control de
// cantidad/"Agregar". Un único producto permanece abierto a la vez —el
// estado `isOpen`/`onToggle` lo controla la página que lista los productos.
export default function ProductCard({
  item,
  quantity,
  onAdd,
  onRemove,
  isOpen,
  onToggle,
}: {
  item: MenuItem;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
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

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-3">
                {quantity === 0 ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAdd();
                    }}
                    disabled={!item.available}
                    className="flex w-full items-center justify-center gap-1.5 rounded-full bg-[var(--color-navy)] py-2.5 text-sm font-medium text-white active:scale-95 transition-transform disabled:opacity-40"
                  >
                    <Plus size={14} />
                    Agregar
                  </button>
                ) : (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex w-full items-center justify-center gap-5 rounded-full bg-[var(--color-sand-2)] px-2 py-2"
                  >
                    <button
                      onClick={onRemove}
                      aria-label="Quitar uno"
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[var(--color-navy)] active:scale-90 transition-transform"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-semibold text-[var(--color-navy)]">{quantity}</span>
                    <button
                      onClick={onAdd}
                      aria-label="Agregar uno más"
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[var(--color-navy)] active:scale-90 transition-transform"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
