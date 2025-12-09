// src/routes/users.$userId.tsx
import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './__root';
import UserProfilePage from '@/pages/UserProfilePage';

export const userProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/users/$userId',
  component: UserProfilePage,
});