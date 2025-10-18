---
title: "Cómo crear componentes reutilizables en Vue.js"
description: "Aprende a diseñar componentes Vue.js modulares y reutilizables siguiendo las mejores prácticas de desarrollo."
pubDate: 2025-10-21T00:00:00.000Z
tags: ["Vue.js", "Frontend", "Best Practices", "Components"]
---

# Cómo crear componentes reutilizables en Vue.js

La reutilización de componentes es fundamental para mantener un código limpio y escalable en Vue.js.

## Principios básicos

Un buen componente reutilizable debe ser:

1. **Independiente**: No debe depender de contextos externos
2. **Configurable**: Acepta props para personalización
3. **Predecible**: Comportamiento consistente
4. **Documentado**: Fácil de entender y usar

## Ejemplo práctico

```vue
<template>
  <button 
    :class="buttonClass" 
    :disabled="disabled"
    @click="handleClick"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger'].includes(value)
  },
  disabled: Boolean,
  label: String
})

const emit = defineEmits(['click'])

const buttonClass = computed(() => ({
  'btn': true,
  [`btn-${props.variant}`]: true,
  'btn-disabled': props.disabled
}))

const handleClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}
</script>
```

## Tips para la reutilización

- Usa **slots** para contenido flexible
- Define **props** con validación
- Emite **eventos** en lugar de modificar props
- Mantén la lógica simple y enfocada

## Conclusión

Los componentes reutilizables aceleran el desarrollo y mejoran la mantenibilidad de tu aplicación Vue.js.

