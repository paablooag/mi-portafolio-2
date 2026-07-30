---
title: "Qué es un LLM y cómo funciona: guía para desarrolladores"
description: "Aprende qué es un Large Language Model, cómo se entrena con transformers y tokens, y cuándo usar cada tipo de modelo en tus proyectos."
pubDate: 2025-01-10
author: "Pablo Alcalde García"
tags: ["ia", "llm", "inteligencia-artificial", "machine-learning"]
draft: false
---

Si llevas algún tiempo en el mundo del desarrollo, seguramente ya has oído hablar de GPT, Claude, Gemini o Llama. Todos ellos son ejemplos de **Large Language Models (LLMs)**, o modelos de lenguaje a gran escala. Pero ¿qué hay detrás de esa etiqueta? ¿Cómo funciona realmente uno de estos modelos? En esta guía vamos a desmitificar los LLMs desde la perspectiva de un desarrollador.

## Qué es un LLM

Un LLM es un tipo de modelo de inteligencia artificial entrenado sobre enormes cantidades de texto con el objetivo de predecir y generar lenguaje natural. Dicho de forma más sencilla: dado un texto de entrada, el modelo es capaz de continuarlo de manera coherente, responder preguntas, resumir documentos, escribir código o traducir entre idiomas.

La palabra "large" (grande) hace referencia tanto al número de parámetros del modelo —que puede llegar a cientos de miles de millones— como al volumen de datos con el que fue entrenado —a menudo billones de tokens procedentes de libros, artículos, código fuente y páginas web.

### Diferencias con los modelos clásicos de NLP

Antes de la era de los LLMs, el procesamiento del lenguaje natural (NLP) se basaba en modelos especializados para cada tarea: un clasificador de sentimientos, un modelo de traducción, un sistema de reconocimiento de entidades. Cada uno requería su propio conjunto de datos etiquetados y su propio proceso de entrenamiento.

Los LLMs rompieron este esquema al ser modelos generalistas: con un único modelo preentrenado se pueden abordar cientos de tareas distintas simplemente cambiando el prompt.

## La arquitectura Transformer

El componente central de la mayoría de los LLMs modernos es la arquitectura **Transformer**, introducida en el artículo "Attention is All You Need" (Vaswani et al., 2017). Es fundamental entender sus piezas clave.

### Atención multi-cabeza (Multi-Head Attention)

El mecanismo de atención permite al modelo ponderar la importancia de cada token en relación con todos los demás. Imagina que el modelo está procesando la frase "El banco estaba lleno de peces": el mecanismo de atención ayuda al modelo a entender si "banco" se refiere a una orilla de un río o a una entidad financiera, fijándose en el contexto ("peces").

La versión multi-cabeza ejecuta este proceso varias veces en paralelo con diferentes proyecciones lineales, lo que permite capturar distintos tipos de relaciones semánticas y sintácticas al mismo tiempo.

### Codificador y decodificador

La arquitectura original del Transformer incluía un bloque codificador y un bloque decodificador. Sin embargo, los LLMs modernos suelen usar solo el decodificador (como GPT) o solo el codificador (como BERT), dependiendo de la tarea:

- **Solo decodificador (decoder-only):** ideal para generación de texto. El modelo predice el siguiente token autorregressivamente.
- **Solo codificador (encoder-only):** ideal para tareas de comprensión como clasificación o búsqueda semántica.
- **Codificador-decodificador:** habitual en tareas de traducción o resumen.

## Tokens y embeddings

Para entender cómo "lee" un LLM, hay que hablar de **tokens** y **embeddings**.

### Qué es un token

Un token no es exactamente una palabra. Es la unidad básica con la que trabaja el modelo. Dependiendo del tokenizador utilizado, un token puede ser una palabra completa, una sílaba, un carácter o incluso un fragmento de código. Por ejemplo, la palabra "desarrolladores" podría dividirse en varios tokens: "des", "arro", "lladores".

Esta fragmentación se hace mediante algoritmos como **Byte-Pair Encoding (BPE)** o **SentencePiece**, que construyen un vocabulario de subpalabras comunes a partir de los datos de entrenamiento.

En la práctica, una regla aproximada es que **1 token equivale a unas 4 letras en inglés**, o aproximadamente 0,75 palabras. En español o en código, la relación puede variar.

### Qué es un embedding

Cada token se convierte en un vector de números reales llamado **embedding**. Este vector representa el token en un espacio vectorial de alta dimensión, donde tokens semánticamente similares están cerca entre sí.

Los embeddings no son estáticos: en los Transformers modernos, el embedding de un token cambia en función del contexto en que aparece (gracias al mecanismo de atención). Esto se denomina embedding contextualizado.

## Cómo se entrena un LLM

El entrenamiento de un LLM ocurre en varias fases.

### Preentrenamiento

La primera fase es el **preentrenamiento** sobre un corpus masivo de texto. El objetivo es la predicción del siguiente token: dado el texto "La capital de Francia es", el modelo debe aprender a predecir "París".

Este proceso se realiza con millones de pasos de gradiente descendente, actualizando los pesos del modelo para minimizar el error de predicción. Requiere hardware especializado (clusters de GPUs o TPUs) y puede durar semanas o meses.

### Ajuste fino (Fine-tuning)

Tras el preentrenamiento, el modelo tiene conocimiento general del lenguaje pero no está optimizado para seguir instrucciones. Aquí entra el **ajuste fino supervisado (SFT)**: se entrena el modelo sobre pares de instrucciones y respuestas deseadas elaborados por humanos.

### RLHF

El paso más sofisticado es el **Reinforcement Learning from Human Feedback (RLHF)**. Humanos evaluadores puntúan distintas respuestas del modelo, y esas puntuaciones se usan para entrenar un modelo de recompensa. Luego, mediante aprendizaje por refuerzo (PPO, por ejemplo), el LLM se ajusta para maximizar esa recompensa, aprendiendo a generar respuestas que los humanos prefieren.

## Casos de uso prácticos para desarrolladores

Como desarrollador, los LLMs abren un abanico enorme de posibilidades:

### Asistentes de código

Herramientas como GitHub Copilot o Cursor utilizan LLMs para autocompletar código, refactorizar funciones o generar tests unitarios a partir de descripciones en lenguaje natural. Puedes integrar APIs de modelos directamente en tu editor o flujo de CI/CD.

### Extracción de información

Los LLMs pueden analizar documentos no estructurados (contratos, informes, correos electrónicos) y extraer campos específicos en formato JSON. Esto reemplaza pipelines complejos de NLP clásico con una simple llamada a la API.

### Generación de contenido

Desde descripciones de productos hasta traducciones automáticas o resúmenes de documentación técnica, los LLMs son extremadamente versátiles para la generación de texto.

### Agentes autónomos

Combinando un LLM con herramientas externas (búsqueda web, ejecución de código, acceso a bases de datos), se pueden construir agentes que planifican y ejecutan tareas complejas de forma autónoma.

## Diferencias entre los modelos principales

No todos los LLMs son iguales. A grandes rasgos:

| Modelo | Empresa | Fortaleza |
|--------|---------|-----------|
| GPT-4o | OpenAI | Versatilidad, visión, integración con plugins |
| Claude | Anthropic | Contexto largo, seguimiento de instrucciones, seguridad |
| Gemini | Google | Integración con ecosistema Google, multimodalidad |
| Llama | Meta | Open-source, ejecutable localmente |
| Mistral | Mistral AI | Eficiencia, modelos ligeros, open-source |

La elección depende de factores como el coste por token, el tamaño de la ventana de contexto, los requisitos de privacidad o si necesitas ejecutar el modelo localmente.

## Limitaciones a tener en cuenta

Los LLMs no son omniscientes. Como desarrollador, debes tener en cuenta:

- **Alucinaciones:** el modelo puede generar información falsa con total confianza. Valida siempre las respuestas críticas.
- **Corte de conocimiento:** el modelo solo conoce información hasta la fecha de su entrenamiento.
- **Ventana de contexto:** hay un límite en la cantidad de texto que el modelo puede procesar de una vez.
- **Coste:** las llamadas a la API tienen un coste por token que puede escalar rápidamente en aplicaciones de alto tráfico.

## Conclusión

Entender qué hay detrás de un LLM te ayuda a tomar mejores decisiones de diseño cuando construyes aplicaciones que los usan. No hace falta implementar uno desde cero para aprovecharlos, pero saber cómo funcionan los tokens, los embeddings y el mecanismo de atención te dará una ventaja a la hora de optimizar prompts, gestionar costes y depurar comportamientos inesperados.

En los próximos posts de esta serie exploraremos cómo integrar LLMs en aplicaciones reales, cómo usar Ollama para ejecutarlos localmente y cómo dominar el prompt engineering.
