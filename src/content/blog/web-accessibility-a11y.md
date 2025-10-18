---
title: "Accesibilidad web (A11Y): Guía práctica para desarrolladores"
description: "Cómo hacer tus aplicaciones web accesibles para todos. Técnicas, herramientas y mejores prácticas de accesibilidad."
pubDate: 2025-10-18T00:00:00.000Z
tags: ["Accessibility", "A11Y", "Frontend", "Best Practices"]
---

# Accesibilidad web (A11Y): Guía práctica para desarrolladores

La accesibilidad no es opcional. Aquí te muestro cómo hacerlo bien.

## ¿Por qué accesibilidad?

- **15% de la población** mundial tiene alguna discapacidad
- **Legal**: WCAG 2.1 es requerimiento legal en muchos países
- **SEO**: Mejor accesibilidad = mejor SEO
- **UX**: Beneficia a todos los usuarios

## Semantic HTML

### ❌ Malo

```html
<div class="button" onclick="submit()">Enviar</div>
<span class="heading">Título</span>
<div class="input-wrapper">
  <div contenteditable="true"></div>
</div>
```

### ✅ Bueno

```html
<button type="submit">Enviar</button>
<h1>Título</h1>
<input type="text" />
```

## ARIA Attributes

### Roles

```html
<nav role="navigation">
  <ul role="list">
    <li role="listitem"><a href="/">Home</a></li>
  </ul>
</nav>

<div role="alert">Mensaje importante</div>
<div role="status">Loading...</div>
<div role="dialog" aria-modal="true">Modal</div>
```

### States & Properties

```html
<button 
  aria-expanded="false"
  aria-controls="menu"
  aria-label="Abrir menú"
>
  Menu
</button>

<input 
  type="text"
  aria-required="true"
  aria-invalid="false"
  aria-describedby="error-message"
/>

<div id="error-message" role="alert">
  Email inválido
</div>
```

### Live Regions

```html
<div 
  aria-live="polite"
  aria-atomic="true"
>
  3 nuevas notificaciones
</div>

<!-- assertive para urgente -->
<div aria-live="assertive">
  ¡Error crítico!
</div>
```

## Keyboard Navigation

### Tabindex

```html
<!-- Orden natural -->
<button>Primero</button>
<input type="text">
<button>Tercero</button>

<!-- Orden personalizado (evitar si es posible) -->
<div tabindex="1">Primero</div>
<div tabindex="3">Tercero</div>
<div tabindex="2">Segundo</div>

<!-- Programáticamente focuseable -->
<div tabindex="-1">No en tab order</div>

<!-- Custom focuseable -->
<div tabindex="0" role="button">
  Click me
</div>
```

### Focus Management

```javascript
// Vue composable
export function useFocusTrap(containerRef) {
  const focusableElements = computed(() => {
    return containerRef.value?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  })
  
  const firstElement = computed(() => focusableElements.value?.[0])
  const lastElement = computed(() => 
    focusableElements.value?.[focusableElements.value.length - 1]
  )
  
  function handleKeydown(e) {
    if (e.key !== 'Tab') return
    
    if (e.shiftKey) {
      if (document.activeElement === firstElement.value) {
        lastElement.value?.focus()
        e.preventDefault()
      }
    } else {
      if (document.activeElement === lastElement.value) {
        firstElement.value?.focus()
        e.preventDefault()
      }
    }
  }
  
  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
    firstElement.value?.focus()
  })
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
}
```

## Forms Accesibles

```html
<form>
  <div class="form-group">
    <label for="email">
      Email *
    </label>
    <input
      id="email"
      type="email"
      required
      aria-required="true"
      aria-invalid="false"
      aria-describedby="email-error email-help"
    />
    <span id="email-help" class="help-text">
      Usaremos tu email solo para contactarte
    </span>
    <span id="email-error" role="alert" aria-live="assertive">
      <!-- Error message aparece aquí -->
    </span>
  </div>
  
  <fieldset>
    <legend>Preferencias</legend>
    <input type="checkbox" id="news" />
    <label for="news">Newsletter</label>
    
    <input type="checkbox" id="updates" />
    <label for="updates">Actualizaciones</label>
  </fieldset>
  
  <button type="submit">
    Enviar formulario
  </button>
</form>
```

## Images & Media

### Alt text

```html
<!-- ❌ Malo -->
<img src="photo.jpg" alt="imagen">
<img src="photo.jpg" alt="">

<!-- ✅ Bueno -->
<img src="hero.jpg" alt="Desarrollador escribiendo código en laptop">

<!-- Decorativa -->
<img src="decoration.jpg" alt="" role="presentation">

<!-- Compleja -->
<img 
  src="chart.png" 
  alt="Gráfico de barras mostrando crecimiento de ventas"
  aria-describedby="chart-description"
/>
<div id="chart-description">
  Las ventas crecieron de 100k en enero a 250k en diciembre,
  con un crecimiento constante del 15% mensual.
</div>
```

### Video

```html
<video controls>
  <source src="video.mp4" type="video/mp4">
  <track
    kind="captions"
    src="captions.vtt"
    srclang="es"
    label="Español"
    default
  />
  <track
    kind="descriptions"
    src="descriptions.vtt"
    srclang="es"
    label="Audio descriptions"
  />
</video>
```

## Color & Contrast

### Ratios mínimos (WCAG AA)

- Texto normal: **4.5:1**
- Texto grande (18pt+): **3:1**
- UI components: **3:1**

### Herramientas

- Chrome DevTools (Lighthouse)
- WebAIM Contrast Checker
- Stark (Figma plugin)

### No solo color

```html
<!-- ❌ Solo color -->
<span style="color: red;">Error</span>

<!-- ✅ Color + icono + texto -->
<span class="error">
  <svg aria-hidden="true"><!-- icono --></svg>
  <span>Error: Campo requerido</span>
</span>
```

## Buttons vs Links

```html
<!-- Button: Ejecuta acción -->
<button onclick="deleteUser()">
  Eliminar usuario
</button>

<!-- Link: Navega -->
<a href="/users">
  Ver todos los usuarios
</a>

<!-- ❌ Nunca -->
<div onclick="submit()">Enviar</div>
<a href="#" onclick="doSomething()">Hacer algo</a>
```

## Skip Links

```html
<a href="#main-content" class="skip-link">
  Saltar al contenido principal
</a>

<nav><!-- Navegación --></nav>

<main id="main-content">
  <!-- Contenido -->
</main>
```

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

## Modal Accesible

```vue
<template>
  <div
    v-if="isOpen"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
    ref="modalRef"
  >
    <h2 id="modal-title">Título del modal</h2>
    <p id="modal-description">Descripción</p>
    
    <button @click="close" aria-label="Cerrar modal">
      ×
    </button>
    
    <div><!-- Contenido --></div>
    
    <div class="actions">
      <button @click="confirm">Confirmar</button>
      <button @click="close">Cancelar</button>
    </div>
  </div>
</template>

<script setup>
const modalRef = ref(null)
const { isOpen, close } = defineProps()

// Focus trap
useFocusTrap(modalRef)

// Escape key
onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape') close()
  }
  document.addEventListener('keydown', handleEscape)
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})

// Inert resto de la página
watch(isOpen, (value) => {
  document.body.style.overflow = value ? 'hidden' : ''
  const main = document.querySelector('main')
  if (value) {
    main?.setAttribute('inert', '')
  } else {
    main?.removeAttribute('inert')
  }
})
</script>
```

## Testing

### Automated

```bash
npm install -D @axe-core/cli
npx axe http://localhost:3000
```

```javascript
// En tests
import { axe } from 'jest-axe'

it('no tiene violaciones de a11y', async () => {
  const { container } = render(<MyComponent />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

### Manual

1. **Keyboard only**: Navega sin mouse
2. **Screen reader**: VoiceOver (Mac), NVDA (Windows)
3. **Zoom**: 200% de zoom
4. **Color blindness**: Simuladores

### Herramientas

- **axe DevTools** - Chrome extension
- **WAVE** - Evaluación visual
- **Lighthouse** - Score de accesibilidad
- **Screen readers**:
  - VoiceOver (macOS/iOS)
  - NVDA (Windows)
  - JAWS (Windows)

## Checklist

- [ ] Semantic HTML
- [ ] Keyboard navegable
- [ ] Focus visible
- [ ] ARIA labels donde necesario
- [ ] Contraste adecuado
- [ ] Alt text en imágenes
- [ ] Forms con labels
- [ ] Error messages descriptivos
- [ ] Skip links
- [ ] Responsive text (no fixed font size)
- [ ] No depender solo de color
- [ ] Videos con captions

## Recursos

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/es/docs/Web/Accessibility)
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)

## Conclusión

La accesibilidad mejora la experiencia para todos. No es difícil, solo requiere consideración desde el diseño hasta la implementación.

