// src/routes/__not-found.tsx
import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './__root';
import NotFoundPage from '@/pages/NotFoundPage';

export const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFoundPage,
});