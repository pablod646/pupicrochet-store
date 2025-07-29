# PupiCrochet Store

Bienvenido a PupiCrochet Store, una tienda online de amigurumis y productos tejidos a mano. Este proyecto es una aplicación de comercio electrónico full-stack construida con SvelteKit, Prisma y Tailwind CSS.

## Tecnologías Utilizadas

- **Framework:** SvelteKit
- **Base de Datos:** Prisma con SQLite
- **Estilos:** Tailwind CSS
- **Testing:** Playwright para E2E y Vitest para unitarios
- **Linting:** ESLint y Prettier
- **Hooks de Git:** Husky y lint-staged

## Guía de Instalación

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/tu-usuario/pupicrochet-store.git
    cd pupicrochet-store
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env` a partir del archivo `.env.example` y rellena las variables necesarias.

    ```bash
    cp .env.example .env
    ```

4.  **Ejecutar las migraciones de la base de datos:**

    ```bash
    npx prisma migrate dev
    ```

5.  **Poblar la base de datos con datos de prueba:**
    ```bash
    npx prisma db seed
    ```

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Compila la aplicación para producción.
- `npm run preview`: Previsualiza la compilación de producción.
- `npm run test`: Ejecuta las pruebas unitarias.
- `npm run test:e2e`: Ejecuta las pruebas E2E.
- `npm run lint`: Comprueba el código con ESLint y Prettier.
- `npm run format`: Formatea el código con Prettier.
- `npm run db:studio`: Abre Prisma Studio para ver y editar la base de datos.

## Guías de Desarrollo

### Accesibilidad (a11y)

La accesibilidad es una prioridad en PupiCrochet Store. Al desarrollar nuevos componentes o modificar existentes, es crucial adherirse a los siguientes principios:

-   **HTML Semántico:** Utiliza siempre los elementos HTML apropiados para su propósito. Por ejemplo, usa `<button>` para botones, `<a href="...">` para enlaces, y elementos de encabezado (`<h1>` a `<h6>`) para la estructura del contenido. Evita el uso de `<div>` o `<span>` con manejadores de eventos (`onclick`) cuando un elemento semántico nativo pueda cumplir la misma función.
-   **Atributos ARIA:** Emplea atributos ARIA (Accessible Rich Internet Applications) solo cuando el HTML semántico no sea suficiente para transmitir el significado o la interacción de un componente a las tecnologías de asistencia. Asegúrate de que los atributos ARIA se utilicen correctamente y no dupliquen la semántica nativa.
-   **Navegación por Teclado:** Todos los elementos interactivos deben ser accesibles y operables mediante el teclado (usando `Tab`, `Enter`, `Space`, etc.). Presta atención al orden de tabulación lógico.
-   **Contenido Alternativo:** Proporciona texto alternativo (`alt`) para todas las imágenes significativas y etiquetas (`<label>`) asociadas a los campos de formulario.

Adherirse a estas prácticas garantiza que la aplicación sea usable por el mayor número posible de personas, incluyendo aquellas con discapacidades.
