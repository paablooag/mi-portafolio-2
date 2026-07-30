---
title: "Nuxt 4: todas las novedades y cambios respecto a Nuxt 3"
description: "Repaso completo de los cambios más importantes en Nuxt 4: nueva estructura de directorios, routing mejorado, rendimiento, TypeScript y composables actualizados."
pubDate: 2025-03-01
author: "Pablo Alcalde García"
tags: ["nuxt", "nuxt4", "vue", "frontend", "javascript"]
draft: false
---

## Nuxt 4 ha llegado: qué cambia y qué se mantiene

Cuando el equipo de Nuxt anunció la versión 4, la comunidad tuvo reacciones mixtas. Después de la transición a veces traumática de Nuxt 2 a Nuxt 3, muchos desarrolladores temían otro salto disruptivo. La buena noticia es que Nuxt 4 es una evolución cuidadosa, no una revolución. La mayoría de los conceptos de Nuxt 3 se mantienen, pero se refinan y organizan mejor.

En este artículo voy a repasar los cambios más significativos, lo que significa para los proyectos existentes y por qué, en general, estas decisiones tienen sentido desde el punto de vista del desarrollador.

## Nueva estructura de directorios: el cambio más visible

El cambio más inmediato que notarás al crear un proyecto nuevo con Nuxt 4 es la reorganización del directorio de la aplicación. En Nuxt 3, todos los directorios del proyecto (components, composables, pages, etc.) vivían en la raíz del repositorio. En Nuxt 4, se introduce un directorio `app/` que los contiene.

### Nuxt 3 (estructura anterior)

```
mi-proyecto/
├── components/
├── composables/
├── layouts/
├── pages/
├── plugins/
├── server/
├── nuxt.config.ts
└── package.json
```

### Nuxt 4 (nueva estructura)

```
mi-proyecto/
├── app/
│   ├── components/
│   ├── composables/
│   ├── layouts/
│   ├── pages/
│   ├── plugins/
│   └── app.vue
├── server/
├── nuxt.config.ts
└── package.json
```

Esta separación entre el código de la aplicación (`app/`) y el código del servidor (`server/`) es mucho más clara conceptualmente. En proyectos grandes, la mezcla anterior podía generar confusión sobre qué se ejecuta en el cliente y qué en el servidor.

El directorio `server/` se mantiene en la raíz para mantener la coherencia con Nitro, el motor de servidor que potencia Nuxt.

### Compatibilidad con proyectos Nuxt 3

Lo importante: si tienes un proyecto Nuxt 3 existente, no necesitas migrar inmediatamente a la nueva estructura. Nuxt 4 mantiene compatibilidad hacia atrás y soporta la estructura antigua. La nueva estructura es el estándar recomendado para proyectos nuevos.

## Cambios en el sistema de routing

El sistema de routing basado en archivos de Nuxt sigue siendo una de sus características más queridas, y en la versión 4 recibe mejoras importantes.

### Rutas tipadas por defecto

En Nuxt 4, el sistema de rutas tipadas que en Nuxt 3 requería configuración adicional ahora está activado por defecto. Esto significa que `navigateTo()`, `useRoute()` y los componentes `<NuxtLink>` tienen tipado automático basado en tus archivos de páginas.

```typescript
// TypeScript sabe que esta ruta existe y qué params acepta
const route = useRoute('usuarios-id')
// route.params.id está tipado automáticamente

// Error en tiempo de compilación si la ruta no existe
navigateTo({ name: 'pagina-que-no-existe' }) // Error de TypeScript
```

Esta mejora elimina una categoría completa de bugs en runtime: las rutas mal escritas o los parámetros incorrectos se detectan en el editor antes de llegar al navegador.

### Mejoras en el prefetching

El sistema de prefetching de `<NuxtLink>` se ha refinado. Ahora el componente es más inteligente sobre cuándo y qué prefetchear, considerando la conectividad del usuario y la prioridad de la ruta.

```astro
<!-- Prefetch automático inteligente -->
<NuxtLink to="/about">Sobre mí</NuxtLink>

<!-- Control explícito del prefetch -->
<NuxtLink to="/heavy-page" :prefetch="false">Página pesada</NuxtLink>
```

### Layouts mejorados

Los layouts en Nuxt 4 ahora soportan transiciones más granulares y tienen mejor integración con el sistema de metadata de páginas. También es más fácil cambiar de layout programáticamente sin causar re-renders innecesarios.

## Mejoras de rendimiento en el core

Nuxt 4 llega con varias optimizaciones de rendimiento en el núcleo del framework que se benefician todos los proyectos sin necesidad de cambios de código.

### Bundle splitting más inteligente

El algoritmo de code splitting ha sido revisado para generar chunks más eficientes. En proyectos grandes, esto puede traducirse en reducciones del 20-30% en el tamaño del bundle inicial.

### Mejoras en el tree-shaking

Nuxt 4 hace un tree-shaking más agresivo de sus propias dependencias internas. Funcionalidades que no usas (ciertos módulos del servidor, helpers de autenticación, etc.) se eliminan más efectivamente del bundle final.

### Carga diferida de componentes automática

Los componentes en el directorio `components/` ahora son lazy-loaded de forma automática cuando Nuxt detecta que no se usan en el render inicial. Anteriormente esto requería el prefijo `Lazy`:

```astro
<!-- Nuxt 3: explicit lazy loading -->
<LazyMiComponentePesado />

<!-- Nuxt 4: automático basado en uso -->
<MiComponentePesado />  <!-- lazy si Nuxt detecta que no es crítico -->
```

### Hydration más eficiente

El algoritmo de hidratación se ha optimizado para reducir el trabajo en el hilo principal durante la carga inicial. Esto impacta directamente en la métrica INP (Interaction to Next Paint) de Core Web Vitals.

## Composables actualizados y nuevos

Los composables son el corazón de la lógica en aplicaciones Nuxt, y la versión 4 trae varias actualizaciones importantes.

### `useFetch` y `useAsyncData` mejorados

Estos dos composables fundamentales reciben mejoras en el manejo de errores y en la deduplicación de peticiones.

```typescript
// Manejo de errores mejorado con tipos más precisos
const { data, error, status } = await useFetch('/api/usuarios', {
  onResponseError({ response }) {
    // Tipado completo del error de respuesta
    console.error(response.status, response._data)
  },
  // Nuevo: control de deduplucación
  dedupe: 'cancel' // cancela la petición anterior si se llama de nuevo
})
```

### `useRequestEvent` estabilizado

Este composable, que permite acceder al evento de la petición HTTP en el contexto del servidor, está ahora completamente estabilizado con una API más limpia.

### Nuevos composables de utilidad

Nuxt 4 introduce varios composables de utilidad nuevos:

- **`usePreviewMode`**: para integraciones con CMS en modo preview
- **`useResponseHeader`**: para manipular headers de respuesta desde componentes
- **`useServerHeadSafe`**: para modificar el head de forma segura en SSR

## Soporte mejorado de TypeScript

TypeScript ha pasado de ser un ciudadano de primera clase a ser el idioma principal de Nuxt. En la versión 4, este compromiso se profundiza.

### Generación automática de tipos más completa

El comando `nuxi prepare` (o el watch automático durante desarrollo) genera ahora tipos más completos que incluyen:

- Rutas tipadas (como vimos antes)
- Tipos para las configuraciones de runtime
- Tipos para los módulos instalados
- Autocompletado para `$fetch` con las rutas del servidor

### Strict mode por defecto

Los proyectos nuevos de Nuxt 4 usan TypeScript en strict mode por defecto. Esto puede romper proyectos existentes si migras sin preparación, pero resulta en código más robusto y menos bugs en producción.

```json
// tsconfig.json generado por Nuxt 4
{
  "extends": "./.nuxt/tsconfig.json",
  "compilerOptions": {
    "strict": true
  }
}
```

## Módulos oficiales actualizados

El ecosistema de módulos oficiales también se actualiza para aprovechar las nuevas capacidades de Nuxt 4.

### `@nuxt/content` v3

El módulo de contenido recibe una actualización mayor con mejor rendimiento en colecciones grandes, soporte nativo para MDX mejorado y una API de consulta más expresiva.

### `@nuxt/image` mejorado

Mejor integración con los servicios de optimización de imágenes modernos (Cloudflare Images, Vercel Image Optimization) y soporte para el formato AVIF de forma más robusta.

### `@nuxt/ui` v3

La librería de componentes oficial alcanza su versión 3 con un sistema de diseño más flexible basado en tokens CSS, mejor soporte para dark mode y componentes adicionales.

## Cómo afecta a proyectos existentes

Si tienes un proyecto en Nuxt 3, la transición a Nuxt 4 no debería ser traumática, pero tampoco es trivial. Los principales puntos a considerar:

### Lo que necesitarás revisar

1. **Estructura de directorios**: Si quieres adoptar la nueva estructura `app/`, requiere mover archivos y actualizar imports
2. **TypeScript strict mode**: Si tu código tiene tipos permisivos, puede generar errores nuevos
3. **Composables deprecados**: Algunos composables de Nuxt 3 tienen versiones actualizadas con APIs ligeramente diferentes
4. **Módulos de terceros**: Algunos módulos de la comunidad pueden necesitar tiempo para actualizarse

### Lo que NO necesitarás cambiar

1. La lógica de componentes Vue es compatible al 100%
2. La configuración de Nitro se mantiene compatible
3. Los plugins y middleware existentes funcionan sin cambios
4. La integración con Vue Router subyacente es la misma

## Conclusión

Nuxt 4 es lo que debería ser una versión mayor: mejoras significativas en rendimiento, DX y TypeScript, sin romper innecesariamente lo que ya funcionaba. El equipo ha aprendido de la transición más difícil de Nuxt 2 a 3 y ha tomado decisiones más conservadoras esta vez.

Si estás empezando un proyecto nuevo hoy, usa Nuxt 4 directamente. La nueva estructura de directorios, las rutas tipadas por defecto y las mejoras de rendimiento justifican empezar con la versión actual.

Si tienes un proyecto existente en Nuxt 3, no hay urgencia para migrar. Nuxt 3 sigue recibiendo parches de seguridad y correcciones. Pero empieza a planificar la migración: los beneficios de TypeScript más estricto y el mejor rendimiento merecen el esfuerzo a medio plazo.
