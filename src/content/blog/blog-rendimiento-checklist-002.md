---
title: "Rendimiento: checklist en 2025"
description: "Guía breve y accionable sobre rendimiento para aplicar en 2025."
pubDate: 2025-03-02T00:00:00.000Z
tags: ["Portafolio","E-commerce","Arquitectura","CMS"]
---

# Rendimiento: checklist en 2025

Checklist completa de optimización de rendimiento web para 2025. Asegúrate de que tu sitio sea rápido, eficiente y ofrezca una excelente experiencia de usuario.

## Por qué el rendimiento importa

El rendimiento web impacta directamente en:
- **Conversiones**: Cada segundo de retraso reduce conversiones en 7%
- **SEO**: Google usa Core Web Vitals como factor de ranking
- **Experiencia de usuario**: 53% de usuarios abandona sitios que tardan más de 3 segundos
- **Costos**: Menor uso de ancho de banda = menores costos de hosting

## Checklist de Rendimiento Web 2025

### 1. Optimización de Imágenes

```html
<!-- ✅ Imagen optimizada -->
<img 
  src="producto.webp" 
  srcset="producto-400.webp 400w, producto-800.webp 800w"
  sizes="(max-width: 600px) 400px, 800px"
  alt="Producto destacado"
  loading="lazy"
  width="800"
  height="600">

<!-- ❌ Imagen sin optimizar -->
<img src="producto.jpg" alt="Producto">
```

**Checklist:**
- [ ] Imágenes convertidas a WebP o AVIF
- [ ] Lazy loading implementado
- [ ] Dimensiones especificadas (width/height)
- [ ] Responsive images con srcset
- [ ] Compresión aplicada (TinyPNG, ImageOptim)
- [ ] CDN para entrega de imágenes

### 2. JavaScript y CSS

```javascript
// ✅ Code splitting
const LazyComponent = lazy(() => import('./LazyComponent'));

// ✅ Tree shaking
import { specificFunction } from './utils';

// ❌ Importar toda la librería
import * as _ from 'lodash';
```

**Checklist:**
- [ ] JavaScript minificado y comprimido
- [ ] CSS minificado
- [ ] Code splitting implementado
- [ ] Tree shaking configurado
- [ ] Eliminado código no utilizado
- [ ] Bundles optimizados (chunks pequeños)
- [ ] Preload para recursos críticos
- [ ] Defer/async en scripts no críticos

### 3. Caché y Almacenamiento

```javascript
// Service Worker para caché
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

**Checklist:**
- [ ] Headers de caché configurados
- [ ] Service Worker implementado (PWA)
- [ ] Browser caching activado
- [ ] CDN configurado
- [ ] Cache-Control headers optimizados
- [ ] ETags implementados

### 4. Core Web Vitals

#### Largest Contentful Paint (LCP)
**Objetivo: < 2.5 segundos**

```html
<!-- Preload de recursos críticos -->
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="hero-image.webp" as="image">

<!-- DNS prefetch -->
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
```

**Checklist:**
- [ ] LCP < 2.5s
- [ ] Recursos críticos con preload
- [ ] Servidor optimizado (TTFB < 600ms)
- [ ] Imágenes hero optimizadas
- [ ] Fuentes web optimizadas

#### First Input Delay (FID)
**Objetivo: < 100ms**

```javascript
// ✅ Dividir tareas pesadas
setTimeout(() => {
  processHeavyTask();
}, 0);

// ✅ Web Workers
const worker = new Worker('heavy-task.js');
worker.postMessage(data);
```

**Checklist:**
- [ ] FID < 100ms
- [ ] JavaScript no bloqueante
- [ ] Tareas pesadas en Web Workers
- [ ] Event listeners optimizados
- [ ] Menos JavaScript de terceros

#### Cumulative Layout Shift (CLS)
**Objetivo: < 0.1**

```html
<!-- ✅ Dimensiones especificadas -->
<img src="banner.jpg" width="1200" height="600" alt="Banner">

<!-- ✅ Reservar espacio para contenido dinámico -->
<div style="min-height: 300px;">
  <!-- Contenido que se carga después -->
</div>
```

**Checklist:**
- [ ] CLS < 0.1
- [ ] Dimensiones de imágenes especificadas
- [ ] Espacio reservado para anuncios
- [ ] Fuentes con font-display: swap
- [ ] Evitar insertar contenido arriba del fold

### 5. Optimización de Fuentes

```css
/* ✅ Font display optimizado */
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2');
  font-display: swap; /* Muestra texto con fallback mientras carga */
}

/* ✅ Preload de fuentes críticas */
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
```

**Checklist:**
- [ ] Fuentes en formato WOFF2
- [ ] font-display: swap configurado
- [ ] Subset de fuentes (solo caracteres necesarios)
- [ ] Preload de fuentes críticas
- [ ] Fallback fonts definidas

### 6. Optimización de Red

```javascript
// ✅ HTTP/2 Server Push
// Configurado en servidor

// ✅ Compression (gzip/brotli)
// Habilitado en servidor

// ✅ Resource Hints
<link rel="preconnect" href="https://api.example.com">
<link rel="dns-prefetch" href="https://cdn.example.com">
```

**Checklist:**
- [ ] HTTP/2 o HTTP/3 habilitado
- [ ] Compresión gzip/brotli activada
- [ ] Preconnect para dominios externos
- [ ] DNS prefetch para recursos
- [ ] Conexiones persistentes

### 7. Base de Datos y Backend

**Checklist:**
- [ ] Queries optimizadas (índices)
- [ ] Caché de base de datos
- [ ] API responses optimizadas
- [ ] Paginación implementada
- [ ] Lazy loading de datos
- [ ] CDN para assets estáticos

### 8. Monitoreo y Métricas

```javascript
// Web Vitals tracking
import { getCLS, getFID, getLCP } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);
```

**Checklist:**
- [ ] Google Analytics 4 configurado
- [ ] Core Web Vitals trackeados
- [ ] Real User Monitoring (RUM)
- [ ] Alertas de rendimiento configuradas
- [ ] Lighthouse CI en pipeline
- [ ] PageSpeed Insights monitoreado

## Herramientas de Medición

### Automáticas
- **Lighthouse** - Auditoría completa
- **PageSpeed Insights** - Análisis de rendimiento
- **WebPageTest** - Testing avanzado
- **Chrome DevTools** - Performance profiling

### Monitoreo Continuo
- **Google Search Console** - Core Web Vitals
- **New Relic** - APM y RUM
- **Datadog** - Monitoreo de infraestructura
- **Sentry** - Performance monitoring

## Checklist Rápida de Implementación

**Prioridad Alta (esta semana):**
- [ ] Optimizar imágenes (WebP, lazy loading)
- [ ] Minificar CSS y JavaScript
- [ ] Configurar caché del navegador
- [ ] Especificar dimensiones de imágenes
- [ ] Preload recursos críticos

**Prioridad Media (este mes):**
- [ ] Implementar code splitting
- [ ] Optimizar fuentes web
- [ ] Configurar CDN
- [ ] Mejorar TTFB del servidor
- [ ] Implementar Service Worker

**Prioridad Baja (próximos meses):**
- [ ] HTTP/3
- [ ] Advanced caching strategies
- [ ] Web Workers para tareas pesadas
- [ ] Optimización avanzada de base de datos

## Qué hacer ahora

1. **Ejecuta Lighthouse** y anota los 5 problemas más críticos de rendimiento
2. **Optimiza imágenes y recursos estáticos** esta semana (mayor impacto con menor esfuerzo)
3. **Mide el progreso** con GA4 y Search Console para validar mejoras en Core Web Vitals, tiempo de carga y tasa de rebote
