# Rediseño UX/UI "Estilo Uber" - AMBAR Experience

## Overview
- **Summary**: Rediseño completo de la interfaz de la PWA de ÁMBAR Hotel Boutique aplicando principios UX/UI inspirados en Uber (simplicidad, jerarquía visual, tarjetas grandes, acciones rápidas, navegación intuitiva, estados de solicitud claros) manteniendo la identidad visual premium de AMBAR.
- **Purpose**: Transformar la experiencia de huésped para que se sienta como una app nativa premium tipo "Uber del hotel", donde todo esté a máximo 2 toques de distancia.
- **Target Users**: Huéspedes del ÁMBAR Hotel Boutique que acceden vía QR general desde sus celulares, sin necesidad de registro.

## Goals
- Pantalla principal con estructura Uber-like: header limpio, bienvenida breve, acciones principales visibles inmediatamente
- Tarjetas grandes y fáciles de tocar (no botones pequeños ni saturación de íconos)
- Experiencia de "Solicitar servicio" con flujo tipo Uber y tracking visual de estados
- Componente `ServiceRequestStatus` reutilizable con timeline elegante
- Minibar y Boutique como catálogos premium con tarjetas expandibles
- Restaurante sección visual (sin carrito en esta etapa)
- Servicios y experiencias con tarjetas visuales premium
- Descubre Cali con lugares recomendados (administrable)
- Acceso vía QR único, sin cuentas de usuario
- Todo accesible en máximo 2 toques desde la home

## Non-Goals
- No implementar backend / Firebase Auth aún (reglas Firestore siguen como tech debt conocido)
- No implementar sistema de pago dentro de la app
- No implementar carrito de compras para Restaurante en esta etapa
- No cambiar integración de WhatsApp como canal de envío de pedidos/solicitudes
- No cambiar identidad visual ni logotipos existentes

## Background & Context
- Stack actual: Next.js 16 App Router, TypeScript, TailwindCSS v4, Framer Motion, Firebase (Firestore + Storage)
- Identidad Home: Home usa tema negro mate (#0B0B0C) + bronce (#B8935C); resto usa azul marino (#05244F) + beige (#F8EEE2) + dorado (#C6A15B)
- Tipografías: Fraunces (títulos) y Manrope (texto)
- Los 10 módulos existentes + calificar ya están implementados pero requieren rediseño visual
- Integración actual: pedidos y solicitudes por WhatsApp al 573186059083
- Contenido: Restaurante, Minibar, Boutique y Experiencias son administrables vía admin

## Functional Requirements

### FR-1: Home rediseñada (Uber-like
- Header limpio con logo AMBAR
- Saludo: "Hola, bienvenido a ÁMBAR"
- Subtítulo: "¿Qué necesitas durante tu estadía?"
- Sin mostrar: hora, clima, estado WiFi ni elementos decorativos innecesarios
- Sección de acciones principales con tarjetas grandes
- Enlace discreto "Calificar mi experiencia" (no botón principal)

### FR-2: 10 Acciones Principales
1. Guía del hotel
2. Guía de habitación
3. Solicitar servicio (función central, destacar)
4. WiFi
5. Minibar
6. Restaurante
7. Boutique
8. Servicios y experiencias
9. Descubre Cali
10. Chatear con recepción

### FR-3: Diseño de Tarjetas de Acción
- Icono elegante (ícono + nombre + descripción opcional
- Gran área de toque amplio
- Bordes suaves, sombras sutiles
- Animación al presionar (scale 0.95-0.98)
- Excelente contraste y simetría
- Adaptación perfecta en móviles

### FR-4: Solicitar Servicio (flujo Uber-like
- Categorías mostradas como tarjetas:
  - Llamada despertador
  - Secador
  - Plancha
  - Problema con Aire acondicionado
  - Problema con TV
  - Solicitar taxi
- Campo número habitación (persistido en sessionStorage
- Después de enviar: flujo de estados visuales:
  1. "Solicitud enviada"
  2. "Recepción está gestionando tu solicitud"
  3. "Solicitud atendida"

### FR-5: Componente ServiceRequestStatus
- Propiedades: servicio solicitado, hora solicitud, estado, mensaje recepción, tiempo estimado (opcional), botón contactar recepción
- Estados: PENDIENTE, EN PROCESO, ATENDIDA, CANCELADA
- Timeline / línea de progreso visual elegante
- Reutilizable

### FR-6: Minibar rediseñado
- Categorías pestañas: Bebidas, Snacks, Cervezas
- Tarjetas producto: Imagen + Nombre + Precio + Botón Agregar
- Tarjeta expandible al tocar para más info
- Botón final "Solicitar minibar"
- Confirmación "Solicitud enviada a recepción"
- Sin sistema de pago

### FR-7: Boutique rediseñada
- Estructura similar a Minibar pero sensación premium
- Tarjetas: Imagen + Nombre + Precio + Botón Agregar
- Coherente con identidad ÁMBAR

### FR-8: Restaurante (visual, sin carrito)
- Consultar menú
- Galería fotográfica
- Horarios
- Info restaurante
- Sin carrito ni sistema pedidos

### FR-9: Servicios y Experiencias
- Tarjetas visuales premium
- Categorías: Restaurante, Salones audiovisuales, Decoración habitaciones, Noche romántica, Experiencias adicionales
- Múltiples fotografías por experiencia
- Detalle por experiencia (ya existe /experiencias/[id])

### FR-10: Descubre Cali
- Lugares recomendados administrables
- Admin puede agregar/editar/eliminar
- Tarjetas: imagen, nombre, categoría, descripción, dirección, horario, teléfono, maps URL, website
- Acciones: Abrir en Maps, Llamar, Sitio web

## Non-Functional Requirements
- **NFR-1**: Todo huésped encuentra lo que necesita en máximo 2 toques desde Home
- **NFR-2**: Interfaz móvil-first, optimizada para 360px-430px de ancho
- **NFR-3**: Animaciones suaves Framer Motion (300-700ms, easing easeOut
- **NFR-4**: Safe areas de iOS respetados (env(safe-area-inset-*))
- **NFR-5**: Contraste WCAG AA mínimo en textos sobre fondos
- **NFR-6**: Build sin errores TypeScript ni warnings ESLint
- **NFR-7**: PWA instalable y offline funcionalidad mantenida
- **NFR-8**: Sensación de lujo, elegancia, tranquilidad, modernidad, calidez

## Constraints
- **Technical**: Mantener Next.js 16 App Router, Tailwind v4, Framer Motion, Firebase/Firestore
- **Business**: No romper funcionalidad existente de admin ni envíos WhatsApp
- **Dependencies**: Íconos HomeIcons.tsx y AppIcons.tsx existentes, lucide-react
- **Identidad**: Home = negro mate + bronce; resto páginas = azul marino + beige + dorado

## Assumptions
- QR de acceso único por URL raíz "/", sin sub-rutas para números de habitación
- Estados de solicitud son simulados/estáticos en esta etapa (no backend real de tracking)
- Admin panel existente sigue funcionando sin cambios mayores
- WhatsApp permanece como canal único notificación recepción

## Acceptance Criteria

### AC-1: Home Uber-like
- **Type**: `rule`
- **Given**: Usuario abre la app
- **When**: Ve la pantalla principal
- **Then**: Muestra logo AMBAR, saludo "Hola, bienvenido a ÁMBAR", subtítulo "¿Qué necesitas durante tu estadía?", 10 tarjetas de acción principales y enlace discreto "Calificar mi experiencia". Sin mostrar hora/clima/WiFi.
- **Pass Condition**: Visual inspection screenshot home cumple todos los elementos y no los prohibidos
- **Evidence**: Captura pantalla Home + inspección DOM sin elementos innecesarios

### AC-2: Tarjetas accionables
- **Type**: `rubric`
- **Dimension**: Usabilidad táctil y estética tarjetas home
- **Scale**: 1-5
- **Anchors**: 1 = botones pequeños <40px, sin animación; 3 = tarjetas 48px+, animación básica; 5 = tarjetas grandes ≥72px alto, descripción opcional, animación scale tap suave, contraste excelente, composición simétrica, sombras elegantes
- **Pass Threshold**: >= 4
- **Evidence**: Captura pantalla + medición altura táctil

### AC-3: Máximo 2 toques
- **Type**: `rule`
- **Given**: Huésped en Home
- **When**: Quiere acceder a cualquier módulo principal o acción
- **Then**: Llega en ≤2 taps (tap home → tap módulo = 2 taps máximo; 1 tap si destaca servicio directo)
- **Pass Condition**: Cada uno de los 10 módulos + calificar + chat alcanzable en ≤2 taps desde Home
- **Evidence**: Recorrido manual por cada ruta desde Home

### AC-4: Solicitar Servicio flujo estados
- **Type**: `rule`
- **Given**: Huésped en /servicio
- **When**: Selecciona categoría y envía solicitud
- **Then**: Muestra secuencia: PENDIENTE → EN PROCESO → ATENDIDA con componente ServiceRequestStatus y timeline visual
- **Pass Condition**: 3 estados visibles con transiciones animadas y mensaje WhatsApp enviado
- **Evidence**: Flujo de prueba completo + screenshot estados 3

### AC-5: ServiceRequestStatus reutilizable
- **Type**: `rule`
- **Given**: Componente ServiceRequestStatus
- **When**: Se renderiza con props distintas combinaciones estado
- **Then**: Renderiza correctamente PENDIENTE, EN PROCESO, ATENDIDA, CANCELADA con timeline, nombre servicio, hora, mensaje y botón recepción
- **Pass Condition**: 4 estados renderizan correctamente sin errores consola
- **Evidence**: Unit test visual 4 combinaciones props

### AC-6: Minibar catálogo premium
- **Type**: `rubric`
- **Dimension**: Experiencia visual catálogo Minibar
- **Scale**: 1-5
- **Anchors**: 1 = lista básica sin expandir; 3 = tarjetas expandir; 5 = tarjetas imagen grande, expandir animado smooth, categorías tabs sticky, diseño coherente identidad AMBAR
- **Pass Threshold**: >= 4
- **Evidence**: Captura pantalla minibar expandido y colapsado

### AC-7: Boutique premium
- **Type**: `rule`
- **Given**: Página /boutique
- **When**: Navega y explora productos
- **Then**: Muestra catálogo estilo premium coherente identidad, tarjetas grandes, agregar/quitar, carrito bar inferior, envío WhatsApp
- **Pass Condition**: Flujo completo añadir 2+ productos → abrir carrito → enviar pedido
- **Evidence**: Flujo boutique pedido enviado

### AC-8: Restaurante visual
- **Type**: `rule`
- **Given**: Página /restaurante
- **When**: Explora
- **Then**: Muestra menú categorías, galería fotos, horarios, info restaurante
- **Pass Condition**: Sin botones agregar/carrito; solo lectura; fotos horarios info
- **Evidence**: Inspección DOM sin elementos carrito

### AC-9: Experiencias premium
- **Type**: `rubric`
- **Dimension**: Presentación visual tarjetas experiencias
- **Scale**: 1-5
- **Anchors**: 1 = lista simple; 3 = tarjetas foto + texto; 5 = tarjetas grandes multi-foto, categoría badge, detalle por experiencia con galería, sensación boutique lujo
- **Pass Threshold**: >= 4
- **Evidence**: Captura pantalla lista + detalle experiencia

### AC-10: Descubre Cali administrable
- **Type**: `rule`
- **Given**: Admin y admin/dashboard PlacesEditor
- **When**: Admin agrega/edita/elimina lugar
- **Then**: Cambios se reflejan /descubre
- **Pass Condition**: CRUD lugares funciona; huésped ve tarjetas Maps/Llamar/Web
- **Evidence**: Flujo admin crear → ver

### AC-11: Build sin errores
- **Type**: `rule`
- **Given**: Código fuente
- **When**: Ejecuta `npm run build`
- **Then**: Compila exitosamente sin errores TypeScript, warnings ESLint
- **Pass Condition**: exit code 0
- **Evidence**: Salida comando build

### AC-12: Identidad visual
- **Type**: `rubric`
- **Dimension**: Coherencia identidad visual premium lujo/elegancia/calidez
- **Scale**: 1-5
- **Anchors**: 1 = colores no coinciden, tipografías mal usadas; 3 = paleta y tipografías aplicadas; 5 = paleta Home (negro+bronce / azul+beige+dorado), tipografías Fraunces/Manrope correctamente aplicadas, espaciado elegante, sensación boutique lujo
- **Pass Threshold**: >= 4
- **Evidence**: Revisión visual paleta, tipografía, espaciado

### AC-13: Chatear con recepción
- **Type**: `rule`
- **Given**: Home card/acción 10 + dentro ServiceRequestStatus
- **When**: Toca "Chatear con recepción"
- **Then**: Abre WhatsApp con mensaje predefinido
- **Pass Condition**: Link wa.me correcto con número 573186059083
- **Evidence**: Inspección href + click acción

## Open Questions
- [ ] ¿Duración exacta simulación entre estados PENDIENTE → EN PROCESO → ATENDIDA (sugerido: 2s + 3s)?
- [ ] ¿Persistir historial solicitudes servicio entre vistas? (sugerido: localStorage por sessionStorage sesión huésped)
