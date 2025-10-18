---
title: "Responsive Design en 2024: Más allá de los breakpoints"
description: "Técnicas modernas de diseño responsive: container queries, fluid typography, y layouts intrínsecos."
pubDate: 2025-10-18T00:00:00.000Z
tags: ["CSS", "Responsive Design", "Frontend", "Modern CSS"]
---

# Responsive Design en 2024: Más allá de los breakpoints

El responsive design ha evolucionado. Estas son las técnicas que uso hoy.

## Container Queries

El futuro ya llegó:

```css
.card-container {
  container-type: inline-size;
  container-name: card;
}

.card {
  display: grid;
  grid-template-columns: 1fr;
}

@container card (min-width: 500px) {
  .card {
    grid-template-columns: 200px 1fr;
  }
}
```

### Con Tailwind

```html
<div class="@container">
  <div class="@lg:flex @lg:gap-4">
    <!-- Responsive basado en el contenedor -->
  </div>
</div>
```

## Fluid Typography

```css
:root {
  /* Escala fluida entre viewports */
  --fs-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --fs-base: clamp(1rem, 0.9rem + 0.5vw, 1.25rem);
  --fs-lg: clamp(1.125rem, 1rem + 0.625vw, 1.5rem);
  --fs-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.875rem);
  --fs-2xl: clamp(1.5rem, 1.3rem + 1vw, 2.25rem);
  --fs-3xl: clamp(1.875rem, 1.6rem + 1.375vw, 3rem);
}

h1 {
  font-size: var(--fs-3xl);
}

p {
  font-size: var(--fs-base);
}
```

### Generador de clamp()

```javascript
function fluidType(minSize, maxSize, minVw = 320, maxVw = 1200) {
  const slope = (maxSize - minSize) / (maxVw - minVw)
  const intercept = minSize - slope * minVw
  
  return `clamp(${minSize}rem, ${intercept}rem + ${slope * 100}vw, ${maxSize}rem)`
}

// Uso
// font-size: ${fluidType(1, 2)}
```

## Fluid Space

```css
:root {
  --space-xs: clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem);
  --space-sm: clamp(0.75rem, 0.6rem + 0.75vw, 1.125rem);
  --space-md: clamp(1rem, 0.8rem + 1vw, 1.5rem);
  --space-lg: clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem);
  --space-xl: clamp(2rem, 1.6rem + 2vw, 3rem);
  --space-2xl: clamp(3rem, 2.4rem + 3vw, 4.5rem);
}

.section {
  padding-block: var(--space-xl);
}
```

## Intrinsic Layouts

### Sidebar Layout

```css
.sidebar-layout {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.sidebar {
  flex-basis: 250px;
  flex-grow: 1;
}

.main {
  flex-basis: 0;
  flex-grow: 999;
  min-width: 50%;
}
```

### Pancake Stack

```css
.layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
```

### Holy Grail

```css
.holy-grail {
  display: grid;
  grid-template: auto 1fr auto / auto 1fr auto;
  min-height: 100vh;
  gap: 1rem;
}

.header { grid-column: 1 / -1; }
.left { grid-row: 2; }
.content { grid-row: 2; min-width: 0; }
.right { grid-row: 2; }
.footer { grid-column: 1 / -1; }

@media (max-width: 768px) {
  .holy-grail {
    grid-template: auto auto 1fr auto auto / 1fr;
  }
  
  .header { grid-row: 1; }
  .left { grid-row: 2; }
  .content { grid-row: 3; }
  .right { grid-row: 4; }
  .footer { grid-row: 5; }
}
```

## Aspect Ratio

```css
.video {
  aspect-ratio: 16 / 9;
  width: 100%;
}

.square {
  aspect-ratio: 1;
}

.portrait {
  aspect-ratio: 3 / 4;
}
```

## Modern Media Queries

### Prefers Color Scheme

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1a1a1a;
    --text: #ffffff;
  }
}
```

### Prefers Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Hover Capabilities

```css
/* Solo aplica hover en dispositivos que lo soporten */
@media (hover: hover) and (pointer: fine) {
  .button:hover {
    background: blue;
  }
}
```

## Responsive Images

```html
<picture>
  <source
    media="(min-width: 1200px)"
    srcset="hero-large.avif"
    type="image/avif">
  <source
    media="(min-width: 768px)"
    srcset="hero-medium.avif"
    type="image/avif">
  <source
    srcset="hero-small.avif"
    type="image/avif">
  <img
    src="hero-small.jpg"
    alt="Hero"
    loading="lazy"
    decoding="async">
</picture>
```

### Con srcset y sizes

```html
<img
  srcset="
    image-320.jpg 320w,
    image-640.jpg 640w,
    image-1280.jpg 1280w
  "
  sizes="
    (max-width: 640px) 100vw,
    (max-width: 1024px) 50vw,
    33vw
  "
  src="image-640.jpg"
  alt="Responsive image">
```

## Mobile-First Approach

```css
/* Base styles para mobile */
.card {
  padding: 1rem;
  display: block;
}

/* Tablet y superior */
@media (min-width: 768px) {
  .card {
    padding: 2rem;
    display: flex;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .card {
    padding: 3rem;
  }
}
```

## Custom Breakpoints

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    }
  }
}
```

## Viewport Units

```css
.hero {
  /* Altura completa, respetando barra de navegación móvil */
  height: 100dvh; /* Dynamic Viewport Height */
}

.modal {
  /* Viewport pequeño (mínimo) */
  min-height: 100svh;
  
  /* Viewport grande (máximo) */
  max-height: 100lvh;
}
```

## Grid Auto-fit vs Auto-fill

```css
/* Auto-fit: Colapsa tracks vacíos */
.gallery-fit {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

/* Auto-fill: Mantiene tracks vacíos */
.gallery-fill {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}
```

## Responsive Tables

```css
@media (max-width: 640px) {
  table, thead, tbody, th, td, tr {
    display: block;
  }
  
  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }
  
  td {
    position: relative;
    padding-left: 50%;
  }
  
  td:before {
    content: attr(data-label);
    position: absolute;
    left: 1rem;
    font-weight: bold;
  }
}
```

## Mi checklist responsive

- [ ] Mobile-first approach
- [ ] Fluid typography (clamp)
- [ ] Flexible images (srcset/sizes)
- [ ] Container queries donde aplique
- [ ] Aspect ratios definidos
- [ ] Touch targets > 44px
- [ ] Reduced motion respetado
- [ ] Tested en dispositivos reales
- [ ] Landscape considerado
- [ ] Fold considerado

## Testing

```javascript
// Viewport sizes para testing
const viewports = [
  { name: 'Mobile S', width: 320 },
  { name: 'Mobile M', width: 375 },
  { name: 'Mobile L', width: 425 },
  { name: 'Tablet', width: 768 },
  { name: 'Laptop', width: 1024 },
  { name: 'Laptop L', width: 1440 },
  { name: 'Desktop', width: 1920 },
]
```

## Conclusión

El responsive moderno va más allá de breakpoints. Usa container queries, fluid design y layouts intrínsecos para experiencias verdaderamente adaptables.

