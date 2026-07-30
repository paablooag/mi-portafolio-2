---
title: "Cómo usar GitHub para conseguir trabajo como desarrollador"
description: "Guía práctica para optimizar tu perfil de GitHub, hacer brillar tus repositorios, contribuir a open source y usar la plataforma como herramienta de búsqueda de empleo."
pubDate: 2025-05-20
author: "Pablo Alcalde García"
tags: ["github", "portfolio", "carrera", "empleo", "open-source"]
draft: false
---

Tu perfil de GitHub es, probablemente, el documento más importante de tu búsqueda de empleo como desarrollador. Más que el CV en muchos casos, porque el CV dice lo que sabes hacer, pero GitHub muestra lo que realmente haces. Un reclutador técnico o un ingeniero senior que revisa tu perfil puede ver tu nivel de código en minutos, y esa primera impresión importa muchísimo.

He revisado cientos de perfiles de GitHub de candidatos a lo largo de mi carrera, y la diferencia entre los que funcionan y los que no suele reducirse a los mismos factores. En este artículo voy a mostrarte exactamente cómo optimizar cada parte de tu presencia en GitHub para maximizar tus opciones en la búsqueda de empleo.

## El GitHub Profile README: tu tarjeta de presentación técnica

Desde 2020, GitHub permite crear un README especial que aparece en tu página de perfil. Para activarlo, crea un repositorio con el mismo nombre que tu usuario de GitHub y añade un `README.md`. Este será lo primero que vea cualquiera que visite tu perfil.

Un buen Profile README no es una lista de tecnologías con emojis. Eso lo hace todo el mundo y no dice nada relevante. Un buen Profile README comunica:

**Quién eres y en qué te especializas.** No solo "desarrollador frontend" sino algo con más carácter: "Construyo interfaces de usuario con Vue y Nuxt, con especial interés en rendimiento web y accesibilidad."

**En qué estás trabajando ahora.** Un proyecto personal en curso, algo que estás aprendiendo, una contribución open source. Esto muestra que eres activo y que tienes motivación intrínseca.

**Cómo contactar contigo.** Email, LinkedIn, portfolio personal. Ponlo claro y accesible.

**Algunos números que contextualicen tu experiencia.** No tienes que inflar nada: si tienes 3 años de experiencia en frontend, dilo. Si has contribuido a proyectos open source conocidos, menciónalo.

Lo que debes evitar: las barras de "habilidades" con porcentajes (¿qué significa que sabes JavaScript al 90%?), los widgets de estadísticas que muestran líneas de código de color verde (impresionan a nadie con conocimiento real), y las listas interminables de logos de tecnologías.

---

## Cómo hacer que tus repositorios brillen

Tus repositorios son el cuerpo principal de tu portfolio. Cada repositorio público que tengas es una señal, y las señales se acumulan. Aquí están los factores que marcan la diferencia:

### El README de cada proyecto

Ya lo mencioné en el artículo sobre proyectos personales, pero vale la pena repetirlo aquí: un README sin información es una oportunidad perdida. Cada proyecto que quieras destacar debe tener un README que explique qué hace, por qué existe, cómo ejecutarlo y qué tecnologías usa.

Añade capturas de pantalla o GIFs del proyecto en funcionamiento. Una imagen vale mucho más que párrafos describiendo la interfaz. Si el proyecto está desplegado, pon el enlace en la sección "About" del repositorio (la columna derecha en GitHub).

### Commits limpios y mensajes descriptivos

El historial de commits de un proyecto dice mucho sobre cómo trabajas. Los commits con mensajes del tipo "fix", "update", "changes", "asd" o "prueba" comunican descuido. Los commits con mensajes del tipo "add JWT authentication middleware for protected routes" o "refactor user store to use Pinia composition API" comunican profesionalidad.

Adopta una convención de commits. La más popular en proyectos modernos es Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`. No es obligatorio, pero sí muy valorado.

### Organización del código

Un repositorio con todos los archivos en la raíz sin estructura es una señal de alarma. Una estructura de carpetas clara y coherente (por ejemplo, `src/components`, `src/views`, `src/composables`, `src/stores` para un proyecto Vue) indica que piensas en la organización desde el principio.

### Ramas y flujo de trabajo

Si usas ramas para features y las mergeas con PRs a main (aunque trabajes solo), demuestra que sabes trabajar en equipo porque usas el flujo de trabajo de equipos reales. Si tienes un único branch `main` con commits directos, es menos interesante.

---

## Pinned Repositories: elige con estrategia

GitHub te permite fijar hasta 6 repositorios que aparecerán destacados en tu perfil. Esta es una de las decisiones más importantes de tu presencia en GitHub.

No dejes los repos fijados por defecto (que suelen ser los más recientes o los con más estrellas). Elige estratégicamente:

- **1-2 proyectos estrella:** Los más completos, mejor documentados, que mejor demuestren tus habilidades principales
- **1 proyecto que muestre diversidad técnica:** Si tu stack principal es Vue pero también sabes Node o tienes experiencia con bases de datos, un proyecto que lo demuestre
- **Contribuciones a open source:** Si tienes forks de proyectos conocidos donde hayas contribuido, fíjalos. Dicen mucho
- **Un proyecto en construcción activa:** Muestra que sigues construyendo cosas, que eres activo

Para cada repo fijado, rellena siempre la descripción y los topics (etiquetas de tecnologías). Esto hace que el perfil sea más legible de un vistazo.

---

## GitHub Pages para demos en vivo

GitHub Pages te permite desplegar sitios estáticos gratuitamente directamente desde un repositorio. Para proyectos de frontend puro (HTML, CSS, JS vanilla, o apps Vue/React construidas como estáticas), es la forma más sencilla de tener una demo en vivo.

Ir un paso más allá: usa GitHub Actions para desplegar automáticamente cuando haces push a main. Un workflow de CI/CD aunque sea básico en un proyecto personal demuestra que conoces estas prácticas.

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci && npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

Esto muestra conocimientos de automatización que muchos candidatos junior no tienen.

---

## Contribuir a Open Source: el multiplicador de credibilidad

Contribuir a proyectos open source es, en mi opinión, el mayor diferenciador que puede tener un perfil de GitHub. Muestra varias cosas a la vez: que puedes leer y entender código de otros, que sabes comunicarte en entornos de desarrollo abiertos, y que contribuyes a la comunidad.

### Cómo empezar a contribuir

**Empieza pequeño.** No tienes que añadir features complejas en tu primera contribución. Corregir un typo en la documentación, mejorar un README, añadir un test para un caso que no estaba cubierto, traducir documentación. Todas estas son contribuciones válidas y bienvenidas.

**Usa los labels de GitHub.** Los repositorios activos suelen etiquetar issues con `good first issue` o `help wanted` para señalar dónde los nuevos contribuidores son bienvenidos. Filtra por estos labels para encontrar por dónde empezar.

**Contribuye a herramientas que usas.** Si encuentras un bug en una librería que usas en tus proyectos, repórtalo con un caso de reproducción completo. Si sabes solucionarlo, abre una PR. Es mucho más fácil contribuir a algo que conoces que a algo completamente nuevo.

**Proyectos menores primero.** Los proyectos masivos como Vue, React o Linux tienen procesos de contribución complejos. Empieza con proyectos medianos que tengan comunidad activa pero menos burocracia.

---

## Los "green squares" y por qué importan (y por qué no debes obsesionarte)

El calendario de contribuciones de GitHub, esa cuadrícula de cuadrados verdes que muestra tu actividad diaria, es uno de los primeros elementos visuales que ve cualquiera que visita tu perfil.

La verdad sobre los green squares:

**Sí importan parcialmente.** Un perfil con actividad regular comunica que estás activo, que sigues construyendo cosas y que el código no es solo algo que haces en el trabajo. Una cadena de actividad constante durante meses tiene un impacto visual positivo innegable.

**No, no importan tanto como crees.** Los reclutadores técnicos con experiencia saben que los green squares se pueden "inflar" con commits triviales. Lo que importa es la calidad de los repositorios, no la cantidad de cuadrados verdes.

**El error de la obsesión:** He visto candidatos que hacen commits vacíos o cambios de una línea todos los días solo para mantener la racha. Esto no engaña a nadie con experiencia y no mejora tu perfil realmente.

Mi recomendación: trabaja en tus proyectos de forma natural y consistente. Si construyes proyectos reales con regularidad, los green squares vendrán solos.

---

## Otros detalles del perfil que marcan la diferencia

**Foto de perfil real:** No uses el avatar generado por GitHub. Una foto tuya (no tiene que ser formal, solo auténtica) hace el perfil más humano y cercano.

**Nombre completo y localización:** Facilita que los reclutadores te encuentren. Si buscas trabajo en una ciudad concreta, ponlo. Si estás abierto a remoto, ponlo también.

**Bio concisa:** No más de dos o tres líneas. Stack principal, rol buscado, algo personal si quieres.

**Links externos:** Tu portfolio personal, LinkedIn, y si tienes un blog técnico, el enlace al blog. Todo lo que ayude a la persona que te está revisando a conocerte mejor.

**Organizaciones:** Si perteneces a organizaciones en GitHub (grupos de meetups, proyectos de comunidad, etc.), se ven en tu perfil y dan contexto sobre tu participación en la comunidad.

---

## La estrategia completa: de perfil pasivo a perfil activo

Un GitHub que trabaja para ti en la búsqueda de empleo no es uno que simplemente existe, sino uno que activamente comunica tu nivel y motivación. La estrategia completa es:

1. Profile README optimizado y actualizado
2. 3-4 repositorios fijados con proyectos sólidos y bien documentados
3. Actividad regular y visible (no artificial)
4. Al menos una contribución a un proyecto open source
5. GitHub Pages para demos en vivo de tus proyectos principales
6. CI/CD básico en al menos uno de tus proyectos
7. Commits con mensajes descriptivos y buena estructura de ramas

No tienes que implementar todo esto de golpe. Empieza por el README del perfil y por limpiar/documentar tu mejor proyecto. Luego ve construyendo el resto de forma gradual.

---

## Conclusión

GitHub no es solo un sistema de control de versiones: es la red social de los desarrolladores y, hoy en día, una plataforma de empleo tan importante como LinkedIn para perfiles técnicos. Trátalo como tal: con cuidado, con estrategia, y con la misma energía que dedicarías a tu CV.

La diferencia entre un perfil de GitHub que abre puertas y uno que las cierra está en los detalles, y esos detalles están completamente en tus manos.
