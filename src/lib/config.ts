// ---------------------------------------------------------------------------
// Configuración central de la app.
//
// Todo lo que hoy apunta a un mock o a un link de WhatsApp está pensado como
// punto de reemplazo único: cuando conectes n8n, la API de WhatsApp Business,
// ZEUS Hotelero, Firebase/Supabase, Google Reviews u OpenAI/Gemini, el único
// lugar que debería cambiar es este archivo (o las funciones de /src/lib que
// lo consumen), no cada página.
// ---------------------------------------------------------------------------

export const siteConfig = {
  hotelName: "AMBAR Hotel Boutique",
  shortName: "AMBAR",
  tagline: "Bienvenido a AMBAR Hotel Boutique",
  city: "Cali",
  themeColor: "#05244F",
  backgroundColor: "#F8EEE2",
};

// Número de WhatsApp de recepción, formato internacional sin "+".
// TODO integración: reemplazar por variable de entorno NEXT_PUBLIC_WHATSAPP_NUMBER
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573186059083";

// ---------------------------------------------------------------------------
// Puntos de integración futura (hoy no implementados, solo documentados).
// ---------------------------------------------------------------------------

/**
 * n8n: en vez de (o además de) abrir WhatsApp del huésped, los pedidos y
 * solicitudes de servicio pueden enviarse a un webhook de n8n, que a su vez
 * distribuye el mensaje a WhatsApp Business API, Slack de operaciones, o
 * crea la tarea en el PMS.
 *
 * Para activarlo:
 * 1. Define NEXT_PUBLIC_N8N_WEBHOOK_URL en tu .env
 * 2. En /src/lib/notify.ts, descomenta el bloque `sendToN8n(...)`
 */
export const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "";

/**
 * ZEUS Hotelero (PMS / Channel Manager). Cuando se habilite la integración,
 * este es el lugar para guardar el endpoint/API key y las funciones que hoy
 * viven en /src/lib/data.ts (que leen mocks) pasarían a llamar a ZEUS en su
 * lugar, manteniendo la misma forma de datos (ver /src/lib/types.ts).
 */
export const ZEUS_API_BASE_URL = process.env.ZEUS_API_BASE_URL || "";

/**
 * Firebase / Supabase: hoy el "admin" guarda cambios en localStorage
 * (ver /src/lib/storage.ts) para que el panel funcione sin backend.
 * Al migrar, reemplaza las funciones getX/saveX de storage.ts por llamadas
 * a Firestore (getDocs/setDoc) o Supabase (.from('tabla').select()), sin
 * tocar los componentes que las consumen.
 */
export const BACKEND_PROVIDER: "local" | "firebase" | "supabase" = "local";

/** Google Reviews: URL directa para dejar una reseña de 5 estrellas. */
export const GOOGLE_REVIEW_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ||
  "https://www.google.com/travel/search?q=ambar%20hotel&g2lb=4965990%2C72471280%2C72560029%2C72573224%2C72647020%2C72686036%2C72799179%2C72803964%2C72882230%2C73064764%2C121529350%2C121738283%2C121762713&hl=es-419&gl=co&ssta=1&ts=CAEaRwopEicyJTB4OGUzMGExOWEzNzY2OToweGQzM2I5ZDQxNzJmNWY0MDQSGhIUCgcI6g8QCRgdEgcI6g8QChgBGAIyAggC&qs=CAEyFENnc0loT2pYbDVlbzU1M1RBUkFCOAJCCQkE9PVyQZ0700IJCQT09XJBnTvT&ap=ugEHcmV2aWV3cw&ictx=111&ved=0CAAQ5JsGahcKEwjY1_3IzPWVAxUAAAAAHQAAAAAQAw";

/**
 * OpenAI / Gemini: espacio reservado para el asistente conversacional del
 * huésped (hoy "Chatear con recepción" abre WhatsApp directamente). Cuando
 * se conecte un LLM, este archivo es el lugar para la API key y el modelo.
 */
export const AI_PROVIDER: "openai" | "gemini" | "none" = "none";
