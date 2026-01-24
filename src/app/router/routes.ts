export const allRoutes = [
  {
    key: 'login',
    path: '/login',
    component: () => import('@/pages/Login'),
    metadata: {
      title: 'Login',
      requiresAuth: false
    }
  },
  {
    key: 'dashboard',
    path: '/dashboard',
    component: () => import('@/pages/Dashboard'),
    metadata: {
      title: 'Dashboard',
      requiresAuth: true
    }
  },
  {
    key: 'notfound',
    path: '*',
    component: () => import('@/pages/NotFound'),
    metadata: {
      title: 'Page Not Found',
      requiresAuth: true
    }
  }
] as const;

export type RouteKey = (typeof allRoutes)[number]['key'];
export type RoutePath = (typeof allRoutes)[number]['path'];
export type RouteMetadata = (typeof allRoutes)[number]['metadata'];
