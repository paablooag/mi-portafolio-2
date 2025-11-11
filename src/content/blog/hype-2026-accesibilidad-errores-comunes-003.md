---
title: "Accesibilidad: errores comunes en 2026"
description: "Guía breve y accionable sobre accesibilidad para aplicar en 2025."
pubDate: 2025-05-03T00:00:00.000Z
tags: ["E-commerce","Producto","Accesibilidad","Tailwind"]
---

# Accesibilidad: errores comunes en 2026

Los errores de accesibilidad más frecuentes en 2026 y cómo solucionarlos. Aprende de los problemas reales que enfrentan los desarrolladores y evita estos errores en tus proyectos.

## Top 10 errores de accesibilidad en 2026

### 1. Imágenes sin texto alternativo descriptivo

**El error:**
```html
<img src="grafico.jpg">
<!-- o peor aún -->
<img src="grafico.jpg" alt="imagen">
```

**Por qué es un problema:** Los lectores de pantalla no pueden comunicar el contenido a usuarios con discapacidad visual.

**Solución:**
```html
<img src="grafico-ventas-q1.jpg" 
     alt="Gráfico de barras mostrando crecimiento de ventas del 25% en el primer trimestre de 2026 comparado con 2025">
```

### 2. Contraste de color insuficiente

**El error:** Texto gris claro (#CCCCCC) sobre fondo blanco.

**Problema:** No cumple con WCAG 2.1 AA (mínimo 4.5:1 para texto normal).

**Solución:**
```css
/* ❌ Incorrecto - Ratio: 1.6:1 */
.texto { color: #CCCCCC; }

/* ✅ Correcto - Ratio: 7.1:1 */
.texto { color: #333333; }
```

### 3. Formularios sin etiquetas asociadas

**El error:**
```html
<input type="email" placeholder="Email">
```

**Problema:** Los lectores de pantalla no pueden identificar qué campo es.

**Solución:**
```html
<label for="email">Correo electrónico</label>
<input type="email" id="email" name="email" required>
```

### 4. Botones sin texto accesible

**El error:**
```html
<button><span class="icon-close"></span></button>
```

**Problema:** El botón no comunica su función.

**Solución:**
```html
<button aria-label="Cerrar diálogo">
  <span class="icon-close" aria-hidden="true"></span>
</button>
```

### 5. Navegación que no funciona con teclado

**El error:** Menús desplegables que solo funcionan con hover.

**Problema:** Usuarios que navegan con teclado no pueden acceder.

**Solución:**
```html
<button 
  aria-expanded="false"
  aria-controls="menu"
  id="menu-toggle">
  Menú
</button>
<ul id="menu" hidden>
  <li><a href="/">Inicio</a></li>
</ul>
```

### 6. Falta de jerarquía de encabezados

**El error:**
```html
<h1>Título</h1>
<h3>Subtítulo</h3> <!-- ❌ Saltó h2 -->
<h2>Otro subtítulo</h2>
```

**Problema:** Los lectores de pantalla usan encabezados para navegar. La jerarquía debe ser lógica.

**Solución:**
```html
<h1>Título principal</h1>
<h2>Subtítulo</h2>
<h3>Sub-sección</h3>
<h2>Otro subtítulo</h2>
```

### 7. Información transmitida solo por color

**El error:** "Los campos en rojo son obligatorios" sin otro indicador.

**Problema:** Usuarios daltónicos o con baja visión no pueden distinguir.

**Solución:**
```html
<label>
  Email
  <span class="required" aria-label="requerido">*</span>
</label>
<input type="email" required aria-required="true">
```

### 8. Focus invisible o mal diseñado

**El error:**
```css
*:focus { outline: none; } /* ❌ Elimina el focus */
```

**Problema:** Usuarios de teclado no saben dónde están.

**Solución:**
```css
*:focus-visible {
  outline: 3px solid #0066cc;
  outline-offset: 2px;
  border-radius: 2px;
}
```

### 9. Modales sin gestión de foco

**El error:** Modales que no atrapan el foco ni lo devuelven al elemento que los activó.

**Problema:** El foco puede quedar "perdido" fuera del modal.

**Solución:**
```javascript
// Atrapar foco en modal
modal.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    const focusableElements = modal.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    // Lógica de trampa de foco
  }
});
```

### 10. Contenido dinámico sin anuncios

**El error:** Mensajes de éxito/error que aparecen sin ser anunciados.

**Problema:** Los lectores de pantalla no detectan cambios dinámicos.

**Solución:**
```html
<div role="alert" aria-live="polite" id="mensaje-exito">
  Tu formulario se envió correctamente
</div>
```

## Checklist de prevención

Antes de publicar, verifica:

- [ ] Todas las imágenes tienen `alt` descriptivo o vacío si son decorativas
- [ ] El contraste de texto cumple WCAG AA (4.5:1 mínimo)
- [ ] Todos los formularios tienen `<label>` asociados
- [ ] La navegación funciona completamente con teclado
- [ ] Los encabezados siguen jerarquía lógica (h1→h2→h3)
- [ ] La información no depende solo del color
- [ ] El focus es visible y claro
- [ ] Los modales gestionan el foco correctamente
- [ ] El contenido dinámico se anuncia con `aria-live`
- [ ] Probado con lector de pantalla

## Herramientas de detección

- **Lighthouse** - Auditoría automática
- **axe DevTools** - Detección en tiempo real
- **WAVE** - Evaluación visual
- **Keyboard Navigation** - Prueba manual con Tab

## Qué hacer ahora

1. **Ejecuta una auditoría** con Lighthouse y identifica estos 10 errores en tu sitio
2. **Corrige los 3 más críticos** esta semana (texto alternativo, contraste, etiquetas)
3. **Mide el impacto** con GA4 y Search Console para validar mejoras en engagement y tiempo en sitio
