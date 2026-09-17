"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
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

      <div>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-[#F5EFE6]">Horarios (Guía del Hotel)</h3>
            <p className="mt-0.5 text-xs text-[#D4CCBF]">
              Estos horarios se muestran en la sección &quot;Horarios&quot; de Guía del Hotel.
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-[#1E1C1A] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.3)] space-y-2.5" style={{ border: "1px solid rgba(184,147,92,0.22)" }}>
          {(info.schedules ?? []).map((sch, idx) => (
            <div key={idx} className="flex flex-wrap items-stretch gap-2">
              <div className="flex-1 min-w-[150px]">
                <label className="mb-0.5 block text-[10px] font-medium uppercase tracking-wide text-[#D4CCBF]/80">
                  Título
                </label>
                <input
                  value={sch.label}
                  onChange={(e) => {
                    const next = [...(info.schedules ?? [])];
                    next[idx] = { ...next[idx], label: e.target.value };
                    persist({ ...info, schedules: next });
                  }}
                  placeholder="Ej. Recepción"
                  className="w-full rounded-lg border border-[rgba(184,147,92,0.18)] bg-[#0B0B0C] px-3 py-2 text-sm text-[#F5EFE6] outline-none placeholder-[#D4CCBF]/60 focus:border-[#B8935C]"
                />
              </div>
              <div className="flex-[2] min-w-[200px]">
                <label className="mb-0.5 block text-[10px] font-medium uppercase tracking-wide text-[#D4CCBF]/80">
                  Horario
                </label>
                <input
                  value={sch.value}
                  onChange={(e) => {
                    const next = [...(info.schedules ?? [])];
                    next[idx] = { ...next[idx], value: e.target.value };
                    persist({ ...info, schedules: next });
                  }}
                  placeholder="Ej. 6:30 a.m. – 10:00 a.m."
                  className="w-full rounded-lg border border-[rgba(184,147,92,0.18)] bg-[#0B0B0C] px-3 py-2 text-sm text-[#F5EFE6] outline-none placeholder-[#D4CCBF]/60 focus:border-[#B8935C]"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    const next = (info.schedules ?? []).filter((_, i) => i !== idx);
                    persist({ ...info, schedules: next });
                  }}
                  className="mb-[1px] flex h-[38px] w-[38px] items-center justify-center rounded-lg bg-red-500/15 text-red-400"
                  style={{ border: "1px solid rgba(248,113,113,0.25)" }}
                  aria-label="Eliminar horario"
                >
                  <Trash2 size={14} strokeWidth={2} />
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={() => {
              const next = [...(info.schedules ?? []), { label: "", value: "" }];
              persist({ ...info, schedules: next });
            }}
            className="mt-1.5 flex w-full items-center justify-center gap-2 rounded-full border border-dashed border-[#B8935C] py-2.5 text-xs font-medium text-[#F5EFE6]"
          >
            <Plus size={14} className="text-[#B8935C]" strokeWidth={2} />
            Añadir horario
          </button>
        </div>
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
