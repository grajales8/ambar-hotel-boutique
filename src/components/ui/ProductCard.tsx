"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { MenuItem } from "@/lib/types";
import { formatCOP } from "@/lib/cart-context";
import ProductLightbox, { LightboxAction } from "./ProductLightbox";

export default function ProductCard({
  item,
  quantity,
  onAdd,
  onRemove,
  actionLabel = "Agregar",
}: {
  item: MenuItem;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  actionLabel?: string;
}) {
  const [light, setLight] = useState(false);
  const addAction: LightboxAction = {
    kind: "stepper",
    quantity,
    onAdd,
    onRemove,
    addLabel: actionLabel,
    disabled: !item.available,
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="overflow-hidden rounded-2xl bg-[#1E1C1A] shadow-[var(--shadow-card)]"
        style={{ border: "1px solid rgba(184,147,92,0.22)" }}
      >
        <div
          className="relative aspect-[4/3] w-full cursor-zoom-in bg-[#12100E] p-3 md:p-4"
          onClick={() => {
            if (item.available) setLight(true);
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              if (item.available) setLight(true);
            }
          }}
          aria-label={`Ver ${item.name} en grande`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image}
            alt={item.name}
            className={`h-full w-full object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] ${item.available ? "" : "cursor-not-allowed"}`}
          />
          {!item.available && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="rounded-full bg-[#1E1C1A]/90 px-3 py-1 text-xs font-semibold text-[#B8935C]">
                No disponible
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-display text-base text-[#F5EFE6]">{item.name}</h3>

          {item.description && (
            <p className="mt-1.5 text-sm leading-snug text-[#D4CCBF]/85 line-clamp-2">
              {item.description}
            </p>
          )}

          <div className="mt-2">
            <span className="font-semibold text-[#F5EFE6]">{formatCOP(item.price)}</span>
          </div>

          <div className="pt-3">
            {quantity === 0 ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAdd();
                }}
                disabled={!item.available}
                className="flex w-full items-center justify-center gap-1.5 rounded-full bg-[#B8935C] py-2.5 text-sm font-medium text-[#0B0B0C] active:scale-95 transition-transform disabled:opacity-40"
              >
                <Plus size={14} strokeWidth={2.5} />
                Agregar
              </button>
            ) : (
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex w-full items-center justify-center gap-5 rounded-full bg-[#0B0B0C] px-2 py-2"
              >
                <button
                  onClick={onRemove}
                  aria-label="Quitar uno"
                  className="flex h-7 w-7 items-center justify-center text-[#B8935C] active:scale-90 transition-transform"
                >
                  <Minus size={18} strokeWidth={2.5} />
                </button>
                <span className="text-sm font-semibold text-[#F5EFE6]">{quantity}</span>
                <button
                  onClick={onAdd}
                  aria-label="Agregar uno más"
                  className="flex h-7 w-7 items-center justify-center text-[#B8935C] active:scale-90 transition-transform"
                >
                  <Plus size={18} strokeWidth={2.5} />
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <ProductLightbox
        open={light}
        onClose={() => setLight(false)}
        images={[item.image]}
        name={item.name}
        description={item.description || ""}
        priceText={formatCOP(item.price)}
        action={addAction}
      />
    </>
  );
}
