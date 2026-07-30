---
title: "Live Coding: cómo demostrar lo mejor de ti en pruebas en vivo"
description: "Aprende qué evalúan realmente en un live coding, cómo estructurar tu solución, comunicar mientras programas y qué hacer cuando te bloqueas."
pubDate: 2025-03-28
author: "Pablo Alcalde García"
tags: ["entrevistas", "live-coding", "consejos", "programacion"]
draft: false
---

El live coding es la prueba que más ansiedad genera entre los desarrolladores que buscan empleo. La idea de programar con alguien mirando por encima del hombro —aunque sea en remoto— dispara todos los nervios. He estado en ambos lados de esta situación: como candidato, con esa sensación de que el cerebro se vacía en el peor momento posible, y también acompañando entrevistas como evaluador. En este artículo quiero compartir lo que sé desde las dos perspectivas.

La conclusión más importante que puedo darte de antemano: el live coding no trata de llegar a la solución perfecta en el tiempo mínimo. Trata de mostrar cómo piensas.

## Qué evalúan realmente los entrevistadores

Antes de hablar de técnicas, necesitas entender qué está mirando la persona que te está evaluando. Y te sorprendería saber que en la mayoría de empresas con buenos procesos de selección, la solución final importa menos de lo que crees.

Lo que sí importa:

**Cómo estructuras el problema.** ¿Lees el enunciado con calma? ¿Haces preguntas antes de escribir la primera línea? ¿Identificas los casos borde? Un candidato que se lanza a codificar sin entender bien el problema genera preocupación, porque así es exactamente como trabajan los desarrolladores que crean bugs en producción.

**Cómo comunicas tu razonamiento.** Si piensas en silencio, el entrevistador no sabe si estás llegando a algo brillante o si te has perdido totalmente. La comunicación continua es lo que transforma una prueba de código en una conversación entre profesionales.

**Cómo reaccionas ante los obstáculos.** Todo el mundo se bloquea. La diferencia entre un buen y un mal candidato no es quién nunca se bloquea, sino quién tiene estrategias para desatascarse y mantiene la compostura mientras lo hace.

**La calidad del código.** Nombres de variables descriptivos, funciones con responsabilidades claras, código legible. No tienes que escribir código de producción perfecto bajo presión, pero sí debes mostrar que sabes cómo sería ese código.

## Antes de escribir una sola línea: la fase de entendimiento

Este paso lo salta el 70% de los candidatos y es el más importante. Cuando te den el problema, no empieces a teclear. Primero:

**Lee el enunciado completo en silencio.** No lo leas en voz alta precipitadamente. Lee con calma y entiende qué te están pidiendo.

**Haz preguntas de clarificación.** Por ejemplo:
- ¿Qué tipo de datos puede recibir la función? ¿Solo enteros o también floats?
- ¿Puede el array estar vacío? ¿Qué debería devolver en ese caso?
- ¿Hay restricciones de rendimiento que deba tener en cuenta?
- ¿Los strings pueden tener caracteres especiales?

Estas preguntas demuestran que piensas en los bordes del problema, que es exactamente lo que hace un buen desarrollador.

**Verbaliza tu comprensión.** Antes de codificar, di en voz alta: "Entonces, lo que necesito hacer es recibir un array de enteros y devolver el par de números que sumados den el target. ¿Es así?" Esto te confirma que has entendido bien y muestra al entrevistador que tienes el problema claro.

**Escribe un par de ejemplos a mano.** Si la plataforma lo permite, escribe en comentarios un par de casos de entrada/salida. Esto te ayuda a entender el problema y al entrevistador a seguir tu razonamiento.

## La estructura de la solución: de fuerza bruta a optimizada

Un patrón que funciona muy bien es el siguiente:

**Paso 1: Solución de fuerza bruta.** Explica la solución más obvia aunque sea ineficiente. "La solución naíve sería dos bucles anidados, con complejidad O(n²). ¿Quieres que empiece por aquí o voy directamente a la solución optimizada?"

Este gesto muestra que conoces la complejidad algorítmica y que sabes que hay alternativas. También te da tiempo para pensar en la solución mejor mientras codificas la sencilla.

**Paso 2: Optimización.** Una vez que tienes algo que funciona, piensa en cómo mejorarlo. Usa estructuras de datos más eficientes: un HashMap/Set suele reducir O(n²) a O(n).

**Paso 3: Casos borde.** Antes de declarar que has terminado, piensa en casos especiales: array vacío, un solo elemento, todos iguales, números negativos, overflow de enteros.

## Cómo comunicar mientras programas

Hablar mientras programas parece antinatural al principio. La práctica soluciona esto. Aquí tienes algunas frases que puedes usar como guía:

- "Voy a usar un HashMap aquí porque necesito acceso en O(1)..."
- "Este bucle recorre el array una vez, así que la complejidad es O(n)..."
- "Hmm, aquí tengo que tener cuidado con el caso en que el array esté vacío..."
- "Voy a nombrar esta variable `complemento` para que quede claro qué representa..."
- "Déjame probar con el ejemplo que escribí antes para ver si mi lógica es correcta..."

No tienes que comentar cada línea. Habla en los puntos de decisión: cuando eliges una estructura de datos, cuando identificas un caso borde, cuando pasas de una parte del problema a otra.

## Qué hacer cuando te bloqueas

Pasa. Pasa a los mejores. La clave es cómo lo gestionas.

**No entres en pánico silencioso.** Si llevas más de 30 segundos en silencio mirando la pantalla, está pasando algo malo. Habla.

**Verbaliza el bloqueo.** "Hmm, en este punto no estoy seguro de cuál es la mejor estructura de datos. Estoy pensando entre un Set y un Map..." A veces, el simple hecho de verbalizarlo te desbloquea.

**Pide una pista.** No es vergonzoso. Di: "Creo que estoy atacando esto desde un ángulo incorrecto. ¿Puedes darme una pista o confirmar si voy por buen camino?" Un buen entrevistador te ayudará. Y pedir ayuda de forma articulada es en sí mismo una habilidad valorada.

**Vuelve a los ejemplos.** Si te pierdes en la abstracción, vuelve al caso concreto. Traza el código a mano con el ejemplo que escribiste al principio. Muchas veces esto relanza el pensamiento.

**Pregunta si puedes cambiar de enfoque.** "Creo que el camino que estoy tomando no está funcionando. ¿Te parece bien si lo intento de otra manera?"

## Herramientas y plataformas habituales

Es importante que te familiarices con las plataformas antes del día de la entrevista. Las más habituales son:

**CoderPad:** Muy popular en entrevistas técnicas. Editor en el navegador con ejecución de código en tiempo real. Soporta múltiples lenguajes.

**HackerRank:** Usado por muchas empresas grandes. Tiene su propio sistema de evaluación con casos de test automáticos.

**CodeSandbox / StackBlitz:** Para pruebas más orientadas a frontend donde te piden construir un componente o una pequeña aplicación.

**LeetCode (modo entrevista):** Algunas empresas hacen el live coding directamente en LeetCode usando problemas de la plataforma.

**Google Docs o un simple editor de texto compartido:** Las empresas más pequeñas a veces prefieren esto, precisamente para evaluar cómo escribes código sin ayuda del IDE.

La recomendación práctica es que practiques sin autocompletado ni linter. Muchas plataformas no lo tienen, y que te bloquees por no recordar un método de Array es un detalle que puedes evitar.

## Cómo practicar de forma efectiva

La práctica del live coding tiene que ser lo más parecida a la realidad posible.

**Practica en voz alta, solo.** Sé que suena raro, pero es la forma más efectiva de automatizar el hábito de comunicar mientras programas. Resuelve un problema de LeetCode en voz alta como si le estuvieras explicando a alguien.

**Usa Pramp o Interviewing.io.** Estas plataformas emparejan candidatos para hacer mock interviews entre sí. Hacer de entrevistador también enseña mucho: ves los errores que cometen otros y los internalizas.

**Grábate.** Doloroso pero revelador. Grabar tu pantalla y audio mientras resuelves un problema te muestra cuánto tiempo pasas en silencio, si tus explicaciones tienen sentido y cómo gestionas los bloqueos.

**Haz sprints de práctica.** En lugar de hacer un problema al día de forma pasiva, dedica 45 minutos seguidos a un problema con el temporizador puesto, como si fuera la entrevista real. El tiempo limitado cambia la dinámica por completo.

## El día de la entrevista: detalles que importan

- Asegúrate de tener buena conexión a internet y que tu micro funciona bien
- Ten agua a mano. Hablar mucho da sed
- Cierra todas las pestañas que no necesitas y silencia las notificaciones
- Si es en tu editor local, configura un perfil limpio sin extensiones que puedan distraer
- Llega (o conéctate) 5 minutos antes para resolver problemas técnicos de último momento

## Conclusión

El live coding es una habilidad que se entrena, igual que el código en sí. La diferencia entre un candidato que lo hace bien y uno que no, raramente es la inteligencia o el conocimiento: es la práctica deliberada y la mentalidad correcta.

Recuerda: el entrevistador no quiere que falles. Quiere que lo hagas bien, porque eso significa que ha encontrado a alguien que puede trabajar en su equipo. Trátalo como una colaboración, comunica constantemente, y cuando te bloquees, respira y pide ayuda.

Cada entrevista de live coding que haces, aunque no salga perfecta, te prepara mejor para la siguiente.
