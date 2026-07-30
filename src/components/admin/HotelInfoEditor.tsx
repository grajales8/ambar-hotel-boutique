"use client";

import { useEffect, useMemo, useState } from "react";
import { HotelInfo } from "@/lib/types";
import { loadSingleton, saveSingleton, debounce } from "@/lib/storage";
import { hotelInfo as defaultHotelInfo } from "@/data/hotelInfo";

const STORAGE_KEY = "hotelInfo";
const DOC_ID = "main";

export default function HotelInfoEditor() {
  const [info, setInfo] = useState<HotelInfo>(defaultHotelInfo);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let active = true;
    loadSingleton<HotelInfo>(STORAGE_KEY, DOC_ID, defaultHotelInfo).then((data) => {
      if (active) {
        setInfo(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const debouncedSave = useMemo(
    () =>
      debounce((next: HotelInfo) => {
        saveSingleton(STORAGE_KEY, DOC_ID, next).then(() => {
          setSaved(true);
          setTimeout(() => setSaved(false), 1200);
        });
      }, 700),
    []
  );

  function persist(next: HotelInfo) {
    setInfo(next);
    debouncedSave(next);
  }

  if (loading) {
    return <p className="text-sm text-[var(--color-ink-soft)]">Cargando…</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--color-ink-soft)]">
          Información general mostrada en Guía y Contacto
        </p>
        {saved && <span className="text-xs font-medium text-emerald-600">Guardado ✓</span>}
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-[var(--shadow-card)] space-y-3">
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
        Estos cambios se guardan en Firebase y se ven igual en cualquier
        dispositivo, no solo en este navegador.
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
