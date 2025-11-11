---
title: "Testing: plantilla en 2025"
description: "Guía breve y accionable sobre testing para aplicar en 2025."
pubDate: 2025-03-07T00:00:00.000Z
tags: ["SEO Local","Producto","CI/CD","Seguridad"]
---

# Testing: plantilla en 2025

Plantilla completa y moderna para implementar testing en proyectos web en 2025. Incluye configuración, ejemplos prácticos y mejores prácticas para unit tests, integration tests y E2E.

## Estrategia de Testing 2025

Una buena estrategia de testing incluye:
- **Unit Tests** - Componentes y funciones aisladas
- **Integration Tests** - Interacción entre componentes
- **E2E Tests** - Flujos completos de usuario
- **Visual Regression** - Comparación de UI

## Configuración Base

### Jest + Testing Library (React/Vue)

```json
// package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.1.0",
    "@testing-library/user-event": "^14.5.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0"
  }
}
```

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

## Plantillas de Tests

### 1. Component Test (React)

```javascript
// components/Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
```

### 2. Component Test (Vue)

```javascript
// components/Button.test.js
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button.vue';

describe('Button', () => {
  it('renders with correct text', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me'
      }
    });
    expect(wrapper.text()).toBe('Click me');
  });

  it('emits click event', async () => {
    const wrapper = mount(Button);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      }
    });
    expect(wrapper.attributes('disabled')).toBeDefined();
  });
});
```

### 3. Hook/Composable Test

```javascript
// hooks/useCounter.test.js
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('initializes with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('increments count', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });

  it('decrements count', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 5 }));
    
    act(() => {
      result.current.decrement();
    });
    
    expect(result.current.count).toBe(4);
  });

  it('resets count', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 10 }));
    
    act(() => {
      result.current.increment();
      result.current.reset();
    });
    
    expect(result.current.count).toBe(10);
  });
});
```

### 4. API/Service Test

```javascript
// services/api.test.js
import { fetchUser, createPost } from './api';

// Mock fetch
global.fetch = jest.fn();

describe('API Service', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('fetches user successfully', async () => {
    const mockUser = { id: 1, name: 'John Doe' };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    const user = await fetchUser(1);
    expect(user).toEqual(mockUser);
    expect(fetch).toHaveBeenCalledWith('/api/users/1');
  });

  it('handles fetch errors', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));
    
    await expect(fetchUser(1)).rejects.toThrow('Network error');
  });

  it('creates post with correct data', async () => {
    const postData = { title: 'Test', content: 'Content' };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, ...postData }),
    });

    const post = await createPost(postData);
    expect(fetch).toHaveBeenCalledWith('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    });
    expect(post.title).toBe('Test');
  });
});
```

### 5. Form Test

```javascript
// components/LoginForm.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('submits form with valid data', async () => {
    const handleSubmit = jest.fn();
    const user = userEvent.setup();
    
    render(<LoginForm onSubmit={handleSubmit} />);
    
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('shows validation errors', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });
});
```

### 6. E2E Test (Playwright)

```javascript
// e2e/login.spec.js
import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test('user can login successfully', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('text=Welcome')).toBeVisible();
  });

  test('shows error for invalid credentials', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('[name="email"]', 'wrong@example.com');
    await page.fill('[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=Invalid credentials')).toBeVisible();
  });
});
```

## Helpers y Utilidades

### Test Utilities

```javascript
// test-utils/index.js
import { render } from '@testing-library/react';
import { ThemeProvider } from '../contexts/ThemeContext';

export const renderWithProviders = (ui, options = {}) => {
  const { theme = 'light', ...renderOptions } = options;
  
  const Wrapper = ({ children }) => (
    <ThemeProvider value={theme}>
      {children}
    </ThemeProvider>
  );
  
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Mock data factories
export const createMockUser = (overrides = {}) => ({
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  ...overrides,
});
```

## Mejores Prácticas

### 1. AAA Pattern (Arrange, Act, Assert)

```javascript
it('calculates total correctly', () => {
  // Arrange
  const items = [
    { price: 10, quantity: 2 },
    { price: 5, quantity: 3 },
  ];
  
  // Act
  const total = calculateTotal(items);
  
  // Assert
  expect(total).toBe(35);
});
```

### 2. Test Nombres Descriptivos

```javascript
// ❌ Malo
it('works', () => { ... });

// ✅ Bueno
it('should return error when email is invalid', () => { ... });
```

### 3. Un Test, Una Aserción (cuando sea posible)

```javascript
// ✅ Mejor
it('validates email format', () => {
  expect(isValidEmail('test@example.com')).toBe(true);
  expect(isValidEmail('invalid')).toBe(false);
});
```

## Qué hacer ahora

1. **Configura Jest o Vitest** en tu proyecto y crea tu primer test para un componente simple
2. **Implementa tests para 3 componentes críticos** esta semana (botones, formularios, navegación)
3. **Mide la cobertura** y establece un threshold mínimo del 80% para validar calidad del código
