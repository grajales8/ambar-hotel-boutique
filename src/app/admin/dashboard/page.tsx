"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { hasAdminSession, setAdminSession } from "@/lib/storage";
import { restaurantCategories, restaurantItems } from "@/data/restaurant";
import { minibarCategories, minibarItems } from "@/data/minibar";
import { boutiqueCategories, boutiqueItems } from "@/data/boutique";
import CatalogEditor from "@/components/admin/CatalogEditor";
import HotelInfoEditor from "@/components/admin/HotelInfoEditor";
import PlacesEditor from "@/components/admin/PlacesEditor";
import WifiEditor from "@/components/admin/WifiEditor";
import ExperiencesEditor from "@/components/admin/ExperiencesEditor";

const TABS = [
  { id: "restaurante", label: "Restaurante" },
  { id: "minibar", label: "Minibar" },
  { id: "boutique", label: "Boutique" },
  { id: "experiencias", label: "Servicios & Experiencias" },
  { id: "descubre", label: "Descubre Cali" },
  { id: "wifi", label: "Redes WiFi" },
  { id: "info", label: "Información" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<TabId>("restaurante");

  useEffect(() => {
    if (!hasAdminSession()) {
      router.replace("/admin");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) return null;

  return (
    <main className="min-h-screen bg-[var(--color-sand)] pb-16">
      <header className="sticky top-0 z-20 bg-[var(--color-sand)]/90 px-5 pt-[calc(env(safe-area-inset-top)+1rem)] pb-4 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl text-[var(--color-navy)]">Panel administrativo</h1>
            <p className="text-xs text-[var(--color-ink-soft)]">AMBAR Hotel Boutique</p>
          </div>
          <button
            onClick={() => {
              setAdminSession(false);
              router.push("/admin");
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--color-navy)] shadow-[var(--shadow-card)]"
            aria-label="Cerrar sesión"
          >
            <LogOut size={16} />
          </button>
        </div>

        <div className="scrollbar-thin mt-4 flex gap-2 overflow-x-auto pb-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                tab === t.id
                  ? "bg-[var(--color-navy)] text-white"
                  : "bg-white text-[var(--color-ink-soft)] shadow-[var(--shadow-card)]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <div className="px-5 pt-4">
        {tab === "restaurante" && (
          <CatalogEditor
            storageKey="restaurantItems"
            categories={restaurantCategories}
            initialItems={restaurantItems}
          />
        )}
        {tab === "minibar" && (
          <CatalogEditor
            storageKey="minibarItems"
            categories={minibarCategories}
            initialItems={minibarItems}
          />
        )}
        {tab === "boutique" && (
          <CatalogEditor
            storageKey="boutiqueItems"
            categories={boutiqueCategories}
            initialItems={boutiqueItems}
          />
        )}
        {tab === "experiencias" && <ExperiencesEditor />}
        {tab === "descubre" && <PlacesEditor />}
        {tab === "wifi" && <WifiEditor />}
        {tab === "info" && <HotelInfoEditor />}
      </div>
    </main>
  );
}
