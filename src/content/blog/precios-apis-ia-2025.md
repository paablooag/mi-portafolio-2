---
title: "Comparativa de precios de APIs de IA en 2025: OpenAI vs Anthropic vs Google"
description: "Análisis detallado de precios por token de GPT-4o, Claude y Gemini. Estrategias para reducir costes en producción."
pubDate: 2025-05-14
author: "Pablo Alcalde García"
tags: ["ia", "precios", "api", "openai", "anthropic", "google"]
draft: false
---

Una de las primeras preguntas que surge al integrar IA en un proyecto es: ¿cuánto va a costar? Y la respuesta honesta es: depende, pero con los datos correctos puedes estimarlo bastante bien.

En este artículo comparo los precios de las principales APIs de IA en 2025 y te doy estrategias concretas para reducir el gasto.

## Cómo se cobran las APIs de IA

La mayoría de APIs cobran por **tokens** (unidades de texto, aproximadamente 4 caracteres o ¾ de una palabra en inglés). El precio se expresa en **dólares por millón de tokens ($/MTok)** y distingue entre:

- **Input tokens**: el texto que envías al modelo (prompt + contexto)
- **Output tokens**: el texto que genera el modelo (la respuesta)

Los output tokens suelen ser más caros que los input tokens, ya que requieren más cómputo.

## Comparativa de precios (2025)

### OpenAI

| Modelo | Input ($/MTok) | Output ($/MTok) | Contexto |
|--------|----------------|-----------------|----------|
| GPT-4o | $2.50 | $10.00 | 128K |
| GPT-4o mini | $0.15 | $0.60 | 128K |
| o3 | $10.00 | $40.00 | 200K |
| o4-mini | $1.10 | $4.40 | 200K |

### Anthropic (Claude)

| Modelo | Input ($/MTok) | Output ($/MTok) | Contexto |
|--------|----------------|-----------------|----------|
| Claude Opus 4 | $15.00 | $75.00 | 200K |
| Claude Sonnet 4 | $3.00 | $15.00 | 200K |
| Claude Haiku 4 | $0.80 | $4.00 | 200K |

Anthropic ofrece **prompt caching** que puede reducir hasta un 90% el coste de los input tokens en prompts que se repiten, lo cual es un diferenciador importante para aplicaciones con contexto fijo.

### Google (Gemini)

| Modelo | Input ($/MTok) | Output ($/MTok) | Contexto |
|--------|----------------|-----------------|----------|
| Gemini 2.5 Pro | $1.25 | $10.00 | 1M |
| Gemini 2.5 Flash | $0.075 | $0.30 | 1M |
| Gemini 2.0 Flash | $0.10 | $0.40 | 1M |

Gemini destaca por su enorme ventana de contexto (hasta 1M tokens) y sus precios competitivos en los modelos Flash.

## Calculando el coste real de tu aplicación

### Ejemplo práctico: chatbot de soporte

Supón un chatbot que:
- Recibe 1.000 consultas al día
- Cada consulta tiene un prompt de sistema de 500 tokens + historial de 300 tokens + pregunta de 200 tokens = 1.000 tokens de input
- Genera respuestas de 400 tokens de output

**Con GPT-4o mini:**
- Input: 1.000 × 1.000 tokens = 1M tokens → $0.15/día
- Output: 1.000 × 400 tokens = 400K tokens → $0.24/día
- **Total: ~$0.39/día = ~$11.70/mes**

**Con Claude Haiku 4:**
- Input: 1M tokens → $0.80/día
- Output: 400K tokens → $1.60/día
- **Total: ~$2.40/día = ~$72/mes**

**Con Claude Sonnet 4 + Prompt Caching:**
- Input sin caché: $3 × 0.5M = $1.50 (solo la parte variable)
- Input con caché (el prompt de sistema): $0.30 × 0.5M = $0.15
- Output: $15 × 0.4M = $6
- **Total: ~$7.65/día = ~$229/mes**

## Estrategias para reducir costes

### 1. Elegir el modelo adecuado para cada tarea

No todo necesita el modelo más potente. Categoriza tus llamadas:

- **Clasificación, extracción simple, formateo** → Haiku / GPT-4o mini / Gemini Flash
- **Análisis, redacción, código** → Sonnet / GPT-4o / Gemini Pro
- **Razonamiento complejo, tareas críticas** → Opus / o3 / Gemini Ultra

Usar Haiku en lugar de Opus donde sea suficiente puede reducir el coste hasta 100x.

### 2. Prompt Caching (Anthropic)

Si tienes un prompt de sistema largo que se repite en todas las llamadas, el caching de Anthropic lo almacena en caché y cobra solo el 10% del precio normal a partir del segundo uso.

```python
messages = [
    {
        "role": "user",
        "content": [
            {
                "type": "text",
                "text": sistema_largo,
                "cache_control": {"type": "ephemeral"}  # Marca para caché
            },
            {"type": "text", "text": pregunta_usuario}
        ]
    }
]
```

### 3. Reducir el tamaño del contexto

- Truncar el historial de conversación a los últimos N mensajes
- Resumir conversaciones largas en lugar de enviarlas completas
- Eliminar whitespace innecesario del prompt

### 4. Batching de requests

Para tareas que no requieren respuesta inmediata, los Batch APIs (OpenAI y Anthropic) ofrecen un 50% de descuento a cambio de latencia mayor (hasta 24h).

### 5. Caché a nivel de aplicación

Para preguntas frecuentes con la misma respuesta, almacena las respuestas en Redis o una base de datos. No pagues por calcular lo mismo dos veces.

## Cuándo usar APIs cloud vs modelos locales

### Usa API cloud cuando:
- Necesitas la máxima calidad de respuesta
- El volumen es bajo o impredecible
- No tienes GPU potente disponible
- La latencia importa y quieres SLAs garantizados

### Usa modelos locales (Ollama) cuando:
- El volumen es alto y constante
- Los datos son sensibles y no pueden salir de tu infraestructura
- El rendimiento de un modelo open-source es suficiente para tu caso de uso
- Quieres coste fijo (solo hardware/electricidad)

## Herramientas para monitorizar el gasto

- **LangSmith**: tracing completo de llamadas LLM con desglose de costes
- **OpenAI Dashboard**: uso en tiempo real con alertas
- **Anthropic Console**: métricas de uso y caché hits
- **Helicone**: proxy open-source con analytics de costes

## Conclusión

No hay una respuesta única sobre qué API usar. GPT-4o mini y Gemini Flash son imbatibles en precio/rendimiento para tareas sencillas. Claude Sonnet con caching es muy eficiente para aplicaciones con contexto repetitivo. Los modelos de razonamiento (o3, Opus) se justifican solo para tareas que lo requieren.

Lo importante es monitorizar el gasto desde el día uno, elegir el modelo mínimo suficiente para cada tarea y aplicar caching agresivamente.
