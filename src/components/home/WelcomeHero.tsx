"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Hero superior en tema oscuro: la fotografía se ve completa (sin curva
// gruesa que la tape), con un degradado hacia abajo y un arco dorado fino
// y decorativo como único elemento de intersección.
export default function WelcomeHero() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "calc(460px + env(safe-area-inset-top))" }}
    >
      <Image
        src="/rooms/habitacion-bienvenida.jpg"
        alt="Habitación de AMBAR Hotel Boutique"
        fill
        priority
        className="object-cover object-[center_60%]"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, transparent 15%, rgba(5,36,79,0.30) 30%, rgba(5,36,79,0.55) 48%, rgba(5,36,79,0.78) 66%, rgba(5,36,79,0.92) 84%, rgba(5,36,79,0.97) 100%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 px-8 pb-9 text-center"
      >
        <p className="font-display italic text-sm text-[var(--color-gold-soft)]">
          Bienvenido a
        </p>
        <Image
          src="/brand/logo-dorado.png"
          alt="AMBAR Hotel Boutique"
          width={640}
          height={486}
          className="h-auto w-[170px]"
        />

        {/* Arco dorado fino y decorativo — el único elemento de
            intersección, en vez de una forma gruesa que tape la foto. */}
        <svg className="h-4 w-24" viewBox="0 0 96 16" aria-hidden="true">
          <path
            d="M0,2 Q48,16 96,2"
            fill="none"
            stroke="var(--color-gold)"
            strokeWidth="1.2"
            opacity="0.8"
          />
        </svg>

        <p className="max-w-[260px] text-sm leading-snug text-white/85">
          Todo lo que necesitas durante tu estadía, a un toque de distancia.
        </p>
      </motion.div>
    </div>
  );
}
