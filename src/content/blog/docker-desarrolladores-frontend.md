---
title: "Docker para desarrolladores frontend: Guía completa desde cero"
description: "Aprende Docker desde cero para desarrolladores frontend: contenedores, imágenes, Dockerfile, docker-compose y cómo usarlo en proyectos React, Vue y Angular."
pubDate: 2025-01-15T00:00:00.000Z
tags: ["Docker", "Contenedores", "Frontend", "Desarrollo", "DevOps"]
---

# Docker para desarrolladores frontend: Guía completa desde cero

Docker está revolucionando cómo desarrollamos y desplegamos aplicaciones. Te guío paso a paso para dominar Docker en el desarrollo frontend.

## ¿Qué es Docker?

### Conceptos básicos

```markdown
DOCKER:
- Plataforma de contenedores
- Empaquetado de aplicaciones
- Entornos consistentes
- Aislamiento de procesos
- Portabilidad entre sistemas

BENEFICIOS PARA FRONTEND:
- Entornos de desarrollo consistentes
- Despliegue simplificado
- Aislamiento de dependencias
- Colaboración mejorada
- Escalabilidad fácil
```

### Terminología esencial

```markdown
CONCEPTOS CLAVE:
- Container: Instancia ejecutable de una imagen
- Image: Plantilla para crear contenedores
- Dockerfile: Instrucciones para construir imágenes
- Registry: Repositorio de imágenes
- Volume: Almacenamiento persistente
- Network: Comunicación entre contenedores
```

## Instalación y configuración

### 1. Instalación de Docker

```bash
# Windows (Docker Desktop)
# Descargar desde: https://www.docker.com/products/docker-desktop

# macOS (Docker Desktop)
# Descargar desde: https://www.docker.com/products/docker-desktop

# Linux (Ubuntu/Debian)
sudo apt update
sudo apt install docker.io
sudo systemctl start docker
sudo systemctl enable docker

# Verificar instalación
docker --version
docker-compose --version
```

### 2. Configuración inicial

```bash
# Verificar que Docker funciona
docker run hello-world

# Ver imágenes disponibles
docker images

# Ver contenedores ejecutándose
docker ps

# Ver todos los contenedores
docker ps -a
```

## Dockerfile para frontend

### 1. Dockerfile básico para React

```dockerfile
# Usar imagen base de Node.js
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
```

### 2. Dockerfile optimizado para producción

```dockerfile
# Etapa de construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiar archivos construidos
COPY --from=builder /app/build /usr/share/nginx/html

# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer puerto
EXPOSE 80

# Comando para ejecutar nginx
CMD ["nginx", "-g", "daemon off;"]
```

### 3. Dockerfile para Vue.js

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "serve"]
```

### 4. Dockerfile para Angular

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

EXPOSE 4200

CMD ["npm", "start"]
```

## Docker Compose para desarrollo

### 1. docker-compose.yml básico

```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    command: npm start

  backend:
    image: node:18-alpine
    working_dir: /app
    ports:
      - "5000:5000"
    volumes:
      - ./backend:/app
    command: npm start
```

### 2. docker-compose.yml con base de datos

```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - backend
    environment:
      - REACT_APP_API_URL=http://backend:5000

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    volumes:
      - ./backend:/app
    depends_on:
      - database
    environment:
      - DATABASE_URL=postgresql://user:password@database:5432/mydb

  database:
    image: postgres:15-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_DB=mydb
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### 3. docker-compose.yml para desarrollo completo

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - REACT_APP_API_URL=http://localhost:5000
    command: npm start

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    volumes:
      - ./backend:/app
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:password@database:5432/mydb
    depends_on:
      - database

  database:
    image: postgres:15-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_DB=mydb
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - frontend
      - backend

volumes:
  postgres_data:
  redis_data:
```

## Comandos Docker esenciales

### 1. Comandos básicos

```bash
# Construir imagen
docker build -t my-app .

# Ejecutar contenedor
docker run -p 3000:3000 my-app

# Ejecutar en modo interactivo
docker run -it my-app sh

# Ejecutar en segundo plano
docker run -d -p 3000:3000 my-app

# Ver logs
docker logs container_id

# Entrar a contenedor ejecutándose
docker exec -it container_id sh
```

### 2. Comandos de gestión

```bash
# Ver imágenes
docker images

# Eliminar imagen
docker rmi image_id

# Ver contenedores
docker ps -a

# Eliminar contenedor
docker rm container_id

# Eliminar todos los contenedores parados
docker container prune

# Eliminar todas las imágenes no utilizadas
docker image prune -a
```

### 3. Comandos de Docker Compose

```bash
# Construir y ejecutar servicios
docker-compose up

# Ejecutar en segundo plano
docker-compose up -d

# Construir servicios
docker-compose build

# Ejecutar comando en servicio
docker-compose exec frontend npm test

# Ver logs
docker-compose logs frontend

# Parar servicios
docker-compose down

# Parar y eliminar volúmenes
docker-compose down -v
```

## Optimización de imágenes

### 1. Multi-stage builds

```dockerfile
# Etapa de construcción
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 2. Optimización de capas

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copiar solo package files primero
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY . .

# Construir aplicación
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### 3. Uso de .dockerignore

```dockerignore
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.nyc_output
coverage
.docker
Dockerfile
docker-compose.yml
```

## Volúmenes y persistencia

### 1. Tipos de volúmenes

```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    volumes:
      # Volumen bind mount
      - .:/app
      # Volumen anónimo
      - /app/node_modules
      # Volumen nombrado
      - app_data:/app/data

volumes:
  app_data:
```

### 2. Configuración de volúmenes

```bash
# Crear volumen
docker volume create my_volume

# Ver volúmenes
docker volume ls

# Inspeccionar volumen
docker volume inspect my_volume

# Eliminar volumen
docker volume rm my_volume
```

## Networking en Docker

### 1. Redes personalizadas

```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    networks:
      - frontend_network

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    networks:
      - frontend_network
      - backend_network

  database:
    image: postgres:15-alpine
    networks:
      - backend_network

networks:
  frontend_network:
    driver: bridge
  backend_network:
    driver: bridge
```

### 2. Comunicación entre servicios

```typescript
// En el frontend, conectar al backend
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// En el backend, conectar a la base de datos
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://user:password@database:5432/mydb';
```

## Despliegue con Docker

### 1. Despliegue en producción

```dockerfile
# Dockerfile de producción
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 2. docker-compose.prod.yml

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.prod
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@database:5432/mydb
    depends_on:
      - database
    restart: unless-stopped

  database:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=mydb
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

## Herramientas y extensiones

### 1. Extensiones de VS Code

```markdown
EXTENSIONES RECOMENDADAS:
- Docker
- Docker Compose
- Remote - Containers
- Docker Explorer
- Dockerfile Language Support
```

### 2. Herramientas de desarrollo

```markdown
HERRAMIENTAS ÚTILES:
- Docker Desktop
- Portainer (UI para Docker)
- Docker Compose
- Docker Machine
- Docker Swarm
```

## Mejores prácticas

### 1. Seguridad

```dockerfile
# Usar usuario no root
FROM node:18-alpine

# Crear usuario
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Cambiar a usuario no root
USER nextjs

WORKDIR /app
COPY --chown=nextjs:nodejs . .
```

### 2. Performance

```dockerfile
# Usar imágenes Alpine
FROM node:18-alpine

# Instalar solo dependencias de producción
RUN npm ci --only=production

# Usar multi-stage builds
FROM node:18-alpine AS builder
# ... construcción
FROM nginx:alpine
# ... producción
```

### 3. Mantenimiento

```dockerfile
# Usar versiones específicas
FROM node:18.17.0-alpine

# Limpiar caché
RUN npm ci --only=production && npm cache clean --force

# Usar .dockerignore
# Copiar solo archivos necesarios
```

## Troubleshooting común

### 1. Problemas de permisos

```bash
# Solución para Linux
sudo usermod -aG docker $USER
newgrp docker

# Verificar permisos
docker run hello-world
```

### 2. Problemas de memoria

```bash
# Ver uso de recursos
docker stats

# Limpiar recursos no utilizados
docker system prune -a
```

### 3. Problemas de red

```bash
# Ver redes
docker network ls

# Inspeccionar red
docker network inspect bridge

# Crear red personalizada
docker network create my_network
```

## Integración con CI/CD

### 1. GitHub Actions

```yaml
name: Docker Build and Push

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Build Docker image
      run: docker build -t my-app .
    
    - name: Run tests
      run: docker run my-app npm test
    
    - name: Push to registry
      run: |
        docker tag my-app my-registry/my-app:latest
        docker push my-registry/my-app:latest
```

### 2. GitLab CI

```yaml
stages:
  - build
  - test
  - deploy

build:
  stage: build
  script:
    - docker build -t my-app .
    - docker tag my-app registry.gitlab.com/my-group/my-app:latest
    - docker push registry.gitlab.com/my-group/my-app:latest
```

## Conclusión

Docker es una herramienta esencial para desarrolladores frontend modernos. Proporciona consistencia, portabilidad y facilita la colaboración en equipos.

**Beneficios clave**:
- Entornos de desarrollo consistentes
- Despliegue simplificado
- Aislamiento de dependencias
- Escalabilidad fácil
- Colaboración mejorada

**Próximos pasos**:
1. Instala Docker en tu sistema
2. Crea tu primer Dockerfile
3. Experimenta con docker-compose
4. Optimiza tus imágenes
5. Integra con tu flujo de trabajo

**Recuerda**: Docker no es solo para DevOps. Como desarrollador frontend, puede mejorar significativamente tu experiencia de desarrollo y facilitar el despliegue de tus aplicaciones.

¡Docker te ayudará a crear aplicaciones más robustas y desplegables!
