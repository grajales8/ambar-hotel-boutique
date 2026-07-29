"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { hotelInfo } from "@/data/hotelInfo";
import PageHeader from "@/components/ui/PageHeader";

export default function WifiPage() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(hotelInfo.wifiPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Navegadores sin soporte de clipboard: no bloquea el flujo.
    }
  }

  return (
    <main className="min-h-screen bg-[var(--color-sand)] pb-10">
      <PageHeader title="WiFi" subtitle="Conéctate en segundos" />

      <div className="flex flex-col items-center px-6 pt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          className="seal-ring flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-navy)] p-4"
        >
          <Image
            src="/brand/mark-dorado.png"
            alt=""
            width={160}
            height={160}
            className="h-full w-full object-contain"
          />
        </motion.div>

        <div className="mt-8 w-full max-w-sm rounded-2xl bg-white p-6 shadow-[var(--shadow-card)]">
          <div className="mb-5">
            <p className="text-xs uppercase tracking-wide text-[var(--color-ink-soft)]">Red</p>
            <p className="font-display text-lg text-[var(--color-navy)]">{hotelInfo.wifiSsid}</p>
          </div>
          <div className="gold-hairline mb-5" />
          <div>
            <p className="text-xs uppercase tracking-wide text-[var(--color-ink-soft)]">Contraseña</p>
            <p className="font-display text-lg tracking-wide text-[var(--color-navy)]">
              {hotelInfo.wifiPassword}
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-navy)] py-3.5 font-medium text-white active:scale-[0.98] transition-transform"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Contraseña copiada" : "Copiar contraseña"}
          </button>
        </div>
      </div>
    </main>
  );
}
