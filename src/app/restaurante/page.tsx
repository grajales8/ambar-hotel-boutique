"use client";

import { useEffect, useState } from "react";
import { CartProvider, useCart } from "@/lib/cart-context";
import { restaurantCategories, restaurantItems as defaultItems } from "@/data/restaurant";
import { loadCollection } from "@/lib/storage";
import { MenuItem } from "@/lib/types";
import PageHeader from "@/components/ui/PageHeader";
import CategoryTabs from "@/components/ui/CategoryTabs";
import ProductCard from "@/components/ui/ProductCard";
import CartBar from "@/components/ui/CartBar";

function RestaurantContent() {
  const [category, setCategory] = useState(restaurantCategories[0].id);
  const [restaurantItems, setRestaurantItems] = useState<MenuItem[]>(defaultItems);
  const { lines, addItem, decrement } = useCart();

  useEffect(() => {
    setRestaurantItems(loadCollection<MenuItem>("restaurantItems", defaultItems));
  }, []);

  const filtered = restaurantItems.filter((i) => i.categoryId === category);

  function quantityOf(id: string) {
    return lines.find((l) => l.item.id === id)?.quantity ?? 0;
  }

  return (
    <main className="min-h-screen bg-[var(--color-sand)] pb-32">
      <PageHeader title="Restaurante" subtitle="Sabores para disfrutar en tu habitación" />

      <div className="sticky top-[86px] z-20 bg-[var(--color-sand)]/90 backdrop-blur-md py-3">
        <CategoryTabs categories={restaurantCategories} active={category} onChange={setCategory} />
      </div>

      <div className="grid grid-cols-2 gap-4 px-5 pt-4">
        {filtered.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            quantity={quantityOf(item.id)}
            onAdd={() => addItem(item)}
            onRemove={() => decrement(item.id)}
          />
        ))}
      </div>

      <CartBar moduleLabel="Restaurante" />
    </main>
  );
}

export default function RestaurantPage() {
  return (
    <CartProvider>
      <RestaurantContent />
    </CartProvider>
  );
}
