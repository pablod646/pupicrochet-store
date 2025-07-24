# Tareas del Proyecto PupiCrochet

Este documento registra el progreso y las próximas tareas del proyecto, gestionadas por Gemini.

## Tareas Pendientes (Orden de Prioridad):

### 0. Refactorización Post-Auditoría

**Descripción:** Aplicar los cambios identificados en `PROJECT_AUDIT.md` para limpiar y estandarizar el código base antes de añadir nuevas funcionalidades.

**Tareas Principales:**
- [x] 0.1 **Dependencias:** Mover las dependencias de desarrollo (`tailwindcss`, `@types/*`, etc.) a `devDependencies` en `package.json` y eliminar `@types/uuid`.
- [x] 0.2 **Componentes de Layout:** Extraer el Header y el Footer de `src/routes/+layout.svelte` a sus propios componentes en `src/lib/components/layout/`.
- [x] 0.3 **Lógica de Categorías:** Refactorizar la lógica duplicada de carga de jerarquía de categorías a una única función en `src/lib/server/queries/categories.ts`.
- [x] 0.4 **Servicio de Carrito:** Extraer la lógica compleja de `addToCart` a un nuevo módulo de servicio en `src/lib/server/services/cart.service.ts`.
- [x] 0.5 **Componente de Categorías:** Fusionar `CategoryItem.svelte` y `CategoryTreeItem.svelte` en un único componente `CategoryNode.svelte`.
- [x] 0.6 **Selector de Categorías:** Refactorizar `CategorySelector.svelte` para que sea más declarativo y no manipule el DOM directamente.

### 1. Implementar Validación de Datos Robusta

**Descripción:** Integrar `zod` para la definición de esquemas de validación y `sveltekit-superforms` para gestionar los formularios de manera segura y eficiente, mejorando la experiencia del usuario y la fiabilidad del código.

**Archivos Relevantes:**
*   `src/routes/register/+page.svelte`: Se refactorizará para usar el helper de formulario de `sveltekit-superforms`.
*   `src/routes/register/+page.server.ts`: Se modificará para usar `zod` y `sveltekit-superforms` en la lógica del `action`.
*   `src/lib/schemas/auth.ts`: (Archivo nuevo) Se creará para alojar los esquemas de `zod` relacionados con la autenticación (registro, login).
*   `package.json`: Se actualizará con las nuevas dependencias.

**Tareas Principales:**
- [ ] 1.0 Configuración e Instalación de Dependencias
- [ ] 2.0 Creación del Esquema de Validación para Registro
- [ ] 3.0 Refactorización del Backend del Formulario (Server Action)
- [ ] 4.0 Refactorización del Frontend del Formulario (Componente Svelte)
- [ ] 5.0 Verificación y Pruebas

2.  **Refuerzo de Autenticación:** Evaluar e implementar una librería como `lucia-auth`.
3.  **Backend para Carga de Imágenes:** Permitir la subida de archivos de imagen desde el panel de administración.
3.  **Backend para Carga de Imágenes:** Permitir la subida de archivos de imagen desde el panel de administración.

### 4. Implementar Variantes de Producto

**Descripción:** Desarrollar la funcionalidad para que los productos puedan tener múltiples variantes (ej. por tamaño, color), cada una con su propio SKU, precio y nivel de stock.

**Archivos Relevantes (Potenciales):**
*   `prisma/schema.prisma`: Se añadirán nuevos modelos para `VariantType`, `VariantValue`, `ProductVariant`, etc.
*   `src/routes/admin/products/new/+page.server.ts` y `+page.svelte`: Se modificarán para permitir la creación de variantes.
*   `src/routes/admin/products/[slug]/edit/+page.server.ts` y `+page.svelte`: Se modificarán para permitir la edición de variantes.
*   `src/routes/productos/[slug]/+page.svelte`: Se actualizará para mostrar un selector de variantes al cliente.
*   `src/lib/components/admin/ProductVariantManager.svelte`: (Archivo nuevo) Un componente para gestionar la creación y edición de variantes en el panel de admin.

**Tareas Principales:**
- [ ] 4.1 Diseño y Migración del Modelo de Datos en Prisma.
- [ ] 4.2 CRUD para Tipos y Valores de Variantes en el Panel de Admin (ej. "Color": "Rojo", "Verde").
- [ ] 4.3 Integración en la Creación/Edición de Productos para generar SKU de variantes.
- [ ] 4.4 Modificación de la Página de Producto para mostrar y seleccionar variantes.
- [ ] 4.5 Ajuste de la lógica del Carrito para manejar SKUs de variantes específicas.

5.  **Panel de Cliente / Área de "Mi Cuenta":** Crear la sección para que los usuarios gestionen su perfil, direcciones e historial de pedidos.
6.  **Implementar Confirmación de Correo Electrónico:** Una funcionalidad molecular importante para la gestión de usuarios.
7.  **Funcionalidades de la Cuenta de Usuario (Seguridad):** Implementar el reseteo de contraseña.
8.  **Proceso de Compra (Checkout):** Construir el flujo completo de compra.
9.  **Funcionalidad de Ordenamiento de Productos:** Añadir opciones de ordenamiento a la página de productos.
10. **Reseñas de Productos:** Permitir a los usuarios dejar calificaciones y comentarios.
11. **Mejoras en la Página de Inicio (Homepage):** Una vez que todas las funcionalidades críticas estén en su lugar, nos enfocaremos en el diseño de la página de inicio.
12. **Optimización del Estado Global:** Tarea de refactorización técnica.
13. **Implementar Estrategia de Testing:** Aunque está al final de la lista, idealmente las pruebas se irán añadiendo a medida que se desarrollan las funcionalidades.

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
        *   Se han creado los endpoints (`+page.server.ts`) para las operaciones CRUD de `VariantType` y `Value`.
        *   Se han desarrollado los componentes Svelte (`+page.svelte`) para la interfaz de usuario de gestión de `VariantType`s y `Value`s en el panel de administración (`/admin/variant-types` y `/admin/variant-types/[id]/variant-values`).
        *   Se ha actualizado la barra lateral de administración (`AdminSidebar.svelte`) para incluir un enlace a la gestión de variantes.
    *   **Integración en Creación/Edición de Productos:**
        *   Se han actualizado los `+page.server.ts` de creación (`/admin/products/new`) y edición (`/admin/products/[slug]/edit`) de productos para cargar los `VariantType`s y `Value`s disponibles, y para manejar el guardado/actualización de `ProductVariant`s.
        *   Se ha creado un componente Svelte reutilizable (`ProductVariantManager.svelte`) para gestionar la selección de tipos de variantes, la adición de valores de variantes (existentes o nuevos), la generación dinámica de combinaciones de variantes de producto, y la edición de SKU, precio, stock e imagen para cada `ProductVariant`.
        *   Se ha integrado `ProductVariantManager.svelte` en las páginas de creación y edición de productos.
    *   **Dependencias:** Se han instalado las dependencias `uuid` y `sveltekit-superforms`.