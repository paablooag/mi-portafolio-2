---
title: "Mi setup de VS Code para desarrollo frontend 2024"
description: "Configuración completa de VS Code: extensiones, atajos y configuración que uso diariamente para desarrollo frontend."
pubDate: 2025-10-18T00:00:00.000Z
tags: ["VS Code", "Tools", "Productivity", "Frontend"]
---

# Mi setup de VS Code para desarrollo frontend 2024

La configuración de VS Code que me hace 10x más productivo.

## Extensiones esenciales

### Vue/Nuxt

- **Vue - Official** (anteriormente Volar)
- **Vue VSCode Snippets**
- **Nuxt 3 Snippets**

### General Development

- **ESLint** - Linting
- **Prettier** - Formateo de código
- **EditorConfig** - Consistencia de estilo
- **Auto Rename Tag** - Renombra tags HTML
- **Path Intellisense** - Autocomplete de rutas

### Git

- **GitLens** - Superpoderes de Git
- **Git Graph** - Visualizar branches
- **GitHub Copilot** - AI assistant

### Productivity

- **Todo Tree** - Encuentra TODOs
- **Better Comments** - Comentarios coloreados
- **Error Lens** - Muestra errores inline
- **Import Cost** - Tamaño de imports

### CSS/Tailwind

- **Tailwind CSS IntelliSense** - Autocomplete
- **PostCSS Language Support**

### Debugging

- **JavaScript Debugger**
- **Vue DevTools**

## settings.json

```json
{
  // Editor
  "editor.fontSize": 14,
  "editor.fontFamily": "Fira Code, Consolas, monospace",
  "editor.fontLigatures": true,
  "editor.lineHeight": 24,
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "editor.minimap.enabled": false,
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": true,
  
  // Formateo
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  
  // Vue
  "[vue]": {
    "editor.defaultFormatter": "Vue.volar"
  },
  
  // JavaScript/TypeScript
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  
  // Tailwind
  "tailwindCSS.experimental.classRegex": [
    ["class: ['\"]([^'\"]*)", "['\"]([^'\"]*)"],
    ["tw`([^`]*)", "([^`]*)"]
  ],
  
  // Files
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  "files.exclude": {
    "**/.git": true,
    "**/.nuxt": true,
    "**/node_modules": true,
    "**/.DS_Store": true
  },
  
  // Terminal
  "terminal.integrated.fontSize": 13,
  "terminal.integrated.fontFamily": "Fira Code",
  
  // Git
  "git.autofetch": true,
  "git.confirmSync": false,
  "git.enableSmartCommit": true,
  
  // Otros
  "explorer.confirmDelete": false,
  "explorer.confirmDragAndDrop": false,
  "workbench.colorTheme": "One Dark Pro",
  "workbench.iconTheme": "material-icon-theme",
  "breadcrumbs.enabled": true
}
```

## Atajos de teclado favoritos

### Navegación

- `Cmd/Ctrl + P` - Quick Open
- `Cmd/Ctrl + Shift + P` - Command Palette
- `Cmd/Ctrl + B` - Toggle Sidebar
- `Cmd/Ctrl + J` - Toggle Terminal
- `Cmd/Ctrl + \` - Split Editor

### Edición

- `Alt + ↑/↓` - Mover línea arriba/abajo
- `Shift + Alt + ↑/↓` - Duplicar línea
- `Cmd/Ctrl + D` - Seleccionar siguiente ocurrencia
- `Cmd/Ctrl + Shift + L` - Seleccionar todas las ocurrencias
- `Cmd/Ctrl + /` - Toggle comment

### Multi-cursor

- `Alt + Click` - Añadir cursor
- `Cmd/Ctrl + Alt + ↑/↓` - Añadir cursor arriba/abajo

### Búsqueda

- `Cmd/Ctrl + F` - Buscar
- `Cmd/Ctrl + H` - Reemplazar
- `Cmd/Ctrl + Shift + F` - Buscar en archivos

## Snippets personalizados

```json
// vue.json
{
  "Vue 3 Composition API": {
    "prefix": "vbase",
    "body": [
      "<script setup>",
      "$1",
      "</script>",
      "",
      "<template>",
      "  <div>",
      "    $2",
      "  </div>",
      "</template>",
      "",
      "<style scoped>",
      "$3",
      "</style>"
    ]
  },
  
  "Vue Composable": {
    "prefix": "vcomposable",
    "body": [
      "import { ref, computed } from 'vue'",
      "",
      "export function use${1:Name}() {",
      "  const ${2:state} = ref($3)",
      "  ",
      "  $4",
      "  ",
      "  return { ${2:state} }",
      "}"
    ]
  }
}
```

## Temas

Mi setup de colores:

- **Tema**: One Dark Pro
- **Icons**: Material Icon Theme
- **Font**: Fira Code (con ligatures)

## Workspace settings

```json
// .vscode/settings.json
{
  "eslint.workingDirectories": ["./"],
  "typescript.tsdk": "node_modules/typescript/lib",
  "vue.inlayHints.inlineHandlerLeading": true,
  "vue.inlayHints.missingProps": true
}
```

## Tasks

```json
// .vscode/tasks.json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "dev",
      "type": "shell",
      "command": "npm run dev",
      "group": {
        "kind": "build",
        "isDefault": true
      }
    }
  ]
}
```

## Launch configurations

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Client: Chrome",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

## Extensiones extra útiles

- **Live Server** - Servidor local
- **REST Client** - Test APIs
- **Code Spell Checker** - Spell checking
- **Markdown All in One** - Markdown tools
- **Peacock** - Colorea workspace

## Shortcuts personalizados

```json
// keybindings.json
[
  {
    "key": "cmd+shift+d",
    "command": "editor.action.duplicateSelection"
  },
  {
    "key": "cmd+k cmd+c",
    "command": "workbench.action.terminal.clear"
  }
]
```

## Tips de productividad

1. **Multi-cursor**: Edita múltiples líneas a la vez
2. **Emmet**: Escribe HTML rápido
3. **Snippets**: Crea templates reutilizables
4. **Zen Mode**: `Cmd+K Z` para focus total
5. **Command Palette**: Accede a todo con `Cmd+Shift+P`

## Conclusión

Un buen setup de VS Code es inversión, no gasto. Estas configuraciones me ahorran horas cada semana.

