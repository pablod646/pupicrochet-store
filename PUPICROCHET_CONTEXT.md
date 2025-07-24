## Contexto del Proyecto

*   **Nombre del Proyecto:** PupiCrochet Store
*   **Descripción:** Una tienda de e-commerce full-stack para vender productos de crochet, construida con un enfoque moderno y modular.
*   **Tecnologías Principales:**
    *   **Framework:** SvelteKit
    *   **Lenguaje:** TypeScript
    *   **Build Tool:** Vite
    *   **ORM:** Prisma
    *   **Base de Datos (Desarrollo):** SQLite
    *   **Estilos:** Tailwind CSS
    *   **Autenticación:** Implementación personalizada con `bcrypt` y gestión de sesiones basada en cookies.
*   **Estructura y Características Clave:**
    *   **Rutas Principales:**
        *   `/productos`: Catálogo con filtros, búsqueda y paginación.
        *   `/productos/[slug]`: Página de detalle del producto.
        *   `/carrito`: Carrito de compras.
        *   `/auth`, `/register`, `/logout`: Flujo de autenticación.
    *   **Panel de Administración (`/admin`):**
        *   Protegido por rol de `ADMIN`.
        *   CRUD para Productos, Categorías (jerárquicas y con relación muchos a muchos) y Usuarios.
    *   **Base de Datos (`schema.prisma`):
        *   Modelos principales: `Product`, `Category`, `User`, `Cart`, `CartItem`.
        *   Relaciones importantes: Productos con múltiples categorías (M-M), Carrito asociado a Usuario.

### 4. Gestión de Estado

*   **Estrategia Principal:** Se utilizarán **Svelte Stores** para gestionar el estado global y compartido de la aplicación, como los datos del usuario y el carrito de compras.
*   **Flujo de Datos:**
    1.  Los datos iniciales se cargan en el `+layout.server.ts` raíz.
    2.  En el componente `+layout.svelte`, estos datos se utilizan para inicializar o actualizar los stores correspondientes (ej. `userStore`, `cartStore`).
    3.  Cualquier componente que necesite acceder o reaccionar a cambios en estos datos (ej. el Header mostrando el número de artículos del carrito) debe importar y suscribirse al store relevante.
*   **Beneficios:** Este enfoque desacopla los componentes, evita el "prop drilling" y proporciona una reactividad instantánea en el lado del cliente.

### 5. Estilos y UI

*   **Sistema de Diseño:** La guía de estilo y los componentes de UI se basarán en **Tailwind UI**. Será nuestra principal fuente de inspiración y referencia para la construcción de interfaces.
*   **Convención de Clases:** Para mantener la legibilidad, las clases de Tailwind se ordenarán de la siguiente manera:
    1.  Layout (posicionamiento, display, flexbox, grid)
    2.  Espaciado (padding, margin)
    3.  Tamaño (width, height)
    4.  Tipografía (color, fuente, peso)
    5.  Fondo y Bordes
    6.  Efectos (sombras, transformaciones)
*   **Modo Oscuro (Dark Mode):** La aplicación debe ser compatible con el modo oscuro. Se utilizarán las variantes `dark:` de Tailwind CSS para aplicar estilos específicos cuando el sistema operativo del usuario esté en modo oscuro. La implementación se basará en la estrategia `(prefers-color-scheme)`. 

### 6. Base de Datos

*   **ORM:** Prisma
*   **Base de Datos de Desarrollo:** SQLite
*   **Base de Datos de Producción:** PostgreSQL. Se eligió por su robustez, escalabilidad y excelente compatibilidad con Prisma para entornos de producción.
*   **Estrategia de Migraciones:**
    *   **Atomicidad:** Cada migración debe ser atómica y representar un único cambio lógico (similar a un commit de Git).
    *   **Nomenclatura:** Los nombres de las migraciones deben ser descriptivos, usando el formato `verbo_sustantivo` (ej. `add_user_role`, `create_product_variants`).
*   **Convenciones de Nomenclatura (`schema.prisma`):**
    *   **Modelos:** `PascalCase`, singular (ej. `Product`, `User`).
    *   **Campos:** `camelCase` (ej. `firstName`, `createdAt`).
    *   **Relaciones (Uno a Muchos):** El lado "uno" usa plural (ej. `posts`), el lado "muchos" usa singular (ej. `author`).

### 7. Testing

*   **Filosofía:** Se sigue el principio de la "Pirámide de Pruebas", priorizando las pruebas unitarias, seguidas de pruebas de integración y finalmente unas pocas pruebas E2E de alto nivel.
*   **Pruebas Unitarias y de Integración (Vitest):**
    *   **Objetivo:** Probar la lógica de negocio crítica de forma aislada.
    *   **Prioridades:** 
        1.  Funciones de `utils`.
        2.  Lógica de negocio en Svelte Stores.
        3.  Endpoints y `actions` en `+page.server.ts` (simulando la BD).
    *   **Ubicación:** Los archivos de prueba (`*.test.ts`) se colocan junto a los archivos que prueban.
*   **Pruebas End-to-End (Playwright):**
    *   **Objetivo:** Validar los flujos de usuario críticos de principio a fin.
    *   **Flujos Críticos a Cubrir:**
        1.  Registro e inicio de sesión de usuario.
        2.  Añadir un producto al carrito.
        3.  Creación de un producto desde el panel de administración.
    *   **Ubicación:** Los archivos de prueba E2E residen en el directorio `tests/e2e/`.
*   **Convenciones de Nomenclatura:** Las pruebas seguirán un formato descriptivo: `describe('modulo', () => { it('debería [hacer algo] cuando [condición]', ...) });`

### 8. Calidad de Código y Herramientas

*   **Linter:** Se utilizará **ESLint** para detectar y corregir problemas en el código de forma proactiva.
*   **Formateador:** Se utilizará **Prettier** para mantener un estilo de código consistente y formateado automáticamente en todo el proyecto.
*   **Hooks de Git:** Se configurará un hook de pre-commit (con Husky) para ejecutar automáticamente el linter y el formateador antes de cada commit, asegurando que solo se suba código que cumpla con nuestros estándares de calidad.

### 9. Despliegue y Entornos

*   **Plataforma de Despliegue:** La aplicación se desplegará en **Vercel**.
*   **Entornos:**
    *   **Desarrollo (Local):** Se ejecuta localmente con `npm run dev`.
    *   **Producción (Vercel):** El despliegue se activará automáticamente al hacer push a la rama `main` del repositorio de Git.
