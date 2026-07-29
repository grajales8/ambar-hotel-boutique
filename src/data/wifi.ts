import { WifiNetwork } from "@/lib/types";

// Redes WiFi mostradas al huésped. Administrables desde /admin → Redes WiFi.
// Solo las redes con active:true aparecen en la pantalla del huésped.
export const wifiNetworks: WifiNetwork[] = [
  {
    id: "w-1",
    ssid: "AMBAR_Huespedes",
    password: "Ambar2025",
    description: "Red principal para habitaciones",
    active: true,
  },
];
