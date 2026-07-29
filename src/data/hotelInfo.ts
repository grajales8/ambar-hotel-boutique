import { HotelInfo } from "@/lib/types";
import { WHATSAPP_NUMBER, GOOGLE_REVIEW_URL } from "@/lib/config";

export const hotelInfo: HotelInfo = {
  name: "AMBAR Hotel Boutique",
  tagline: "Un refugio elegante en el corazón de Cali",
  wifiSsid: "AMBAR_Huespedes",
  wifiPassword: "Ambar2025",
  whatsappNumber: WHATSAPP_NUMBER,
  emergencyNumbers: [
    { label: "Recepción 24h", number: "601 000 0000" },
    { label: "Policía Nacional", number: "123" },
    { label: "Línea de emergencias médicas", number: "125" },
    { label: "Bomberos Cali", number: "119" },
  ],
  checkOutTime: "12:00 m.",
  googleReviewUrl: GOOGLE_REVIEW_URL,
};
