import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = (site?.toString() || 'https://pabloalcalde.dev').replace(/\/$/, '');
  
  // Obtener todos los posts del blog
  const blogPosts = await getCollection('blog', ({ data }) => {
    return data.draft !== true;
  });

  // Generar XML para los posts con hreflang
  const postsXml = blogPosts.map((post) => {
    const lastmod = post.data.pubDate.toISOString();
    const slug = post.slug;
    
    return `
    <url>
      <loc>${baseUrl}/blog/${slug}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
      <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}/blog/${slug}" />
      <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/blog/${slug}" />
      <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/blog/${slug}" />
    </url>`;
  }).join('');

  // Añadir la página principal del blog
  const blogIndexXml = `
    <url>
      <loc>${baseUrl}/blog</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
      <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}/blog" />
      <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/blog" />
      <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/blog" />
    </url>`;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${blogIndexXml}
  ${postsXml}
</urlset>`.trim();

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};

