import {lazy} from "react";
import {createRootRoute, createRoute} from '@tanstack/react-router';

import MainLayout from '@/layouts';

import Loading from '@/components/Loading';
import ErrorComponent from '@/components/ErrorComponent';

import {allRoutes} from './routes'

const createRouteFromConfig = (config: typeof allRoutes[number]) => {
    return createRoute({
        getParentRoute: () => rootRoute,
        path: config.path,
        component: lazy(() => config.component().then(m => ({default: m.default}))),
    });
};

const routes = Object.fromEntries(
    allRoutes.map(config => [config.key, createRouteFromConfig(config)])
) as Record<typeof allRoutes[number]['key'], ReturnType<typeof createRouteFromConfig>>;

const rootRoute = createRootRoute({
    component: MainLayout,
    pendingComponent: Loading,
    errorComponent: ErrorComponent,
});

export const routeTree = rootRoute.addChildren(Object.values(routes));