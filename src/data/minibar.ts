import { MenuCategory, MenuItem } from "@/lib/types";

export const minibarCategories: MenuCategory[] = [
  { id: "bebidas", name: "Bebidas" },
  { id: "snacks", name: "Snacks" },
];

export const minibarItems: MenuItem[] = [
  {
    id: "m-1",
    categoryId: "bebidas",
    name: "Agua mineral 500ml",
    description: "Agua sin gas, botella de vidrio.",
    price: 8000,
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=800&auto=format&fit=crop",
    available: true,
  },
  {
    id: "m-2",
    categoryId: "bebidas",
    name: "Gaseosa 350ml",
    description: "Sabores surtidos.",
    price: 9000,
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=800&auto=format&fit=crop",
    available: true,
  },
  {
    id: "m-3",
    categoryId: "bebidas",
    name: "Cerveza artesanal IPA",
    description: "Botella 330ml, notas cítricas.",
    price: 18000,
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=800&auto=format&fit=crop",
    available: true,
  },
  {
    id: "m-4",
    categoryId: "bebidas",
    name: "Vino blanco Chardonnay",
    description: "Media botella, 375ml.",
    price: 45000,
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=800&auto=format&fit=crop",
    available: true,
  },
  {
    id: "m-5",
    categoryId: "bebidas",
    name: "Café colombiano de origen",
    description: "Cápsula individual, tueste medio.",
    price: 9000,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800&auto=format&fit=crop",
    available: true,
  },
  {
    id: "m-6",
    categoryId: "snacks",
    name: "Tabla de pasabocas",
    description: "Nueces, aceitunas y queso curado.",
    price: 26000,
    image: "https://images.unsplash.com/photo-1541014741259-de529411b96a?q=80&w=800&auto=format&fit=crop",
    available: true,
  },
  {
    id: "m-7",
    categoryId: "snacks",
    name: "Chocolatería fina",
    description: "Selección de 6 bombones artesanales.",
    price: 22000,
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=800&auto=format&fit=crop",
    available: true,
  },
];
