"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { serviceRequests } from "@/data/services";
import { getIcon } from "@/lib/icon-map";
import { notifyReception } from "@/lib/notify";
import PageHeader from "@/components/ui/PageHeader";

const ROOM_KEY = "ambar-room-number";

export default function ServiceRequestPage() {
  const [room, setRoom] = useState("");
  const [sentId, setSentId] = useState<string | null>(null);

  useEffect(() => {
    const saved = window.sessionStorage.getItem(ROOM_KEY);
    if (saved) setRoom(saved);
  }, []);

  useEffect(() => {
    if (room) window.sessionStorage.setItem(ROOM_KEY, room);
  }, [room]);

  async function handleRequest(name: string, id: string) {
    const message = `*Solicitud de servicio*\nHabitación: ${
      room || "(no indicada)"
    }\n\nEl huésped solicita: ${name}`;
    await notifyReception(message);
    setSentId(id);
    setTimeout(() => setSentId((curr) => (curr === id ? null : curr)), 1800);
  }

  return (
    <main className="min-h-screen bg-[var(--color-sand)] pb-10">
      <PageHeader title="Solicitar servicio" subtitle="Recepción atenderá tu solicitud enseguida" />

      <div className="px-5 pt-4">
        <label className="mb-2 block text-sm font-medium text-[var(--color-navy)]">
          Número de habitación
        </label>
        <input
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Ej. 204"
          inputMode="numeric"
          className="w-full rounded-xl border border-[var(--color-sand-2)] bg-white px-4 py-3 text-[var(--color-navy)] outline-none focus:border-[var(--color-gold)]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 px-5 pt-5">
        {serviceRequests.map((s, i) => {
          const Icon = getIcon(s.icon);
          const isSent = sentId === s.id;
          return (
            <motion.button
              key={s.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.04 * i }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleRequest(s.name, s.id)}
              className="flex h-32 flex-col items-center justify-center gap-2.5 rounded-2xl bg-white p-4 text-center shadow-[var(--shadow-card)]"
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
                  isSent
                    ? "bg-[var(--color-navy)] text-white"
                    : "bg-[var(--color-sand)] text-[var(--color-navy)]"
                }`}
              >
                {isSent ? <Check size={20} /> : <Icon size={20} strokeWidth={1.75} />}
              </span>
              <span className="text-sm font-medium leading-tight text-[var(--color-navy)]">
                {isSent ? "Solicitud enviada" : s.name}
              </span>
            </motion.button>
          );
        })}
      </div>
    </main>
  );
}
