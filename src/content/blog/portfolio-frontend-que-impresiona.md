---
title: "El portfolio frontend que impresiona a reclutadores: guía práctica"
description: "Qué proyectos incluir en tu portfolio, cómo presentarlos con READMEs y demos, qué evitar, y consejos reales de cómo un buen portfolio puede abrirte puertas."
pubDate: 2025-07-15
author: "Pablo Alcalde García"
tags: ["portfolio", "frontend", "carrera", "empleo", "github"]
draft: false
---

## Por qué el portfolio es tu argumento más poderoso

El CV dice que sabes hacer algo. El portfolio demuestra que efectivamente lo haces. Esta diferencia parece simple, pero en la práctica tiene un impacto enorme en los procesos de selección.

Un reclutador técnico que revisa candidaturas para una posición de frontend puede recibir 100 CVs. De esos 100, quizás 80 dicen "Vue 3, TypeScript, CSS, REST APIs". Para filtrar, necesita alguna señal de calidad. El portfolio es esa señal.

He hablado con reclutadores y personas de contratación sobre qué buscan en portfolios de candidatos frontend, y hay patrones claros entre los portfolios que consiguen entrevistas y los que no. Este artículo recoge esos patrones.

## Cuántos proyectos incluir y cuáles elegir

La cantidad importa menos que la calidad. Un portfolio con 3 proyectos bien ejecutados y presentados es mucho más efectivo que uno con 15 proyectos a medias.

### La regla de los 3-4 proyectos

Para la mayoría de desarrolladores con menos de 5 años de experiencia, 3-4 proyectos es el número ideal. Suficiente para mostrar amplitud, sin diluir la atención en cosas que no añaden valor.

### Qué tipos de proyectos incluir

**Proyecto principal ambicioso (1)**: Un proyecto que demuestre que puedes construir algo real y completo. No tiene que ser el próximo Airbnb, pero sí tiene que tener múltiples vistas, manejo de estado, interacción con APIs y estar desplegado. Este es tu "proyecto bandera".

**Proyectos de dominio específico (2-3)**: Proyectos que demuestren habilidades específicas relevantes para el tipo de trabajo que buscas. Si quieres trabajar en e-commerce, muestra algo relacionado. Si te interesa el sector fintech, una herramienta de finanzas personales puede ser muy relevante.

**Algo de código abierto o utilidad real (opcional pero valioso)**: Un componente de Vue que hayas publicado en npm, una herramienta CLI pequeña, una contribución a un proyecto open source. Esto demuestra que puedes escribir código que otras personas puedan usar.

### Qué evitar incluir

- **Proyectos de tutorial sin modificaciones**: Si clonaste el proyecto de un curso y no añadiste nada propio, mejor no incluirlo. Los reclutadores técnicos reconocen los proyectos típicos de cursos populares.
- **Proyectos rotos o sin desplegar**: Si el demo no funciona o el repo tiene errores en la consola, hace más daño que bien. Mejor no incluirlo.
- **Demasiados proyectos similares**: Tres to-do lists no demuestran más que una to-do list bien hecha.
- **Proyectos de hace 5 años con código desactualizado**: Si el código usa Vue 2 y Options API sin TypeScript y sabes Vue 3, ese proyecto perjudica tu candidatura.

## Cómo presentar proyectos: la diferencia está en los detalles

La calidad del código es importante, pero la presentación es lo que convierte un buen proyecto en una candidatura convincente.

### El README: tu carta de presentación del proyecto

El README de cada proyecto es lo primero que ve alguien cuando llega a tu repositorio. Un README bien escrito puede convencer a alguien de profundizar en el código; un README malo (o inexistente) hace que abandonen inmediatamente.

Estructura de un buen README para un proyecto de portfolio:

```markdown
# Nombre del Proyecto

> Descripción en una frase que explique qué hace y para quién.

[Demo en vivo](https://tu-demo.vercel.app) · [Repositorio](https://github.com/tu-usuario/proyecto)

## Captura de pantalla

![Screenshot del proyecto](./screenshot.png)

## Características principales

- Feature 1 con descripción breve
- Feature 2
- Feature 3

## Stack tecnológico

- **Frontend**: Vue 3, TypeScript, Pinia
- **Estilos**: Tailwind CSS
- **Testing**: Vitest, Vue Testing Library
- **Deploy**: Vercel

## Por qué tomé estas decisiones técnicas

[1-2 párrafos explicando las decisiones de arquitectura más relevantes. 
¿Por qué este framework? ¿Qué problema técnico fue interesante de resolver?]

## Cómo ejecutarlo localmente

```bash
git clone https://github.com/usuario/proyecto
cd proyecto
npm install
npm run dev
```
```

Lo que diferencia un README memorable: la sección "Por qué tomé estas decisiones técnicas". Esto es exactamente lo que un entrevistador te preguntará. Haberlo escrito en el README demuestra que pensaste el proyecto y no solo lo implementaste.

### El código limpio como argumento

El código que hay en tu repositorio de portfolio va a ser leído por personas técnicas. No tiene que ser perfecto, pero sí tiene que ser legible y mostrar buenas prácticas.

Cosas que los revisores de código buscan:
- **Nombres descriptivos**: variables, funciones y componentes con nombres que explican su propósito
- **Componentes bien organizados**: separación clara entre lógica y presentación
- **Sin código muerto**: sin `console.log`, sin archivos sin usar, sin código comentado que nunca ejecutas
- **Commits descriptivos**: un historial de git limpio muestra que trabajas de forma organizada

### La demo: tienes que tener una

Si tu proyecto no tiene una demo funcional accesible en una URL, prácticamente no existe para los reclutadores. Nadie va a clonar tu repo y ejecutarlo localmente para ver qué hace.

Las opciones más fáciles para desplegar:
- **Vercel**: gratuito para proyectos personales, deploys automáticos desde GitHub, perfecto para proyectos frontend y Nuxt/Next.js
- **Netlify**: alternativa a Vercel, también gratuita para uso personal
- **Cloudflare Pages**: muy rápido, generoso en el plan gratuito
- **GitHub Pages**: gratuito, pero solo para sitios estáticos sin backend

Para proyectos con backend, Railway o Render tienen planes gratuitos que permiten desplegar Node.js/bases de datos.

## La estructura ideal del portfolio web

El portfolio en sí —el sitio web que lo presenta— también importa. No necesita ser extravagante, pero sí tiene que ser funcional, rápido y reflejo de tu nivel.

### Las secciones esenciales

**Hero/Inicio**: Quién eres, qué haces, y una llamada a la acción clara (ver proyectos, contactar). Evita los textos genéricos como "Apasionado desarrollador web". Sé específico: "Desarrollador frontend especializado en Vue y Nuxt, construyendo interfaces rápidas y accesibles."

**Proyectos**: La sección más importante. Cada proyecto con screenshot/video, descripción breve, stack de tecnologías, y links a la demo y al código. Ordénalos de más a menos impresionante.

**Sobre mí**: Breve, personal y honesto. Cuánta experiencia tienes, qué tecnologías manejas, qué tipo de proyectos te interesan. Puedes mencionar algo personal que te diferencie.

**Habilidades**: Una lista de tecnologías, pero sin mentir sobre el nivel. Si eres junior con Vue, no pongas "Vue Expert". Los reclutadores técnicos lo verifican.

**Contacto**: Email visible, link a LinkedIn, link a GitHub. Haz que sea fácil contactarte.

### Lo que hace memorable un portfolio web

- **Rendimiento**: Un portfolio que carga lento es una mala carta de presentación para un desarrollador frontend. Apunta a 95+ en PageSpeed Insights.
- **Diseño limpio**: No necesitas ser diseñador, pero sí necesitas que el sitio se vea profesional. Un buen sistema de diseño (Tailwind, un tema de Shadcn) te puede dar mucho recorrido.
- **Código fuente público**: Muchos portfolios tienen el repositorio público. Si el tuyo lo tiene, asegúrate de que el código sea bueno: alguien podría mirarlo.

## GitHub profile README: el currículum invisible

Cuando alguien visita tu perfil de GitHub, lo primero que ve es tu profile README (si lo tienes configurado). Este es un espacio de Markdown que aparece en la página principal de tu perfil.

Para crearlo, crea un repositorio con el mismo nombre que tu usuario de GitHub (por ejemplo, `tu-usuario/tu-usuario`) y añade un README.md.

### Qué incluir en el profile README

```markdown
# Hola, soy [Tu Nombre] 👋

Desarrollador frontend especializado en **Vue 3**, **Nuxt** y **TypeScript**.
Actualmente trabajando en [empresa] / buscando nuevas oportunidades.

## Stack principal

- **Frameworks**: Vue 3, Nuxt 4, Astro
- **Lenguajes**: TypeScript, JavaScript, HTML5, CSS3
- **Estilos**: Tailwind CSS, SCSS
- **Testing**: Vitest, Cypress
- **Otras herramientas**: Git, Docker, Figma

## Proyectos destacados

- [Nombre del proyecto](enlace) - Descripción breve
- [Otro proyecto](enlace) - Descripción breve

## Encuéntrame

[![LinkedIn](badge)](tu-linkedin)
[![Portfolio](badge)](tu-portfolio)
```

No hace falta que sea elaboradísimo. Lo que importa es que esté completo, actualizado y refleje quien eres como desarrollador.

## Mantener el portfolio actualizado

Un portfolio no es un documento que haces una vez y olvidas. Las mejores estrategias:

- **Actualiza al menos cada 3 meses**: Añade proyectos nuevos, actualiza las tecnologías que usas
- **Documenta los proyectos mientras los haces**: Es mucho más fácil escribir el README cuando el proyecto está fresco en tu mente
- **Quita proyectos obsoletos**: Si un proyecto ya no representa tu nivel actual, retíralo
- **Pide feedback**: Comparte tu portfolio con otros desarrolladores y pide opinión honesta

## Conclusión

Un portfolio de frontend que impresiona no es el que tiene más proyectos ni el que usa las tecnologías más trendy. Es el que demuestra de forma clara y concisa que sabes construir cosas que funcionan, que escribes código que otros pueden entender, y que has pensado los problemas que has resuelto.

Tres proyectos bien ejecutados, con demos funcionales, READMEs claros y código limpio superarán siempre a diez proyectos mediocres. Invierte el tiempo que normalmente gastarías en quantity en quality, y los resultados en tus búsquedas de empleo serán notablemente mejores.
