// seo-utils.js
export function generateHreflangLinks(currentPath, baseUrl = 'https://pabloalcalde.dev') {
  const isEnglish = currentPath.startsWith('/en');
  const spanishPath = currentPath.replace('/en', '');
  const englishPath = isEnglish ? currentPath : `/en${currentPath}`;
  
  return {
    es: `${baseUrl}${spanishPath}`,
    en: `${baseUrl}${englishPath}`,
    'x-default': `${baseUrl}${spanishPath}`
  };
}

export function generateStructuredDataBlog(post, lang = 'es') {
  const baseUrl = 'https://pabloalcalde.dev';
  const url = lang === 'es' ? `${baseUrl}/blog/${post.slug}` : `${baseUrl}/en/blog/${post.slug}`;
  
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.data.title,
    "description": post.data.description,
    "url": url,
    "datePublished": post.data.pubDate.toISOString(),
    "dateModified": post.data.pubDate.toISOString(),
    "author": {
      "@type": "Person",
      "name": "Pablo Alcalde García",
      "url": baseUrl,
      "sameAs": [
        "https://www.linkedin.com/in/pabloalcaldegarcia",
        "https://github.com/paablooag"
      ]
    },
    "publisher": {
      "@type": "Person",
      "name": "Pablo Alcalde García",
      "url": baseUrl
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "keywords": post.data.tags?.join(', ') || '',
    "inLanguage": lang === 'es' ? 'es-ES' : 'en-US',
    "articleSection": "Technology",
    "wordCount": post.body?.length || 0
  };
}

export function generateBreadcrumbStructuredData(path, lang = 'es') {
  const baseUrl = 'https://pabloalcalde.dev';
  const pathSegments = path.split('/').filter(segment => segment);
  
  const breadcrumbs = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": lang === 'es' ? 'Inicio' : 'Home',
      "item": baseUrl
    }
  ];
  
  let currentPath = '';
  let position = 2;
  
  pathSegments.forEach(segment => {
    currentPath += `/${segment}`;
    
    let name = segment;
    if (segment === 'blog') {
      name = lang === 'es' ? 'Blog' : 'Blog';
    } else if (segment === 'proyectos') {
      name = lang === 'es' ? 'Proyectos' : 'Projects';
    } else if (segment === 'en') {
      return; // Skip language segment
    } else {
      // Capitalize first letter
      name = segment.charAt(0).toUpperCase() + segment.slice(1);
    }
    
    breadcrumbs.push({
      "@type": "ListItem",
      "position": position,
      "name": name,
      "item": `${baseUrl}${currentPath}`
    });
    
    position++;
  });
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs
  };
}
