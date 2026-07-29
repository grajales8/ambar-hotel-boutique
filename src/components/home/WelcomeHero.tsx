"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function WelcomeHero() {
  return (
    <div className="px-6 pt-[calc(env(safe-area-inset-top)+3rem)] pb-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="font-display italic text-[var(--color-navy)] text-base">
          Bienvenido a
        </p>
        <Image
          src="/brand/logo-terracota.png"
          alt="AMBAR Hotel Boutique"
          width={640}
          height={486}
          className="mx-auto mt-2 h-auto w-[240px]"
          priority
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-4 text-sm text-[var(--color-ink-soft)]"
      >
        Todo lo que necesitas durante tu estadía, a un toque de distancia.
      </motion.p>
    </div>
  );
}
