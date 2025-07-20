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

## Tareas Pendientes (Orden de Prioridad):

1.  **Gestión de Usuarios:** Implementar registro y autenticación.
2.  **Proceso de Compra:** Crear un flujo de checkout completo.
3.  **Panel de Administración:** Desarrollar una interfaz para gestionar productos, pedidos, etc.
