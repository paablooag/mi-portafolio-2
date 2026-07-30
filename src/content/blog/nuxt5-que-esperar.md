---
title: "Nuxt 5: qué podemos esperar y cuándo llegará"
description: "Todo lo que se sabe sobre Nuxt 5: RFCs publicados, mejoras en bundling con Vite 6 y Rolldown, integración con Nitro, soporte para Vue 3.5+ y cómo prepararse."
pubDate: 2025-09-15
author: "Pablo Alcalde García"
tags: ["nuxt", "nuxt5", "vue", "frontend", "roadmap"]
draft: false
---

## El contexto: por qué ya hablamos de Nuxt 5

Cuando Nuxt 4 apenas acaba de estabilizarse, puede parecer prematuro hablar ya de la versión 5. Sin embargo, el equipo de Nuxt y la comunidad de UnJS son notablemente transparentes con sus planes futuros: los RFCs (Request for Comments) se publican en GitHub abiertamente, los mantenedores hablan en conferencias sobre la dirección del framework, y los patrones emergentes del ecosistema Vue nos dan pistas claras sobre dónde va todo esto.

Este artículo no es especulación sin base. Es un análisis de lo que se sabe, lo que es probable y lo que deberías aprender ahora para estar preparado cuando Nuxt 5 llegue.

## Lo que sabemos: RFCs y anuncios oficiales

El proceso de RFC de Nuxt es público y accesible en el repositorio `nuxt/rfcs` de GitHub. Varios RFCs relevantes para Nuxt 5 ya están en discusión o aprobados.

### RFC: Unificación del ecosistema UnJS

Uno de los temas más discutidos es la integración más profunda de las herramientas de UnJS (el ecosistema de utilidades JavaScript creado por el equipo de Nuxt) directamente en el core. Herramientas como `unenv`, `unstorage`, `destr` y `ofetch` ya son parte del ecosistema Nuxt, pero en la versión 5 se espera que esta integración sea más fluida y que las APIs sean más consistentes entre sí.

### RFC: Nuevo sistema de módulos

El sistema de módulos de Nuxt es uno de sus puntos fuertes, pero también tiene complejidad acumulada de varias versiones. En Nuxt 5, se espera una revisión del API de creación de módulos que lo haga más predecible y más fácil de testear. Los autores de módulos podrán declarar dependencias entre módulos de forma más explícita.

### RFC: Mejoras en el sistema de middleware

El sistema de middleware de Nuxt 5 promete ser más flexible, con mejor soporte para middlewares asincrónicos y una API más clara para distinguir entre middlewares globales, de ruta y de servidor.

## Vite 6 y Rolldown: el motor bajo el capó

Una de las mejoras más esperadas de Nuxt 5 es la adopción de Vite 6 y, más específicamente, la integración con Rolldown.

### Qué es Rolldown

Rolldown es un bundler escrito en Rust, diseñado para ser compatible con la API de Rollup pero con un rendimiento drásticamente superior. Es el proyecto desarrollado por el equipo de Vite para eventualmente reemplazar a esbuild y Rollup como el bundler subyacente de Vite.

Los benchmarks publicados son impresionantes: Rolldown puede ser entre 10 y 20 veces más rápido que Rollup en proyectos grandes, gracias a la paralelización nativa que permite Rust. Para proyectos Nuxt con muchas páginas y componentes, esto podría significar:

- Tiempos de build de 60 segundos reduciéndose a 10-15 segundos
- HMR (Hot Module Replacement) más rápido durante el desarrollo
- Análisis de bundle más eficiente

### Cuándo llegará Rolldown a Nuxt

Rolldown está en desarrollo activo y Vite 6 ya incluye soporte experimental. La expectativa es que Vite 7 (o una versión minor de Vite 6) tenga Rolldown como bundler estable, lo que luego se trasladaría a Nuxt.

Nuxt 5 probablemente coincida con este momento de madurez de Rolldown, haciendo que el framework se beneficie de estas mejoras de rendimiento desde el primer día.

## Integración más profunda con Nitro

Nitro, el motor de servidor de Nuxt, ya está en su versión 3 y sigue evolucionando. En Nuxt 5, se espera una integración aún más estrecha con Nitro que permita:

### APIs de servidor más expresivas

La línea entre el código de cliente y servidor en Nuxt 5 promete ser más fluida. Los `server actions` (acciones que se ejecutan en el servidor pero se invocan desde el cliente) deberían ser más fáciles de definir y usar, similar a lo que han implementado frameworks como Next.js o lo que propone Astro Actions.

```typescript
// Ejemplo conceptual de server action en Nuxt 5
// server/actions/crearUsuario.ts
export const crearUsuario = defineServerAction(async (datos: DatosUsuario) => {
  const usuario = await db.usuario.create({ data: datos })
  return usuario
})
```

```vue
<!-- En el componente, se llama directamente -->
<script setup>
const { execute: crear, status } = useServerAction(crearUsuario)
</script>
```

### Soporte nativo para Edge Computing

Nitro ya soporta múltiples runtimes (Node.js, Cloudflare Workers, Vercel Edge, Deno Deploy). En Nuxt 5, el soporte para edge computing será más transparente, con mejor tooling para detectar qué APIs del runtime están disponibles en cada entorno.

### Cache más inteligente

Nuxt 5 promete un sistema de cache más granular, donde diferentes partes de la misma página pueden tener estrategias de cache diferentes: el header puede tener cache de 24 horas, el contenido principal de 1 hora, y un widget de datos en tiempo real sin cache.

## Vue 3.5+ y sus mejoras que Nuxt 5 aprovechará

Nuxt 5 estará construido sobre Vue 3.5 o superior, y hay varias características de Vue que el framework podrá aprovechar mejor.

### Reactive Props Destructure

En Vue 3.5, desestructurar props en `<script setup>` mantiene la reactividad. Esto simplifica mucho el código de componentes:

```vue
<!-- Vue 3.4 y anterior: props no reactivas al desestructurar -->
<script setup>
const props = defineProps<{ titulo: string; activo: boolean }>()
// Debes usar props.titulo, no puedes desestructurar
</script>

<!-- Vue 3.5+: desestructuración reactiva -->
<script setup>
const { titulo, activo = false } = defineProps<{ titulo: string; activo?: boolean }>()
// titulo y activo son reactivos automáticamente
// Los defaults se definen directamente en la desestructuración
</script>
```

Nuxt 5 podrá generar código más limpio aprovechando esta característica de Vue.

### `useTemplateRef`

Vue 3.5 introduce `useTemplateRef` como la forma recomendada de acceder a referencias de template:

```vue
<script setup>
import { useTemplateRef, onMounted } from 'vue'

const inputRef = useTemplateRef('mi-input')
onMounted(() => {
  inputRef.value?.focus()
})
</script>

<template>
  <input ref="mi-input" />
</template>
```

### Mejoras en SSR

Vue 3.5 incluye mejoras significativas en el rendimiento de SSR, especialmente en la serialización del estado de la aplicación. Nuxt 5 podrá usar estas mejoras para reducir el tamaño del payload HTML que se envía al cliente.

## Mejoras de DX (Developer Experience)

Más allá de las mejoras técnicas, Nuxt 5 promete una experiencia de desarrollo notablemente mejor.

### Mensajes de error más claros

Uno de los puntos más criticados de Nuxt (y de Vue en general) es que los mensajes de error pueden ser crípticos. En Nuxt 5, se está trabajando en mensajes de error más actionables que te digan no solo qué salió mal, sino también cómo arreglarlo.

### DevTools mejoradas

Nuxt DevTools (la extensión del navegador) está recibiendo nuevas capacidades que estarán completamente integradas en Nuxt 5: mejor visualización del árbol de componentes, inspector de composables en tiempo real, y análisis de rendimiento por página.

### Mejor soporte en VSCode y WebStorm

Las extensiones de editor para Nuxt están mejorando continuamente. En Nuxt 5 se espera mejor autocompletado para rutas, composables y las nuevas APIs del framework.

## Cuándo se espera Nuxt 5

Esta es la pregunta del millón, y la respuesta honesta es: no hay una fecha oficial confirmada.

Basándome en el ritmo histórico del equipo de Nuxt y el estado actual de las tecnologías dependientes (especialmente Rolldown y Vue 3.5), mi estimación es:

- **Beta pública**: finales de 2025 o principios de 2026
- **Release candidate**: Q1-Q2 2026
- **Release estable**: Q2-Q3 2026

Pero estas son estimaciones propias basadas en patrones históricos, no información oficial. El equipo de Nuxt trabaja con plazos que priorizan la calidad sobre la velocidad.

## Cómo prepararse ahora

La mejor forma de estar listo para Nuxt 5 es dominar las tecnologías sobre las que se construirá.

### Aprende bien TypeScript

TypeScript será aún más central en Nuxt 5 que en Nuxt 4. Si todavía estás evitando los tipos genéricos, las interfaces y los utility types, este es el momento de profundizar.

### Familiarízate con la Composition API de Vue

Nuxt 5 asumirá que usas Composition API en todos tus componentes. Si tienes proyectos con Options API, empieza a migrar gradualmente.

### Entende Nitro

Las APIs de servidor de Nuxt se construyen sobre Nitro. Conocer los conceptos de Nitro directamente (event handlers, middleware, storage) te dará ventaja cuando Nuxt 5 exponga más de estas capacidades.

### Sigue el repositorio de RFCs

El repositorio `nuxt/rfcs` en GitHub es la mejor fuente de información sobre el futuro del framework. Participar en las discusiones (aunque sea leyendo los comentarios) te da contexto que no encontrarás en ninguna documentación oficial todavía.

## Conclusión

Nuxt 5 no es una promesa vaga: es la evolución natural de un framework que ha madurado consistentemente y que opera dentro de un ecosistema (Vue, Vite, Nitro, UnJS) en constante mejora. Los cambios técnicos más emocionantes (Rolldown, server actions, mejor SSR) prometen hacer de Nuxt 5 el mejor framework del ecosistema Vue hasta la fecha.

La mejor actitud es continuar construyendo proyectos sólidos con Nuxt 4 hoy, mientras te mantienes atento a los RFCs y las versiones beta cuando lleguen. El conocimiento que adquieres ahora se traslada directamente a Nuxt 5.
