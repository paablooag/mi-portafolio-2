---
title: "Nuxt: como empezar en 2025"
description: "Guía breve y accionable sobre nuxt para aplicar en 2025."
pubDate: 2025-03-05T00:00:00.000Z
tags: ["Rendimiento","Seguridad","Serverless","Pagos"]
---

# Nuxt: como empezar en 2025

Guía completa para empezar con Nuxt 3 en 2025. Aprende los conceptos fundamentales, configuración inicial y mejores prácticas para construir aplicaciones web modernas y optimizadas.

## ¿Qué es Nuxt?

Nuxt es un framework de Vue.js que simplifica el desarrollo de aplicaciones web modernas proporcionando:
- **Server-Side Rendering (SSR)** - Mejor SEO y rendimiento inicial
- **Static Site Generation (SSG)** - Sitios estáticos ultra-rápidos
- **File-based routing** - Rutas automáticas basadas en estructura de archivos
- **Auto-imports** - Componentes y composables importados automáticamente
- **Optimizaciones integradas** - Code splitting, lazy loading, y más

## Instalación y Configuración Inicial

### Crear un nuevo proyecto

```bash
# Usando npx (recomendado)
npx nuxi@latest init mi-proyecto

# O usando npm
npm create nuxt-app@latest mi-proyecto

# Con yarn
yarn create nuxt-app mi-proyecto

# Con pnpm
pnpm create nuxt-app mi-proyecto
```

### Estructura de directorios

```
mi-proyecto/
├── assets/          # Assets que necesitan procesamiento (SCSS, imágenes)
├── components/      # Componentes Vue (auto-importados)
├── composables/    # Composables reutilizables (auto-importados)
├── layouts/         # Layouts de página
├── middleware/     # Middleware de rutas
├── pages/          # File-based routing (genera rutas automáticamente)
├── plugins/        # Plugins de Nuxt
├── public/          # Assets estáticos
├── server/          # API routes y server middleware
├── nuxt.config.ts  # Configuración de Nuxt
└── app.vue         # Componente raíz
```

## Conceptos Fundamentales

### 1. File-based Routing

Nuxt genera rutas automáticamente basándose en la estructura de `pages/`:

```
pages/
├── index.vue          → /
├── about.vue          → /about
├── blog/
│   ├── index.vue      → /blog
│   └── [slug].vue     → /blog/:slug
└── contact.vue         → /contact
```

**Ejemplo de página dinámica:**
```vue
<!-- pages/blog/[slug].vue -->
<template>
  <article>
    <h1>{{ post.title }}</h1>
    <div v-html="post.content"></div>
  </article>
</template>

<script setup>
const route = useRoute();
const { data: post } = await useFetch(`/api/posts/${route.params.slug}`);
</script>
```

### 2. Auto-imports

Nuxt importa automáticamente:
- **Composables**: `useRoute()`, `useRouter()`, `useFetch()`, etc.
- **Componentes**: Cualquier componente en `components/`
- **Utilidades**: Helpers de Vue y Nuxt

```vue
<!-- No necesitas importar -->
<script setup>
// useRoute() está disponible automáticamente
const route = useRoute();

// Componentes en components/ también
// <MyComponent /> funciona sin import
</script>
```

### 3. Data Fetching

**useFetch** - Para datos que cambian (con caché automática):
```vue
<script setup>
const { data, error, pending } = await useFetch('/api/users');
</script>
```

**useAsyncData** - Para lógica de fetching personalizada:
```vue
<script setup>
const { data } = await useAsyncData('users', async () => {
  return await $fetch('/api/users');
});
</script>
```

**$fetch** - Para llamadas directas sin reactividad:
```javascript
const users = await $fetch('/api/users');
```

### 4. Server Routes (API)

Crea endpoints API en `server/api/`:

```typescript
// server/api/users/index.ts
export default defineEventHandler(async (event) => {
  const users = await getUsersFromDB();
  return users;
});

// server/api/users/[id].ts
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const user = await getUserById(id);
  return user;
});
```

### 5. Composables Personalizados

```typescript
// composables/useAuth.ts
export const useAuth = () => {
  const user = useState('user', () => null);
  
  const login = async (email: string, password: string) => {
    const data = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email, password }
    });
    user.value = data.user;
  };
  
  return { user, login };
};
```

Uso:
```vue
<script setup>
const { user, login } = useAuth();
</script>
```

## Configuración Básica

### nuxt.config.ts

```typescript
export default defineNuxtConfig({
  // Meta tags globales
  app: {
    head: {
      title: 'Mi Aplicación',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  
  // CSS global
  css: ['~/assets/css/main.css'],
  
  // Módulos
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  
  // Runtime config (público)
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:3000'
    }
  },
  
  // SSR/SSG
  ssr: true, // o false para SPA
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  }
});
```

## Rendering Modes

### 1. Universal Rendering (SSR + CSR)
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: true // Por defecto
});
```

### 2. Static Site Generation (SSG)
```typescript
export default defineNuxtConfig({
  ssr: true,
  nitro: {
    prerender: {
      routes: ['/'] // Pre-renderizar rutas específicas
      // o crawls: true para todas las rutas
    }
  }
});
```

### 3. Single Page Application (SPA)
```typescript
export default defineNuxtConfig({
  ssr: false
});
```

## Mejores Prácticas

### 1. Organización de Componentes

```
components/
├── base/           # Componentes base reutilizables
│   ├── Button.vue
│   └── Input.vue
├── layout/         # Componentes de layout
│   └── Header.vue
└── features/       # Componentes específicos de features
    └── BlogCard.vue
```

### 2. Estado Global con Pinia

```typescript
// stores/user.ts
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),
  actions: {
    async fetchUser() {
      this.user = await $fetch('/api/user');
    }
  }
});
```

### 3. Middleware

```typescript
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useAuth();
  if (!user.value) {
    return navigateTo('/login');
  }
});
```

Uso:
```vue
<!-- pages/dashboard.vue -->
<script setup>
definePageMeta({
  middleware: 'auth'
});
</script>
```

### 4. SEO y Meta Tags

```vue
<script setup>
useHead({
  title: 'Mi Página',
  meta: [
    { name: 'description', content: 'Descripción de la página' },
    { property: 'og:title', content: 'Mi Página' }
  ]
});
</script>
```

## Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview de build
npm run preview

# Generar sitio estático
npm run generate

# Análisis de bundle
npm run analyze
```

## Qué hacer ahora

1. **Crea tu primer proyecto Nuxt** usando `npx nuxi@latest init` y explora la estructura
2. **Implementa una página con data fetching** usando `useFetch()` para entender el flujo de datos
3. **Mide el rendimiento** con Lighthouse y compara SSR vs SPA para validar mejoras en SEO y tiempo de carga
