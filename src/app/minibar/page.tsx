"use client";

import { useEffect, useMemo, useState } from "react";
import { CartProvider, useCart } from "@/lib/cart-context";
import { minibarCategories, minibarItems as defaultItems } from "@/data/minibar";
import { loadCollection } from "@/lib/storage";
import { MenuItem } from "@/lib/types";
import PageHeader from "@/components/ui/PageHeader";
import CategoryTabs from "@/components/ui/CategoryTabs";
import ProductCard from "@/components/ui/ProductCard";
import CartBar from "@/components/ui/CartBar";

function groupBySubcategory(items: MenuItem[]) {
  const order: string[] = [];
  const groups = new Map<string, MenuItem[]>();
  items.forEach((it) => {
    const k = it.subcategory?.trim() || "";
    if (!groups.has(k)) {
      order.push(k);
      groups.set(k, []);
    }
    groups.get(k)!.push(it);
  });
  return order.map((label) => ({ label, items: groups.get(label)! }));
}

function MinibarContent() {
  const [category, setCategory] = useState(minibarCategories[0].id);
  const [minibarItems, setMinibarItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);
  const { lines, addItem, decrement } = useCart();

  useEffect(() => {
    let active = true;
    loadCollection<MenuItem>("minibarItems", defaultItems).then((data) => {
      if (active) {
        setMinibarItems(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const filtered = minibarItems.filter((i) => i.categoryId === category);
  const grouped = useMemo(() => groupBySubcategory(filtered), [filtered]);
  const hasAnySubcategory = grouped.some((g) => g.label !== "");

  function quantityOf(id: string) {
    return lines.find((l) => l.item.id === id)?.quantity ?? 0;
  }

  function renderCard(item: MenuItem) {
    return (
      <ProductCard
        key={item.id}
        item={item}
        quantity={quantityOf(item.id)}
        onAdd={() => addItem(item)}
        onRemove={() => decrement(item.id)}
        isOpen={openId === item.id}
        onToggle={() => setOpenId((cur) => (cur === item.id ? null : item.id))}
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0B0C] pb-32">
      <PageHeader title="Minibar" subtitle="Directo a tu habitación" />

      <div className="sticky top-[86px] z-20 bg-[#0B0B0C]/90 backdrop-blur-md py-3">
        <CategoryTabs
          categories={minibarCategories}
          active={category}
          onChange={(c) => {
            setCategory(c);
            setOpenId(null);
          }}
        />
      </div>

      <div className="px-5 pt-4 pb-2 space-y-6">
        {loading && (
          <p className="pt-4 text-center text-sm text-[#D4CCBF]">Cargando…</p>
        )}
        {!loading &&
          (hasAnySubcategory ? (
            grouped.map((group) => (
              <section key={group.label || "otros"} className="space-y-4">
                {group.label && (
                  <div className="flex items-center gap-2 pt-1">
                    <span className="h-px flex-1 bg-[rgba(184,147,92,0.22)]" />
                    <h3 className="text-[13px] md:text-sm font-semibold tracking-[0.16em] uppercase text-[#B8935C] shrink-0">
                      {group.label}
                    </h3>
                    <span className="h-px flex-1 bg-[rgba(184,147,92,0.22)]" />
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  {group.items.map(renderCard)}
                </div>
              </section>
            ))
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {filtered.map(renderCard)}
            </div>
          ))}
      </div>

      <CartBar moduleLabel="Minibar" />
    </main>
  );
}

export default function MinibarPage() {
  return (
    <CartProvider>
      <MinibarContent />
    </CartProvider>
  );
}
