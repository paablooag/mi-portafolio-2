---
title: "De 45 a 98 en Lighthouse: Cómo lo conseguí"
description: "Paso a paso de cómo optimicé un sitio web para obtener 98/100 en Lighthouse Performance."
pubDate: 2025-10-18T00:00:00.000Z
tags: ["Performance", "Lighthouse", "Optimization", "SEO"]
---

# De 45 a 98 en Lighthouse: Cómo lo conseguí

El viaje de optimización que llevé a cabo en un proyecto real.

## Estado inicial

- Performance: 45
- Accessibility: 82
- Best Practices: 79
- SEO: 88

## Diagnóstico

```bash
npm install -g lighthouse
lighthouse https://ejemplo.com --view
```

### Principales problemas

1. Imágenes sin optimizar (4MB+)
2. JavaScript bloqueante
3. CSS no crítico
4. Sin caché
5. Fonts sin optimizar

## Optimización paso a paso

### 1. Imágenes (↑ 20 puntos)

**Antes:**
```html
<img src="hero.jpg" alt="Hero">
```

**Después:**
```html
<picture>
  <source 
    srcset="hero-800.avif 800w, hero-1200.avif 1200w"
    type="image/avif">
  <source 
    srcset="hero-800.webp 800w, hero-1200.webp 1200w"
    type="image/webp">
  <img 
    src="hero-800.jpg"
    srcset="hero-800.jpg 800w, hero-1200.jpg 1200w"
    sizes="(max-width: 800px) 100vw, 800px"
    alt="Hero"
    loading="lazy"
    width="1200"
    height="600">
</picture>
```

**Herramientas:**
- Squoosh.app para conversión
- ImageOptim para compresión
- @nuxt/image en Nuxt

### 2. JavaScript (↑ 15 puntos)

**Code splitting:**
```javascript
// Antes: Todo en bundle principal
import HeavyComponent from './HeavyComponent.vue'

// Después: Lazy loading
const HeavyComponent = defineAsyncComponent(
  () => import('./HeavyComponent.vue')
)
```

**Tree shaking:**
```javascript
// ❌ Importa toda la librería
import _ from 'lodash'

// ✅ Solo lo necesario
import debounce from 'lodash/debounce'
```

### 3. CSS crítico (↑ 8 puntos)

```javascript
// nuxt.config.ts
export default {
  experimental: {
    inlineSSRStyles: false
  },
  nitro: {
    compressPublicAssets: true
  }
}
```

Extraer CSS crítico e inline:
```html
<style>
  /* Critical CSS inline */
  .hero { ... }
</style>
<link rel="stylesheet" href="non-critical.css" media="print" onload="this.media='all'">
```

### 4. Caché (↑ 7 puntos)

```javascript
// netlify.toml
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 5. Fonts (↑ 5 puntos)

```html
<!-- Preload fuentes críticas -->
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>

<style>
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2') format('woff2');
  font-display: swap; /* ← Importante */
}
</style>
```

### 6. Preconexiones (↑ 3 puntos)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://api.ejemplo.com">
```

## Resultado final

- Performance: **98** ⬆️ +53
- Accessibility: **100** ⬆️ +18
- Best Practices: **100** ⬆️ +21
- SEO: **100** ⬆️ +12

## Métricas

- FCP: 0.8s (antes 3.2s)
- LCP: 1.2s (antes 5.8s)
- TBT: 50ms (antes 890ms)
- CLS: 0.02 (antes 0.34)
- SI: 1.5s (antes 4.9s)

## Herramientas usadas

1. **Lighthouse CI** - Automatización
2. **WebPageTest** - Testing detallado
3. **Chrome DevTools** - Coverage, Performance
4. **Bundle Analyzer** - Optimizar bundle
5. **ImageOptim** - Comprimir imágenes

## Checklist final

- [x] Imágenes optimizadas (WebP/AVIF)
- [x] Lazy loading
- [x] Code splitting
- [x] Tree shaking
- [x] CSS crítico inline
- [x] Fonts optimizadas
- [x] Caché configurado
- [x] Preload/Prefetch
- [x] Compresión Gzip/Brotli
- [x] Minificación

## Conclusión

De 45 a 98 en 2 semanas de optimización. Cada punto cuenta para UX y SEO.

