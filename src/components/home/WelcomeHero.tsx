"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Hero superior: la fotografía se muestra completa, sin ningún recorte ni
// forma que la tape. Todo el contenido de bienvenida vive superpuesto
// directamente sobre ella, con un degradado para que se lea bien.
export default function WelcomeHero() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "calc(400px + env(safe-area-inset-top))" }}
    >
      <Image
        src="/rooms/habitacion-bienvenida.jpg"
        alt="Habitación de AMBAR Hotel Boutique"
        fill
        priority
        className="object-cover object-[center_68%]"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, transparent 22%, rgba(5,36,79,0.24) 35%, rgba(5,36,79,0.46) 50%, rgba(5,36,79,0.67) 65%, rgba(5,36,79,0.86) 80%, rgba(5,36,79,0.97) 100%)",
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
        <p className="mt-1 max-w-[260px] text-sm leading-snug text-white/85">
          Todo lo que necesitas durante tu estadía, a un toque de distancia.
        </p>
      </motion.div>
    </div>
  );
}
