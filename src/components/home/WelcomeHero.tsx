"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function WelcomeHero() {
  return (
    <div
      className="relative w-full overflow-hidden shrink-0 h-[calc(260px+env(safe-area-inset-top))] md:h-[340px]"
      style={{ backgroundColor: "#0B0B0C" }}
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
        className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1.5 px-8 pb-2.5 md:pb-4 text-center"
      >
        <Image
          src="/brand/logo-dorado.png"
          alt="AMBAR Hotel Boutique"
          width={640}
          height={486}
          className="h-auto w-[145px] md:w-[175px]"
        />

        <p className="text-[19px] md:text-[22px] font-semibold tracking-[0.12em] text-[#F5EFE6]">
          BIENVENIDO
        </p>
        <p className="max-w-[300px] md:max-w-[350px] text-[15px] md:text-[17px] leading-snug text-[#D4CCBF]">
          Disfruta de una experiencia única y memorable
        </p>
      </motion.div>
    </div>
  );
}
