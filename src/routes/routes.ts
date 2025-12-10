export const allRoutes = [
    {
        id: 'home',
        path: '/',
        component: () => import('@/pages/HomePage'),
        metadata: {
            title: 'Home',
            requiresAuth: false,
        },
    },
    {
        id: 'about',
        path: '/about',
        component: () => import('@/pages/AboutPage'),
        metadata: {
            title: 'About',
            requiresAuth: false,
        },
    },
    {
        id: 'notfound',
        path: '*',
        component: () => import('@/pages/NotFoundPage'),
        metadata: {
            title: 'notFound',
            requiresAuth: false,
        },
    },
] as const;