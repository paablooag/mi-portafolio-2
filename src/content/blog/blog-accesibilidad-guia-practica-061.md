---
title: "Accesibilidad: guia practica en 2025"
description: "Guía breve y accionable sobre accesibilidad para aplicar en 2025."
pubDate: 2025-04-30T00:00:00.000Z
tags: ["Portafolio","Accesibilidad","Analytics","Tailwind"]
---

# Accesibilidad: guia practica en 2025

Guía práctica y accionable para implementar accesibilidad web siguiendo los estándares WCAG 2.1 en 2025. Aprende los fundamentos y aplica mejoras inmediatas.

## Fundamentos de accesibilidad web

La accesibilidad web (a11y) garantiza que personas con discapacidades puedan percibir, entender, navegar e interactuar con tu sitio web. No es opcional: es un derecho y una buena práctica de negocio.

### Los 4 principios de WCAG 2.1

1. **Perceptible** - La información debe ser presentada de forma que los usuarios puedan percibirla
2. **Operable** - Los componentes de la interfaz deben ser operables
3. **Comprensible** - La información y el funcionamiento deben ser comprensibles
4. **Robusto** - El contenido debe ser suficientemente robusto para ser interpretado por diferentes tecnologías

## Guía práctica paso a paso

### 1. Texto alternativo en imágenes

**Cuándo usar:**
- Imágenes informativas: `alt` descriptivo
- Imágenes decorativas: `alt=""`
- Imágenes con texto: `alt` con el mismo texto

```html
<!-- Imagen informativa -->
<img src="grafico-ventas.jpg" 
     alt="Gráfico de barras mostrando crecimiento de ventas del 25% en Q1 2025">

<!-- Imagen decorativa -->
<img src="separador.jpg" alt="">

<!-- Imagen con texto -->
<img src="logo-empresa.png" alt="TechSolutions - Soluciones tecnológicas">
```

### 2. Estructura semántica

Usa HTML5 semántico para crear una estructura lógica:

```html
<header>
  <nav aria-label="Navegación principal">
    <ul>
      <li><a href="/">Inicio</a></li>
      <li><a href="/servicios">Servicios</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Título principal</h1>
    <section>
      <h2>Subtítulo</h2>
      <p>Contenido...</p>
    </section>
  </article>
</main>

<aside>
  <h2>Contenido relacionado</h2>
</aside>

<footer>
  <p>&copy; 2025 Mi Empresa</p>
</footer>
```

### 3. Formularios accesibles

```html
<form>
  <fieldset>
    <legend>Información de contacto</legend>
    
    <div class="form-group">
      <label for="nombre">
        Nombre completo
        <span class="required" aria-label="requerido">*</span>
      </label>
      <input 
        type="text" 
        id="nombre" 
        name="nombre"
        required
        aria-required="true"
        aria-describedby="nombre-help">
      <span id="nombre-help" class="help-text">
        Ingresa tu nombre completo como aparece en tu documento
      </span>
    </div>
    
    <div class="form-group">
      <label for="email">Correo electrónico *</label>
      <input 
        type="email" 
        id="email" 
        name="email"
        required
        aria-invalid="false"
        aria-describedby="email-error">
      <span id="email-error" class="error-text" role="alert"></span>
    </div>
  </fieldset>
  
  <button type="submit">Enviar</button>
</form>
```

### 4. Navegación por teclado

**Orden de tabulación lógico:**
- De arriba a abajo, izquierda a derecha
- Elementos interactivos visibles
- Skip links para saltar navegación repetitiva

```html
<a href="#main-content" class="skip-link">
  Saltar al contenido principal
</a>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  z-index: 100;
}
.skip-link:focus {
  top: 0;
}
</style>
```

### 5. Contraste de color

**Requisitos WCAG 2.1 AA:**
- Texto normal: relación de contraste mínimo 4.5:1
- Texto grande (18pt+ o 14pt+ en negrita): mínimo 3:1
- Componentes UI y estados: mínimo 3:1

**Herramientas:**
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)

### 6. ARIA cuando sea necesario

Usa ARIA solo cuando HTML semántico no sea suficiente:

```html
<!-- ✅ Buen uso de ARIA -->
<button 
  aria-expanded="false"
  aria-controls="menu-desplegable"
  aria-label="Abrir menú de navegación">
  Menú
</button>

<!-- ❌ ARIA innecesario -->
<div role="button" tabindex="0">Click aquí</div>
<!-- Mejor: -->
<button>Click aquí</button>
```

## Checklist de implementación

- [ ] Todas las imágenes tienen `alt` apropiado
- [ ] Estructura semántica HTML5 correcta
- [ ] Formularios con `<label>` asociados
- [ ] Navegación completa con teclado
- [ ] Contraste de color cumple WCAG AA
- [ ] Focus visible en todos los elementos interactivos
- [ ] Skip links implementados
- [ ] Estados ARIA correctos (expanded, hidden, etc.)
- [ ] Mensajes de error accesibles
- [ ] Probado con lector de pantalla

## Herramientas de testing

1. **Automáticas:**
   - axe DevTools
   - WAVE
   - Lighthouse

2. **Manuales:**
   - Navegación solo con teclado
   - Lectores de pantalla (NVDA, JAWS, VoiceOver)
   - Zoom al 200%

## Qué hacer ahora

1. **Audita tu sitio** con Lighthouse y anota los 3 problemas más críticos
2. **Implementa mejoras de texto alternativo y contraste** esta semana
3. **Mide el impacto** con GA4 y Search Console para validar mejoras en tiempo de sesión y tasa de rebote
