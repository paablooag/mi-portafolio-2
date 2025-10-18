---
title: "Git workflow eficiente para equipos ágiles"
description: "El flujo de trabajo con Git que usamos en Wegow para colaborar eficientemente en equipo siguiendo metodologías ágiles."
pubDate: 2025-10-19T00:00:00.000Z
tags: ["Git", "Workflow", "Team", "Best Practices"]
---

# Git workflow eficiente para equipos ágiles

Este es el workflow de Git que usamos en Wegow y funciona perfectamente.

## Estructura de branches

```
main (producción)
  ↑
develop (integración)
  ↑
feature/nombre-feature (desarrollo)
```

## Convenciones de commits

Seguimos Conventional Commits:

```bash
feat: añade botón de compartir en redes sociales
fix: corrige error de scroll en mobile
docs: actualiza README con instrucciones
style: formatea código con prettier
refactor: simplifica lógica de autenticación
test: añade tests para componente Button
chore: actualiza dependencias
```

## Workflow diario

### 1. Crear feature branch

```bash
git checkout develop
git pull origin develop
git checkout -b feature/nueva-funcionalidad
```

### 2. Commits atómicos

```bash
git add .
git commit -m "feat: añade validación de formulario"
git commit -m "test: añade tests para validación"
```

### 3. Mantener actualizado

```bash
# Rebase frecuente con develop
git fetch origin
git rebase origin/develop
```

### 4. Push y PR

```bash
git push origin feature/nueva-funcionalidad
# Crear Pull Request en GitHub/GitLab
```

## Code review checklist

Antes de aprobar un PR verificamos:

- [ ] Código cumple estándares del equipo
- [ ] Tests pasan
- [ ] Sin conflictos
- [ ] Cambios tienen sentido atómico
- [ ] Documentación actualizada
- [ ] Sin console.logs ni debuggers
- [ ] Performance considerada

## Git aliases útiles

```bash
# ~/.gitconfig
[alias]
  co = checkout
  br = branch
  ci = commit
  st = status
  unstage = reset HEAD --
  last = log -1 HEAD
  visual = log --graph --oneline --all
  amend = commit --amend --no-edit
```

## Resolver conflictos

```bash
# Cuando hay conflictos en rebase
git status # ver archivos conflictivos
# Resolver manualmente
git add .
git rebase --continue
```

## Hotfix en producción

```bash
git checkout main
git pull origin main
git checkout -b hotfix/bug-critico
# Fix del bug
git commit -m "fix: soluciona error crítico en checkout"
git checkout main
git merge hotfix/bug-critico
git push origin main
git checkout develop
git merge hotfix/bug-critico
git push origin develop
```

## Git hooks útiles

```javascript
// .husky/pre-commit
npm run lint
npm run test
```

## Mensajes de commit descriptivos

**❌ Malo:**
```bash
git commit -m "fix"
git commit -m "changes"
git commit -m "wip"
```

**✅ Bueno:**
```bash
git commit -m "fix: corrige cálculo de precio total en carrito"
git commit -m "feat: implementa filtro de búsqueda con debounce"
git commit -m "refactor: extrae lógica de validación a composable"
```

## Squash commits antes de merge

```bash
git rebase -i HEAD~3
# Cambiar 'pick' a 'squash' en commits a combinar
```

## Cherry-pick

```bash
# Aplicar commit específico de otra branch
git cherry-pick abc123
```

## Stash para cambios temporales

```bash
git stash save "work in progress on feature X"
git checkout other-branch
# hacer algo
git checkout -
git stash pop
```

## Conclusión

Un buen workflow de Git mejora la colaboración y reduce errores. Estos son estándares que todo equipo debería adoptar.

