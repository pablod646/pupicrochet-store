# Auditoría del Proyecto PupiCrochet - Hallazgos

**Fecha:** 24 de julio de 2025

Este documento resume los hallazgos de la auditoría completa del código base, realizada como parte de la **Tarea 0** en nuestro `PUPICROCHET_TASKS.md`. El objetivo es establecer una línea base clara y definir las acciones de refactorización necesarias antes de implementar nuevas funcionalidades.

---

### 1. Estructura del Proyecto y Dependencias (Tarea 0.1)

*   **Estructura de Archivos:**
    *   **Positivo:** La estructura general en `src` (`lib`, `routes`) es lógica y sigue las convenciones de SvelteKit.
    *   **Oportunidad:** No existe un directorio `src/lib/stores`. Se creará para alojar los Svelte Stores.

*   **Dependencias (`package.json`):**
    *   **Oportunidad (Limpieza):** Varias dependencias de desarrollo están listadas incorrectamente en `dependencies`.
        *   `@tailwindcss/vite`
        *   `tailwindcss`
        *   `@types/*` (ej. `@types/bcrypt`)
    *   **Oportunidad (Redundancia):** La dependencia `@types/uuid` es redundante y puede ser eliminada, ya que `uuid` incluye sus propios tipos.

---

### 2. Flujo de Autenticación (Tarea 0.2)

*   **Manejo de Sesiones:**
    *   **Positivo:** El uso de `hooks.server.ts` para cargar el usuario en `event.locals` es correcto.
    *   **Riesgo (Seguridad):** El sistema actual, que usa solo el `id` del usuario en una cookie, es vulnerable a la fijación de sesiones. No hay un token de sesión invalidable.
    *   **Riesgo (Rendimiento):** Se realiza una consulta a la base de datos en cada petición para validar la sesión, lo que podría ser ineficiente a gran escala.
    *   **Conclusión:** Confirma la necesidad de migrar a una librería robusta como `lucia-auth`.

*   **Validación de Datos:**
    *   **Oportunidad:** La lógica de validación es manual, está duplicada en varios `actions` y es propensa a errores.
    *   **Conclusión:** Confirma la necesidad de implementar `zod` y `sveltekit-superforms` para centralizar y robustecer la validación.

---

### 3. Modelo de Datos (`schema.prisma`) (Tarea 0.3)

*   **Convenciones:**
    *   **Positivo:** El esquema sigue en gran medida las convenciones definidas (PascalCase para modelos, camelCase para campos).
*   **Tipos de Datos y Relaciones:**
    *   **Positivo:** Las relaciones y los tipos de datos son lógicos y funcionales para la etapa actual. El uso de `onDelete: Cascade` y `@@unique` es correcto.
    *   **Oportunidad (A futuro):** Los campos `dimensions` y `materials` en `Product` podrían convertirse en sus propios modelos si la necesidad de filtrado avanzado surgiera. No es un cambio requerido ahora.
*   **Conclusión:** El esquema es sólido y no requiere refactorización inmediata.

---

### 4. Rutas y Carga de Datos (Tarea 0.4)

*   **Carga de Datos (`load`):**
    *   **Oportunidad (Duplicación):** La lógica para cargar la jerarquía de categorías está duplicada en al menos tres archivos (`admin/categories/+page.server.ts`, `admin/products/new/+page.server.ts`, `admin/products/[slug]/edit/+page.server.ts`).
        *   **Acción Requerida:** Refactorizar esta lógica a una función reutilizable en `src/lib/server/queries/categories.ts`.
    *   **Observación:** La búsqueda insensible a mayúsculas en `productos/+page.server.ts` mediante `$queryRaw` es una solución correcta para SQLite, pero debe ser reemplazada por el modo `insensitive` de Prisma al migrar a PostgreSQL.

*   **Acciones de Formulario (`actions`):**
    *   **Oportunidad (Complejidad):** La lógica de `addToCart` en `productos/[slug]/+page.server.ts` es muy compleja y está fuertemente acoplada al `action`.
        *   **Acción Requerida:** Extraer esta lógica a un módulo de servicio dedicado en `src/lib/server/services/cart.service.ts`.

---

### 5. Componentes Reutilizables (Tarea 0.5)

*   **Duplicación:**
    *   **Oportunidad:** Los componentes `CategoryItem.svelte` y `CategoryTreeItem.svelte` tienen una funcionalidad recursiva casi idéntica.
        *   **Acción Requerida:** Fusionarlos en un único componente `CategoryNode.svelte` que use props o slots para manejar las diferencias.
*   **Complejidad y Prácticas:**
    *   **Oportunidad:** `CategorySelector.svelte` es excesivamente complejo y manipula el DOM directamente (`{@html ...}`).
        *   **Acción Requerida:** Refactorizar para que sea más declarativo, usando componentes de Svelte de forma recursiva en lugar de construir strings de HTML.
*   **Componentes Incrustados:**
    *   **Oportunidad:** El `Header` y el `Footer` están definidos directamente en `+layout.svelte`.
        *   **Acción Requerida:** Extraerlos a sus propios componentes en `src/lib/components/layout/`.

---

### 6. Gestión de Estado (Tarea 0.6)

*   **Mecanismo Actual:** "Prop drilling" desde el `+layout.server.ts` raíz.
*   **Conclusión:** El sistema actual no es escalable. La decisión de migrar a **Svelte Stores** para el estado del cliente (usuario, carrito) es correcta y debe ser una de las primeras tareas de refactorización.

