# 🚀 Instrucciones de Instalación y Desarrollo

## Pasos para comenzar

### 1. Instalar dependencias

```bash
npm install
```

### 2. Iniciar el servidor de desarrollo

```bash
npm run dev
```

El servidor se iniciará en `http://localhost:4321`

### 3. Construir para producción

```bash
npm run build
```

### 4. Previsualizar la construcción

```bash
npm run preview
```

## 📂 Estructura del Proyecto

```
mi-portafolio-2/
├── public/
│   ├── favicon.svg          # Favicon del sitio
│   └── robots.txt           # Configuración de robots para SEO
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Header.astro     # Navegación principal
│   │   ├── Hero.astro       # Sección hero/inicio
│   │   ├── About.astro      # Sección sobre mí
│   │   ├── Experience.astro # Experiencia laboral
│   │   ├── Skills.astro     # Habilidades y tecnologías
│   │   ├── Education.astro  # Formación académica
│   │   ├── Contact.astro    # Sección de contacto
│   │   └── Footer.astro     # Pie de página
│   ├── layouts/
│   │   └── Layout.astro     # Layout principal con SEO
│   ├── pages/
│   │   └── index.astro      # Página principal
│   ├── styles/
│   │   └── global.css       # Estilos globales
│   └── env.d.ts             # Tipos de TypeScript
├── astro.config.mjs         # Configuración de Astro
├── tailwind.config.mjs      # Configuración de Tailwind CSS
├── tsconfig.json            # Configuración de TypeScript
└── package.json             # Dependencias del proyecto
```

## ⚙️ Configuración Inicial Importante

### 📧 Formulario de Contacto

**IMPORTANTE:** El formulario de contacto requiere configuración antes de funcionar.

1. **Obtén tu Access Key gratis (2 minutos):**
   - Ve a [web3forms.com](https://web3forms.com)
   - Ingresa tu email: pablooalcaldegarcia@gmail.com
   - Recibirás un email con tu Access Key

2. **Configura el formulario:**
   - Abre `src/components/Contact.astro`
   - Busca la línea 246: `access_key: 'YOUR_ACCESS_KEY_HERE'`
   - Reemplaza con tu clave real

3. **¡Listo!** Los mensajes llegarán a tu email automáticamente.

📄 **Guía completa:** [CONFIGURACION_FORMULARIO.md](./CONFIGURACION_FORMULARIO.md)

---

## 🎨 Personalización

### Colores

Los colores principales están definidos en `tailwind.config.mjs`:

- `primary`: #3b82f6 (Azul)
- `secondary`: #8b5cf6 (Violeta)
- `dark`: #0f172a (Fondo oscuro)
- `dark-lighter`: #1e293b (Fondo oscuro claro)

### Contenido

Para modificar tu información personal:

1. **Información de contacto**: Edita `src/components/Hero.astro`, `src/components/Contact.astro` y `src/components/Footer.astro`
2. **Experiencia laboral**: Edita el array `experiences` en `src/components/Experience.astro`
3. **Habilidades**: Edita el objeto `skills` en `src/components/Skills.astro`
4. **Educación**: Edita el array `education` en `src/components/Education.astro`
5. **Certificaciones**: Edita el array `certifications` en `src/components/Skills.astro`

### SEO

La configuración SEO está en `src/layouts/Layout.astro`. Incluye:
- Meta tags optimizados
- Open Graph para redes sociales
- Twitter Cards
- Sitemap automático (generado al construir)

## 🌐 Despliegue

### Netlify (Recomendado)

1. Crea una cuenta en [Netlify](https://www.netlify.com/)
2. Conecta tu repositorio de GitHub
3. Configura el comando de build: `npm run build`
4. Configura el directorio de publicación: `dist`
5. ¡Despliega!

### Vercel

1. Crea una cuenta en [Vercel](https://vercel.com/)
2. Importa tu proyecto desde GitHub
3. Vercel detectará automáticamente que es un proyecto Astro
4. ¡Despliega!

### GitHub Pages

1. Actualiza `astro.config.mjs` con tu URL de GitHub Pages
2. Ejecuta `npm run build`
3. Sube el contenido de `dist/` a tu repositorio `gh-pages`

## 📝 Notas

- Este portafolio está optimizado para SEO con renderizado estático
- Utiliza Tailwind CSS para los estilos
- Es completamente responsive (móvil, tablet, desktop)
- Tiene animaciones suaves y transiciones
- Incluye meta tags para redes sociales
- Genera automáticamente un sitemap

## 💡 Tips

1. **Imágenes**: Añade tus imágenes en la carpeta `public/`
2. **Proyectos**: Puedes crear una nueva sección de proyectos siguiendo el patrón de los componentes existentes
3. **Blog**: Astro soporta markdown/MDX, puedes añadir un blog fácilmente
4. **Analytics**: Añade Google Analytics u otras herramientas en el `Layout.astro`

## 🆘 Soporte

Si tienes algún problema:

1. Verifica que tienes Node.js instalado (versión 18 o superior)
2. Elimina `node_modules` y ejecuta `npm install` de nuevo
3. Revisa la [documentación de Astro](https://docs.astro.build)

---

¡Disfruta de tu nuevo portafolio! 🎉

