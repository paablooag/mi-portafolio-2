#!/usr/bin/env node

/**
 * Script para automatizar la indexación de páginas en Google
 * Ejecutar: node scripts/auto-index.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuración
const SITE_URL = 'https://pabloalcalde.dev';
const GOOGLE_INDEX_API = 'https://indexing.googleapis.com/v3/urlNotifications:publish';

// Páginas a indexar
const PAGES_TO_INDEX = [
  '/',
  '/proyectos',
  '/proyectos/tu-carta-en-digital',
  '/proyectos/kiko-undefiled-burger',
  '/blog'
];

// Función para hacer petición a Google Indexing API
function submitToGoogleIndexing(url, action = 'URL_UPDATED') {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      url: url,
      type: action
    });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        // Nota: Necesitarías un token de autenticación real
        // 'Authorization': `Bearer ${GOOGLE_ACCESS_TOKEN}`
      }
    };

    const req = https.request(GOOGLE_INDEX_API, options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          data: responseData
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

// Función para ping a Google sobre sitemap
function pingGoogleSitemap() {
  const sitemapUrl = `${SITE_URL}/sitemap-index.xml`;
  const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
  
  return new Promise((resolve, reject) => {
    https.get(pingUrl, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          data: data
        });
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

// Función para ping a Bing sobre sitemap
function pingBingSitemap() {
  const sitemapUrl = `${SITE_URL}/sitemap-index.xml`;
  const pingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
  
  return new Promise((resolve, reject) => {
    https.get(pingUrl, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          data: data
        });
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

// Función principal
async function autoIndex() {
  console.log('🚀 Iniciando indexación automática...\n');

  try {
    // 1. Ping sitemaps a Google y Bing
    console.log('📡 Enviando sitemap a motores de búsqueda...');
    
    const googlePing = await pingGoogleSitemap();
    console.log(`✅ Google: ${googlePing.status === 200 ? 'Éxito' : 'Error'}`);
    
    const bingPing = await pingBingSitemap();
    console.log(`✅ Bing: ${bingPing.status === 200 ? 'Éxito' : 'Error'}`);

    // 2. Enviar URLs individuales (requiere autenticación)
    console.log('\n📄 Enviando URLs individuales...');
    
    for (const page of PAGES_TO_INDEX) {
      const fullUrl = `${SITE_URL}${page}`;
      console.log(`📤 Enviando: ${fullUrl}`);
      
      try {
        // Nota: Esto requiere autenticación real con Google
        // const result = await submitToGoogleIndexing(fullUrl);
        // console.log(`   ✅ ${result.status === 200 ? 'Enviado' : 'Error'}`);
        console.log(`   ⚠️  Requiere autenticación con Google Indexing API`);
      } catch (error) {
        console.log(`   ❌ Error: ${error.message}`);
      }
    }

    // 3. Generar reporte
    console.log('\n📊 Generando reporte...');
    const report = {
      timestamp: new Date().toISOString(),
      site: SITE_URL,
      pages: PAGES_TO_INDEX,
      sitemapPings: {
        google: googlePing.status,
        bing: bingPing.status
      }
    };

    const reportPath = path.join(__dirname, '../reports/indexing-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📄 Reporte guardado en: ${reportPath}`);

    console.log('\n✅ Indexación automática completada!');
    console.log('\n💡 Próximos pasos:');
    console.log('   1. Configurar Google Search Console');
    console.log('   2. Obtener token de Google Indexing API');
    console.log('   3. Programar ejecución automática (cron job)');

  } catch (error) {
    console.error('❌ Error en la indexación:', error.message);
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  autoIndex();
}

module.exports = { autoIndex, submitToGoogleIndexing, pingGoogleSitemap, pingBingSitemap };
