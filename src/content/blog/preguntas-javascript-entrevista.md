---
title: "Las 20 preguntas más comunes sobre JavaScript en entrevistas técnicas"
description: "Respuestas completas a las 20 preguntas de JavaScript más frecuentes en entrevistas: closures, hoisting, event loop, promises, prototypes y más."
pubDate: 2025-03-05
author: "Pablo Alcalde García"
tags: ["javascript", "entrevistas", "frontend", "programacion"]
draft: false
---

Si te preparas para una entrevista de desarrollo frontend o full-stack, hay una cosa casi garantizada: te harán preguntas sobre JavaScript. No importa si el puesto es de React, Vue, Angular o Svelte; el lenguaje subyacente sigue siendo JS y los entrevistadores quieren saber que tienes las bases sólidas. En este artículo recopilo las 20 preguntas que más se repiten, con respuestas detalladas y ejemplos de código claros.

---

## 1. ¿Qué es un closure en JavaScript?

Un closure es la capacidad de una función de recordar y acceder a las variables del ámbito exterior en el que fue definida, incluso después de que ese ámbito haya terminado de ejecutarse.

```javascript
function crearContador() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const contador = crearContador();
contador(); // 1
contador(); // 2
contador(); // 3
```

La función interna tiene acceso a `count` aunque `crearContador` ya terminó. Esto es un closure. Se usan mucho para encapsular estado, crear funciones de fábrica y en el patrón módulo.

---

## 2. ¿Qué es el hoisting?

El hoisting es el comportamiento de JavaScript de mover las declaraciones (no las inicializaciones) al inicio del ámbito antes de ejecutar el código.

```javascript
console.log(nombre); // undefined (no error)
var nombre = "Pablo";

saludar(); // funciona
function saludar() {
  console.log("Hola");
}
```

Las variables con `var` se elevan pero su valor no, por eso `undefined`. Las funciones declaradas se elevan completamente. Las variables con `let` y `const` también se elevan pero entran en la "temporal dead zone" y dan error si las usas antes de declararlas.

---

## 3. ¿Cómo funciona el Event Loop?

JavaScript es single-threaded, lo que significa que ejecuta una cosa a la vez. El event loop es el mecanismo que le permite manejar operaciones asíncronas sin bloquearse.

El flujo es: el código síncrono se ejecuta en el Call Stack. Las operaciones asíncronas (timers, fetch, eventos) se envían a las Web APIs. Cuando terminan, sus callbacks van a la Callback Queue (o Microtask Queue para Promises). El event loop comprueba constantemente si el Call Stack está vacío y, si lo está, mueve el siguiente callback al stack.

Las microtareas (Promise callbacks) tienen prioridad sobre las macrotareas (setTimeout, setInterval).

---

## 4. ¿Cuál es la diferencia entre `==` y `===`?

`==` compara valores con coerción de tipos. `===` compara valores Y tipos sin coerción.

```javascript
0 == false;  // true (coerción: false se convierte a 0)
0 === false; // false (tipos distintos: number vs boolean)
"" == false; // true
"" === false; // false
```

La regla práctica: usa siempre `===` salvo que tengas una razón muy específica para no hacerlo.

---

## 5. ¿Qué es `this` en JavaScript?

`this` es una referencia al contexto de ejecución actual y su valor depende de cómo se llama a la función, no de dónde se define.

- En el contexto global: `this` es `window` (navegador) o `global` (Node)
- En un método de objeto: `this` es el objeto que llama al método
- En una función regular (modo estricto): `this` es `undefined`
- En una arrow function: `this` es el `this` del contexto léxico donde se definió (no tiene su propio `this`)

```javascript
const obj = {
  nombre: "Pablo",
  saludar: function () {
    console.log(this.nombre); // "Pablo"
  },
  saludarArrow: () => {
    console.log(this.nombre); // undefined (this es el global)
  },
};
```

---

## 6. ¿Cuál es la diferencia entre `let`, `const` y `var`?

- `var`: ámbito de función, se puede re-declarar, se puede reasignar, hoisting completo
- `let`: ámbito de bloque, no se puede re-declarar, se puede reasignar, temporal dead zone
- `const`: ámbito de bloque, no se puede re-declarar, no se puede reasignar (pero sí mutar objetos/arrays)

```javascript
const arr = [1, 2, 3];
arr.push(4); // esto funciona
arr = []; // esto da error
```

---

## 7. ¿Qué son las Promises? ¿Y async/await?

Una Promise es un objeto que representa el resultado eventual de una operación asíncrona. Puede estar en estado pending, fulfilled o rejected.

```javascript
const promesa = fetch("https://api.ejemplo.com/datos")
  .then((res) => res.json())
  .then((datos) => console.log(datos))
  .catch((error) => console.error(error));
```

`async/await` es azúcar sintáctico sobre Promises que hace el código asíncrono más legible:

```javascript
async function obtenerDatos() {
  try {
    const res = await fetch("https://api.ejemplo.com/datos");
    const datos = await res.json();
    console.log(datos);
  } catch (error) {
    console.error(error);
  }
}
```

Ambos hacen lo mismo; `async/await` es más legible para flujos complejos.

---

## 8. ¿Qué es la herencia prototípica?

En JavaScript, los objetos tienen una propiedad interna `[[Prototype]]` que apunta a otro objeto. Cuando accedes a una propiedad que no existe en el objeto, JavaScript la busca en la cadena de prototipos.

```javascript
const animal = {
  respirar() {
    return "respirando";
  },
};

const perro = Object.create(animal);
perro.ladrar = function () {
  return "guau";
};

perro.respirar(); // "respirando" (heredado del prototipo)
```

Las clases de ES6 son azúcar sintáctico sobre este sistema de prototipos.

---

## 9. ¿Cuál es la diferencia entre `null` y `undefined`?

- `undefined`: una variable ha sido declarada pero no tiene valor asignado. También es lo que devuelven las funciones que no tienen `return` explícito.
- `null`: es un valor explícito que significa "ausencia intencional de valor". Lo asignas tú.

```javascript
let variable; // undefined
let otro = null; // null (asignado intencionalmente)

typeof undefined; // "undefined"
typeof null; // "object" (bug histórico de JS)
```

---

## 10. ¿Cómo funciona el spread operator y el rest parameter?

El spread (`...`) expande un iterable en sus elementos individuales. El rest (`...`) agrupa varios argumentos en un array.

```javascript
// Spread
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

const obj1 = { a: 1 };
const obj2 = { ...obj1, b: 2 }; // { a: 1, b: 2 }

// Rest
function suma(...numeros) {
  return numeros.reduce((acc, n) => acc + n, 0);
}
suma(1, 2, 3, 4); // 10
```

---

## 11. ¿Qué es el debounce y el throttle?

Ambas son técnicas para controlar la frecuencia de ejecución de una función.

**Debounce**: espera un tiempo de inactividad antes de ejecutar. Útil para búsquedas en tiempo real (no consultes la API con cada pulsación de teclado).

**Throttle**: garantiza que la función se ejecute como máximo una vez cada X milisegundos. Útil para eventos de scroll o resize.

```javascript
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

---

## 12. ¿Cómo funciona `Array.prototype.map`, `filter` y `reduce`?

Son métodos de arrays de orden superior (reciben funciones como argumentos):

- `map`: transforma cada elemento y devuelve un nuevo array del mismo tamaño
- `filter`: devuelve un nuevo array solo con los elementos que pasan el predicado
- `reduce`: acumula los elementos en un único valor

```javascript
const nums = [1, 2, 3, 4, 5];

nums.map((n) => n * 2);           // [2, 4, 6, 8, 10]
nums.filter((n) => n % 2 === 0);  // [2, 4]
nums.reduce((acc, n) => acc + n, 0); // 15
```

---

## 13. ¿Qué es la inmutabilidad y por qué importa?

La inmutabilidad significa que un valor no puede cambiar una vez creado. En lugar de mutar, creas nuevas versiones.

Es importante porque previene efectos secundarios inesperados, facilita el rastreo de cambios y es fundamental para patrones reactivos (React, Redux).

```javascript
// Mutable (evitar)
const arr = [1, 2, 3];
arr.push(4);

// Inmutable (preferir)
const nuevoArr = [...arr, 4];
```

---

## 14. ¿Qué son los Symbols en JavaScript?

`Symbol` es un tipo primitivo único e inmutable. Cada symbol es garantizadamente único, lo que lo hace ideal para crear propiedades de objeto que no colisionen.

```javascript
const id = Symbol("id");
const otro = Symbol("id");
id === otro; // false (son únicos)
```

Se usan mucho en el interior de los frameworks y para definir comportamientos personalizados mediante well-known symbols (`Symbol.iterator`, `Symbol.toPrimitive`, etc.).

---

## 15. ¿Cuál es la diferencia entre `call`, `apply` y `bind`?

Los tres sirven para establecer explícitamente el valor de `this`:

- `call`: llama la función inmediatamente, los argumentos se pasan individualmente
- `apply`: llama la función inmediatamente, los argumentos se pasan como array
- `bind`: devuelve una nueva función con `this` fijado, no la ejecuta

```javascript
function saludar(ciudad) {
  return `Hola, soy ${this.nombre} de ${ciudad}`;
}

const persona = { nombre: "Pablo" };

saludar.call(persona, "Madrid");        // llama inmediatamente
saludar.apply(persona, ["Madrid"]);     // llama inmediatamente con array
const fn = saludar.bind(persona);       // devuelve función nueva
fn("Madrid");                           // ejecutas cuando quieras
```

---

## 16. ¿Qué es un generator en JavaScript?

Una función generadora puede pausar y reanudar su ejecución usando `yield`. Devuelve un iterador.

```javascript
function* contador() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const gen = contador();
gen.next().value; // 0
gen.next().value; // 1
gen.next().value; // 2
```

Son la base de async/await y son útiles para manejar flujos de datos infinitos o lazy.

---

## 17. ¿Qué es el optional chaining (`?.`)?

Es una forma segura de acceder a propiedades anidadas sin lanzar error si algún nivel es `null` o `undefined`.

```javascript
const usuario = { perfil: { nombre: "Pablo" } };

// Sin optional chaining
const nombre = usuario && usuario.perfil && usuario.perfil.nombre;

// Con optional chaining
const nombre = usuario?.perfil?.nombre; // "Pablo"
const email = usuario?.contacto?.email; // undefined (no error)
```

---

## 18. ¿Cómo funciona la destructuring assignment?

Permite extraer valores de arrays u objetos en variables de forma concisa.

```javascript
// Objetos
const { nombre, edad, ciudad = "Madrid" } = { nombre: "Pablo", edad: 30 };

// Arrays
const [primero, segundo, ...resto] = [1, 2, 3, 4, 5];

// En parámetros de función
function mostrar({ nombre, edad }) {
  console.log(`${nombre} tiene ${edad} años`);
}
```

---

## 19. ¿Qué son los WeakMap y WeakSet?

Son versiones "débiles" de Map y Set. Las referencias que almacenan son débiles, lo que significa que no impiden que el garbage collector elimine los objetos referenciados.

Se usan cuando quieres asociar datos a objetos sin provocar memory leaks, especialmente en el contexto de DOM nodes o caches privadas.

---

## 20. ¿Cuál es la diferencia entre función declarada y función expresión?

```javascript
// Función declarada (se eleva completamente con hoisting)
function saludar() { return "hola"; }

// Función expresión (no se eleva, solo la variable con var)
const despedir = function () { return "adiós"; };

// Arrow function (expresión, no tiene su propio this ni arguments)
const gritar = () => "HI!";
```

Las arrow functions no pueden usarse como constructores, no tienen `arguments` object propio y no tienen `prototype`.

---

## Conclusión

Estas 20 preguntas cubren el núcleo de lo que evalúan en la mayoría de entrevistas de JavaScript. No las memorices de forma mecánica: entiéndelas, juega con los ejemplos en la consola del navegador y construye tu propia explicación de cada concepto. Cuando puedes explicar algo con tus propias palabras y un ejemplo que tú mismo construiste, significa que realmente lo entiendes. Y eso se nota en la entrevista.
