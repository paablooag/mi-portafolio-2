---
title: "Testing en Vue.js con Jest y Testing Library"
description: "Guía práctica para escribir tests efectivos en componentes Vue.js usando Jest y Vue Testing Library."
pubDate: 2025-10-18T00:00:00.000Z
tags: ["Vue.js", "Testing", "Jest", "Quality"]
---

# Testing en Vue.js con Jest y Testing Library

Cómo escribo tests que realmente aportan valor.

## Setup inicial

```bash
npm install -D @vue/test-utils jest @testing-library/vue
npm install -D @testing-library/jest-dom
```

```javascript
// jest.config.js
export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}
```

## Anatomía de un test

```javascript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button.vue', () => {
  it('renderiza el texto correctamente', () => {
    const wrapper = mount(Button, {
      props: { label: 'Click me' }
    })
    
    expect(wrapper.text()).toContain('Click me')
  })
})
```

## Testing de componentes

### Props

```javascript
it('acepta variant prop', () => {
  const wrapper = mount(Button, {
    props: { variant: 'primary' }
  })
  
  expect(wrapper.classes()).toContain('btn-primary')
})
```

### Events

```javascript
it('emite click event', async () => {
  const wrapper = mount(Button)
  
  await wrapper.trigger('click')
  
  expect(wrapper.emitted('click')).toBeTruthy()
  expect(wrapper.emitted('click')).toHaveLength(1)
})
```

### Slots

```javascript
it('renderiza slot content', () => {
  const wrapper = mount(Button, {
    slots: {
      default: 'Custom content'
    }
  })
  
  expect(wrapper.text()).toBe('Custom content')
})
```

### Computed properties

```javascript
it('calcula fullName correctamente', () => {
  const wrapper = mount(UserCard, {
    props: {
      firstName: 'Pablo',
      lastName: 'Alcalde'
    }
  })
  
  expect(wrapper.vm.fullName).toBe('Pablo Alcalde')
})
```

## Testing con Composition API

```javascript
import { ref } from 'vue'

export function useCounter(initial = 0) {
  const count = ref(initial)
  const increment = () => count.value++
  const decrement = () => count.value--
  
  return { count, increment, decrement }
}
```

```javascript
// useCounter.spec.js
import { useCounter } from './useCounter'

describe('useCounter', () => {
  it('incrementa el contador', () => {
    const { count, increment } = useCounter(0)
    
    expect(count.value).toBe(0)
    increment()
    expect(count.value).toBe(1)
  })
})
```

## Testing async

```javascript
it('carga datos de la API', async () => {
  const wrapper = mount(UserList)
  
  // Esperar actualizaciones
  await wrapper.vm.$nextTick()
  
  // O esperar condición
  await wrapper.find('[data-testid="user-list"]').exists()
  
  expect(wrapper.findAll('.user')).toHaveLength(3)
})
```

## Mocking

### API calls

```javascript
import { vi } from 'vitest'

vi.mock('@/api/users', () => ({
  fetchUsers: vi.fn(() => Promise.resolve([
    { id: 1, name: 'User 1' }
  ]))
}))
```

### Router

```javascript
const wrapper = mount(Component, {
  global: {
    mocks: {
      $route: { params: { id: '1' } },
      $router: { push: vi.fn() }
    }
  }
})
```

### Store (Pinia)

```javascript
import { setActivePinia, createPinia } from 'pinia'

beforeEach(() => {
  setActivePinia(createPinia())
})

it('usa el store', () => {
  const store = useUserStore()
  store.setUser({ name: 'Pablo' })
  
  const wrapper = mount(UserProfile)
  expect(wrapper.text()).toContain('Pablo')
})
```

## Testing Library approach

```javascript
import { render, screen, fireEvent } from '@testing-library/vue'

it('toggles visibility', async () => {
  render(ToggleButton)
  
  const button = screen.getByRole('button')
  const content = screen.queryByText('Hidden content')
  
  expect(content).not.toBeInTheDocument()
  
  await fireEvent.click(button)
  
  expect(screen.getByText('Hidden content')).toBeInTheDocument()
})
```

## Best practices

### 1. Testing user behavior

```javascript
// ✅ Bueno: Testea comportamiento
it('muestra error cuando email es inválido', async () => {
  const { getByLabelText, getByText } = render(LoginForm)
  
  await fireEvent.update(getByLabelText('Email'), 'invalid')
  await fireEvent.click(getByText('Submit'))
  
  expect(getByText('Email inválido')).toBeInTheDocument()
})

// ❌ Malo: Testea implementación
it('establece emailError a true', () => {
  const wrapper = mount(LoginForm)
  wrapper.vm.validateEmail('invalid')
  expect(wrapper.vm.emailError).toBe(true)
})
```

### 2. Data attributes para testing

```html
<button data-testid="submit-button">Submit</button>
```

```javascript
const button = screen.getByTestId('submit-button')
```

### 3. Coverage significativo

```bash
npm run test:coverage
```

Apunta a:
- Statements: 80%+
- Branches: 75%+
- Functions: 80%+
- Lines: 80%+

## Mi test suite típico

```javascript
describe('LoginForm', () => {
  describe('Rendering', () => {
    it('muestra todos los campos')
  })
  
  describe('Validation', () => {
    it('valida email format')
    it('requiere password')
  })
  
  describe('Submission', () => {
    it('llama a la API con datos correctos')
    it('maneja errores de red')
    it('redirige después del login')
  })
})
```

## Conclusión

Los tests bien escritos son documentación viva y red de seguridad. ¡Invierte en ellos!

