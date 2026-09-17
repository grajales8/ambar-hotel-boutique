import { HotelInfo } from "@/lib/types";
import { WHATSAPP_NUMBER, GOOGLE_REVIEW_URL } from "@/lib/config";

export const hotelInfo: HotelInfo = {
  name: "AMBAR Hotel Boutique",
  tagline: "Un refugio elegante en el corazón de Cali",
  whatsappNumber: WHATSAPP_NUMBER,
  emergencyNumbers: [
    { label: "Recepción 24h", number: "601 000 0000" },
    { label: "Policía Nacional", number: "123" },
    { label: "Línea de emergencias médicas", number: "125" },
    { label: "Bomberos Cali", number: "119" },
  ],
  checkOutTime: "1:00 p.m.",
  googleReviewUrl: GOOGLE_REVIEW_URL,
  schedules: [
    { label: "Recepción", value: "Disponible las 24 horas" },
    { label: "Check-in", value: "A partir de las 3:00 p.m." },
    { label: "Check-out", value: "Hasta la 1:00 p.m." },
    { label: "Desayuno", value: "6:30 a.m. – 10:00 a.m." },
    { label: "Restaurante & Bar", value: "6:30 a.m. – 3:00 p.m." },
    { label: "Room Service", value: "Disponible las 24 horas" },
  ],
};
