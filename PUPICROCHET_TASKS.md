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

---
### A. Establecer Automatización y Calidad Continua (CI)

**Descripción:** Configurar un pipeline de Integración Continua (CI) usando GitHub Actions para automatizar las verificaciones de calidad en cada commit y pull request. Esto asegura que el código base se mantenga saludable y consistente.

- [x] **A.1 Crear Workflow de CI**
    - [x] A.1.1 Crear el archivo `.github/workflows/ci.yml`.
    - [x] A.1.2 Configurar el workflow para que se dispare en eventos `push` y `pull_request` a la rama `main`.
- [x] **A.2 Añadir Jobs de Verificación**
    - [x] A.2.1 Añadir un job para instalar dependencias (`npm ci`).
    - [x] A.2.2 Añadir un paso para ejecutar el linter (`npm run lint`).
    - [x] A.2.3 Añadir un paso para verificar el formato del código (`npm run format:check`).
    - [x] A.2.4 Añadir un paso para ejecutar las pruebas (`npm run test`).
- [x] **A.3 Proteger la Rama Principal**
    - [ ] A.3.1 Configurar reglas de protección para la rama `main` en GitHub, requiriendo que el workflow de CI pase antes de poder hacer merge.

---
### B. Implementar Gestión de Variables de Entorno

**Descripción:** Establecer un sistema robusto para manejar secretos y configuraciones específicas del entorno (desarrollo, producción) usando archivos `.env`. Es un prerrequisito para la Tarea 3 (Auth) y el despliegue.

- [x] **B.1 Configuración de .env**
    - [x] B.1.1 Crear un archivo `.env.example` en la raíz del proyecto con todas las variables de entorno necesarias (ej. `DATABASE_URL`, `AUTH_SECRET`).
    - [x] B.1.2 Añadir `.env` y `.env.*.local` al archivo `.gitignore` para evitar subir secretos al repositorio.
- [x] **B.2 Integración en SvelteKit**
    - [x] B.2.1 Utilizar los módulos `$env/static/private` y `$env/static/public` de SvelteKit para acceder a las variables de forma segura.
    - [x] B.2.2 Documentar el proceso de configuración de entorno en el `README.md`.

---
### C. Crear Script de Poblado de Base de Datos (Seeding)

**Descripción:** Crear un script de "seeding" con Prisma para poblar la base de datos con datos de prueba (categorías, productos, usuario admin). Esto agiliza el desarrollo y las pruebas.

- [x] **C.1 Configurar Prisma Seed**
    - [x] C.1.1 Añadir la configuración `prisma.seed` al `package.json`.
    - [x] C.1.2 Crear el archivo `prisma/seed.ts`.
- [x] **C.2 Implementar Lógica de Seeding**
    - [x] C.2.1 Escribir la lógica en `prisma/seed.ts` para crear categorías de ejemplo.
    - [x] C.2.2 Añadir la creación de productos de ejemplo, asociándolos a las categorías.
    - [x] C.2.3 Añadir la creación de un usuario administrador de prueba.
- [x] **C.3 Ejecución y Verificación**
    - [x] C.3.1 Ejecutar `npx prisma db seed` y verificar que la base de datos se puebla correctamente.

---
### D. Implementar Manejo de Errores Global

**Descripción:** Centralizar el manejo de errores de la aplicación para presentar páginas de error amigables al usuario y facilitar el logging y debugging en el servidor.

- [ ] **D.1 Hook `handleError`**
    - [ ] D.1.1 Implementar el hook `handleError` en `src/hooks.server.ts`.
    - [ ] D.1.2 Configurar un sistema de logging (ej. `console.error` por ahora) para capturar los detalles del error en el servidor.
- [ ] **D.2 Páginas de Error Personalizadas**
    - [ ] D.2.1 Crear un componente `src/lib/components/Error.svelte` para mostrar mensajes de error.
    - [ ] D.2.2 Crear la ruta `src/routes/+error.svelte` para capturar errores inesperados y mostrar el componente `Error`.
    - [ ] D.2.3 Diseñar una página 404 personalizada en `+error.svelte` que se muestre cuando el status sea 404.

---
### E. Adelantar Configuración de Infraestructura de Testing

**Descripción:** Aunque la Tarea 12 cubre una estrategia de testing completa, es crucial establecer la infraestructura básica ahora para que las nuevas funcionalidades (como la validación en Tarea 2) nazcan con pruebas.

- [ ] **E.1 Configuración de Vitest**
    - [ ] E.1.1 Asegurar que `vitest.config.ts` esté correctamente configurado para Svelte.
    - [ ] E.1.2 Crear una base de datos de prueba separada (ej. `test.db`) y configurar un script para aplicarle las migraciones antes de ejecutar las pruebas.
- [ ] **E.2 Configuración de Playwright**
    - [ ] E.2.1 Verificar la configuración de Playwright y los scripts en `package.json`.
    - [ ] E.2.2 Crear un flujo de prueba E2E básico (ej. visitar la página de inicio) para asegurar que el setup funciona.

---
### F. Configurar Hooks de Git con Husky y lint-staged

**Descripción:** Automatizar la verificación de calidad de código localmente antes de cada commit. Esto complementa la CI (Tarea A) y previene que código mal formateado o con errores de linting llegue al repositorio.

- [ ] **F.1 Instalación y Configuración**
    - [ ] F.1.1 Instalar `husky` y `lint-staged` como dependencias de desarrollo.
    - [ ] F.1.2 Ejecutar `npx husky init` para inicializar la configuración de Husky.
- [ ] **F.2 Crear Hook Pre-Commit**
    - [ ] F.2.1 Crear el archivo de hook `.husky/pre-commit`.
    - [ ] F.2.2 Añadir el comando `npx lint-staged` al hook `pre-commit`.
- [ ] **F.3 Configurar lint-staged**
    - [ ] F.3.1 Añadir la configuración de `lint-staged` al `package.json`.
    - [ ] F.3.2 Configurar `lint-staged` para que ejecute `prettier --write` y `eslint` en los archivos `.ts` y `.svelte` que estén en "stage".

---
### G. Mejorar la Documentación del Proyecto (README.md)

**Descripción:** Reemplazar el `README.md` genérico por uno que describa el proyecto PupiCrochet, sus tecnologías y los pasos para que un desarrollador pueda ponerlo en marcha.

- [ ] **G.1 Escribir Descripción del Proyecto**
    - [ ] G.1.1 Añadir una descripción clara de lo que es PupiCrochet Store.
    - [ ] G.1.2 Listar las tecnologías principales utilizadas (SvelteKit, Prisma, Tailwind, etc.).
- [ ] **G.2 Añadir Guía de Instalación**
    - [ ] G.2.1 Detallar los pasos: clonar repositorio, `npm install`.
    - [ ] G.2.2 Explicar cómo crear el archivo `.env` a partir de `.env.example` (de la Tarea B).
- [ ] **G.3 Añadir Guía de Base de Datos**
    - [ ] G.3.1 Añadir instrucciones para ejecutar las migraciones (`npx prisma migrate dev`).
    - [ ] G.3.2 Añadir instrucciones para poblar la base de datos (`npx prisma db seed`) (de la Tarea C).
- [ ] **G.4 Listar Scripts Disponibles**
    - [ ] G.4.1 Documentar los scripts principales en `package.json` (`dev`, `build`, `test`, `lint`, `format:check`).

---
### H. Configurar Alias de Rutas (Path Aliases)

**Descripción:** Configurar alias para las rutas de importación comunes (`$lib`, `$components`, etc.) para mejorar la legibilidad y mantenibilidad del código.

- [ ] **H.1 Configurar `tsconfig.json`**
    - [ ] H.1.1 Abrir `tsconfig.json` y localizar la propiedad `compilerOptions.paths`.
    - [ ] H.1.2 Añadir alias para las rutas más comunes. Como mínimo:
        - `$lib`: `src/lib` (normalmente ya está)
        - `$components/*`: `src/lib/components/*`
        - `$server/*`: `src/lib/server/*`
        - `$schemas/*`: `src/lib/schemas/*`
- [ ] **H.2 Actualizar Código Existente (Opcional)**
    - [ ] H.2.1 Realizar una búsqueda global para reemplazar algunas de las importaciones relativas más complejas por los nuevos alias.
- [ ] **H.3 Verificación**
    - [ ] H.3.1 Ejecutar `npm run check` para asegurar que TypeScript resuelve los nuevos alias correctamente.

---
### I. Fortalecer la Configuración de TypeScript

**Descripción:** Añadir flags de compilador más estrictos a `tsconfig.json` para detectar posibles errores en tiempo de compilación y mejorar la limpieza y robustez del código.

- [ ] **I.1 Actualizar `tsconfig.json`**
    - [ ] I.1.1 Añadir `"noUnusedLocals": true` a `compilerOptions`.
    - [ ] I.1.2 Añadir `"noUnusedParameters": true` a `compilerOptions`.
    - [ ] I.1.3 Añadir `"noImplicitReturns": true` a `compilerOptions`.
    - [ ] I.1.4 Añadir `"exactOptionalPropertyTypes": true` a `compilerOptions`.
- [ ] **I.2 Verificación y Corrección**
    - [ ] I.2.1 Ejecutar `npm run check` para identificar cualquier error existente introducido por las nuevas reglas.
    - [ ] I.2.2 Corregir los errores reportados para cumplir con la nueva configuración estricta.

---
### J. Estandarizar Respuestas de la API del Servidor

**Descripción:** Definir una estructura de respuesta estándar y helpers para todas las funciones `load` y `actions` del servidor. Esto hará que el manejo de datos y errores en el cliente sea más predecible y robusto.

- [ ] **J.1 Definir Tipos de Respuesta**
    - [ ] J.1.1 Crear el archivo `src/lib/types/api.types.ts`.
    - [ ] J.1.2 Definir los tipos `ApiSuccessResponse<T>` y `ApiErrorResponse` para encapsular las respuestas.
        *   Ejemplo: `{ success: true; data: T; }` y `{ success: false; error: { message: string; code?: string; }; }`.
    - [ ] J.1.3 Definir un tipo `ApiResponse<T>` que sea la unión de los dos anteriores.
- [ ] **J.2 Crear Helpers de Respuesta**
    - [ ] J.2.1 Crear el archivo `src/lib/server/api.ts`.
    - [ ] J.2.2 Implementar una función `jsonSuccess<T>(data: T, init?: ResponseInit)` que devuelva una `Response` con una `ApiSuccessResponse`.
    - [ ] J.2.3 Implementar una función `jsonError(message: string, status: number, code?: string)` que devuelva una `Response` con una `ApiErrorResponse`.
- [ ] **J.3 Documentar y Adoptar**
    - [ ] J.3.1 Actualizar la documentación (ej. `README.md`) para indicar que todas las respuestas de la API deben usar estos helpers.
    - [ ] J.3.2 Refactorizar un `action` existente (ej. `addToCart`) para usar los nuevos helpers como prueba de concepto.

---
### K. Implementar Logging Estructurado del Lado del Servidor

**Descripción:** Configurar un sistema de logging estructurado (JSON) para el servidor. Esto reemplaza los `console.log` básicos y prepara la aplicación para un monitoreo y depuración efectivos en producción.

- [ ] **K.1 Elegir e Instalar Librería de Logging**
    - [ ] K.1.1 Investigar y elegir una librería de logging ligera y moderna (ej. `pino`).
    - [ ] K.1.2 Instalar la librería como dependencia.
- [ ] **K.2 Crear Servicio de Logger**
    - [ ] K.2.1 Crear el archivo `src/lib/server/logger.service.ts`.
    - [ ] K.2.2 Configurar una instancia del logger, asegurando que escriba en formato JSON.
    - [ ] K.2.3 Exportar la instancia del logger para ser usada en toda la aplicación del servidor.
- [ ] **K.3 Integrar con el Manejo de Errores**
    - [ ] K.3.1 En el hook `handleError` de `src/hooks.server.ts` (Tarea D), reemplazar `console.error` con una llamada al nuevo servicio de logger para registrar los errores de forma estructurada.

---
### L. Establecer Fundamentos de Accesibilidad (a11y)

**Descripción:** Integrar herramientas y prácticas para asegurar que la aplicación sea accesible desde el principio, cumpliendo con los estándares de la WCAG.

- [ ] **L.1 Linter de Accesibilidad**
    - [ ] L.1.1 Instalar el plugin `eslint-plugin-jsx-a11y` (funciona con Svelte).
    - [ ] L.1.2 Configurar las reglas recomendadas en `.eslintrc.cjs`.
- [ ] **L.2 Auditoría Inicial**
    - [ ] L.2.1 Ejecutar el linter en el código existente y corregir los errores de bajo esfuerzo.
    - [ ] L.2.2 Auditar manualmente la navegación por teclado en componentes clave (Header, botones, inputs).
- [ ] **L.3 Establecer Prácticas**
    - [ ] L.3.1 Documentar en el `README.md` o en una guía de contribución la importancia de usar HTML semántico (ej. `<button>` en lugar de `<div onclick>`).
    - [ ] L.3.2 Asegurar que los componentes de formulario (Tarea 1.4) incluyan etiquetas (`<label>`) asociadas correctamente.

---
### M. Configurar un Entorno de Componentes con Storybook

**Descripción:** Instalar y configurar Storybook para desarrollar, probar y documentar los componentes de la UI de forma aislada. Esto acelera el desarrollo y garantiza la consistencia visual.

- [ ] **M.1 Instalación y Configuración**
    - [ ] M.1.1 Ejecutar `npx storybook@latest init` para autoconfigurar Storybook para SvelteKit.
    - [ ] M.1.2 Asegurar que la configuración de Storybook (`.storybook/main.ts`) cargue la configuración de Tailwind CSS.
- [ ] **M.2 Crear Primeras "Stories"**
    - [ ] M.2.1 Crear un archivo `src/lib/components/ui/Button.story.svelte` para un componente de botón básico.
    - [ ] M.2.2 Escribir "stories" para los diferentes estados del botón (primario, secundario, deshabilitado).
    - [ ] M.2.3 Crear una "story" para el componente `Header.svelte` para visualizarlo en aislamiento.
- [ ] **M.3 Añadir Scripts a `package.json`**
    - [ ] M.3.1 Verificar que los scripts `storybook` y `build-storybook` estén presentes.

---
### N. Facilitar la Gestión de la Base de Datos (DX)

**Descripción:** Añadir un script para lanzar Prisma Studio, una GUI que facilita la visualización y manipulación de la base de datos durante el desarrollo.

- [ ] **N.1 Añadir Script a `package.json`**
    - [ ] N.1.1 Añadir un nuevo script: `"db:studio": "prisma studio"`.
- [ ] **N.2 Documentación**
    - [ ] N.2.1 Añadir el nuevo script a la sección de scripts disponibles en el `README.md` (Tarea G).

---
### 1. Establecer y Mantener Consistencia de Estilos y UI

**Descripción:** Asegurar que la aplicación siga un sistema de diseño coherente basado en Tailwind UI, implementando el modo oscuro y manteniendo la convención de clases definida.

- [ ] **1.1 Revisar Configuración de Tailwind CSS**
    - [ ] 1.1.1 Verificar `tailwind.config.js` para asegurar que el modo oscuro esté configurado correctamente (`darkMode: 'class'` o `darkMode: 'media'`).
    - [ ] 1.1.2 Confirmar que las rutas de archivos de Tailwind estén correctas.
- [ ] **1.2 Implementar Modo Oscuro**
    - [ ] 1.2.1 Asegurar que los estilos `dark:` de Tailwind se apliquen correctamente en los componentes existentes y nuevos.
    - [ ] 1.2.2 Probar la alternancia del modo oscuro (si hay un toggle) o la detección automática del sistema.
- [ ] **1.3 Establecer Convenciones de Clases**
    - [ ] 1.3.1 Crear o actualizar una guía interna sobre el orden y uso de las clases de Tailwind.
    - [ ] 1.3.2 Realizar una revisión inicial de componentes clave para asegurar la adherencia a la convención.
- [ ] **1.4 Crear Componentes Base/Reutilizables (si aplica)**
    - [ ] 1.4.1 Identificar patrones de UI comunes (botones, inputs, tarjetas) y crear componentes Svelte reutilizables que encapsulen los estilos de Tailwind UI.
    - [ ] 1.4.2 Asegurar que estos componentes sean accesibles y personalizables.
- [ ] **1.5 Auditoría de Consistencia Visual**
    - [ ] 1.5.1 Realizar una auditoría visual de las páginas y componentes existentes para identificar inconsistencias de diseño.
    - [ ] 1.5.2 Priorizar y corregir las inconsistencias más notorias.
- [ ] **1.6 Verificación y Pruebas**
    - [ ] 1.6.1 Realizar pruebas manuales en diferentes navegadores y dispositivos para asegurar la consistencia visual.
    - [ ] 1.6.2 Considerar pruebas visuales automatizadas para componentes críticos.

---
### 2. Implementar Validación de Datos Robusta

**Descripción:** Integrar `zod` y `sveltekit-superforms` para la gestión de formularios, empezando por el de registro.

- [ ] **2.1 Configuración e Instalación**
    - [ ] 2.1.1 Instalar `zod`, `sveltekit-superforms` y `@sveltejs/adapter-auto`.
    - [ ] 2.1.2 Verificar la instalación en `package.json`.
- [ ] **2.2 Esquema de Validación para Registro**
    - [ ] 2.2.1 Crear `src/lib/schemas/auth.schema.ts`.
    - [ ] 2.2.2 Definir y exportar `registerSchema` con `zod`.
    - [ ] 2.2.3 Crear y escribir pruebas unitarias en `auth.schema.test.ts`.
    - [ ] 2.2.4 Ejecutar `npm run test` para verificar las pruebas del esquema.
- [ ] **2.3 Refactorizar Backend de Registro**
    - [ ] 2.3.1 Usar `superValidate` en la función `load` de `register/+page.server.ts`.
    - [ ] 2.3.2 Refactorizar el `action` de registro para usar `superValidate`.
- [ ] **2.4 Refactorizar Frontend de Registro**
    - [ ] 2.4.1 Usar `superForm` en `register/+page.svelte`.
    - [ ] 2.4.2 Reemplazar `<form>` y los inputs con los helpers de `superForm`.
    - [ ] 2.4.3 Mostrar errores de validación por campo.
- [ ] **2.5 Verificación y Pruebas E2E**
    - [ ] 2.5.1 Realizar prueba manual del flujo de registro.
    - [ ] 2.5.2 Actualizar y ejecutar la prueba E2E `register.spec.ts`.

---
### 3. Refuerzo de Autenticación

**Descripción:** Reemplazar el sistema de autenticación actual basado en cookies por una solución más segura y robusta como `lucia-auth`.

- [ ] **3.1 Instalación y Configuración**
    - [ ] 3.1.1 Instalar `lucia-auth` y su adaptador para Prisma.
    - [ ] 3.1.2 Inicializar Lucia en un nuevo archivo `src/lib/server/auth.ts`.
- [ ] **3.2 Adaptación del Modelo de Datos**
    - [ ] 3.2.1 Modificar `schema.prisma` para añadir los modelos `Session` y `Key` requeridos por Lucia.
    - [ ] 3.2.2 Ejecutar `prisma migrate dev` para aplicar los cambios.
- [ ] **3.3 Refactorizar Flujo de Registro**
    - [ ] 3.3.1 Modificar el `action` de registro para crear un usuario y una sesión con Lucia.
- [ ] **3.4 Refactorizar Flujo de Login**
    - [ ] 3.4.1 Modificar el `action` de login para validar credenciales y crear una sesión con Lucia.
- [ ] **3.5 Refactorizar Hooks y Logout**
    - [ ] 3.5.1 Actualizar `hooks.server.ts` para usar el manejador de sesiones de Lucia.
    - [ ] 3.5.2 Modificar el `action` de logout para invalidar la sesión de Lucia.
- [ ] **3.6 Verificación y Pruebas**
    - [ ] 3.6.1 Probar manualmente los flujos de registro, login y logout.
    - [ ] 3.6.2 Actualizar y ejecutar las pruebas E2E relacionadas.

---
### 4. Backend para Carga de Imágenes

**Descripción:** Implementar la capacidad de subir archivos de imagen desde el panel de administración en lugar de solo URLs de texto.

- [ ] **4.1 Estrategia de Almacenamiento**
    - [ ] 4.1.1 Decidir una estrategia de almacenamiento (local para desarrollo, un servicio como Cloudinary/S3 para producción).
- [ ] **4.2 Refactorizar Formulario de Producto**
    - [ ] 4.2.1 Modificar el formulario en `admin/products/new/+page.svelte` para usar `<input type="file">`.
- [ ] **4.3 Implementar Lógica de Subida**
    - [ ] 4.3.1 Modificar el `action` de creación de producto para procesar `FormData` con archivos.
    - [ ] 4.3.2 Escribir la lógica para subir el archivo al destino elegido.
    - [ ] 4.3.3 Guardar la URL pública del archivo en el modelo `ProductImage`.
- [ ] **4.4 Verificación**
    - [ ] 4.4.1 Probar manualmente la subida de una imagen al crear un producto.

---
### 5. Implementar Variantes de Producto

**Descripción:** Desarrollar la funcionalidad para que los productos puedan tener múltiples variantes (ej. por tamaño, color), cada una con su propio SKU, precio y nivel de stock.

- [ ] **5.1 Modelo de Datos**
    - [ ] 5.1.1 Añadir modelos `VariantType`, `VariantValue`, `ProductVariant` a `schema.prisma`.
    - [ ] 5.1.2 Ejecutar `prisma migrate dev`.
- [ ] **5.2 CRUD para Tipos de Variantes**
    - [ ] 5.2.1 Crear rutas y lógica para gestionar `VariantType` y `VariantValue` en el panel de admin.
- [ ] **5.3 Integración en Formulario de Producto**
    - [ ] 5.3.1 Crear `ProductVariantManager.svelte` para la gestión de variantes.
    - [ ] 5.3.2 Integrar el manager en las páginas de creación/edición de productos.
- [ ] **5.4 Lógica de Carrito y Página de Producto**
    - [ ] 5.4.1 Modificar la página de producto para mostrar y seleccionar variantes.
    - [ ] 5.4.2 Ajustar la lógica del carrito para manejar SKUs de variantes específicas.

---
### 6. Panel de Cliente / Área de "Mi Cuenta"

**Descripción:** Crear una sección dedicada para los usuarios registrados (`/cuenta`) que les permita gestionar su perfil, direcciones e historial de pedidos.

- [ ] **6.1 Estructura Básica del Área de Cliente**
    - [ ] 6.1.1 Crear el directorio `src/routes/cuenta`.
    - [ ] 6.1.2 Crear `src/routes/cuenta/+layout.svelte` y `+page.svelte` (dashboard básico).
    - [ ] 6.1.3 Proteger la ruta `/cuenta` para usuarios autenticados.
- [ ] **6.2 Gestión de Perfil de Usuario**
    - [ ] 6.2.1 Crear `src/routes/cuenta/perfil/+page.svelte` y `+page.server.ts`.
    - [ ] 6.2.2 Crear esquema de validación `updateProfileSchema` en `src/lib/schemas/user.schema.ts`.
    - [ ] 6.2.3 Implementar la carga y actualización del perfil en `+page.server.ts`.
    - [ ] 6.2.4 Crear `ProfileForm.svelte` para la interfaz de usuario.
- [ ] **6.3 Gestión de Direcciones**
    - [ ] 6.3.1 Modificar `prisma/schema.prisma` para añadir el modelo `Address`.
    - [ ] 6.3.2 Ejecutar `prisma migrate dev`.
    - [ ] 6.3.3 Crear `src/routes/cuenta/direcciones/+page.svelte` y `+page.server.ts`.
    - [ ] 6.3.4 Crear esquema de validación `addressSchema` en `src/lib/schemas/user.schema.ts`.
    - [ ] 6.3.5 Implementar CRUD para direcciones.
    - [ ] 6.3.6 Crear `AddressForm.svelte`.
- [ ] **6.4 Historial de Pedidos**
    - [ ] 6.4.1 Modificar `prisma/schema.prisma` para añadir los modelos `Order` y `OrderItem` (si no existen).
    - [ ] 6.4.2 Ejecutar `prisma migrate dev`.
    - [ ] 6.4.3 Crear `src/routes/cuenta/pedidos/+page.svelte` y `+page.server.ts`.
    - [ ] 6.4.4 Implementar la carga del historial de pedidos del usuario.
- [ ] **6.5 Verificación y Pruebas**
    - [ ] 6.5.1 Realizar pruebas manuales de todas las funcionalidades del área de cliente.
    - [ ] 6.5.2 Crear/actualizar pruebas E2E para los flujos críticos del cliente.

---
### 7. Implementar Confirmación de Correo Electrónico

**Descripción:** Añadir un paso de verificación por correo electrónico durante el registro para confirmar la autenticidad de la dirección de correo del usuario.

- [ ] **7.1 Actualizar Modelo de Usuario**
    - [ ] 7.1.1 Añadir campos `emailVerified` (Booleano, por defecto `false`) y `emailVerificationToken` (String, único, opcional) a `User` en `prisma/schema.prisma`.
    - [ ] 7.1.2 Ejecutar `prisma migrate dev` para aplicar los cambios.
- [ ] **7.2 Servicio de Envío de Correos**
    - [ ] 7.2.1 Crear `src/lib/server/email.ts` con una función para enviar correos.
    - [ ] 7.2.2 Crear una plantilla básica para el correo de verificación.
- [ ] **7.3 Generación y Envío de Token**
    - [ ] 7.3.1 Modificar el `action` de registro para generar un `emailVerificationToken`, guardarlo y enviar el correo.
- [ ] **7.4 Endpoint de Verificación**
    - [ ] 7.4.1 Crear `src/routes/auth/verify-email/[token]/+page.server.ts`.
    - [ ] 7.4.2 En la función `load`, validar el token, marcar el correo como verificado y limpiar el token.
- [ ] **7.5 Restricción de Acceso**
    - [ ] 7.5.1 Implementar un middleware para restringir el acceso hasta que el correo esté verificado.
- [ ] **7.6 Verificación y Pruebas**
    - [ ] 7.6.1 Realizar pruebas manuales del flujo completo de registro y verificación.
    - [ ] 7.6.2 Crear/actualizar pruebas E2E para el flujo de verificación de correo.

---
### 8. Funcionalidades de la Cuenta de Usuario (Seguridad)

**Descripción:** Implementar funcionalidades de seguridad adicionales para la cuenta de usuario, como el reseteo de contraseña y la gestión de sesiones activas.

- [ ] **8.1 Reseteo de Contraseña (Solicitud)**
    - [ ] 8.1.1 Crear `src/routes/auth/forgot-password/+page.svelte` y `+page.server.ts`.
    - [ ] 8.1.2 Implementar la lógica para que el usuario solicite un reseteo de contraseña.
    - [ ] 8.1.3 Añadir campos de token de reseteo a `User` en `prisma/schema.prisma`.
    - [ ] 8.1.4 Ejecutar `prisma migrate dev`.
- [ ] **8.2 Reseteo de Contraseña (Confirmación)**
    - [ ] 8.2.1 Crear `src/routes/auth/reset-password/[token]/+page.svelte` y `+page.server.ts`.
    - [ ] 8.2.2 Implementar la lógica para que el usuario establezca una nueva contraseña.
- [ ] **8.3 Cambio de Contraseña (Desde el Perfil)**
    - [ ] 8.3.1 Crear `src/routes/cuenta/seguridad/+page.svelte` y `+page.server.ts`.
    - [ ] 8.3.2 Implementar la funcionalidad para que un usuario autenticado pueda cambiar su contraseña.
    - [ ] 8.3.3 Crear esquema de validación `changePasswordSchema`.
- [ ] **8.4 Gestión de Sesiones Activas (Opcional)**
    - [ ] 8.4.1 Mostrar las sesiones activas del usuario en `cuenta/seguridad`.
    - [ ] 8.4.2 Implementar la opción de cerrar sesiones.
- [ ] **8.5 Verificación y Pruebas**
    - [ ] 8.5.1 Realizar pruebas manuales de los flujos de reseteo y cambio de contraseña.
    - [ ] 8.5.2 Crear/actualizar pruebas E2E para los flujos de seguridad.

---
### 9. Proceso de Compra (Checkout)

**Descripción:** Implementar el flujo completo de checkout, permitiendo a los usuarios revisar su carrito, introducir información de envío y pago, y finalizar la compra.

- [ ] **9.1 Actualizar Modelo de Datos**
    - [ ] 9.1.1 Añadir modelos `Order`, `OrderItem`, `ShippingAddress` y `PaymentDetails` a `prisma/schema.prisma`.
    - [ ] 9.1.2 Ejecutar `prisma migrate dev`.
- [ ] **9.2 Estructura de Rutas de Checkout**
    - [ ] 9.2.1 Crear el directorio `src/routes/checkout`.
    - [ ] 9.2.2 Crear `src/routes/checkout/+page.svelte` y `+page.server.ts`.
- [ ] **9.3 Formulario de Dirección de Envío**
    - [ ] 9.3.1 Crear un componente `ShippingForm.svelte`.
    - [ ] 9.3.2 Implementar la validación del formulario.
    - [ ] 9.3.3 Guardar la dirección.
- [ ] **9.4 Selección de Método de Pago (Simulado)**
    - [ ] 9.4.1 Crear un componente `PaymentForm.svelte` (inicialmente simulado).
    - [ ] 9.4.2 Recopilar la información de pago.
- [ ] **9.5 Resumen del Pedido**
    - [ ] 9.5.1 Crear un componente `OrderSummary.svelte`.
- [ ] **9.6 Lógica de Creación de Pedido**
    - [ ] 9.6.1 Implementar el `action` para procesar la finalización del pedido.
    - [ ] 9.6.2 Crear un servicio para manejar la lógica de creación de pedidos.
- [ ] **9.7 Página de Confirmación de Pedido**
    - [ ] 9.7.1 Redirigir al usuario a una página de confirmación (`/checkout/success`).
- [ ] **9.8 Verificación y Pruebas**
    - [ ] 9.8.1 Realizar pruebas manuales del flujo completo de checkout.
    - [ ] 9.8.2 Crear/actualizar pruebas E2E para el flujo de compra.

---
### 10. Funcionalidad de Ordenamiento de Productos

**Descripción:** Implementar opciones de ordenamiento para los productos en el catálogo (ej. por precio, nombre, fecha de adición).

- [ ] **10.1 Modificar Función de Consulta de Productos**
    - [ ] 10.1.1 Actualizar la función que obtiene productos para aceptar parámetros de ordenamiento.
    - [ ] 10.1.2 Implementar la lógica de ordenamiento en la consulta de Prisma.
- [ ] **10.2 Interfaz de Usuario para Ordenamiento**
    - [ ] 10.2.1 Crear un componente `ProductSort.svelte`.
    - [ ] 10.2.2 Integrar `ProductSort.svelte` en la página de productos.
    - [ ] 10.2.3 Asegurar que la selección del usuario actualice los parámetros de la URL.
- [ ] **10.3 Lógica del Servidor para Ordenamiento**
    - [ ] 10.3.1 Leer los parámetros de ordenamiento de la URL en `+page.server.ts`.
    - [ ] 10.3.2 Pasar estos parámetros a la función de consulta de productos.
- [ ] **10.4 Verificación y Pruebas**
    - [ ] 10.4.1 Realizar pruebas manuales para verificar el ordenamiento.
    - [ ] 10.4.2 Crear/actualizar pruebas E2E para el flujo de ordenamiento.

---
### 11. Reseñas de Productos

**Descripción:** Permitir a los usuarios autenticados dejar reseñas y calificaciones para los productos.

- [ ] **11.1 Actualizar Modelo de Datos**
    - [ ] 11.1.1 Añadir el modelo `Review` a `prisma/schema.prisma`.
    - [ ] 11.1.2 Ejecutar `prisma migrate dev`.
- [ ] **11.2 Formulario de Reseñas**
    - [ ] 11.2.1 Crear un componente `ProductReviewForm.svelte`.
    - [ ] 11.2.2 Implementar la validación del formulario.
    - [ ] 11.2.3 Integrar el formulario en la página de detalle del producto.
- [ ] **11.3 Lógica del Servidor para Reseñas**
    - [ ] 11.3.1 Implementar un `action` para recibir y guardar las reseñas.
    - [ ] 11.3.2 Implementar la carga de reseñas existentes en la función `load`.
- [ ] **11.4 Mostrar Reseñas**
    - [ ] 11.4.1 Crear un componente `ProductReviewList.svelte`.
    - [ ] 11.4.2 Integrar `ProductReviewList.svelte` en la página de detalle del producto.
- [ ] **11.5 Cálculo de Calificación Promedio (Opcional)**
    - [ ] 11.5.1 Añadir un campo `averageRating` al modelo `Product`.
    - [ ] 11.5.2 Implementar un mecanismo para actualizar automáticamente la calificación.
- [ ] **11.6 Verificación y Pruebas**
    - [ ] 11.6.1 Realizar pruebas manuales del flujo de reseñas.
    - [ ] 11.6.2 Crear/actualizar pruebas E2E para el flujo de reseñas.

---
### 12. Mejoras en la Página de Inicio (Homepage)

**Descripción:** Diseñar y construir una página de inicio atractiva que muestre los productos destacados, categorías principales y otra información relevante para el usuario.

- [ ] **12.1 Diseño de la Estructura de la Página de Inicio**
    - [ ] 12.1.1 Definir las secciones clave de la homepage.
    - [ ] 12.1.2 Crear un boceto o wireframe de la disposición.
- [ ] **12.2 Implementar Sección Hero**
    - [ ] 12.2.1 Crear un componente `HeroSection.svelte`.
    - [ ] 12.2.2 Integrarlo en `src/routes/+page.svelte`.
- [ ] **12.3 Mostrar Productos Destacados**
    - [ ] 12.3.1 Cargar una selección de productos destacados en `+page.server.ts`.
    - [ ] 12.3.2 Crear un componente `FeaturedProducts.svelte`.
    - [ ] 12.3.3 Integrar `FeaturedProducts.svelte` en la página de inicio.
- [ ] **12.4 Mostrar Categorías Principales**
    - [ ] 12.4.1 Cargar las categorías principales en `+page.server.ts`.
    - [ ] 12.4.2 Crear un componente `CategoryShowcase.svelte`.
    - [ ] 12.4.3 Integrar `CategoryShowcase.svelte` en la página de inicio.
- [ ] **12.5 Optimización de Carga y Rendimiento**
    - [ ] 12.5.1 Asegurar que la carga de datos sea eficiente.
    - [ ] 12.5.2 Optimizar las imágenes y otros activos.
- [ ] **12.6 Verificación y Pruebas**
    - [ ] 12.6.1 Realizar pruebas manuales de la homepage.
    - [ ] 12.6.2 Crear/actualizar pruebas E2E para la homepage.

---
### 13. Optimización del Estado Global

**Descripción:** Mejorar la gestión del estado global de la aplicación, asegurando que los datos compartidos se manejen de manera eficiente, reactiva y persistente.

- [ ] **13.1 Revisar y Centralizar Stores Existentes**
    - [ ] 13.1.1 Auditar `userStore.ts` y `cartStore.ts`.
    - [ ] 13.1.2 Consolidar lógica de estado duplicada.
- [ ] **13.2 Persistencia del Estado**
    - [ ] 13.2.1 Evaluar y, si es necesario, implementar la persistencia del estado en `localStorage`.
- [ ] **13.3 Optimización de Carga Inicial**
    - [ ] 13.3.1 Asegurar que los datos iniciales se carguen eficientemente en `+layout.server.ts`.
    - [ ] 13.3.2 Minimizar las llamadas a la base de datos.
- [ ] **13.4 Reactividad y Actualizaciones**
    - [ ] 13.4.1 Verificar que los componentes se actualicen reactivamente.
    - [ ] 13.4.2 Optimizar para evitar re-renderizados innecesarios.
- [ ] **13.5 Manejo de Errores en Stores**
    - [ ] 13.5.1 Implementar un manejo robusto de errores para las operaciones de estado.
- [ ] **13.6 Verificación y Pruebas**
    - [ ] 13.6.1 Realizar pruebas unitarias para los stores y pruebas de integración para los componentes.
    - [ ] 13.6.2 Crear/actualizar pruebas E2E para los flujos que dependen del estado global.

---
### 14. Implementar Estrategia de Testing

**Descripción:** Establecer y aplicar una estrategia de pruebas integral (unitaria, integración y E2E) para asegurar la calidad y estabilidad del código.

- [ ] **14.1 Configuración de Entornos de Prueba**
    - [ ] 14.1.1 Asegurar que Vitest y Playwright estén correctamente configurados.
    - [ ] 14.1.2 Definir scripts npm para ejecutar las pruebas.
- [ ] **14.2 Pruebas Unitarias**
    - [ ] 14.2.1 Identificar y escribir pruebas unitarias para funciones y lógica de negocio.
- [ ] **14.3 Pruebas de Integración**
    - [ ] 14.3.1 Identificar y escribir pruebas de integración para interacciones entre módulos.
- [ ] **14.4 Pruebas End-to-End (E2E)**
    - [ ] 14.4.1 Identificar y escribir pruebas E2E para los flujos de usuario críticos.
- [ ] **14.5 Integración Continua (CI)**
    - [ ] 14.5.1 Configurar el pipeline de CI para ejecutar pruebas automáticamente.
- [ ] **14.6 Cobertura de Código (Opcional)**
    - [ ] 14.6.1 Configurar herramientas de cobertura de código para medir el código cubierto.

## Tareas Completadas:

(La lista de tareas completadas permanece igual)