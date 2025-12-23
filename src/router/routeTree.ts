import {lazy} from "react";
import {
    createRoute,
    createRootRouteWithContext,
    redirect,
} from '@tanstack/react-router';

import MainLayout from '@/layouts';
import Loading from '@/components/Loading';
import ErrorComponent from '@/components/ErrorComponent';

import {allRoutes} from './routes';

interface RouterContext {
    auth: {
        isAuthenticated: boolean;
        login: () => void;
        logout: () => void;
    };
}

const rootRoute = createRootRouteWithContext<RouterContext>()({
    component: MainLayout,
    pendingComponent: Loading,
    errorComponent: ErrorComponent,
});

const createRouteFromConfig = (config: typeof allRoutes[number]) => {
    console.log('config', config);
    const baseRoute: any = createRoute({
        getParentRoute: () => rootRoute,
        path: config.path,
        component: lazy(() => config.component().then(m => ({default: m.default}))),
    });

    if (config.metadata.requiresAuth) {
        return baseRoute.beforeLoad(({context, location}: any) => {
            if (!context.auth?.isAuthenticated) {
                throw redirect({
                    to: '/login',
                    search: {
                        redirect: location.href,
                    },
                });
            }
        });
    }

    return baseRoute;
};

const routes = Object.fromEntries(
    allRoutes.map((config) => [config.key, createRouteFromConfig(config)])
);

export const routeTree = rootRoute.addChildren(Object.values(routes));