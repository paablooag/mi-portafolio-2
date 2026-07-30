---
title: "Los mejores prompts para programar en 2025: colección probada"
description: "Colección de prompts probados para debugging, refactoring, tests, documentación, code review y migración de código. Con consejos para mejorar los resultados."
pubDate: 2025-07-20
author: "Pablo Alcalde García"
tags: ["ia", "prompt-engineering", "productividad", "programacion", "llm"]
draft: false
---

Llevar más de un año usando LLMs para programar a diario me ha dado algo muy valioso: una colección de prompts que realmente funcionan. No los que suenan bien en Twitter, sino los que uso en el trabajo real cuando tengo un bug que no entiendo, un componente que refactorizar, o tests que generar. Esta es esa colección.

Antes de entrar en los prompts, hay un principio que lo une todo: **la calidad del output de la IA es directamente proporcional a la calidad y especificidad del input que le das**. Un prompt vago produce código genérico. Un prompt específico, con contexto y restricciones claras, produce código que realmente funciona en tu proyecto.

## Prompts para debugging

### El bug que no entiendes

Cuando tienes un error y no sabes de dónde viene:

```
Tengo el siguiente error en [lenguaje/framework]:

ERROR: [copia exacta del error y stack trace]

Contexto:
- Este error ocurre cuando [describe el flujo de usuario o la operación]
- Apareció por primera vez después de [qué cambiaste]
- El entorno es [producción/desarrollo/CI]

Aquí está el código relevante:
[código]

Analiza el error y explica:
1. Cuál es la causa raíz más probable
2. Por qué ocurre en este punto específico
3. Cómo solucionarlo
4. Cómo evitar este tipo de error en el futuro
```

### El bug intermitente

Los más frustrantes. Para bugs que no siempre reproducen:

```
Tengo un bug intermitente. No siempre ocurre, lo que sugiere una condición de carrera,
un problema de timing, o un estado que no se limpia correctamente.

Síntomas:
[describe cuándo ocurre, frecuencia, qué lo desencadena]

Código involucrado:
[código]

Analiza las posibles causas de bugs intermitentes en este código:
- Condiciones de carrera
- Estado mutable compartido
- Efectos secundarios no controlados
- Timing de operaciones asíncronas
- Variables no inicializadas

Para cada causa posible, indica cómo verificarla y cómo solucionarla.
```

### Debug con logging estratégico

```
Necesito entender el flujo de ejecución de la siguiente función.
Añade console.log (o logging del framework [nombre]) en los puntos estratégicos
para que pueda trazar exactamente qué valores tiene cada variable y en qué orden
se ejecuta el código. Los logs deben ser descriptivos, no solo "aquí".

[código]
```

## Prompts para refactoring

### Refactoring de función compleja

```
La siguiente función en [lenguaje] hace demasiadas cosas y es difícil de mantener.
Refactorizala aplicando el principio de responsabilidad única.

Restricciones:
- Mantén la misma API pública (no cambies el nombre ni los parámetros de la función principal)
- El comportamiento debe ser idéntico
- Usa el mismo estilo de código del resto del archivo
- Nombra las funciones auxiliares de forma que su propósito sea obvio
- Si extraes funciones, explica brevemente qué hace cada una

[código]
```

### Eliminar código duplicado

```
En el siguiente archivo/módulo hay código que se repite con pequeñas variaciones.
Identifica los patrones repetidos y extrae una abstracción reutilizable.

Considera:
- Si las variaciones son datos, extrae una función con parámetros
- Si las variaciones son comportamiento, considera callbacks o estrategia pattern
- Si hay 2 o menos repeticiones, puede no valer la pena abstraer

[código]
```

### Modernizar código legacy

```
El siguiente código está escrito en [ES5/jQuery/estilo antiguo].
Modernízalo a [ES2022/TypeScript/estilo moderno] manteniendo el mismo comportamiento.

Cambios específicos que quiero:
- var → const/let
- callbacks → async/await
- función tradicional → arrow functions donde sea apropiado
- Object.assign → spread operator
- for loops → métodos de array (map, filter, reduce)

NO cambies la API pública del módulo.

[código]
```

## Prompts para generación de tests

### Tests unitarios completos

```
Escribe tests unitarios exhaustivos para la siguiente función usando [Vitest/Jest].

La función hace: [descripción breve de qué hace]

Quiero que cubras:
1. El happy path con datos típicos
2. Valores límite (0, -1, arrays vacíos, strings vacíos)
3. Valores null y undefined para cada parámetro
4. Casos de error que deben lanzar excepciones
5. [cualquier caso específico del dominio que sea relevante]

Usa describe para agrupar los tests y nombres descriptivos en el formato:
"debería [resultado esperado] cuando [condición]"

No uses snapshots.

[código]
```

### Tests para componentes UI

```
Escribe tests para el siguiente componente de [Vue/React] usando 
[Vitest + Testing Library].

Quiero tests que verifiquen:
1. Que el componente se renderiza sin errores con las props mínimas
2. Que muestra el contenido correcto según las props
3. Que responde a interacciones del usuario (clicks, inputs)
4. Que emite los eventos correctos con los datos correctos
5. Los estados de loading y error si existen
6. Accesibilidad básica

Usa queries semánticas (getByRole, getByLabelText, getByText) en lugar de 
getByTestId salvo que sea imprescindible.

[código del componente]
```

### Mocks y stubs

```
Necesito mockear las siguientes dependencias para los tests de [módulo]:

Dependencias a mockear:
- [dependencia 1]: necesito que [comportamiento esperado en tests]
- [dependencia 2]: necesito que [comportamiento esperado en tests]

Framework: [Vitest/Jest]

Genera:
1. Los mocks necesarios con vi.mock() o jest.mock()
2. Los fixtures de datos de prueba realistas
3. Un test de ejemplo que usa los mocks correctamente
```

## Prompts para documentación

### JSDoc o docstrings automáticos

```
Genera documentación JSDoc para todas las funciones exportadas del siguiente archivo.

Para cada función incluye:
- Descripción de una o dos frases de qué hace (no cómo lo hace)
- @param para cada parámetro con tipo y descripción
- @returns con el tipo y descripción del valor de retorno
- @throws si la función puede lanzar excepciones
- @example con un ejemplo de uso real

Si alguna función es obvia y no necesita documentación, indícalo en un comentario.

[código]
```

### README de módulo

```
Genera un README.md para el siguiente módulo/librería.

El README debe incluir:
- ¿Qué hace este módulo en una oración?
- Instalación o importación
- API pública (todas las funciones/clases exportadas con sus parámetros)
- Ejemplos de uso para los casos más comunes
- Limitaciones o cosas que no hace

Tono: técnico pero accesible. No rellenes con marketing.

[código del módulo]
```

### Comentarios para código complejo

```
El siguiente código tiene lógica compleja que necesita explicación.
Añade comentarios que expliquen el "por qué" (no el "qué") de las decisiones 
no obvias. No comentes lo que ya es obvio por el nombre de las variables.

Enfócate en:
- Por qué se eligió este algoritmo sobre el más obvio
- Qué invariante se mantiene y por qué es importante
- Por qué el orden de las operaciones importa
- Qué caso límite específico maneja este código

[código]
```

## Prompts para code review

### Review de pull request

```
Actúa como un senior developer haciendo code review de este diff.

Busca específicamente:
1. Bugs potenciales o casos no manejados
2. Problemas de rendimiento
3. Problemas de seguridad (inyección, XSS, exposición de datos)
4. Violaciones de principios SOLID o patrones del proyecto
5. Tests que faltan para los cambios realizados
6. Código que podría simplificarse sin perder claridad

Formato de respuesta:
- Para cada problema: [CRÍTICO/IMPORTANTE/SUGERENCIA] + descripción + cómo solucionarlo
- Si no hay problemas en una categoría, indícalo explícitamente
- Al final, da una valoración global del cambio

[diff o código a revisar]
```

### Análisis de seguridad

```
Analiza el siguiente código buscando vulnerabilidades de seguridad.

Contexto: este código [maneja autenticación / procesa input de usuario / llama a una API / etc.]

Busca:
- Inyección SQL, NoSQL, o de comandos
- XSS (Cross-Site Scripting)
- CSRF vulnerabilities
- Exposición de información sensible en logs o errores
- Problemas de autenticación o autorización
- Dependencias con vulnerabilidades conocidas

Para cada vulnerabilidad encontrada:
- Describe el vector de ataque
- Indica el impacto potencial
- Proporciona el código corregido

[código]
```

## Prompts para generación de componentes

### Componente completo con tests

```
Crea un componente [Vue 3 con <script setup> / React funcional] para [descripción del componente].

Especificaciones:
- Props: [lista las props con sus tipos y si son requeridas]
- Emits/callbacks: [lista los eventos que debe emitir]
- Comportamiento: [describe la interactividad]
- Estilos: usa [Tailwind/CSS Modules/styled-components] siguiendo el estilo del proyecto

Después del componente, genera tests completos con [Vitest/Jest + Testing Library].

Sigue las convenciones del código existente:
[muestra un componente existente como referencia]
```

### Endpoint de API o función de servicio

```
Crea una función de servicio en TypeScript para [descripción de la operación].

Requisitos:
- Usa fetch (no axios)
- Manejo de errores tipado (no solo try/catch genérico)
- Typing completo con TypeScript (define los types necesarios)
- Manejo de estados de carga
- Timeout configurable

La función debe devolver un objeto con { data, error, loading } o un Result type.

Añade tests de la función mockeando fetch con vi.fn().
```

## Prompts para migración de código

### Análisis previo a migración

```
Voy a migrar este proyecto de [tecnología origen] a [tecnología destino].

Antes de empezar, analiza el código y dame:
1. Lista de dependencias que necesitarán equivalente en la nueva tecnología
2. Patrones de código que tendrán que cambiar y cómo
3. Funcionalidades que pueden no tener equivalente directo
4. El orden recomendado para hacer la migración
5. Los riesgos principales de la migración

No hagas ningún cambio todavía. Solo el análisis.

[estructura del proyecto y archivos principales]
```

### Conversión de sintaxis

```
Convierte el siguiente código de [Vue 2 Options API / jQuery / CommonJS / etc.] 
a [Vue 3 Composition API / vanilla JS / ES Modules / etc.].

Reglas estrictas:
- El comportamiento debe ser IDÉNTICO
- Si algo no tiene equivalente directo, créalo manualmente y añade un comentario
- Si encuentras código que no puedes convertir con confianza, márcalo con TODO y explica el problema
- Al final, lista los cambios que hiciste y los que requieren revisión manual

[código]
```

## Consejos para mejorar tus resultados

### Da siempre el contexto del entorno

No es lo mismo "usa TypeScript" que "usa TypeScript 5.3 en modo strict con el siguiente tsconfig". El contexto específico produce resultados específicos.

### Pide que explique sus decisiones

Añade al final de tu prompt: "Explica brevemente las decisiones de diseño más importantes que tomaste". Esto te permite aprender y detectar problemas en el razonamiento.

### Usa el modo de revisión iterativa

Para tareas complejas, trabaja en iteraciones:
1. Pide un borrador
2. Revísalo y señala los problemas
3. Pide que lo corrija
4. Repite hasta que esté bien

### Establece restricciones explícitas

La IA sin restricciones tiende a sobrefactorizar o a tomar decisiones creativas que no encajan con tu proyecto. Sé explícito: "No uses clases si el código existente usa funciones", "Mantén el mismo estilo de manejo de errores que el código existente".

### Aprovecha el "rol de experto"

Empezar el prompt con "Actúa como un senior developer especialista en [tecnología]" mejora notablemente la calidad del output, especialmente para código especializado.

## Conclusión

Los prompts son una habilidad que se mejora con práctica. Empieza con los templates de esta colección y adáptalos a tu contexto específico. Toma nota de qué ajustes producen mejores resultados para tu stack y tu estilo de código.

Lo más importante: no aceptes el primer output a ciegas. Los mejores resultados con LLMs vienen de la iteración y la revisión crítica. La IA genera un borrador muy bueno; tú lo conviertes en código de producción.
