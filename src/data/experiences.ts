import { ExperienceCategory, ExperienceService } from "@/lib/types";

export const experienceCategories: ExperienceCategory[] = [
  { id: "decoraciones", name: "Decoraciones" },
  { id: "corporativo", name: "Eventos Corporativos" },
  { id: "alimentos", name: "Alimentos y Bebidas" },
  { id: "paquetes", name: "Paquetes Especiales" },
];

export const experienceServices: ExperienceService[] = [
  {
    id: "e-1",
    name: "Decoración Romántica",
    categoryId: "decoraciones",
    shortDescription: "Pétalos, velas y detalles para una noche inolvidable en tu habitación.",
    fullDescription:
      "Transformamos tu habitación en un ambiente íntimo y romántico, ideal para sorprender a esa persona especial en una fecha importante o simplemente porque sí.",
    includes: [
      "Pétalos de rosa sobre la cama",
      "Velas decorativas (sin fuego real)",
      "Letrero personalizado",
      "Botella de vino de la casa",
    ],
    benefits: ["Instalación antes de tu llegada", "Personalización del mensaje"],
    price: 180000,
    images: [
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1000&auto=format&fit=crop",
    ],
    active: true,
    order: 0,
  },
  {
    id: "e-2",
    name: "Decoración de Cumpleaños",
    categoryId: "decoraciones",
    shortDescription: "Globos, torta y ambientación especial para celebrar un año más.",
    fullDescription:
      "Organizamos la sorpresa de cumpleaños dentro de la habitación o en un espacio privado del hotel, con ambientación festiva y atención a cada detalle.",
    includes: ["Ambientación con globos", "Torta a elección", "Letrero de feliz cumpleaños"],
    benefits: ["Coordinación con recepción para la sorpresa"],
    price: 220000,
    images: [
      "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1000&auto=format&fit=crop",
    ],
    active: true,
    order: 1,
  },
  {
    id: "e-3",
    name: "Salón de Reuniones",
    categoryId: "corporativo",
    shortDescription: "Espacio versátil para reuniones, capacitaciones y presentaciones.",
    fullDescription:
      "Nuestro salón se adapta a distintos formatos —auditorio, mesa en U, estilo escuela— para reuniones de trabajo, capacitaciones o presentaciones corporativas.",
    includes: ["Alquiler del espacio por horas o día completo", "Montaje según necesidad", "WiFi de alta velocidad"],
    benefits: ["Ubicación central en Cali", "Personal de apoyo durante el evento"],
    images: [
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1000&auto=format&fit=crop",
    ],
    active: true,
    order: 0,
  },
  {
    id: "e-4",
    name: "Coffee Break Empresarial",
    categoryId: "corporativo",
    shortDescription: "Servicio de café y pasabocas para tus reuniones de trabajo.",
    fullDescription:
      "Un coffee break completo para acompañar reuniones, capacitaciones o jornadas de trabajo, servido en el salón de eventos o en la sala que elijas.",
    includes: ["Café e infusiones", "Selección de pasabocas dulces y salados", "Montaje y desmontaje incluido"],
    benefits: ["Opciones vegetarianas disponibles"],
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?q=80&w=1000&auto=format&fit=crop",
    ],
    active: true,
    order: 1,
  },
  {
    id: "e-5",
    name: "Catering",
    categoryId: "alimentos",
    shortDescription: "Menús personalizados para eventos privados o corporativos.",
    fullDescription:
      "Nuestro equipo de cocina diseña un menú a la medida de tu evento, desde almuerzos ejecutivos hasta cenas de gala, con servicio completo en sitio.",
    includes: ["Menú personalizado", "Personal de servicio", "Menaje y montaje"],
    benefits: ["Degustación previa disponible"],
    images: [
      "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop",
    ],
    active: true,
    order: 0,
  },
  {
    id: "e-6",
    name: "Cenas Especiales",
    categoryId: "alimentos",
    shortDescription: "Una mesa exclusiva, en el lugar del hotel que prefieras.",
    fullDescription:
      "Disfruta de una cena privada preparada por nuestro chef, servida en la terraza, el jardín o tu propia habitación, con el menú que elijas.",
    includes: ["Menú de 3 tiempos", "Ambientación de la mesa", "Servicio dedicado"],
    benefits: ["Ideal para aniversarios y ocasiones especiales"],
    price: 350000,
    images: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592861956120-e524fc739696?q=80&w=1000&auto=format&fit=crop",
    ],
    active: true,
    order: 1,
  },
  {
    id: "e-7",
    name: "Escapada Romántica",
    categoryId: "paquetes",
    shortDescription: "Noche de hospedaje, decoración y cena para dos.",
    fullDescription:
      "El paquete completo para una escapada en pareja: hospedaje, ambientación romántica en la habitación y cena privada incluida.",
    includes: ["1 noche de hospedaje", "Decoración romántica", "Cena para dos"],
    benefits: ["Late check-out sujeto a disponibilidad"],
    price: 650000,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1000&auto=format&fit=crop",
    ],
    active: true,
    order: 0,
  },
  {
    id: "e-8",
    name: "Paquete Personalizado",
    categoryId: "paquetes",
    shortDescription: "Diseñamos contigo una experiencia a la medida de tu celebración.",
    fullDescription:
      "¿Tienes algo especial en mente? Armamos un paquete a tu medida combinando hospedaje, decoración, gastronomía y los detalles que quieras incluir.",
    includes: ["Cotización personalizada", "Acompañamiento de principio a fin"],
    benefits: ["Ideal para bodas, aniversarios y ocasiones únicas"],
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1000&auto=format&fit=crop",
    ],
    active: true,
    order: 1,
  },
];
