import { openWhatsapp } from "./whatsapp";
import { N8N_WEBHOOK_URL } from "./config";

/**
 * Punto único de salida para "avisar a recepción" (pedidos de restaurante,
 * minibar y solicitudes de servicio).
 *
 * Hoy: abre WhatsApp con el mensaje ya redactado.
 * Mañana: puede enviarse en paralelo (o en lugar de) a un webhook de n8n,
 * que reparte el mensaje a WhatsApp Business API, al PMS (ZEUS) o a un
 * canal interno de operaciones — sin que las páginas que llaman a esta
 * función tengan que cambiar.
 */
export async function notifyReception(message: string) {
  // TODO integración n8n: descomentar cuando N8N_WEBHOOK_URL esté configurado
  // if (N8N_WEBHOOK_URL) {
  //   await fetch(N8N_WEBHOOK_URL, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ source: "ambar-pwa", message, timestamp: Date.now() }),
  //   });
  // }

  openWhatsapp(message);
}
