import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = (site?.toString() || 'https://pabloalcalde.dev').replace(/\/$/, '');
  
  // Obtener todos los posts del blog
  const blogPosts = await getCollection('blog', ({ data }) => {
    return data.draft !== true;
  });

  // Páginas estáticas principales (español es el idioma por defecto)
  const staticPages = [
    {
      loc: baseUrl,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: '1.0',
      'xhtml:link': [
        { rel: 'alternate', hreflang: 'es', href: baseUrl },
        { rel: 'alternate', hreflang: 'en', href: `${baseUrl}/en` },
        { rel: 'alternate', hreflang: 'x-default', href: baseUrl }
      ]
    },
    {
      loc: `${baseUrl}/blog`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.9',
      'xhtml:link': [
        { rel: 'alternate', hreflang: 'es', href: `${baseUrl}/blog` },
        { rel: 'alternate', hreflang: 'en', href: `${baseUrl}/en/blog` },
        { rel: 'alternate', hreflang: 'x-default', href: `${baseUrl}/blog` }
      ]
    },
    {
      loc: `${baseUrl}/proyectos`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.9',
    },
    {
      loc: `${baseUrl}/en`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: '0.8',
      'xhtml:link': [
        { rel: 'alternate', hreflang: 'es', href: baseUrl },
        { rel: 'alternate', hreflang: 'en', href: `${baseUrl}/en` },
        { rel: 'alternate', hreflang: 'x-default', href: baseUrl }
      ]
    },
    {
      loc: `${baseUrl}/en/blog`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.7',
      'xhtml:link': [
        { rel: 'alternate', hreflang: 'es', href: `${baseUrl}/blog` },
        { rel: 'alternate', hreflang: 'en', href: `${baseUrl}/en/blog` },
        { rel: 'alternate', hreflang: 'x-default', href: `${baseUrl}/blog` }
      ]
    },
  ];

  // Proyectos
  const projects = [
    {
      loc: `${baseUrl}/proyectos/kiko-undefiled-burger`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.8',
    },
    {
      loc: `${baseUrl}/proyectos/tu-carta-en-digital`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.8',
    },
  ];

  // Posts del blog en español (idioma principal)
  const blogPostsEs = blogPosts.map((post) => ({
    loc: `${baseUrl}/blog/${post.slug}`,
    lastmod: post.data.pubDate.toISOString(),
    changefreq: 'monthly',
    priority: '0.8',
    'xhtml:link': [
      { rel: 'alternate', hreflang: 'es', href: `${baseUrl}/blog/${post.slug}` },
      { rel: 'alternate', hreflang: 'en', href: `${baseUrl}/en/blog/${post.slug}` },
      { rel: 'alternate', hreflang: 'x-default', href: `${baseUrl}/blog/${post.slug}` }
    ]
  }));

  // Posts del blog en inglés
  const blogPostsEn = blogPosts.map((post) => ({
    loc: `${baseUrl}/en/blog/${post.slug}`,
    lastmod: post.data.pubDate.toISOString(),
    changefreq: 'monthly',
    priority: '0.7',
    'xhtml:link': [
      { rel: 'alternate', hreflang: 'es', href: `${baseUrl}/blog/${post.slug}` },
      { rel: 'alternate', hreflang: 'en', href: `${baseUrl}/en/blog/${post.slug}` },
      { rel: 'alternate', hreflang: 'x-default', href: `${baseUrl}/blog/${post.slug}` }
    ]
  }));

  // Combinar todas las URLs
  const allUrls = [
    ...staticPages,
    ...projects,
    ...blogPostsEs,
    ...blogPostsEn,
  ];

  // Generar XML con soporte para hreflang
  const urlsXml = allUrls.map((url) => {
    let xml = `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>`;
    
    if (url['xhtml:link']) {
      url['xhtml:link'].forEach(link => {
        xml += `
    <xhtml:link rel="${link.rel}" hreflang="${link.hreflang}" href="${link.href}" />`;
      });
    }
    
    xml += `
  </url>`;
    return xml;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlsXml}
</urlset>`.trim();

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};

