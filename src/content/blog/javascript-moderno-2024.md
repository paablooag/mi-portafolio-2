---
title: "JavaScript moderno: Features que uso en 2024"
description: "Las características de JavaScript moderno (ES6+) que uso diariamente y que todo desarrollador debería dominar."
pubDate: 2025-10-19T00:00:00.000Z
tags: ["JavaScript", "ES6+", "Frontend", "Best Practices"]
---

# JavaScript moderno: Features que uso en 2024

Estas son las características de JavaScript que uso todos los días.

## 1. Optional Chaining (?.)

```javascript
// ❌ Antes
const userName = user && user.profile && user.profile.name

// ✅ Ahora
const userName = user?.profile?.name
```

## 2. Nullish Coalescing (??)

```javascript
// ❌ Problema con ||
const count = 0
const display = count || 'No items' // ❌ "No items"

// ✅ Solución con ??
const display = count ?? 'No items' // ✅ 0
```

## 3. Destructuring avanzado

```javascript
// Con valores por defecto y renombrado
const { 
  name: userName = 'Anónimo',
  age = 18,
  ...otherData 
} = user

// Arrays
const [first, second, ...rest] = items
const [, , third] = items // Saltar elementos
```

## 4. Spread operator

```javascript
// Combinar objetos
const user = { name: 'Pablo', age: 21 }
const location = { city: 'Granada' }
const complete = { ...user, ...location }

// Copiar arrays
const original = [1, 2, 3]
const copy = [...original]
```

## 5. Template literals avanzados

```javascript
// Multilinea
const html = `
  <div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
  </div>
`

// Tagged templates
const styled = css`
  color: ${props => props.primary ? 'blue' : 'gray'};
`
```

## 6. Array methods modernos

```javascript
// at() - Índice negativo
const last = arr.at(-1)
const secondLast = arr.at(-2)

// findLast()
const lastActive = users.findLast(u => u.active)

// toSorted() - No muta
const sorted = items.toSorted()
```

## 7. Async/await con manejo de errores

```javascript
// Pattern try-catch wrapper
async function fetchData(url) {
  try {
    const response = await fetch(url)
    return await response.json()
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

// Promise.allSettled
const results = await Promise.allSettled([
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments')
])
```

## 8. Object methods útiles

```javascript
// Object.fromEntries
const params = new URLSearchParams(location.search)
const paramsObj = Object.fromEntries(params)

// Object.hasOwn (mejor que hasOwnProperty)
if (Object.hasOwn(obj, 'property')) {
  // ...
}
```

## 9. Numeric separators

```javascript
// Más legible
const billion = 1_000_000_000
const bytes = 0xFF_00_00
```

## 10. Top-level await

```javascript
// En módulos ES, sin función async
const data = await fetch('/api/data')
const users = await data.json()

export { users }
```

## 11. Private class fields

```javascript
class User {
  #privateField = 'secreto'
  
  getSecret() {
    return this.#privateField
  }
}
```

## 12. Logical assignment

```javascript
// ??=
user.name ??= 'Anónimo'

// ||=
settings.theme ||= 'light'

// &&=
if (user.isAdmin) {
  user.permissions &&= [...user.permissions, 'delete']
}
```

## Mi uso diario

En proyectos Vue/Nuxt uso esto constantemente:

```javascript
// Composable ejemplo
export function useApi() {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)
  
  async function fetch(url, options = {}) {
    loading.value = true
    error.value = null
    
    try {
      const response = await $fetch(url, options)
      data.value = response
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }
  
  return { data, error, loading, fetch }
}
```

## Conclusión

JavaScript moderno hace el código más legible y menos propenso a bugs. ¡Úsalo!

