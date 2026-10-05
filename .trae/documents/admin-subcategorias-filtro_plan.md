# Subcategorías como filtro + añadir dentro de subcategoría (Admin)

## Repository Research
### Situación actual (antes)
Los paneles administrativos de **Minibar / Restaurante / Boutique** comparten `CatalogEditor.tsx`, y **Servicios & Experiencias** usa `ExperiencesEditor.tsx`. Ambos editores tienen la misma estructura por categoría (acordeón expandible):

1. **Bloque Subcategorías**: lista editable (drag, renombrar, borrar, añadir). Sirve para GESTIONAR las subcategorías, pero NO para NAVEGARLAS.
2. **Bloque Productos/Servicios**: muestra **TODOS** los productos de la categoría mezclados, sin filtrar por subcategoría.
3. Al pulsar **Añadir producto**:
   - En CatalogEditor → `subcategory: undefined` (el usuario tiene que entrar luego en cada tarjeta y asignársela manualmente en el `<select>`).
   - En ExperiencesEditor → siempre usa la primera subcategoría (`cat.subcategories[0]?.id`), ignorando en qué subcategoría quería el usuario.

### Qué pide el usuario
> *"Como los títulos/categorías en cliente, que al seleccionar una subcategoría salgan sus productos, y que el botón añadir añada dentro de la subcategoría seleccionada"*

- Dentro de cada categoría expandida → barra de **chips/tabs de subcategorías** (igual que en la app cliente) para filtrar el listado.
- Incluir chips **Todos** (toda la categoría) y **Sin asignar** (productos sin subcategoría) para no perder visibilidad.
- Botón **Añadir** → si hay una subcategoría (no "Todos"/"Sin asignar") seleccionada, crea el producto ya asignado a esa subcategoría automáticamente.
- Aplicar a Minibar, Restaurante, Boutique y Servicios & Experiencias.

---

## Files and Modules
- `src/components/admin/CatalogEditor.tsx`: Barra chips filtrado de subcategorías + filtro `catItems` + `addItemInto` respeta subcategoría activa (afecta Minibar/Restaurante/Boutique).
- `src/components/admin/ExperiencesEditor.tsx`: Mismo patrón (barra chips, filtro `catServices`, `addItemInto` con subcategoría activa).

---

## Implementation Steps
### 1. CatalogEditor.tsx (4 submódulos)
1.1. Añadir estado `activeSubByCat: Record<catId, string>` (valores: `"__all__"` | `"__unassigned__"` | `subId`). Por defecto `"__all__"` para mantener visualización actual sin sorpresas.
1.2. Encima del header "Productos" insertar barra horizontal scrollable de **chips** (píldoras):
     - `Todos` (contador: `catItems.length`)
     - `Sin asignar` (contador: `catItems.filter(i => !i.subcategory).length`)
     - Cada `sub` de `orderByOrder(cat.subcategories)` (contador: `catItems.filter(i => i.subcategory === sub.id).length`)
     - Estilo igual a los SubTabs de cliente: activo → `bg-[#B8935C] text-[#0B0B0C]`; inactivo → `bg-[#161414] text-[#F5EFE6]` + borde bronce 0.22.
1.3. Calcular `filteredItems` en base a `activeSubByCat[cat.id]`:
     - `"__all__"` → `catItems` completo
     - `"__unassigned__"` → `!it.subcategory`
     - `subId` → `it.subcategory === subId`
     - Después de filtrar aplicar `orderByOrder(...)` para respetar `order` al renderizar.
1.4. Actualizar título bloque Productos: `({filteredItems.length}/{catItems.length})` y empty states (mensajes distinto: "Esta subcategoría aún no tiene productos" vs "La categoría aún no tiene productos").
1.5. Modificar `addItemInto(categoryId)`: si `activeSubByCat[categoryId]` es un `subId` real (ni all ni unassigned) → crear el nuevo producto con `subcategory: subId` pre-asignado.
1.6. Botón Añadir: cambiar label contextual si procede (ej. "Añadir a Bebidas" / "Añadir a Energizantes").

### 2. ExperiencesEditor.tsx (Servicios & Experiencias)
2.1. Estado `activeSubByCat` idéntico a CatalogEditor (valores `"__all__"` | `"__unassigned__"` | `subId`).
2.2. Barra chips de subcategorías ENCIMA del header "Servicios" (mismo estilo que paso 1.2, leyenda "Servicios" en lugar de "Productos").
2.3. `filteredServices` según subcategoría activa + `orderByOrder(...)`.
2.4. Contadores y empty states igual a CatalogEditor adaptados a "servicios".
2.5. `addItemInto(categoryId)` → si `activeSubByCat[categoryId]` es un `subId` real, setear `subcategory: subId` (mejor que la política actual de siempre sub[0]).

### 3. Validación manual
3.1. Admin > Minibar > categoría Bebidas → aparecen chips: Todos · Sin asignar · Aguas · Gaseosas · Energizantes · etc.
3.2. Pulsar Energizantes → solo listan Red Bull/Monster/Powerade. Botón "Añadir" crea nuevo producto con `subcategory = energizantes` preseleccionada.
3.3. Mismo flujo en Restaurante (ej. Plato principal) y Boutique (ej. Cuidado personal).
3.4. Experiencias: categoría Eventos corporativos → sub Salón de reuniones → Añadir (con subcategoría).
3.5. "Sin asignar" muestra productos antiguos con `subcategory === undefined`.
3.6. "Todos" recupera la vista actual.

---

## Dependencies and Considerations
- `CatalogEditor` es compartido por 3 secciones: las 3 heredan el cambio automáticamente al modificar solo 1 archivo.
- Drag & drop de productos: el `onDropItemWithin(categoryId, ...)` opera a nivel de categoría (no subcategoría), lo que es correcto (el `order` se reindexa por categoría entera según `persistItems`; al renderizar una vista filtrada los productos de esa sub seguirán apareciendo ordenados según `orderByOrder`).
- Drag & drop de subcategorías: sin afectación, sigue funcionando igual.
- `restoreSeedDefaults` / Restaurar datos iniciales: sin cambios necesarios (el seed ya trae sub + order correctos).
- Chip "Sin asignar" es obligatorio: si se elimina una subcategoría, los productos pasan a `undefined` (hoy `removeSubcategory` hace eso). Sin el chip Sin asignar los productos quedarían invisibles en el admin.
- **default `__all__`**: evita sorpresas para usuarios que abran la categoría por primera vez (comportamiento visual idéntico al actual).

---

## Validation
1. Build dev con `npm run dev` → abrir `/admin/dashboard` y checkear que
   - 4 secciones (Minibar/Restaurante/Boutique/Experiencias) → categoría expandida → chips de subcategorías aparecen arriba de productos/servicios.
   - Contadores por chip coinciden con la realidad.
   - Al filtrar por subcategoría solo se muestran sus productos/servicios.
   - "Añadir" dentro de una subcategoría asigna correctamente `subcategory` al nuevo item (verificar en el `<select>` del producto nuevo).
2. Run `GetDiagnostics` para errores TypeScript.
3. Commit y push → confirmar nuevo deploy exitoso en Vercel.

---

## Risks
1. **Riesgo: chips desaparecen al colapsar/expandir** → manejo: `activeSubByCat` indexado por `cat.id` (no estado global simple), así cada categoría conserva su selección al colapsar/reabrir.
2. **Riesgo: "Sin asignar" queda vacío pero molesta visualmente** → se muestra solo si `catItems.some(i => !i.subcategory)` o si el count > 0 (decisión en implementación). Mejor: mostrarlo siempre por seguridad (cuando haya 0, muestra "Sin asignar (0)").
3. **Riesgo: nuevo producto en "Sin asignar" debe seguir quedando `subcategory: undefined`** → manejo: en el condicional de `addItemInto`, solo setear subId cuando el filtro NO sea `__all__` ni `__unassigned__`.
4. **Riesgo: Experiencias no acepta `subcategory` del mismo modo** → revisar el tipo `ExperienceService` en `lib/types.ts` para confirmar que tiene `subcategory?: string` (ya lo usa ExperiencesEditor, así que debería estar).
