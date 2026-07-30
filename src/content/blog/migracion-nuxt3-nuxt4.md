---
title: "Migrar de Nuxt 3 a Nuxt 4: guía paso a paso sin romper nada"
description: "Guía práctica para migrar un proyecto de Nuxt 3 a Nuxt 4: breaking changes, pasos concretos, errores comunes y herramientas que facilitan la transición."
pubDate: 2025-05-10
author: "Pablo Alcalde García"
tags: ["nuxt", "nuxt4", "migracion", "vue", "frontend"]
draft: false
---

## Antes de empezar: mentalidad de migración

Migrar un framework mayor en un proyecto activo es siempre un proceso que genera cierta ansiedad. La clave para hacerlo bien no es la velocidad, sino la metodología. Una migración bien planificada que lleva dos semanas es infinitamente mejor que una migración apresurada que introduce bugs en producción.

He pasado por varias migraciones de framework en proyectos reales, y lo que aprendo cada vez es lo mismo: lee todos los breaking changes antes de tocar una sola línea de código, ten un entorno de staging donde probar, y haz commits pequeños y descriptivos en lugar de un commit gigante de "migración a Nuxt 4".

Esta guía está pensada para seguirla paso a paso. No te saltes secciones aunque creas que no aplican a tu proyecto.

## Paso 0: preparación del entorno

Antes de actualizar nada, necesitas un punto de partida limpio y seguro.

### Crea una rama específica de migración

```bash
git checkout -b feat/migracion-nuxt4
```

Nunca hagas una migración directamente en `main`. La rama de migración te permite trabajar sin presión, revertir si algo sale muy mal, y hacer revisión de código antes de mergear.

### Asegúrate de tener tests

Si tu proyecto tiene tests, asegúrate de que pasan todos antes de empezar. Necesitas esa red de seguridad. Si no tienes tests... este es un buen momento para añadir al menos algunos tests de integración para las funcionalidades críticas.

### Documenta el comportamiento actual

Haz una lista de las funcionalidades más críticas del proyecto y cómo se comportan hoy. Las usarás para verificar que la migración no ha roto nada.

## Paso 1: actualizar las dependencias

El primer cambio concreto es actualizar el paquete principal y los módulos oficiales.

```bash
# Actualizar Nuxt
npm install nuxt@^4.0.0

# Actualizar módulos oficiales (si los usas)
npm install @nuxt/content@^3.0.0
npm install @nuxt/image@^1.10.0
npm install @nuxt/ui@^3.0.0
npm install @nuxtjs/tailwindcss@latest
```

Después de actualizar, ejecuta el servidor de desarrollo y observa todos los errores y warnings que aparecen en la terminal. No intentes arreglarlos todos a la vez: anótalos y trabájalos metodicamente.

```bash
npm run dev
```

## Paso 2: adoptar la nueva estructura de directorios (opcional pero recomendado)

La nueva estructura con el directorio `app/` es la recomendada para Nuxt 4, pero no es obligatoria de inmediato. Nuxt 4 mantiene compatibilidad con la estructura de Nuxt 3.

Si decides migrar la estructura (recomendado para proyectos nuevos o proyectos donde vas a hacer una refactorización de todos modos):

```bash
mkdir app
mv components app/
mv composables app/
mv layouts app/
mv pages app/
mv plugins app/
mv app.vue app/
# El directorio server/ se queda en la raíz
```

Después de mover los directorios, verifica que las importaciones automáticas siguen funcionando. Nuxt 4 busca componentes, composables y plugins en `app/` automáticamente.

### Actualizar imports explícitos

Si tienes imports explícitos que apuntan a directorios (algo que en Nuxt no debería ser necesario, pero ocurre), necesitarás actualizarlos:

```typescript
// Antes
import MiComponente from '~/components/MiComponente.vue'

// Después (si moviste a app/)
import MiComponente from '~/app/components/MiComponente.vue'
// O mejor: usar auto-imports y no importar explícitamente
```

## Paso 3: revisar y actualizar nuxt.config.ts

El archivo de configuración de Nuxt 4 tiene algunos cambios importantes respecto a Nuxt 3.

### Cambios en la estructura de configuración

```typescript
// nuxt.config.ts en Nuxt 4
export default defineNuxtConfig({
  // Nuevo: compatibilidad version para facilitar migración gradual
  compatibilityDate: '2025-01-01',
  
  // Los módulos siguen igual
  modules: [
    '@nuxt/content',
    '@nuxt/image',
  ],
  
  // La configuración de nitro se mantiene compatible
  nitro: {
    preset: 'vercel'
  },
  
  // TypeScript ahora tiene más opciones
  typescript: {
    strict: true, // Nuevo default en Nuxt 4
    typeCheck: true
  },
  
  // Experimental features que en Nuxt 4 son estables
  // (ya no necesitan estar en experimental)
  // experimental: {
  //   typedPages: true  // <-- Esto ya es default, quítalo
  // }
})
```

### La opción `compatibilityDate`

Esta es nueva en Nuxt 4 y muy importante. Permite controlar qué conjunto de cambios de comportamiento se aplican a tu proyecto. Si pones una fecha antigua, Nuxt usa el comportamiento compatible con proyectos más antiguos. Si pones una fecha reciente, adoptas todos los cambios nuevos.

Para una migración desde Nuxt 3:
1. Empieza con una fecha anterior a Nuxt 4 para reducir los cambios de golpe
2. Ve avanzando la fecha gradualmente mientras resuelves cada conjunto de cambios

## Paso 4: actualizar composables deprecados

Algunos composables de Nuxt 3 han cambiado su API o han sido reemplazados en Nuxt 4.

### `useFetch` y `useAsyncData`

La API principal se mantiene, pero hay cambios en algunas opciones:

```typescript
// Nuxt 3
const { data } = await useFetch('/api/data', {
  // 'defer' era una opción experimental
  lazy: true
})

// Nuxt 4
const { data } = await useFetch('/api/data', {
  lazy: true, // sigue igual
  dedupe: 'cancel' // nueva opción disponible
})
```

### `useRoute()` con rutas tipadas

Si activas el nuevo sistema de rutas tipadas (activo por defecto), `useRoute()` ahora puede recibir el nombre de la ruta como argumento para un tipado más preciso:

```typescript
// Antes (Nuxt 3)
const route = useRoute()
const id = route.params.id // tipo: string | string[]

// Después (Nuxt 4 con rutas tipadas)
const route = useRoute('usuarios-id')
const id = route.params.id // tipo: string (inferido del archivo de página)
```

### `useState` sin serialización

En Nuxt 4, `useState` requiere que los valores sean serializables (para funcionar correctamente con SSR). Si tienes estados con funciones o referencias circulares, necesitarás refactorizarlos.

### Composables de `@vueuse/core`

Si usas VueUse (y deberías), verifica que tienes la versión compatible. Nuxt 4 funciona con VueUse 11+.

## Paso 5: manejar los breaking changes más comunes

Estos son los problemas que más frecuentemente aparecen al migrar de Nuxt 3 a Nuxt 4:

### 1. TypeScript strict mode

Si tu proyecto tiene tipos permisivos o usa `any` frecuentemente, el strict mode de TypeScript va a generar muchos errores. Mi recomendación:

```json
// tsconfig.json - deshabilita strict temporalmente para migración gradual
{
  "extends": "./.nuxt/tsconfig.json",
  "compilerOptions": {
    "strict": false, // Temporalmente durante la migración
    "noImplicitAny": false
  }
}
```

Una vez migrado el código principal, vuelve a activar strict y arregla los errores de tipos de forma gradual.

### 2. Imports de Vue directos

En Nuxt 4, algunos imports que antes funcionaban directamente desde Vue pueden necesitar ser importados diferente:

```typescript
// Puede necesitar cambio según el módulo
import { ref, computed } from 'vue' // Generalmente sigue igual
// vs
import { ref, computed } from '#imports' // Usando auto-imports de Nuxt
```

### 3. Plugins con orden de ejecución

El orden de ejecución de plugins en Nuxt 4 puede ser diferente en algunos casos edge. Si tienes plugins que dependen de otros plugins, verifica que el orden sigue siendo correcto usando el sufijo numérico en el nombre:

```
plugins/
├── 01.auth.ts
├── 02.analytics.ts
└── 03.notifications.ts
```

### 4. Middleware global vs de ruta

La forma de definir middleware global tiene un cambio sutil en Nuxt 4. Verifica que tus middlewares globales tienen la extensión `.global.ts`:

```
middleware/
├── auth.global.ts    # Se ejecuta en todas las rutas
└── admin.ts          # Solo se usa cuando se llama explícitamente
```

## Paso 6: verificar las rutas del servidor

El directorio `server/` y las API routes de Nitro se mantienen en gran parte compatibles, pero hay algunos detalles a verificar.

```typescript
// server/api/usuarios.get.ts
export default defineEventHandler(async (event) => {
  // La API de Nitro/h3 es compatible
  const query = getQuery(event)
  
  // Pero hay nuevas utilidades disponibles
  const body = await readBody(event)
  
  return {
    usuarios: []
  }
})
```

Verifica especialmente los middlewares de servidor si los tienes, ya que pueden tener cambios en la forma de manejar errores.

## Paso 7: actualizar las dependencias de módulos de terceros

Los módulos de la comunidad pueden no estar actualizados para Nuxt 4 inmediatamente. Para cada módulo de tercero que usas:

1. Consulta su repositorio en GitHub para ver si tiene soporte para Nuxt 4
2. Busca en el changelog si hay breaking changes
3. Si el módulo no está actualizado, tienes tres opciones:
   - Esperar a que lo actualicen
   - Reemplazarlo con una alternativa compatible
   - Parchearlo temporalmente si eres capaz de hacerlo

## Errores comunes y sus soluciones

### Error: "Cannot find module '#imports'"

Este error aparece cuando hay un mismatch entre la generación de tipos y el código. Solución:

```bash
npm run nuxi prepare
# o
nuxi prepare
```

### Error: "Hydration mismatch"

Los errores de hidratación en Nuxt 4 son más estrictos. Si ves estos errores, busca código que se ejecute diferente en servidor y cliente sin usar `<ClientOnly>` o `onMounted`.

### Error: "Route not found" en rutas tipadas

Si activaste las rutas tipadas y ves errores sobre rutas que no existen, regenera los tipos:

```bash
nuxi prepare
```

## Herramientas que facilitan la migración

### La guía oficial de migración de Nuxt

El primer recurso que debes leer es la [guía oficial de migración de Nuxt](https://nuxt.com/docs/migration). Es extensa y detallada.

### `nuxi` como herramienta de diagnóstico

```bash
# Verificar la configuración actual
npx nuxi info

# Analizar el bundle
npx nuxi analyze
```

### Codemod de Nuxt

El equipo de Nuxt proporciona codemods para automatizar algunos cambios mecánicos:

```bash
npx @nuxt/codemods migrate
```

Estos codemods pueden actualizar automáticamente patrones de código comunes, ahorrándote trabajo manual.

## Conclusión

La migración de Nuxt 3 a Nuxt 4, bien planificada, es manejable. Los cambios más importantes son la nueva estructura de directorios, el TypeScript strict mode por defecto y algunas actualizaciones en la API de composables. Ninguno de estos cambios es revolucionario si los abordas metodicamente.

Mi recomendación final: no intentes migrar todo en un día. Haz la migración en fases, verifica el funcionamiento después de cada fase, y usa los tests como tu red de seguridad. El resultado —un proyecto más tipado, con mejor rendimiento y más alineado con las mejores prácticas actuales— merece el esfuerzo.
