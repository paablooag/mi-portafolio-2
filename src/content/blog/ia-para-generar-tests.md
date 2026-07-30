---
title: "Cómo usar IA para generar tests y mejorar la cobertura de tu código"
description: "Aprende a usar LLMs para generar tests unitarios e integrales con Vitest y Jest: prompts efectivos, revisión crítica del resultado y TDD asistido por IA."
pubDate: 2025-05-25
author: "Pablo Alcalde García"
tags: ["ia", "testing", "tdd", "llm", "calidad", "vitest", "jest"]
draft: false
---

Los tests son una de esas cosas que todos sabemos que deberíamos hacer más, pero que sistemáticamente posponemos cuando el tiempo aprieta. Es el ciclo de vida clásico del desarrollador: "lo añado luego", "primero que funcione", "si funciona, no lo toques". El resultado son proyectos con coberturas de test vergonzosas y el miedo constante de que cualquier cambio rompa algo en algún lugar inesperado.

Los LLMs están cambiando esta ecuación de forma significativa. No porque escribir tests sea ahora divertido (no lo es), sino porque el coste de generarlos ha bajado dramáticamente. En este artículo te explico cómo usar IA para generar tests de calidad, cómo revisarlos correctamente, y cómo integrar este flujo en tu día a día.

## El problema real de los tests

Antes de hablar de soluciones, es importante entender por qué la gente no escribe tests. No es pereza; es una combinación de factores:

### El problema del tiempo

Escribir un test bueno lleva tiempo. Tienes que entender el comportamiento esperado, pensar en los casos límite, configurar los mocks necesarios, y escribir código que en sí mismo puede ser complejo. Para una función de 20 líneas, el test bien hecho puede llevar el mismo tiempo que la implementación.

### El problema de la motivación

Los tests no dan valor visible inmediato. Tu cliente no ve los tests. Tu jefe no celebra que hayas llegado al 80% de cobertura. El valor es diferido: aparece cuando algo falla y los tests lo capturan antes de que llegue a producción.

### El problema del código no testeable

Muchas veces el código heredado está escrito de una forma que lo hace muy difícil de probar. Funciones que hacen demasiadas cosas, dependencias globales, efectos secundarios mezclados con lógica de negocio. Añadir tests a ese código requiere refactorizar primero, lo cual duplica el esfuerzo.

Los LLMs no resuelven el tercer problema (el código no testeable sigue necesitando refactoring), pero reducen drásticamente el coste de los dos primeros.

## Cómo los LLMs generan tests

Un modelo como Claude o GPT-4 puede leer una función o clase y generar tests automáticamente porque ha sido entrenado con millones de ejemplos de código y sus correspondientes tests. Entiende los patrones comunes de testing, conoce las APIs de frameworks como Vitest, Jest, Mocha, y Cypress, y puede inferir el comportamiento esperado a partir del código.

Lo más valioso es que los LLMs son buenos identificando **casos límite** que los desarrolladores humanos tienden a pasar por alto cuando están cansados o apurados:
- Inputs vacíos o null
- Arrays vacíos o con un solo elemento
- Números negativos o cero
- Strings con caracteres especiales
- Fechas límite (inicio y fin de mes, años bisiestos)
- Condiciones de carrera en código asíncrono

## Prompts efectivos para Vitest y Jest

La calidad de los tests que genera la IA depende enormemente de la calidad del prompt. Aquí están los patterns que mejor me han funcionado.

### Prompt básico para unit tests

```
Eres un experto en testing de JavaScript. Tengo la siguiente función en TypeScript.
Framework de testing: Vitest con @testing-library si es necesario.

Genera tests exhaustivos que cubran:
1. El caso de uso principal (happy path)
2. Todos los casos límite que puedas identificar
3. Casos de error (entradas inválidas, excepciones esperadas)
4. Si hay lógica asíncrona, incluye tests con async/await

Usa describe para agrupar los tests lógicamente.
El nombre de cada test debe ser descriptivo en español, siguiendo el pattern "debería [comportamiento esperado] cuando [condición]".

[código de la función]
```

### Prompt para tests de componentes Vue/React

```
Tengo el siguiente componente de Vue 3 con <script setup>.
Testing library: Vitest + @testing-library/vue

Genera tests que verifiquen:
1. Que el componente se renderiza correctamente con las props por defecto
2. Que responde correctamente a las props que recibe
3. Que emite los eventos correctos cuando el usuario interactúa
4. Los estados de carga y error si los hay
5. La accesibilidad básica (roles ARIA, labels)

NO uses snapshots. Usa queries semánticas (getByRole, getByLabelText, etc.)

[código del componente]
```

### Prompt para tests de integración de API

```
Tengo el siguiente service que hace llamadas a una API REST.
Framework: Vitest con vi.mock() para mockear fetch.

Genera tests de integración que:
1. Mockeen fetch correctamente para cada endpoint
2. Verifiquen que se llama al endpoint correcto con los parámetros esperados
3. Comprueben el manejo correcto de respuestas exitosas
4. Comprueben el manejo de errores HTTP (400, 401, 404, 500)
5. Verifican el manejo de errores de red (timeout, sin conexión)

[código del service]
```

## Revisión de los tests generados: no los aceptes a ciegas

Este es el punto más importante del artículo. Los tests generados por IA pueden tener problemas sutiles que los hacen menos valiosos de lo que parecen.

### Problema 1: Tests que siempre pasan

```javascript
// Test generado por IA que no prueba nada real
it('debería calcular el total', () => {
  const result = calculateTotal([]);
  expect(result).toBeDefined();
});
```

Este test pasará siempre, incluso si `calculateTotal` tiene un bug terrible. Un test útil debe poder fallar si la implementación es incorrecta.

### Problema 2: Tests que prueban la implementación, no el comportamiento

```javascript
// Malo: prueba cómo se hace, no qué hace
it('debería llamar a parseFloat', () => {
  const spy = vi.spyOn(global, 'parseFloat');
  calculateTotal([{ price: '10.5' }]);
  expect(spy).toHaveBeenCalled();
});

// Bueno: prueba el resultado esperado
it('debería sumar correctamente precios en formato string', () => {
  expect(calculateTotal([{ price: '10.5' }, { price: '20.0' }])).toBe(30.5);
});
```

### Problema 3: Mocks incorrectos

Los LLMs a veces generan mocks que no representan fielmente el comportamiento real de las dependencias. Verifica siempre que los mocks sean realistas.

### Checklist para revisar tests generados

Antes de hacer commit de los tests que genera la IA, verifica:

- [ ] ¿El test puede fallar? Cambia temporalmente la implementación para verificarlo
- [ ] ¿El nombre del test describe el comportamiento, no la implementación?
- [ ] ¿Los mocks representan el comportamiento real de las dependencias?
- [ ] ¿Se limpian los mocks entre tests (`beforeEach`, `afterEach`)?
- [ ] ¿Los tests son independientes entre sí (no dependen del orden de ejecución)?
- [ ] ¿Hay casos límite adicionales que el desarrollador puede identificar y la IA no?

## TDD asistido por IA

El Test-Driven Development (TDD) clásico propone escribir el test antes que la implementación. Con IA, hay una variante muy productiva que llamo **TDD asistido**.

### Flujo de trabajo

**Paso 1: Describe el comportamiento**

En lugar de describir cómo debe implementarse la función, describe qué debe hacer:

```
Necesito una función validateEmail en TypeScript que:
- Reciba un string y devuelva un objeto { valid: boolean, error?: string }
- Acepte emails con formatos estándar (usuario@dominio.tld)
- Rechace: strings vacíos, sin @, sin dominio, con espacios
- Los errores deben ser mensajes en español descriptivos

Primero genera los tests en Vitest. NO generes la implementación todavía.
```

**Paso 2: Revisa y completa los tests**

Revisa los tests generados, añade los casos que falten, y ejecuta:

```bash
npm run test -- --watch
```

Todos deben fallar porque la implementación no existe.

**Paso 3: Pide la implementación**

```
Ahora implementa la función validateEmail en TypeScript para que pasen todos los tests.
```

**Paso 4: Itera**

Si algunos tests fallan, dale el output de los tests fallidos a la IA para que corrija la implementación.

Este flujo tiene varias ventajas: los tests definen el contrato de la función antes de implementarla, la implementación se optimiza para pasar los tests (no al revés), y tienes cobertura total desde el primer momento.

## Ejemplo práctico completo

Supongamos que tenemos esta función:

```typescript
export function formatCurrency(
  amount: number,
  currency: string = 'EUR',
  locale: string = 'es-ES'
): string {
  if (typeof amount !== 'number' || isNaN(amount)) {
    throw new Error('El importe debe ser un número válido');
  }
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(amount);
}
```

Los tests generados por IA (después de revisarlos y mejorarlos):

```typescript
import { describe, it, expect } from 'vitest';
import { formatCurrency } from './formatCurrency';

describe('formatCurrency', () => {
  describe('formato por defecto (EUR, es-ES)', () => {
    it('debería formatear un número entero positivo', () => {
      expect(formatCurrency(100)).toBe('100,00 €');
    });

    it('debería formatear un número con decimales', () => {
      expect(formatCurrency(99.99)).toBe('99,99 €');
    });

    it('debería formatear cero', () => {
      expect(formatCurrency(0)).toBe('0,00 €');
    });

    it('debería formatear números negativos', () => {
      expect(formatCurrency(-50)).toBe('-50,00 €');
    });
  });

  describe('divisas y locales personalizados', () => {
    it('debería formatear en USD con locale americano', () => {
      expect(formatCurrency(1000, 'USD', 'en-US')).toBe('$1,000.00');
    });
  });

  describe('manejo de errores', () => {
    it('debería lanzar error cuando el importe no es un número', () => {
      expect(() => formatCurrency('100' as any)).toThrow(
        'El importe debe ser un número válido'
      );
    });

    it('debería lanzar error cuando el importe es NaN', () => {
      expect(() => formatCurrency(NaN)).toThrow(
        'El importe debe ser un número válido'
      );
    });
  });
});
```

## Integración en el CI/CD

Una vez que tienes tests generados y revisados, es crítico que se ejecuten automáticamente. Añade a tu pipeline de CI:

```yaml
# .github/workflows/tests.yml
- name: Run tests
  run: npm run test:coverage

- name: Check coverage threshold
  run: npm run test:coverage -- --coverage.thresholds.lines 80
```

Establecer un threshold mínimo de cobertura en el CI asegura que la cobertura no baje aunque alguien añada código sin tests.

## Conclusión

Los LLMs han reducido drásticamente el coste de generar tests, pero no han eliminado la necesidad de criterio técnico para revisarlos. El flujo más productivo que he encontrado es: pedir tests a la IA, revisarlos críticamente con el checklist, añadir los casos que falten, y ejecutarlos en el CI para que sean la red de seguridad permanente del proyecto.

Lo más importante es empezar. Elige un módulo que sabes que necesita más cobertura de tests, dedica una hora a generar y revisar tests con la IA, y mide el impacto. La diferencia que hace tener una buena cobertura de tests en la confianza para hacer cambios y migraciones es enorme.
