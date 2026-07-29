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
                ? "bg-[var(--color-navy)] text-white"
                : "bg-white text-[var(--color-ink-soft)] shadow-[var(--shadow-card)]"
            }`}
          >
            {c.name}
          </button>
        );
      })}
    </div>
  );
}
