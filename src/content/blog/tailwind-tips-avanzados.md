---
title: "10 tips avanzados de Tailwind CSS que debes conocer"
description: "Técnicas avanzadas de Tailwind CSS que uso diariamente para escribir código más limpio y mantenible."
pubDate: 2025-10-19T00:00:00.000Z
tags: ["CSS", "Tailwind CSS", "Frontend", "Tips"]
---

# 10 tips avanzados de Tailwind CSS que debes conocer

Tailwind es más poderoso de lo que parece. Aquí mis tips favoritos.

## 1. Arbitrary Values

```html
<!-- Valores exactos cuando los presets no son suficientes -->
<div class="top-[117px] w-[762px]">
  <!-- Basado en diseño exacto de Figma -->
</div>
```

## 2. Grupos anidados

```html
<div class="group/item">
  <div class="group/edit invisible group-hover/item:visible">
    <span class="group-hover/edit:text-gray-700">Edit</span>
  </div>
</div>
```

## 3. Peer styling

```html
<input type="checkbox" class="peer" />
<label class="peer-checked:text-blue-500">
  Label cambia cuando checkbox está marcado
</label>
```

## 4. Container queries

```html
<div class="@container">
  <div class="@lg:grid-cols-3">
    <!-- Responsive basado en contenedor, no viewport -->
  </div>
</div>
```

## 5. Custom utilities

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
      }
    }
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.text-balance': {
          'text-wrap': 'balance',
        },
      })
    }
  ]
}
```

## 6. Variants personalizadas

```javascript
// tailwind.config.js
module.exports = {
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('hocus', ['&:hover', '&:focus'])
      addVariant('optional', '&:optional')
    })
  ]
}
```

```html
<button class="hocus:scale-105">
  Hover o Focus
</button>
```

## 7. @apply con modificadores

```css
.btn {
  @apply px-4 py-2 bg-blue-500 hover:bg-blue-600;
}
```

## 8. Dark mode por clase

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
}
```

```html
<div class="bg-white dark:bg-gray-900">
  <!-- Cambia con clase .dark en html -->
</div>
```

## 9. Gradientes complejos

```html
<div class="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500">
  Degradado triple
</div>
```

## 10. Plugins esenciales

```bash
npm install -D @tailwindcss/forms
npm install -D @tailwindcss/typography
npm install -D @tailwindcss/container-queries
```

## Mi configuración en producción

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{vue,js,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#8B5CF6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

## Conclusión

Tailwind es extremadamente flexible. Estos tips me ahorran horas cada semana.

