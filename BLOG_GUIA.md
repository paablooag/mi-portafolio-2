# 📝 Guía del Blog - Portafolio Pablo Alcalde

Tu portafolio ahora incluye un sistema de blog completo y optimizado para SEO usando **Astro Content Collections**.

## 🎯 Características del Blog

✅ Sistema basado en Markdown  
✅ SEO optimizado  
✅ Tags/Etiquetas  
✅ Fechas de publicación  
✅ Borradores (drafts)  
✅ Compartir en redes sociales  
✅ Diseño responsive  
✅ Sintaxis highlighting para código  

## 📁 Estructura de Archivos

```
src/
├── content/
│   ├── config.ts          # Configuración de collections
│   └── blog/              # Tus artículos aquí
│       ├── optimizacion-seo-nuxt.md
│       ├── migracion-vue-a-nuxt.md
│       └── mejores-practicas-frontend.md
├── pages/
│   └── blog/
│       ├── index.astro    # Página principal del blog
│       └── [...slug].astro # Plantilla para artículos
└── components/
    └── Blog.astro         # Componente mini-blog homepage
```

## ✍️ Crear un Nuevo Artículo

### Paso 1: Crear el archivo

Crea un nuevo archivo en `src/content/blog/` con el nombre en formato kebab-case:

```
mi-nuevo-articulo.md
```

### Paso 2: Añadir el Frontmatter

Cada artículo necesita metadatos al inicio:

```markdown
---
title: "Título de mi artículo"
description: "Descripción breve y atractiva para SEO (150-160 caracteres)"
pubDate: 2025-12-20T00:00:00.000Z
tags: ["Vue.js", "Frontend", "SEO"]
author: "Pablo Alcalde García"
draft: false
---
```

### Paso 3: Escribir el contenido

Después del frontmatter, escribe tu contenido en Markdown:

```markdown
# Mi Artículo

Introducción del artículo...

## Sección 1

Contenido de la sección...

### Subsección

Más contenido...

## Código

\`\`\`javascript
const ejemplo = "Código de ejemplo";
console.log(ejemplo);
\`\`\`

## Conclusión

Cierre del artículo...
```

## 📋 Propiedades del Frontmatter

| Propiedad | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `title` | string | ✅ Sí | Título del artículo |
| `description` | string | ✅ Sí | Descripción para SEO |
| `pubDate` | date | ✅ Sí | Fecha de publicación |
| `tags` | array | ✅ Sí | Etiquetas del artículo |
| `author` | string | ❌ No | Autor (default: "Pablo Alcalde García") |
| `image` | string | ❌ No | URL de imagen destacada |
| `draft` | boolean | ❌ No | Si es borrador (default: false) |

## 📅 Formato de Fecha

La fecha debe estar en formato ISO:

```yaml
pubDate: 2025-12-20T00:00:00.000Z
```

También puedes usar:

```yaml
pubDate: 2025-12-20
```

## 🏷️ Tags Recomendados

Para mantener consistencia, usa estos tags:

**Tecnologías:**
- Vue.js
- Nuxt.js
- JavaScript
- HTML
- CSS
- Tailwind CSS
- Astro

**Temas:**
- Frontend
- SEO
- Performance
- Web Development
- Best Practices
- Tutorial
- Tips

**Herramientas:**
- Git
- VS Code
- Figma

## 📝 Ejemplos de Markdown

### Encabezados

```markdown
# H1 - Título Principal
## H2 - Sección
### H3 - Subsección
#### H4 - Subtítulo
```

### Texto

```markdown
**Negrita**
*Cursiva*
***Negrita y cursiva***
~~Tachado~~
```

### Listas

```markdown
- Item 1
- Item 2
  - Sub-item 2.1
  - Sub-item 2.2

1. Primero
2. Segundo
3. Tercero
```

### Enlaces

```markdown
[Texto del enlace](https://ejemplo.com)
```

### Imágenes

```markdown
![Texto alternativo](/images/imagen.jpg)
```

### Código Inline

```markdown
Usa `código inline` para comandos cortos.
```

### Bloques de Código

````markdown
```javascript
function ejemplo() {
  return "Hola mundo";
}
```
````

Lenguajes soportados:
- javascript / js
- typescript / ts
- html
- css
- bash / shell
- json
- yaml
- markdown / md

### Citas

```markdown
> Esta es una cita o nota importante.
> Puede tener múltiples líneas.
```

### Tablas

```markdown
| Columna 1 | Columna 2 | Columna 3 |
|-----------|-----------|-----------|
| Dato 1    | Dato 2    | Dato 3    |
| Dato 4    | Dato 5    | Dato 6    |
```

## 🎨 Estilos Disponibles

El blog tiene estilos predefinidos para:

- ✅ Títulos (H1-H4)
- ✅ Párrafos
- ✅ Listas
- ✅ Enlaces (con hover effect)
- ✅ Código inline
- ✅ Bloques de código
- ✅ Citas
- ✅ Tablas
- ✅ Negrita/Cursiva

## 📊 SEO del Blog

Cada artículo automáticamente genera:

1. **Meta tags:** Título y descripción
2. **Open Graph:** Para compartir en redes sociales
3. **Fecha de publicación:** Para freshness
4. **Tags:** Para categorización
5. **Autor:** Para authorship
6. **URL amigable:** basada en el nombre del archivo

## 🚀 Borradores (Drafts)

Para crear un artículo sin publicarlo:

```yaml
draft: true
```

Los borradores **no aparecerán** en:
- Lista de artículos en `/blog`
- Mini-blog en la homepage
- Sitemap

## 📱 Compartir en Redes Sociales

Cada artículo incluye botones para compartir en:

- Twitter/X
- LinkedIn

Puedes añadir más redes editando `src/pages/blog/[...slug].astro`

## 💡 Tips para Escribir

### 1. Títulos atractivos

❌ "Tutorial de Vue.js"  
✅ "Cómo optimizar tu aplicación Vue.js en 5 pasos"

### 2. Descripciones persuasivas

❌ "Un artículo sobre SEO"  
✅ "Descubre las técnicas que usé en [Wegow](https://wegow.com) para aumentar el tráfico orgánico en un 60%"

### 3. Estructura clara

- Usa encabezados para organizar
- Párrafos cortos (3-4 líneas)
- Listas para información importante
- Código de ejemplo cuando sea relevante

### 4. SEO

- Incluye palabras clave en el título
- Usa meta description atractiva
- Tags relevantes
- Enlaces internos y externos

### 5. Longitud

- **Posts cortos:** 300-500 palabras (tips rápidos)
- **Posts medios:** 800-1200 palabras (tutoriales)
- **Posts largos:** 1500+ palabras (guías completas)

## 🔄 Workflow Recomendado

1. **Planifica:** Define tema y estructura
2. **Escribe:** Crea el archivo .md y escribe
3. **Revisa:** Lee y corrige errores
4. **Prueba:** Ejecuta `npm run dev` y verifica
5. **Publica:** Commit y push a tu repo
6. **Comparte:** Promociona en redes sociales

## 📈 Mejores Prácticas

### Frecuencia

- **Ideal:** 1-2 artículos por semana
- **Mínimo:** 1 artículo al mes
- **Calidad > Cantidad:** Mejor menos artículos de calidad

### Temas

Escribe sobre:
- ✅ Proyectos en los que trabajas
- ✅ Problemas que solucionaste
- ✅ Herramientas que usas
- ✅ Tendencias del sector
- ✅ Tutoriales paso a paso
- ✅ Tips y trucos

### Promoción

Después de publicar:
1. Comparte en LinkedIn
2. Comparte en Twitter/X
3. Envía a comunidades relevantes
4. Añade a tu newsletter (si tienes)

## 🐛 Solución de Problemas

### El artículo no aparece

1. Verifica que `draft: false`
2. Revisa que el archivo esté en `src/content/blog/`
3. Comprueba el frontmatter (sin errores de sintaxis)
4. Reinicia el servidor de desarrollo

### Error de sintaxis

1. Verifica las fechas (formato ISO)
2. Revisa que los arrays tengan corchetes: `["tag1", "tag2"]`
3. Las comillas deben ser consistentes

### Código no se ve bien

1. Especifica el lenguaje: \`\`\`javascript
2. Cierra el bloque correctamente: \`\`\`

## 📚 Recursos

- [Markdown Guide](https://www.markdownguide.org/)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Frontmatter](https://frontmatter.codes/)

---

¡Ahora estás listo para crear contenido increíble! 🚀

**Recuerda:** El blog es una herramienta poderosa para:
- Demostrar tu conocimiento
- Mejorar tu SEO
- Atraer oportunidades
- Ayudar a la comunidad

¡Escribe tu primer artículo hoy! ✍️

