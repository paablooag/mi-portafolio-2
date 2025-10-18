---
title: "CSS Grid: Layouts modernos sin complicaciones"
description: "Aprende CSS Grid con ejemplos prácticos para crear layouts responsivos y complejos de forma sencilla."
pubDate: 2025-10-18T00:00:00.000Z
tags: ["CSS", "Grid", "Layout", "Frontend"]
---

# CSS Grid: Layouts modernos sin complicaciones

CSS Grid revolucionó cómo creamos layouts. Aquí te muestro cómo lo uso.

## Grid básico

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
```

```html
<div class="container">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

## Layout de página completa

```css
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  gap: 20px;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

## Responsive sin media queries

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}
```

Auto-fit vs Auto-fill:
- **auto-fit**: Colapsa tracks vacíos
- **auto-fill**: Mantiene tracks vacíos

## Grid con Tailwind

```html
<!-- Grid básico -->
<div class="grid grid-cols-3 gap-4">
  <!-- items -->
</div>

<!-- Responsive -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <!-- items -->
</div>

<!-- Auto-fit -->
<div class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
  <!-- items -->
</div>
```

## Layouts avanzados

### Dashboard

```css
.dashboard {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
}

.widget-large {
  grid-column: span 8;
}

.widget-small {
  grid-column: span 4;
}

.widget-full {
  grid-column: 1 / -1;
}
```

### Masonry (Pinterest-style)

```css
.masonry {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 20px;
  gap: 10px;
}

.item {
  grid-row: span var(--row-span);
}
```

```javascript
// Calcular row-span dinámicamente
items.forEach(item => {
  const height = item.offsetHeight
  const rowSpan = Math.ceil(height / 20)
  item.style.setProperty('--row-span', rowSpan)
})
```

## Grid + Flexbox

```css
.card {
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
```

## Centrar con Grid

```css
.center {
  display: grid;
  place-items: center;
  min-height: 100vh;
}
```

## Grid para formularios

```css
.form {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 16px;
  align-items: center;
}

.form-full {
  grid-column: 1 / -1;
}
```

```html
<form class="form">
  <label>Nombre</label>
  <input type="text">
  
  <label>Email</label>
  <input type="email">
  
  <button class="form-full">Enviar</button>
</form>
```

## Named lines

```css
.layout {
  display: grid;
  grid-template-columns:
    [full-start] 1fr
    [content-start] minmax(0, 1200px) [content-end]
    1fr [full-end];
}

.content {
  grid-column: content;
}

.full {
  grid-column: full;
}
```

## Subgrid

```css
.parent {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.child {
  display: grid;
  grid-column: span 2;
  grid-template-columns: subgrid;
}
```

## Responsive patterns

### Stack to Grid

```css
.container {
  display: grid;
  gap: 20px;
}

@media (min-width: 768px) {
  .container {
    grid-template-columns: 2fr 1fr;
  }
}
```

### Holy Grail Layout

```css
.holy-grail {
  display: grid;
  grid-template: auto 1fr auto / auto 1fr auto;
  min-height: 100vh;
}

.header { grid-column: 1 / 4; }
.left-sidebar { grid-column: 1; }
.content { grid-column: 2; }
.right-sidebar { grid-column: 3; }
.footer { grid-column: 1 / 4; }
```

## DevTools

Chrome/Firefox DevTools tienen visualizador de Grid:

1. Inspeccionar elemento
2. Click en badge "grid"
3. Ver líneas, áreas, gaps

## Mi uso diario

```css
/* Layout base que uso siempre */
.app-layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

/* Galleries responsive */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

/* Cards con footer al fondo */
.card {
  display: grid;
  grid-template-rows: auto 1fr auto;
}
```

## Conclusión

CSS Grid simplifica layouts complejos. Combínalo con Flexbox para resultados increíbles.

