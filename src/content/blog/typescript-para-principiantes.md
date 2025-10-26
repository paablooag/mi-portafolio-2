---
title: "TypeScript para principiantes: Guía completa desde cero"
description: "Aprende TypeScript desde cero: tipos básicos, interfaces, clases, generics y cómo integrarlo en proyectos React, Vue y Node.js. Guía práctica para desarrolladores."
pubDate: 2025-01-15T00:00:00.000Z
tags: ["TypeScript", "JavaScript", "Tipos", "Desarrollo", "Frontend"]
---

# TypeScript para principiantes: Guía completa desde cero

TypeScript está revolucionando el desarrollo web moderno. Te guío paso a paso para dominar TypeScript desde cero y aplicarlo en tus proyectos.

## ¿Qué es TypeScript?

TypeScript es un superset de JavaScript que añade:

```markdown
CARACTERÍSTICAS PRINCIPALES:
- Tipado estático
- Detección de errores en tiempo de compilación
- Mejor autocompletado
- Refactoring seguro
- Documentación viva del código

BENEFICIOS:
- Menos bugs en producción
- Mejor experiencia de desarrollo
- Código más mantenible
- Mejor colaboración en equipo
- Escalabilidad mejorada
```

## Configuración inicial

### 1. Instalación

```bash
# Instalación global
npm install -g typescript

# Verificar instalación
tsc --version

# Inicializar proyecto
tsc --init
```

### 2. Configuración básica (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 3. Scripts de package.json

```json
{
  "scripts": {
    "build": "tsc",
    "watch": "tsc --watch",
    "start": "node dist/index.js",
    "dev": "ts-node src/index.ts"
  }
}
```

## Tipos básicos

### 1. Tipos primitivos

```typescript
// Números
let age: number = 25;
let price: number = 19.99;

// Strings
let name: string = "Juan";
let message: string = `Hola ${name}`;

// Booleanos
let isActive: boolean = true;
let isCompleted: boolean = false;

// Arrays
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Ana", "Carlos", "María"];

// Tuplas
let person: [string, number] = ["Juan", 25];
let coordinates: [number, number] = [10, 20];
```

### 2. Tipos especiales

```typescript
// Any (evitar usar)
let anything: any = "puede ser cualquier cosa";
anything = 42;
anything = true;

// Unknown (más seguro que any)
let userInput: unknown = getUserInput();
if (typeof userInput === "string") {
  console.log(userInput.toUpperCase());
}

// Void
function logMessage(): void {
  console.log("Mensaje loggeado");
}

// Never
function throwError(): never {
  throw new Error("Error fatal");
}

// Null y Undefined
let nullValue: null = null;
let undefinedValue: undefined = undefined;
```

### 3. Union Types

```typescript
// Múltiples tipos posibles
let id: string | number = "abc123";
id = 123;

// Con arrays
let mixedArray: (string | number)[] = ["hello", 42, "world", 100];

// Con funciones
function formatId(id: string | number): string {
  return `ID: ${id}`;
}
```

## Interfaces

### 1. Interfaces básicas

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Propiedad opcional
}

// Uso de la interfaz
const user: User = {
  id: 1,
  name: "Juan Pérez",
  email: "juan@email.com"
  // age es opcional
};

// Acceso a propiedades
console.log(user.name); // "Juan Pérez"
console.log(user.age); // undefined
```

### 2. Interfaces con métodos

```typescript
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
  multiply(a: number, b: number): number;
}

const calc: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b
};
```

### 3. Interfaces extendidas

```typescript
interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

const myDog: Dog = {
  name: "Max",
  age: 3,
  breed: "Golden Retriever",
  bark: () => console.log("Woof!")
};
```

## Clases

### 1. Clases básicas

```typescript
class Person {
  // Propiedades
  name: string;
  age: number;
  
  // Constructor
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  
  // Métodos
  greet(): string {
    return `Hola, soy ${this.name}`;
  }
  
  getAge(): number {
    return this.age;
  }
}

// Uso de la clase
const person = new Person("María", 30);
console.log(person.greet()); // "Hola, soy María"
```

### 2. Modificadores de acceso

```typescript
class BankAccount {
  private balance: number;
  protected accountNumber: string;
  public owner: string;
  
  constructor(owner: string, accountNumber: string) {
    this.owner = owner;
    this.accountNumber = accountNumber;
    this.balance = 0;
  }
  
  public deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
    }
  }
  
  public getBalance(): number {
    return this.balance;
  }
  
  private validateAmount(amount: number): boolean {
    return amount > 0;
  }
}
```

### 3. Herencia

```typescript
class Vehicle {
  protected brand: string;
  protected year: number;
  
  constructor(brand: string, year: number) {
    this.brand = brand;
    this.year = year;
  }
  
  start(): void {
    console.log("Vehiculo iniciado");
  }
}

class Car extends Vehicle {
  private doors: number;
  
  constructor(brand: string, year: number, doors: number) {
    super(brand, year);
    this.doors = doors;
  }
  
  start(): void {
    console.log(`Coche ${this.brand} iniciado`);
  }
  
  getDoors(): number {
    return this.doors;
  }
}
```

## Funciones

### 1. Funciones con tipos

```typescript
// Función básica
function add(a: number, b: number): number {
  return a + b;
}

// Función con parámetros opcionales
function greet(name: string, age?: number): string {
  if (age) {
    return `Hola ${name}, tienes ${age} años`;
  }
  return `Hola ${name}`;
}

// Función con parámetros por defecto
function createUser(name: string, role: string = "user"): object {
  return { name, role };
}

// Función con parámetros rest
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}
```

### 2. Arrow functions

```typescript
// Arrow function básica
const multiply = (a: number, b: number): number => a * b;

// Arrow function con cuerpo
const processUser = (user: User): string => {
  const { name, email } = user;
  return `Procesando usuario: ${name} (${email})`;
};

// Arrow function como callback
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((num: number): number => num * 2);
```

### 3. Funciones como tipos

```typescript
// Tipo de función
type MathOperation = (a: number, b: number) => number;

// Uso del tipo
const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;

// Función que recibe otra función
function calculate(a: number, b: number, operation: MathOperation): number {
  return operation(a, b);
}

// Uso
const result = calculate(10, 5, add); // 15
```

## Generics

### 1. Generics básicos

```typescript
// Función genérica
function identity<T>(arg: T): T {
  return arg;
}

// Uso
const stringResult = identity<string>("hello");
const numberResult = identity<number>(42);

// Inferencia de tipos
const inferred = identity("hello"); // TypeScript infiere que es string
```

### 2. Generics con interfaces

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Uso
const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "Juan", email: "juan@email.com" },
  status: 200,
  message: "Success"
};

const productResponse: ApiResponse<Product> = {
  data: { id: 1, name: "Laptop", price: 999 },
  status: 200,
  message: "Success"
};
```

### 3. Generics con clases

```typescript
class Repository<T> {
  private items: T[] = [];
  
  add(item: T): void {
    this.items.push(item);
  }
  
  getById(id: number): T | undefined {
    return this.items.find((item: any) => item.id === id);
  }
  
  getAll(): T[] {
    return this.items;
  }
}

// Uso
const userRepo = new Repository<User>();
userRepo.add({ id: 1, name: "Juan", email: "juan@email.com" });
```

## Enums

### 1. Enums numéricos

```typescript
enum Status {
  Pending,
  InProgress,
  Completed,
  Cancelled
}

// Uso
const taskStatus = Status.InProgress;
console.log(taskStatus); // 1

// Acceso por valor
console.log(Status[1]); // "InProgress"
```

### 2. Enums de strings

```typescript
enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue"
}

// Uso
const selectedColor = Color.Red;
console.log(selectedColor); // "red"
```

### 3. Enums con valores mixtos

```typescript
enum LogLevel {
  Error = 0,
  Warn = 1,
  Info = "info",
  Debug = "debug"
}
```

## Módulos

### 1. Exportación

```typescript
// Exportación nombrada
export const PI = 3.14159;
export function calculateArea(radius: number): number {
  return PI * radius * radius;
}

// Exportación por defecto
export default class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }
}
```

### 2. Importación

```typescript
// Importación nombrada
import { PI, calculateArea } from './math';

// Importación por defecto
import Calculator from './calculator';

// Importación con alias
import { calculateArea as calcArea } from './math';

// Importación de todo
import * as MathUtils from './math';
```

## Integración con frameworks

### 1. React con TypeScript

```typescript
import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserListProps {
  users: User[];
  onUserSelect: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onUserSelect }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  useEffect(() => {
    if (users.length > 0) {
      setSelectedUser(users[0]);
    }
  }, [users]);
  
  return (
    <div>
      {users.map(user => (
        <div key={user.id} onClick={() => onUserSelect(user)}>
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;
```

### 2. Vue con TypeScript

```typescript
<template>
  <div>
    <h1>{{ user.name }}</h1>
    <p>{{ user.email }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface User {
  id: number;
  name: string;
  email: string;
}

const user = ref<User>({
  id: 1,
  name: 'Juan Pérez',
  email: 'juan@email.com'
});

onMounted(() => {
  console.log('Component mounted');
});
</script>
```

### 3. Node.js con TypeScript

```typescript
import express, { Request, Response } from 'express';

interface User {
  id: number;
  name: string;
  email: string;
}

const app = express();
app.use(express.json());

app.get('/users', (req: Request, res: Response) => {
  const users: User[] = [
    { id: 1, name: 'Juan', email: 'juan@email.com' },
    { id: 2, name: 'María', email: 'maria@email.com' }
  ];
  
  res.json(users);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## Mejores prácticas

### 1. Configuración estricta

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### 2. Naming conventions

```typescript
// Interfaces con PascalCase
interface UserData {
  name: string;
  email: string;
}

// Tipos con PascalCase
type UserStatus = 'active' | 'inactive';

// Enums con PascalCase
enum UserRole {
  Admin = 'admin',
  User = 'user'
}

// Variables con camelCase
const userName = 'Juan';
const userEmail = 'juan@email.com';
```

### 3. Documentación con JSDoc

```typescript
/**
 * Calcula el área de un círculo
 * @param radius - El radio del círculo
 * @returns El área del círculo
 */
function calculateCircleArea(radius: number): number {
  return Math.PI * radius * radius;
}

/**
 * Representa un usuario del sistema
 */
interface User {
  /** ID único del usuario */
  id: number;
  /** Nombre completo del usuario */
  name: string;
  /** Email del usuario */
  email: string;
}
```

## Herramientas y extensiones

### 1. VS Code extensions

```markdown
EXTENSIONES RECOMENDADAS:
- TypeScript Importer
- Bracket Pair Colorizer
- Auto Rename Tag
- Path Intellisense
- TypeScript Hero
```

### 2. Herramientas de desarrollo

```markdown
HERRAMIENTAS ÚTILES:
- ts-node (ejecutar TypeScript directamente)
- tsx (alternativa moderna a ts-node)
- TypeScript Playground (práctica online)
- ESLint con reglas TypeScript
- Prettier para formateo
```

## Errores comunes y soluciones

### 1. Errores de tipos

```typescript
// ❌ Error común
let user = { name: "Juan" };
user.age = 25; // Error: Property 'age' does not exist

// ✅ Solución
let user: { name: string; age?: number } = { name: "Juan" };
user.age = 25; // OK
```

### 2. Problemas con any

```typescript
// ❌ Uso excesivo de any
function processData(data: any): any {
  return data.someProperty;
}

// ✅ Tipos específicos
function processData(data: { someProperty: string }): string {
  return data.someProperty;
}
```

### 3. Problemas con null/undefined

```typescript
// ❌ No manejar null/undefined
function getLength(str: string): number {
  return str.length; // Error si str es null
}

// ✅ Manejo seguro
function getLength(str: string | null): number {
  return str?.length ?? 0;
}
```

## Conclusión

TypeScript es una herramienta poderosa que mejora significativamente la experiencia de desarrollo y la calidad del código. Con esta guía tienes los fundamentos necesarios para empezar a usarlo en tus proyectos.

**Beneficios clave**:
- Detección temprana de errores
- Mejor autocompletado
- Refactoring seguro
- Código más mantenible
- Mejor colaboración en equipo

**Próximos pasos**:
1. Configura TypeScript en un proyecto existente
2. Empieza con tipos básicos
3. Añade interfaces para objetos complejos
4. Usa generics para código reutilizable
5. Integra con tu framework favorito

**Recuerda**: TypeScript es JavaScript con tipos. No necesitas aprender todo de una vez. Empieza gradualmente y ve añadiendo tipos conforme te sientas cómodo.

¡TypeScript te ayudará a escribir código más robusto y mantenible!
