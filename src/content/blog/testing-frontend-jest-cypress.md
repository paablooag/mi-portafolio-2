---
title: "Testing en frontend con Jest y Cypress: Guía completa"
description: "Aprende testing en frontend desde cero: Jest para unit testing, Cypress para e2e testing, mejores prácticas y estrategias de testing efectivas."
pubDate: 2025-01-15T00:00:00.000Z
tags: ["Testing", "Jest", "Cypress", "Frontend", "Calidad", "E2E"]
---

# Testing en frontend con Jest y Cypress: Guía completa

El testing es fundamental para mantener la calidad del código frontend. Te guío paso a paso para implementar testing efectivo con Jest y Cypress.

## ¿Por qué es importante el testing?

### Beneficios del testing

```markdown
VENTAJAS DEL TESTING:
- Detección temprana de bugs
- Confianza en el código
- Documentación viva
- Refactoring seguro
- Mejor calidad del código
- Reducción de costos
- Mejor experiencia de usuario
- Desarrollo más rápido
```

### Tipos de testing

```markdown
PIRÁMIDE DE TESTING:
- Unit Tests (70%): Pruebas de funciones individuales
- Integration Tests (20%): Pruebas de componentes integrados
- E2E Tests (10%): Pruebas de flujos completos

HERRAMIENTAS:
- Jest: Unit testing
- React Testing Library: Component testing
- Cypress: E2E testing
- Playwright: E2E testing alternativo
- Storybook: Component testing visual
```

## Jest para Unit Testing

### 1. Configuración inicial

```bash
# Instalar Jest
npm install --save-dev jest @types/jest

# Instalar para React
npm install --save-dev @testing-library/react @testing-library/jest-dom

# Configurar package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

### 2. Configuración de Jest

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapping: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'jest-transform-stub'
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/reportWebVitals.js'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

### 3. Setup de testing

```javascript
// src/setupTests.js
import '@testing-library/jest-dom';

// Mock de fetch global
global.fetch = jest.fn();

// Mock de localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock de window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
```

### 4. Ejemplos de unit tests

```javascript
// utils.test.js
import { formatDate, validateEmail, debounce } from './utils';

describe('Utils', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-01-15');
      expect(formatDate(date)).toBe('15/01/2024');
    });

    it('should handle invalid date', () => {
      expect(formatDate('invalid')).toBe('Fecha inválida');
    });
  });

  describe('validateEmail', () => {
    it('should validate correct email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });

    it('should reject invalid email', () => {
      expect(validateEmail('invalid-email')).toBe(false);
    });
  });

  describe('debounce', () => {
    jest.useFakeTimers();

    it('should debounce function calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });
});
```

### 5. Testing de hooks personalizados

```javascript
// useCounter.test.js
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('should initialize with custom value', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  it('should increment count', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });

  it('should decrement count', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.decrement();
    });
    
    expect(result.current.count).toBe(4);
  });

  it('should reset count', () => {
    const { result } = renderHook(() => useCounter(10));
    
    act(() => {
      result.current.increment();
      result.current.reset();
    });
    
    expect(result.current.count).toBe(10);
  });
});
```

## React Testing Library

### 1. Testing de componentes

```javascript
// Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('should render button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should render with different variants', () => {
    render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-primary');
  });
});
```

### 2. Testing de formularios

```javascript
// ContactForm.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from './ContactForm';

describe('ContactForm', () => {
  it('should render form fields', () => {
    render(<ContactForm />);
    
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
  });

  it('should show validation errors', async () => {
    render(<ContactForm />);
    
    const submitButton = screen.getByRole('button', { name: /enviar/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/nombre es requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/email es requerido/i)).toBeInTheDocument();
    });
  });

  it('should submit form with valid data', async () => {
    const mockSubmit = jest.fn();
    render(<ContactForm onSubmit={mockSubmit} />);
    
    const user = userEvent.setup();
    
    await user.type(screen.getByLabelText(/nombre/i), 'Juan Pérez');
    await user.type(screen.getByLabelText(/email/i), 'juan@example.com');
    await user.type(screen.getByLabelText(/mensaje/i), 'Hola mundo');
    
    await user.click(screen.getByRole('button', { name: /enviar/i }));
    
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'Juan Pérez',
        email: 'juan@example.com',
        message: 'Hola mundo'
      });
    });
  });
});
```

### 3. Testing con contexto

```javascript
// ThemeProvider.test.jsx
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from './ThemeProvider';
import { ThemeToggle } from './ThemeToggle';

const renderWithTheme = (component, { theme = 'light' } = {}) => {
  return render(
    <ThemeProvider initialTheme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('ThemeProvider', () => {
  it('should provide light theme by default', () => {
    renderWithTheme(<ThemeToggle />);
    expect(screen.getByText(/tema claro/i)).toBeInTheDocument();
  });

  it('should provide dark theme when specified', () => {
    renderWithTheme(<ThemeToggle />, { theme: 'dark' });
    expect(screen.getByText(/tema oscuro/i)).toBeInTheDocument();
  });

  it('should toggle theme when button is clicked', () => {
    renderWithTheme(<ThemeToggle />);
    
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    
    expect(screen.getByText(/tema oscuro/i)).toBeInTheDocument();
  });
});
```

## Cypress para E2E Testing

### 1. Configuración inicial

```bash
# Instalar Cypress
npm install --save-dev cypress

# Abrir Cypress
npx cypress open

# Ejecutar tests
npx cypress run
```

### 2. Configuración de Cypress

```javascript
// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    setupNodeEvents(on, config) {
      // Configuración de plugins
    },
  },
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});
```

### 3. Ejemplos de E2E tests

```javascript
// cypress/e2e/user-flow.cy.js
describe('User Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should complete user registration flow', () => {
    // Navegar a registro
    cy.get('[data-cy=register-link]').click();
    
    // Llenar formulario
    cy.get('[data-cy=name-input]').type('Juan Pérez');
    cy.get('[data-cy=email-input]').type('juan@example.com');
    cy.get('[data-cy=password-input]').type('password123');
    
    // Enviar formulario
    cy.get('[data-cy=submit-button]').click();
    
    // Verificar redirección
    cy.url().should('include', '/dashboard');
    cy.get('[data-cy=welcome-message]').should('contain', 'Bienvenido Juan');
  });

  it('should handle login flow', () => {
    // Navegar a login
    cy.get('[data-cy=login-link]').click();
    
    // Llenar credenciales
    cy.get('[data-cy=email-input]').type('juan@example.com');
    cy.get('[data-cy=password-input]').type('password123');
    
    // Enviar formulario
    cy.get('[data-cy=submit-button]').click();
    
    // Verificar login exitoso
    cy.url().should('include', '/dashboard');
    cy.get('[data-cy=user-menu]').should('be.visible');
  });

  it('should handle error states', () => {
    // Intentar login con credenciales incorrectas
    cy.get('[data-cy=login-link]').click();
    cy.get('[data-cy=email-input]').type('wrong@example.com');
    cy.get('[data-cy=password-input]').type('wrongpassword');
    cy.get('[data-cy=submit-button]').click();
    
    // Verificar mensaje de error
    cy.get('[data-cy=error-message]').should('contain', 'Credenciales incorrectas');
  });
});
```

### 4. Testing de API

```javascript
// cypress/e2e/api.cy.js
describe('API Testing', () => {
  it('should fetch user data', () => {
    cy.request('GET', '/api/users/1').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', 1);
      expect(response.body).to.have.property('name');
      expect(response.body).to.have.property('email');
    });
  });

  it('should create new user', () => {
    const userData = {
      name: 'Juan Pérez',
      email: 'juan@example.com',
      password: 'password123'
    };

    cy.request('POST', '/api/users', userData).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
      expect(response.body.name).to.eq(userData.name);
      expect(response.body.email).to.eq(userData.email);
    });
  });

  it('should handle API errors', () => {
    cy.request({
      method: 'GET',
      url: '/api/users/999',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.have.property('error');
    });
  });
});
```

### 5. Testing de componentes con Cypress

```javascript
// cypress/component/Button.cy.jsx
import { Button } from './Button';

describe('Button Component', () => {
  it('should render button', () => {
    cy.mount(<Button>Click me</Button>);
    cy.get('button').should('contain', 'Click me');
  });

  it('should handle click events', () => {
    const onClick = cy.stub();
    cy.mount(<Button onClick={onClick}>Click me</Button>);
    
    cy.get('button').click();
    cy.then(() => {
      expect(onClick).to.have.been.called;
    });
  });

  it('should be disabled when disabled prop is true', () => {
    cy.mount(<Button disabled>Click me</Button>);
    cy.get('button').should('be.disabled');
  });
});
```

## Mejores prácticas

### 1. Organización de tests

```markdown
ESTRUCTURA RECOMENDADA:
src/
├── components/
│   ├── Button/
│   │   ├── Button.jsx
│   │   ├── Button.test.jsx
│   │   └── Button.stories.jsx
├── utils/
│   ├── utils.js
│   └── utils.test.js
├── hooks/
│   ├── useCounter.js
│   └── useCounter.test.js
└── __tests__/
    ├── setup.js
    └── helpers.js
```

### 2. Naming conventions

```markdown
CONVENCIONES:
- Archivos de test: ComponentName.test.jsx
- Describe blocks: Nombre del componente/función
- Test cases: should + acción + condición
- Variables: descriptive names
- Mocks: mock + nombre del objeto
```

### 3. Test data management

```javascript
// __tests__/testData.js
export const mockUser = {
  id: 1,
  name: 'Juan Pérez',
  email: 'juan@example.com',
  avatar: 'https://example.com/avatar.jpg'
};

export const mockUsers = [
  mockUser,
  {
    id: 2,
    name: 'María García',
    email: 'maria@example.com',
    avatar: 'https://example.com/avatar2.jpg'
  }
];

// __tests__/helpers.js
export const renderWithProviders = (ui, options = {}) => {
  const { theme = 'light', ...renderOptions } = options;
  
  const Wrapper = ({ children }) => (
    <ThemeProvider theme={theme}>
      <Router>
        {children}
      </Router>
    </ThemeProvider>
  );
  
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};
```

### 4. Mocking strategies

```javascript
// Mock de módulos
jest.mock('../api/users', () => ({
  fetchUsers: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn()
}));

// Mock de hooks
jest.mock('../hooks/useAuth', () => ({
  useAuth: () => ({
    user: mockUser,
    login: jest.fn(),
    logout: jest.fn(),
    isLoading: false
  })
}));

// Mock de fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockUsers),
    ok: true,
    status: 200
  })
);
```

## CI/CD Integration

### 1. GitHub Actions

```yaml
# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run unit tests
      run: npm run test:coverage
    
    - name: Run E2E tests
      run: npm run test:e2e
    
    - name: Upload coverage reports
      uses: codecov/codecov-action@v2
      with:
        file: ./coverage/lcov.info
```

### 2. Scripts de package.json

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "cypress run",
    "test:e2e:open": "cypress open",
    "test:ci": "npm run test:coverage && npm run test:e2e"
  }
}
```

## Conclusión

El testing es esencial para mantener la calidad y confiabilidad del código frontend. Jest y Cypress proporcionan las herramientas necesarias para implementar un testing efectivo.

**Beneficios clave**:
- Detección temprana de bugs
- Confianza en el código
- Refactoring seguro
- Mejor calidad del código
- Documentación viva

**Estrategia recomendada**:
- 70% Unit tests con Jest
- 20% Integration tests con React Testing Library
- 10% E2E tests con Cypress

**Próximos pasos**:
1. Configura Jest para unit testing
2. Implementa React Testing Library
3. Configura Cypress para E2E testing
4. Establece métricas de cobertura
5. Integra con CI/CD
6. Automatiza el testing

**Recuerda**: El testing es una inversión que se paga a sí misma. Empieza con tests simples y ve aumentando la cobertura gradualmente.

¡El testing efectivo es la base de aplicaciones frontend robustas y confiables!
