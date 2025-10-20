import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site?.toString() || 'https://pabloalcalde.com';
  
  // Obtener todos los posts del blog
  const blogPosts = await getCollection('blog', ({ data }) => {
    return data.draft !== true;
  });

  // Generar XML para los posts
  const postsXml = blogPosts.map((post) => {
    const lastmod = post.data.pubDate.toISOString();
    const slug = post.slug;
    
    return `
    <url>
      <loc>${baseUrl}blog/${slug}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>`;
  }).join('');

  // Añadir la página principal del blog
  const blogIndexXml = `
    <url>
      <loc>${baseUrl}blog</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>`;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${blogIndexXml}
  ${postsXml}
</urlset>`.trim();

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};

