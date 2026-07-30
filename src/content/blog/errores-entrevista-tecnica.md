---
title: "7 errores que te hacen suspender una entrevista técnica (y cómo evitarlos)"
description: "Los 7 errores más comunes que cometen los desarrolladores en entrevistas técnicas, con ejemplos reales y estrategias concretas para evitar cada uno de ellos."
pubDate: 2025-06-15
author: "Pablo Alcalde García"
tags: ["entrevistas", "errores", "consejos", "carrera", "programacion"]
draft: false
---

He visto entrevistas técnicas que deberían haber ido bien y no fueron bien. He visto candidatos con el conocimiento suficiente para el puesto salir sin oferta porque cometieron errores evitables. Y también los he cometido yo mismo en mi momento. En este artículo voy a ser directo sobre los 7 errores que más veces he visto arruinar una entrevista técnica, con ejemplos concretos y, lo más importante, cómo evitarlos.

La buena noticia: ninguno de estos errores tiene que ver con no saber programar. Son errores de comportamiento, comunicación y preparación. Se pueden corregir.

---

## Error 1: No pedir aclaraciones antes de empezar

**El escenario:** El entrevistador presenta el problema. El candidato asiente con la cabeza y empieza a escribir código de inmediato. Tres minutos después, el entrevistador dice: "Ah, debería haberlo mencionado, pero los inputs siempre serán enteros positivos." El candidato ha estado manejando casos de negativos y floats que no eran necesarios.

Este es el error más común y también el más costoso en términos de tiempo. Pedir aclaraciones antes de codificar no es signo de debilidad ni de no haber entendido el problema. Es exactamente lo que hace un desarrollador profesional en el trabajo real.

**Las preguntas de clarificación que siempre deberías hacer:**
- ¿Qué tipo de datos puede recibir la función/componente?
- ¿Puede el input estar vacío o ser null? ¿Qué debería devolver en ese caso?
- ¿Hay restricciones de rendimiento que deba tener en cuenta?
- ¿Puedo asumir que el input siempre será válido o debo validarlo?
- ¿Hay una complejidad temporal objetivo?

Estas preguntas tardan dos minutos y te ahorran construir en la dirección equivocada.

**Cómo evitarlo:** Antes de cualquier entrevista, practica el hábito de hacer al menos tres preguntas de clarificación antes de tocar el teclado. Hazlo en tus sesiones de práctica con LeetCode también, aunque sea mentalmente: "¿qué asumo aquí? ¿Qué debería preguntar si hubiera alguien enfrente?"

---

## Error 2: Silencio total durante el live coding

**El escenario:** El entrevistador presenta un problema. El candidato empieza a pensar... y piensa... y piensa en silencio durante 5 minutos completos. El entrevistador no sabe si el candidato está teniendo un insight brillante o si está completamente perdido.

El silencio total en un live coding es uno de los peores errores posibles. El propósito de la prueba es precisamente ver cómo piensas, no solo el resultado final. Si no verbalizas tu proceso, el entrevistador no tiene información para evaluarte.

Además, el silencio genera tensión para ambos. Los entrevistadores no disfrutan sentarse mirando a alguien que no dice nada. Una conversación fluida, aunque el candidato no llegue a la solución perfecta, hace la experiencia mucho más positiva para ambas partes.

**Cómo evitarlo:** Practica en voz alta en solitario. Resuelve problemas de práctica como si estuvieras explicándoselo a alguien. Algunas frases de andamio que puedes usar para empezar si no sabes cómo iniciar la verbalización:
- "Voy a empezar por entender el problema con un ejemplo concreto..."
- "Mi primera idea es usar X estructura de datos porque..."
- "Estoy pensando si debería usar un enfoque iterativo o recursivo aquí..."
- "Hay algo que no termina de encajar. Déjame pensar en voz alta un momento..."

---

## Error 3: Rendirse demasiado rápido o entrar en pánico visible

**El escenario:** El candidato se bloquea en un punto del problema. En lugar de usar estrategias para desatascarse, se queda paralizado, empieza a disculparse repetidamente ("perdona, es que no me acuerdo", "estoy muy nervioso", "en condiciones normales sabría esto"), o dice directamente "no sé cómo seguir" y se queda esperando.

Rendirse rápido o entrar en pánico visible es una señal de alarma importante para los entrevistadores. En el trabajo real, los desarrolladores se enfrentan constantemente a problemas que no saben resolver de inmediato. Lo que distingue a los buenos es que tienen metodología para desatascarse: dividen el problema, buscan patrones similares, prueban con ejemplos concretos, piden ayuda de forma articulada.

**Cómo evitarlo:**

Cuando te bloqueas, tienes varias estrategias:

- Vuelve a los ejemplos concretos. Traza el problema a mano con un input pequeño.
- Simplifica el problema. "¿Podría resolver primero el caso más sencillo posible?"
- Piensa en la fuerza bruta. "¿Cuál sería la solución más obvia aunque sea ineficiente?"
- Verbaliza el bloqueo. "Estoy dudando entre dos enfoques. El primero sería X, el segundo Y. Creo que X podría no funcionar porque... ¿me puedes dar una pista sobre si voy en buena dirección?"

Y sobre los nervios: son normales y los entrevistadores lo saben. Pero disculparse repetidamente no ayuda; al contrario, centra la atención en el nerviosismo. Respira, continúa, y si los nervios te afectan mucho, practifica más mock interviews para normalizarlos.

---

## Error 4: No testear la solución antes de declararla terminada

**El escenario:** El candidato escribe su solución, la mira un momento y dice "listo, creo que está bien". El entrevistador dice "¿puedes probarlo con el ejemplo que teníamos?". El candidato lo prueba y hay un bug obvio que habría encontrado en 30 segundos si hubiera trazado el código.

Declarar terminada una solución sin haberla testeado es exactamente lo que hacen los desarrolladores que crean bugs en producción. Ningún entrevistador quiere contratar a esa persona.

**Cómo evitarlo:** Antes de decir "terminado", ejecuta mentalmente (o en papel) tu código con:
- El ejemplo del enunciado
- Un caso borde: array vacío, string vacío, número negativo, el mínimo posible, el máximo posible
- Un caso que intuitivamente te parezca que podría fallar

Si la plataforma te permite ejecutar código, ejecútalo. No hay excusa para no hacerlo. Y mientras lo haces, comenta lo que estás comprobando: "Voy a verificar con el caso borde de array vacío... bien, devuelve 0 como esperábamos. Ahora con el ejemplo del enunciado..."

---

## Error 5: Código ilegible o desordenado

**El escenario:** El candidato resuelve el problema, pero el código está lleno de variables llamadas `x`, `temp`, `arr2`, `flag`, con funciones de 50 líneas sin estructura, sin comentarios donde serían útiles y con lógica de negocio mezclada con lógica de presentación.

Un código que funciona pero es ilegible es, en un entorno profesional, casi tan malo como un código que no funciona. El código se lee muchas más veces de las que se escribe. Los entrevistadores lo saben y evalúan la calidad del código, no solo la corrección.

**Cómo evitarlo:**

- Da nombres descriptivos a todas las variables: `leftPointer` en lugar de `i`, `currentSum` en lugar de `temp`, `isValid` en lugar de `flag`
- Extrae funciones cuando una sección del código hace algo independiente y con sentido propio
- Si usas un truco o una optimización no obvia, añade un comentario breve explicando por qué
- Mantén las funciones cortas. Si una función tiene más de 20-25 líneas, probablemente debería dividirse

En la práctica, el código de entrevista no tiene que ser production-ready, pero sí tiene que mostrar que sabes cómo sería ese código production-ready.

---

## Error 6: No conocer bien tus propios proyectos

**El escenario:** El entrevistador ve en el CV "Desarrollé una aplicación de gestión de tareas con React y Node.js" y pregunta: "¿Cómo manejaste la autenticación en ese proyecto?" El candidato tartamudea: "Pues... usé JWT... creo que con una librería... no recuerdo exactamente cómo lo configuré."

Esto es devastador. Si metes algo en tu CV, tienes que poder hablar de ello con profundidad. Tu proyecto personal es tuyo: fuiste tú quien tomó las decisiones técnicas, quien eligió las herramientas, quien resolvió los problemas. Si no puedes hablar de eso con claridad, genera una desconfianza enorme.

Las preguntas sobre proyectos propios que debes preparar:

- ¿Por qué elegiste esa tecnología concreta para este problema?
- ¿Qué fue lo más difícil de implementar?
- ¿Cómo manejas X (autenticación, estado, comunicación con la API)?
- ¿Qué cambiarías si lo hicieras de nuevo?
- ¿Cuáles son las limitaciones actuales del proyecto?

**Cómo evitarlo:** Antes de cualquier entrevista, repasa a fondo todos los proyectos que mencionas en tu CV. Lee tu propio código. Si hay partes que no recuerdas bien, reléelas hasta entenderlas. Si hay algo que implementaste copiando de un tutorial sin entenderlo del todo, o lo eliminas del CV o te lo estudias hasta poder explicarlo.

---

## Error 7: Mentir o inflar el CV

**El escenario:** El candidato pone "4 años de experiencia con React" cuando en realidad lo ha usado en 3 proyectos pequeños en el último año. O pone "experiencia con TypeScript" cuando lo único que ha hecho es instalar el transpilador en un proyecto. En la entrevista, cuando profundizan, las respuestas no encajan con el nivel declarado.

Este es el error más grave de la lista porque trasciende la incompetencia técnica: entra en el terreno de la deshonestidad. Y los entrevistadores con experiencia detectan las discrepancias rápidamente.

Además, aunque pases la entrevista mintiendo, el problema no desaparece: en el trabajo se va a notar que el nivel real no corresponde con el declarado, y eso puede llevar a un despido en el período de prueba o a trabajar bajo una presión enorme intentando compensar.

**Cómo evitarlo:** Sé honesto sobre tu nivel. "Tengo experiencia básica con TypeScript: he trabajado con tipado estático y genéricos básicos, pero no con las features más avanzadas" es una respuesta perfectamente aceptable que demuestra que conoces tus propios límites. "Conozco TypeScript" cuando no lo conoces bien, no lo es.

Las empresas contratan junior por una razón: entienden que habrá cosas que aprender. Sé honesto sobre dónde estás, muestra disposición para aprender, y deja que te evalúen por lo que realmente sabes.

---

## El patrón común detrás de estos errores

Si miras los 7 errores, todos tienen un denominador común: la falta de preparación y la gestión deficiente de la presión. Ninguno de ellos es un problema de inteligencia o de falta de conocimiento técnico. Son errores de comportamiento que se corrigen con práctica deliberada.

La solución es entrenar el proceso, no solo el conocimiento. Haz mock interviews. Practica en voz alta. Repasa tus proyectos antes de la entrevista. Aprende a hacer las preguntas correctas. Y cuando llegue la entrevista real, confía en la preparación que has hecho.

Los errores en entrevistas son inevitables, especialmente al principio. Lo importante es que cada vez que fallas una entrevista, identifiques exactamente qué falló y trabajes específicamente en eso antes de la siguiente. Así es como se mejora.
