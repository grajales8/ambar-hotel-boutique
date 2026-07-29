"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MenuItem } from "@/lib/types";
import { formatCOP } from "@/lib/cart-context";

export default function ProductCardReadOnly({ item }: { item: MenuItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)]"
    >
      <div className="relative h-36 w-full">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 480px) 100vw, 400px"
          className="object-cover"
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
        <div className="mt-3">
          <span className="font-semibold text-[var(--color-navy)]">
            {formatCOP(item.price)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
