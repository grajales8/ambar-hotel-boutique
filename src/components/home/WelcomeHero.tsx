"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function WelcomeHero() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "calc(440px + env(safe-area-inset-top))" }}
    >
      <Image
        src="/rooms/habitacion-bienvenida.jpg"
        alt="Habitación de AMBAR Hotel Boutique"
        fill
        priority
        className="object-cover"
      />

      {/* Forma orgánica que "revela" el beige de la app sobre la foto,
          integrando el logo directamente en la transición. */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 375 500"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,235 C40,215 90,225 120,255 C155,290 130,330 175,355 C220,380 245,350 285,380 C320,405 310,440 345,455 C360,462 368,470 375,478 L375,500 L0,500 Z"
          fill="var(--color-sand)"
        />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-1 px-7 pb-8"
        style={{ paddingTop: "58%" }}
      >
        <p className="font-display italic text-sm text-[var(--color-navy)]/70">
          Bienvenido a
        </p>
        <Image
          src="/brand/logo-terracota.png"
          alt="AMBAR Hotel Boutique"
          width={640}
          height={486}
          className="h-auto w-[168px]"
        />
      </motion.div>
    </div>
  );
}
