---
title: "LLMs para desarrolladores: guía práctica de integración"
description: "Aprende a integrar LLMs en tus aplicaciones con ejemplos reales en Python y JavaScript, streaming, function calling y las librerías más recomendadas."
pubDate: 2025-02-05
author: "Pablo Alcalde García"
tags: ["ia", "llm", "api", "desarrollo"]
draft: false
---

Integrar un LLM en una aplicación ya no es algo reservado a equipos de investigación. Con las APIs actuales, cualquier desarrollador puede añadir capacidades de inteligencia artificial a su stack en cuestión de horas. Esta guía cubre los patrones más habituales, con código real y los errores más comunes que conviene evitar desde el principio.

## Por dónde empezar: eligiendo tu API

Antes de escribir una sola línea de código, hay que elegir con qué proveedor trabajar. Las opciones más populares son:

- **OpenAI** (GPT-4o, GPT-4o-mini): API madura, excelente documentación, enorme comunidad.
- **Anthropic** (Claude): destaca en contextos largos, seguimiento de instrucciones y seguridad.
- **Google** (Gemini): muy competitivo en precio, integración natural con el ecosistema Google Cloud.
- **Groq / Together AI / Fireworks**: proveedores de inferencia rápida para modelos open-source.

Para empezar, cualquiera de los tres grandes funciona bien. En esta guía usaremos la API de OpenAI como referencia, pero los patrones son equivalentes en todos los proveedores.

## Tu primera llamada a la API

### Python

Instala el SDK oficial:

```bash
pip install openai
```

Una llamada básica tiene esta estructura:

```python
from openai import OpenAI

client = OpenAI(api_key="sk-...")

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "Eres un asistente técnico experto en Python."},
        {"role": "user", "content": "¿Cómo itero sobre un diccionario en Python?"}
    ],
    max_tokens=500,
    temperature=0.7
)

print(response.choices[0].message.content)
```

### JavaScript / TypeScript

```bash
npm install openai
```

```typescript
import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function ask(question: string): Promise<string> {
  const response = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'Eres un asistente técnico.' },
      { role: 'user', content: question }
    ],
    max_tokens: 500
  });

  return response.choices[0].message.content ?? '';
}
```

### Los parámetros más importantes

| Parámetro | Descripción | Valores habituales |
|-----------|-------------|-------------------|
| `model` | Modelo a utilizar | `gpt-4o`, `claude-3-5-sonnet-20241022` |
| `temperature` | Aleatoriedad de la respuesta | 0 (determinista) a 1 (creativo) |
| `max_tokens` | Longitud máxima de la respuesta | 256–4096 según el caso |
| `top_p` | Nucleus sampling alternativo a temperature | 0.9–1.0 |
| `presence_penalty` | Penaliza repetición de temas | 0–2 |

## Streaming: respuestas en tiempo real

Nadie quiere esperar 10 segundos a que aparezca toda la respuesta de golpe. El **streaming** permite mostrar los tokens según se generan, igual que ChatGPT.

### Streaming en Python

```python
from openai import OpenAI

client = OpenAI()

stream = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Escribe un resumen de los patrones de diseño más usados en Python."}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content is not None:
        print(chunk.choices[0].delta.content, end="", flush=True)
```

### Streaming en una API REST con FastAPI

```python
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from openai import OpenAI

app = FastAPI()
client = OpenAI()

@app.get("/chat")
async def chat_stream(prompt: str):
    def generate():
        stream = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
            stream=True
        )
        for chunk in stream:
            content = chunk.choices[0].delta.content
            if content:
                yield f"data: {content}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")
```

En el frontend, puedes consumir este stream con la API `EventSource` del navegador o con `fetch` y `ReadableStream`.

## Function Calling: conectando el LLM con tu código

El **function calling** (o tool use) es una de las funcionalidades más potentes de los LLMs modernos. Permite que el modelo solicite la ejecución de funciones definidas por ti con los parámetros que él mismo extrae del contexto.

### Caso de uso: consultar el clima

```python
import json
from openai import OpenAI

client = OpenAI()

# 1. Define las herramientas disponibles para el modelo
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Obtiene el tiempo actual para una ciudad",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "Nombre de la ciudad, por ejemplo 'Madrid'"
                    },
                    "unit": {
                        "type": "string",
                        "enum": ["celsius", "fahrenheit"],
                        "description": "Unidad de temperatura"
                    }
                },
                "required": ["city"]
            }
        }
    }
]

def get_weather(city: str, unit: str = "celsius") -> dict:
    # Aquí iría la llamada real a una API meteorológica
    return {"city": city, "temperature": 22, "unit": unit, "condition": "Soleado"}

# 2. Primera llamada: el modelo decide si necesita usar la función
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "¿Qué tiempo hace en Barcelona?"}],
    tools=tools,
    tool_choice="auto"
)

message = response.choices[0].message

# 3. Si el modelo quiere llamar a la función, la ejecutamos
if message.tool_calls:
    tool_call = message.tool_calls[0]
    args = json.loads(tool_call.function.arguments)
    result = get_weather(**args)

    # 4. Enviamos el resultado de vuelta al modelo
    final_response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "user", "content": "¿Qué tiempo hace en Barcelona?"},
            message,
            {
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": json.dumps(result)
            }
        ]
    )
    print(final_response.choices[0].message.content)
```

Este patrón es la base de los **agentes**: sistemas que combinan un LLM con herramientas externas para resolver tareas complejas.

## Gestión del historial de conversación

Los LLMs son **stateless** por naturaleza. Para mantener una conversación coherente, debes enviar todo el historial en cada llamada.

```python
class ConversationManager:
    def __init__(self, system_prompt: str):
        self.messages = [{"role": "system", "content": system_prompt}]
        self.client = OpenAI()

    def chat(self, user_message: str) -> str:
        self.messages.append({"role": "user", "content": user_message})

        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=self.messages,
            max_tokens=1000
        )

        assistant_message = response.choices[0].message.content
        self.messages.append({"role": "assistant", "content": assistant_message})
        return assistant_message

    def clear(self):
        """Reinicia la conversación manteniendo el system prompt."""
        self.messages = [self.messages[0]]
```

### Gestión de la ventana de contexto

Los modelos tienen un límite de tokens por llamada. Si la conversación es muy larga, tendrás que truncar el historial. Estrategias comunes:

- **FIFO**: eliminar los mensajes más antiguos cuando se supera el límite.
- **Resumen**: usar el propio modelo para resumir los turnos anteriores antes de descartarlos.
- **Embeddings + búsqueda**: almacenar todos los mensajes en una base de datos vectorial y recuperar solo los más relevantes.

## Librerías y frameworks recomendados

### Para Python

- **`openai`**: SDK oficial. Siempre actualizado con las últimas funcionalidades.
- **`anthropic`**: SDK oficial para Claude.
- **`langchain`**: framework de alto nivel para construir cadenas y agentes. Muy completo pero con curva de aprendizaje.
- **`llamaindex`**: especializado en RAG (Retrieval-Augmented Generation) y gestión de documentos.
- **`litellm`**: capa de abstracción que unifica la API de más de 100 proveedores de LLM con una interfaz compatible con OpenAI.

### Para JavaScript / TypeScript

- **`openai`**: SDK oficial con soporte nativo para TypeScript.
- **`@anthropic-ai/sdk`**: SDK oficial de Anthropic.
- **`langchain`**: también disponible para JS/TS.
- **`ai` (Vercel AI SDK)**: excelente para integrar LLMs en aplicaciones Next.js con soporte de streaming nativo.

## Errores comunes y cómo evitarlos

### 1. No gestionar los errores de rate limit

Las APIs tienen límites de peticiones por minuto. Implementa **exponential backoff** para reintentos:

```python
import time
import random
from openai import RateLimitError

def call_with_retry(client, messages, max_retries=5):
    for attempt in range(max_retries):
        try:
            return client.chat.completions.create(
                model="gpt-4o",
                messages=messages
            )
        except RateLimitError:
            if attempt == max_retries - 1:
                raise
            wait_time = (2 ** attempt) + random.random()
            time.sleep(wait_time)
```

### 2. Hardcodear la clave de API

Nunca incluyas tu API key en el código fuente. Usa variables de entorno:

```python
import os
from openai import OpenAI

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
```

### 3. No medir el uso de tokens

Cada llamada a la API tiene un coste. Monitoriza siempre el uso:

```python
response = client.chat.completions.create(...)
print(f"Tokens usados: {response.usage.total_tokens}")
print(f"Coste estimado: ${response.usage.total_tokens * 0.000005:.4f}")
```

### 4. Prompts demasiado vagos

Cuanto más específico y estructurado sea tu prompt, mejores resultados obtendrás. En lugar de "extrae los datos", usa "extrae los siguientes campos en formato JSON: nombre, email, teléfono. Si un campo no está presente, usa null".

### 5. Confiar ciegamente en el output

Los LLMs pueden alucinar. Valida siempre el formato de salida (especialmente si esperas JSON) y considera usar herramientas como `pydantic` para parsing estructurado.

## Conclusión

Integrar un LLM en tu aplicación es más sencillo de lo que parece, pero hacerlo bien requiere atención a detalles como la gestión del historial, el manejo de errores y la monitorización del coste. Empieza con una llamada básica, añade streaming para mejorar la experiencia de usuario, y cuando necesites que el modelo interactúe con tu sistema, explora el function calling.

En los siguientes posts hablaremos de cómo ejecutar modelos localmente con Ollama, cómo mejorar radicalmente tus prompts con técnicas de prompt engineering y cómo construir sistemas RAG para dar memoria contextual a tus LLMs.
