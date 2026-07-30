---
title: "RAG: cómo dar memoria y contexto propio a los LLMs"
description: "Guía práctica sobre Retrieval-Augmented Generation: qué es, cómo funciona y cómo implementarlo con bases de datos vectoriales."
pubDate: 2025-04-08
author: "Pablo Alcalde García"
tags: ["rag", "llm", "ia", "vector-database", "embeddings"]
draft: false
---

Uno de los límites más frustrantes de los LLMs es que no conocen tu documentación interna, tu base de código o los datos específicos de tu empresa. Puedes meterlos en el contexto, pero hay límites de tokens y el coste se dispara. La solución elegante a este problema se llama RAG: Retrieval-Augmented Generation.

## ¿Qué es RAG?

RAG es una arquitectura que combina dos capacidades:

1. **Retrieval (recuperación)**: búsqueda semántica en una base de conocimiento propia
2. **Generation (generación)**: el LLM usa lo recuperado para generar respuestas informadas

La idea es simple: en lugar de meter toda la documentación en el contexto del modelo, primero buscas solo las partes relevantes para la pregunta actual y esas partes sí las incluyes en el contexto.

El resultado: el modelo puede responder sobre tus datos propios sin fine-tuning y con información siempre actualizada.

## Arquitectura básica

```
[Documentos propios]
        ↓
[Chunking: dividir en fragmentos]
        ↓
[Embeddings: convertir a vectores]
        ↓
[Vector Database: almacenar vectores]
        ↓ (a la hora de consultar)
[Query del usuario] → [Embedding de la query]
        ↓
[Búsqueda de similitud en Vector DB]
        ↓
[Prompt = query + fragmentos relevantes] → [LLM genera respuesta]
```

## Conceptos clave

### Embeddings

Los embeddings son representaciones numéricas (vectores) del significado semántico del texto. Textos con significado similar producen vectores cercanos en el espacio vectorial.

- "cómo instalar dependencias" y "npm install" → vectores muy próximos
- "receta de paella" y "algoritmo de ordenación" → vectores muy distantes

### Chunking

Dividir tus documentos en fragmentos manejables. Ni muy pequeños (pierden contexto) ni muy grandes (ruido excesivo). Tamaño habitual: 300-800 tokens con un 10-15% de solapamiento.

### Vector Database

Bases de datos especializadas en búsqueda por similitud:

| Base de datos | Tipo | Mejor para |
|---------------|------|------------|
| Chroma | Open source, local | Prototipado |
| Qdrant | Open source, escalable | Producción media |
| Pinecone | Cloud managed | Producción sin gestión de infra |
| pgvector | Extensión PostgreSQL | Si ya usas Postgres |

## Implementación con Python

### Instalar dependencias

```bash
pip install langchain chromadb ollama tiktoken
```

### Cargar y dividir documentos

```python
from langchain.document_loaders import DirectoryLoader, TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

loader = DirectoryLoader('./docs', glob="**/*.md", loader_cls=TextLoader)
documents = loader.load()

splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50,
    separators=["\n\n", "\n", ".", " "]
)
chunks = splitter.split_documents(documents)
```

### Crear embeddings y almacenar

```python
from langchain.embeddings import OllamaEmbeddings
from langchain.vectorstores import Chroma

embeddings = OllamaEmbeddings(model="nomic-embed-text")

vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory="./chroma_db"
)
vectorstore.persist()
```

### Sistema de consulta RAG

```python
from langchain.chat_models import ChatOllama
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

prompt_template = """Usa el siguiente contexto para responder la pregunta.
Si no encuentras la respuesta, dilo explícitamente.

Contexto:
{context}

Pregunta: {question}
Respuesta:"""

llm = ChatOllama(model="llama3.2")
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vectorstore.as_retriever(search_kwargs={"k": 4}),
    chain_type_kwargs={"prompt": PromptTemplate(
        template=prompt_template,
        input_variables=["context", "question"]
    )}
)

resultado = qa_chain.invoke("¿Cómo configuro la autenticación?")
print(resultado["result"])
```

## Técnicas avanzadas

### Búsqueda híbrida
Combina búsqueda vectorial (semántica) con búsqueda por palabras clave (BM25). Especialmente útil para términos técnicos exactos como nombres de funciones o IDs.

### Re-ranking
Después de recuperar los N chunks más similares, aplica un modelo de re-ranking para ordenarlos por relevancia real antes de pasarlos al LLM.

### HyDE (Hypothetical Document Embeddings)
Genera una respuesta hipotética a la pregunta y busca documentos similares a esa respuesta hipotética. Funciona sorprendentemente bien.

## Casos de uso donde RAG brilla

- **Chatbot sobre documentación**: técnica, manuales, FAQs
- **Asistente de código**: preguntas sobre un repositorio específico
- **Knowledge base empresarial**: acceso a información interna
- **Soporte al cliente**: respuestas basadas en documentación de producto

## Limitaciones: cuándo NO usar RAG

- Si el conocimiento cabe en el contexto: inclúyelo directamente
- Para razonamiento que requiere todo el documento: un resumen necesita ver todo
- Para información muy estructurada: una base de datos relacional + SQL puede ser más apropiado

## Evaluación de tu sistema RAG

Métricas clave (medibles con RAGAS):
- **Context Recall**: ¿el retriever encuentra los chunks relevantes?
- **Context Precision**: ¿los chunks recuperados son realmente útiles?
- **Answer Faithfulness**: ¿la respuesta está basada en el contexto?
- **Answer Relevancy**: ¿la respuesta responde realmente la pregunta?

## Conclusión

RAG es una de las técnicas más prácticas del ecosistema de IA actual. Permite que cualquier LLM "sepa" sobre tus datos sin fine-tuning, de forma actualizable y con control total sobre la fuente de información.

Con LangChain, Chroma y Ollama puedes tener un sistema RAG funcionando localmente en pocas horas. Empieza con un caso de uso pequeño y escala desde ahí.
