"use client";

import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { MenuItem } from "@/lib/types";
import { formatCOP } from "@/lib/cart-context";

export default function ProductCard({
  item,
  quantity,
  onAdd,
  onRemove,
}: {
  item: MenuItem;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)]"
    >
      <div className="relative h-36 w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
        {!item.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[var(--color-navy)]">
              No disponible
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display text-base text-[var(--color-navy)]">{item.name}</h3>
        <p className="mt-1 text-sm text-[var(--color-ink-soft)] leading-snug line-clamp-2">
          {item.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-semibold text-[var(--color-navy)]">
            {formatCOP(item.price)}
          </span>

          {quantity === 0 ? (
            <button
              onClick={onAdd}
              disabled={!item.available}
              className="flex items-center gap-1 rounded-full bg-[var(--color-navy)] px-4 py-2 text-sm font-medium text-white active:scale-95 transition-transform disabled:opacity-40"
            >
              <Plus size={14} />
              Agregar
            </button>
          ) : (
            <div className="flex items-center gap-3 rounded-full bg-[var(--color-sand-2)] px-2 py-1">
              <button
                onClick={onRemove}
                aria-label="Quitar uno"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[var(--color-navy)] active:scale-90 transition-transform"
              >
                <Minus size={14} />
              </button>
              <span className="w-4 text-center text-sm font-semibold text-[var(--color-navy)]">
                {quantity}
              </span>
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
      </div>
    </motion.div>
  );
}
