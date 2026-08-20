"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Hero superior: la fotografía se recorta con una curva simétrica en forma
// de arco/pétalo (más foto en los bordes, el beige sube en punta hacia el
// centro) — el mismo motivo de intersección del boceto de referencia.
export default function WelcomeHero() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "calc(420px + env(safe-area-inset-top))" }}
    >
      <div
        className="absolute inset-0"
        style={{ clipPath: "url(#ambarArchClip)" }}
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
              "linear-gradient(to bottom, transparent 0%, transparent 20%, rgba(5,36,79,0.22) 32%, rgba(5,36,79,0.44) 48%, rgba(5,36,79,0.66) 64%, rgba(5,36,79,0.85) 80%, rgba(5,36,79,0.95) 100%)",
          }}
        />
      </div>

      {/* Definición de la curva — objectBoundingBox para que sea responsive
          en cualquier tamaño de pantalla. */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="ambarArchClip" clipPathUnits="objectBoundingBox">
            <path d="M0,0 L1,0 L1,0.88 C0.8,0.88 0.66,0.60 0.5,0.60 C0.34,0.60 0.2,0.88 0,0.88 Z" />
          </clipPath>
        </defs>
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 px-8 pb-10 text-center"
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
        <p className="mt-1 max-w-[260px] text-sm leading-snug text-white/85">
          Todo lo que necesitas durante tu estadía, a un toque de distancia.
        </p>
      </motion.div>
    </div>
  );
}
