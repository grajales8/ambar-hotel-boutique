import { GuideSection, ScheduleEntry } from "@/lib/types";

export const guideSections: GuideSection[] = [
  {
    id: "bienvenida",
    title: "Bienvenida",
    icon: "Sparkles",
    image: "/rooms/habitacion-bienvenida.jpg",
    content: [
      "Nos alegra tenerte en AMBAR Hotel Boutique. Esta guía reúne todo lo que necesitas para sentirte como en casa durante tu estadía.",
      "Si en algún momento necesitas algo que no encuentres aquí, escríbenos por el chat de recepción; estamos disponibles las 24 horas.",
    ],
    scope: "habitacion",
  },
  {
    id: "aire",
    title: "Cómo usar el aire acondicionado",
    icon: "Wind",
    content: [
      "El control se encuentra en la mesa de noche. Pulsa el botón central para encender.",
      "Usa las flechas para ajustar la temperatura entre 18°C y 26°C.",
      "El modo 'sleep' reduce el ruido y ajusta la temperatura automáticamente durante la noche.",
    ],
    scope: "habitacion",
  },
  {
    id: "tv",
    title: "Cómo usar la televisión",
    icon: "Tv",
    content: [
      "Enciende el televisor con el botón rojo del control principal.",
      "Presiona 'Source' o 'Input' para cambiar entre TV por cable y aplicaciones de streaming.",
      "El hotel cuenta con acceso a las principales plataformas; usa tu propia cuenta o disfruta del contenido precargado.",
    ],
    scope: "habitacion",
  },
  {
    id: "wifi-guia",
    title: "Cómo conectarte al WiFi",
    icon: "Wifi",
    content: [
      "Busca la red que aparece en la sección WiFi de esta app.",
      "Ingresa la contraseña indicada; podrás copiarla con un solo toque.",
      "Si tienes problemas de conexión, contáctanos por el chat y con gusto te ayudamos.",
    ],
    scope: "habitacion",
  },
  {
    id: "checkout",
    title: "Check-out y Late Check-out",
    icon: "DoorOpen",
    content: [
      "El check-out estándar es hasta la 1:00 p.m.",
      "Si deseas un late check-out, solicítalo con anticipación por el chat de recepción; está sujeto a disponibilidad.",
    ],
    scope: "habitacion",
  },
  {
    id: "historia",
    title: "Historia del hotel",
    icon: "Landmark",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    content: [
      "AMBAR nació de la idea de crear un espacio íntimo y cálido en Cali, donde cada detalle está pensado para el descanso y el buen servicio.",
      "Nuestro nombre honra la calidez y la luz dorada que caracteriza a la ciudad, presente en cada rincón del hotel.",
    ],
    scope: "hotel",
  },
  {
    id: "horarios",
    title: "Horarios del hotel",
    icon: "Clock",
    content: [
      "Consulta abajo los horarios de restaurante, desayuno, room service y bar.",
    ],
    scope: "hotel",
  },
  {
    id: "politicas",
    title: "Políticas del hotel",
    icon: "ShieldCheck",
    content: [
      "Hotel libre de humo: no está permitido fumar dentro de las habitaciones ni zonas comunes cerradas.",
      "Visitantes: toda persona externa al huésped registrado debe anunciarse en recepción.",
      "El horario de silencio en zonas comunes es de 10:00 p.m. a 7:00 a.m.",
    ],
    scope: "hotel",
  },
  {
    id: "emergencias",
    title: "Números de emergencia",
    icon: "PhoneCall",
    content: [
      "Encuentra los números de emergencia y de recepción 24h en esta sección.",
    ],
    scope: "hotel",
  },
  {
    id: "faq",
    title: "Preguntas frecuentes",
    icon: "HelpCircle",
    content: [
      "¿Tienen parqueadero? Sí, contamos con parqueadero privado y vigilado sin costo adicional.",
      "¿Aceptan mascotas? Contamos con habitaciones pet-friendly; consulta disponibilidad con recepción.",
      "¿Hay servicio de lavandería? Sí, disponible con entrega en 24 horas.",
    ],
    scope: "hotel",
  },
];

export const schedules: ScheduleEntry[] = [
  { id: "restaurante", label: "Restaurante", hours: "12:00 m. – 10:00 p.m." },
  { id: "desayuno", label: "Desayuno", hours: "6:30 a.m. – 10:00 a.m." },
  { id: "room-service", label: "Room service", hours: "24 horas" },
  { id: "bar", label: "Bar", hours: "5:00 p.m. – 12:00 a.m." },
];
