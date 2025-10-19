# 🌐 Sistema de Traducción de Blogs

## Estado Actual

Actualmente, los artículos del blog están disponibles **solo en español**. En la versión inglesa (`/en/blog`), se muestra un aviso indicando que los artículos están en español.

## Opciones para Traducir los Blogs

### Opción 1: Script de Traducción Automática (INCLUIDO)

He creado un script que usa **LibreTranslate** (API pública gratuita) para traducir automáticamente los blogs.

#### Cómo usar:

```bash
npm run translate:blogs
```

#### ⚠️ ADVERTENCIAS:
- **La traducción automática puede tener errores**, especialmente en contenido técnico
- El proceso puede tomar **varios minutos** (tiene delays para no sobrecargar la API gratuita)
- **REVISA TODAS LAS TRADUCCIONES** antes de publicar
- La API gratuita tiene límites, puede que no traduzca todo de una vez

#### Qué hace el script:
1. Lee todos los archivos `.md` de `src/content/blog/`
2. Traduce título, descripción y contenido
3. Guarda las versiones traducidas en `src/content/blog-en/`

### Opción 2: Traducción Manual (RECOMENDADO)

Para mejor calidad, especialmente en artículos técnicos:

1. Crea carpeta `src/content/blog-en/`
2. Copia los artículos que quieras traducir
3. Traduce manualmente el contenido
4. Actualiza las referencias en los archivos

### Opción 3: API de Traducción Premium

Para mejor calidad, considera usar:

- **DeepL API** (plan gratuito: 500,000 caracteres/mes)
- **Google Cloud Translation API** (de pago, muy buena calidad)

### Opción 4: Mantener Solo en Español

Si tu audiencia principal es hispanohablante, puedes:
- Mantener los blogs solo en español
- El aviso en inglés ya está implementado
- Es una solución válida y honesta

## Estructura de Archivos

```
src/content/
├── blog/          # Blogs en español (actual)
│   ├── articulo-1.md
│   └── articulo-2.md
└── blog-en/       # Blogs en inglés (crear)
    ├── article-1.md
    └── article-2.md
```

## Para Implementar Traducciones Manuales

Si decides traducir manualmente:

1. Crea la carpeta:
```bash
mkdir src/content/blog-en
```

2. Copia y traduce cada archivo manualmente

3. Actualiza `src/content/config.ts` para incluir ambas colecciones:
```typescript
const blog = defineCollection({
  type: 'content',
  schema: blogSchema,
});

const blogEn = defineCollection({
  type: 'content', 
  schema: blogSchema,
});

export const collections = { blog, 'blog-en': blogEn };
```

4. Actualiza las páginas para usar la colección correcta según el idioma

## Recomendación

Para un portafolio profesional, yo recomendaría:
1. **Traducir manualmente** los 3-5 artículos más importantes
2. **Dejar el resto en español** con el aviso actual
3. **Ir traduciendo gradualmente** según tengas tiempo

La calidad es más importante que la cantidad. Es mejor tener pocos artículos bien traducidos que muchos con traducciones automáticas de baja calidad.

