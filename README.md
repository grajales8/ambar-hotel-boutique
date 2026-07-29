# AMBAR Hotel Boutique — App de Huéspedes (PWA)

PWA pensada para escanearse por QR desde la habitación: sin instalación,
rápida, elegante y con un único objetivo — resolver lo que el huésped
necesita sin tener que llamar a recepción.

## Stack

- **Next.js 16 (App Router) + TypeScript**
- **TailwindCSS v4** — tokens de marca en `src/app/globals.css`
- **Framer Motion** — transiciones y micro-interacciones
- **lucide-react** — iconografía
- PWA: `public/manifest.json`, `public/sw.js`, íconos generados en
  `src/app/icon.tsx` / `apple-icon.tsx`

## Cómo correrlo

```bash
npm install
npm run dev       # http://localhost:3000
```

Para producción:

```bash
npm run build
npm run start
```

## Variables de entorno (opcionales)

Crea un `.env.local` a partir de estas claves si quieres personalizar sin
tocar código:

```
NEXT_PUBLIC_WHATSAPP_NUMBER=573001234567
NEXT_PUBLIC_GOOGLE_REVIEW_URL=https://g.page/r/xxxxx/review
NEXT_PUBLIC_ADMIN_PASSWORD=una-clave-segura
NEXT_PUBLIC_N8N_WEBHOOK_URL=
```

## Estructura

```
src/
  app/                 → una carpeta por pantalla (App Router)
    restaurante/  minibar/  servicio/  guia/  wifi/  descubre/  calificar/
    admin/  admin/dashboard/
  components/
    ui/                → piezas reutilizables (PageHeader, ProductCard, CartBar, CategoryTabs)
    home/              → hero de bienvenida + menú principal
    admin/             → editor de catálogo y de información del hotel
  data/                → "base de datos" mock (ver sección Backend)
  lib/
    types.ts           → formas de datos, pensadas para mapear 1:1 a Firestore/Supabase
    config.ts          → un único lugar para números, URLs y flags de integración
    cart-context.tsx   → carrito (uno independiente por módulo: restaurante y minibar)
    notify.ts          → punto único de "avisar a recepción" (hoy WhatsApp)
    whatsapp.ts        → helper de links wa.me
    storage.ts         → persistencia del admin (hoy localStorage)
```

## Flujo del huésped

1. Escanea el QR de su habitación → se abre la PWA (no requiere instalar nada).
2. Pantalla principal: bienvenida + menú grande con 8 accesos.
3. Restaurante / Minibar: catálogo con fotos, carrito flotante, y "Enviar
   pedido" abre WhatsApp con el pedido ya redactado (incluye habitación,
   ítems y total).
4. Solicitar servicio: tarjetas grandes que envían la solicitud directo por
   WhatsApp al tocar.
5. Guía de la habitación, WiFi y Descubre Cali: contenido informativo.
6. Calificar experiencia: 5 estrellas → invita a reseña en Google; 1-4
   estrellas → formulario de comentario interno (no público).

## Panel administrativo

`/admin` (contraseña por defecto: `ambar2025`, cámbiala con
`NEXT_PUBLIC_ADMIN_PASSWORD`). Permite editar sin programar:

- Productos de Restaurante y Minibar (nombre, descripción, precio, foto,
  categoría, disponibilidad)
- Información general del hotel (WiFi, WhatsApp, check-out, link de reseña)

Hoy los cambios se guardan en `localStorage` del navegador (por eso el admin
funciona sin backend). El panel guest-facing (Restaurante/Minibar) lee
primero de esa misma capa, así que lo que edites ahí se refleja de inmediato
en la app. Ver la siguiente sección para llevarlo a un backend real y
compartido entre todos los dispositivos.

## Backend: de mock a Firebase/Supabase

Todo el "backend" hoy vive en `src/data/*.ts` (mock) y `src/lib/storage.ts`
(persistencia local del admin). Están separados a propósito de los
componentes de UI para que migrar sea acotado:

1. Define `BACKEND_PROVIDER` en `src/lib/config.ts`.
2. Reemplaza las funciones `loadCollection` / `saveCollection` de
   `src/lib/storage.ts` por lecturas/escrituras a Firestore o Supabase,
   manteniendo la misma firma (`(collection, fallback) => T[]`).
3. Los tipos en `src/lib/types.ts` ya están pensados para mapear 1:1 a
   colecciones/tablas (`restaurantItems`, `minibarItems`, `hotelInfo`, etc.).

Ningún componente de página necesita cambiar en este proceso.

## Otras integraciones futuras (documentadas, no implementadas)

Todas viven como comentarios y variables en `src/lib/config.ts` y
`src/lib/notify.ts`:

- **n8n**: `notifyReception()` es el único punto de salida de pedidos y
  solicitudes; ahí se agrega el `fetch` al webhook de n8n cuando esté listo.
- **WhatsApp Business API**: reemplaza el link `wa.me` por el envío directo
  vía API, manteniendo `wa.me` como fallback.
- **ZEUS Hotelero (PMS)**: punto de conexión sugerido en `config.ts`
  (`ZEUS_API_BASE_URL`) para sincronizar habitaciones/huéspedes reales.
- **Google Reviews**: ya conectado vía `GOOGLE_REVIEW_URL` (solo falta el
  link real del hotel).
- **OpenAI / Gemini**: espacio reservado en `config.ts` (`AI_PROVIDER`) para
  cuando "Chatear con recepción" pase de abrir WhatsApp a un asistente propio.

## Notas de diseño

- Paleta: azul marino `#05244F`, beige `#F8EEE2`, blanco, dorado `#C6A15B`
  usado solo en detalles (hairlines, sello, iconografía) — nunca como color
  de fondo grande, para mantener la sensación de lujo discreto. Tokens en
  `src/app/globals.css`.
- Tipografía: **Fraunces** (display, con cursiva para los momentos cálidos:
  bienvenida, nombres de sección) + **Manrope** (texto y UI).
- Elemento de firma: el "sello" circular de doble aro dorado alrededor del
  monograma "A", reutilizado en la bienvenida, WiFi y login del admin — el
  mismo motivo que se usa como ícono de la app.
- Accesibilidad: foco visible en controles interactivos, `prefers-reduced-motion`
  respetado, contraste AA en textos sobre blanco y beige.

## Fotografías

Las imágenes de muestra vienen de Unsplash (vía `images.unsplash.com`) solo
para maquetar. Antes de producción, reemplázalas por fotografía real del
hotel y de los platos/lugares (el campo `image` de cada ítem admite
cualquier URL, incluida una de tu propio storage).
