---
title: "Pinia vs Vuex: Por qué cambié y no miro atrás"
description: "Comparativa entre Pinia y Vuex para gestión de estado en Vue.js. Descubre por qué Pinia es el futuro."
pubDate: 2025-10-19T00:00:00.000Z
tags: ["Vue.js", "Pinia", "State Management", "Frontend"]
---

# Pinia vs Vuex: Por qué cambié y no miro atrás

Pinia es ahora el state manager oficial de Vue. Te cuento por qué es superior a Vuex.

## Las limitaciones de Vuex

Después de años usando Vuex, estos eran mis problemas:

1. **Boilerplate excesivo** (mutations, actions, getters)
2. **No type-safe** sin TypeScript complicado
3. **Estructura rígida** (modules con namespaces)
4. **DevTools limitado**

## Por qué Pinia es mejor

### 1. Menos código

**Vuex:**
```javascript
// store/user.js
export default {
  namespaced: true,
  state: () => ({
    user: null
  }),
  mutations: {
    SET_USER(state, user) {
      state.user = user
    }
  },
  actions: {
    async fetchUser({ commit }, id) {
      const user = await api.getUser(id)
      commit('SET_USER', user)
    }
  },
  getters: {
    userName: state => state.user?.name
  }
}
```

**Pinia:**
```javascript
// stores/user.js
export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),
  actions: {
    async fetchUser(id) {
      this.user = await api.getUser(id)
    }
  },
  getters: {
    userName: (state) => state.user?.name
  }
})
```

### 2. TypeScript perfecto

```typescript
// Con Pinia, TypeScript funciona automáticamente
const userStore = useUserStore()
userStore.user.name // ✅ Autocomplete perfecto
```

### 3. Composition API

```javascript
// Pinia con setup syntax
export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  
  async function fetchUser(id) {
    user.value = await api.getUser(id)
  }
  
  const userName = computed(() => user.value?.name)
  
  return { user, fetchUser, userName }
})
```

### 4. Hot Module Replacement

Pinia soporta HMR sin perder el estado. Increíble para DX.

### 5. Plugins poderosos

```javascript
// Ejemplo: Persistencia automática
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
```

## Migración de Vuex a Pinia

### Paso 1: Instalar Pinia

```bash
npm install pinia
```

### Paso 2: Setup

```javascript
// main.js
import { createPinia } from 'pinia'

app.use(createPinia())
```

### Paso 3: Convertir stores

No hace falta mutations, solo actions que modifican state directamente.

## Mi experiencia

Migré 15 stores de Vuex a Pinia en [Wegow](https://wegow.com):

- 40% menos código
- TypeScript sin configuración extra
- DevTools más útil
- Equipo más feliz 😊

## Conclusión

Si empiezas un proyecto nuevo, usa Pinia. Si tienes Vuex, migra cuando puedas. No te arrepentirás.

