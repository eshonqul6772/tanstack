// src/routes/auth.tsx
import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './__root';

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',
});

// Login
export const loginRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/login',
  component: () => <div>Login Page</div>,
});

// Register
export const registerRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/register',
  component: () => <div>Register Page</div>,
});