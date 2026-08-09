"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function WelcomeHero() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "calc(300px + env(safe-area-inset-top))" }}
    >
      <Image
        src="/rooms/habitacion-bienvenida.jpg"
        alt="Habitación de AMBAR Hotel Boutique"
        fill
        priority
        className="object-cover object-[center_78%]"
      />

      {/* Forma orgánica en la base (misma curva en "S") y un eco más sutil
          en la parte superior, para que ambos bordes de la foto compartan
          el mismo lenguaje visual. */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 375 500"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,0 C70,35 95,5 160,22 C230,40 265,8 375,30 L375,0 Z"
          fill="var(--color-sand)"
        />
        <path
          d="M0,240 C90,210 110,320 195,350 C280,380 300,455 375,478 L375,500 L0,500 Z"
          fill="var(--color-sand)"
        />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-0.5 px-6 pb-4"
        style={{ paddingTop: "60%" }}
      >
        <p className="font-display italic text-sm text-[var(--color-navy)]/70">
          Bienvenido a
        </p>
        <Image
          src="/brand/logo-terracota.png"
          alt="AMBAR Hotel Boutique"
          width={640}
          height={486}
          className="h-auto w-[150px]"
        />
      </motion.div>
    </div>
  );
}
