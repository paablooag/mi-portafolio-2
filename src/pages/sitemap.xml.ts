import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site?.toString() || 'https://pabloalcalde.com';
  
  // Obtener todos los posts del blog
  const blogPosts = await getCollection('blog', ({ data }) => {
    return data.draft !== true;
  });

  // Páginas estáticas principales
  const staticPages = [
    {
      loc: baseUrl,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: '1.0',
    },
    {
      loc: `${baseUrl}blog`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.9',
    },
    {
      loc: `${baseUrl}proyectos`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.9',
    },
    {
      loc: `${baseUrl}es`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: '0.9',
    },
    {
      loc: `${baseUrl}en`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: '0.9',
    },
    {
      loc: `${baseUrl}en/blog`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.8',
    },
  ];

  // Proyectos
  const projects = [
    {
      loc: `${baseUrl}proyectos/kiko-undefiled-burger`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.8',
    },
    {
      loc: `${baseUrl}proyectos/tu-carta-en-digital`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.8',
    },
  ];

  // Posts del blog en español
  const blogPostsEs = blogPosts.map((post) => ({
    loc: `${baseUrl}blog/${post.slug}`,
    lastmod: post.data.pubDate.toISOString(),
    changefreq: 'monthly',
    priority: '0.7',
  }));

  // Posts del blog en inglés
  const blogPostsEn = blogPosts.map((post) => ({
    loc: `${baseUrl}en/blog/${post.slug}`,
    lastmod: post.data.pubDate.toISOString(),
    changefreq: 'monthly',
    priority: '0.7',
  }));

  // Combinar todas las URLs
  const allUrls = [
    ...staticPages,
    ...projects,
    ...blogPostsEs,
    ...blogPostsEn,
  ];

  // Generar XML
  const urlsXml = allUrls.map((url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('');

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

