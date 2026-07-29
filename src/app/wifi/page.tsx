"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Wifi as WifiIcon } from "lucide-react";
import { wifiNetworks as defaultNetworks } from "@/data/wifi";
import { loadCollection } from "@/lib/storage";
import { WifiNetwork } from "@/lib/types";
import PageHeader from "@/components/ui/PageHeader";

export default function WifiPage() {
  const [networks, setNetworks] = useState<WifiNetwork[]>(defaultNetworks);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setNetworks(loadCollection<WifiNetwork>("wifiNetworks", defaultNetworks));
  }, []);

  const activeNetworks = networks.filter((n) => n.active);

  async function handleCopy(network: WifiNetwork) {
    try {
      await navigator.clipboard.writeText(network.password);
      setCopiedId(network.id);
      setTimeout(() => setCopiedId((curr) => (curr === network.id ? null : curr)), 1800);
    } catch {
      // Navegadores sin soporte de clipboard: no bloquea el flujo.
    }
  }

  return (
    <main className="min-h-screen bg-[var(--color-sand)] pb-10">
      <PageHeader title="WiFi" subtitle="Conéctate en segundos" />

      <div className="flex flex-col items-center gap-4 px-6 pt-8">
        {activeNetworks.length === 0 && (
          <p className="mt-6 text-center text-sm text-[var(--color-ink-soft)]">
            No hay redes WiFi disponibles en este momento.
          </p>
        )}

        {activeNetworks.map((network, i) => (
          <motion.div
            key={network.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.06 * i }}
            className="w-full max-w-sm rounded-2xl bg-white p-6 text-left shadow-[var(--shadow-card)]"
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-sand)] text-[var(--color-navy)]">
                <WifiIcon size={16} strokeWidth={1.75} />
              </span>
              {network.description && (
                <span className="text-xs text-[var(--color-ink-soft)]">{network.description}</span>
              )}
            </div>

            <p className="text-xs uppercase tracking-wide text-[var(--color-ink-soft)]">Red</p>
            <p className="font-display text-lg text-[var(--color-navy)]">{network.ssid}</p>

            <div className="gold-hairline my-4" />

            <p className="text-xs uppercase tracking-wide text-[var(--color-ink-soft)]">Contraseña</p>
            <p className="font-display text-lg tracking-wide text-[var(--color-navy)]">
              {network.password}
            </p>

            <button
              onClick={() => handleCopy(network)}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-navy)] py-3.5 font-medium text-white active:scale-[0.98] transition-transform"
            >
              {copiedId === network.id ? <Check size={16} /> : <Copy size={16} />}
              {copiedId === network.id ? "Contraseña copiada" : "Copiar contraseña"}
            </button>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
