// src/routes/index.tsx
import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './__root';
import HomePage from '@/pages/HomePage';

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});