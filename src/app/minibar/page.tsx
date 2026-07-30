"use client";

import { useEffect, useState } from "react";
import { CartProvider, useCart } from "@/lib/cart-context";
import { minibarCategories, minibarItems as defaultItems } from "@/data/minibar";
import { loadCollection } from "@/lib/storage";
import { MenuItem } from "@/lib/types";
import PageHeader from "@/components/ui/PageHeader";
import CategoryTabs from "@/components/ui/CategoryTabs";
import ProductCard from "@/components/ui/ProductCard";
import CartBar from "@/components/ui/CartBar";

function MinibarContent() {
  const [category, setCategory] = useState(minibarCategories[0].id);
  const [minibarItems, setMinibarItems] = useState<MenuItem[]>(defaultItems);
  const [openId, setOpenId] = useState<string | null>(null);
  const { lines, addItem, decrement } = useCart();

  useEffect(() => {
    let active = true;
    loadCollection<MenuItem>("minibarItems", defaultItems).then((data) => {
      if (active) setMinibarItems(data);
    });
    return () => {
      active = false;
    };
  }, []);

  const filtered = minibarItems.filter((i) => i.categoryId === category);

  function quantityOf(id: string) {
    return lines.find((l) => l.item.id === id)?.quantity ?? 0;
  }

  return (
    <main className="min-h-screen bg-[var(--color-sand)] pb-32">
      <PageHeader title="Minibar" subtitle="Directo a tu habitación" />

      <div className="sticky top-[86px] z-20 bg-[var(--color-sand)]/90 backdrop-blur-md py-3">
        <CategoryTabs
          categories={minibarCategories}
          active={category}
          onChange={(c) => {
            setCategory(c);
            setOpenId(null);
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 px-5 pt-4">
        {filtered.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            quantity={quantityOf(item.id)}
            onAdd={() => addItem(item)}
            onRemove={() => decrement(item.id)}
            isOpen={openId === item.id}
            onToggle={() => setOpenId((cur) => (cur === item.id ? null : item.id))}
          />
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
