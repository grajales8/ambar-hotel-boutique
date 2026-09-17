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

      <div className="rounded-2xl bg-[#1E1C1A] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.3)] space-y-3" style={{ border: "1px solid rgba(184,147,92,0.22)" }}>
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
      <label className="mb-1 block text-xs font-medium text-[#D4CCBF]">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-[rgba(184,147,92,0.18)] bg-[#0B0B0C] px-3 py-2 text-sm text-[#F5EFE6] outline-none placeholder-[#D4CCBF]/60 focus:border-[#B8935C]"
      />
    </div>
  );
}
