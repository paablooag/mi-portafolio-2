---
title: "PWA: mejores practicas en 2025"
description: "Guía breve y accionable sobre pwa para aplicar en 2025."
pubDate: 2025-03-04T00:00:00.000Z
tags: ["Analytics","E-commerce","Freelance","Pagos"]
---

# PWA: mejores practicas en 2025

Mejores prácticas para desarrollar Progressive Web Apps (PWA) en 2025. Aprende cómo crear aplicaciones web que funcionen offline, sean instalables y ofrezcan una experiencia similar a apps nativas.

## ¿Qué es una PWA?

Una Progressive Web App es una aplicación web que:
- **Funciona offline** gracias a Service Workers
- **Se puede instalar** en dispositivos como una app nativa
- **Es responsive** y se adapta a cualquier pantalla
- **Es rápida** y confiable
- **Ofrece notificaciones push** (opcional)

## Mejores Prácticas PWA 2025

### 1. Service Worker: El Corazón de la PWA

```javascript
// sw.js - Service Worker básico
const CACHE_NAME = 'mi-pwa-v1';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/main.js',
  '/images/logo.png'
];

// Instalación
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Activación
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Estrategia: Cache First, Network Fallback
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
```

**Estrategias de caché:**
- **Cache First**: Para assets estáticos (CSS, JS, imágenes)
- **Network First**: Para contenido dinámico (APIs)
- **Stale While Revalidate**: Para contenido que cambia ocasionalmente

### 2. Web App Manifest

```json
{
  "name": "Mi Aplicación",
  "short_name": "MiApp",
  "description": "Descripción de mi PWA",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0066cc",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

**Requisitos de iconos:**
- Mínimo: 192x192 y 512x512
- Recomendado: Todos los tamaños estándar
- Maskable icons para Android

### 3. Registro del Service Worker

```javascript
// main.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registrado:', registration.scope);
        
        // Actualización automática
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // Nueva versión disponible
              showUpdateNotification();
            }
          });
        });
      })
      .catch((error) => {
        console.error('Error registrando SW:', error);
      });
  });
}
```

### 4. Manejo Offline

```javascript
// Detectar estado de conexión
window.addEventListener('online', () => {
  showNotification('Conexión restaurada');
  syncData();
});

window.addEventListener('offline', () => {
  showNotification('Modo offline activado');
});

// Sincronización en background
if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
  navigator.serviceWorker.ready.then((registration) => {
    return registration.sync.register('sync-data');
  });
}

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncDataToServer());
  }
});
```

### 5. Notificaciones Push

```javascript
// Solicitar permiso
async function requestNotificationPermission() {
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    subscribeToPush();
  }
}

// Suscribirse a push
async function subscribeToPush() {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
  });
  
  // Enviar subscription al servidor
  await sendSubscriptionToServer(subscription);
}

// Manejar notificaciones push
self.addEventListener('push', (event) => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      url: data.url
    }
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Manejar clicks en notificaciones
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});
```

### 6. Actualización de la PWA

```javascript
// Detectar actualizaciones
let refreshing = false;

navigator.serviceWorker.addEventListener('controllerchange', () => {
  if (refreshing) return;
  refreshing = true;
  window.location.reload();
});

// Forzar actualización
function updateServiceWorker() {
  navigator.serviceWorker.getRegistration().then((registration) => {
    if (registration) {
      registration.update();
    }
  });
}
```

### 7. Almacenamiento de Datos

```javascript
// IndexedDB para datos estructurados
const dbPromise = openDB('mi-pwa-db', 1, {
  upgrade(db) {
    db.createObjectStore('posts', { keyPath: 'id' });
    db.createObjectStore('settings', { keyPath: 'key' });
  }
});

// Guardar datos
async function savePost(post) {
  const db = await dbPromise;
  await db.put('posts', post);
}

// Leer datos
async function getPosts() {
  const db = await dbPromise;
  return await db.getAll('posts');
}

// Cache API para recursos
async function cacheResource(url) {
  const cache = await caches.open('resources-v1');
  await cache.add(url);
}
```

## Checklist de Implementación PWA

### Requisitos Básicos
- [ ] Service Worker registrado y funcionando
- [ ] Web App Manifest configurado
- [ ] HTTPS habilitado (requerido para PWA)
- [ ] Iconos en múltiples tamaños
- [ ] Responsive design implementado

### Funcionalidades Offline
- [ ] Página offline personalizada
- [ ] Estrategia de caché implementada
- [ ] Sincronización en background
- [ ] Manejo de errores de red

### Experiencia de Usuario
- [ ] Splash screen configurado
- [ ] Theme color definido
- [ ] Display mode: standalone
- [ ] Notificaciones push (opcional)
- [ ] Actualización automática

### Optimización
- [ ] Lazy loading de recursos
- [ ] Code splitting
- [ ] Compresión de assets
- [ ] Optimización de imágenes

## Herramientas y Testing

### Desarrollo
- **Workbox** - Librería para Service Workers
- **PWA Builder** - Generador de manifiestos
- **Lighthouse** - Auditoría PWA

### Testing
- Chrome DevTools > Application > Service Workers
- Chrome DevTools > Application > Manifest
- Network throttling para probar offline
- Lighthouse PWA audit

## Qué hacer ahora

1. **Implementa Service Worker básico** con estrategia Cache First para assets estáticos
2. **Crea y configura el Web App Manifest** con iconos en todos los tamaños necesarios
3. **Mide el impacto** con GA4 y Search Console para validar mejoras en engagement, tiempo en sitio y tasa de instalación
