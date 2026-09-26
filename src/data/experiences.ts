import { ExperienceCategory, ExperienceService } from "@/lib/types";

export const experienceCategories: ExperienceCategory[] = [
  { id: "decoraciones", name: "Decoraciones" },
  { id: "corporativo", name: "Eventos Corporativos" },
  { id: "alimentos", name: "Alimentos y Bebidas" },
  { id: "paquetes", name: "Paquetes Especiales" },
];

const img = (prompt: string) =>
  `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=landscape_4_3`;

function gallery3(p1: string, p2: string, p3: string): string[] {
  return [img(p1), img(p2), img(p3)];
}

export const experienceServices: ExperienceService[] = [
  // ===== Decoraciones =====
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
    images: gallery3(
      "Decoracion romantica habitacion hotel, petalos rosa sobre cama blanca, velas led, luces cálidas, 4:3 fotografia premium",
      "Cama king con pétalos rojos, botella vino espumoso, copas cristal, habitacion elegante hotel 4:3",
      "Detalle primer plano velas blancas y pétalos de rosa en habitación de hotel romántica 4:3"
    ),
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
    images: gallery3(
      "Decoracion cumpleaños habitación hotel, globos metalizados color oro rosa, torta con velas, letrero feliz cumple 4:3",
      "Cumpleaños sorpresa en habitación: cama con globos helio, regalos envueltos, serpentina 4:3",
      "Primer plano torta de cumpleaños gourmet con velas y globos de fondo en habitación hotel 4:3"
    ),
    active: true,
    order: 1,
  },

  // ===== Eventos Corporativos =====
  {
    id: "e-3",
    name: "Salón de Reuniones",
    categoryId: "corporativo",
    shortDescription: "Espacio versátil para reuniones, capacitaciones y presentaciones.",
    fullDescription:
      "Nuestro salón se adapta a distintos formatos —auditorio, mesa en U, estilo escuela— para reuniones de trabajo, capacitaciones o presentaciones corporativas.",
    includes: ["Alquiler del espacio por horas o día completo", "Montaje según necesidad", "WiFi de alta velocidad"],
    benefits: ["Ubicación central en Cali", "Personal de apoyo durante el evento"],
    images: gallery3(
      "Salon reuniones corporativo moderno hotel, sillas cuero mesa larga madera, proyector pantalla, luces blancas cálidas 4:3",
      "Vista desde arriba salón de eventos empresarial montado auditorio, butacas, pantalla LED 4:3",
      "Detalle sala reuniones mesa en U, libretas, bolígrafos, botella agua por puesto, botones flor 4:3"
    ),
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
    price: 35000,
    images: gallery3(
      "Coffee break empresarial buffet hotel, cafetera industrial, jugos naturales, mini sandwiches, croissants 4:3",
      "Mesa coffee break corporativa pasteleria mini, frutas picadas, infusiones, etiquetas elegantes 4:3",
      "Primer plano bandeja pasabocas salados mini quiches, empanadas, cafe humeante al lado 4:3"
    ),
    active: true,
    order: 1,
  },
  {
    id: "e-4b",
    name: "Almuerzos Ejecutivos",
    categoryId: "corporativo",
    shortDescription: "Menús ejecutivos para grupos, servicio en salón o en sitio privado.",
    fullDescription:
      "Almuerzos ejecutivos de tres tiempos para tu equipo o clientes, servidos en espacio privado o dentro del salón de eventos, con menú que combina cocina internacional y colombiana.",
    includes: ["Entrada, plato fuerte y postre", "Bebida y café de cortesía", "Servicio dedicado"],
    benefits: ["Menú vegetariano / celíaco disponible"],
    price: 65000,
    images: gallery3(
      "Almuerzo ejecutivo gourmet plato 3 tiempos, sopa crema, lomo res con pure, postre cheesecake en mesa empresarial 4:3",
      "Buffet almuerzo corporativo hotel, bandejas platos calientes, ensaladas, postres, iluminacion elegante 4:3",
      "Primer plano plato ejecutivo pescado corvina vegetales salteados acompañamientos, servilleta lino 4:3"
    ),
    active: true,
    order: 2,
  },

  // ===== Alimentos y Bebidas - EXPERIENCIAS (NO Restaurante) =====
  {
    id: "e-5",
    name: "Catering de Autor",
    categoryId: "alimentos",
    shortDescription: "Menús personalizados por el chef para eventos privados o corporativos.",
    fullDescription:
      "Nuestro equipo de cocina diseña un menú a la medida de tu evento, desde almuerzos ejecutivos hasta cenas de gala, con servicio completo en sitio.",
    includes: ["Menú personalizado degustación previa", "Jefe de cocina de apoyo", "Personal de servicio profesional"],
    benefits: ["Cartas de maridaje con vinos disponibles"],
    price: 95000,
    images: gallery3(
      "Catering de autor cena de gala, platos gourmet porcionados vajilla blanca, velas, mantel lino negro 4:3",
      "Mesa principal boda o cena empresarial 10 comensales, flores blancas velas, copas cristal, vajilla premium 4:3",
      "Primer plano plato gourmet catering de autor, res trufada con reduccion, microgreens, emplatado artistico 4:3"
    ),
    active: true,
    order: 0,
  },
  {
    id: "e-6",
    name: "Cenas Especiales Privadas",
    categoryId: "alimentos",
    shortDescription: "Una mesa exclusiva en el lugar del hotel que prefieras.",
    fullDescription:
      "Disfruta de una cena privada preparada por nuestro chef, servida en la terraza, el jardín o tu propia habitación, con el menú que elijas.",
    includes: ["Menú de 3 tiempos chef ejecutivo", "Ambientación de la mesa rosas velas", "Servicio dedicado sommelier"],
    benefits: ["Ideal para aniversarios y ocasiones especiales"],
    price: 350000,
    images: gallery3(
      "Cena privada romantica terraza hotel atardecer, mesa para dos, copas vino, velas, rosas rojas, vista ciudad 4:3",
      "Mesa privada jardin hotel de noche con luces hadas, mantel lino blanco, vajilla premium, arreglo floral 4:3",
      "Cena en habitacion suite: cama cercana, mesa redonda 2 personas, velas, platos gourmet servidos 4:3"
    ),
    active: true,
    order: 1,
  },
  {
    id: "e-6b",
    name: "Barra Libre Premium",
    categoryId: "alimentos",
    shortDescription: "Coctelería clásica y de autor por 4 horas ilimitadas.",
    fullDescription:
      "Barra libre premium durante 4 horas para tu evento. Incluye vinos, licores internacionales, cocteles clásicos y una selección de cocteles firma del barman del Ámbar.",
    includes: ["Barra móvil premium", "Cocteleros certificados", "Vodka, whisky, ron, ginebra, vinos"],
    benefits: ["Coctel firma personalizado con tu logo/evento"],
    price: 120000,
    images: gallery3(
      "Barra libre premium hotel evento, barra madera luces led azul, coctelero sirviendo trago copa coupe dorada 4:3",
      "Fila cocteles coloridos margarita mojito aperol spritz sobre barra madera, limones menta 4:3",
      "Primer plano coctel firma de autor color dorado ambar copa coupe, rodaja naranja, aceitunas 4:3"
    ),
    active: true,
    order: 2,
  },
  {
    id: "e-6c",
    name: "Degustación de Vinos",
    categoryId: "alimentos",
    shortDescription: "Cata guiada por sommeliers con 5 etiquetas premium + maridajes.",
    fullDescription:
      "Una experiencia de 2 horas guiada por nuestro sommelier. Catas de vinos tintos, blancos y rosés de viñedos colombianos y sudamericanos, acompañados de maridajes gourmet diseñados por el chef.",
    includes: ["5 copas cata 75ml cada una", "Tarjetas informativas por etiqueta", "Maridaje quesos y embutidos"],
    benefits: ["Ideal para grupos pequeños de 8 a 20 personas"],
    price: 180000,
    images: gallery3(
      "Degustacion vinos sommelier, 5 copas diferentes, tabla quesos embutidos, botellas alineadas detrás, mesa madera 4:3",
      "Cata vinos tintos copas burdeos color rubi, uvas rojas, corchos, notas de cata cuaderno 4:3",
      "Primer plano copa vino tinto, sommelier vertiendo, delante tabla maridaje queso brie jamon 4:3"
    ),
    active: true,
    order: 3,
  },
  {
    id: "e-6d",
    name: "Piqueo y Cervezas Artesanales",
    categoryId: "alimentos",
    shortDescription: "Pasabocas premium + barra de 8 cervezas artesanales colombianas.",
    fullDescription:
      "Una experiencia piqueo y cerveceril para grupos. Selección de 8 cervezas artesanales de diferentes regiones de Colombia, acompañadas de una tabla de pasabocas premium diseñada para maridar.",
    includes: ["8 degustaciones de cerveza 150ml", "Tabla de quesos, embutidos y tapas", "Presentación de cada cerveza"],
    benefits: ["Perfecta para integraciones de equipos"],
    price: 95000,
    images: gallery3(
      "Tabla piqueo premium: quesos jamon chorizo aceitunas pan crujiente, al lado 4 copas cerveza artesanal colores distintos 4:3",
      "Vuelo 6 copas cerveza artesanal IPA stout rubia roja, posavasos madera, grits maiz, barra counter 4:3",
      "Primer plano copa cerveza artesanal color ambar con espuma, al lado empanadas mini tapas colombianas 4:3"
    ),
    active: true,
    order: 4,
  },
  {
    id: "e-6e",
    name: "Brunch Gourmet",
    categoryId: "alimentos",
    shortDescription: "Desayuno-almuerzo premium con estación de huevos, waffles y mimosa.",
    fullDescription:
      "Un brunch completo sabatino o dominical para 2 personas o grupos. Estación de huevos a la carta, waffles belgas con frutas, panadería francesa, salmón ahumado y barra de mimosas ilimitadas por 2 horas.",
    includes: ["Estación de huevos y tortillas", "Waffles, panadería y frutas", "2 horas de mimosas ilimitadas"],
    benefits: ["Ideal para día de la madre, días festivos o domingos relajados"],
    price: 85000,
    images: gallery3(
      "Brunch gourmet hotel buffet, barra waffles, frutas, panaderia francesa, copa mimosa naranja brillante 4:3",
      "Mesa para 2 brunch: huevos benedictinos, tostadas aguacate, jugos naturales, mimosa, cuchillo tenedor lino 4:3",
      "Primer plano huevos benedictinos con salsa holandesa, al lado mimosa copa champagne, cafe tinto 4:3"
    ),
    active: true,
    order: 5,
  },

  // ===== Paquetes Especiales =====
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
    images: gallery3(
      "Escapada romantica suite hotel jacuzzi, velas pétalos rosa, cama king, copas champagne, atardecer 4:3",
      "Suite hotel vista ciudad, jacuzzi con burbujas, copas, caja regalos chocolate, iluminación cálida 4:3",
      "Detalle primer plano jacuzzi con velas y pétalos rosa, habitación suite boutique 4:3"
    ),
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
    images: gallery3(
      "Paquete experiencia hotel personalizado, decoracion, cena, hospedaje, collage elegante 4:3",
      "Celebracion fiesta privada en salon boutique, globos, flores rosadas blancas, mesa principal pastel 4:3",
      "Primer plano ramo rosas blancas pastel bodas o evento, tarjeta personalizada 4:3"
    ),
    active: true,
    order: 1,
  },
];

