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
    <main className="min-h-screen bg-[#0B0B0C] pb-20 text-[#F5EFE6]">
      <header className="sticky top-0 z-20 bg-[#0B0B0C]/90 px-6 md:px-12 lg:px-16 pt-[max(env(safe-area-inset-top),1.25rem)] pb-6 backdrop-blur-md border-b border-[rgba(184,147,92,0.12)]">
        <div className="flex items-center justify-between max-w-[1400px] mx-auto">
          <div>
            <h1 className="font-display text-2xl md:text-3xl text-[#F5EFE6]">Panel administrativo</h1>
            <p className="text-sm text-[#D4CCBF]">AMBAR Hotel Boutique</p>
          </div>
          <button
            onClick={() => {
              setAdminSession(false);
              router.push("/admin");
            }}
            className="flex items-center gap-2 h-11 px-4 rounded-xl text-[#F5EFE6] bg-[#1E1C1A] active:scale-95 transition-colors hover:bg-[#2A2724]"
            style={{ border: "1px solid rgba(184,147,92,0.22)" }}
            aria-label="Cerrar sesión"
          >
            <span className="-ml-1 text-[#B8935C]">
              <LogOut size={18} strokeWidth={2} />
            </span>
            <span className="text-sm font-medium hidden sm:inline">Cerrar sesión</span>
          </button>
        </div>

        <div className="max-w-[1400px] mx-auto mt-5 flex flex-wrap gap-2.5">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                tab === t.id
                  ? "bg-[#B8935C] text-[#0B0B0C] shadow-[0_4px_14px_rgba(184,147,92,0.25)]"
                  : "bg-[#1E1C1A] text-[#F5EFE6] shadow-[var(--shadow-card)] hover:bg-[#2A2724]"
              }`}
              style={tab !== t.id ? { border: "1px solid rgba(184,147,92,0.22)" } : undefined}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <div className="px-6 md:px-12 lg:px-16 pt-6 max-w-[1400px] mx-auto">
        {tab === "restaurante" && (
          <CatalogEditor
            storageKey="restaurantItems"
            categoriesStorageKey="restaurantCategories"
            initialCategories={restaurantCategories}
            initialItems={restaurantItems}
          />
        )}
        {tab === "minibar" && (
          <CatalogEditor
            storageKey="minibarItems"
            categoriesStorageKey="minibarCategories"
            initialCategories={minibarCategories}
            initialItems={minibarItems}
          />
        )}
        {tab === "boutique" && (
          <CatalogEditor
            storageKey="boutiqueItems"
            categoriesStorageKey="boutiqueCategories"
            initialCategories={boutiqueCategories}
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
