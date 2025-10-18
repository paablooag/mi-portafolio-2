---
title: "Core Web Vitals: Guía definitiva para desarrolladores"
description: "Aprende a optimizar LCP, FID y CLS para mejorar el rendimiento web y el posicionamiento SEO de tu sitio."
pubDate: 2025-10-20T00:00:00.000Z
tags: ["Performance", "SEO", "Web Development", "Google"]
---

# Core Web Vitals: Guía definitiva para desarrolladores

Los Core Web Vitals son factores de ranking cruciales. Aquí te muestro cómo optimizarlos.

## ¿Qué son los Core Web Vitals?

Tres métricas que Google usa para medir la experiencia del usuario:

1. **LCP** - Largest Contentful Paint
2. **FID** - First Input Delay (ahora INP)
3. **CLS** - Cumulative Layout Shift

## 1. LCP - Largest Contentful Paint

**Meta**: < 2.5 segundos

### Cómo optimizar

```html
<!-- Precarga recursos críticos -->
<link rel="preload" as="image" href="/hero.jpg">

<!-- Usa formatos modernos -->
<picture>
  <source srcset="hero.avif" type="image/avif">
  <source srcset="hero.webp" type="image/webp">
  <img src="hero.jpg" alt="Hero">
</picture>
```

**Técnicas:**
- Optimiza imágenes
- Usa CDN
- Implementa caché
- Minimiza CSS/JS
- Server-Side Rendering

## 2. FID/INP - Interactividad

**Meta**: < 100ms (FID), < 200ms (INP)

### Cómo optimizar

```javascript
// ❌ Malo: Bloquea el main thread
function processLargeData() {
  for (let i = 0; i < 1000000; i++) {
    // procesamiento pesado
  }
}

// ✅ Bueno: Usa Web Workers
const worker = new Worker('processor.js')
worker.postMessage(data)
```

**Técnicas:**
- Code splitting
- Lazy loading
- Web Workers para tareas pesadas
- Debounce/throttle en eventos
- Reduce JavaScript

## 3. CLS - Layout Shift

**Meta**: < 0.1

### Cómo optimizar

```css
/* ✅ Reserva espacio para imágenes */
img {
  aspect-ratio: 16 / 9;
  width: 100%;
  height: auto;
}

/* ✅ Usa font-display */
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom.woff2');
  font-display: swap;
}
```

**Técnicas:**
- Define width/height en imágenes
- Reserva espacio para ads/embeds
- Usa font-display: swap
- Evita insertar contenido dinámico arriba
- Usa transforms para animaciones

## Herramientas de medición

1. **Lighthouse** - En Chrome DevTools
2. **PageSpeed Insights** - Online
3. **Search Console** - Datos reales
4. **Web Vitals Extension** - Chrome

## Mi checklist de optimización

```javascript
// nuxt.config.ts
export default {
  image: {
    formats: ['avif', 'webp'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    }
  },
  
  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true
    }
  }
}
```

## Resultados en [Wegow](https://wegow.com)

Después de optimizar Core Web Vitals:

- LCP: 4.2s → 1.8s ✅
- FID: 180ms → 45ms ✅
- CLS: 0.25 → 0.05 ✅
- Tráfico orgánico: +40% 📈

## Conclusión

Los Core Web Vitals no son solo para SEO. Mejoran la experiencia real de tus usuarios.

