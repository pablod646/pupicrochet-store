# PupiCrochet Store

Bienvenido a PupiCrochet Store, una tienda online de amigurumis y productos tejidos a mano. Este proyecto es una aplicación de comercio electrónico full-stack construida con SvelteKit, Prisma y Tailwind CSS.

## Tecnologías Utilizadas

*   **Framework:** SvelteKit
*   **Base de Datos:** Prisma con SQLite
*   **Estilos:** Tailwind CSS
*   **Testing:** Playwright para E2E y Vitest para unitarios
*   **Linting:** ESLint y Prettier
*   **Hooks de Git:** Husky y lint-staged

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

*   `npm run dev`: Inicia el servidor de desarrollo.
*   `npm run build`: Compila la aplicación para producción.
*   `npm run preview`: Previsualiza la compilación de producción.
*   `npm run test`: Ejecuta las pruebas unitarias.
*   `npm run test:e2e`: Ejecuta las pruebas E2E.
*   `npm run lint`: Comprueba el código con ESLint y Prettier.
*   `npm run format`: Formatea el código con Prettier.
*   `npm run db:studio`: Abre Prisma Studio para ver y editar la base de datos.