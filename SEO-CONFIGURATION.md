# Configuración SEO para Google Search Console
# Este archivo ayuda a configurar correctamente el SEO multilingüe

# 1. Configuración de idioma por defecto
# El español es el idioma principal, por lo que las URLs sin prefijo son en español
# Las URLs en inglés tienen el prefijo /en/

# 2. Hreflang tags
# Cada página debe tener hreflang tags que apunten a:
# - hreflang="es" -> versión en español
# - hreflang="en" -> versión en inglés  
# - hreflang="x-default" -> versión por defecto (español)

# 3. Sitemaps
# Los sitemaps incluyen todas las páginas con hreflang tags
# - sitemap.xml (principal)
# - blog-sitemap.xml (blogs)
# - projects-sitemap.xml (proyectos)
# - sitemap-index.xml (índice)

# 4. Configuración de Google Search Console
# - Verificar propiedad para pabloalcalde.dev
# - Configurar idioma objetivo: español (España)
# - Enviar sitemaps
# - Configurar parámetros de URL para /en/

# 5. URLs canónicas
# - Página principal: https://pabloalcalde.dev/
# - Blog: https://pabloalcalde.dev/blog/
# - Proyectos: https://pabloalcalde.dev/proyectos/
# - Inglés: https://pabloalcalde.dev/en/

# 6. Estructura de URLs
# Español (por defecto):
# - https://pabloalcalde.dev/
# - https://pabloalcalde.dev/blog/
# - https://pabloalcalde.dev/blog/slug-del-post/
# - https://pabloalcalde.dev/proyectos/

# Inglés:
# - https://pabloalcalde.dev/en/
# - https://pabloalcalde.dev/en/blog/
# - https://pabloalcalde.dev/en/blog/slug-del-post/

# 7. Meta tags importantes
# - lang="es" o lang="en" en el HTML
# - hreflang tags en el head
# - canonical URL
# - Open Graph locale

# 8. Configuración del servidor
# - Redireccionar www a no-www
# - Forzar HTTPS
# - Configurar headers de cache
# - Compresión gzip

# 9. Verificación en Google Search Console
# - Verificar que las páginas en español aparezcan primero
# - Verificar que los hreflang tags funcionen correctamente
# - Monitorear el rendimiento de búsqueda por idioma
# - Verificar que no haya contenido duplicado

# 10. Herramientas de verificación
# - Google Search Console
# - Google Rich Results Test
# - Hreflang Testing Tool
# - Screaming Frog SEO Spider
