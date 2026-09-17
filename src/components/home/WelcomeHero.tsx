"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function WelcomeHero() {
  return (
    <div
      className="relative w-full overflow-hidden shrink-0"
      style={{ height: "calc(clamp(260px, 33svh, 340px) + env(safe-area-inset-top))" }}
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
        className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 px-8 pb-4 text-center"
      >
        <Image
          src="/brand/logo-dorado.png"
          alt="AMBAR Hotel Boutique"
          width={640}
          height={486}
          className="h-auto"
          style={{ width: "clamp(135px, 22svw, 175px)" }}
        />

        <p style={{ fontSize: "clamp(16px, 2.3svh, 19px)" }} className="font-semibold tracking-[0.10em] text-[#F5EFE6]">
          BIENVENIDO
        </p>
        <p style={{ fontSize: "clamp(12px, 1.75svh, 14px)", maxWidth: "310px" }} className="leading-snug text-[#D4CCBF]">
          Disfruta de una experiencia única y memorable
        </p>
      </motion.div>
    </div>
  );
}
