"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function WelcomeHero() {
  return (
    <div
      className="relative w-full overflow-hidden shrink-0"
      style={{ height: "calc(230px + env(safe-area-inset-top))" }}
    >
      <Image
        src="/rooms/habitacion-bienvenida.jpg"
        alt="Habitación de AMBAR Hotel Boutique"
        fill
        priority
        className="object-cover object-[center_55%]"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(11,11,12,0.20) 30%, rgba(11,11,12,0.55) 58%, rgba(11,11,12,0.85) 80%, #0B0B0C 100%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1.5 px-8 pb-3 text-center"
      >
        <Image
          src="/brand/logo-dorado.png"
          alt="AMBAR Hotel Boutique"
          width={640}
          height={486}
          className="h-auto w-[115px]"
        />

        <svg className="h-3 w-16" viewBox="0 0 96 16" aria-hidden="true">
          <path
            d="M0,2 Q48,16 96,2"
            fill="none"
            stroke="#B8935C"
            strokeWidth="1.2"
            opacity="0.85"
          />
        </svg>

        <p className="text-[15px] font-semibold tracking-[0.08em] text-[#B8935C]">
          BIENVENIDO
        </p>
        <p className="max-w-[240px] text-[11px] leading-snug text-[#B8935C]/80">
          Disfruta de una experiencia única y memorable
        </p>
      </motion.div>
    </div>
  );
}
