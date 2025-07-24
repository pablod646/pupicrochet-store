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
