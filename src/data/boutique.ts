import { MenuCategory, MenuItem } from "@/lib/types";

// Estructura idéntica a minibar.ts / restaurant.ts: agregar o editar
// productos aquí (o desde /admin → Boutique) no requiere tocar ningún
// componente ni página.
export const boutiqueCategories: MenuCategory[] = [
  { id: "accesorios", name: "Accesorios" },
  { id: "ropa", name: "Ropa" },
  { id: "detalles", name: "Detalles y regalos" },
];

export const boutiqueItems: MenuItem[] = [
  {
    id: "b-1",
    categoryId: "accesorios",
    name: "Sombrero de paja toquilla",
    description: "Tejido artesanal colombiano, ideal para el clima cálido de Cali.",
    price: 85000,
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=800&auto=format&fit=crop",
    available: true,
  },
  {
    id: "b-2",
    categoryId: "accesorios",
    name: "Bolso tejido a mano",
    description: "Fibras naturales, diseño artesanal de la región.",
    price: 120000,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
    available: true,
  },
  {
    id: "b-3",
    categoryId: "ropa",
    name: "Camiseta AMBAR",
    description: "Algodón 100%, edición exclusiva del hotel.",
    price: 65000,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
    available: true,
  },
  {
    id: "b-4",
    categoryId: "ropa",
    name: "Bufanda de algodón",
    description: "Tejido liviano, perfecta como abrigo ligero en la noche.",
    price: 58000,
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=800&auto=format&fit=crop",
    available: true,
  },
  {
    id: "b-5",
    categoryId: "detalles",
    name: "Vela aromática AMBAR",
    description: "Aroma de la casa, en frasco de cerámica reutilizable.",
    price: 48000,
    image: "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?q=80&w=800&auto=format&fit=crop",
    available: true,
  },
  {
    id: "b-6",
    categoryId: "detalles",
    name: "Set de café de origen",
    description: "Café colombiano de finca, ideal para llevar a casa.",
    price: 42000,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop",
    available: true,
  },
  {
    id: "b-7",
    categoryId: "detalles",
    name: "Libreta artesanal",
    description: "Papel reciclado y tapa en cuero vegetal, hecha a mano.",
    price: 36000,
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=800&auto=format&fit=crop",
    available: true,
  },
];
