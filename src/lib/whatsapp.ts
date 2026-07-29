import { WHATSAPP_NUMBER } from "./config";

/**
 * Construye un link de WhatsApp con mensaje pre-cargado.
 * Al integrar la API de WhatsApp Business / n8n, esta función puede
 * mantenerse igual como "fallback" cuando el envío directo por API falle.
 */
export function buildWhatsappLink(message: string, number = WHATSAPP_NUMBER) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

export function openWhatsapp(message: string, number?: string) {
  if (typeof window === "undefined") return;
  window.open(buildWhatsappLink(message, number), "_blank");
}
