"use client";

import { useEffect, useState } from "react";
import { HotelInfo } from "@/lib/types";
import { loadCollection, saveCollection } from "@/lib/storage";
import { hotelInfo as defaultHotelInfo } from "@/data/hotelInfo";

const STORAGE_KEY = "hotelInfo";

export default function HotelInfoEditor() {
  const [info, setInfo] = useState<HotelInfo>(defaultHotelInfo);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const [stored] = loadCollection<HotelInfo>(STORAGE_KEY, [defaultHotelInfo]);
    setInfo(stored);
  }, []);

  function persist(next: HotelInfo) {
    setInfo(next);
    saveCollection(STORAGE_KEY, [next]);
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--color-ink-soft)]">
          Información general mostrada en WiFi, Guía y Contacto
        </p>
        {saved && <span className="text-xs font-medium text-emerald-600">Guardado ✓</span>}
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-[var(--shadow-card)] space-y-3">
        <Field
          label="Nombre de la red WiFi"
          value={info.wifiSsid}
          onChange={(v) => persist({ ...info, wifiSsid: v })}
        />
        <Field
          label="Contraseña WiFi"
          value={info.wifiPassword}
          onChange={(v) => persist({ ...info, wifiPassword: v })}
        />
        <Field
          label="Número de WhatsApp de recepción (sin +, ej. 573001234567)"
          value={info.whatsappNumber}
          onChange={(v) => persist({ ...info, whatsappNumber: v })}
        />
        <Field
          label="Hora de check-out"
          value={info.checkOutTime}
          onChange={(v) => persist({ ...info, checkOutTime: v })}
        />
        <Field
          label="Link de reseña de Google"
          value={info.googleReviewUrl}
          onChange={(v) => persist({ ...info, googleReviewUrl: v })}
        />
      </div>

      <p className="px-1 text-xs text-[var(--color-ink-soft)]">
        Nota: por ahora estos cambios se guardan en este dispositivo/navegador
        (localStorage). Al conectar Firebase o Supabase, este mismo panel
        podrá administrar la información para todos los huéspedes en tiempo
        real sin cambios en el diseño.
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-[var(--color-ink-soft)]">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-[var(--color-sand-2)] px-3 py-2 text-sm text-[var(--color-navy)] outline-none focus:border-[var(--color-gold)]"
      />
    </div>
  );
}
