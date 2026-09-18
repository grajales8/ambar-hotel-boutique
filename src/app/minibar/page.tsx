"use client";

import { useEffect, useMemo, useState } from "react";
import { CartProvider, useCart } from "@/lib/cart-context";
import { minibarCategories as fallbackCats, minibarItems as defaultItems } from "@/data/minibar";
import { loadCollection } from "@/lib/storage";
import { MenuItem, MenuCategory } from "@/lib/types";
import PageHeader from "@/components/ui/PageHeader";
import CategoryTabs from "@/components/ui/CategoryTabs";
import ProductCard from "@/components/ui/ProductCard";
import CartBar from "@/components/ui/CartBar";

function orderByOrder<T extends { order?: number; id: string }>(list: T[]): T[] {
  return [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || String(a.id).localeCompare(String(b.id)));
}

function subLabel(id: string, activeCat: MenuCategory | undefined) {
  if (!id) return "";
  const sub = activeCat?.subcategories.find((s) => s.id === id);
  if (sub) return sub.label;
  return id;
}

function MinibarContent() {
  const [category, setCategory] = useState(fallbackCats[0].id);
  const [minibarItems, setMinibarItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>(fallbackCats);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);
  const [sub, setSub] = useState<string>("all");
  const { lines, addItem, decrement } = useCart();

  useEffect(() => {
    let active = true;
    Promise.all([
      loadCollection<MenuCategory>("minibarCategories", fallbackCats),
      loadCollection<MenuItem>("minibarItems", defaultItems),
    ]).then(([cats, items]) => {
      if (!active) return;
      const sorted = orderByOrder(cats);
      setCategories(sorted);
      setMinibarItems(items);
      if (!sorted.some((c) => c.id === category)) {
        setCategory(sorted[0]?.id ?? "");
      }
      setLoading(false);
    });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeCategory = categories.find((c) => c.id === category);
  const filtered = minibarItems.filter((i) => i.categoryId === category);

  useEffect(() => {
    setSub("all");
  }, [category]);

  const subOptions = useMemo(() => {
    if (!activeCategory) return [];
    const list = orderByOrder(activeCategory.subcategories);
    const hasAny = filtered.some((it) => list.some((s) => s.id === it.subcategory));
    if (!hasAny) return [];
    return list
      .filter((s) => filtered.some((it) => it.subcategory === s.id))
      .map((s) => s.id);
  }, [filtered, activeCategory]);

  const hasAnySubcategory = subOptions.length > 0;

  const filteredBySub = useMemo(
    () => (sub === "all" ? filtered : filtered.filter((it) => (it.subcategory || "") === sub)),
    [filtered, sub]
  );

  const grouped = useMemo(() => {
    const order: string[] = [];
    const groups = new Map<string, MenuItem[]>();
    subOptions.forEach((sid) => {
      order.push(sid);
      groups.set(sid, []);
    });
    filteredBySub.forEach((it) => {
      const k = it.subcategory || "";
      if (!groups.has(k)) {
        order.unshift(k);
        groups.set(k, []);
      }
      groups.get(k)!.push(it);
    });
    return order.map((sid) => ({
      label: subLabel(sid, activeCategory),
      items: groups.get(sid) ?? [],
    }));
  }, [filteredBySub, subOptions, activeCategory]);

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
      <div className="sticky top-0 z-30 bg-[#0B0B0C] backdrop-blur-md">
        <PageHeader sticky={false} title="Minibar" subtitle="Directo a tu habitación" />

        <div className="py-3 space-y-2.5">
          <CategoryTabs
            categories={categories}
            active={category}
            onChange={(c) => {
              setCategory(c);
              setOpenId(null);
            }}
          />
          {hasAnySubcategory && (
            <div className="scrollbar-thin flex gap-1.5 overflow-x-auto px-5">
              <button
                onClick={() => setSub("all")}
                className={`shrink-0 rounded-full px-3 py-1.5 text-[11.5px] font-medium transition-colors ${
                  sub === "all"
                    ? "bg-[#B8935C] text-[#0B0B0C]"
                    : "bg-[#1E1C1A] text-[#F5EFE6]"
                }`}
                style={sub !== "all" ? { border: "1px solid rgba(184,147,92,0.22)" } : undefined}
              >
                Todos
              </button>
              {subOptions.map((sid) => {
                const active = sid === sub;
                return (
                  <button
                    key={sid}
                    onClick={() => setSub(sid)}
                    className={`shrink-0 rounded-full px-3 py-1.5 text-[11.5px] font-medium transition-colors ${
                      active ? "bg-[#B8935C] text-[#0B0B0C]" : "bg-[#1E1C1A] text-[#F5EFE6]"
                    }`}
                    style={!active ? { border: "1px solid rgba(184,147,92,0.22)" } : undefined}
                  >
                    {subLabel(sid, activeCategory).toLowerCase()}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="px-5 pt-4 pb-2 space-y-6">
        {loading && (
          <p className="pt-4 text-center text-sm text-[#D4CCBF]">Cargando…</p>
        )}
        {!loading &&
          (sub !== "all" ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredBySub.map(renderCard)}
            </div>
          ) : hasAnySubcategory ? (
            grouped.map((group) => (
              <section key={group.label || "otros"} className="space-y-4">
                {group.label && (
                  <div className="flex items-center gap-2 pt-1">
                    <span className="h-px flex-1 bg-[rgba(184,147,92,0.22)]" />
                    <h3 className="text-[13px] md:text-sm font-semibold tracking-[0.16em] uppercase text-[#B8935C] shrink-0">
                      {group.label.toUpperCase()}
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
              {filteredBySub.map(renderCard)}
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
