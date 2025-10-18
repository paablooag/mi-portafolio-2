---
title: "Patterns para consumir APIs en Vue/Nuxt"
description: "Patrones y mejores prácticas para integrar y consumir APIs REST en aplicaciones Vue.js y Nuxt.js."
pubDate: 2025-10-18T00:00:00.000Z
tags: ["Vue.js", "Nuxt.js", "API", "Architecture"]
---

# Patterns para consumir APIs en Vue/Nuxt

Así gestiono las llamadas a APIs en mis proyectos de producción.

## Pattern 1: Composable useApi

```javascript
// composables/useApi.js
export function useApi(url, options = {}) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)
  
  async function execute() {
    loading.value = true
    error.value = null
    
    try {
      const response = await $fetch(url, options)
      data.value = response
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }
  
  return { data, error, loading, execute }
}
```

### Uso

```vue
<script setup>
const { data: users, loading, execute } = useApi('/api/users')

onMounted(() => execute())
</script>

<template>
  <div v-if="loading">Cargando...</div>
  <div v-else-if="users">
    <div v-for="user in users" :key="user.id">
      {{ user.name }}
    </div>
  </div>
</template>
```

## Pattern 2: Service Layer

```javascript
// services/api/users.js
class UserService {
  constructor(httpClient) {
    this.http = httpClient
  }
  
  async getAll(params = {}) {
    return this.http.get('/users', { params })
  }
  
  async getById(id) {
    return this.http.get(`/users/${id}`)
  }
  
  async create(data) {
    return this.http.post('/users', data)
  }
  
  async update(id, data) {
    return this.http.put(`/users/${id}`, data)
  }
  
  async delete(id) {
    return this.http.delete(`/users/${id}`)
  }
}

export const userService = new UserService($fetch)
```

### Uso

```javascript
// En componente
const users = await userService.getAll({ limit: 10 })
```

## Pattern 3: Nuxt useFetch

```vue
<script setup>
const { data: users, pending, error, refresh } = await useFetch('/api/users', {
  key: 'users',
  transform: (data) => data.users,
  pick: ['id', 'name', 'email'],
  watch: [searchQuery],
  onResponse({ response }) {
    console.log('Response:', response)
  }
})
</script>
```

## Pattern 4: Interceptors

```javascript
// plugins/api.js
export default defineNuxtPlugin(() => {
  const api = $fetch.create({
    baseURL: '/api',
    
    // Request interceptor
    onRequest({ options }) {
      const token = useCookie('auth-token')
      
      if (token.value) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token.value}`
        }
      }
    },
    
    // Response interceptor
    onResponse({ response }) {
      // Log todas las respuestas
      console.log('API Response:', response.status)
    },
    
    // Error interceptor
    onResponseError({ response }) {
      if (response.status === 401) {
        navigateTo('/login')
      }
    }
  })
  
  return {
    provide: {
      api
    }
  }
})
```

## Pattern 5: Reactive Queries

```javascript
// composables/useUsers.js
export function useUsers(filters = {}) {
  const filtersRef = ref(filters)
  const enabled = ref(true)
  
  const { data, pending, error, refresh } = useFetch('/api/users', {
    query: filtersRef,
    immediate: enabled,
    watch: [filtersRef]
  })
  
  const users = computed(() => data.value?.users || [])
  const total = computed(() => data.value?.total || 0)
  
  return {
    users,
    total,
    loading: pending,
    error,
    refresh,
    filters: filtersRef
  }
}
```

### Uso

```vue
<script setup>
const filters = ref({ role: 'admin' })
const { users, total, loading } = useUsers(filters)

// Cambiar filtros reactivamente
function filterByRole(role) {
  filters.value.role = role
}
</script>
```

## Pattern 6: Optimistic Updates

```javascript
export function useUpdateUser() {
  const users = useState('users')
  
  async function update(id, data) {
    // Guardar estado original
    const original = users.value.find(u => u.id === id)
    
    // Update optimista
    const index = users.value.findIndex(u => u.id === id)
    users.value[index] = { ...original, ...data }
    
    try {
      await $fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: data
      })
    } catch (error) {
      // Revertir en caso de error
      users.value[index] = original
      throw error
    }
  }
  
  return { update }
}
```

## Pattern 7: Polling

```javascript
export function usePolling(url, interval = 5000) {
  const data = ref(null)
  const error = ref(null)
  let timer = null
  
  async function fetch() {
    try {
      data.value = await $fetch(url)
      error.value = null
    } catch (e) {
      error.value = e
    }
  }
  
  function start() {
    fetch()
    timer = setInterval(fetch, interval)
  }
  
  function stop() {
    clearInterval(timer)
  }
  
  onMounted(start)
  onUnmounted(stop)
  
  return { data, error, start, stop }
}
```

## Pattern 8: Infinite Scroll

```javascript
export function useInfiniteScroll(endpoint) {
  const items = ref([])
  const page = ref(1)
  const hasMore = ref(true)
  const loading = ref(false)
  
  async function loadMore() {
    if (loading.value || !hasMore.value) return
    
    loading.value = true
    
    try {
      const data = await $fetch(endpoint, {
        params: { page: page.value }
      })
      
      items.value.push(...data.items)
      hasMore.value = data.hasMore
      page.value++
    } finally {
      loading.value = false
    }
  }
  
  return { items, loadMore, hasMore, loading }
}
```

## Pattern 9: Cache con useState

```javascript
export async function getCachedUsers() {
  const users = useState('users', () => null)
  
  if (!users.value) {
    users.value = await $fetch('/api/users')
  }
  
  return users
}
```

## Pattern 10: Error Handling

```javascript
export function useApiError() {
  const toast = useToast()
  
  function handleError(error) {
    const message = {
      400: 'Solicitud inválida',
      401: 'No autorizado',
      403: 'Sin permisos',
      404: 'No encontrado',
      500: 'Error del servidor'
    }[error.status] || 'Error desconocido'
    
    toast.error(message)
    
    // Log para debugging
    if (process.dev) {
      console.error('API Error:', error)
    }
  }
  
  return { handleError }
}
```

## Mi stack en producción

```javascript
// Combinación de patterns
export function useUserCRUD() {
  const { data: users, refresh } = useFetch('/api/users', {
    key: 'users',
    transform: (data) => data.users
  })
  
  const { handleError } = useApiError()
  
  async function create(userData) {
    try {
      await $fetch('/api/users', {
        method: 'POST',
        body: userData
      })
      await refresh()
    } catch (error) {
      handleError(error)
    }
  }
  
  async function update(id, userData) {
    try {
      await $fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: userData
      })
      await refresh()
    } catch (error) {
      handleError(error)
    }
  }
  
  async function remove(id) {
    try {
      await $fetch(`/api/users/${id}`, {
        method: 'DELETE'
      })
      await refresh()
    } catch (error) {
      handleError(error)
    }
  }
  
  return { users, create, update, remove }
}
```

## Conclusión

La clave es elegir el pattern correcto para cada caso. En Wegow combinamos varios de estos para tener un código limpio y mantenible.

