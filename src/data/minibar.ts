import { MenuCategory, MenuItem } from "@/lib/types";

export const minibarCategories: MenuCategory[] = [
  {
    id: "bebidas",
    name: "Bebidas",
    order: 1,
    subcategories: [
      { id: "sb-beb-aguas", label: "Aguas", order: 1 },
      { id: "sb-beb-gaseosas", label: "Gaseosas", order: 2 },
      { id: "sb-beb-calientes", label: "Bebidas calientes", order: 3 },
      { id: "sb-beb-cervezas", label: "Cervezas", order: 4 },
      { id: "sb-beb-licores", label: "Licores y vinos", order: 5 },
    ],
  },
  {
    id: "snacks",
    name: "Snacks",
    order: 2,
    subcategories: [
      { id: "sb-snk-salados", label: "Papas y snacks salados", order: 1 },
      { id: "sb-snk-dulces", label: "Chocolates y dulces", order: 2 },
    ],
  },
];

const img = (prompt: string) =>
  `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=landscape_4_3`;

export const minibarItems: MenuItem[] = [
  {
    id: "m-1",
    categoryId: "bebidas",
    subcategory: "sb-beb-aguas",
    name: "Agua sin gas 500ml",
    description: "Botella plástica transparente, agua purificada fría.",
    price: 5000,
    image: img(
      "Botella plastica transparente de agua purificada de 500ml, etiqueta azul minimalista, fondo gris oscuro elegante, fotografia comercial de producto, 4:3, iluminacion estudio suave, sin texto"
    ),
    available: true,
    order: 1,
  },
  {
    id: "m-2",
    categoryId: "bebidas",
    subcategory: "sb-beb-aguas",
    name: "Agua con gas 500ml",
    description: "Botella plástica, agua mineral con gas, etiqueta verde.",
    price: 6000,
    image: img(
      "Botella plastica de agua mineral con gas de 500ml, etiqueta verde brillante, burbujas visibles, fondo gris oscuro premium, fotografia comercial producto, 4:3, iluminacion estudio"
    ),
    available: true,
    order: 2,
  },
  {
    id: "m-3",
    categoryId: "bebidas",
    subcategory: "sb-beb-gaseosas",
    name: "Coca-Cola lata 330ml",
    description: "Lata roja clásica, gaseosa carbonatada fría.",
    price: 7000,
    image: img(
      "Lata roja clasica de gaseosa Coca Cola 330ml, condensacion gotas frias, fondo oscuro gris carbon, fotografia comercial premium, 4:3, iluminacion estudio suave, enfoque nitido lata"
    ),
    available: true,
    order: 1,
  },
  {
    id: "m-4",
    categoryId: "bebidas",
    subcategory: "sb-beb-gaseosas",
    name: "Sprite lata 330ml",
    description: "Lata verde lima-limón, gaseosa transparente.",
    price: 7000,
    image: img(
      "Lata verde limon lima Sprite 330ml, gotas frias de condensacion, fondo carbón oscuro, fotografia comercial producto premium, 4:3, iluminacion estudio, sin texto excesivo"
    ),
    available: true,
    order: 2,
  },
  {
    id: "m-5",
    categoryId: "bebidas",
    subcategory: "sb-beb-calientes",
    name: "Café tinto",
    description: "Taza de cerámica negra, café colombiano negro recién hecho.",
    price: 6000,
    image: img(
      "Taza ceramica negra con cafe tinto negro humeante, grano cafe tostado esparcido alrededor, fondo madera oscura, fotografia comercial gastronomica, 4:3, iluminacion calida suave"
    ),
    available: true,
    order: 1,
  },
  {
    id: "m-6",
    categoryId: "bebidas",
    subcategory: "sb-beb-calientes",
    name: "Café con leche",
    description: "Taza grande, café con leche cremosa con microespuma.",
    price: 8000,
    image: img(
      "Taza blanca ceramica con cafe con leche y arte latte corazon, cuchara al lado, fondo gris elegante, fotografia gastronomica comercial, 4:3, iluminacion calida"
    ),
    available: true,
    order: 2,
  },
  {
    id: "m-7",
    categoryId: "bebidas",
    subcategory: "sb-beb-cervezas",
    name: "Cerveza Águila lata 330ml",
    description: "Cerveza rubia colombiana, lata dorada fría con gotas.",
    price: 10000,
    image: img(
      "Lata dorada de cerveza rubia colombiana 330ml, condensacion gotas frias, fondo gris carbon oscuro, fotografia comercial producto, 4:3, iluminacion estudio premium"
    ),
    available: true,
    order: 1,
  },
  {
    id: "m-8",
    categoryId: "bebidas",
    subcategory: "sb-beb-cervezas",
    name: "Cerveza Poker lata 330ml",
    description: "Cerveza rubia, lata negra y roja, fría con condensación.",
    price: 9500,
    image: img(
      "Lata negra roja de cerveza Poker colombiana 330ml, gotas frias condensacion, fondo oscuro elegante, fotografia comercial, 4:3, iluminacion estudio nitida"
    ),
    available: true,
    order: 2,
  },
  {
    id: "m-9",
    categoryId: "bebidas",
    subcategory: "sb-beb-licores",
    name: "Vino blanco Chardonnay 375ml",
    description: "Media botella, vino blanco colombiano fresco, etiqueta elegante.",
    price: 42000,
    image: img(
      "Media botella de vino blanco Chardonnay 375ml, cristal transparente, etiqueta minimalista elegante, copa al lado, fondo madera oscura, fotografia comercial producto, 4:3"
    ),
    available: true,
    order: 1,
  },
  {
    id: "m-10",
    categoryId: "bebidas",
    subcategory: "sb-beb-licores",
    name: "Whisky mini botella 50ml",
    description: "Botella pequeña de whisky escocés, etiqueta dorada.",
    price: 28000,
    image: img(
      "Mini botella de whisky escoces 50ml, cristal ambar, etiqueta dorada elegante, fondo negro premium, fotografia comercial, 4:3, iluminacion estudio"
    ),
    available: true,
    order: 2,
  },
  {
    id: "m-11",
    categoryId: "snacks",
    subcategory: "sb-snk-salados",
    name: "Papas Margarita pequeñas",
    description: "Bolsa pequeña de papas fritas saladas clásicas.",
    price: 5500,
    image: img(
      "Bolsa pequeña amarilla de papas fritas Margarita, patatas fritas esparcidas alrededor, fondo gris oscuro, fotografia comercial producto snack, 4:3, iluminacion brillante"
    ),
    available: true,
    order: 1,
  },
  {
    id: "m-12",
    categoryId: "snacks",
    subcategory: "sb-snk-salados",
    name: "Papas de pollo pequeñas",
    description: "Bolsa pequeña papas fritas sabor pollo BBQ.",
    price: 5500,
    image: img(
      "Bolsa pequeña roja de papas fritas sabor pollo BBQ, patatas crujientes al lado, fondo oscuro, fotografia comercial producto snack colombiano, 4:3, enfoque nitido"
    ),
    available: true,
    order: 2,
  },
  {
    id: "m-13",
    categoryId: "snacks",
    subcategory: "sb-snk-salados",
    name: "Cheetos bolso pequeño",
    description: "Snack de queso naranja, bolso pequeño Cheetos.",
    price: 4500,
    image: img(
      "Bolsa pequeña naranja brillante de Cheetos snacks de queso, algunos palitos de queso salidos al lado, fondo gris carbon, fotografia comercial, 4:3, iluminacion viva"
    ),
    available: true,
    order: 3,
  },
  {
    id: "m-14",
    categoryId: "snacks",
    subcategory: "sb-snk-salados",
    name: "Mani Mix familiar",
    description: "Mezcla de mani tostado, almendras, pasas y chicharrones.",
    price: 7500,
    image: img(
      "Bol trasparente con mani mix colombiano: mani tostado, almendras, pasas, chicharron de cerdo, cuchara al lado, fondo madera rustica oscura, fotografia gastronomica, 4:3"
    ),
    available: true,
    order: 4,
  },
  {
    id: "m-15",
    categoryId: "snacks",
    subcategory: "sb-snk-salados",
    name: "Platanitos maduritos",
    description: "Chifles de plátano maduro dorados crujientes.",
    price: 6000,
    image: img(
      "Bolsa verde y amarilla de chifles plantanos maduritos crujientes, platano frito esparcido por el borde, fondo gris oscuro, fotografia snack comercial colombiano, 4:3"
    ),
    available: true,
    order: 5,
  },
  {
    id: "m-16",
    categoryId: "snacks",
    subcategory: "sb-snk-dulces",
    name: "M&M bolsa roja",
    description: "Bolsa de M&Ms chocolates con cacahuate, colores clásicos.",
    price: 7000,
    image: img(
      "Bolsa roja de M&M con cacahuate, chocolates de colores amarillo rojo verde azul cafe derramados en la parte inferior, fondo negro elegante, fotografia comercial producto, 4:3, enfoque nitido"
    ),
    available: true,
    order: 1,
  },
  {
    id: "m-17",
    categoryId: "snacks",
    subcategory: "sb-snk-dulces",
    name: "Chocolatina Jet",
    description: "Barra de chocolate Jet clásica colombiana.",
    price: 4000,
    image: img(
      "Barra de chocolate Jet colombiana envoltura amarilla y azul, trozo de chocolate cortado revelando interior cremoso, fondo madera, fotografia comercial dulce colombiano, 4:3"
    ),
    available: true,
    order: 2,
  },
  {
    id: "m-18",
    categoryId: "snacks",
    subcategory: "sb-snk-dulces",
    name: "Galletas Festival rellenas",
    description: "Paquete galletas Festival rellenas de crema de chocolate.",
    price: 4500,
    image: img(
      "Paquete rojo de galletas Festival rellenas de crema de chocolate, galleta partido por la mitad mostrando relleno, fondo gris claro premium, fotografia comercial dulces, 4:3"
    ),
    available: true,
    order: 3,
  },
  {
    id: "m-19",
    categoryId: "snacks",
    subcategory: "sb-snk-dulces",
    name: "Chocolates premium",
    description: "Caja de 6 bombones artesanales de chocolate oscuro y blanco.",
    price: 22000,
    image: img(
      "Caja elegante de madera oscura con 6 bombones artesanales de chocolate, variados colores y formas, cacao en polvo esparcido, fondo negro, fotografia comercial lujo, 4:3"
    ),
    available: true,
    order: 4,
  },
  {
    id: "m-20",
    categoryId: "snacks",
    subcategory: "sb-snk-dulces",
    name: "Nucita mini display",
    description: "3 mini cremas de chocolate Nucita clásica colombiana.",
    price: 4800,
    image: img(
      "3 vasitos pequenos de Nucita chocolate blanco y negro clasico colombiano, uno abierto con cuchara, fondo amarillo suave, fotografia comercial dulces colombia, 4:3, iluminacion calida"
    ),
    available: true,
    order: 5,
  },
];
