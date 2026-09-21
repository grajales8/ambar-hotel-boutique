"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { restaurantCategories as fallbackCats, restaurantItems as defaultItems } from "@/data/restaurant";
import { loadCollection } from "@/lib/storage";
import { MenuItem, MenuCategory } from "@/lib/types";
import PageHeader from "@/components/ui/PageHeader";
import CategoryTabs from "@/components/ui/CategoryTabs";
import ProductCardReadOnly from "@/components/ui/ProductCardReadOnly";

function orderByOrder<T extends { order?: number; id: string }>(list: T[]): T[] {
  return [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || String(a.id).localeCompare(String(b.id)));
}

function subLabel(id: string, activeCat: MenuCategory | undefined) {
  if (!id) return "";
  const sub = activeCat?.subcategories.find((s) => s.id === id);
  if (sub) return sub.label;
  return id;
}

export default function RestaurantPage() {
  const [category, setCategory] = useState(fallbackCats[0].id);
  const [restaurantItems, setRestaurantItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>(fallbackCats);
  const [loading, setLoading] = useState(true);
  const [sub, setSub] = useState<string>("all");

  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const scrollSuppressRef = useRef(false);

  useEffect(() => {
    let active = true;
    Promise.all([
      loadCollection<MenuCategory>("restaurantCategories", fallbackCats),
      loadCollection<MenuItem>("restaurantItems", defaultItems),
    ]).then(([cats, items]) => {
      if (!active) return;
      const sorted = orderByOrder(cats);
      setCategories(sorted);
      setRestaurantItems(items);
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

  useEffect(() => {
    setSub("all");
  }, [category]);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollSuppressRef.current) return;
        let bestId: string | null = null;
        let bestRatio = 0;
        entries.forEach((e) => {
          const id = (e.target as HTMLElement).dataset.catId;
          if (id && e.intersectionRatio > bestRatio) {
            bestRatio = e.intersectionRatio;
            bestId = id;
          }
        });
        if (bestId && bestId !== category && bestRatio >= 0.5) {
          setCategory(bestId);
        }
      },
      {
        root,
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-60px 0px -20% 0px",
      }
    );
    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [categories, loading, category]);

  const filterByCategory = useMemo(() => {
    const out = new Map<string, MenuItem[]>();
    categories.forEach((c) => out.set(c.id, []));
    restaurantItems.forEach((it) => {
      if (!out.has(it.categoryId)) out.set(it.categoryId, []);
      out.get(it.categoryId)!.push(it);
    });
    return out;
  }, [categories, restaurantItems]);

  function renderCard(item: MenuItem) {
    return (
      <ProductCardReadOnly
        key={item.id}
        item={item}
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

  return (
    <main className="h-[100svh] overflow-hidden flex flex-col bg-[#0B0B0C]">
      <div className="flex-none z-30 bg-[#0B0B0C] backdrop-blur-md">
        <PageHeader sticky={false} title="Restaurante" subtitle="Nuestro menú" />

        <div className="py-3">
          <CategoryTabs
            categories={categories}
            active={category}
            onChange={(c) => scrollToCat(c)}
          />
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto snap-y snap-mandatory overscroll-contain scrollbar-thin pb-10"
      >
        {loading && (
          <section className="min-h-full flex items-center justify-center">
            <p className="text-sm text-[#D4CCBF]">Cargando…</p>
          </section>
        )}
        {!loading &&
          categories.map((cat) => {
            const items = filterByCategory.get(cat.id) ?? [];
            const subListRaw = orderByOrder(cat.subcategories);
            const subOptions = subListRaw
              .filter((s) => items.some((it) => it.subcategory === s.id))
              .map((s) => s.id);
            const hasSub = subOptions.length > 0;
            const isActiveCat = cat.id === category;
            const effectiveSub = isActiveCat ? sub : "all";
            const filtered =
              effectiveSub === "all"
                ? items
                : items.filter((it) => (it.subcategory || "") === effectiveSub);
            const order: string[] = [];
            const groups = new Map<string, MenuItem[]>();
            if (hasSub && effectiveSub === "all") {
              subOptions.forEach((sid) => {
                order.push(sid);
                groups.set(sid, []);
              });
            }
            filtered.forEach((it) => {
              const k = it.subcategory || "";
              if (effectiveSub === "all" && hasSub) {
                if (!groups.has(k)) {
                  order.unshift(k);
                  groups.set(k, []);
                }
                groups.get(k)!.push(it);
              }
            });
            return (
              <section
                key={cat.id}
                data-cat-id={cat.id}
                ref={(node) => {
                  if (node) sectionRefs.current.set(cat.id, node);
                  else sectionRefs.current.delete(cat.id);
                }}
                className="snap-start min-h-[calc(100svh-160px)] flex flex-col"
              >
                <div className="px-5 pt-3 pb-2 flex-none">
                  {hasSub && (
                    <div className="scrollbar-thin flex gap-1.5 overflow-x-auto">
                      <button
                        onClick={() => {
                          if (isActiveCat) setSub("all");
                          else {
                            setSub("all");
                            scrollToCat(cat.id);
                          }
                        }}
                        className={`shrink-0 rounded-full px-3 py-1.5 text-[11.5px] font-medium transition-colors ${
                          effectiveSub === "all"
                            ? "bg-[#B8935C] text-[#0B0B0C]"
                            : "bg-[#1E1C1A] text-[#F5EFE6]"
                        }`}
                        style={
                          effectiveSub !== "all"
                            ? { border: "1px solid rgba(184,147,92,0.22)" }
                            : undefined
                        }
                      >
                        Todos
                      </button>
                      {subOptions.map((sid) => {
                        const active = effectiveSub === sid;
                        return (
                          <button
                            key={sid}
                            onClick={() => {
                              if (isActiveCat) setSub(sid);
                              else {
                                setSub(sid);
                                scrollToCat(cat.id);
                              }
                            }}
                            className={`shrink-0 rounded-full px-3 py-1.5 text-[11.5px] font-medium transition-colors ${
                              active ? "bg-[#B8935C] text-[#0B0B0C]" : "bg-[#1E1C1A] text-[#F5EFE6]"
                            }`}
                            style={
                              !active ? { border: "1px solid rgba(184,147,92,0.22)" } : undefined
                            }
                          >
                            {subLabel(sid, cat).toLowerCase()}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="flex-1 px-5 pt-2 pb-6 space-y-6">
                  {filtered.length === 0 ? (
                    <p className="py-10 text-center text-sm text-[#D4CCBF]/70">
                      No hay productos en esta sección.
                    </p>
                  ) : effectiveSub !== "all" || !hasSub ? (
                    <div className="grid grid-cols-2 gap-4">{filtered.map(renderCard)}</div>
                  ) : (
                    order.map((sid) => {
                      const groupItems = groups.get(sid) ?? [];
                      const label = subLabel(sid, cat);
                      if (groupItems.length === 0) return null;
                      return (
                        <div key={sid || "otros"} className="space-y-4">
                          {label && (
                            <div className="flex items-center gap-2 pt-1">
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
    </main>
  );
}
