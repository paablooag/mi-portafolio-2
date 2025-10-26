---
title: "Performance web y Core Web Vitals: Guía completa de optimización"
description: "Aprende a optimizar el rendimiento web: Core Web Vitals, métricas de performance, herramientas de análisis y técnicas de optimización para desarrolladores frontend."
pubDate: 2025-01-15T00:00:00.000Z
tags: ["Performance", "Core Web Vitals", "Optimización", "Frontend", "SEO"]
---

# Performance web y Core Web Vitals: Guía completa de optimización

El rendimiento web es crucial para el éxito de cualquier aplicación. Te explico cómo optimizar Core Web Vitals y mejorar la experiencia de usuario.

## ¿Qué son los Core Web Vitals?

### Definición y métricas

```markdown
CORE WEB VITALS:
- Métricas esenciales de experiencia de usuario
- Factores de ranking de Google
- Medidas de rendimiento real
- Indicadores de calidad web

MÉTRICAS PRINCIPALES:
- LCP (Largest Contentful Paint): Carga del contenido principal
- FID (First Input Delay): Tiempo de respuesta a la primera interacción
- CLS (Cumulative Layout Shift): Estabilidad visual
- FCP (First Contentful Paint): Primera pintura de contenido
- TTFB (Time to First Byte): Tiempo hasta el primer byte
```

### Umbrales de rendimiento

```markdown
UMBRALES RECOMENDADOS:
- LCP: < 2.5 segundos (bueno), 2.5-4.0s (necesita mejora), > 4.0s (malo)
- FID: < 100ms (bueno), 100-300ms (necesita mejora), > 300ms (malo)
- CLS: < 0.1 (bueno), 0.1-0.25 (necesita mejora), > 0.25 (malo)
- FCP: < 1.8s (bueno), 1.8-3.0s (necesita mejora), > 3.0s (malo)
- TTFB: < 600ms (bueno), 600-1500ms (necesita mejora), > 1500ms (malo)
```

## Herramientas de análisis

### 1. Lighthouse

```bash
# Instalar Lighthouse
npm install -g lighthouse

# Auditar página
lighthouse https://example.com --view

# Auditar con configuración específica
lighthouse https://example.com --config-path=./lighthouse-config.json

# Auditar con métricas específicas
lighthouse https://example.com --only-categories=performance
```

### 2. Web Vitals Extension

```markdown
EXTENSIÓN DE CHROME:
- Medición en tiempo real
- Métricas de Core Web Vitals
- Análisis de rendimiento
- Identificación de problemas
- Recomendaciones de mejora
```

### 3. PageSpeed Insights

```markdown
HERRAMIENTA DE GOOGLE:
- Análisis de rendimiento
- Métricas de Core Web Vitals
- Recomendaciones específicas
- Comparación con sitios similares
- Análisis de campo y laboratorio
```

## Optimización de LCP

### 1. Identificación de LCP

```javascript
// Medición de LCP
new PerformanceObserver((entryList) => {
  const entries = entryList.getEntries();
  const lastEntry = entries[entries.length - 1];
  
  console.log('LCP:', lastEntry.startTime);
  console.log('LCP Element:', lastEntry.element);
}).observe({ entryType: 'largest-contentful-paint', buffered: true });
```

### 2. Optimización de imágenes

```html
<!-- Imagen optimizada -->
<img 
  src="hero-image.webp" 
  alt="Hero image"
  width="800"
  height="600"
  loading="eager"
  fetchpriority="high"
  sizes="(max-width: 768px) 100vw, 800px"
  srcset="hero-image-400.webp 400w, hero-image-800.webp 800w"
>

<!-- Lazy loading para imágenes no críticas -->
<img 
  src="content-image.webp" 
  alt="Content image"
  loading="lazy"
  decoding="async"
>
```

### 3. Optimización de CSS

```css
/* CSS crítico inline */
<style>
  .hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

/* CSS no crítico cargado asíncronamente */
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>
```

### 4. Optimización de JavaScript

```javascript
// Carga asíncrona de JavaScript no crítico
const loadScript = (src) => {
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  document.head.appendChild(script);
};

// Cargar scripts después de LCP
window.addEventListener('load', () => {
  loadScript('/js/non-critical.js');
});

// Code splitting
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// Preload de recursos críticos
const preloadResource = (href, as) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
};

preloadResource('/fonts/main.woff2', 'font');
preloadResource('/images/hero.webp', 'image');
```

## Optimización de FID

### 1. Medición de FID

```javascript
// Medición de FID
new PerformanceObserver((entryList) => {
  const entries = entryList.getEntries();
  entries.forEach(entry => {
    console.log('FID:', entry.processingStart - entry.startTime);
  });
}).observe({ entryType: 'first-input', buffered: true });
```

### 2. Optimización de JavaScript

```javascript
// Debounce de eventos
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle de eventos
const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Uso optimizado
const handleScroll = throttle(() => {
  // Lógica de scroll
}, 16); // 60fps

window.addEventListener('scroll', handleScroll);
```

### 3. Web Workers

```javascript
// main.js
const worker = new Worker('worker.js');

worker.postMessage({ data: largeDataSet });

worker.onmessage = (event) => {
  const result = event.data;
  // Procesar resultado
};

// worker.js
self.onmessage = (event) => {
  const data = event.data.data;
  
  // Procesamiento pesado
  const result = processData(data);
  
  self.postMessage(result);
};
```

### 4. Optimización de eventos

```javascript
// Event delegation
document.addEventListener('click', (event) => {
  if (event.target.matches('.button')) {
    handleButtonClick(event.target);
  }
});

// Passive event listeners
element.addEventListener('scroll', handleScroll, { passive: true });

// Intersection Observer para lazy loading
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadContent(entry.target);
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll('.lazy').forEach(el => {
  observer.observe(el);
});
```

## Optimización de CLS

### 1. Medición de CLS

```javascript
// Medición de CLS
let clsValue = 0;
let clsEntries = [];

new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    if (!entry.hadRecentInput) {
      clsValue += entry.value;
      clsEntries.push(entry);
    }
  }
}).observe({ entryType: 'layout-shift', buffered: true });

console.log('CLS:', clsValue);
```

### 2. Prevención de layout shifts

```css
/* Reservar espacio para imágenes */
img {
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;
}

/* Reservar espacio para contenido dinámico */
.content-placeholder {
  min-height: 200px;
  background: #f0f0f0;
}

/* Establecer dimensiones fijas */
.advertisement {
  width: 300px;
  height: 250px;
  display: block;
}
```

### 3. Optimización de fuentes

```css
/* Preload de fuentes críticas */
@font-face {
  font-family: 'MainFont';
  src: url('/fonts/main.woff2') format('woff2');
  font-display: swap;
}

/* Fallback fonts */
body {
  font-family: 'MainFont', Arial, sans-serif;
}

/* Preload de fuentes */
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
```

### 4. Optimización de contenido dinámico

```javascript
// Reservar espacio para contenido dinámico
const reserveSpace = (element, height) => {
  element.style.minHeight = `${height}px`;
};

// Cargar contenido de forma progresiva
const loadContentProgressively = async () => {
  const container = document.getElementById('content');
  
  // Reservar espacio
  reserveSpace(container, 500);
  
  try {
    const data = await fetch('/api/content');
    const content = await data.json();
    
    // Renderizar contenido
    container.innerHTML = renderContent(content);
  } catch (error) {
    container.innerHTML = '<p>Error cargando contenido</p>';
  }
};
```

## Optimización de FCP

### 1. Medición de FCP

```javascript
// Medición de FCP
new PerformanceObserver((entryList) => {
  const entries = entryList.getEntries();
  const fcp = entries[0];
  console.log('FCP:', fcp.startTime);
}).observe({ entryType: 'paint', buffered: true });
```

### 2. Optimización de recursos críticos

```html
<!-- Preload de recursos críticos -->
<link rel="preload" href="/css/critical.css" as="style">
<link rel="preload" href="/js/critical.js" as="script">
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>

<!-- DNS prefetch -->
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//api.example.com">

<!-- Preconnect -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://api.example.com" crossorigin>
```

### 3. Optimización de renderizado

```css
/* CSS crítico inline */
<style>
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #fff;
  }
  
  .header {
    background: #333;
    color: white;
    padding: 1rem;
  }
  
  .content {
    padding: 2rem;
  }
</style>

/* CSS no crítico cargado asíncronamente */
<link rel="preload" href="/css/non-critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/css/non-critical.css"></noscript>
```

## Optimización de TTFB

### 1. Medición de TTFB

```javascript
// Medición de TTFB
const navigationEntry = performance.getEntriesByType('navigation')[0];
const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
console.log('TTFB:', ttfb);
```

### 2. Optimización del servidor

```javascript
// Node.js con Express
const express = require('express');
const compression = require('compression');
const app = express();

// Compresión
app.use(compression());

// Cache headers
app.use((req, res, next) => {
  if (req.path.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
  }
  next();
});

// Server-side rendering optimizado
app.get('/', (req, res) => {
  const html = renderToString(<App />);
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Mi App</title>
        <link rel="stylesheet" href="/css/critical.css">
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="/js/app.js"></script>
      </body>
    </html>
  `);
});
```

### 3. CDN y caching

```javascript
// Configuración de CDN
const cdnConfig = {
  static: 'https://cdn.example.com',
  images: 'https://images.example.com',
  fonts: 'https://fonts.example.com'
};

// Cache headers optimizados
const setCacheHeaders = (res, maxAge = 31536000) => {
  res.setHeader('Cache-Control', `public, max-age=${maxAge}`);
  res.setHeader('Expires', new Date(Date.now() + maxAge * 1000).toUTCString());
};
```

## Herramientas de monitoreo

### 1. Web Vitals API

```javascript
// Medición completa de Core Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);

// Envío de métricas a analytics
function sendToAnalytics(metric) {
  gtag('event', metric.name, {
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    event_label: metric.id,
    non_interaction: true,
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### 2. Performance Observer

```javascript
// Observer completo de performance
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.startTime}`);
  });
});

observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] });
```

### 3. Real User Monitoring

```javascript
// RUM con Google Analytics
gtag('config', 'GA_MEASUREMENT_ID', {
  custom_map: {
    'custom_parameter_1': 'lcp',
    'custom_parameter_2': 'fid',
    'custom_parameter_3': 'cls'
  }
});

// Envío de métricas
function sendMetric(name, value) {
  gtag('event', 'web_vitals', {
    event_category: 'Performance',
    event_label: name,
    value: Math.round(value),
    non_interaction: true
  });
}
```

## Estrategias de optimización

### 1. Critical Rendering Path

```markdown
OPTIMIZACIÓN DEL CRP:
1. Minimizar HTML
2. Inline CSS crítico
3. Defer JavaScript no crítico
4. Optimizar imágenes
5. Usar preload para recursos críticos
6. Minimizar render blocking resources
```

### 2. Bundle optimization

```javascript
// Webpack optimization
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
};

// Tree shaking
import { specificFunction } from 'large-library';

// Code splitting
const LazyComponent = React.lazy(() => import('./LazyComponent'));
```

### 3. Image optimization

```javascript
// Responsive images
const ResponsiveImage = ({ src, alt, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className="image-container">
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        style={{ opacity: isLoaded ? 1 : 0 }}
        {...props}
      />
    </div>
  );
};

// WebP support
const getImageSrc = (src) => {
  const webpSupported = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
  return webpSupported ? src.replace(/\.(jpg|jpeg|png)$/, '.webp') : src;
};
```

## Conclusión

La optimización de performance web es esencial para el éxito de cualquier aplicación. Los Core Web Vitals proporcionan métricas claras para medir y mejorar la experiencia de usuario.

**Métricas clave**:
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1
- FCP: < 1.8s
- TTFB: < 600ms

**Estrategias de optimización**:
- Optimizar recursos críticos
- Implementar lazy loading
- Usar CDN y caching
- Minimizar JavaScript
- Optimizar imágenes
- Implementar code splitting

**Herramientas esenciales**:
- Lighthouse
- Web Vitals Extension
- PageSpeed Insights
- Performance Observer API
- Real User Monitoring

**Próximos pasos**:
1. Mide tus métricas actuales
2. Identifica cuellos de botella
3. Implementa optimizaciones
4. Monitorea mejoras
5. Establece alertas
6. Optimiza continuamente

**Recuerda**: La optimización de performance es un proceso continuo. Monitorea regularmente tus métricas y ajusta según sea necesario.

¡Una web rápida es una web exitosa!
