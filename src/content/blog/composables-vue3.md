---
title: "Composables en Vue 3: Reutiliza lógica como un pro"
description: "Descubre cómo los composables de Vue 3 te permiten compartir lógica entre componentes de forma elegante y eficiente."
pubDate: 2025-10-20T00:00:00.000Z
tags: ["Vue.js", "Composition API", "Frontend", "JavaScript"]
---

# Composables en Vue 3: Reutiliza lógica como un pro

Los composables son una de las características más poderosas de Vue 3 Composition API.

## ¿Qué es un composable?

Un composable es una función que encapsula y reutiliza lógica stateful usando las APIs de composición de Vue.

## Ejemplo: useLocalStorage

```javascript
// composables/useLocalStorage.js
import { ref, watch } from 'vue'

export function useLocalStorage(key, defaultValue) {
  const storedValue = localStorage.getItem(key)
  const value = ref(storedValue ? JSON.parse(storedValue) : defaultValue)

  watch(value, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue))
  }, { deep: true })

  return value
}
```

## Uso en componentes

```vue
<script setup>
import { useLocalStorage } from '@/composables/useLocalStorage'

const user = useLocalStorage('user', { name: '', email: '' })
</script>
```

## Ventajas

- ✅ Reutilización de lógica
- ✅ Código más limpio
- ✅ Mejor testing
- ✅ Type-safe con TypeScript

## Cuándo usar composables

- Lógica compartida entre componentes
- Interacción con APIs externas
- Gestión de estado local
- Manejo de eventos del navegador

¡Los composables revolucionan la forma de escribir Vue!

