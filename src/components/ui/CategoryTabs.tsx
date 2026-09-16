"use client";

import { MenuCategory } from "@/lib/types";

export default function CategoryTabs({
  categories,
  active,
  onChange,
}: {
  categories: MenuCategory[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="scrollbar-thin flex gap-2 overflow-x-auto px-5 pb-1">
      {categories.map((c) => {
        const isActive = c.id === active;
        return (
          <button
            key={c.id}
            onClick={() => onChange(c.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-[#B8935C] text-[#0B0B0C]"
                : "bg-[#1E1C1A] text-[#B8935C]/80 shadow-[var(--shadow-card)]"
            }`}
            style={!isActive ? { border: "1px solid rgba(184,147,92,0.22)" } : undefined}
          >
            {c.name}
          </button>
        );
      })}
    </div>
  );
}
