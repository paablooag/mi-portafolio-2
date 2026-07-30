---
title: "Core Web Vitals 2025: qué son, cómo medirlos y mejorarlos"
description: "Guía completa de Core Web Vitals 2025: LCP, INP y CLS explicados en detalle con estrategias prácticas de optimización y herramientas de medición recomendadas."
pubDate: 2025-05-05
author: "Pablo Alcalde García"
tags: ["seo", "core-web-vitals", "rendimiento", "ux"]
draft: false
---

## Qué son los Core Web Vitals

Los Core Web Vitals son un conjunto de métricas definidas por Google que miden aspectos específicos de la experiencia de usuario en una página web: velocidad de carga, capacidad de respuesta a interacciones y estabilidad visual del layout. Desde 2021 forman parte oficial del algoritmo de ranking de Google como parte del sistema de señales de experiencia de página (Page Experience).

En otras palabras: Google no solo valora que tu contenido sea relevante y que tengas backlinks de calidad. También quiere saber si tu web ofrece una experiencia de uso satisfactoria. Una página que tarda cinco segundos en cargar, que reacciona lentamente a los clics o cuyos elementos se desplazan inesperadamente mientras el usuario intenta leer, no merece ocupar las primeras posiciones aunque su contenido sea excelente.

Los tres Core Web Vitals en 2025 son:

- **LCP** (Largest Contentful Paint): carga
- **INP** (Interaction to Next Paint): capacidad de respuesta
- **CLS** (Cumulative Layout Shift): estabilidad visual

## LCP: Largest Contentful Paint

### Qué mide

El LCP mide el tiempo que tarda en cargarse el elemento de contenido más grande visible en el viewport (la parte de la pantalla visible sin hacer scroll). Habitualmente es una imagen hero, una imagen de portada de artículo o, en páginas sin imágenes grandes, un bloque de texto.

### Umbrales de Google

| Puntuación | Valor LCP |
|---|---|
| Bueno | Menos de 2,5 segundos |
| Necesita mejorar | Entre 2,5 y 4 segundos |
| Deficiente | Más de 4 segundos |

### Causas más frecuentes de LCP lento

- Imágenes sin optimizar o en formatos antiguos (JPG/PNG pesados)
- Imagen LCP sin preload
- Tiempo de respuesta del servidor (TTFB) elevado
- CSS que bloquea el renderizado
- JavaScript que retrasa la carga del contenido principal
- Imágenes cargadas de forma lazy que son el elemento LCP (error frecuente)

### Estrategias de optimización

**1. Identifica el elemento LCP**

Antes de optimizar, debes saber qué elemento es el LCP de cada página. PageSpeed Insights y Lighthouse te lo muestran claramente. En muchos casos es la imagen hero o el banner principal.

**2. Preloada el elemento LCP**

Si el LCP es una imagen, añade un preload en el `<head>` del HTML:

```html
<link rel="preload" as="image" href="/hero-image.webp" fetchpriority="high">
```

Esto indica al navegador que descargue esa imagen con alta prioridad antes de procesar el resto de recursos.

**3. Optimiza las imágenes**

- Convierte las imágenes a formato WebP o AVIF (30-50% menos peso que JPG)
- Comprime sin pérdida perceptible usando Squoosh o Sharp
- Define las dimensiones en el HTML (`width` y `height`)
- Usa `srcset` para servir diferentes tamaños según el dispositivo

**4. Mejora el TTFB**

- Usa un CDN para servir el HTML desde servidores más cercanos al usuario
- Implementa caché del servidor (Redis, Varnish)
- Revisa si el servidor de origen responde lento (hosting de bajo rendimiento)

**5. Elimina CSS y JS bloqueantes**

- Inline el CSS crítico (above-the-fold) directamente en el HTML
- Carga el CSS no crítico de forma diferida
- Aplica `defer` o `async` a los scripts que no son necesarios para el renderizado inicial

## INP: Interaction to Next Paint

### Qué mide

El INP (Interaction to Next Paint) es la métrica que sustituyó al FID (First Input Delay) en marzo de 2024. Mientras que el FID solo medía la primera interacción, el INP mide la capacidad de respuesta de la página a lo largo de toda la visita del usuario.

Concretamente, el INP registra el tiempo que transcurre entre que el usuario interactúa (clic, toque, pulsación de tecla) y el momento en que el navegador pinta la respuesta visual a esa interacción. Se toma el valor del percentil 75 de todas las interacciones de una sesión.

### Umbrales de Google

| Puntuación | Valor INP |
|---|---|
| Bueno | Menos de 200ms |
| Necesita mejorar | Entre 200ms y 500ms |
| Deficiente | Más de 500ms |

### Causas más frecuentes de INP alto

- Tareas largas (Long Tasks) en el hilo principal de JavaScript que bloquean la respuesta a interacciones
- Manejadores de eventos (event handlers) demasiado costosos
- Renders de React, Vue u otros frameworks que recalculan el DOM de forma ineficiente
- Terceros (scripts de analytics, chatbots, ads) que consumen recursos del hilo principal

### Estrategias de optimización

**1. Identifica las interacciones lentas**

Usa el panel de Performance de Chrome DevTools para grabar una sesión y ver qué tareas bloquean el hilo principal. Busca las Long Tasks (bloques amarillos de más de 50ms).

**2. Divide las Long Tasks**

Usa `scheduler.yield()` o la API de `queueMicrotask` para dividir tareas largas en fragmentos más pequeños que permitan al navegador responder a interacciones entre medio.

**3. Carga diferida de JavaScript de terceros**

Scripts de analytics, chatbots y herramientas de marketing suelen ser grandes consumidores del hilo principal. Cárgalos de forma diferida o usa la Partytown library para ejecutarlos en un Web Worker.

**4. Optimiza los event handlers**

Evita operaciones costosas directamente en los manejadores de eventos. Usa `requestAnimationFrame` para operaciones visuales y `setTimeout` con delay 0 para trabajo no urgente.

**5. Usa Web Workers**

El trabajo computacionalmente intensivo (parseo de datos, compresión, cifrado) debe moverse a Web Workers para liberar el hilo principal.

## CLS: Cumulative Layout Shift

### Qué mide

El CLS mide la inestabilidad visual de una página: cuánto se desplazan inesperadamente los elementos del layout mientras el usuario intenta interactuar con el contenido. Un CLS elevado es la razón por la que, al intentar hacer clic en un botón, de repente aparece un anuncio encima y acabas pulsando en el lugar equivocado.

La puntuación CLS se calcula como la suma de todas las sesiones de cambio de layout inesperado, ponderadas por la fracción del viewport afectada y la distancia de desplazamiento.

### Umbrales de Google

| Puntuación | Valor CLS |
|---|---|
| Bueno | Menos de 0,1 |
| Necesita mejorar | Entre 0,1 y 0,25 |
| Deficiente | Más de 0,25 |

### Causas más frecuentes de CLS alto

- Imágenes sin dimensiones definidas en el HTML
- Anuncios, iframes o embeds sin espacio reservado
- Fuentes web que producen FOIT (Flash of Invisible Text) o FOUT (Flash of Unstyled Text)
- Contenido inyectado dinámicamente por encima de contenido existente
- Animaciones que afectan propiedades del layout (top, left, width, height)

### Estrategias de optimización

**1. Define siempre width y height en imágenes**

```html
<!-- Mal -->
<img src="foto.jpg" alt="descripción">

<!-- Bien -->
<img src="foto.jpg" alt="descripción" width="800" height="450">
```

Con las dimensiones definidas, el navegador reserva el espacio antes de que la imagen cargue, evitando el desplazamiento.

**2. Reserva espacio para anuncios e iframes**

Define una altura mínima para los contenedores de anuncios aunque el anuncio no haya cargado todavía. Es mejor mostrar un espacio en blanco que un desplazamiento inesperado.

**3. Optimiza las fuentes web**

Usa `font-display: optional` para evitar que las fuentes web desplacen el contenido. Alternativamente, precarga las fuentes críticas con `<link rel="preload">`.

**4. Prefiere CSS para animaciones**

Usa `transform` y `opacity` para animaciones en lugar de propiedades que afecten al layout (top, left, width, margin). Las propiedades transform se procesan en el compositor y no generan CLS.

## Herramientas para medir los Core Web Vitals

### PageSpeed Insights

La herramienta gratuita de Google que combina datos de laboratorio (Lighthouse) con datos de campo reales (Chrome User Experience Report). Disponible en [pagespeed.web.dev](https://pagespeed.web.dev). Proporciona una puntuación global y desglosa cada métrica con recomendaciones específicas.

### Google Search Console

En el informe "Experiencia" > "Core Web Vitals" puedes ver el estado de todas las URLs de tu sitio según datos de campo reales de usuarios de Chrome. Clasifica las URLs en "Bueno", "Necesita mejorar" y "Deficiente".

### Lighthouse

Integrado en Chrome DevTools (pestaña Lighthouse) y disponible como CLI o módulo de Node.js. Ejecuta auditorías de laboratorio que no dependen de datos reales de usuarios, por lo que es ideal para pruebas durante el desarrollo.

### Chrome DevTools Performance Panel

Para diagnóstico profundo, el panel de Performance de DevTools permite grabar sesiones y analizar frame a frame qué ocurre en el hilo principal, qué recursos bloquean el renderizado y dónde se producen los cambios de layout.

### Web Vitals Extension

La extensión oficial de Chrome Web Vitals muestra en tiempo real los valores de LCP, INP y CLS de cualquier página mientras navegas.

## Datos de campo vs datos de laboratorio

Una distinción importante: los datos de laboratorio (Lighthouse, PageSpeed en modo lab) simulan una carga de página en condiciones controladas. Los datos de campo (CrUX Report, Search Console) muestran los valores reales experimentados por usuarios reales con diferentes dispositivos, conexiones y condiciones.

Google usa los **datos de campo** para el ranking, no los datos de laboratorio. Por eso es posible tener una puntuación alta en Lighthouse pero valores de campo deficientes (o viceversa).

Prioriza siempre mejorar los datos de campo. Si no tienes suficiente tráfico para que Google genere datos de campo para tu sitio, los datos de laboratorio son la mejor aproximación disponible.

Los Core Web Vitals no son métricas estáticas: Google puede revisarlos o añadir nuevas métricas en el futuro. Mantente al día con las actualizaciones del blog de Google para desarrolladores web.
