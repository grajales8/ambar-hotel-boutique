# Rediseño UX/UI "Estilo Uber" - Implementation Plan

## Task 1: Rediseñar Home (WelcomeHero + MenuGrid)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - Reducir WelcomeHero: quitar foto gigante 480px; header compacto logo saludo subtítulo
  - Nuevo `WelcomeHero.tsx`: logo pequeño (≤140px), "Hola, bienvenido a ÁMBAR", "¿Qué necesitas durante tu estadía?", sin foto hero innecesaria
  - Nuevo `MenuGrid.tsx`: layout tarjetas 2 columnas (5 filas) primera fila "Solicitar servicio" tarjeta ancha destacada (2 cols span) + resto 2x4 o grilla equilibrada 2 cols para 9 items + ChatRecepcion tarjeta ancha + Calificar enlace discreto text-link
  - Tarjetas: alto ≥88px, ícono grande, nombre, descripción opcional 1 línea, rounded-2xl, border sutil, sombra soft, whileTap scale 0.96
  - Ajustar page.tsx Home para usar nuevo layout sin foto footer opcional logo
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3, AC-12
- **Test Requirements**:
  - `rule` TR-1.1: Home muestra logo + saludo + subtítulo; no hay hora/clima/WiFi en DOM; 10 acciones + chat visible; Evidence: inspección DOM + screenshot
  - `rule` TR-1.2: Cada módulo alcanzable en ≤2 toques; Evidence: recorrer manualmente cada ruta
  - `rubric` TR-1.3: Dimension "usabilidad tarjetas home"; scale 1-5; anchors 1/3/5; threshold ≥4; Evidence: medición touch target ≥72px alto

## Task 2: Crear ServiceRequestStatus + contexto estado solicitudes
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - Crear `src/components/ui/ServiceRequestStatus.tsx`: props { serviceName, requestedAt, status: 'PENDING'|'IN_PROGRESS'|'COMPLETED'|'CANCELLED', receptionMessage?, estimatedTime?, onContactReception? }
  - Timeline vertical elegante: 3-4 steps iconos circulos animados; step activo pulso; completados checkmark bronce/dorado
  - Step 1: PENDIENTE → "Solicitud enviada", Step 2: EN PROCESO → "Recepción gestionando", Step 3: ATENDIDA → "Solicitud atendida", Step CANCELADO gris
  - Tarjeta contenedor blanca/beige, rounded-2xl, sombra soft
  - Botón "Contactar recepción" abre WhatsApp buildWhatsappLink
  - Crear `src/lib/request-context.tsx`: estado global solicitudes servicio { id, serviceName, requestedAt, status, transitions[] }; persistencia sessionStorage; hook useServiceRequests() { sendRequest(), simulateProgress(), history }
- **Acceptance Criteria Addressed**: AC-4, AC-5, AC-13
- **Test Requirements**:
  - `rule` TR-2.1: ServiceRequestStatus renderiza 4 estados (PENDIENTE/EN PROCESO/ATENDIDA/CANCELADA) sin errores; Evidence: 4 screenshots o render test
  - `rule` TR-2.2: Timeline muestra steps progressivos; status completos check; activo animación; Evidence: inspección visual estados
  - `rule` TR-2.3: Botón contactar abre WhatsApp número correcto; Evidence: verificar href buildWhatsappLink

## Task 3: Rediseñar /servicio flujo Uber-like
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 2
- **Description**:
  - `src/app/servicio/page.tsx`: usar PageHeader limpio; field habitación elegante; tarjetas categorías 2 cols alto ≥120px;
  - Al enviar solicitud: reemplazar vista por ServiceRequestStatus en estado PENDIENTE → animar transición automática EN PROCESO (2s) → ATENDIDA (3s después)
  - Mantener notifyReception() y enviar WhatsApp en paralelo
  - Después enviar: opción "Enviar otra solicitud"
  - Mostrar historial últimas solicitudes (useServiceRequests().history) inferior
- **Acceptance Criteria Addressed**: AC-4
- **Test Requirements**:
  - `rule` TR-3.1: Flujo completo selecciona servicio → envía → ve PENDIENTE → EN PROCESO → ATENDIDA; Evidence: video o secuencia screenshots
  - `rule` TR-3.2: WhatsApp mensaje enviado correctamente habitación; Evidence: inspección buildMessage()

## Task 4: Rediseñar /minibar catálogo premium
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: None
- **Description**:
  - `ProductCard.tsx`: rediseñar tarjeta más grande, imagen alto 160px, hover/tap expandir animado suave, border bronce/dorado sutil, badge disponible/no disponible estilizado
  - `CategoryTabs.tsx`: tabs tipo chip más grandes, fondo seleccionado dorado/navy acento, animación subrayado deslizante
  - `CartBar.tsx`: botón inferior estilo Uber pill grande, sombra hover elevation, expandir bottom sheet con corner radius grande
  - `page.tsx minibar`: padding espaciado más elegante, grid gap 5, animaciones entrada stagger
  - Después enviar pedido: mostrar toast "Solicitud enviada a recepción" con animación
- **Acceptance Criteria Addressed**: AC-6, AC-11
- **Test Requirements**:
  - `rule` TR-4.1: Añadir productos, abrir carrito, enviar pedido WhatsApp funciona; Evidence: flujo completo
  - `rubric` TR-4.2: Dimension "experiencia visual minibar"; scale 1-5; threshold ≥4; Evidence: screenshot expandido/colapsado

## Task 5: Rediseñar /boutique premium
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 4 (compartiendo ProductCard, CategoryTabs, CartBar)
- **Description**:
  - Reusar componentes rediseñados Task 4
  - `page.tsx boutique`: pequeños ajustes: tipografía display más presente, posiblemente grid 2 cols igual o 1 col en móvil si imágenes son grandes
  - Identidad boutique más "lujo": posible badge nuevo/destacado, detalle dorado
- **Acceptance Criteria Addressed**: AC-7
- **Test Requirements**:
  - `rule` TR-5.1: Boutique añadir 2+ productos → carrito → enviar; Evidence: flujo
  - `rule` TR-5.2: Sin errores console; Evidence: console clean

## Task 6: Rediseñar /restaurante visual
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 4 (ProductCardReadOnly, CategoryTabs)
- **Description**:
  - Añadir sección hero restaurante con foto banner del restaurante (16:9)
  - Añadir sección galería (Carousel.tsx si existe, o scroll horizontal fotos)
  - Añadir sección Info restaurante: nombre, horarios (lista), descripción
  - Usar ProductCardReadOnly ya existente pero rediseñado consistente
  - Mantener sin carrito ni botones agregar
- **Acceptance Criteria Addressed**: AC-8
- **Test Requirements**:
  - `rule` TR-6.1: Restaurante sin elementos carrito/add button; Evidence: DOM grep "Agregar" / cart = 0 en restaurante
  - `rule` TR-6.2: Muestra menú categorías, galería fotos, horarios, info; Evidence: screenshot secciónes

## Task 7: Rediseñar /experiencias premium visual
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: None
- **Description**:
  - `experiencias/page.tsx`: tarjetas más grandes (h-48 imagen), overlay info, badge categoría gold hairline, precio formato grande Fraunces
  - Entrada stagger cards animation
  - `experiencias/[id]/page.tsx`: galería fotos hero, carousel 3+ pics, tabs includes/benefits, botón solicitar/reservar que abre WhatsApp con detalle experiencia
  - CategoryTabs consistente con resto
- **Acceptance Criteria Addressed**: AC-9
- **Test Requirements**:
  - `rubric` TR-7.1: Dimension "presentación experiencias"; scale 1-5; threshold ≥4; Evidence: screenshot lista + detalle
  - `rule` TR-7.2: Link WhatsApp detalle funciona; Evidence: enviar solicitud

## Task 8: Rediseñar /descubre Cali + admin editor
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: None
- **Description**:
  - `descubre/page.tsx`: tarjetas lugares con h-48 imagen, badge categoría, botones Maps/Llamar/Web estilo chip más elegantes, animaciones entrada
  - `components/admin/PlacesEditor.tsx`: mantener funcionamiento; solo ajustes menores estilo si hace falta para consistencia (no romper admin)
- **Acceptance Criteria Addressed**: AC-10
- **Test Requirements**:
  - `rule` TR-8.1: Admin CRUD crear lugar → refleja /descubre; Evidence: flujo admin → guest
  - `rule` TR-8.2: Botones Maps/Llamar/Web hrefs funcionales; Evidence: inspección hrefs

## Task 9: Mejoras globales PageHeader + consistencia + SafeArea
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: None
- **Description**:
  - `PageHeader.tsx`: aumentar padding top safe-area, agregar ligero blur, color sand consistent, botón back escala press
  - `globals.css`: añadir tokens sombras nuevas, easing curves, animation durations variables, touch targets
  - Verificar todos safe-area bottom en páginas con CartBar o botones fijos
  - Añadir animación de entrada page transition (Framer Motion layout o page wrapper)
- **Acceptance Criteria Addressed**: NFR-3, NFR-4, AC-12
- **Test Requirements**:
  - `rule` TR-9.1: Todas páginas respetan safe-area; Evidence: inspección padding env(safe-area-inset-*)
  - `rule` TR-9.2: Build no warnings console; Evidence: npm run build exit 0

## Task 10: Verificación Build final + linting
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Tasks 1-9 completadas
- **Description**:
  - Ejecutar `npm run build` y solucionar errores TS/ESLint restantes
  - Corrección de imports, props no usadas, types estrictos
  - Verificar consola browser sin errors/warnings
- **Acceptance Criteria Addressed**: AC-11
- **Test Requirements**:
  - `rule` TR-10.1: npm run build exit code 0; Evidence: terminal output
  - `rule` TR-10.2: Console navegador clean (no errors, no warnings amarillos críticos); Evidence: DevTools Console
