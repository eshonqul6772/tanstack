export const allRoutes = [
    {
        key: 'home',
        path: '/',
        component: () => import('@/pages/HomePage'),
        metadata: {
            title: 'Home',
            requiresAuth: false,
        },
    },
    {
        key: 'about',
        path: '/about',
        component: () => import('@/pages/AboutPage'),
        metadata: {
            title: 'About',
            requiresAuth: false,
        },
    },
    {
        key: 'notfound',
        path: '*',
        component: () => import('@/pages/NotFoundPage'),
        metadata: {
            title: 'notFound',
            requiresAuth: false,
        },
    },
] as const;