---
title: "IA para refactoring: cómo mejorar tu código heredado con LLMs"
description: "Aprende a usar Claude y GPT para refactorizar código legacy con prompts efectivos, ejemplos reales antes/después y cómo verificar que nada se rompe."
pubDate: 2025-03-15
author: "Pablo Alcalde García"
tags: ["ia", "refactoring", "codigo", "llm", "calidad"]
draft: false
---

El código heredado es como esa habitación de tu casa que llevas años sin ordenar. Sabes que ahí dentro hay cosas útiles, pero el caos es tan grande que cada vez que entras, cierras la puerta y dices "ya lo haré otro día". El refactoring es el proceso de ordenar esa habitación sin tirar nada que sirva, y es uno de los trabajos más importantes y menos glamurosos del desarrollo de software. Hoy voy a contarte cómo los LLMs están cambiando la forma de abordarlo.

## ¿Qué es el refactoring y por qué importa?

El refactoring es el proceso de modificar el código para mejorar su estructura interna sin cambiar su comportamiento externo. No añades funcionalidades, no corriges bugs (al menos no directamente). Solo limpias, reorganizas y simpllificas.

Martin Fowler, quien popularizó el término en su libro homónimo, lo define como "el proceso de cambiar un sistema software de tal manera que no altera el comportamiento externo del código pero mejora su estructura interna".

¿Por qué es tan importante? Porque el código que es difícil de leer es también difícil de mantener, difícil de extender y difícil de depurar. La deuda técnica que se acumula en el código mal estructurado es uno de los principales motivos por los que los proyectos se vuelven lentos, costosos y propensos a errores con el paso del tiempo.

### El problema del refactoring manual

El refactoring manual es tedioso por varias razones:

**Es repetitivo**: Muchos problemas de calidad de código siguen patrones predecibles. Funciones demasiado largas, variables con nombres crípticos, código duplicado, condiciones anidadas difíciles de seguir. Identificarlos y corregirlos uno a uno es un trabajo mecánico que consume horas.

**Es arriesgado**: Cambiar código que funciona siempre implica el riesgo de romper algo. Sin una buena cobertura de tests, el refactoring puede ser peligroso.

**Es poco motivador**: Es difícil justificar dedicar tiempo al refactoring cuando hay features nuevas que desarrollar o bugs que corregir. El código funciona, así que ¿por qué tocarlo?

Los LLMs no eliminan todos estos problemas, pero pueden reducir significativamente el esfuerzo del primero y hacer más manejables los otros dos.

## Cómo usar Claude y GPT para refactorizar

### Principio básico: sé específico en tus prompts

El error más común cuando se usa IA para refactoring es dar prompts vagos como "mejora este código" o "hazlo más limpio". Los LLMs generarán algo, pero puede no ser lo que necesitas.

Los prompts efectivos para refactoring tienen estas características:
- Especifican qué problema quieres resolver
- Dan contexto sobre el entorno (lenguaje, framework, versión)
- Indican restricciones (no cambies los nombres de las funciones públicas, mantén la misma API)
- Piden explicaciones de los cambios realizados

### Prompts efectivos por tipo de refactoring

**Para funciones demasiado largas:**
```
Tengo la siguiente función en JavaScript. Tiene más de 80 líneas y hace demasiadas cosas a la vez.
Refactorízala extrayendo responsabilidades a funciones más pequeñas y bien nombradas.
Mantén exactamente el mismo comportamiento externo.
Explica brevemente qué hace cada función nueva que crees.
[código]
```

**Para código duplicado:**
```
En este archivo tengo código que se repite con pequeñas variaciones en tres lugares.
Identifica el patrón común y extrae una función o clase reutilizable que elimine la duplicación.
El resultado debe ser más corto que el original y más fácil de mantener.
[código]
```

**Para condiciones complejas:**
```
La siguiente función tiene condicionales anidados muy difíciles de leer.
Refactorízala usando early returns, guard clauses, o extrayendo las condiciones a funciones con nombres descriptivos.
El comportamiento debe ser idéntico al original.
[código]
```

**Para nombres poco descriptivos:**
```
El siguiente código usa nombres de variables y funciones que no describen bien su propósito.
Renombra todo para que el código sea autoexplicativo, siguiendo las convenciones de JavaScript moderno.
Mantén los nombres de las funciones que forman parte de la API pública (las que están exportadas).
[código]
```

## Ejemplos reales: antes y después

Nada mejor que ver el refactoring en acción con código real.

### Ejemplo 1: Función demasiado larga

**Antes:**
```javascript
function processUserData(users) {
  const result = [];
  for (let i = 0; i < users.length; i++) {
    const u = users[i];
    if (u.age >= 18 && u.email && u.email.includes('@')) {
      let n = u.firstName + ' ' + u.lastName;
      if (u.role === 'admin') {
        n = '[ADMIN] ' + n;
      }
      const obj = {
        id: u.id,
        name: n,
        email: u.email.toLowerCase(),
        isActive: u.lastLogin ? 
          (new Date() - new Date(u.lastLogin)) < 30 * 24 * 60 * 60 * 1000 : 
          false
      };
      result.push(obj);
    }
  }
  return result;
}
```

**Después (con ayuda de Claude):**
```javascript
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

function isValidUser(user) {
  return user.age >= 18 && user.email?.includes('@');
}

function formatDisplayName(user) {
  const fullName = `${user.firstName} ${user.lastName}`;
  return user.role === 'admin' ? `[ADMIN] ${fullName}` : fullName;
}

function isRecentlyActive(lastLogin) {
  if (!lastLogin) return false;
  return (Date.now() - new Date(lastLogin).getTime()) < THIRTY_DAYS_MS;
}

function normalizeUser(user) {
  return {
    id: user.id,
    name: formatDisplayName(user),
    email: user.email.toLowerCase(),
    isActive: isRecentlyActive(user.lastLogin)
  };
}

function processUserData(users) {
  return users.filter(isValidUser).map(normalizeUser);
}
```

El código refactorizado hace exactamente lo mismo, pero cada función tiene una responsabilidad clara, los nombres son descriptivos, y el código es mucho más fácil de probar y mantener.

### Ejemplo 2: Condiciones anidadas

**Antes:**
```javascript
function getDiscount(user, product) {
  let discount = 0;
  if (user) {
    if (user.isPremium) {
      if (product.category === 'electronics') {
        discount = 0.15;
      } else {
        if (product.price > 100) {
          discount = 0.10;
        } else {
          discount = 0.05;
        }
      }
    } else {
      if (product.isOnSale) {
        discount = 0.03;
      }
    }
  }
  return discount;
}
```

**Después:**
```javascript
function getDiscount(user, product) {
  if (!user) return 0;
  if (!user.isPremium) return product.isOnSale ? 0.03 : 0;
  if (product.category === 'electronics') return 0.15;
  return product.price > 100 ? 0.10 : 0.05;
}
```

Cuatro líneas en lugar de veinte, con la misma lógica y mucho más legible.

## Cómo verificar que el refactoring no rompe nada

Este es el paso más crítico y el que más gente omite.

### La regla de oro: tests primero

Antes de refactorizar cualquier código, necesitas tests que verifiquen el comportamiento actual. Si no los tienes, créalos (la IA puede ayudarte con esto también). Los tests son tu red de seguridad.

```
Tengo la siguiente función. Sin cambiar su implementación, escríbeme tests exhaustivos 
en Vitest que cubran todos los casos de uso que puedas identificar, incluyendo casos límite.
[código de la función original]
```

### Estrategia de verificación paso a paso

1. **Escribe tests que cubran el comportamiento actual** antes de tocar el código
2. **Haz el refactoring** con ayuda de la IA
3. **Ejecuta los tests** para verificar que siguen pasando
4. **Revisa manualmente** los cambios para entender qué se modificó
5. **Considera edge cases** adicionales que los tests pueden no cubrir

### Pide a la IA que explique los cambios

Un LLM bien prompeado no solo hace el refactoring, sino que explica qué cambió y por qué. Esta explicación es muy valiosa para la revisión:

```
Refactoriza el siguiente código y al final, proporciona una lista de todos los cambios realizados
y el razonamiento detrás de cada decisión de diseño importante.
```

## Integración con el flujo de trabajo de tests

El refactoring y los tests son inseparables. Te recomiendo este flujo:

### Paso 1: Cobertura actual

Antes de empezar, mide la cobertura de tests actual. Si es baja, añade tests antes de refactorizar.

### Paso 2: Refactoring incremental

No refactorices todo a la vez. Cambia un archivo o incluso una función, ejecuta los tests, y continúa solo si pasan.

### Paso 3: Tests de regresión

Después de cada sesión de refactoring, ejecuta la suite completa de tests, no solo los del archivo que modificaste.

### Paso 4: Code review

Aunque hayas usado IA, el código refactorizado debe pasar por un code review humano. Los LLMs pueden introducir patrones que son técnicamente correctos pero que no siguen las convenciones del proyecto.

## Limitaciones del refactoring con IA

**El contexto importa mucho**: La IA ve el código que le das, pero no conoce el contexto del proyecto. A veces un nombre "feo" es deliberado porque mapea a un término del dominio de negocio.

**Puede sobrefactorizar**: Los LLMs a veces crean demasiadas abstracciones. Más funciones no siempre significa mejor código. Revisa si las extracciones realmente añaden claridad.

**No conoce tus convenciones**: Si tu equipo tiene convenciones específicas de nomenclatura o estructura, indícalas explícitamente en el prompt.

**El rendimiento puede cambiar**: Un refactoring puede hacer el código más legible pero menos eficiente. En rutas críticas de rendimiento, mide antes y después.

## Conclusión

El refactoring asistido por IA es una de las aplicaciones más productivas de los LLMs en el desarrollo diario. No reemplaza tu criterio técnico, pero puede hacer que el trabajo mecánico del refactoring sea mucho más rápido y menos doloroso.

La clave está en tres cosas: prompts específicos, verificación rigurosa con tests, y revisión humana del resultado. Con esa combinación, puedes transformar código heredado difícil de mantener en algo que tu equipo del futuro te agradecerá.

Empieza pequeño. Elige una función o un archivo que sepas que necesita limpieza, escribe tests que cubran su comportamiento, y usa la IA para refactorizarla. Te sorprenderá lo rápido que se puede mejorar la calidad del código cuando tienes las herramientas adecuadas.
