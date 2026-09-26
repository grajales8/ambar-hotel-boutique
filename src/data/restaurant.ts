import { MenuCategory, MenuItem } from "@/lib/types";

export const restaurantCategories: MenuCategory[] = [
  {
    id: "comida",
    name: "Comida",
    order: 1,
    subcategories: [
      { id: "sb-com-entradas-frias", label: "Entradas frías", order: 1 },
      { id: "sb-com-entradas-calientes", label: "Entradas calientes", order: 2 },
      { id: "sb-com-fuertes", label: "Platos fuertes", order: 3 },
    ],
  },
  {
    id: "postres",
    name: "Postres",
    order: 2,
    subcategories: [
      { id: "sb-post-calientes", label: "Postres calientes", order: 1 },
      { id: "sb-post-frios", label: "Postres fríos", order: 2 },
    ],
  },
  {
    id: "bebidas",
    name: "Bebidas",
    order: 3,
    subcategories: [
      { id: "sb-beb-jugos", label: "Jugos y naturales", order: 1 },
      { id: "sb-beb-gaseosas", label: "Gaseosas y aguas", order: 2 },
      { id: "sb-beb-calientes", label: "Bebidas calientes", order: 3 },
    ],
  },
  {
    id: "licores",
    name: "Licores",
    order: 4,
    subcategories: [
      { id: "sb-lic-tintos", label: "Vinos tintos", order: 1 },
      { id: "sb-lic-blancos", label: "Vinos blancos y rosés", order: 2 },
    ],
  },
  {
    id: "cocteles",
    name: "Cócteles",
    order: 5,
    subcategories: [
      { id: "sb-coc-clasicos", label: "Clásicos", order: 1 },
      { id: "sb-coc-firma", label: "De la casa", order: 2 },
    ],
  },
];

const img = (prompt: string) =>
  `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=landscape_4_3`;

function gallery3(p1: string, p2: string, p3: string): string[] {
  return [img(p1), img(p2), img(p3)];
}

export const restaurantItems: MenuItem[] = [
  // ===== COMIDA · Entradas frías =====
  {
    id: "r-1",
    categoryId: "comida",
    subcategory: "sb-com-entradas-frias",
    name: "Carpaccio de res trufado",
    description: "Finas láminas de res, parmesano curado, rúgula fresca y aceite de trufa negra.",
    price: 38000,
    image: img(
      "Carpaccio de res laminas muy finas sobre plato blanco porcelana, rucula parmesano laminado aceite oliva y trufa negra rallada, fondo mesa madera oscura, fotografia gastronomica premium 4:3, iluminacion natural suave"
    ),
    images: gallery3(
      "Carpaccio res laminas finas porcelana blanca, rucula fresca lascas parmesano aceite de trufa negra, fotografia gastronomica primer plano 4:3",
      "Carpaccio de res vista desde arriba plato redondo blanco, reduccion de balsamico y aceite trufa, cubiertos al lado mesa mantel negro 4:3",
      "Detalle closeup laminas de res con trufa rallada y parmesano 24 meses carpaccio gourmet restaurante hotel 4:3"
    ),
    available: true,
    order: 1,
  },
  {
    id: "r-2",
    categoryId: "comida",
    subcategory: "sb-com-entradas-frias",
    name: "Tartar de atún y maracuyá",
    description: "Atún aleta amarilla, aguacate, sésamo tostado y salsa de maracuyá.",
    price: 42000,
    image: img(
      "Tartar de atun aleta amarilla cubos perfectos sobre plato hondo oscuro, crema de aguacate, sesamo tostado salsa maracuya, cuchara cerámica, fotografia gastronomica premium 4:3"
    ),
    images: gallery3(
      "Tartar atun aleta amarilla en molde circular, aguacate laminado salsa maracuya perejil fresco, plato negro mate 4:3",
      "Tartar atun vista superior plato redondo, granos sesamo tostado gajos de maracuya frescos alrededor 4:3",
      "Closeup primer plano cubos de atun fresco brillo salsa maracuya aguacate 4:3"
    ),
    available: true,
    order: 2,
  },
  // ===== COMIDA · Entradas calientes =====
  {
    id: "r-2b",
    categoryId: "comida",
    subcategory: "sb-com-entradas-calientes",
    name: "Empanadas de queso ahumado",
    description: "Empanadas artesanales de queso ahumado y guiso criollo, ají casero.",
    price: 18000,
    image: img(
      "Tres empanadas colombianas artesanales doradas crujientes sobre tabla madera rustica, salsa ají criolla en molcajete, limon, fotografia comida colombiana 4:3"
    ),
    images: gallery3(
      "Empanadas de queso ahumado corte transversal revelando relleno hilado queso, salsa ají verde 4:3",
      "Empanadas doradas crujientes en canasta de mimbre servilleta blanca, ají casero al lado 4:3",
      "Primer plano empanada dorada con mordisco mostrando queso derretido ahumado 4:3"
    ),
    available: true,
    order: 3,
  },
  // ===== COMIDA · Platos fuertes =====
  {
    id: "r-3",
    categoryId: "comida",
    subcategory: "sb-com-fuertes",
    name: "Lomo de res al carbón",
    description: "Costra de hierbas, puré de papa criolla trufado y reducción de vino tinto.",
    price: 78000,
    image: img(
      "Lomo de res a la parrilla marca carbon perfecta, pure de papa criolla trufado en cuenco, reduccion vino tinto, tomates confitados, plato porcelana blanca 4:3 fotografia gastronomica"
    ),
    images: gallery3(
      "Lomo res corte 200gr jugoso rosado en el centro, puré papa criolla trufado espárragos grillados 4:3",
      "Vista superior plato porcelana blanca lomo res al carbon, salsa reduccion vino tinto, hierbas frescas 4:3",
      "Closeup corte del lomo res mostrando textura jugosa medium rare, costra hierbas 4:3"
    ),
    available: true,
    order: 4,
  },
  {
    id: "r-3b",
    categoryId: "comida",
    subcategory: "sb-com-fuertes",
    name: "Ajiaco santafereño premium",
    description: "Sopa cremosa de 3 papas, pollo campesino desmechado, guasca y alcaparras.",
    price: 46000,
    image: img(
      "Ajiaco santafereño colombiano tazón cerámica blanca grande, pollo desmechado, crema de leche alcaparras guasca, plato hondo, fotografia gastronomica 4:3"
    ),
    images: gallery3(
      "Ajiaco santafereño tazon grande con cuchara, aguacate laminado al lado, aceitunas alcaparras 4:3",
      "Vista superior ajiaco cremosos color amarillo claro, papas criollas mazorca, hierbas guasca 4:3",
      "Primer plano textura cremosa ajiaco con trozos pollo desmechado y alcaparras 4:3"
    ),
    available: true,
    order: 5,
  },
  {
    id: "r-3c",
    categoryId: "comida",
    subcategory: "sb-com-fuertes",
    name: "Bandeja paisa boutique",
    description: "Frijol, chicharrón de cerdo ibérico, morcilla, arepa, huevo y aguacate.",
    price: 58000,
    image: img(
      "Bandeja paisa premium colombiana plato redondo de barro, frijoles rojos, chicharron cerdo iberico crocante, huevo frito arriba, aguacate arepa, fotografia gastronomica 4:3"
    ),
    images: gallery3(
      "Bandeja paisa gourmet vista plato barro artesanal, chorizo morcilla, aguacate arepa maiz, limon 4:3",
      "Primer plano chicharron cerdo iberico crujiente junto a huevo frito borde crujiente y frijoles 4:3",
      "Detalle bandeja paisa con chorizo morcilla tajadas platano maduro aguacate 4:3"
    ),
    available: true,
    order: 6,
  },
  {
    id: "r-4",
    categoryId: "comida",
    subcategory: "sb-com-fuertes",
    name: "Risotto de hongos silvestres",
    description: "Arroz carnaroli, porcini, morels, parmesano 24 meses y aceite de trufa.",
    price: 56000,
    image: img(
      "Risotto de hongos silvestres arroz carnaroli cremoso, porcini morels, queso parmesano espolvoreado perejil, plato hondo porcelana blanco oscuro 4:3"
    ),
    images: gallery3(
      "Risotto hongos porcini closeup cremoso brillo mantequilla parmesano 24 meses 4:3",
      "Vista superior risotto de hongos silvestres plato hondo, aceite trufa chorrito perejil picado 4:3",
      "Primer plano textura arroz carnaroli al dente con láminas de parmesano e hongos morels 4:3"
    ),
    available: true,
    order: 7,
  },
  {
    id: "r-5",
    categoryId: "comida",
    subcategory: "sb-com-fuertes",
    name: "Corvina en costra de coco",
    description: "Salsa de leche de coco y curry suave, arroz jazmín y vegetales salteados.",
    price: 68000,
    image: img(
      "Corvina pescado blanco costra de coco dorada, arroz jazmin blanco, salsa curry coco vegetales salteados wok, plato rectangular cerámica 4:3 fotografia gastronomica"
    ),
    images: gallery3(
      "Corvina en costra coco filete entero junto al arroz jazmín y brócoli col morada salteados 4:3",
      "Vista superior pescado corvina salsa curry leche coco cuenco pequeño, arroz jazmín, cilantro 4:3",
      "Primer plano corte corvina revelando textura humeda blanca, costra coco crujiente 4:3"
    ),
    available: true,
    order: 8,
  },

  // ===== POSTRES · Calientes =====
  {
    id: "r-6",
    categoryId: "postres",
    subcategory: "sb-post-calientes",
    name: "Fondant de chocolate 70%",
    description: "Corazón líquido, helado de vainilla Madagascar y cacao en polvo.",
    price: 28000,
    image: img(
      "Fondant de chocolate 70 por ciento corte transversal corazon liquido derramado chocolate caliente, bola helado vainilla Madagascar, salsa inglesa, cacao en polvo, fuente rectangular blanca 4:3"
    ),
    images: gallery3(
      "Fondant chocolate caliente entero junto a bola de helado vainilla, galleta laminada postre gourmet 4:3",
      "Fondant corte revelando corazon chocolate liquido fluyendo, cuchara de postre 4:3",
      "Primer plano closeup chocolate derretido fluyendo del fondant 70% cacao 4:3"
    ),
    available: true,
    order: 1,
  },
  // ===== POSTRES · Fríos =====
  {
    id: "r-6b",
    categoryId: "postres",
    subcategory: "sb-post-frios",
    name: "Cheesecake de maracuyá",
    description: "Base de galleta María, crema de queso, coulis de maracuyá fresco.",
    price: 26000,
    image: img(
      "Cheesecake de maracuya porcion triangular, base galleta, coulis maracuya, semillas fruta de la pasion, plato porcelana negra 4:3 fotografia gourmet"
    ),
    images: gallery3(
      "Cheesecake maracuya porción sobre plato redondo negro, gajos maracuya fresco menta 4:3",
      "Vista superior cheesecake redondo completo con glaseado maracuya y frutas alrededor 4:3",
      "Closeup textura cremosa cheesecake junto a coulis de maracuyá semillas 4:3"
    ),
    available: true,
    order: 2,
  },
  {
    id: "r-6c",
    categoryId: "postres",
    subcategory: "sb-post-frios",
    name: "Torta tres leches",
    description: "Esponja empapada en 3 leches, crema chantilly y canela.",
    price: 24000,
    image: img(
      "Torta tres leches colombiana porcion esponja humeda, crema chantilly canela, canela en polvo espolvoreada, plato blanco 4:3 fotografia pasteleria"
    ),
    images: gallery3(
      "Tres leches porcion vertical con gotas de leche escurriendo, canela en rama al lado 4:3",
      "Vista superior porcion tres leches plato redondo, frutillas rojas cerezas 4:3",
      "Closeup textura porosa esponja tres leches empapada, crema chantilly suave 4:3"
    ),
    available: true,
    order: 3,
  },

  // ===== BEBIDAS =====
  {
    id: "r-7",
    categoryId: "bebidas",
    subcategory: "sb-beb-jugos",
    name: "Limonada de coco con hierbabuena",
    description: "Receta de la casa: leche de coco, limón, hierbabuena y hielo.",
    price: 16000,
    image: img(
      "Limonada de coco con hierbabuena vaso alto transparente, pajilla metalica, rodaja limon hojas menta, hielo hondo, fondo mesón madera oscura 4:3 fotografia bebidas"
    ),
    images: gallery3(
      "Limonada coco con espuma blanca, hojas hierbabuena rodaja limon vaso alto 4:3",
      "Vaso limonada de coco desde arriba pajilla, hielo, menta fresca esparcida 4:3",
      "Closeup vaso vidrio con burbujas limonada hierbabuena y limon 4:3"
    ),
    available: true,
    order: 1,
  },
  {
    id: "r-7b",
    categoryId: "bebidas",
    subcategory: "sb-beb-jugos",
    name: "Jugo de lulo con naranja",
    description: "Jugo natural colombiano de lulo, toque de naranja y pulpa.",
    price: 14000,
    image: img(
      "Jugo de lulo naranja colombiano vaso alto color naranja vibrante, rodaja naranja, fruta lulo partida al lado, fondo gris 4:3 fotografia bebida natural"
    ),
    images: gallery3(
      "Jugo lulo con pulpa visible, rodaja naranja pajilla biodegradable 4:3",
      "Vista superior vaso jugo naranja lulo fruta al rededor, hoja verde 4:3",
      "Primer plano vaso vidrio jugo lulo naranja con hielo 4:3"
    ),
    available: true,
    order: 2,
  },
  {
    id: "r-7c",
    categoryId: "bebidas",
    subcategory: "sb-beb-gaseosas",
    name: "Gaseosas y aguas",
    description: "Coca-Cola, Sprite, agua con gas o sin gas 330ml.",
    price: 8000,
    image: img(
      "Lata roja gaseosa, lata verde limon, botella agua sin gas transparentes, todas juntas sobre mesa oscura 4:3"
    ),
    images: gallery3(
      "Tres latas distintas gaseosas refrescantes, hielo alrededor, gotas condensadas frias 4:3",
      "Botella agua transparente y lata roja juntos, fondo mantel blanco 4:3",
      "Closeup lata roja gaseosa gotas frias condensacion 4:3"
    ),
    available: true,
    order: 3,
  },
  {
    id: "r-7d",
    categoryId: "bebidas",
    subcategory: "sb-beb-calientes",
    name: "Café colombiano con pan de queso",
    description: "Café de origen 100% colombiano, pan de queso recién horneado.",
    price: 12000,
    image: img(
      "Taza negra cafe colombiano humo vapor, pan de queso recien horneado, canasta mimbre, grano cafe tostado 4:3"
    ),
    images: gallery3(
      "Taza cafe negro filtro, pan de queso queso derretido, cuchara te 4:3",
      "Vista superior plato ovalado cafe y pan de queso, servilleta lino 4:3",
      "Closeup grano cafe tostado junto a pan de queso esponjoso 4:3"
    ),
    available: true,
    order: 4,
  },

  // ===== LICORES =====
  {
    id: "r-8",
    categoryId: "licores",
    subcategory: "sb-lic-tintos",
    name: "Vino tinto reserva reserva",
    description: "Copa 150ml de vino tinto reserva, uva Cabernet Sauvignon.",
    price: 36000,
    image: img(
      "Copa de cristal de vino tinto reserva color rubi profundo, uvas rojas hojas vid al lado, fondo oscuro elegante 4:3 fotografia lujo"
    ),
    images: gallery3(
      "Copa vino tinto vista de lado, uvas oscuras encimada de botella parcial 4:3",
      "Copa vino tinto desde arriba, color rojo profundo brillante, copa cristal 4:3",
      "Primer plano copa cristal de vino tinto reserva con etiqueta botella 4:3"
    ),
    available: true,
    order: 1,
  },
  {
    id: "r-8b",
    categoryId: "licores",
    subcategory: "sb-lic-blancos",
    name: "Vino blanco Chardonnay frío",
    description: "Copa 150ml vino blanco Chardonnay frío, frutas blancas y mantequilla.",
    price: 32000,
    image: img(
      "Copa de cristal vino blanco Chardonnay color amarillo pajizo claro, uvas verdes, hielo, fondo elegante 4:3"
    ),
    images: gallery3(
      "Copa vino blanco desde angulo 45, rodaja limon menta 4:3",
      "Vista superior copa vino blanco brillante, uvas al rededor 4:3",
      "Closeup copa cristal vino blanco con fondo mantel lino blanco 4:3"
    ),
    available: true,
    order: 2,
  },

  // ===== CÓCTELES =====
  {
    id: "r-9",
    categoryId: "cocteles",
    subcategory: "sb-coc-clasicos",
    name: "Mojito clasico",
    description: "Ron blanco, menta, lima, azúcar morena y soda.",
    price: 28000,
    image: img(
      "Coctel mojito clasico vaso alto transparente, hojas menta fresca rodaja lima, pajilla, cubos hielo largo, fondo bar oscuro 4:3 fotografia bar"
    ),
    images: gallery3(
      "Mojito tradicional vaso alto con mucho hielo, hierbabuena, lima, pajilla blanca 4:3",
      "Vista superior mojito plato bar, menta esparcida limones alrededor 4:3",
      "Primer plano hojas menta mojito con burbujas soda 4:3"
    ),
    available: true,
    order: 1,
  },
  {
    id: "r-10",
    categoryId: "cocteles",
    subcategory: "sb-coc-clasicos",
    name: "Aperol Spritz",
    description: "Aperol, prosecco, soda con rodaja de naranja y hierbabuena.",
    price: 28000,
    image: img(
      "Aperol spritz coctel copa balon color naranja vibrante, rodaja naranja, hielo grande, fondo bar elegante 4:3 fotografia coctel"
    ),
    images: gallery3(
      "Aperol spritz copa balon, naranja fresca rodajas, hielo, pajilla 4:3",
      "Vista lateral aperol spritz color naranja junto a botella aperol parcial 4:3",
      "Closeup copa aperol spritz con rodaja naranja y hoja menta 4:3"
    ),
    available: true,
    order: 2,
  },
  {
    id: "r-11",
    categoryId: "cocteles",
    subcategory: "sb-coc-clasicos",
    name: "Margarita frozen",
    description: "Tequila, triple sec, lima, frozen con sal en el borde.",
    price: 30000,
    image: img(
      "Coctel Margarita frozen copa margarita, color amarillo pálido, borde sal gorda, rodaja lima, fondo bar 4:3"
    ),
    images: gallery3(
      "Margarita frozen copa cristal, lima sal gorda, pajilla 4:3",
      "Vista de 45 grados margarita frozen junto a lima cortada mitades 4:3",
      "Closeup sal en borde copa margarita frozen amarilla 4:3"
    ),
    available: true,
    order: 3,
  },
  {
    id: "r-12",
    categoryId: "cocteles",
    subcategory: "sb-coc-firma",
    name: "Cóctel Ámbar de la casa",
    description: "Ron añejo, miel de abejas, limón y espuma de maracuyá (firma del hotel).",
    price: 34000,
    image: img(
      "Coctel de autor color dorado ambar en copa coupe cristal, espuma maracuya, petalos comestibles, borde dorado elegante 4:3 fotografia lujo"
    ),
    images: gallery3(
      "Coctel ambar firma hotel copa coupe dorado, canela en rama, flor comestible 4:3",
      "Vista desde arriba coctel ambar dorado con espuma maracuyá brillante 4:3",
      "Closeup espuma maracuyá coctel de autor con brillo dorado 4:3"
    ),
    available: true,
    order: 4,
  },
];
