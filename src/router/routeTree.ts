import React, {lazy} from "react";
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

import {allRoutes} from './routes';

interface RouterContext {
    auth: {
        isAuthenticated: boolean;
        isFetched: boolean;
        token: string;
        logout: () => void;
    };
}

// Root route - layout yo'q
const RootComponent = () => React.createElement(Outlet);

const rootRoute = createRootRouteWithContext<RouterContext>()({
    component: RootComponent,
    pendingComponent: Loading,
    errorComponent: ErrorComponent,
});

// Layout route - faqat protected routes uchun
const layoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: 'layout',
    component: MainLayout,
});

// Index route component (hech qachon ko'rinmaydi, chunki beforeLoad'da redirect)
const IndexComponent = () => null;

// Index route (/) - auth holatiga qarab redirect
const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: IndexComponent,
    beforeLoad: ({context}: {context: RouterContext}) => {
        // Agar auth hali yuklanmagan bo'lsa, kutib turish
        if (!context.auth.isFetched) {
            return;
        }
        
        // Agar token bor va authenticated bo'lsa, dashboard ga redirect
        if (context.auth.token && context.auth.isAuthenticated) {
            throw redirect({
                to: '/dashboard',
            });
        }
        
        // Aks holda login sahifasiga redirect
        throw redirect({
            to: '/login',
        });
    },
});

const createAppRoute = (config: typeof allRoutes[number]): Route<any> => {
    const LazyComponent = lazy(() =>
        config.component().then(m => ({default: m.default}))
    );

    // Parent route'ni aniqlash: protected routes uchun layout, boshqalar uchun root
    const parentRoute = config.metadata.requiresAuth ? layoutRoute : rootRoute;

    const routeConfig: any = {
        getParentRoute: () => parentRoute,
        path: config.path,
        component: LazyComponent,
    };

    // beforeLoad guard qo'shish
    routeConfig.beforeLoad = ({context, location}: {
        context: RouterContext;
        location: Location;
    }) => {
        // Login route uchun reverse guard (agar allaqachon authenticated bo'lsa, dashboard ga redirect)
        if (config.key === 'login') {
            if (context.auth.isAuthenticated) {
                throw redirect({
                    to: '/dashboard',
                });
            }
            return;
        }

        // Protected routes (requiresAuth: true) uchun guard
        if (config.metadata.requiresAuth) {
            // Agar auth hali yuklanmagan bo'lsa, kutib turish
            if (!context.auth.isFetched) {
                return;
            }
            
            // Agar authenticated bo'lmasa, login sahifasiga redirect
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

// Barcha route'larni yaratish
const appRoutes = allRoutes.map(createAppRoute);

// Protected va public route'larni ajratish
const protectedRoutes = appRoutes.filter((_, index) => allRoutes[index].metadata.requiresAuth);
const publicRoutes = appRoutes.filter((_, index) => !allRoutes[index].metadata.requiresAuth);

// Route tree - index route, layout route va barcha route'lar
export const routeTree = rootRoute.addChildren([
    indexRoute,
    layoutRoute.addChildren(protectedRoutes),
    ...publicRoutes,
]);

// Route'larni key bo'yicha object sifatida ham saqlash (agar kerak bo'lsa)
export const routeMap = Object.fromEntries(
    allRoutes.map((config, index) => [config.key, appRoutes[index]])
);

export {rootRoute};