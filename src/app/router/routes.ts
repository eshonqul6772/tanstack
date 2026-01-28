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
  },
  {
    key: 'users',
    path: '/users',
    component: () => import('@/pages/User'),
    metadata: {
      title: 'Users',
      requiresAuth: true,
      requiredPermissions: ['VIEW_USERS'] as PERMISSIONS[]
    }
  },
  {
    key: 'translations',
    path: '/translations',
    component: () => import('@/pages/Translation'),
    metadata: {
      title: 'Translations',
      requiresAuth: true,
      requiredPermissions: ['VIEW_USERS'] as PERMISSIONS[]
    }
  }
] as const;

export type RouteKey = (typeof allRoutes)[number]['key'];
export type RoutePath = (typeof allRoutes)[number]['path'];
export type RouteMetadata = (typeof allRoutes)[number]['metadata'];
