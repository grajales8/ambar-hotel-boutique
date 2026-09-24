"use client";

import { useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus } from "lucide-react";

export type LightboxAction =
  | {
      kind: "button";
      label: string;
      onClick: () => void;
      variant?: "primary" | "secondary";
    }
  | {
      kind: "stepper";
      quantity: number;
      onAdd: () => void;
      onRemove: () => void;
      addLabel?: string;
      disabled?: boolean;
    }
  | null;

export default function ProductLightbox({
  open,
  onClose,
  images,
  name,
  description,
  priceText,
  action,
  extraFooter,
}: {
  open: boolean;
  onClose: () => void;
  images: string[];
  name: string;
  description: string;
  priceText?: string;
  action?: LightboxAction;
  extraFooter?: ReactNode;
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
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 0 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-[min(92vw,460px)] rounded-3xl bg-[#1E1C1A] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.55)] max-h-[86vh] flex flex-col"
            style={{ border: "1px solid rgba(184,147,92,0.32)" }}
          >
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-[#1E1C1A]/80 text-[#F5EFE6] backdrop-blur border border-white/10"
            >
              <X size={18} strokeWidth={2.3} />
            </button>

            <div className="relative w-full flex-none">
              <div className="aspect-[4/3] bg-[#12100E] w-full p-4 md:p-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={images[0]}
                  alt={name}
                  className="h-full w-full object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.55)]"
                />
              </div>
            </div>

            <div className="p-5 overflow-y-auto flex-1 flex flex-col gap-1">
              <h3 className="font-display text-xl text-[#F5EFE6] leading-tight text-center">
                {name}
              </h3>
              {description && (
                <p className="mt-3 text-sm leading-relaxed text-[#D4CCBF] whitespace-pre-line text-center">
                  {description}
                </p>
              )}
              {priceText !== undefined && priceText !== null && (
                <p className="mt-4 text-[#B8935C] font-semibold text-base text-center">
                  {priceText}
                </p>
              )}

              {action && action.kind === "button" ? (
                <button
                  onClick={action.onClick}
                  className={`mt-6 w-full rounded-full py-3 text-sm font-semibold active:scale-[0.98] transition-transform ${
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

              {action && action.kind === "stepper" ? (
                <div className="mt-6">
                  {action.quantity === 0 ? (
                    <button
                      onClick={action.onAdd}
                      disabled={action.disabled}
                      className="flex w-full items-center justify-center gap-1.5 rounded-full bg-[#B8935C] py-3 text-sm font-semibold text-[#0B0B0C] active:scale-[0.98] transition-transform disabled:opacity-40"
                    >
                      <Plus size={15} strokeWidth={2.5} />
                      {action.addLabel ?? "Agregar"}
                    </button>
                  ) : (
                    <div className="flex w-full items-center justify-center gap-6 rounded-full bg-[#0B0B0C] px-3 py-2.5">
                      <button
                        onClick={action.onRemove}
                        aria-label="Quitar uno"
                        className="flex h-8 w-8 items-center justify-center text-[#B8935C] active:scale-90 transition-transform"
                      >
                        <Minus size={19} strokeWidth={2.5} />
                      </button>
                      <span className="text-base font-semibold text-[#F5EFE6]">
                        {action.quantity}
                      </span>
                      <button
                        onClick={action.onAdd}
                        aria-label="Agregar uno más"
                        disabled={action.disabled}
                        className="flex h-8 w-8 items-center justify-center text-[#B8935C] active:scale-90 transition-transform disabled:opacity-40"
                      >
                        <Plus size={19} strokeWidth={2.5} />
                      </button>
                    </div>
                  )}
                </div>
              ) : null}

              {extraFooter}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
