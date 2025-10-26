---
title: "Progressive Web Apps (PWA): Guía completa para desarrolladores"
description: "Aprende a crear Progressive Web Apps desde cero: Service Workers, Web App Manifest, offline functionality y mejores prácticas para PWAs modernas."
pubDate: 2025-01-15T00:00:00.000Z
tags: ["PWA", "Progressive Web Apps", "Service Workers", "Offline", "Mobile"]
---

# Progressive Web Apps (PWA): Guía completa para desarrolladores

Las Progressive Web Apps están revolucionando cómo experimentamos las aplicaciones web. Te guío paso a paso para crear PWAs modernas y funcionales.

## ¿Qué es una PWA?

### Definición y características

```markdown
PROGRESSIVE WEB APP (PWA):
- Aplicación web que se comporta como app nativa
- Funciona offline
- Instalable en dispositivos
- Notificaciones push
- Acceso a APIs del dispositivo

CARACTERÍSTICAS PRINCIPALES:
- Responsive: Se adapta a cualquier dispositivo
- Connectivity independent: Funciona offline
- App-like: Experiencia similar a app nativa
- Fresh: Siempre actualizada
- Safe: Servida vía HTTPS
- Discoverable: SEO optimizado
- Re-engageable: Notificaciones push
- Installable: Se puede instalar
- Linkable: Compartible vía URL
```

### Beneficios de las PWAs

```markdown
VENTAJAS PARA USUARIOS:
- Instalación sin app store
- Funcionamiento offline
- Notificaciones push
- Acceso rápido desde home screen
- Menor uso de almacenamiento
- Actualizaciones automáticas

VENTAJAS PARA DESARROLLADORES:
- Un solo código base
- Distribución web
- Menor complejidad de desarrollo
- Mejor SEO
- Menor costo de mantenimiento
- Acceso a APIs nativas
```

## Componentes esenciales

### 1. Service Worker

```javascript
// sw.js
const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/static/images/icon-192x192.png'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptación de requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - devolver respuesta
        if (response) {
          return response;
        }

        return fetch(event.request).then((response) => {
          // Verificar si recibimos una respuesta válida
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clonar la respuesta
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});
```

### 2. Web App Manifest

```json
{
  "name": "Mi PWA",
  "short_name": "PWA",
  "description": "Una Progressive Web App de ejemplo",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/static/images/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/static/images/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/static/images/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/static/images/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/static/images/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/static/images/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/static/images/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/static/images/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    }
  ],
  "categories": ["productivity", "utilities"],
  "lang": "es",
  "dir": "ltr",
  "scope": "/",
  "prefer_related_applications": false
}
```

### 3. HTML básico

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi PWA</title>
    
    <!-- Web App Manifest -->
    <link rel="manifest" href="/manifest.json">
    
    <!-- Meta tags para PWA -->
    <meta name="theme-color" content="#000000">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="Mi PWA">
    
    <!-- Iconos para iOS -->
    <link rel="apple-touch-icon" href="/static/images/icon-152x152.png">
    
    <!-- CSS -->
    <link rel="stylesheet" href="/static/css/main.css">
</head>
<body>
    <div id="app">
        <header>
            <h1>Mi PWA</h1>
            <button id="install-btn" style="display: none;">Instalar App</button>
        </header>
        
        <main>
            <div id="content">
                <p>¡Bienvenido a mi Progressive Web App!</p>
                <p id="connection-status">Estado de conexión: <span id="status">Verificando...</span></p>
            </div>
        </main>
        
        <footer>
            <p>&copy; 2025 Mi PWA. Todos los derechos reservados.</p>
        </footer>
    </div>
    
    <script src="/static/js/main.js"></script>
</body>
</html>
```

## Implementación paso a paso

### 1. Registro del Service Worker

```javascript
// main.js
class PWAApp {
    constructor() {
        this.init();
    }

    async init() {
        await this.registerServiceWorker();
        this.setupInstallPrompt();
        this.setupConnectionStatus();
        this.setupNotifications();
    }

    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('Service Worker registrado:', registration);
                
                // Verificar actualizaciones
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            this.showUpdateNotification();
                        }
                    });
                });
            } catch (error) {
                console.error('Error registrando Service Worker:', error);
            }
        }
    }

    setupInstallPrompt() {
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            const installBtn = document.getElementById('install-btn');
            installBtn.style.display = 'block';
            
            installBtn.addEventListener('click', async () => {
                if (deferredPrompt) {
                    deferredPrompt.prompt();
                    const { outcome } = await deferredPrompt.userChoice;
                    console.log('Resultado de instalación:', outcome);
                    deferredPrompt = null;
                    installBtn.style.display = 'none';
                }
            });
        });

        window.addEventListener('appinstalled', () => {
            console.log('PWA instalada');
            document.getElementById('install-btn').style.display = 'none';
        });
    }

    setupConnectionStatus() {
        const statusElement = document.getElementById('status');
        
        const updateConnectionStatus = () => {
            if (navigator.onLine) {
                statusElement.textContent = 'En línea';
                statusElement.style.color = 'green';
            } else {
                statusElement.textContent = 'Sin conexión';
                statusElement.style.color = 'red';
            }
        };

        window.addEventListener('online', updateConnectionStatus);
        window.addEventListener('offline', updateConnectionStatus);
        updateConnectionStatus();
    }

    setupNotifications() {
        if ('Notification' in window) {
            if (Notification.permission === 'default') {
                Notification.requestPermission().then((permission) => {
                    if (permission === 'granted') {
                        this.showNotification('PWA', 'Notificaciones habilitadas');
                    }
                });
            }
        }
    }

    showNotification(title, body) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, {
                body: body,
                icon: '/static/images/icon-192x192.png',
                badge: '/static/images/icon-72x72.png'
            });
        }
    }

    showUpdateNotification() {
        if (confirm('Hay una nueva versión disponible. ¿Quieres actualizar?')) {
            window.location.reload();
        }
    }
}

// Inicializar la app
new PWAApp();
```

### 2. Estrategias de caché

```javascript
// sw.js - Estrategias de caché avanzadas
const CACHE_NAME = 'pwa-cache-v2';
const STATIC_CACHE = 'static-cache-v1';
const DYNAMIC_CACHE = 'dynamic-cache-v1';

// Recursos estáticos
const staticAssets = [
    '/',
    '/static/css/main.css',
    '/static/js/main.js',
    '/static/images/icon-192x192.png',
    '/manifest.json'
];

// Estrategia: Cache First
const cacheFirst = async (request) => {
    const cachedResponse = await caches.match(request);
    return cachedResponse || fetch(request);
};

// Estrategia: Network First
const networkFirst = async (request) => {
    try {
        const networkResponse = await fetch(request);
        const cache = await caches.open(DYNAMIC_CACHE);
        cache.put(request, networkResponse.clone());
        return networkResponse;
    } catch (error) {
        const cachedResponse = await caches.match(request);
        return cachedResponse;
    }
};

// Estrategia: Stale While Revalidate
const staleWhileRevalidate = async (request) => {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    const fetchPromise = fetch(request).then((networkResponse) => {
        cache.put(request, networkResponse.clone());
        return networkResponse;
    });

    return cachedResponse || fetchPromise;
};

// Interceptación de requests
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Recursos estáticos - Cache First
    if (staticAssets.includes(url.pathname)) {
        event.respondWith(cacheFirst(request));
    }
    // APIs - Network First
    else if (url.pathname.startsWith('/api/')) {
        event.respondWith(networkFirst(request));
    }
    // Imágenes - Stale While Revalidate
    else if (request.destination === 'image') {
        event.respondWith(staleWhileRevalidate(request));
    }
    // Otros recursos - Network First
    else {
        event.respondWith(networkFirst(request));
    }
});
```

### 3. Sincronización en segundo plano

```javascript
// sw.js - Background Sync
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    try {
        // Sincronizar datos pendientes
        const pendingData = await getPendingData();
        for (const data of pendingData) {
            await syncData(data);
        }
        console.log('Sincronización en segundo plano completada');
    } catch (error) {
        console.error('Error en sincronización:', error);
    }
}

// En main.js - Registrar sincronización
function registerBackgroundSync() {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
        navigator.serviceWorker.ready.then((registration) => {
            return registration.sync.register('background-sync');
        });
    }
}
```

## Notificaciones push

### 1. Configuración del servidor

```javascript
// server.js - Node.js con Express
const express = require('express');
const webpush = require('web-push');
const app = express();

// Configurar web-push
webpush.setVapidDetails(
    'mailto:tu-email@ejemplo.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

// Endpoint para suscribirse a notificaciones
app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    
    // Guardar suscripción en base de datos
    saveSubscription(subscription);
    
    res.status(201).json({});
});

// Endpoint para enviar notificaciones
app.post('/send-notification', (req, res) => {
    const { title, body, icon } = req.body;
    
    // Obtener todas las suscripciones
    const subscriptions = getAllSubscriptions();
    
    // Enviar notificación a todas las suscripciones
    const promises = subscriptions.map(subscription => {
        return webpush.sendNotification(subscription, JSON.stringify({
            title: title,
            body: body,
            icon: icon || '/static/images/icon-192x192.png',
            badge: '/static/images/icon-72x72.png',
            data: {
                url: '/'
            }
        }));
    });
    
    Promise.all(promises)
        .then(() => res.status(200).json({ message: 'Notificaciones enviadas' }))
        .catch(error => res.status(500).json({ error: error.message }));
});
```

### 2. Suscripción en el cliente

```javascript
// main.js - Suscripción a notificaciones
class NotificationManager {
    constructor() {
        this.subscription = null;
    }

    async subscribeToNotifications() {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            try {
                const registration = await navigator.serviceWorker.ready;
                const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: this.urlBase64ToUint8Array(process.env.VAPID_PUBLIC_KEY)
                });

                // Enviar suscripción al servidor
                await fetch('/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(subscription)
                });

                this.subscription = subscription;
                console.log('Suscripción exitosa:', subscription);
            } catch (error) {
                console.error('Error suscribiéndose:', error);
            }
        }
    }

    urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
}

// Manejar notificaciones push
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
    
    const options = {
        body: data.body,
        icon: data.icon,
        badge: data.badge,
        data: data.data,
        actions: [
            {
                action: 'open',
                title: 'Abrir'
            },
            {
                action: 'close',
                title: 'Cerrar'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Manejar clics en notificaciones
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'open') {
        event.waitUntil(
            clients.openWindow(event.notification.data.url || '/')
        );
    }
});
```

## Herramientas de desarrollo

### 1. Lighthouse

```bash
# Instalar Lighthouse
npm install -g lighthouse

# Auditar PWA
lighthouse https://tu-pwa.com --view

# Auditar con configuración específica
lighthouse https://tu-pwa.com --config-path=./lighthouse-config.json
```

### 2. Workbox

```bash
# Instalar Workbox
npm install workbox-cli --save-dev

# Generar Service Worker
npx workbox generateSW workbox-config.js

# Inyectar precache
npx workbox injectManifest workbox-config.js
```

```javascript
// workbox-config.js
module.exports = {
  globDirectory: 'dist/',
  globPatterns: ['**/*.{html,js,css,png,svg,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}'],
  swDest: 'dist/sw.js',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\./,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 // 24 horas
        }
      }
    }
  ]
};
```

## Mejores prácticas

### 1. Performance

```markdown
OPTIMIZACIONES:
- Lazy loading de recursos
- Compresión de imágenes
- Minificación de código
- Tree shaking
- Code splitting
- Preload de recursos críticos
```

### 2. UX/UI

```markdown
MEJORES PRÁCTICAS:
- Diseño responsive
- Feedback visual de carga
- Estados offline claros
- Transiciones suaves
- Accesibilidad
- Navegación intuitiva
```

### 3. Seguridad

```markdown
CONSIDERACIONES DE SEGURIDAD:
- HTTPS obligatorio
- Validación de datos
- Sanitización de inputs
- Headers de seguridad
- Content Security Policy
- Autenticación segura
```

## Testing de PWAs

### 1. Testing automatizado

```javascript
// pwa.test.js
import { describe, it, expect, beforeEach } from 'vitest';

describe('PWA Tests', () => {
  beforeEach(async () => {
    // Limpiar caches
    const caches = await window.caches.keys();
    await Promise.all(caches.map(cache => window.caches.delete(cache)));
  });

  it('should register service worker', async () => {
    const registration = await navigator.serviceWorker.register('/sw.js');
    expect(registration).toBeDefined();
  });

  it('should cache resources', async () => {
    // Simular request
    const response = await fetch('/');
    expect(response).toBeDefined();
    
    // Verificar que está en cache
    const cachedResponse = await caches.match('/');
    expect(cachedResponse).toBeDefined();
  });

  it('should work offline', async () => {
    // Simular offline
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: false
    });

    const response = await fetch('/');
    expect(response).toBeDefined();
  });
});
```

### 2. Testing manual

```markdown
CHECKLIST DE TESTING:
- Instalación en dispositivo
- Funcionamiento offline
- Notificaciones push
- Responsive design
- Performance en diferentes dispositivos
- Compatibilidad con navegadores
- Accesibilidad
- SEO
```

## Conclusión

Las Progressive Web Apps representan el futuro del desarrollo web, combinando lo mejor de las aplicaciones web y nativas.

**Beneficios clave**:
- Experiencia de usuario mejorada
- Funcionamiento offline
- Instalación sin app store
- Notificaciones push
- Mejor performance
- Menor costo de desarrollo

**Componentes esenciales**:
- Service Worker
- Web App Manifest
- HTTPS
- Responsive design
- App-like experience

**Próximos pasos**:
1. Configura HTTPS
2. Crea el Web App Manifest
3. Implementa Service Worker
4. Añade funcionalidad offline
5. Configura notificaciones push
6. Optimiza para performance
7. Testa en diferentes dispositivos

**Recuerda**: Una PWA exitosa requiere atención tanto a la funcionalidad técnica como a la experiencia de usuario. La clave está en crear una aplicación que se sienta nativa pero mantenga la accesibilidad de la web.

¡Las PWAs están transformando cómo interactuamos con las aplicaciones web!
