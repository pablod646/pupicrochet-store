# Tareas del Proyecto PupiCrochet

Este documento registra el progreso y las próximas tareas del proyecto, gestionadas por Gemini.

## Tareas Pendientes (Orden de Prioridad):

1.  **Depuración de Error de Variantes:** Investigar y resolver el `TypeError: Cannot read properties of undefined (reading 'variantType')` que persiste al intentar acceder al gestor de variantes desde el administrador.
2.  **Mejoras en la Página de Inicio (Homepage):** Diseñar y construir una página de inicio atractiva que muestre productos destacados, categorías principales y promociones.
3.  **Panel de Cliente / Área de "Mi Cuenta":**
    *   Crear una sección dedicada para los usuarios registrados (`/cuenta`).
    *   **Gestión de Perfil:** Permitir al usuario actualizar su nombre y datos de contacto.
    *   **Gestión de Direcciones:** Permitir al usuario guardar y administrar múltiples direcciones de envío.
    *   **Historial de Pedidos:** Crear una página para que los usuarios vean el estado y los detalles de sus pedidos anteriores.
4.  **Implementar Confirmación de Correo Electrónico:** Enviar un enlace de verificación al correo del usuario tras el registro.
5.  **Proceso de Compra (Checkout):** Crear un flujo de compra completo, desde el carrito hasta la confirmación del pedido, permitiendo seleccionar direcciones guardadas.
6.  **Funcionalidades de la Cuenta de Usuario (Seguridad):**
    *   **Reseteo de Contraseña:** Implementar la funcionalidad de "Olvidé mi contraseña".
7.  **Reseñas de Productos:** Permitir a los usuarios dejar calificaciones y comentarios en los productos que han comprado.
8.  **Implementar Estrategia de Testing:**
    *   **Pruebas Unitarias y de Integración:** Utilizar Vitest para probar la lógica de negocio clave.
    *   **Pruebas End-to-End (E2E):** Utilizar Playwright para validar los flujos de usuario críticos (registro, compra, etc.).
9.  **Validación de Datos Robusta:**
    *   Implementar `zod` para la definición de esquemas de validación.
    *   Integrar `sveltekit-superforms` o similar para gestionar formularios de manera segura y eficiente.
10. **Refuerzo de Autenticación:**
    *   Evaluar e implementar una librería como `lucia-auth` para una gestión más segura y completa de sesiones y roles.
11. **Optimización del Estado Global:**
    *   Revisar y asegurar que el estado compartido (ej. carrito de compras) se gestiona eficientemente con Svelte Stores.
12. **Backend para Carga de Imágenes:**
    *   Modificar el `+page.server.ts` del formulario de productos para procesar y guardar archivos de imagen subidos por el usuario, en lugar de solo URLs de texto.
13. **Funcionalidad de Ordenamiento de Productos:**
    *   Implementar la lógica en `productos/+page.server.ts` para que el `select` de ordenamiento funcione.
    *   Añadir opciones como "Más vendidos" y "Más nuevos" (requerirá registrar fechas de creación y/o contador de ventas en el modelo `Product`).

## Tareas Completadas:

1.  **Análisis Inicial del Proyecto:** Identificación de tecnologías (SvelteKit, Vite, TypeScript, Prisma, Tailwind CSS) y estructura general.
2.  **Implementación del Carrito deCompras (Funcionalidad Básica):**
    *   Actualización del esquema de Prisma (`Cart`, `CartItem`).
    *   Migración de la base de datos.
    *   Funcionalidad para añadir productos al carrito desde la página de detalle.
    *   Página de visualización del carrito (`/carrito`) con listado de productos, cantidades y total.
    *   Funcionalidad para actualizar la cantidad de un producto en el carrito (automático).
    *   Funcionalidad para eliminar productos del carrito.
    *   Contador de productos distintos en el carrito en el encabezado.
3.  **Mejora de la Página de Detalle del Producto:**
    *   Añadido selector de cantidad para el producto.
    *   Implementada galería de imágenes (con miniaturas seleccionables).
    *   Añadida sección de productos relacionados.
    *   Añadida información adicional del producto (dimensiones, materiales).
4.  **Corrección de Errores:**
    *   Manejo de caso de producto no encontrado en la página de detalle.
5.  **Gestión de Usuarios:**
    *   Añadido modelo `User` a `prisma/schema.prisma`.
    *   Implementadas rutas de registro (`/register`), inicio de sesión (`/auth`) y cierre de sesión (`/logout`).
    *   Integración de `bcrypt` para el hash de contraseñas.
    *   Asociación del carrito de compras con el usuario autenticado, incluyendo la fusión de carritos anónimos al iniciar sesión.
    *   Resolución de errores y advertencias de tipo en los componentes de SvelteKit.
    *   Implementación de feedback visual para el usuario durante el registro (éxito, errores de validación, errores inesperados).
    *   Mejora del diseño del formulario de registro para que coincida con el estilo de la aplicación.
6.  **Panel de Administración:**
    *   Implementación de autenticación y autorización basada en roles (`UserRole` enum en Prisma).
    *   Configuración de rutas protegidas para el panel de administración (`/admin`).
    *   Implementación de operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para productos y usuarios en el panel de administración.
    *   Añadida navegación básica al panel de administración.
7.  **Traducción a Español:**
    *   Traducción de todos los textos visibles en los formularios de inicio de sesión, registro y gestión de productos del panel de administración al español.

8.  **URLs de Productos Amigables para SEO (Slugs):**
    *   Implementación de slugs únicos para productos basados en el nombre.
    *   Actualización del esquema de Prisma para incluir el campo `slug`.
    *   Lógica para generar y asegurar la unicidad de los slugs al crear/actualizar productos.
    *   Refactorización de rutas dinámicas de productos para usar `[slug]` en lugar de `[id]`.
    *   Actualización de enlaces internos y componentes para utilizar los slugs en las URLs, manteniendo el `id` como identificador interno.

9.  **Categorías de Productos (Jerárquicas):**
    *   Refactorización del esquema de Prisma para un modelo `Category` único con `parentId` para jerarquía.
    *   Relación directa de `Product` con `Category`.
    *   Generación y aplicación de migración de base de datos (eliminación de `Subcategory`).
    *   Actualización de formularios de creación y edición de productos para usar el selector de categoría jerárquico.
    *   Asignación de categoría "Default" a productos existentes sin categoría.
    *   Implementación de la interfaz de administración de categorías (CRUD para categorías jerárquicas, con formulario unificado para creación y selección jerárquica de categoría padre).
    *   Implementación de la funcionalidad de edición de categorías.
    *   Corrección de la visualización de categorías para mostrar un único árbol jerárquico.

10. **Descubrimiento de Productos:**
    *   **Barra Lateral de Filtros:** Implementada en la página `/productos` para filtrar por categoría.
    *   **Búsqueda Global:** Añadida barra de búsqueda en la cabecera para encontrar productos por nombre.
    *   **Paginación:** Añadida paginación a la lista de productos para mejorar el rendimiento y la navegación.

11. **Mejoras en la Página de Productos:**
    *   Implementación de búsqueda de productos insensible a mayúsculas y minúsculas para bases de datos SQLite.
    *   Resolución del error `ReferenceError: window is not defined` durante la renderización del lado del servidor, pasando los parámetros de búsqueda del servidor al cliente.
    *   Implementación de la visualización de categorías anidadas en la barra lateral de filtros de productos.
    *   Adición de un contador de productos junto a cada categoría en la barra lateral de filtros.
    *   Corrección de varios errores de TypeScript y advertencias de accesibilidad en los componentes de Svelte.

12. **Categorías de Productos Múltiples:**
    *   Actualización del esquema de Prisma para una relación de muchos a muchos entre `Product` y `Category`.
    *   Migración de la base de datos para reflejar el nuevo esquema.
    *   Modificación de la lógica del backend para manejar múltiples categorías en la creación y edición de productos.
    *   Reemplazo del selector de categoría por un campo de entrada con etiquetas en los formularios de administración de productos.

13. **Mejora de Estilos Visuales:**
    *   Actualización y refinamiento de los estilos del encabezado (`Header`).
    *   Mejora del diseño del pie de página (`Footer`).
    *   Ajustes en las tarjetas de producto (`ProductCard`) para una apariencia más limpia y moderna.

14. **Gestión de Variantes de Producto:**
    *   **Modelo de Datos:** Se han añadido los modelos `VariantType`, `VariantValue`, `ProductVariant`, `ProductVariantValue` a `prisma/schema.prisma` y se ha actualizado el modelo `Product` con la relación `productVariants`.
    *   **Migración de Base de Datos:** Se ha generado y aplicado una nueva migración para incorporar los modelos de variantes a la base de datos existente, manteniendo los datos.
    *   **Panel de Administración de Variantes:**
        *   Se han creado los endpoints (`+page.server.ts`) para las operaciones CRUD de `VariantType` y `VariantValue`.
        *   Se han desarrollado los componentes Svelte (`+page.svelte`) para la interfaz de usuario de gestión de `VariantType`s y `VariantValue`s en el panel de administración (`/admin/variant-types` y `/admin/variant-types/[id]/variant-values`).
        *   Se ha actualizado la barra lateral de administración (`AdminSidebar.svelte`) para incluir un enlace a la gestión de variantes.
    *   **Integración en Creación/Edición de Productos:**
        *   Se han actualizado los `+page.server.ts` de creación (`/admin/products/new`) y edición (`/admin/products/[slug]/edit`) de productos para cargar los `VariantType`s y `VariantValue`s disponibles, y para manejar el guardado/actualización de `ProductVariant`s.
        *   Se ha creado un componente Svelte reutilizable (`ProductVariantManager.svelte`) para gestionar la selección de tipos de variantes, la adición de valores de variantes (existentes o nuevos), la generación dinámica de combinaciones de variantes de producto, y la edición de SKU, precio, stock e imagen para cada `ProductVariant`.
        *   Se ha integrado `ProductVariantManager.svelte` en las páginas de creación y edición de productos.
    *   **Dependencias:** Se han instalado las dependencias `uuid` y `sveltekit-superforms`.