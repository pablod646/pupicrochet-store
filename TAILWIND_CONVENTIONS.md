# Convenciones de Clases de Tailwind CSS

Para mantener la consistencia y legibilidad del código, se establecen las siguientes convenciones para el orden y uso de las clases de Tailwind CSS en este proyecto.

## Orden de Clases

Las clases de Tailwind deben ordenarse de la siguiente manera dentro del atributo `class`:

1.  **Layout:** `container`, `box-sizing`, `display`, `float`, `clear`, `object-fit`, `object-position`, `overflow`, `position`, `top`, `right`, `bottom`, `left`, `visibility`, `z-index`.
2.  **Flexbox & Grid:** `flex`, `flex-direction`, `flex-wrap`, `flex-grow`, `flex-shrink`, `flex-basis`, `justify-content`, `align-items`, `align-content`, `align-self`, `gap`, `grid`, `grid-template-columns`, `grid-template-rows`, `grid-column`, `grid-row`, `grid-auto-flow`, `grid-auto-columns`, `grid-auto-rows`.
3.  **Spacing:** `padding` (`p-`, `pt-`, `pr-`, `pb-`, `pl-`, `px-`, `py-`), `margin` (`m-`, `mt-`, `mr-`, `mb-`, `ml-`, `mx-`, `my-`), `space-x`, `space-y`.
4.  **Sizing:** `width`, `min-width`, `max-width`, `height`, `min-height`, `max-height`.
5.  **Typography:** `font-family`, `font-size`, `font-weight`, `text-align`, `text-color`, `text-decoration`, `text-transform`, `line-height`, `letter-spacing`, `vertical-align`, `whitespace`, `word-break`.
6.  **Backgrounds:** `background-color`, `background-image`, `background-position`, `background-repeat`, `background-size`, `background-attachment`.
7.  **Borders:** `border-width`, `border-color`, `border-style`, `border-radius`, `divide-width`, `divide-color`, `divide-style`, `ring`.
8.  **Effects:** `box-shadow`, `opacity`, `mix-blend-mode`, `background-blend-mode`.
9.  **Filters:** `filter`, `backdrop-filter`.
10. **Interactivity:** `appearance`, `cursor`, `outline`, `pointer-events`, `resize`, `user-select`.
11. **Transitions & Transforms:** `transition-property`, `transition-duration`, `transition-timing-function`, `transition-delay`, `transform`, `transform-origin`, `scale`, `rotate`, `translate`, `skew`.
12. **SVG:** `fill`, `stroke`, `stroke-width`.
13. **Accessibility:** `sr-only`, `not-sr-only`.

## Modificadores

Los modificadores (ej. `hover:`, `focus:`, `md:`, `dark:`) deben aplicarse después de la clase base a la que modifican, siguiendo el mismo orden de categorías. Si hay múltiples modificadores, se recomienda agruparlos por tipo (ej. todos los `hover:` juntos, luego todos los `focus:`).

```html
<!-- Correcto -->
<button class="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg md:px-6 md:py-3 dark:bg-blue-700 dark:hover:bg-blue-900">
  Botón
</button>

<!-- Incorrecto (orden mezclado) -->
<button class="px-4 hover:bg-blue-700 flex py-2 bg-blue-500 items-center">
  Botón
</button>
```

## Clases Condicionales

Cuando se usen clases condicionales (ej. con Svelte `class:` directivas o librerías como `clsx`), el orden de las clases dentro de cada cadena de texto debe seguir las mismas convenciones.

## Justificación

Este orden mejora la legibilidad del código al agrupar propiedades relacionadas y facilita la identificación de estilos aplicados a un elemento. También ayuda a prevenir conflictos de especificidad y a mantener un estilo de codificación uniforme en todo el proyecto.
