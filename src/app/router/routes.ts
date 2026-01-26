import type { PERMISSIONS } from '@/shared/lib/utils/enums';

export const allRoutes = [
  {
    key: 'login',
    path: '/login',
    component: () => import('@/pages/Login'),
    metadata: {
      title: 'Login',
      requiresAuth: false,
      requiredPermissions: [] as PERMISSIONS[]
    }
  },
  {
    key: 'dashboard',
    path: '/dashboard',
    component: () => import('@/pages/Dashboard'),
    metadata: {
      title: 'Dashboard',
      requiresAuth: true,
      requiredPermissions: [] as PERMISSIONS[]
    }
  }
] as const;

export type RouteKey = (typeof allRoutes)[number]['key'];
export type RoutePath = (typeof allRoutes)[number]['path'];
export type RouteMetadata = (typeof allRoutes)[number]['metadata'];
