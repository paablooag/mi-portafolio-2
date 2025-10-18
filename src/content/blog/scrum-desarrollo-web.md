---
title: "Scrum en desarrollo web: Mi experiencia en Wegow"
description: "Cómo aplicamos Scrum en Wegow para entregar valor de forma iterativa y mejorar la colaboración del equipo."
pubDate: 2025-10-19T00:00:00.000Z
tags: ["Scrum", "Agile", "Team", "Workflow"]
---

# Scrum en desarrollo web: Mi experiencia en Wegow

Así aplicamos Scrum en [Wegow](https://wegow.com) y cómo mejoró nuestra productividad.

## Nuestro Sprint

- **Duración**: 2 semanas
- **Planning**: Lunes 9:00 AM
- **Daily**: Todos los días 9:30 AM (15 min)
- **Review**: Viernes de cierre
- **Retro**: Después del review

## Sprint Planning

### Estructura

1. **Product Owner** presenta prioridades
2. Equipo estima historias (Planning Poker)
3. Seleccionamos historias para el sprint
4. Definimos sprint goal

### Estimación

Usamos Fibonacci modificado:

- 1 punto: < 2 horas
- 2 puntos: 2-4 horas
- 3 puntos: medio día
- 5 puntos: 1 día
- 8 puntos: 2-3 días
- 13 puntos: > 3 días (dividir)

## Daily Standup

Las tres preguntas:

1. ¿Qué hice ayer?
2. ¿Qué haré hoy?
3. ¿Tengo algún bloqueador?

**Tips:**
- Máximo 15 minutos
- De pie (si es presencial)
- Enfocado en el sprint goal
- Discusiones profundas → offline

## Herramientas

### Jira

```
Backlog → To Do → In Progress → Review → Done
```

### Taiga

Alternativa open-source que también usamos.

### Slack

- Canal #daily para standups async
- Canal #sprint para actualizaciones
- Hilos para discusiones específicas

## Definition of Done

Una historia está Done cuando:

- [ ] Código revisado (PR aprobado)
- [ ] Tests pasan
- [ ] Sin linter errors
- [ ] Documentación actualizada
- [ ] Deployado en staging
- [ ] Product Owner acepta

## Retrospectiva

### Formato Start-Stop-Continue

**Start**: ¿Qué deberíamos empezar a hacer?
**Stop**: ¿Qué deberíamos dejar de hacer?
**Continue**: ¿Qué funciona bien?

### Acciones concretas

Cada retro genera 2-3 acciones:
- Responsable asignado
- Fecha límite
- Medible

## Velocity del equipo

```
Sprint 1: 21 puntos
Sprint 2: 25 puntos
Sprint 3: 23 puntos
Promedio: 23 puntos
```

Usamos esto para planning futuro.

## Beneficios que observamos

- ✅ Entregas predecibles
- ✅ Mejor comunicación
- ✅ Menos sorpresas
- ✅ Mejora continua
- ✅ Equipo empoderado

## Desafíos

1. **Estimaciones**: Mejoraron con el tiempo
2. **Interrupciones**: Protegemos el sprint
3. **Scope creep**: PO firme en prioridades

## Conclusión

Scrum no es perfecto, pero nos hizo 10x más eficientes. La clave es adaptarlo a tu equipo.

