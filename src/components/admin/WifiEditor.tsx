"use client";

import { useEffect, useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { WifiNetwork } from "@/lib/types";
import { loadCollection, saveCollection } from "@/lib/storage";
import { wifiNetworks as defaultNetworks } from "@/data/wifi";

const STORAGE_KEY = "wifiNetworks";

export default function WifiEditor() {
  const [networks, setNetworks] = useState<WifiNetwork[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setNetworks(loadCollection<WifiNetwork>(STORAGE_KEY, defaultNetworks));
  }, []);

  function persist(next: WifiNetwork[]) {
    setNetworks(next);
    saveCollection(STORAGE_KEY, next);
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  }

  function updateNetwork(id: string, patch: Partial<WifiNetwork>) {
    persist(networks.map((n) => (n.id === id ? { ...n, ...patch } : n)));
  }

  function removeNetwork(id: string) {
    persist(networks.filter((n) => n.id !== id));
  }

  function addNetwork() {
    const id = `wifi-${Date.now()}`;
    const next: WifiNetwork = {
      id,
      ssid: "Nueva red",
      password: "",
      description: "",
      active: true,
    };
    persist([...networks, next]);
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-[var(--color-ink-soft)]">
          {networks.length} redes · solo las activas se muestran al huésped
        </p>
        {saved && <span className="text-xs font-medium text-emerald-600">Guardado ✓</span>}
      </div>

      <div className="space-y-3">
        {networks.map((network) => (
          <div key={network.id} className="rounded-2xl bg-white p-4 shadow-[var(--shadow-card)] space-y-2">
            <input
              value={network.ssid}
              onChange={(e) => updateNetwork(network.id, { ssid: e.target.value })}
              placeholder="Nombre de la red (SSID)"
              className="w-full rounded-lg border border-[var(--color-sand-2)] px-3 py-2 text-sm font-medium text-[var(--color-navy)] outline-none focus:border-[var(--color-gold)]"
            />
            <input
              value={network.password}
              onChange={(e) => updateNetwork(network.id, { password: e.target.value })}
              placeholder="Contraseña"
              className="w-full rounded-lg border border-[var(--color-sand-2)] px-3 py-2 text-sm text-[var(--color-navy)] outline-none focus:border-[var(--color-gold)]"
            />
            <input
              value={network.description ?? ""}
              onChange={(e) => updateNetwork(network.id, { description: e.target.value || undefined })}
              placeholder="Descripción (opcional, ej. 'Piso 2 y 3')"
              className="w-full rounded-lg border border-[var(--color-sand-2)] px-3 py-2 text-xs text-[var(--color-ink-soft)] outline-none focus:border-[var(--color-gold)]"
            />

            <div className="flex items-center gap-2 pt-1">
              <label className="flex items-center gap-1.5 text-xs text-[var(--color-ink-soft)]">
                <input
                  type="checkbox"
                  checked={network.active}
                  onChange={(e) => updateNetwork(network.id, { active: e.target.checked })}
                />
                Activa (visible para huéspedes)
              </label>

              <button
                onClick={() => removeNetwork(network.id)}
                className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500"
                aria-label="Eliminar red"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addNetwork}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-dashed border-[var(--color-gold)] py-3 text-sm font-medium text-[var(--color-navy)]"
      >
        <Plus size={16} />
        Añadir red
      </button>
    </div>
  );
}
