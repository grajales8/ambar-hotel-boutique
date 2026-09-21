"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { MenuItem } from "@/lib/types";
import { formatCOP } from "@/lib/cart-context";
import ProductLightbox from "./ProductLightbox";

export default function ProductCardReadOnly({
  item,
  isOpen,
  onToggle,
}: {
  item: MenuItem;
  isOpen: boolean;
  onToggle: () => void;
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
        className="cursor-pointer overflow-hidden rounded-2xl bg-[#1E1C1A] shadow-[var(--shadow-card)]"
        style={{ border: "1px solid rgba(184,147,92,0.22)" }}
      >
        <div
          className="relative h-36 w-full cursor-zoom-in"
          onClick={(e) => {
            e.stopPropagation();
            if (item.available) setLight(true);
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.stopPropagation();
              if (item.available) setLight(true);
            }
          }}
          aria-label={`Ver ${item.name} en grande`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
          {!item.available && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="rounded-full bg-[#1E1C1A]/90 px-3 py-1 text-xs font-semibold text-[#B8935C]">
                No disponible
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-base text-[#F5EFE6]">{item.name}</h3>
            <motion.span
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="mt-1 shrink-0 text-[#B8935C]"
              aria-hidden="true"
            >
              <ChevronDown size={16} />
            </motion.span>
          </div>

          {item.description && (
            <p
              className={`mt-1.5 text-sm leading-snug text-[#D4CCBF]/85 ${
                isOpen ? "" : "line-clamp-2"
              }`}
            >
              {item.description}
            </p>
          )}

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
                className="overflow-hidden"
              />
            )}
          </AnimatePresence>

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
