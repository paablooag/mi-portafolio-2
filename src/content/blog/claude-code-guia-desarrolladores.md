---
title: "Claude Code: la guía completa para desarrolladores que quieren multiplicar su productividad"
description: "Guía completa de Claude Code: instalación, configuración, comandos principales, casos de uso avanzados y cómo crear un CLAUDE.md efectivo para tu proyecto."
pubDate: 2025-05-08
author: "Pablo Alcalde García"
tags: ["claude-code", "ia", "anthropic", "productividad", "herramientas"]
draft: false
---

Claude Code es la herramienta de línea de comandos de Anthropic que convierte a Claude en un agente de desarrollo capaz de leer, escribir y modificar tu código de forma autónoma. No es un simple chatbot de programación; es un asistente que puede ejecutar comandos, correr tests, navegar por tu codebase y completar tareas complejas de principio a fin. En esta guía voy a cubrir todo lo que necesitas saber para empezar a usarlo y sacarle el máximo partido.

## ¿Qué es exactamente Claude Code?

Claude Code no es un plugin para tu editor favorito. Es una CLI (Command Line Interface) que corre en tu terminal y tiene acceso a tu sistema de archivos, tu entorno de ejecución, y puede interactuar con herramientas como git, npm, o cualquier otro comando que tengas disponible.

La diferencia clave con otras herramientas de IA para programación es la **autonomía**. Cuando le pides a Claude Code que implemente una feature, no te muestra el código para que lo copies; va directamente a los archivos relevantes, los modifica, ejecuta los tests para verificar que funciona, y te reporta el resultado. Es como tener un desarrollador junior muy capaz que trabaja mientras tú supervisas.

Está construido sobre los modelos Claude de Anthropic (principalmente Claude Sonnet y Opus), que destacan por su capacidad de razonamiento profundo, su honestidad cuando algo no entiende, y la calidad de código que produce.

## Instalación y configuración

### Requisitos previos

- Node.js 18 o superior
- Una cuenta de Anthropic con acceso a la API
- Tu API key de Anthropic

### Instalación

```bash
npm install -g @anthropic-ai/claude-code
```

Verifica que la instalación fue correcta:

```bash
claude --version
```

### Configuración de la API key

Claude Code necesita tu API key para autenticarse con los servidores de Anthropic. La forma recomendada es configurarla como variable de entorno:

```bash
export ANTHROPIC_API_KEY="tu-api-key-aqui"
```

Para no tener que configurarla en cada sesión, añádela a tu `.bashrc`, `.zshrc` o el archivo de configuración de tu shell.

Alternativamente, puedes ejecutar `claude` y te pedirá la API key en el primer arranque.

### Primera ejecución

Navega al directorio de tu proyecto y ejecuta:

```bash
cd mi-proyecto
claude
```

Se abrirá una interfaz de chat en la terminal. Puedes empezar a hacer preguntas sobre el código o pedir que realice tareas.

## Comandos y modos principales

### Modo interactivo (por defecto)

Al ejecutar `claude` sin argumentos, entras en modo interactivo. Aquí puedes mantener una conversación continua, el agente mantiene el contexto de la conversación anterior, y puedes referirte a archivos y cambios anteriores.

### Modo de tarea única

Para tareas concretas sin conversación:

```bash
claude "explica qué hace la función calculateTax en src/utils/tax.js"
```

```bash
claude "añade tests unitarios para el módulo de autenticación"
```

### Modo de revisión de archivos

Puedes pasarle archivos específicos para que los analice:

```bash
claude --file src/components/Header.vue "refactoriza este componente para usar Composition API"
```

### Comandos internos útiles

Dentro de la sesión interactiva, tienes comandos especiales:

- `/help` - muestra todos los comandos disponibles
- `/clear` - limpia el contexto de la conversación actual
- `/cost` - muestra el coste acumulado de la sesión
- `/exit` - cierra Claude Code

## Casos de uso principales

### Refactoring de código heredado

Este es probablemente el caso de uso donde Claude Code brilla más. Puedes pedirle que analice un archivo o módulo completo y lo refactorice:

```
Analiza el archivo src/services/userService.js. 
Identifica los problemas de calidad de código y refactorízalo para mejorar:
- La legibilidad
- El manejo de errores
- La testabilidad

Después de refactorizar, ejecuta los tests existentes para verificar que nada se rompió.
```

Claude Code leerá el archivo, hará los cambios, ejecutará los tests, y si algo falla, intentará corregirlo.

### Debugging de errores difíciles

Para bugs que te han tenido horas buscando:

```
Tengo un error que aparece intermitentemente en producción:
"TypeError: Cannot read properties of undefined (reading 'userId')"
El stack trace apunta a src/middleware/auth.js línea 45.
Analiza el middleware y los archivos relacionados, identifica todas las formas 
en que userId podría ser undefined, y propón la solución más robusta.
```

### Generación y actualización de tests

```
Revisa el módulo src/utils/validators.js y genera tests exhaustivos en Vitest.
Asegúrate de cubrir:
- Casos normales con datos válidos
- Casos límite (strings vacíos, null, undefined)
- Casos con datos inválidos que deben fallar la validación
Ejecuta los tests después de crearlos para verificar que pasan.
```

### Migraciones de dependencias

```
El proyecto usa axios versión 0.x. Necesito migrar a fetch nativo de la Web API.
Analiza todos los archivos que usan axios, planifica la migración, y realiza los cambios
archivo por archivo. Verifica que los tests pasan después de cada cambio.
```

### Documentación automática

```
Genera JSDoc para todas las funciones exportadas en src/utils/ que no tengan documentación.
Incluye @param, @returns, @throws donde sea relevante, y un ejemplo de uso en cada función.
```

### Generación de componentes

```
Crea un componente Vue 3 con <script setup> para un formulario de contacto.
Debe incluir:
- Campos: nombre, email, mensaje
- Validación con Vee-Validate
- Manejo de estado de carga y error
- Accesibilidad (labels, aria-describedby)
- Tests unitarios con Vitest
Sigue las convenciones de los componentes existentes en src/components/
```

## Tips avanzados para maximizar la productividad

### Tip 1: Da contexto antes de pedir tareas

Antes de pedir que realice cambios importantes, dale una vuelta de orientación:

```
Lee los archivos en src/ y familiarízate con la arquitectura del proyecto.
Presta especial atención a cómo se organiza el estado, cómo se manejan los errores,
y qué convenciones de nombrado se usan. Después confirma que lo has entendido.
```

### Tip 2: Pide planificación antes de ejecución

Para tareas complejas, pide que planifique antes de actuar:

```
Necesito añadir autenticación con JWT al proyecto. Antes de hacer ningún cambio,
analiza el código existente y dame un plan detallado de qué archivos crearás o modificarás
y en qué orden. Espera mi aprobación antes de implementar.
```

### Tip 3: Divide las tareas grandes

Claude Code funciona mejor con tareas bien delimitadas. En lugar de pedir "refactoriza todo el proyecto", divide en pasos:

```
Paso 1: Refactoriza solo el módulo de autenticación
Paso 2: Una vez aprobado, refactoriza el módulo de usuarios
Paso 3: Actualiza los tests para ambos módulos
```

### Tip 4: Pide verificación explícita

Siempre pide que ejecute tests o verificaciones:

```
Después de cada cambio, ejecuta los tests relacionados y reporta si pasan o fallan.
Si fallan, corrígelos antes de continuar con el siguiente cambio.
```

### Tip 5: Usa el modo verbose para entender el razonamiento

Puedes pedirle que explique su razonamiento:

```
Antes de hacer cualquier cambio, explica en detalle qué vas a hacer y por qué.
Incluye las alternativas que consideraste y por qué elegiste esta aproximación.
```

## Cómo crear un CLAUDE.md efectivo

El fichero `CLAUDE.md` en la raíz de tu proyecto es como el manual de instrucciones que Claude Code lee al inicio de cada sesión. Es la diferencia entre un asistente genérico y uno que conoce a fondo tu proyecto.

### Estructura recomendada

```markdown
# Nombre del Proyecto

## Descripción
Breve descripción del proyecto y su propósito.

## Stack técnico
- Framework: Vue 3 con Composition API
- Build tool: Vite
- Tests: Vitest + Testing Library
- Estado: Pinia
- Estilos: Tailwind CSS

## Estructura del proyecto
src/
  components/ - Componentes Vue reutilizables
  views/ - Páginas/rutas
  stores/ - Stores de Pinia
  services/ - Lógica de negocio y llamadas a API
  utils/ - Funciones de utilidad

## Convenciones importantes
- Los componentes usan PascalCase
- Las funciones de utilidad usan camelCase
- Los tests están en __tests__/ junto a los archivos que prueban
- Usamos TypeScript strict mode
- No usamos any; si es necesario, usa unknown y valida

## Comandos útiles
- npm run dev - servidor de desarrollo
- npm run test - ejecutar tests
- npm run test:coverage - tests con cobertura
- npm run build - build de producción

## Lo que NO hacer
- No usar Options API en componentes nuevos (solo Composition API)
- No usar axios (usamos fetch nativo)
- No importar desde node_modules directamente en componentes (usar services)
```

Un CLAUDE.md bien escrito ahorra decenas de correcciones y asegura que el código generado siga las convenciones del proyecto desde el primer momento.

## Limitaciones que debes conocer

**El coste puede acumularse**: Claude Code usa créditos de la API de Anthropic. Monitoriza tu uso con `/cost` regularmente, especialmente si trabajas en proyectos grandes.

**El contexto tiene límites**: En proyectos muy grandes, no puede cargar todo el código en memoria. Necesitas ser selectivo con qué archivos le das a analizar en cada sesión.

**No puede probar interfaces visuales**: Puede ejecutar tests automatizados, pero no puede "ver" si una interfaz de usuario se ve bien. Para eso necesitas herramientas adicionales.

**Las alucinaciones existen**: Aunque Claude es uno de los modelos más precisos, puede cometer errores, especialmente con APIs específicas de versiones recientes. Siempre verifica los cambios críticos.

**Requiere supervisión**: Claude Code no es un reemplazo del desarrollador. Necesita supervisión, especialmente para cambios que afectan a lógica de negocio crítica o seguridad.

## Conclusión

Claude Code representa un salto cualitativo en cómo los desarrolladores pueden usar la IA. No es un autocompletador de código; es un agente que puede planificar, ejecutar, verificar y corregir su propio trabajo. Usado correctamente, puede multiplicar tu productividad en tareas de refactoring, debugging, generación de tests y migraciones.

La curva de aprendizaje está principalmente en aprender a dar instrucciones efectivas y a estructurar las tareas de forma que la IA pueda completarlas con éxito. Invierte tiempo en crear un buen CLAUDE.md para cada proyecto y en perfeccionar tu forma de prompting, y verás resultados significativos muy rápidamente.

Empieza con tareas pequeñas y bien definidas, revisa el trabajo que genera, y gradualmente confíale tareas más complejas a medida que comprendes sus capacidades y limitaciones en el contexto de tu proyecto.
