import React, { lazy } from "react";
import {
    createRoute,
    createRootRouteWithContext,
    redirect,
    type Route,
    Outlet,
} from '@tanstack/react-router';

import MainLayout from '@/layouts';
import Loading from '@/components/Loading';
import ErrorComponent from '@/components/ErrorComponent';

import { allRoutes } from './routes';

interface RouterContext {
    auth: {
        isAuthenticated: boolean;
        isFetched: boolean;
        token: string;
        logout: () => void;
    };
}

const RootComponent = () => React.createElement(Outlet);

const rootRoute = createRootRouteWithContext<RouterContext>()({
    component: RootComponent,
    pendingComponent: Loading,
    errorComponent: ErrorComponent,
});

const layoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: 'layout',
    component: MainLayout,
});

const IndexComponent = () => null;

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: IndexComponent,
    beforeLoad: ({ context }: { context: RouterContext }) => {
        // Agar auth hali fetch qilinmagan bo'lsa, kuting
        if (!context.auth.isFetched) {
            return;
        }

        // Agar authenticated bo'lsa, dashboard'ga yo'naltir
        if (context.auth.isAuthenticated) {
            throw redirect({
                to: '/dashboard',
            });
        }

        // Aks holda login sahifasiga yo'naltir
        throw redirect({
            to: '/login',
        });
    },
});

const createAppRoute = (config: typeof allRoutes[number]): Route<any> => {
    const LazyComponent = lazy(() =>
        config.component().then(m => ({ default: m.default }))
    );

    const parentRoute = config.metadata.requiresAuth ? layoutRoute : rootRoute;

    const routeConfig: any = {
        getParentRoute: () => parentRoute,
        path: config.path,
        component: LazyComponent,
    };

    routeConfig.beforeLoad = ({ context, location }: {
        context: RouterContext;
        location: Location;
    }) => {
        if (config.key === 'login') {
            // Agar token bo'lsa va auth hali fetch qilinmagan bo'lsa, 
            // bu profile fetch qilinayotganini anglatadi, shuning uchun kuting
            if (context.auth.token && !context.auth.isFetched) {
                return;
            }

            // Agar authenticated bo'lsa, dashboard'ga redirect (login sahifasini ochmaslik)
            if (context.auth.isAuthenticated) {
                throw redirect({
                    to: '/dashboard',
                });
            }

            // Agar token bo'lsa lekin hali authenticated bo'lmagan bo'lsa, 
            // bu profile fetch qilinayotganini anglatadi, kuting
            if (context.auth.token) {
                return;
            }

            // Aks holda login sahifasini ko'rsatishga ruxsat ber
            return;
        }

        if (config.metadata.requiresAuth) {
            if (!context.auth.isFetched) {
                return;
            }

            if (!context.auth.isAuthenticated) {
                throw redirect({
                    to: '/login',
                    search: {
                        redirect: location.pathname + location.search,
                    },
                });
            }
        }
    };

    return createRoute(routeConfig);
};

const appRoutes = allRoutes.map(createAppRoute);

const protectedRoutes = appRoutes.filter((_, index) => allRoutes[index].metadata.requiresAuth);
const publicRoutes = appRoutes.filter((_, index) => !allRoutes[index].metadata.requiresAuth);

export const routeTree = rootRoute.addChildren([
    indexRoute,
    layoutRoute.addChildren(protectedRoutes),
    ...publicRoutes,
]);

export const routeMap = Object.fromEntries(
    allRoutes.map((config, index) => [config.key, appRoutes[index]])
);

export { rootRoute };