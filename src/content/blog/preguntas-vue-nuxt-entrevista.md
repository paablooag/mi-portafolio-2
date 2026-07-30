---
title: "Preguntas de Vue.js y Nuxt que te harán en entrevistas (con respuestas)"
description: "15 preguntas frecuentes de Vue.js y 10 de Nuxt en entrevistas técnicas: Composition API, reactividad, Pinia, SSR vs SSG, middleware, SEO y mucho más."
pubDate: 2025-08-15
author: "Pablo Alcalde García"
tags: ["vue", "nuxt", "entrevistas", "frontend", "javascript"]
draft: false
---

Si te estás preparando para una entrevista de frontend con stack Vue.js o Nuxt, este artículo es para ti. He recopilado las 25 preguntas que más se repiten en procesos de selección para posiciones junior y mid con estos frameworks, junto con respuestas claras y ejemplos de código que puedes usar como referencia.

Importante: no te las memorices de forma mecánica. Entiende los conceptos, juega con los ejemplos en tu propio proyecto y construye tu propia explicación. Eso es lo que marca la diferencia en una entrevista.

---

## Preguntas de Vue.js

### 1. ¿Cuál es la diferencia entre Composition API y Options API?

Esta es casi garantizada en cualquier entrevista de Vue hoy en día.

**Options API** (Vue 2 y Vue 3 compatible) organiza el código por tipo de opción: `data`, `methods`, `computed`, `watch`, `lifecycle hooks`. Es más intuitiva para quien viene de Vue 2 o para componentes simples.

**Composition API** (Vue 3) organiza el código por funcionalidad lógica, usando funciones como `ref`, `reactive`, `computed`, `watch` dentro del `setup()` o con `<script setup>`. Su gran ventaja es que permite extraer lógica en **composables** reutilizables.

```vue
<!-- Options API -->
<script>
export default {
  data() {
    return { count: 0 };
  },
  methods: {
    increment() { this.count++; }
  }
};
</script>

<!-- Composition API con <script setup> -->
<script setup>
import { ref } from 'vue';
const count = ref(0);
const increment = () => count.value++;
</script>
```

La Composition API no reemplaza a la Options API: ambas conviven en Vue 3. La recomendación actual para proyectos nuevos es usar Composition API con `<script setup>`.

---

### 2. ¿Cómo funciona el sistema de reactividad de Vue?

Vue 3 usa Proxies de JavaScript para interceptar las operaciones de lectura y escritura en los objetos reactivos. Cuando accedes a una propiedad reactiva dentro de un efecto (computed, watch, template), Vue registra esa dependencia. Cuando la propiedad cambia, Vue notifica a todos los efectos que dependen de ella y los re-ejecuta.

```javascript
import { ref, computed, watchEffect } from 'vue';

const nombre = ref('Pablo');
const saludo = computed(() => `Hola, ${nombre.value}`);

watchEffect(() => {
  console.log(saludo.value); // Se re-ejecuta cuando nombre cambia
});

nombre.value = 'Ana'; // Dispara el watchEffect
```

La diferencia entre `ref` y `reactive`: `ref` envuelve un valor primitivo o complejo en un objeto con `.value`, mientras que `reactive` hace reactivo un objeto completo (sin la necesidad de `.value`).

---

### 3. ¿Cuándo usar `computed` vs `watch`?

**`computed`:** Para valores derivados que se calculan a partir de otros datos reactivos. Se cachea y solo se recalcula cuando sus dependencias cambian. Úsalo cuando necesitas transformar o combinar datos reactivos.

**`watch`:** Para efectos secundarios en respuesta a cambios: llamadas a APIs, manipulación del DOM, operaciones asíncronas. Úsalo cuando el cambio de un dato debe disparar algo que no es solo un cálculo.

```javascript
// computed: valor derivado
const totalConIVA = computed(() => precio.value * 1.21);

// watch: efecto secundario cuando cambia un dato
watch(userId, async (newId) => {
  userData.value = await fetchUser(newId);
});
```

---

### 4. ¿Qué son los lifecycle hooks en Vue 3?

Los lifecycle hooks son funciones que se ejecutan en momentos específicos del ciclo de vida de un componente.

Los principales en Vue 3 con Composition API:

- `onBeforeMount` / `onMounted`: antes/después de que el componente se monte en el DOM
- `onBeforeUpdate` / `onUpdated`: antes/después de que el componente se actualice
- `onBeforeUnmount` / `onUnmounted`: antes/después de que el componente se destruya
- `onErrorCaptured`: cuando un error burbujea desde un componente hijo

```javascript
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
  console.log('Componente montado, el DOM está disponible');
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize); // limpieza
});
```

---

### 5. ¿Cuál es la diferencia entre Pinia y Vuex?

**Vuex** es el store oficial de Vue 2 (aunque funciona con Vue 3). Tiene una estructura rígida: state, getters, mutations (síncronas), actions (asíncronas). Las mutaciones son obligatorias para modificar el estado.

**Pinia** es el store oficial de Vue 3. Es más simple, más flexible y tiene mejor soporte para TypeScript. No requiere mutaciones: puedes modificar el estado directamente en las actions. Es compatible con la Composition API de forma nativa.

```javascript
// Pinia store
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const isLoggedIn = computed(() => !!user.value);

  async function login(credentials) {
    user.value = await authApi.login(credentials);
  }

  return { user, isLoggedIn, login };
});
```

Para proyectos nuevos en Vue 3, Pinia es la elección recomendada.

---

### 6. ¿Qué son los composables y para qué sirven?

Los composables son funciones que encapsulan y reutilizan lógica con estado usando la Composition API. Son el equivalente de los React Hooks pero en Vue.

```javascript
// useCounter.js - composable reutilizable
import { ref } from 'vue';

export function useCounter(initialValue = 0) {
  const count = ref(initialValue);
  const increment = () => count.value++;
  const decrement = () => count.value--;
  const reset = () => (count.value = initialValue);

  return { count, increment, decrement, reset };
}

// En cualquier componente
const { count, increment } = useCounter(10);
```

Los composables son el patrón principal de reutilización de lógica en Vue 3, reemplazando a los mixins de Vue 2.

---

### 7. ¿Cómo funciona `v-model` en componentes personalizados?

En un componente hijo, `v-model` es azúcar sintáctico para `:modelValue` (prop) + `@update:modelValue` (emit).

```vue
<!-- Componente padre -->
<MiInput v-model="texto" />

<!-- Equivalente a -->
<MiInput :modelValue="texto" @update:modelValue="texto = $event" />

<!-- Componente hijo MiInput.vue -->
<script setup>
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <input
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
```

En Vue 3, puedes tener múltiples `v-model` en un componente: `v-model:titulo`, `v-model:descripcion`, etc.

---

### 8. ¿Qué es el Teleport en Vue 3?

`<Teleport>` permite renderizar contenido de un componente en un nodo del DOM diferente al del componente padre, aunque lógicamente siga perteneciendo al componente.

Es ideal para modales, tooltips, dropdowns o cualquier elemento que necesite estar fuera del árbol de su componente por razones de estilos o z-index.

```vue
<template>
  <button @click="show = true">Abrir modal</button>

  <Teleport to="body">
    <div v-if="show" class="modal">
      <p>Contenido del modal renderizado en body</p>
      <button @click="show = false">Cerrar</button>
    </div>
  </Teleport>
</template>
```

---

### 9. ¿Cuál es la diferencia entre `ref` y `reactive`?

- `ref`: acepta cualquier tipo de valor (primitivos u objetos). Accedes al valor con `.value`. Cuando usas objetos con `ref`, internamente usa `reactive`.
- `reactive`: solo acepta objetos/arrays. No necesitas `.value`. No funciona bien con destructuring (pierdes la reactividad).

```javascript
const count = ref(0); // necesita .value
count.value++;

const state = reactive({ nombre: 'Pablo', edad: 30 }); // sin .value
state.nombre = 'Ana';

// Problema con destructuring de reactive
const { nombre } = state; // nombre ya no es reactivo
// Solución: usar toRefs
const { nombre } = toRefs(state); // nombre sí es reactivo
```

---

### 10. ¿Qué son los provide/inject?

Son un mecanismo para pasar datos desde un componente padre a cualquier descendiente profundo, sin necesidad de "prop drilling" (pasar props por todos los niveles intermedios).

```javascript
// Componente padre o root
import { provide, ref } from 'vue';
const tema = ref('oscuro');
provide('tema', tema);

// Componente nieto (cualquier profundidad)
import { inject } from 'vue';
const tema = inject('tema');
```

Son útiles para configuración global, theming o datos de contexto que muchos componentes necesitan. Para estado complejo compartido entre muchos componentes, sigue siendo mejor Pinia.

---

### 11. ¿Cómo funciona el Virtual DOM en Vue?

Vue mantiene una representación en memoria del DOM (Virtual DOM o VDOM) como un árbol de objetos JavaScript. Cuando el estado cambia, Vue genera un nuevo VDOM, lo compara con el anterior (proceso llamado "diffing") y aplica al DOM real solo los cambios mínimos necesarios. Esto es más eficiente que manipular el DOM directamente en cada cambio.

Vue 3 optimizó el algoritmo de diffing con heurísticas de compilación: el compilador de templates marca qué partes son estáticas (no necesitan diffing) y qué partes son dinámicas.

---

### 12. ¿Qué es `<Suspense>` en Vue 3?

`<Suspense>` es un componente built-in que permite manejar el estado de carga de componentes asíncronos, mostrando un fallback mientras el componente carga.

```vue
<Suspense>
  <template #default>
    <ComponenteAsincronoQueUsaAwait />
  </template>
  <template #fallback>
    <LoadingSpinner />
  </template>
</Suspense>
```

Funciona con componentes que usan `async setup()` o importación dinámica. Es especialmente útil en Nuxt donde muchos composables son asíncronos.

---

### 13. ¿Qué son los slots?

Los slots permiten pasar contenido desde el padre al hijo como si fueran "huecos" en el template del componente hijo.

```vue
<!-- Componente Card.vue -->
<template>
  <div class="card">
    <slot name="header" />
    <slot /> <!-- slot por defecto -->
    <slot name="footer" />
  </div>
</template>

<!-- Uso en el padre -->
<Card>
  <template #header><h2>Título</h2></template>
  <p>Contenido del cuerpo</p>
  <template #footer><button>Acción</button></template>
</Card>
```

Los scoped slots van más allá: el hijo puede pasar datos al padre a través del slot.

---

### 14. ¿Cuándo usar `shallowRef` o `shallowReactive`?

Cuando tienes objetos muy grandes o profundamente anidados y no necesitas que Vue sea reactivo a los cambios en niveles profundos. La reactividad "shallow" solo observa el nivel superior.

```javascript
const estado = shallowRef({ lista: Array(10000).fill({...}) });
// Cambios en estado.value son reactivos
// Cambios en estado.value.lista[0] NO son reactivos
```

Útil para optimizar rendimiento en casos específicos donde la reactividad profunda es un cuello de botella.

---

### 15. ¿Qué es `defineProps` y `defineEmits` en `<script setup>`?

Son macros del compilador disponibles en `<script setup>` para definir las props y los eventos del componente de forma tipada y concisa.

```vue
<script setup>
const props = defineProps({
  titulo: { type: String, required: true },
  activo: { type: Boolean, default: false }
});

const emit = defineEmits(['cambiar', 'cerrar']);

function manejar() {
  emit('cambiar', 'nuevo valor');
}
</script>
```

Con TypeScript puedes usar la sintaxis genérica: `defineProps<{ titulo: string; activo?: boolean }>()`.

---

## Preguntas de Nuxt

### 16. ¿Cuál es la diferencia entre SSR, SSG e ISR en Nuxt?

Esta es la pregunta más importante de Nuxt y la que más diferencia hay entre candidatos que lo conocen de verdad y los que solo lo han tocado por encima.

**SSR (Server-Side Rendering):** El HTML se genera en el servidor en cada request. Ideal para páginas con datos que cambian frecuentemente o que dependen del usuario. El servidor recibe la petición, obtiene los datos y devuelve HTML completo.

**SSG (Static Site Generation):** El HTML se genera en tiempo de build para todas las rutas conocidas. Los archivos estáticos resultantes se sirven desde un CDN. Extremadamente rápido, ideal para blogs, documentación o cualquier contenido que no cambia entre requests.

**ISR (Incremental Static Regeneration):** Combina lo mejor de SSR y SSG. Las páginas se generan estáticamente pero con un tiempo de vida (TTL). Cuando el TTL expira, la próxima visita regenera la página en el servidor. Disponible en Nuxt con el módulo de `routeRules`.

```typescript
// nuxt.config.ts - configuración de routeRules
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true },           // SSG
    '/blog/**': { isr: 3600 },          // ISR cada hora
    '/dashboard/**': { ssr: true },     // SSR siempre
    '/estatico': { static: true }       // Estático puro
  }
});
```

---

### 17. ¿Qué son los composables de Nuxt?

Nuxt auto-importa una serie de composables útiles disponibles en toda la aplicación:

- `useRoute()` / `useRouter()`: acceso a la ruta actual y navegación programática
- `useFetch()` / `useAsyncData()`: fetching de datos con SSR support
- `useState()`: estado compartido entre servidor y cliente que se hidrata correctamente
- `useRuntimeConfig()`: acceso a la configuración de runtime (variables de entorno)
- `useHead()` / `useSeoMeta()`: manipulación de metaetiquetas para SEO
- `useNuxtApp()`: acceso a la instancia de la aplicación Nuxt
- `navigateTo()`: navegación programática

```javascript
// Fetching con SSR correcto
const { data, pending, error } = await useFetch('/api/posts');

// Estado compartido entre servidor y cliente
const count = useState('globalCount', () => 0);
```

---

### 18. ¿Cómo funciona el middleware en Nuxt?

El middleware son funciones que se ejecutan antes de renderizar una página o grupo de páginas. Se usan para autenticación, redirecciones, validación de datos, etc.

Hay tres tipos:

**Inline (en el componente):**
```javascript
definePageMeta({
  middleware: (to, from) => {
    if (!useAuthStore().isLoggedIn) {
      return navigateTo('/login');
    }
  }
});
```

**Named (en `/middleware/`):**
```javascript
// middleware/auth.ts
export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStore();
  if (!auth.isLoggedIn) return navigateTo('/login');
});

// En la página
definePageMeta({ middleware: 'auth' });
```

**Global (se aplica a todas las rutas):** Añade `.global` al nombre del archivo: `middleware/logging.global.ts`.

---

### 19. ¿Cómo manejas el SEO en Nuxt?

Nuxt facilita el SEO con varias herramientas built-in:

```vue
<script setup>
useSeoMeta({
  title: 'Mi página',
  description: 'Descripción para SEO de 150-160 caracteres',
  ogTitle: 'Mi página en Open Graph',
  ogImage: 'https://ejemplo.com/imagen.jpg',
  twitterCard: 'summary_large_image',
});
</script>
```

Para títulos dinámicos con plantilla:
```javascript
// app.vue o nuxt.config.ts
useHead({
  titleTemplate: '%s | Mi Sitio Web'
});
```

Con SSR, estas metaetiquetas se generan en el servidor y están disponibles para los crawlers de buscadores y redes sociales desde el primer request, lo que es fundamental para el SEO.

---

### 20. ¿Qué son los plugins de Nuxt?

Los plugins en Nuxt son archivos que se ejecutan antes de que la aplicación se monte. Se usan para registrar componentes globales, inicializar librerías de terceros, configurar instancias de Vue, etc.

```javascript
// plugins/myPlugin.ts
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('focus', {
    mounted(el) { el.focus(); }
  });

  return {
    provide: {
      miServicio: new MiServicio()
    }
  };
});

// Acceder al servicio en componentes
const { $miServicio } = useNuxtApp();
```

El sufijo `.client.ts` hace que el plugin solo se ejecute en cliente; `.server.ts`, solo en servidor.

---

### 21. ¿Cómo funcionan las rutas de API en Nuxt (server routes)?

Nuxt permite crear endpoints de API dentro del mismo proyecto en la carpeta `/server/api/`. Estos se ejecutan en el servidor y nunca llegan al cliente.

```javascript
// server/api/users/[id].get.ts
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const user = await db.users.findOne(id);
  return user;
});

// En el componente
const { data } = await useFetch(`/api/users/${id}`);
```

Esto es muy útil para hacer llamadas a bases de datos o APIs de terceros sin exponer credenciales al cliente.

---

### 22. ¿Cuál es la diferencia entre `useFetch` y `useAsyncData`?

Ambos sirven para fetching de datos con soporte SSR (los datos se obtienen en el servidor y se hidratan en el cliente sin hacer la petición de nuevo):

- `useFetch(url)` es un wrapper de `useAsyncData` para el caso común de hacer una petición HTTP
- `useAsyncData(key, handler)` es más flexible: acepta cualquier función asíncrona, no solo peticiones HTTP

```javascript
// useFetch - para peticiones HTTP simples
const { data } = await useFetch('/api/posts');

// useAsyncData - para lógica más compleja
const { data } = await useAsyncData('posts', async () => {
  const posts = await db.posts.findAll();
  return posts.map(transformPost);
});
```

La clave es siempre proporcionar un `key` único en `useAsyncData` para que Nuxt pueda cachear y deduplicar correctamente.

---

### 23. ¿Cómo configuras variables de entorno en Nuxt?

Nuxt distingue entre variables de entorno públicas (accesibles en cliente y servidor) y privadas (solo servidor):

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    // Solo servidor
    dbPassword: process.env.DB_PASSWORD,
    // Público (cliente y servidor)
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE
    }
  }
});

// En componentes o composables
const config = useRuntimeConfig();
config.public.apiBase; // disponible en cliente y servidor
config.dbPassword; // solo disponible en servidor
```

---

### 24. ¿Qué es el módulo `@nuxt/content`?

Nuxt Content es un módulo que convierte el directorio `/content` en una base de datos de archivos Markdown, YAML o JSON. Permite crear blogs, documentación o cualquier sitio basado en contenido con MDX y búsqueda full-text incluida.

---

### 25. ¿Qué estrategia de hidratación usa Nuxt?

Nuxt usa hidratación completa por defecto: el HTML se genera en el servidor con todos los datos, y luego Vue "hidrata" el HTML estático convirtiéndolo en una SPA interactiva en el cliente. Desde Nuxt 3.7, también soporta hidratación perezosa con componentes lazy y renderizado del lado del servidor de componentes específicos con `<NuxtIsland>`.

---

## Conclusión

Dominar estas preguntas te prepara para la gran mayoría de entrevistas con Vue.js y Nuxt. Pero recuerda: la diferencia entre una respuesta buena y una excelente en entrevista es la profundidad. No te quedes solo en la definición; añade cuándo usarías cada cosa, qué trade-offs implica y un ejemplo concreto de tu experiencia real.
