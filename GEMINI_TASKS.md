# Tareas del Proyecto PupiCrochet

Este documento registra el progreso y las próximas tareas del proyecto, gestionadas por Gemini.

## Tareas Completadas:

1.  **Análisis Inicial del Proyecto:** Identificación de tecnologías (SvelteKit, Vite, TypeScript, Prisma, Tailwind CSS) y estructura general.
2.  **Implementación del Carrito de Compras (Funcionalidad Básica):**
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

## Tareas Pendientes (Orden de Prioridad):

1.  **Implementar Confirmación de Correo Electrónico:** Enviar un enlace de verificación al correo del usuario tras el registro.
2.  **Proceso de Compra:** Crear un flujo de checkout completo.
3.  **Panel de Administración:** Desarrollar una interfaz para gestionar productos, pedidos, etc.
