"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Hero superior en tema oscuro (negro mate + bronce): la fotografía se ve
// completa, con un degradado hacia negro y un arco fino y decorativo como
// intersección con la rejilla de abajo.
export default function WelcomeHero() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "calc(480px + env(safe-area-inset-top))" }}
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
            "linear-gradient(to bottom, transparent 0%, transparent 14%, rgba(11,11,12,0.32) 28%, rgba(11,11,12,0.58) 46%, rgba(11,11,12,0.80) 64%, rgba(11,11,12,0.94) 82%, #0B0B0C 100%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 px-8 pb-9 text-center"
      >
        <Image
          src="/brand/logo-dorado.png"
          alt="AMBAR Hotel Boutique"
          width={640}
          height={486}
          className="h-auto w-[170px]"
        />

        {/* Arco fino y decorativo — el único elemento de intersección. */}
        <svg className="h-4 w-24" viewBox="0 0 96 16" aria-hidden="true">
          <path
            d="M0,2 Q48,16 96,2"
            fill="none"
            stroke="#B8935C"
            strokeWidth="1.2"
            opacity="0.85"
          />
        </svg>

        <p className="mt-1 text-2xl font-semibold tracking-[0.08em] text-[#B8935C]">
          BIENVENIDO
        </p>
        <p className="max-w-[260px] text-sm leading-snug text-[#B8935C]/80">
          Disfruta de una experiencia
          <br />
          única y memorable
        </p>
      </motion.div>
    </div>
  );
}
