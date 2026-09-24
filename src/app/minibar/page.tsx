"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  const [sub, setSub] = useState<string>("");
  const { lines, addItem, decrement } = useCart();

  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const subheadingRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const scrollSuppressRef = useRef(false);

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

  const filterByCategory = useMemo(() => {
    const out = new Map<string, MenuItem[]>();
    categories.forEach((c) => out.set(c.id, []));
    minibarItems.forEach((it) => {
      if (!out.has(it.categoryId)) out.set(it.categoryId, []);
      out.get(it.categoryId)!.push(it);
    });
    return out;
  }, [categories, minibarItems]);

  const activeCategory = categories.find((c) => c.id === category);

  const subOptions = useMemo(() => {
    if (!activeCategory) return [] as string[];
    const items = filterByCategory.get(activeCategory.id) ?? [];
    const subs = orderByOrder(activeCategory.subcategories).filter((s) =>
      items.some((it) => it.subcategory === s.id)
    );
    return subs.map((s) => s.id);
  }, [activeCategory, filterByCategory]);

  // Al cambiar de categoría, la subcategoría se inicializa en la primera (NO "Todos").
  useEffect(() => {
    setSub(subOptions[0] ?? "");
  }, [category, subOptions]);

  // --- SINCRONIZACIÓN MANUAL 100%: tabs categoría/sub NO CAMBIAN AUTOMÁTICAMENTE mientras deslizas.
  // Cambian SOLO cuando el usuario toca el tab (scrollToCat / scrollToSub).
  // Esto deja que el usuario vea tranquilamente los últimos productos de una subcategoría
  // sin que los tabs de la próxima categoría/sub se activen solos.

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
      />
    );
  }

  function scrollToCat(catId: string) {
    const el = sectionRefs.current.get(catId);
    const root = scrollRef.current;
    if (el && root) {
      scrollSuppressRef.current = true;
      setCategory(catId);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.clearTimeout((scrollSuppressRef as any)._t);
      (scrollSuppressRef as any)._t = window.setTimeout(() => {
        scrollSuppressRef.current = false;
      }, 700);
    }
  }

  function scrollToSub(sid: string) {
    const key = `${category}:${sid}`;
    const el = subheadingRefs.current.get(key);
    const root = scrollRef.current;
    if (el && root) {
      scrollSuppressRef.current = true;
      setSub(sid);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.clearTimeout((scrollSuppressRef as any)._t);
      (scrollSuppressRef as any)._t = window.setTimeout(() => {
        scrollSuppressRef.current = false;
      }, 700);
    }
  }

  return (
    <main className="h-[100svh] overflow-hidden flex flex-col bg-[#0B0B0C]">
      <div className="flex-none z-30 bg-[#0B0B0C] backdrop-blur-md">
        <PageHeader sticky={false} title="Minibar" subtitle="Directo a tu habitación" />

        <div className="py-3">
          <CategoryTabs
            categories={categories}
            active={category}
            onChange={(c) => scrollToCat(c)}
          />
        </div>

        {subOptions.length > 0 && (
          <div className="px-5 pb-3 flex-none">
            <div className="scrollbar-thin flex gap-1.5 overflow-x-auto">
              {subOptions.map((sid) => {
                const active = sub === sid;
                return (
                  <button
                    key={sid}
                    onClick={() => scrollToSub(sid)}
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
          </div>
        )}
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto snap-y snap-mandatory overscroll-contain scrollbar-thin pb-32"
      >
        {loading && (
          <section className="min-h-full flex items-center justify-center">
            <p className="text-sm text-[#D4CCBF]">Cargando…</p>
          </section>
        )}
        {!loading &&
          categories.map((cat) => {
            const items = filterByCategory.get(cat.id) ?? [];
            // Generamos grupos/sub opciones EN TODAS las categorías (no solo la activa)
            // para que subheadingRefs + observer lean anticipadamente Snacks / la próxima.
            const allSubsOfCat = orderByOrder(cat.subcategories);
            const catSubOptionsIds = allSubsOfCat
              .filter((s) => items.some((it) => it.subcategory === s.id))
              .map((s) => s.id);
            const order: string[] = [];
            const groups = new Map<string, MenuItem[]>();
            if (catSubOptionsIds.length > 0) {
              catSubOptionsIds.forEach((sid) => {
                order.push(sid);
                groups.set(sid, []);
              });
              items.forEach((it) => {
                const k = it.subcategory || "";
                if (!groups.has(k)) {
                  order.unshift(k);
                  groups.set(k, []);
                }
                groups.get(k)!.push(it);
              });
            }
            const renderAsSubSnap = order.length > 0;
            return (
              <section
                key={cat.id}
                data-cat-id={cat.id}
                ref={(node) => {
                  if (node) sectionRefs.current.set(cat.id, node);
                  else sectionRefs.current.delete(cat.id);
                }}
                className={renderAsSubSnap ? "flex flex-col" : `snap-start flex flex-col ${items.length === 0 ? "min-h-[20vh]" : "min-h-[calc(100svh-200px)]"}`}
              >
                <div className="flex-1 px-5 pt-2 pb-6 space-y-6">
                  {items.length === 0 ? (
                    <p className="py-10 text-center text-sm text-[#D4CCBF]/70">
                      No hay productos en esta sección.
                    </p>
                  ) : !renderAsSubSnap ? (
                    <div className="grid grid-cols-2 gap-4">{items.map(renderCard)}</div>
                  ) : (
                    order.map((sid) => {
                      const groupItems = groups.get(sid) ?? [];
                      const label = subLabel(sid, cat);
                      if (groupItems.length === 0) return null;
                      return (
                        <div
                          key={sid || "otros"}
                          className="space-y-4 snap-start min-h-[calc(100svh-200px)] flex flex-col justify-start"
                        >
                          {label && (
                            <div
                              data-sub-id={sid}
                              ref={(node) => {
                                const key = `${cat.id}:${sid}`;
                                if (node) subheadingRefs.current.set(key, node);
                                else subheadingRefs.current.delete(key);
                              }}
                              className="flex items-center gap-2 pt-1 scroll-mt-[140px]"
                            >
                              <span className="h-px flex-1 bg-[rgba(184,147,92,0.22)]" />
                              <h3 className="text-[13px] md:text-sm font-semibold tracking-[0.16em] uppercase text-[#B8935C] shrink-0">
                                {label.toUpperCase()}
                              </h3>
                              <span className="h-px flex-1 bg-[rgba(184,147,92,0.22)]" />
                            </div>
                          )}
                          <div className="grid grid-cols-2 gap-4">{groupItems.map(renderCard)}</div>
                        </div>
                      );
                    })
                  )}
                </div>
              </section>
            );
          })}
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
