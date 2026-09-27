"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, MessageCircle, Check } from "lucide-react";
import { ExperienceService } from "@/lib/types";
import { formatCOP } from "@/lib/cart-context";
import { openWhatsapp } from "@/lib/whatsapp";

function buildServiceMsg(service: ExperienceService) {
  return `Hola, soy huésped de AMBAR Hotel Boutique y quisiera más información sobre: ${service.name}.`;
}

export default function ExperienceDetailModal({
  service,
  onClose,
}: {
  service: ExperienceService | null;
  onClose: () => void;
}) {
  const open = !!service;
  const images = service?.images ?? [];
  const hasGallery = images.length > 1;
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const thumbScrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    setActiveIdx(0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (!hasGallery) return;
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", onKey);
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousBodyOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, onClose, hasGallery]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || !hasGallery) return;
    const target = el.children[activeIdx] as HTMLElement | undefined;
    if (!target) return;
    el.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
  }, [activeIdx, hasGallery]);

  useEffect(() => {
    const el = thumbScrollerRef.current;
    if (!el || !hasGallery) return;
    const target = el.children[activeIdx] as HTMLElement | undefined;
    if (!target) return;
    target.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [activeIdx, hasGallery]);

  function goNext() {
    if (!images.length) return;
    setActiveIdx((i) => (i + 1) % images.length);
  }
  function goPrev() {
    if (!images.length) return;
    setActiveIdx((i) => (i - 1 + images.length) % images.length);
  }
  function onScrollerScroll() {
    const el = scrollerRef.current;
    if (!el || !hasGallery) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    if (idx !== activeIdx) setActiveIdx(idx);
  }

  return (
    <AnimatePresence>
      {open && service && (
        <motion.div
          key="exp-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/78 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 0 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-[min(92vw,460px)] rounded-3xl bg-[#1E1C1A] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.6)] max-h-[86vh] flex flex-col"
            style={{ border: "1px solid rgba(184,147,92,0.32)" }}
          >
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute right-3.5 top-3.5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-[#F5EFE6]"
              style={{ border: "1px solid rgba(245,239,230,0.12)" }}
            >
              <X size={18} strokeWidth={2.4} />
            </button>

            <div className="relative">
              <div
                ref={scrollerRef}
                onScroll={onScrollerScroll}
                className="flex overflow-x-scroll snap-x snap-mandatory scroll-smooth w-full"
                style={{ scrollbarWidth: "none" }}
              >
                {images.map((src, i) => (
                  <div
                    key={i}
                    className="snap-center shrink-0 w-full relative"
                  >
                    <div className="relative w-full aspect-[4/3] bg-black">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={`${service.name} ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {hasGallery && (
                <>
                  <button
                    onClick={goPrev}
                    aria-label="Anterior"
                    className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-[#F5EFE6]"
                    style={{ border: "1px solid rgba(245,239,230,0.12)" }}
                  >
                    <ChevronLeft size={22} strokeWidth={2.5} />
                  </button>
                  <button
                    onClick={goNext}
                    aria-label="Siguiente"
                    className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-[#F5EFE6]"
                    style={{ border: "1px solid rgba(245,239,230,0.12)" }}
                  >
                    <ChevronRight size={22} strokeWidth={2.5} />
                  </button>
                  <span className="absolute bottom-3 right-3 z-20 rounded-full bg-black/65 px-3 py-1 text-[11px] font-medium text-[#F5EFE6]">
                    {activeIdx + 1} / {images.length}
                  </span>
                </>
              )}
            </div>

            {hasGallery && (
              <div
                ref={thumbScrollerRef}
                className="flex items-center gap-2 overflow-x-auto px-5 pt-4 pb-2"
                style={{ scrollbarWidth: "none" }}
              >
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className={`shrink-0 aspect-[4/3] w-20 overflow-hidden rounded-xl ${
                      activeIdx === i
                        ? "ring-2 ring-[#B8935C] ring-offset-2 ring-offset-[#1E1C1A]"
                        : "ring-1 ring-white/10 opacity-80"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="overflow-y-auto px-5 pt-3 pb-5 flex-1">
              <h2 className="text-center font-display text-[26px] leading-tight text-[#F5EFE6]">
                {service.name}
              </h2>

              <p className="mt-4 text-center text-[15px] leading-relaxed text-[#D4CCBF]">
                {service.fullDescription || service.shortDescription}
              </p>

              {service.price ? (
                <p className="mt-5 text-center font-display text-xl text-[#B8935C]">
                  {formatCOP(service.price)}
                </p>
              ) : (
                <p className="mt-5 text-center text-base font-medium text-[#B8935C]">
                  Consultar precio
                </p>
              )}

              <button
                onClick={() => openWhatsapp(buildServiceMsg(service))}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#B8935C] py-3.5 text-base font-semibold text-[#0B0B0C] active:scale-[0.98] transition-transform"
              >
                <MessageCircle size={17} strokeWidth={2.4} />
                Más información
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
