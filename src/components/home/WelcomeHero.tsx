"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function WelcomeHero() {
  return (
    <div>
      {/* Foto real del hotel, a todo lo ancho, con el logo integrado sobre
          un degradado — la primera impresión al abrir la app. */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "calc(300px + env(safe-area-inset-top))" }}
      >
        <Image
          src="/rooms/habitacion-bienvenida.jpg"
          alt="Habitación de AMBAR Hotel Boutique"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)] via-[var(--color-navy)]/55 to-[var(--color-navy)]/10" />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 px-6 pb-7 text-center"
        >
          <p className="font-display italic text-sm text-[var(--color-gold-soft)]">
            Bienvenido a
          </p>
          <Image
            src="/brand/logo-dorado.png"
            alt="AMBAR Hotel Boutique"
            width={640}
            height={486}
            className="h-auto w-[180px]"
          />
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="px-6 pt-5 text-center text-sm text-[var(--color-ink-soft)]"
      >
        Todo lo que necesitas durante tu estadía, a un toque de distancia.
      </motion.p>
    </div>
  );
}
