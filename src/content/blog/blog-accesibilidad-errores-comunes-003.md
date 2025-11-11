---
title: "Accesibilidad: errores comunes en 2025"
description: "Guía breve y accionable sobre accesibilidad para aplicar en 2025."
pubDate: 2025-03-03T00:00:00.000Z
tags: ["Freelance","E-commerce","CMS","SEO Local"]
---

# Accesibilidad: errores comunes en 2025

La accesibilidad web es fundamental para crear experiencias inclusivas. En 2025, estos son los errores más comunes que debes evitar y cómo solucionarlos.

## Errores críticos de accesibilidad

### 1. Falta de texto alternativo en imágenes
**Problema:** Las imágenes sin `alt` bloquean el acceso a usuarios con lectores de pantalla.

**Solución:**
```html
<!-- ❌ Incorrecto -->
<img src="producto.jpg">

<!-- ✅ Correcto -->
<img src="producto.jpg" alt="Laptop Dell XPS 13 con pantalla de 13 pulgadas">
```

### 2. Contraste de color insuficiente
**Problema:** Texto que no cumple con la relación de contraste WCAG 2.1 (mínimo 4.5:1 para texto normal).

**Solución:** Usa herramientas como [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) para validar. El contraste debe ser al menos:
- 4.5:1 para texto normal
- 3:1 para texto grande (18pt+ o 14pt+ en negrita)

### 3. Formularios sin etiquetas
**Problema:** Inputs sin `<label>` asociado dificultan la navegación con teclado y lectores de pantalla.

**Solución:**
```html
<!-- ✅ Correcto -->
<label for="email">Correo electrónico</label>
<input type="email" id="email" name="email" required>

<!-- O usando aria-label -->
<input type="email" aria-label="Correo electrónico" required>
```

### 4. Navegación solo con mouse
**Problema:** Elementos interactivos que no son accesibles con teclado.

**Solución:** Asegúrate de que todos los botones, enlaces y controles sean navegables con `Tab` y activables con `Enter` o `Espacio`.

### 5. Falta de encabezados semánticos
**Problema:** Uso de `<div>` o `<span>` con estilos en lugar de `<h1>`, `<h2>`, etc.

**Solución:** Usa la jerarquía correcta de encabezados (h1 → h2 → h3) para crear una estructura lógica del contenido.

### 6. Contenido que depende solo del color
**Problema:** Información transmitida únicamente mediante color (ej: "campos en rojo son obligatorios").

**Solución:** Combina color con texto, iconos o patrones para transmitir información.

### 7. Falta de landmarks ARIA
**Problema:** Páginas sin estructura semántica clara para navegación rápida.

**Solución:**
```html
<header role="banner">...</header>
<nav role="navigation">...</nav>
<main role="main">...</main>
<aside role="complementary">...</aside>
<footer role="contentinfo">...</footer>
```

## Checklist rápido

- [ ] Todas las imágenes tienen `alt` descriptivo
- [ ] El contraste de texto cumple WCAG 2.1 AA
- [ ] Todos los formularios tienen `<label>` asociados
- [ ] La navegación funciona completamente con teclado
- [ ] Los encabezados siguen una jerarquía lógica
- [ ] La información no depende solo del color
- [ ] Los landmarks ARIA están implementados

## Qué hacer ahora

1. **Audita tu sitio** con [WAVE](https://wave.webaim.org/) o [axe DevTools](https://www.deque.com/axe/devtools/)
2. **Corrige los 3 errores más críticos** esta semana
3. **Mide el impacto** con GA4 y Search Console para ver mejoras en engagement
