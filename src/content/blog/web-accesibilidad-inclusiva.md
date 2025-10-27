---
title: "Accesibilidad Web (A11y): Crea Sitios Inclusivos y WCAG Compliant"
description: "Guía práctica de accesibilidad web. Cumple WCAG 2.1, amplía tu audiencia 15% y evita demandas legales."
pubDate: 2025-10-27T00:00:00.000Z
tags: ["Accessibility", "A11y", "WCAG", "Inclusive Design", "Legal", "UX"]
---

# Accesibilidad Web: Obligación Legal y Oportunidad

El 15% de la población tiene alguna discapacidad. Sin accesibilidad, excluyes 15% de clientes potenciales y arriesgas demandas (hasta 100.000€ en multas).

## WCAG 2.1 Niveles

```javascript
const nivelesWCAG = {
  A: {
    nivel: "Básico",
    descripcion: "Mínimo legal en muchos países",
    ejemplos: ["Alt text en imágenes", "Contraste básico"]
  },
  
  AA: {
    nivel: "Recomendado",
    descripcion: "Estándar industria 2025",
    ejemplos: ["Contraste 4.5:1", "Navegación teclado completa"]
  },
  
  AAA: {
    nivel: "Óptimo",
    descripcion: "Accesibilidad máxima",
    ejemplos: ["Contraste 7:1", "Lengua de signos en videos"]
  }
}
```

## Implementación Práctica

### 1. Contraste de Color

```css
/* Verificar contraste mínimo 4.5:1 (WCAG AA) */
.text {
  color: #333333;
  background: #ffffff;
  /* Ratio: 12.63:1 ✅ */
}

/* ❌ Malo - Ratio 2.1:1 */
.bad-contrast {
  color: #cccccc;
  background: #ffffff;
}
```

### 2. Navegación por Teclado

```html
<!-- Todos los elementos interactivos accesibles -->
<button 
  type="button"
  aria-label="Cerrar modal"
  >
  ×
</button>

<!-- Skip links -->
<a href="#main-content" class="skip-link">
  Saltar al contenido principal
</a>
```

### 3. Textos Alternativos

```html
<!-- ✅ Bueno - Descriptivo -->
<img 
  src="ceo.jpg" 
  alt="María González, CEO de Empresa, sonriendo en oficina moderna"
  />

<!-- ❌ Malo -->
<img src="img123.jpg" alt="imagen">

<!-- Decorativa -->
<img src="decoracion.jpg" alt="" role="presentation">
```

### 4. Formularios Accesibles

```html
<form>
  <label for="email">Email *</label>
  <input 
    type="email"
    id="email"
    name="email"
    required
    aria-required="true"
    aria-describedby="email-help"
    />
  <span id="email-help" class="help-text">
    Usaremos tu email solo para enviarte el presupuesto
  </span>
  <span id="email-error" class="error" aria-live="polite"></span>
</form>
```

### 5. ARIA Landmarks

```html
<header role="banner">
  <nav role="navigation" aria-label="Navegación principal">
    <!-- ... -->
  </nav>
</header>

<main role="main">
  <article role="article">
    <!-- contenido -->
  </article>
</main>

<aside role="complementary">
  <!-- sidebar -->
</aside>

<footer role="contentinfo">
  <!-- footer -->
</footer>
```

## Testing de Accesibilidad

```markdown
**Herramientas Automáticas:**
- WAVE (extensión Chrome)
- axe DevTools
- Lighthouse (Chrome DevTools)
- Pa11y

**Testing Manual:**
- Navegación solo con teclado
- Screen reader (NVDA, JAWS, VoiceOver)
- Zoom 200%
- Sin color (escala grises)
```

## Beneficios

```javascript
const beneficios = {
  legal: "Cumplimiento normativa, evita multas",
  mercado: "+15% audiencia potencial",
  seo: "Google favorece sitios accesibles",
  ux: "Mejor experiencia para TODOS",
  reputacion: "Marca inclusiva y responsable"
}
```

## Checklist Básico

```markdown
- [ ] Contraste mínimo 4.5:1
- [ ] Alt text en todas las imágenes
- [ ] Navegación completa con teclado
- [ ] Focus visible en elementos
- [ ] Labels en formularios
- [ ] Estructura heading (H1-H6)
- [ ] Skip links
- [ ] ARIA donde sea necesario
- [ ] Videos con subtítulos
- [ ] No usar solo color para información
```

¿Tu web es accesible?

**Solicita auditoría A11y**

---

*"Accesibilidad no es extra. Es responsabilidad."*

