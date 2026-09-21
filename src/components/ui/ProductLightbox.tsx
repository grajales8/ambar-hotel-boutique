"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export type LightboxAction = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
} | null;

export default function ProductLightbox({
  open,
  onClose,
  images,
  name,
  description,
  priceText,
  action,
}: {
  open: boolean;
  onClose: () => void;
  images: string[];
  name: string;
  description: string;
  priceText?: string;
  action?: LightboxAction;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full sm:max-w-[460px] sm:rounded-3xl rounded-t-3xl bg-[#1E1C1A] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
            style={{ border: "1px solid rgba(184,147,92,0.28)" }}
          >
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-[#1E1C1A]/80 text-[#F5EFE6] backdrop-blur border border-white/10"
            >
              <X size={18} strokeWidth={2.3} />
            </button>

            <div className="relative w-full aspect-[4/3] bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[0]}
                alt={name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-5">
              <h3 className="font-display text-xl text-[#F5EFE6] leading-tight">
                {name}
              </h3>
              {priceText !== undefined && priceText !== null && (
                <p className="mt-2 text-[#B8935C] font-semibold text-base">
                  {priceText}
                </p>
              )}
              {description && (
                <p className="mt-3 text-sm leading-relaxed text-[#D4CCBF] whitespace-pre-line">
                  {description}
                </p>
              )}

              {action ? (
                <button
                  onClick={action.onClick}
                  className={`mt-5 w-full rounded-full py-3 text-sm font-semibold active:scale-[0.98] transition-transform ${
                    action.variant === "secondary"
                      ? "bg-[#0B0B0C] text-[#F5EFE6]"
                      : "bg-[#B8935C] text-[#0B0B0C]"
                  }`}
                  style={
                    action.variant === "secondary"
                      ? { border: "1px solid rgba(184,147,92,0.35)" }
                      : undefined
                  }
                >
                  {action.label}
                </button>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
