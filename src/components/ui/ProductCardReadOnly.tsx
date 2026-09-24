"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MenuItem } from "@/lib/types";
import { formatCOP } from "@/lib/cart-context";
import ProductLightbox from "./ProductLightbox";

export default function ProductCardReadOnly({
  item,
}: {
  item: MenuItem;
}) {
  const [light, setLight] = useState(false);

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
            className="h-full w-full object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
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
        </div>
      </motion.div>

      <ProductLightbox
        open={light}
        onClose={() => setLight(false)}
        images={[item.image]}
        name={item.name}
        description={item.description || ""}
        priceText={formatCOP(item.price)}
        action={null}
      />
    </>
  );
}
