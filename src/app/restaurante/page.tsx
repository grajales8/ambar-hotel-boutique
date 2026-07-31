"use client";

import { useEffect, useState } from "react";
import { restaurantCategories, restaurantItems as defaultItems } from "@/data/restaurant";
import { loadCollection } from "@/lib/storage";
import { MenuItem } from "@/lib/types";
import PageHeader from "@/components/ui/PageHeader";
import CategoryTabs from "@/components/ui/CategoryTabs";
import ProductCardReadOnly from "@/components/ui/ProductCardReadOnly";

// Menú de solo consulta: sin carrito ni pedidos. El huésped únicamente
// revisa platos, fotos, descripciones y precios.
export default function RestaurantPage() {
  const [category, setCategory] = useState(restaurantCategories[0].id);
  const [restaurantItems, setRestaurantItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    loadCollection<MenuItem>("restaurantItems", defaultItems).then((data) => {
      if (active) {
        setRestaurantItems(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const filtered = restaurantItems.filter((i) => i.categoryId === category);

  return (
    <main className="min-h-screen bg-[var(--color-sand)] pb-10">
      <PageHeader title="Restaurante" subtitle="Nuestro menú" />

      <div className="sticky top-[86px] z-20 bg-[var(--color-sand)]/90 backdrop-blur-md py-3">
        <CategoryTabs
          categories={restaurantCategories}
          active={category}
          onChange={(c) => {
            setCategory(c);
            setOpenId(null);
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 px-5 pt-4">
        {loading && (
          <p className="col-span-2 pt-4 text-center text-sm text-[var(--color-ink-soft)]">Cargando…</p>
        )}
        {!loading && filtered.map((item) => (
          <ProductCardReadOnly
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => setOpenId((cur) => (cur === item.id ? null : item.id))}
          />
        ))}
      </div>
    </main>
  );
}
