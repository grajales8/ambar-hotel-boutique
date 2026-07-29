"use client";

import { useEffect, useState } from "react";
import { CartProvider, useCart } from "@/lib/cart-context";
import { boutiqueCategories, boutiqueItems as defaultItems } from "@/data/boutique";
import { loadCollection } from "@/lib/storage";
import { MenuItem } from "@/lib/types";
import PageHeader from "@/components/ui/PageHeader";
import CategoryTabs from "@/components/ui/CategoryTabs";
import ProductCard from "@/components/ui/ProductCard";
import CartBar from "@/components/ui/CartBar";

function BoutiqueContent() {
  const [category, setCategory] = useState(boutiqueCategories[0].id);
  const [boutiqueItems, setBoutiqueItems] = useState<MenuItem[]>(defaultItems);
  const { lines, addItem, decrement } = useCart();

  useEffect(() => {
    setBoutiqueItems(loadCollection<MenuItem>("boutiqueItems", defaultItems));
  }, []);

  const filtered = boutiqueItems.filter((i) => i.categoryId === category);

  function quantityOf(id: string) {
    return lines.find((l) => l.item.id === id)?.quantity ?? 0;
  }

  return (
    <main className="min-h-screen bg-[var(--color-sand)] pb-32">
      <PageHeader title="Boutique" subtitle="Detalles de AMBAR para llevar" />

      <div className="sticky top-[86px] z-20 bg-[var(--color-sand)]/90 backdrop-blur-md py-3">
        <CategoryTabs categories={boutiqueCategories} active={category} onChange={setCategory} />
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

      <CartBar moduleLabel="Boutique" />
    </main>
  );
}

export default function BoutiquePage() {
  return (
    <CartProvider>
      <BoutiqueContent />
    </CartProvider>
  );
}
