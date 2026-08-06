// Contenido de "Guía del Hotel". Por ahora vive aquí como texto fijo,
// igual que el resto de la guía — si más adelante quieres editarlo desde
// /admin sin pedírmelo, este es el archivo que migraríamos a Firestore
// siguiendo el mismo patrón que ya usan Restaurante, Minibar, etc.

export const hotelIntro = {
  title: "Sobre ÁMBAR Hotel Boutique",
  paragraphs: [
    "Somos un hotel diseñado para brindar una experiencia que combina comodidad, atención personalizada y un ambiente moderno, ideal para viajes de negocios, descanso o celebraciones especiales.",
    "Contamos con 26 habitaciones completamente equipadas, pensadas para ofrecer el equilibrio perfecto entre confort y funcionalidad. Además, disponemos de 2 salones para reuniones y eventos, restaurante, servicio de minibar y una amplia oferta de servicios que buscan hacer tu estadía más cómoda y agradable.",
  ],
};

export type HotelSpace = {
  icon: string;
  title: string;
  text: string;
  disabled?: boolean;
};

export const hotelSpaces: HotelSpace[] = [
  {
    icon: "Car",
    title: "Parqueadero privado para huéspedes",
    text: "Sujeto a disponibilidad.",
  },
  {
    icon: "UtensilsCrossed",
    title: "Restaurante & Bar",
    text: "Donde podrás disfrutar de desayunos, almuerzos, cenas, bebidas y cócteles en un ambiente agradable.",
  },
  {
    icon: "Users",
    title: "Salones para reuniones y eventos",
    text: "Ideales para encuentros corporativos, capacitaciones, celebraciones y eventos sociales (previa reserva).",
  },
  {
    icon: "Laptop",
    title: "Espacio coworking",
    text: "En el primer piso, equipado para trabajar, estudiar o realizar reuniones en un ambiente cómodo y con conexión Wi-Fi.",
  },
  {
    icon: "Armchair",
    title: "Lobby y áreas de descanso",
    text: "Espacios ideales para relajarte o esperar cómodamente.",
  },
  {
    icon: "Droplets",
    title: "Zona húmeda",
    text: "Temporalmente fuera de servicio por mantenimiento.",
    disabled: true,
  },
];

export const hotelSchedules = [
  { label: "Recepción", value: "Disponible las 24 horas" },
  { label: "Check-in", value: "A partir de las 3:00 p.m." },
  { label: "Check-out", value: "Hasta la 1:00 p.m." },
  { label: "Desayuno", value: "6:30 a.m. – 10:00 a.m." },
  { label: "Restaurante & Bar", value: "6:30 a.m. – 3:00 p.m." },
  { label: "Room Service", value: "Disponible las 24 horas" },
];

export type HotelInfoPoint = {
  icon: string;
  title: string;
  text: string;
};

export const hotelInfoPoints: HotelInfoPoint[] = [
  {
    icon: "CigaretteOff",
    title: "Habitaciones libres de humo",
    text: "No está permitido fumar dentro de las habitaciones ni en las áreas interiores del hotel.",
  },
  {
    icon: "UserCheck",
    title: "Ingreso de visitantes",
    text: "Todo visitante debe registrarse y ser autorizado por recepción antes de ingresar a las habitaciones.",
  },
  {
    icon: "Moon",
    title: "Horario de descanso",
    text: "De 10:00 p.m. a 7:00 a.m. Agradecemos mantener un ambiente tranquilo para garantizar el descanso de todos los huéspedes.",
  },
  {
    icon: "CreditCard",
    title: "Consumos adicionales",
    text: "Los consumos realizados en restaurante, minibar, boutique u otros servicios podrán cargarse a la habitación y serán liquidados durante el check-out.",
  },
  {
    icon: "Building2",
    title: "Cuidado de las instalaciones",
    text: "Ayúdanos a conservar en buen estado las habitaciones, el mobiliario y las zonas comunes.",
  },
  {
    icon: "Search",
    title: "Objetos perdidos",
    text: "Si encuentras o extravías algún objeto, informa inmediatamente a recepción.",
  },
  {
    icon: "BellRing",
    title: "Asistencia 24 horas",
    text: "Nuestro equipo de recepción está disponible las 24 horas para atender cualquier solicitud o inquietud.",
  },
  {
    icon: "AlertTriangle",
    title: "Emergencias",
    text: "En caso de una emergencia, comunícate inmediatamente con recepción o sigue las rutas de evacuación señalizadas en el hotel.",
  },
];

export const hotelLocation = {
  title: "Nuestra ubicación",
  text: "Ubicados en el exclusivo barrio El Ingenio, al sur de Cali, ofrecemos una ubicación estratégica con fácil acceso a zonas empresariales, centros comerciales, clínicas y principales vías de la ciudad.",
  address: "Calle 25 #85-20, Barrio El Ingenio, Cali",
};

export const hotelCommitment =
  "En ÁMBAR Hotel Boutique trabajamos para que cada huésped disfrute de una experiencia cálida, tranquila y memorable, respaldada por un servicio cercano y el compromiso de superar sus expectativas.";
