# CLAUDE.md - AI Assistant Guide

This document provides context for AI assistants working with this codebase.

## Project Overview

This is an **admin dashboard application** built with React + TypeScript + Vite following **Feature-Sliced Design (FSD)** architecture. It includes authentication, role-based access control, and CRUD operations for multiple entities (Users, Roles, Translations).

## Technology Stack

| Category | Technology |
|----------|------------|
| Framework | React 19, TypeScript 5.9 |
| Build Tool | Vite 7.2 with SWC |
| Routing | TanStack React Router 1.140 |
| State Management | TanStack React Query 5.90, Redux-like reducer with typesafe-actions |
| UI Library | Mantine 8.3 (core, forms, modals, notifications, charts) |
| Styling | TailwindCSS 4.1, SCSS |
| HTTP Client | Axios 1.13 |
| i18n | i18next 25.7 with HTTP backend |
| Package Manager | pnpm |
| Linter/Formatter | Biome 2.3 |

## Architecture (Feature-Sliced Design)

```
src/
├── app/           # Bootstrap layer: providers, router, initialization
├── pages/         # Page-level components (route endpoints)
├── features/      # Feature domains with isolated business logic
├── entities/      # Shared domain models, API, hooks, forms
├── widgets/       # Composite UI components (layout, crud-page)
└── shared/        # Cross-cutting utilities, UI components, config
```

### Layer Dependencies

```
app → pages → features → entities → shared
```

Each layer can only import from layers to its right. Never import "up" the chain.

## Folder Structure Details

### `src/app/` - Application Bootstrap
- `main.tsx` - React root entry with provider nesting
- `providers/` - Context providers (Router, Query, Mantine)
- `router/` - Route definitions and route tree with guards
- `init/` - HTTP client initialization with auth handlers

### `src/features/` - Feature Domains
Each feature (auth, user, role, translation) contains:
- `api/api.ts` - API endpoint functions
- `model/` - reducer, actions, types, constants
- `hooks/` - Custom React hooks
- `providers/` - Context providers
- `ui/` - Feature-specific UI components

### `src/entities/` - Domain Entities
Each entity (user, role, translation) contains:
- `api/api.ts` - CRUD endpoints (List, Single, Create, Update, Delete)
- `model/types.ts` - IEntity, IForm, IApi interfaces
- `model/constants.ts` - Entity name and action type constants
- `hooks/` - useList, useCreate, useUpdate, useDelete (React Query)
- `forms/` - Create and Update form components
- `ui/` - Table and form components

### `src/widgets/` - Composite Components
- `layout/` - Main app layout (Sidebar, Header, Footer)
- `crud-page/` - Generic CRUD page widget with modal management

### `src/shared/` - Shared Utilities
- `api/http/` - Axios singleton with auth interceptors
- `config/` - App configuration (API URL, languages, pagination)
- `lib/i18n/` - i18next initialization
- `lib/storage/` - localStorage/sessionStorage wrapper (store2)
- `lib/utils/` - Enums, interfaces, mappers, validators
- `ui/` - Reusable components (fields, table, crud, pagination)
- `assets/` - Styles and images

## Development Commands

```bash
# Install dependencies
pnpm install

# Development server (port 5173)
pnpm dev

# Build for production
pnpm build

# Build for specific environment
pnpm build:dev
pnpm build:prod

# Preview production build
pnpm preview

# Format code
pnpm format

# Lint code
pnpm lint

# Format + lint with fixes
pnpm check
```

## Code Style & Formatting

### Biome Configuration
- **Indent**: 2 spaces
- **Line width**: 120 characters
- **Quotes**: Single quotes
- **Semicolons**: Always
- **Trailing commas**: None
- **Arrow parens**: As needed (omit when possible)

### Import Organization (enforced by Biome)
```typescript
// 1. Node modules
import path from 'node:path';

// 2. React & TanStack
import React from 'react';
import { useQuery } from '@tanstack/react-query';

// 3. External packages
import axios from 'axios';

// 4. @/shared
import { http } from '@/shared/api';

// 5. @/features
import { useAuth } from '@/features/auth';

// 6. @/entities
import { User } from '@/entities/user';

// 7. @/pages
import { Dashboard } from '@/pages/Dashboard';

// 8. Local/relative imports
import { LocalComponent } from './LocalComponent';
```

### Path Alias
Always use `@/` prefix for imports from `src/`:
```typescript
// Good
import { http } from '@/shared/api/http';

// Bad
import { http } from '../../../shared/api/http';
```

## Key Patterns

### 1. Authentication State (Redux-like Reducer)

```typescript
// Actions defined with typesafe-actions
import { Actions } from '@/features/auth/model/actions';

// Dispatch to update state
dispatch(Actions.Login.success({ token, user }));
dispatch(Actions.Logout.request());

// Access via hook
const { state, dispatch } = useAuth();
const isAuthenticated = !!state.token;
```

### 2. Data Fetching (React Query)

```typescript
// Read data
const { data, isLoading } = useQuery({
  queryKey: ['entity', 'list', params],
  queryFn: () => Api.List(params)
});

// Mutations
const mutation = useMutation({
  mutationFn: Api.Create,
  onSuccess: () => queryClient.invalidateQueries(['entity'])
});
```

### 3. API Endpoints

```typescript
// In entities/*/api/api.ts
import { http } from '@/shared/api/http';

export const List = (params: IParams): AxiosPromise<IResponse[]> => {
  return http.get('/endpoint', { params });
};

export const Create = (data: IForm): AxiosPromise<IResponse> => {
  return http.post('/endpoint', data);
};
```

### 4. Form Handling (Mantine)

```typescript
import { useForm } from '@mantine/form';

const form = useForm<IFormValues>({
  initialValues: { name: '', email: '' },
  validate: {
    name: value => !value ? 'Required' : null,
    email: value => !value.includes('@') ? 'Invalid email' : null
  }
});
```

### 5. Provider Nesting Order

```tsx
// In main.tsx - order matters!
<QueryProvider>
  <MantineProvider>
    <AuthProvider>
      <RouterProvider />
    </AuthProvider>
  </MantineProvider>
</QueryProvider>
```

### 6. Route Guards

Routes are defined in `src/app/router/routes.ts` with metadata:
```typescript
{
  path: '/users',
  component: 'User',
  meta: {
    title: 'Users',
    requiresAuth: true,
    requiredPermissions: ['USER_VIEW']
  }
}
```

Guards automatically check `isAuthenticated` and permissions.

## Adding New Features

### Adding a New Entity (CRUD)

1. Create entity folder: `src/entities/[entity-name]/`
2. Add API endpoints in `api/api.ts`
3. Define types in `model/types.ts`
4. Create hooks in `hooks/` (useList, useCreate, etc.)
5. Build forms in `forms/`
6. Create table component in `ui/`

### Adding a New Route

1. Add route definition in `src/app/router/routes.ts`
2. Create page component in `src/pages/[PageName]/`
3. Set `requiresAuth` and `requiredPermissions` as needed
4. Add menu item in `src/widgets/layout/components/Sidebar/menu.ts`

### Adding API Calls

1. Create function in appropriate `api/api.ts` file
2. Use `http.get/post/put/delete()` from `@/shared/api/http`
3. Type response with generics: `AxiosPromise<ResponseType>`
4. Wrap in `useQuery` or `useMutation` hook

## Environment Variables

Located in `.env.development` and `.env.production`:

```
VITE_API_BASE_URL=http://localhost:4445/api/v1
VITE_APP_ENV=development
VITE_APP_DEBUG=true
VITE_APP_LOG_LEVEL=info
```

Access in code via `import.meta.env.VITE_*`.

## Important Boundaries

- **Auth state** drives router guards and HTTP token injection
- **HTTP 401 errors** automatically trigger logout via interceptor
- **localStorage** persists auth token; cleared on logout
- **i18n** initialized before app render (in HttpInitializer)
- **Mantine** preferred for UI components over raw HTML/Tailwind

## Common Gotchas

1. **useAuth() context**: Must be called inside `AuthProvider` tree
2. **Route metadata**: Requires `title` and `requiresAuth` flags
3. **API base URL**: Set via environment variables, not hardcoded
4. **React Query**: Queries only enabled when token exists (prevents pre-login fetches)
5. **Biome formatting**: Run `pnpm check` before commits to fix lint/format issues
6. **Import order**: Let Biome organize imports; don't manually reorder

## TypeScript Configuration

- **Target**: ES2022
- **Strict mode**: Enabled
- **No unused locals/parameters**: Enforced
- **Path alias**: `@/*` maps to `src/*`

## File Naming Conventions

- Components: `PascalCase.tsx` (e.g., `LoginForm.tsx`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `useAuth.ts`)
- Utilities: `camelCase.ts` (e.g., `mappers.ts`)
- Types: `types.ts` in model folders
- Constants: `constants.ts` with `SCREAMING_SNAKE_CASE` values

## Before Committing

```bash
# Required checks
pnpm check          # Format and lint
pnpm build          # TypeScript compilation

# Verify no errors before pushing
```
