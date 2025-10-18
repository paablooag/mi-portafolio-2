---
title: "Figma para desarrolladores frontend: Guía práctica"
description: "Todo lo que un desarrollador frontend necesita saber sobre Figma para colaborar eficientemente con diseñadores."
pubDate: 2025-10-20T00:00:00.000Z
tags: ["Figma", "Design", "Frontend", "Workflow"]
---

# Figma para desarrolladores frontend: Guía práctica

Como desarrollador, entender Figma mejora tu workflow y comunicación con el equipo de diseño.

## ¿Por qué Figma?

- Colaboración en tiempo real
- Inspección de código CSS
- Exportación de assets
- Prototipado interactivo
- Versionado de diseños

## Navegación básica

### Atajos de teclado esenciales

- `Z` - Zoom tool
- `V` - Selector
- `F` - Frame
- `Cmd/Ctrl + D` - Duplicar
- `Cmd/Ctrl + G` - Agrupar

## Inspect Mode

El modo de inspección es tu mejor amigo:

```css
/* Figma te da esto automáticamente */
.button {
  padding: 12px 24px;
  background: #3B82F6;
  border-radius: 8px;
  font-family: Inter;
  font-size: 16px;
  font-weight: 600;
}
```

## Exportar assets

1. Selecciona el elemento
2. Panel derecho → Export
3. Elige formato (SVG, PNG, JPG)
4. Define escala (@1x, @2x, @3x)

## Variables CSS desde Figma

Figma permite ver spacing, colors y typography:

```css
:root {
  /* Figma Design Tokens */
  --primary: #3B82F6;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --border-radius: 8px;
}
```

## Auto Layout = Flexbox

Los Auto Layouts de Figma son básicamente flexbox:

- **Space between** → `justify-content: space-between`
- **Padding** → `padding`
- **Gap** → `gap`

## Plugins útiles

- **HTML to Figma** - Convierte HTML a diseños
- **CSS Generator** - Genera CSS limpio
- **Iconify** - Miles de iconos
- **Content Reel** - Genera contenido de prueba

## Dev Mode

El nuevo Dev Mode de Figma es increíble:

- Ver código en diferentes frameworks
- Comparar implementación vs diseño
- Marcar como "Ready for dev"

## Tips de colaboración

1. **Comunica dudas**: Usa comentarios en Figma
2. **Revisa especificaciones**: No asumas medidas
3. **Feedback temprano**: Mejor prevenir que corregir
4. **Prototipo primero**: Valida interacciones

## Mi workflow

1. Diseñador crea mockup
2. Reviso en Dev Mode
3. Extraigo variables CSS
4. Exporto assets necesarios
5. Implemento componente
6. Comparo con overlay de Figma

## Conclusión

Figma no es solo para diseñadores. Un frontend que domina Figma es 10x más productivo.

