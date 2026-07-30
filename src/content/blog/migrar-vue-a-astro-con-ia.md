---
title: "Migrar un proyecto de Vue.js a Astro usando IA: caso práctico"
description: "Caso práctico de migración de Vue.js a Astro con ayuda de IA: planificación, conversión de componentes, Islands Architecture y lecciones aprendidas."
pubDate: 2025-06-25
author: "Pablo Alcalde García"
tags: ["vue", "astro", "migracion", "ia", "frontend"]
draft: false
---

Hace unos meses migré mi portafolio personal de Vue.js a Astro. No era un proyecto enorme (unos 30 componentes, algunas páginas estáticas y un blog sencillo), pero la migración me enseñó mucho sobre cómo usar IA de forma efectiva en este tipo de tarea y sobre cuándo Astro es la elección correcta. En este artículo te cuento el proceso completo, con los aciertos y los errores.

## Por qué migrar de Vue a Astro

La pregunta más importante antes de empezar cualquier migración es: ¿merece la pena el esfuerzo? En mi caso, había razones técnicas claras.

### El problema del rendimiento en sitios de contenido

Vue.js es un framework excelente para aplicaciones web interactivas. El problema es que muchos proyectos que usan Vue no son realmente aplicaciones interactivas; son sitios de contenido (blogs, portafolios, landing pages) que solo tienen interactividad en algunos elementos puntuales.

Para estos sitios, Vue tiene un coste alto: todo el framework se carga en el navegador, JavaScript se ejecuta para hidratar el HTML, y el Time to Interactive es mayor de lo necesario. En un portafolio, el 90% de la página es contenido estático. ¿Por qué enviar y ejecutar JavaScript para renderizar texto e imágenes?

### SEO y Core Web Vitals

Los motores de búsqueda valoran el rendimiento. Los scores de Lighthouse en mi portafolio de Vue estaban en el rango 70-80, lo cual no es malo, pero podía mejorar. Además, el SSR (Server-Side Rendering) de Vue requiere configuración adicional (Nuxt), mientras que Astro genera HTML estático por defecto.

### La propuesta de Astro

Astro nació con una filosofía muy específica: **enviar cero JavaScript por defecto**, solo cuando es necesario. Sus ventajas principales son:

- **HTML estático**: las páginas se generan en build time, sin JavaScript innecesario
- **Islands Architecture**: solo los componentes que necesitan interactividad cargan JavaScript
- **Agnóstico de framework**: puedes usar componentes de Vue, React, Svelte o Solid en el mismo proyecto
- **Soporte nativo para Markdown**: ideal para blogs y documentación
- **Rendimiento excepcional**: scores de Lighthouse de 95-100 son habituales

## Planificación de la migración

Antes de escribir una sola línea de código, dediqué tiempo a planificar. Aquí es donde la IA fue muy útil desde el principio.

### Auditoría inicial con Claude

Le compartí la estructura del proyecto a Claude y le pedí que analizara qué componentes tenían interactividad real y cuáles eran puramente estáticos:

```
Tengo un portafolio en Vue.js. Te voy a mostrar la lista de componentes 
y una descripción breve de qué hace cada uno.
Clasifícalos en tres categorías:
1. Completamente estáticos (se pueden convertir a Astro puro)
2. Interactividad ligera (formularios, toggles, animaciones simples)
3. Interactividad compleja (necesitan mantener estado, eventos complejos)

Esta clasificación me ayudará a priorizar qué migrar primero.
```

El resultado fue revelador: el 70% de mis componentes eran completamente estáticos. Solo el formulario de contacto y el filtro de proyectos tenían interactividad real.

### Plan de migración por fases

Basándome en el análisis, definí tres fases:

**Fase 1**: Migrar la estructura base (layout, cabecera, pie de página, páginas estáticas)
**Fase 2**: Migrar el blog (pasar de Markdown manual a Content Collections de Astro)
**Fase 3**: Migrar los componentes con interactividad (mantenerlos en Vue como islas)

## Cómo usar Claude y GPT para convertir componentes

### La conversión de componentes estáticos

Un componente Vue estático (solo template, sin lógica reactiva relevante) se convierte a Astro de forma bastante directa. Le daba a Claude un componente Vue y le pedía la versión Astro:

```
Convierte este componente de Vue 3 a un componente .astro.
Reglas:
- No hay estado reactivo que mantener
- Las props deben declararse con Astro.props
- El bloque <script> de Astro va en el frontmatter (entre ---)
- El CSS puede ir en <style> al final del archivo
- Elimina cualquier directiva de Vue (v-if, v-for, :class, etc.) 
  y reemplázalas con la sintaxis equivalente de Astro
- Si usas v-for, usa {array.map(...)} en JSX-like syntax

[componente Vue]
```

El resultado para la mayoría de componentes era correcto al 90%. Las diferencias más comunes que tenía que ajustar manualmente:

- **v-if vs condicionales en Astro**: `{condition && <Element />}` o `{condition ? <A /> : <B />}`
- **Clases condicionales**: `:class="{ active: isActive }"` → `class:list={['active', { active: isActive }]}`
- **Slots**: la sintaxis de slots es ligeramente diferente

### La conversión de componentes con v-for y datos dinámicos

Para componentes que iteran sobre arrays (listas de proyectos, cards de skills, etc.), el patrón también es directo:

**Vue:**
```vue
<template>
  <div class="projects-grid">
    <ProjectCard 
      v-for="project in projects" 
      :key="project.id"
      :project="project" 
    />
  </div>
</template>

<script setup>
const props = defineProps({ projects: Array })
</script>
```

**Astro:**
```astro
---
const { projects } = Astro.props;
import ProjectCard from './ProjectCard.astro';
---

<div class="projects-grid">
  {projects.map(project => (
    <ProjectCard project={project} />
  ))}
</div>
```

### Mantener componentes Vue como islas

Para los componentes con interactividad real (el formulario de contacto, el filtro de proyectos), Astro permite mantener el componente Vue original y cargarlo como una "isla":

```astro
---
import ContactForm from '../components/ContactForm.vue';
---

<!-- client:load significa que se hidrata al cargar la página -->
<ContactForm client:load />

<!-- client:visible significa que se hidrata cuando entra en el viewport -->
<ProjectFilter client:visible />

<!-- client:idle significa que se hidrata cuando el browser está idle -->
<Newsletter client:idle />
```

Esta es la magia de Astro: puedes mantener los componentes Vue que ya funcionan y solo pagar el coste de JavaScript en los que realmente lo necesitan.

## Islands Architecture: qué es y por qué importa

La Islands Architecture es el concepto central de Astro, y entenderlo bien cambia cómo piensas sobre el desarrollo frontend.

Imagina tu página como un océano de HTML estático con "islas" de interactividad. El HTML estático se sirve inmediatamente sin JavaScript. Las islas se hidratan de forma independiente, en paralelo, y solo cuando son necesarias.

Esto contrasta con el modelo SPA (Single Page Application) donde todo el JavaScript se carga de una vez y luego se ejecuta para crear el HTML. En la Islands Architecture, el HTML ya existe; el JavaScript solo añade interactividad donde se necesita.

### Beneficios medibles

Después de la migración, mis métricas de rendimiento cambiaron significativamente:

- **First Contentful Paint**: de 1.8s a 0.4s
- **Largest Contentful Paint**: de 2.5s a 0.8s
- **Total Blocking Time**: de 320ms a 0ms
- **Score de Lighthouse**: de 78 a 98

Estos no son números pequeños. La diferencia en experiencia de usuario es perceptible.

## El blog con Content Collections de Astro

Migrar el blog fue la parte donde Astro ganó más claramente. En Vue, gestionaba el blog de forma bastante manual (o con un plugin de Vite). Astro tiene Content Collections integradas que hacen este trabajo de forma elegante.

### Configuración de Content Collections

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    pubDate: z.date(),
    author: z.string(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false)
  })
});

export const collections = { blog };
```

Una vez configuradas las colecciones, Astro valida automáticamente el frontmatter de cada archivo Markdown, genera TypeScript types para las entradas, y permite queries tipadas para obtener los posts.

Le pedí a Claude que me ayudara a migrar las páginas de listado y detalle del blog:

```
Tengo una página de Vue que lista artículos del blog.
Los artículos ahora están en src/content/blog/ como Markdown con Content Collections de Astro.
Convierte la página a Astro usando getCollection('blog') para obtener los posts.
Filtra los drafts en producción (import.meta.env.PROD).
Ordena por pubDate descendente.
Genera las rutas estáticas con getStaticPaths.
```

## Lo que pierdes y lo que ganas

### Lo que pierdes al migrar de Vue a Astro

**Reactividad nativa**: Si tu proyecto tiene estado complejo compartido entre muchos componentes, Astro no tiene una solución tan elegante como Pinia o Vuex. Puedes usar stores con nanostores, pero es diferente.

**Ecosistema de Vue**: Algunas librerías de Vue no tienen equivalente directo en Astro. Cosas como Vue Router (aunque Astro tiene su propio sistema de rutas) o librerías de UI muy específicas de Vue.

**Hot Module Replacement**: El HMR de Vite + Vue es muy fluido. Astro también tiene HMR, pero el modelo mental es diferente.

### Lo que ganas

**Rendimiento**: Ya lo hemos cuantificado. La diferencia en scores de Lighthouse es real y medible.

**Simplicidad para sitios de contenido**: Si tu proyecto es principalmente contenido estático, Astro es más simple. No necesitas pensar en hidratación, contexto de Vue, o el ciclo de vida de los componentes para páginas estáticas.

**SEO mejorado**: HTML estático es más fácil de indexar. El tiempo hasta el primer byte (TTFB) es menor. Los Core Web Vitals mejoran.

**Flexibilidad de frameworks**: Puedes mezclar Vue, React y Svelte en el mismo proyecto si lo necesitas. Útil cuando tienes componentes de diferentes orígenes.

## Lecciones aprendidas

**La IA acelera mucho la conversión mecánica**: Convertir la sintaxis de Vue a Astro es trabajo mecánico y los LLMs lo hacen bien. Lo que sigue requiriendo criterio humano es decidir qué componentes son islas y cuáles son estáticos.

**El 20% más complejo toma el 80% del tiempo**: Los componentes simples se migran en minutos. Los que tienen interactividad compleja o dependencias externas pueden llevar horas.

**Astro no es para todo**: Si tu proyecto es una aplicación web real (dashboard, herramienta SaaS, aplicación con mucho estado), Vue, React o Svelte son mejores opciones. Astro brilla en sitios de contenido.

**El sistema de ficheros de Astro es intuitivo**: La convención de que las páginas van en `src/pages/` y el nombre del fichero define la ruta es simple y efectiva.

**Content Collections es una de las mejores features de Astro**: La validación automática del frontmatter, los tipos TypeScript generados automáticamente, y la API de queries hacen que gestionar contenido Markdown sea un placer.

## Conclusión

La migración de Vue a Astro, con ayuda de IA, fue una de las mejores decisiones técnicas que tomé para este proyecto. El rendimiento mejoró dramáticamente, el código se simplificó, y el flujo de trabajo para añadir contenido nuevo es mucho más agradable.

Si tienes un proyecto de contenido en Vue (blog, portafolio, landing page, documentación) y el rendimiento o el SEO son importantes para ti, la migración a Astro vale la pena. Con IA para hacer el trabajo mecánico de conversión de sintaxis, el esfuerzo es significativamente menor de lo que podrías esperar.

El punto de partida: analiza qué porcentaje de tu proyecto es realmente interactivo. Si la respuesta es "menos del 30%", Astro probablemente sea la herramienta correcta para ti.
