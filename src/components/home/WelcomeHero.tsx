"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Hero superior: dos capas independientes, cada una con su propia curva
// orgánica (fotografía y fondo beige), que se superponen sin coincidir.
// Se usa SVG clipPath con objectBoundingBox para que ambas curvas escalen
// de forma responsive sin depender del tamaño real en píxeles.
export default function WelcomeHero() {
  return (
    <div
      className="relative w-full overflow-hidden bg-[var(--color-sand)]"
      style={{ height: "calc(300px + env(safe-area-inset-top))" }}
    >
      {/* Capa 1: fotografía — esquinas superiores redondeadas, curva
          orgánica e independiente en el borde inferior. */}
      <div className="absolute inset-0" style={{ clipPath: "url(#ambarPhotoClip)" }}>
        <Image
          src="/rooms/habitacion-bienvenida.jpg"
          alt="Habitación de AMBAR Hotel Boutique"
          fill
          priority
          className="object-cover object-[center_78%]"
        />
      </div>

      {/* Capa 2: fondo beige — curva superior distinta a la de la foto,
          se superpone sobre ella en algunas zonas (más a la izquierda). */}
      <div
        className="absolute inset-0 bg-[var(--color-sand)]"
        style={{ clipPath: "url(#ambarBeigeClip)" }}
      />

      {/* Definiciones de ambos recortes, completamente independientes. */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="ambarPhotoClip" clipPathUnits="objectBoundingBox">
            <path d="M0,0.03 Q0,0 0.03,0 L0.97,0 Q1,0 1,0.03 L1,0.48 C0.78,0.62 0.42,0.28 0,0.56 Z" />
          </clipPath>
          <clipPath id="ambarBeigeClip" clipPathUnits="objectBoundingBox">
            <path d="M0,0.32 C0.38,0.14 0.6,0.72 1,0.40 L1,1 L0,1 Z" />
          </clipPath>
        </defs>
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-0.5 px-6 pb-4"
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
          className="h-auto w-[150px]"
        />
      </motion.div>
    </div>
  );
}
