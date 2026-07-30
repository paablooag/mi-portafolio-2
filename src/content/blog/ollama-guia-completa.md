---
title: "Ollama: ejecuta modelos de IA localmente en tu máquina"
description: "Guía completa de Ollama: instalación, modelos disponibles como Llama y Mistral, comandos esenciales e integración en proyectos sin depender de APIs cloud."
pubDate: 2025-02-20
author: "Pablo Alcalde García"
tags: ["ollama", "llm", "ia", "local-ai", "open-source"]
draft: false
---

¿Qué pasaría si pudieras ejecutar un modelo de lenguaje tan potente como Llama 3 o Mistral directamente en tu ordenador, sin enviar ningún dato a servidores externos y sin pagar ni un céntimo por cada token? Con **Ollama**, esto es posible hoy mismo. En esta guía te enseño todo lo que necesitas saber para empezar a usar modelos de IA localmente.

## Qué es Ollama

Ollama es una herramienta open-source que permite descargar y ejecutar LLMs en tu propia máquina de forma extremadamente sencilla. Su propuesta de valor principal es eliminar toda la fricción técnica que históricamente hacía difícil ejecutar modelos localmente: compilación desde cero, gestión de dependencias CUDA, configuración de entornos...

Con Ollama, descargar y usar un modelo es tan simple como:

```bash
ollama run llama3.2
```

Y ya está. El modelo se descarga, se carga en memoria y puedes empezar a chatear con él.

### Por qué usar Ollama en lugar de APIs cloud

Las razones principales para optar por Ollama sobre las APIs de OpenAI, Anthropic o Google son:

- **Privacidad total**: los datos nunca abandonan tu máquina. Fundamental para proyectos con datos sensibles.
- **Sin coste por uso**: una vez descargado el modelo, no hay coste por llamada ni por token.
- **Sin dependencia de internet**: funciona completamente offline.
- **Personalización**: puedes hacer fine-tuning de modelos y crear versiones personalizadas.
- **Sin rate limits**: puedes hacer todas las peticiones que tu hardware permita.

La contrapartida evidente es el hardware necesario y que los modelos locales suelen tener una capacidad inferior a los modelos más grandes en la nube.

## Instalación

### Linux y macOS

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

El script detecta automáticamente tu sistema operativo y arquitectura. En macOS también puedes descargarlo como aplicación desde [ollama.com](https://ollama.com).

### Windows

Descarga el instalador desde la página oficial. Ollama para Windows instala también un servicio en segundo plano que gestiona los modelos.

### Verificar la instalación

```bash
ollama --version
```

Si todo fue bien, verás algo como `ollama version 0.4.x`.

## Requisitos de hardware

Este es el punto más importante. Los LLMs son modelos grandes que necesitan memoria para cargarse. La regla general:

| Tamaño del modelo | RAM necesaria | Ejemplo |
|-------------------|---------------|---------|
| 1B - 3B parámetros | 2 - 4 GB | Llama 3.2 1B |
| 7B parámetros | 6 - 8 GB | Mistral 7B |
| 13B parámetros | 10 - 16 GB | Llama 2 13B |
| 34B parámetros | 20 - 32 GB | CodeLlama 34B |
| 70B parámetros | 40 - 64 GB | Llama 3 70B |

Si tienes GPU compatible, Ollama la detecta automáticamente y el rendimiento mejora notablemente. Con CPU el modelo funciona pero es más lento.

## Modelos disponibles

El catálogo de modelos disponibles en Ollama es amplio y crece constantemente. Puedes ver todos en [ollama.com/library](https://ollama.com/library).

### Modelos de propósito general

**Llama 3.2** (Meta): uno de los modelos más potentes disponibles en open-source. La versión de 3B es perfecta para máquinas con poca RAM, mientras que la de 70B rivaliza con modelos comerciales.

```bash
ollama pull llama3.2        # 3B parámetros
ollama pull llama3.2:11b    # 11B parámetros
```

**Mistral** (Mistral AI): excelente relación calidad/tamaño. El modelo de 7B es sorprendentemente capaz para su tamaño y funciona bien en máquinas con 8GB de RAM.

```bash
ollama pull mistral
```

**Gemma 2** (Google): modelos de calidad con distintos tamaños: 2B, 9B y 27B.

```bash
ollama pull gemma2
ollama pull gemma2:27b
```

**Phi-4** (Microsoft): modelos pequeños pero muy eficientes para tareas de razonamiento.

```bash
ollama pull phi4
```

### Modelos especializados para código

**CodeLlama** (Meta): basado en Llama, entrenado específicamente para generar y analizar código.

```bash
ollama pull codellama
ollama pull codellama:34b  # Más potente, necesita más RAM
```

**DeepSeek Coder**: uno de los mejores modelos para código, especialmente para Python, JavaScript y TypeScript.

```bash
ollama pull deepseek-coder
```

**Qwen2.5-Coder**: otra excelente opción para programación, con soporte para más de 40 lenguajes.

```bash
ollama pull qwen2.5-coder
```

### Modelos multimodales (visión)

**LLaVA**: puede analizar imágenes además de texto.

```bash
ollama pull llava
```

## Comandos esenciales

### Gestión de modelos

```bash
# Descargar un modelo sin ejecutarlo
ollama pull mistral

# Listar modelos descargados
ollama list

# Eliminar un modelo
ollama rm mistral

# Ver información detallada de un modelo
ollama show mistral

# Copiar un modelo localmente
ollama cp mistral mi-mistral-personalizado
```

### Ejecutar modelos

```bash
# Iniciar un chat interactivo
ollama run llama3.2

# Pasar un prompt directamente (sin modo interactivo)
echo "¿Cuál es la capital de España?" | ollama run mistral

# Ejecutar con un fichero de contexto
ollama run codellama < mi_codigo.py
```

### El servidor de Ollama

Ollama incluye un servidor HTTP que expone una API compatible con la de OpenAI. Por defecto está en `http://localhost:11434`.

```bash
# Iniciar el servidor (normalmente ya está corriendo como servicio)
ollama serve

# Listar modelos disponibles vía API
curl http://localhost:11434/api/tags

# Hacer una petición de generación
curl http://localhost:11434/api/generate \
  -d '{"model": "llama3.2", "prompt": "Hola, ¿cómo estás?"}'
```

## Integración en proyectos

### Con Python (compatible con OpenAI)

La API de Ollama es compatible con la de OpenAI, lo que significa que puedes usar el SDK oficial de OpenAI apuntando a tu servidor local:

```python
from openai import OpenAI

# Apunta al servidor local de Ollama
client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama"  # Cualquier valor sirve, no se valida
)

response = client.chat.completions.create(
    model="llama3.2",
    messages=[
        {"role": "system", "content": "Eres un asistente de programación."},
        {"role": "user", "content": "Explícame qué es un decorador en Python."}
    ]
)

print(response.choices[0].message.content)
```

### Con el cliente nativo de Ollama

```python
import ollama

# Chat simple
response = ollama.chat(
    model='llama3.2',
    messages=[{'role': 'user', 'content': '¿Qué es Docker?'}]
)
print(response['message']['content'])

# Streaming
for chunk in ollama.chat(
    model='mistral',
    messages=[{'role': 'user', 'content': 'Escribe un script de Python para leer un CSV.'}],
    stream=True
):
    print(chunk['message']['content'], end='', flush=True)
```

### Con JavaScript / TypeScript

```typescript
const response = await fetch('http://localhost:11434/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'llama3.2',
    messages: [
      { role: 'user', content: '¿Cuánto es 2 + 2?' }
    ],
    stream: false
  })
});

const data = await response.json();
console.log(data.message.content);
```

### Integración con LangChain

```python
from langchain_ollama import ChatOllama
from langchain_core.messages import HumanMessage

llm = ChatOllama(model="llama3.2", temperature=0)

response = llm.invoke([HumanMessage(content="¿Qué es el patrón MVC?")])
print(response.content)
```

## Crear modelos personalizados con Modelfile

Una de las funcionalidades más potentes de Ollama es la capacidad de crear modelos personalizados usando un **Modelfile**, que funciona de forma similar a un Dockerfile.

```dockerfile
# Modelfile para un asistente especializado en Python
FROM llama3.2

# Configurar el system prompt
SYSTEM """
Eres un experto en Python con 10 años de experiencia. 
Siempre proporciona ejemplos de código prácticos y sigue las 
mejores prácticas de PEP 8. Explica el código paso a paso.
Responde siempre en español.
"""

# Ajustar parámetros
PARAMETER temperature 0.3
PARAMETER top_p 0.9
PARAMETER num_ctx 4096
```

```bash
# Crear el modelo personalizado
ollama create asistente-python -f ./Modelfile

# Usarlo
ollama run asistente-python
```

## Ollama vs APIs cloud: cuándo usar cada uno

| Criterio | Ollama | API Cloud |
|----------|--------|-----------|
| Privacidad | Excelente | Depende del proveedor |
| Coste | Solo hardware | Por token |
| Latencia | Depende del hardware | Generalmente baja |
| Calidad del modelo | Buena para tamaños razonables | Los mejores modelos |
| Mantenimiento | Requiere actualización manual | Automático |
| Escalabilidad | Limitada por hardware | Prácticamente ilimitada |
| Disponibilidad offline | Sí | No |

**Usa Ollama cuando:**
- Trabajas con datos sensibles (médicos, legales, financieros).
- Quieres experimentar sin preocuparte por el coste.
- Necesitas trabajar sin internet.
- Vas a hacer muchas peticiones en un entorno controlado.

**Usa APIs cloud cuando:**
- Necesitas la máxima calidad posible.
- Vas a producción con tráfico variable.
- No quieres gestionar infraestructura.
- Necesitas las últimas capacidades (visión avanzada, razonamiento complejo).

## Conclusión

Ollama ha democratizado el acceso a los LLMs de una forma que hace solo dos años era impensable para un desarrollador individual. Con un simple comando puedes tener un modelo de lenguaje potente corriendo en tu máquina, sin costes, sin suscripciones y con privacidad total.

Para proyectos donde la privacidad importa, para experimentación y aprendizaje, o para entornos sin conexión, Ollama es simplemente imbatible. Para producción con requisitos de calidad máxima o escala, las APIs cloud siguen siendo la opción más sensata. Lo ideal es conocer ambas opciones y elegir según el contexto.

En el próximo post hablaremos de cómo sacar el máximo partido a cualquier LLM mediante técnicas avanzadas de prompt engineering.
