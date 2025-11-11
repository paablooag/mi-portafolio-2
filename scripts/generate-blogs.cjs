/* eslint-disable no-console */
// Generador de posts Markdown en src/content/blog usando categorías (tags) existentes
// Uso:
//   node scripts/generate-blogs.cjs --count 100 --start 2025-03-01
// Opcionales:
//   --prefix "auto"  -> prefijo del slug
//   --lang es        -> idioma en títulos/descr (actualmente solo 'es')
//   --dry            -> no escribe archivos, solo muestra
//
// No requiere dependencias externas.

const fs = require('fs');
const path = require('path');

function parseArgs() {
  const args = process.argv.slice(2);
  const out = {};
  for (let i = 0; i < args.length; i += 1) {
    const a = args[i];
    if (a.startsWith('--')) {
      const key = a.replace(/^--/, '');
      const next = args[i + 1];
      if (!next || next.startsWith('--')) {
        out[key] = true;
      } else {
        out[key] = next;
        i += 1;
      }
    }
  }
  return out;
}

function toIsoDate(date) {
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(date.getUTCDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}T00:00:00.000Z`;
}

function slugify(str) {
  return String(str)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function pickRandom(arr, n) {
  const copy = [...arr];
  const out = [];
  while (out.length < n && copy.length) {
    const idx = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(idx, 1)[0]);
  }
  return out;
}

function main() {
  const args = parseArgs();
  const count = Number(args.count || 100);
  const start = new Date(`${args.start || '2025-03-01'}T00:00:00Z`);
  const prefix = String(args.prefix || 'auto');
  const dry = Boolean(args.dry);
  const year = String(args.year || '2025');
  const titlePrefix = args.titlePrefix ? String(args.titlePrefix) : '';
  const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');
  if (!fs.existsSync(blogDir)) {
    console.error('No existe el directorio src/content/blog');
    process.exit(1);
  }

  // Pool de tags basado en categorías ya presentes en el proyecto
  const tagPool = [
    'SEO', 'Rendimiento', 'Accesibilidad', 'PWA', 'Nuxt', 'Tailwind',
    'Testing', 'Analytics', 'Copywriting', 'Freelance', 'Portafolio',
    'Networking', 'Docker', 'Serverless', 'Arquitectura', 'E-commerce',
    'SEO Local', 'Mantenimiento', 'Seguridad', 'GDPR', 'Branding', 'CMS',
    'Core Web Vitals', 'Pagos', 'Formularios', 'UX', 'Producto', 'CI/CD', 'ROI',
  ];

  const topics = [
    'guia-practica', 'checklist', 'errores-comunes', 'mejores-practicas',
    'como-empezar', 'casos-reales', 'plantilla', 'proceso-repetible',
    'metricas-clave', 'roadmap-90-dias', 'auditoria-rapida', 'optimizacion',
    'flujo-de-trabajo', 'implementacion', 'decision-estrategica', 'arquitectura-base',
    'componentes-reutilizables', 'integracion', 'automatizacion', 'migracion',
  ];

  const titlesEs = (tag, topic) => {
    return `${titlePrefix}${tag}: ${topic.replace(/-/g, ' ')} en ${year}`;
  };
  const descEs = (tag) => {
    return `Guía breve y accionable sobre ${tag.toLowerCase()} para aplicar en 2025.`;
  };

  const created = [];
  for (let i = 0; i < count; i += 1) {
    const date = new Date(start.getTime());
    date.setUTCDate(start.getUTCDate() + i);
    const tag = tagPool[i % tagPool.length];
    const topic = topics[i % topics.length];
    const baseSlug = `${prefix}-${slugify(tag)}-${topic}-${String(i + 1).padStart(3, '0')}`;
    const file = path.join(blogDir, `${baseSlug}.md`);
    const title = titlesEs(tag, topic);
    const description = descEs(tag);
    const tags = pickRandom(tagPool, 4);
    if (!dry) {
      const content =
`---
title: "${title}"
description: "${description}"
pubDate: ${toIsoDate(date)}
tags: ${JSON.stringify(tags)}
---

# ${title}

${description}

## Qué hacer ahora
- Aplica 2 mejoras rápidas esta semana.
- Mide cambios con GA4 y Search Console.
`;
      fs.writeFileSync(file, content, 'utf8');
    }
    created.push(path.relative(process.cwd(), file));
  }

  console.log(`${dry ? '[DRY]' : '[OK]'} Generados ${created.length} posts en src/content/blog`);
  if (dry) {
    created.slice(0, 10).forEach((p) => console.log('  -', p));
    if (created.length > 10) console.log('  ...');
  }
}

main();


