"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MenuItem } from "@/lib/types";
import { formatCOP } from "@/lib/cart-context";
import ProductLightbox from "./ProductLightbox";

export default function ProductCardReadOnly({
  item,
  allowGallery = true,
}: {
  item: MenuItem;
  allowGallery?: boolean;
}) {
  const [light, setLight] = useState(false);
  const allImages = item.images && item.images.length > 0 ? item.images : [item.image];
  const images = allowGallery ? allImages : [item.image];
  const hasGallery = allowGallery && allImages.length > 1;

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
          className="relative cursor-zoom-in overflow-hidden"
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
          <div className="relative h-36 w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images[0]} alt={item.name} className="h-full w-full object-cover" />
            {!item.available && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <span className="rounded-full bg-[#1E1C1A]/90 px-3 py-1 text-xs font-semibold text-[#B8935C]">
                  No disponible
                </span>
              </div>
            )}
          </div>
          {hasGallery && (
            <div className="px-2 pt-2 pb-2 bg-[#12100E] border-t border-white/5">
              <div className="flex items-center gap-1.5">
                {images.slice(1, 4).map((src, i) => (
                  <div
                    key={i}
                    className="flex-1 aspect-[4/3] rounded-lg overflow-hidden ring-1 ring-white/10"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </div>
                ))}
                {images.length > 4 && (
                  <div className="flex-1 aspect-[4/3] rounded-lg bg-black/60 flex items-center justify-center ring-1 ring-white/10">
                    <span className="text-[11px] font-semibold text-[#F5EFE6]">
                      +{images.length - 4}
                    </span>
                  </div>
                )}
              </div>
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
        images={images}
        name={item.name}
        description={item.description || ""}
        priceText={formatCOP(item.price)}
        action={null}
      />
    </>
  );
}
