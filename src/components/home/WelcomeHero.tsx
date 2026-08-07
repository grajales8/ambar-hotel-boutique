"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function WelcomeHero() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "calc(230px + env(safe-area-inset-top))" }}
    >
      <Image
        src="/rooms/habitacion-bienvenida.jpg"
        alt="Habitación de AMBAR Hotel Boutique"
        fill
        priority
        className="object-cover"
      />

      {/* Forma orgánica (una sola curva en "S") que revela el beige de la
          app sobre la foto, integrando el logo en la transición. */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 375 500"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
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
        style={{ paddingTop: "62%" }}
      >
        <p className="font-display italic text-xs text-[var(--color-navy)]/70">
          Bienvenido a
        </p>
        <Image
          src="/brand/logo-terracota.png"
          alt="AMBAR Hotel Boutique"
          width={640}
          height={486}
          className="h-auto w-[128px]"
        />
      </motion.div>
    </div>
  );
}
