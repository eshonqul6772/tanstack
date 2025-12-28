import {lazy} from "react";
import {
    createRoute,
    createRootRouteWithContext,
    redirect,
    type Route,
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

const createAppRoute = (config: typeof allRoutes[number]): Route<any> => {
    const LazyComponent = lazy(() =>
        config.component().then(m => ({default: m.default}))
    );

    const routeConfig: any = {
        getParentRoute: () => rootRoute,
        path: config.path,
        component: LazyComponent,
    };

    console.log('auth', config);

    if (!config.metadata.requiresAuth) {
        routeConfig.beforeLoad = ({context, location}: {
            context: RouterContext;
            location: Location
        }) => {
            if (!context.auth.isAuthenticated) {
                throw redirect({
                    to: '/login',
                    search: {redirect: location.href},
                });
            }
        };
    }

    return createRoute(routeConfig);
};

// Barcha route'larni yaratish
const appRoutes = allRoutes.map(createAppRoute);

// Route tree
export const routeTree = rootRoute.addChildren(appRoutes);

// Route'larni key bo'yicha object sifatida ham saqlash (agar kerak bo'lsa)
export const routeMap = Object.fromEntries(
    allRoutes.map((config, index) => [config.key, appRoutes[index]])
);

export {rootRoute};