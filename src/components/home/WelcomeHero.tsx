"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function WelcomeHero() {
  return (
    <div
      className="relative w-full overflow-hidden shrink-0"
      style={{ height: "clamp(210px, 30svh, 300px)" }}
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
        className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-[clamp(2px,0.6svh,10px)] px-8 pb-[clamp(4px,1svh,18px)] text-center pt-[max(env(safe-area-inset-top),4px)]"
      >
        <Image
          src="/brand/logo-dorado.png"
          alt="AMBAR Hotel Boutique"
          width={640}
          height={486}
          className="h-auto w-[clamp(110px,18svw,155px)]"
        />

        <p className="text-[clamp(14px,2.3svh,18px)] font-semibold tracking-[0.10em] text-[#F5EFE6]">
          BIENVENIDO
        </p>
        <p className="max-w-[clamp(240px,70svw,300px)] text-[clamp(11px,1.7svh,14px)] leading-snug text-[#D4CCBF]">
          Disfruta de una experiencia única y memorable
        </p>
      </motion.div>
    </div>
  );
}
