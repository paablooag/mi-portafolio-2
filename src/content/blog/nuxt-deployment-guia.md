---
title: "Desplegar Nuxt 3 en producción: Guía completa"
description: "Todo lo que necesitas saber para desplegar tu aplicación Nuxt 3 en diferentes plataformas: Netlify, Vercel, y más."
pubDate: 2025-10-18T00:00:00.000Z
tags: ["Nuxt.js", "Deployment", "DevOps", "Production"]
---

# Desplegar Nuxt 3 en producción: Guía completa

Cómo llevar tu aplicación Nuxt de desarrollo a producción sin problemas.

## Preparación pre-deployment

### 1. Variables de entorno

```bash
# .env.production
NUXT_PUBLIC_API_URL=https://api.produccion.com
NUXT_PRIVATE_API_KEY=xxx
```

```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    // Private (solo servidor)
    apiKey: process.env.NUXT_PRIVATE_API_KEY,
    
    // Public (cliente y servidor)
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL
    }
  }
})
```

### 2. Optimización

```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    compressPublicAssets: true,
    minify: true,
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml']
    }
  },
  
  experimental: {
    payloadExtraction: true
  },
  
  image: {
    formats: ['avif', 'webp']
  }
})
```

### 3. Build test

```bash
npm run build
npm run preview
```

## Netlify

### Setup

```bash
npm install -D @netlify/edge-functions
```

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".output/public"

[[redirects]]
  from = "/*"
  to = "/.netlify/functions/server"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Deployment

```bash
# Via CLI
npm install -D netlify-cli
netlify deploy --prod

# O conecta repo en Netlify UI
```

### Environment Variables

```bash
# En Netlify UI
Site settings > Environment variables
```

## Vercel

### Preset automático

Nuxt detecta Vercel automáticamente.

```javascript
// nuxt.config.ts - ya incluido
export default defineNuxtConfig({
  nitro: {
    preset: 'vercel'
  }
})
```

### vercel.json

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nuxtjs",
  "outputDirectory": ".output/public"
}
```

### Deployment

```bash
# Via CLI
npm install -g vercel
vercel --prod

# O via Git push
git push origin main
```

### Edge Functions

```javascript
// server/middleware/edge.ts
export default defineEventHandler(async (event) => {
  event.node.res.setHeader('x-edge', 'true')
})
```

## Cloudflare Pages

### Build settings

```toml
# wrangler.toml
name = "mi-app-nuxt"
compatibility_date = "2024-01-01"

[build]
command = "npm run build"

[site]
bucket = ".output/public"
```

### Deploy

```bash
npm install -D wrangler
npx wrangler pages deploy .output/public
```

### Workers

```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    preset: 'cloudflare-pages'
  }
})
```

## Docker

### Dockerfile

```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package*.json ./

ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  nuxt-app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NUXT_PUBLIC_API_URL=https://api.example.com
    restart: unless-stopped
```

### Build y run

```bash
docker build -t mi-app-nuxt .
docker run -p 3000:3000 mi-app-nuxt
```

## Node.js Server

### PM2

```bash
npm install -g pm2
```

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'nuxt-app',
    script: './.output/server/index.mjs',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

```bash
# Deploy
npm run build
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Static Hosting

### Para SSG

```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: false, // SPA
  // O
  nitro: {
    static: true // SSG
  }
})
```

```bash
npm run generate
# Output en .output/public
```

### GitHub Pages

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Generate
        run: npm run generate
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .output/public
```

## CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Test
        run: npm run test
      
      - name: Build
        run: npm run build
```

## Monitoring

### Sentry

```bash
npm install @sentry/vue
```

```javascript
// plugins/sentry.client.ts
import * as Sentry from '@sentry/vue'

export default defineNuxtPlugin((nuxtApp) => {
  Sentry.init({
    app: nuxtApp.vueApp,
    dsn: 'YOUR_SENTRY_DSN',
    environment: process.env.NODE_ENV,
    tracesSampleRate: 1.0
  })
})
```

### Analytics

```javascript
// plugins/analytics.client.ts
export default defineNuxtPlugin(() => {
  // Google Analytics
  if (process.client) {
    window.dataLayer = window.dataLayer || []
    function gtag() { dataLayer.push(arguments) }
    gtag('js', new Date())
    gtag('config', 'GA_MEASUREMENT_ID')
  }
})
```

## Performance Checklist

Pre-deployment:

- [ ] Lighthouse score > 90
- [ ] Core Web Vitals optimizados
- [ ] Imágenes optimizadas
- [ ] Code splitting implementado
- [ ] Lazy loading configurado
- [ ] Caché configurado
- [ ] CDN para assets estáticos
- [ ] Compresión Gzip/Brotli
- [ ] Security headers
- [ ] HTTPS habilitado

## Troubleshooting

### Error: "Cannot find module"

```bash
# Limpiar y reinstalar
rm -rf .nuxt .output node_modules
npm install
npm run build
```

### Error 500 en producción

```javascript
// Habilitar logs
export default defineNuxtConfig({
  nitro: {
    logLevel: 4
  }
})
```

### Assets no cargan

```javascript
// Verificar base URL
export default defineNuxtConfig({
  app: {
    cdnURL: 'https://cdn.ejemplo.com'
  }
})
```

## Mi stack en producción

En Wegow usamos:

- **Hosting**: Netlify
- **CDN**: Cloudflare
- **Monitoring**: Sentry
- **Analytics**: Google Analytics 4
- **CI/CD**: GitHub Actions
- **Performance**: Cloudinary (imágenes)

## Conclusión

Nuxt 3 hace el deployment muy sencillo. Elige la plataforma que mejor se adapte a tu proyecto y sigue estas mejores prácticas.

