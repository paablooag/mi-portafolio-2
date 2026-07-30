---
title: "Cómo preparar una entrevista técnica de programación y no morir en el intento"
description: "Guía completa para preparar entrevistas técnicas: tipos de pruebas, recursos, plan de estudio de 2 semanas y la mentalidad correcta para superarlas."
pubDate: 2025-02-14
author: "Pablo Alcalde García"
tags: ["entrevistas", "carrera", "programacion", "consejos", "trabajo"]
draft: false
---

Las entrevistas técnicas tienen fama de ser una de las experiencias más estresantes en la carrera de un desarrollador. Y con razón: te piden que demuestres en 45 minutos lo que llevas años aprendiendo, con alguien observándote, mientras intentas no olvidar cómo funciona un bucle `for`. He pasado por decenas de estas entrevistas, tanto como candidato como ayudando a preparar a otros, y en este post quiero compartir todo lo que sé para que llegues con confianza y preparación real.

## Los tipos de entrevistas técnicas que existen

No todas las entrevistas técnicas son iguales. Antes de prepararte, necesitas saber qué te espera exactamente. Según la empresa y el puesto, el proceso puede incluir una o varias de estas fases:

### Screening técnico inicial

Generalmente es una llamada corta de 30-45 minutos con un recruiter técnico o un ingeniero junior. El objetivo es verificar que tienes el nivel básico que dice tu CV. Suelen hacerte preguntas conceptuales sobre el stack con el que trabajas, tal vez un pequeño problema de código o te piden que expliques un proyecto tuyo.

No suele ser eliminatorio por sí solo si lo haces bien, pero suspenderlo sí que cierra la puerta. La clave aquí es tener claros los conceptos fundamentales y poder hablar con fluidez de tus proyectos anteriores.

### Live Coding

La prueba que más pánico genera. Un ingeniero comparte pantalla contigo y tienes que resolver un problema de código en tiempo real. Puede ser en una plataforma como CoderPad o directamente en un editor compartido.

Lo que evalúan no es tanto si llegas a la solución perfecta en el tiempo mínimo, sino cómo piensas, cómo comunicas tu razonamiento y cómo estructuras tu código. Habla mientras programas. Explica qué estás pensando. Si no sabes algo, dilo y razona en voz alta.

### Take-Home (prueba para llevar a casa)

Te dan un enunciado y un plazo (normalmente entre 3 y 7 días) para entregar un proyecto o resolución. Tiene menos presión que el live coding, pero el listón de calidad sube considerablemente: se espera código limpio, documentado, con tests si aplica y estructura profesional.

El error más común es no leer bien el enunciado y entregar algo que no cumple los requisitos. Lee dos veces, pregunta lo que no entiendas, y entrega antes del plazo con tiempo para revisar.

### System Design

Más frecuente en entrevistas de posiciones mid y senior. Te piden que diseñes la arquitectura de un sistema a alto nivel: "Diseña Twitter", "Cómo harías el backend de un sistema de reservas", etc.

Aquí evalúan tu capacidad para pensar en escalabilidad, bases de datos, APIs, cachés, colas de mensajes y compensaciones entre distintas aproximaciones. Si vas a posiciones junior, probablemente no te la pongan, pero vale la pena entender los conceptos básicos.

## Cómo prepararse para cada tipo

### Para el screening

- Repasa los fundamentos de tu stack principal (si eres frontend con React, repasa hooks, virtual DOM, gestión de estado)
- Prepara una historia clara de cada proyecto en tu CV: qué hacía, qué tecnologías usabas, cuál fue tu contribución y cuál fue el resultado
- Practica hablar de ti mismo en voz alta. Suena raro pero marca una diferencia enorme

### Para el live coding

- Practica en plataformas como LeetCode, HackerRank o Codewars al menos 3-4 veces por semana durante las semanas previas
- Empieza con nivel easy/medio y no saltes a hard hasta que los medios te resulten cómodos
- Practica en voz alta, solo en casa. Es incómodo pero es la forma de automatizar el hábito de comunicar mientras programas

### Para el take-home

- Crea una estructura de proyecto limpia desde el principio
- Escribe un README completo que explique cómo ejecutar el proyecto, qué decisiones tomaste y por qué
- Incluye al menos tests básicos aunque no te los pidan explícitamente. Muestra que escribes código de producción

### Para el system design

- Estudia los patrones más comunes: bases de datos SQL vs NoSQL, caché con Redis, CDN, load balancers, colas de mensajes
- Practica con recursos como "System Design Primer" en GitHub (es gratuito y excelente)
- Aprende a hacer preguntas antes de diseñar: "¿Cuántos usuarios esperamos?", "¿Qué SLA necesitamos?", "¿Hay restricciones de presupuesto?"

## Recursos que realmente funcionan

**Para algoritmos y estructuras de datos:**
- LeetCode: el estándar de la industria. La sección "Top Interview Questions" es un buen punto de partida
- NeetCode.io: organiza los problemas de LeetCode por patrones y tiene vídeos explicativos. Muy recomendable
- Codewars: más gamificado y divertido, bueno para practicar regularmente sin quemarse

**Para system design:**
- "System Design Interview" de Alex Xu (libro, muy completo)
- Canal de YouTube de ByteByteGo (del mismo autor)
- GitHub: "system-design-primer"

**Para conceptos teóricos:**
- MDN Web Docs para todo lo relacionado con web
- "JavaScript: The Good Parts" para bases sólidas de JS
- La documentación oficial de los frameworks que uses

## Plan de estudio para las 2 semanas previas

Si tienes una entrevista en dos semanas, aquí tienes un plan realista:

**Semana 1:**
- Días 1-2: Repasa arrays, strings y hash maps en LeetCode (problemas easy)
- Días 3-4: Repasa conceptos teóricos de tu stack (closures, async, etc.)
- Días 5-7: 2-3 problemas de nivel medio al día + repaso de proyectos del CV

**Semana 2:**
- Días 8-9: Practica un mock interview completo (usa Pramp.com que empareja candidatos entre sí)
- Días 10-11: Repasa los conceptos que veas que se te escapan en los mocks
- Días 12-13: Descansa de algoritmos y enfócate en la empresa: investiga qué construyen, qué stack usan, qué problemas resuelven
- Día 14 (día anterior): Descansa. Duerme bien. No intentes aprender nada nuevo la noche antes

## La mentalidad correcta: lo más infravaluado

Todo lo anterior es técnica. Pero hay algo más importante que la técnica, que es la mentalidad con la que entras a la entrevista.

**Trátala como una conversación, no como un examen.** La entrevista no es un interrogatorio donde te juzgan: es una conversación entre profesionales para ver si podéis trabajar juntos. El entrevistador también quiere que te vaya bien; si te va bien a ti, le va bien a él.

**El silencio es tu enemigo.** Cuando no sabes algo, di lo que sabes. Si no conoces la respuesta exacta a una pregunta, razona en voz alta: "No recuerdo el nombre exacto, pero sé que esto funciona de esta manera porque...". Demuestra cómo piensas, no solo qué sabes.

**No finjas lo que no sabes.** Si no sabes algo, dilo con naturalidad. Los entrevistadores con experiencia detectan inmediatamente cuando alguien intenta blufear, y eso destruye la confianza mucho más que admitir una laguna de conocimiento.

**Una entrevista rechazada no es el fin del mundo.** He fallado entrevistas en empresas que quería mucho. Las usé como aprendizaje: identifiqué qué me fallaba, lo trabajé, y volví a intentarlo. Muchas empresas te dejan volver a intentarlo en 6-12 meses.

**Tú también estás evaluando a la empresa.** Prepara preguntas para el entrevistador: sobre el equipo, las tecnologías, los retos actuales, la cultura. Esto muestra interés real y te da información valiosa para decidir si aceptarías una oferta.

## Conclusión

Preparar una entrevista técnica es un proceso que lleva tiempo y práctica consistente. No existe el atajo perfecto, pero sí existen estrategias que maximizan tus posibilidades: conocer el formato, practicar de forma dirigida, usar los recursos correctos y entrar con la mentalidad adecuada.

La buena noticia es que cada entrevista que haces, te hace mejor candidato para la siguiente. El proceso de preparación en sí mismo te hace mejor desarrollador. Así que aunque no consigas el puesto que querías, nunca es tiempo perdido.

Empieza hoy. Abre LeetCode, resuelve un problema easy, y ve construyendo el hábito. En dos semanas notarás la diferencia.
