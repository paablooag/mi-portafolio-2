---
title: "Prompt Engineering: la guía definitiva para desarrolladores"
description: "Aprende las técnicas más efectivas de prompt engineering para obtener mejores resultados de los LLMs en tus proyectos de desarrollo."
pubDate: 2025-03-12
author: "Pablo Alcalde García"
tags: ["prompt-engineering", "ia", "llm", "productividad"]
draft: false
---

El prompt engineering es hoy una habilidad tan valiosa para un desarrollador como saber escribir buenas consultas SQL o diseñar una API limpia. No es magia ni intuición: es una disciplina con técnicas concretas que marcan la diferencia entre una respuesta mediocre y una que te ahorra horas de trabajo.

## ¿Qué es el Prompt Engineering?

El prompt engineering es el arte y la ciencia de formular instrucciones para los modelos de lenguaje de forma que produzcan resultados útiles, precisos y coherentes. Un mal prompt puede darte una respuesta genérica o incorrecta. Un buen prompt puede ahorrarte horas de trabajo.

## Fundamentos: cómo piensan los LLMs

Antes de aprender técnicas, conviene entender cómo procesan los modelos tu entrada:

- **Los LLMs predicen tokens**, no "piensan". Generan la continuación más probable dado el contexto.
- **El contexto lo es todo**. Cuanto más contexto relevante des, mejor será la respuesta.
- **No tienen memoria** entre conversaciones (salvo que uses sistemas de memoria explícitos).
- **Son sensibles al formato**. La estructura de tu prompt influye en la estructura de la respuesta.

## Técnicas esenciales

### 1. Role Prompting

Asignar un rol específico al modelo mejora drásticamente la calidad de las respuestas especializadas.

**Sin rol:**
```
Revisa este código JavaScript y dime si hay problemas.
```

**Con rol:**
```
Eres un senior developer especializado en JavaScript con 10 años de experiencia.
Revisa este código como si fueras a hacer un code review en producción.
Identifica: bugs, problemas de rendimiento, malas prácticas y sugiere mejoras.
```

### 2. Few-Shot Prompting

Proporcionar 2-3 ejemplos del formato de entrada/salida esperado guía al modelo de forma muy efectiva.

```
Convierte estas descripciones de funciones a nombres en camelCase:

Input: "obtiene el usuario por id"
Output: getUserById

Input: "calcula el precio total con descuento"
Output: calculateTotalPriceWithDiscount

Input: "valida el formato del email"
Output:
```

### 3. Chain of Thought

Para problemas complejos, pedir al modelo que "piense paso a paso" mejora significativamente la precisión.

```
Analiza el siguiente bug y resuélvelo. Piensa paso a paso:
1. ¿Qué debería hacer el código?
2. ¿Qué está haciendo actualmente?
3. ¿Dónde está la discrepancia?
4. ¿Cuál es la solución?
```

### 4. Structured Output

Especificar el formato de salida exacto que necesitas evita tener que parsear texto libre.

```
Analiza este componente y devuelve un JSON con este formato exacto:
{
  "issues": [{"severity": "high|medium|low", "description": "...", "fix": "..."}],
  "overall_quality": "poor|fair|good|excellent"
}
```

### 5. Contextual Priming

Dar contexto sobre el proyecto antes de hacer preguntas específicas.

```
Contexto del proyecto:
- Framework: Nuxt 3 con TypeScript
- Estado: Pinia
- Testing: Vitest + Vue Test Utils
- Convención de nombres: kebab-case para archivos, PascalCase para componentes

Dado este contexto, crea un composable para gestionar la autenticación...
```

## Técnicas avanzadas

### Prompt Chaining

Divide tareas complejas en pasos encadenados donde la salida de uno es la entrada del siguiente:

1. "Analiza este código legado y lista todas las funciones"
2. "Para cada función, describe qué hace en una línea"
3. "Ahora refactoriza siguiendo principios SOLID"

### Self-Consistency

Para decisiones importantes, pide varias opciones y luego que el modelo las evalúe:

```
Genera 3 formas diferentes de implementar este sistema de caché.
Para cada opción: implementación, ventajas e inconvenientes.
Finalmente, recomienda la mejor para un proyecto con 10.000 usuarios concurrentes.
```

## Errores comunes a evitar

### Prompts demasiado vagos
❌ "Mejorar este código"
✅ "Refactoriza esta función para mejorar la legibilidad, reducir la complejidad ciclomática y añadir manejo de errores. Mantén la misma funcionalidad."

### No especificar restricciones
❌ "Escribe una función de ordenación"
✅ "Escribe una función de ordenación en TypeScript para arrays de objetos, sin librerías externas, con complejidad O(n log n) e inmutable (no muta el array original)"

### Pedir demasiado en un solo prompt
Divide las tareas grandes. Un prompt que pide "refactorizar toda la aplicación, añadir tests y documentación" dará resultados mediocres en todo.

## Plantillas que uso a diario

### Para code review
```
Actúa como un senior developer haciendo code review.
Analiza el siguiente código considerando:
- Correctitud (bugs, edge cases)
- Rendimiento (complejidad, operaciones costosas)
- Seguridad (inyecciones, exposición de datos)
- Mantenibilidad (legibilidad, acoplamiento)

Para cada problema: descripción, severidad (alta/media/baja) y solución concreta.
```

### Para debugging
```
Soy desarrollador trabajando en [framework/tecnología].
Tengo el siguiente error: [error message]
El código relevante es: [código]
Lo que espero que haga: [comportamiento esperado]
Lo que está haciendo: [comportamiento actual]

Analiza el problema y proporciona la solución paso a paso.
```

### Para generación de tests
```
Escribe tests unitarios con Vitest para la siguiente función.
Cubre: casos normales, casos edge, entradas inválidas y casos de error.
Sigue el patrón AAA (Arrange, Act, Assert) y usa nombres descriptivos.
```

## Midiendo la calidad de tus prompts

Un buen prompt debería:
1. **Ser reproducible**: dar resultados similares en múltiples ejecuciones
2. **Ser específico**: sin ambigüedad sobre qué se espera
3. **Incluir contexto relevante**: sin información innecesaria
4. **Especificar el formato de salida**: cuando el formato importa
5. **Tener un rol asignado**: para tareas especializadas

## Conclusión

El prompt engineering no es una habilidad misteriosa reservada para investigadores de IA. Es una habilidad práctica con retorno inmediato en productividad.

Empieza aplicando role prompting y few-shot prompting en tus tareas del día a día. Cuando domines esos, añade chain of thought para problemas complejos y structured output cuando necesites procesar los resultados programáticamente.

La clave está en la práctica iterativa: escribe un prompt, evalúa el resultado, mejora el prompt. Con el tiempo desarrollas intuición sobre qué funciona.
