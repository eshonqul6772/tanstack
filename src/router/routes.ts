export const allRoutes = [
    {
        key: 'login',
        path: '/login',
        component: () => import('@/pages/Login'),
        metadata: {
            title: 'Login',
            requiresAuth: false,
        },
    },
    {
        key: 'dashboard',
        path: '/dashboard',
        component: () => import('@/pages/Dashboard'),
        metadata: {
            title: 'NotFound',
            requiresAuth: true,
        },
    },
    {
        key: 'notfound',
        path: '*',
        component: () => import('@/pages/NotFound'),
        metadata: {
            title: 'notFound',
            requiresAuth: false,
        },
    },
] as const;