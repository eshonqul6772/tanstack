# Copilot Instructions for React FSD Project

## Architecture Overview

This is a **Feature-Sliced Design (FSD)** React + TypeScript + Vite application with authentication, state management, and data fetching.

### Folder Structure
- **`src/app/`** – Bootstrap layer: providers, router setup, initialization
- **`src/features/`** – Feature domains (e.g., `auth/`): isolated business logic, state, hooks
- **`src/pages/`** – Page components (Dashboard, Login, NoAccess, NotFound)
- **`src/entities/`** – Shared domain models (user types, data)
- **`src/widgets/`** – Composite UI components (Layout with Header/Footer)
- **`src/shared/`** – Cross-cutting utilities: HTTP client, i18n, storage, UI components

## Key Patterns & Conventions

### 1. State Management – Reducer Pattern
Auth state uses **Redux-like reducer** with `typesafe-actions`:
- **`features/auth/model/actions.ts`** – Action creators (Login, Logout, Profile)
- **`features/auth/model/reducer.ts`** – Reducer with switch cases
- **`features/auth/model/types.ts`** – IState, action payload types
- **`features/auth/model/constants.ts`** – Action type constants
- **`features/auth/hooks/useAuth.ts`** – Context hook to access auth state

**Pattern**: Dispatch actions → reducer updates state → components consume via context.

### 2. Data Fetching – TanStack React Query
- Used for server-side data (profiles, etc.)
- Configured in `AuthProvider` with automatic error handling
- Queries enable/disable based on token availability
- Cache management handled by React Query's default staleness

### 3. Routing – TanStack React Router
- Routes defined in `src/app/router/routes.ts` (metadata: title, requiresAuth)
- `routeTree.tsx` creates route hierarchy with auth context guards
- Root route redirects "/" to `/login` or `/dashboard` based on auth state
- Lazy loading page components with `import()`

### 4. HTTP Client – Axios Singleton
- Initialized in `HttpInitializer` component (inside auth context)
- `shared/api/http/` module exports configured `http` instance
- **Auth interceptors**: Token attachment via `getToken()`, logout on 401
- **Error handling**: Notification system for API errors

### 5. Provider Nesting (App Root)
```tsx
QueryProvider → MantineProvider → AuthProvider → RouterProvider
```
Order matters: Auth must wrap Router (router guards need auth context).

### 6. Code Style & Formatting
- **Formatter**: Biome (single quotes, no trailing commas, 2 spaces, 120 line width)
- **Commands**: `pnpm format`, `pnpm lint`, `pnpm check` (format + lint)
- **Build**: `pnpm build` (TypeScript check → Vite build)
- **Dev**: `pnpm dev` (Vite dev server with HMR)

### 7. Import Alias
- Use `@/` prefix for all imports from `src/` (e.g., `@/features/auth/hooks`)
- Configured in `vite.config.ts` and `tsconfig.json`

### 8. i18n (Internationalization)
- Initialized via `shared/lib/i18n/` using i18next + backend
- Loads translations from API: `/reference/translations/ADMIN_CABINET`
- Current language persisted in localStorage
- Always use i18n for user-facing strings, never hardcode text

## Development Workflows

### Running Locally
```bash
pnpm install       # Install dependencies
pnpm dev           # Start Vite dev server (hot reload)
pnpm build         # Build for production
pnpm preview       # Preview production build locally
```

### Before Committing
```bash
pnpm check         # Format & lint check (required)
pnpm build         # Verify TypeScript compilation
```

### Adding New Auth-Required Routes
1. Add route to `src/app/router/routes.ts` with `requiresAuth: true`
2. Router will auto-guard based on `context.auth.isAuthenticated`
3. Create page component in `src/pages/`

### Adding API Calls
1. Create in `features/*/api/api.ts` (same pattern as auth)
2. Use `http.get/post/put/delete()` methods
3. Type response with API response types from `model/types.ts`
4. Wrap in `useQuery/useMutation` in component or custom hook

## Critical Boundaries & Dependencies

- **Auth state** drives router guards and HTTP token injection
- **HTTP errors (401)** automatically trigger logout via interceptor
- **Storage** (localStorage) persists auth token; cleared on logout
- **i18n** requires initialization before rendering app (done in HttpInitializer)
- Mantine + TailwindCSS both available; prefer Mantine for components

## Common Gotchas

- `useAuth()` must be called inside `AuthProvider` tree (throws if not)
- Routes require metadata.title and requiresAuth flag
- API base URL hardcoded in `HttpInitializer` – update for different environments
- React Query enabled only when token exists (no infinite queries before login)
