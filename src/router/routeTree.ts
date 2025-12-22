import { lazy, Suspense } from 'react';
import { createRoute, createRootRouteWithContext } from '@tanstack/react-router';

import MainLayout from '@/layouts';
import Loading from '@/components/Loading';
import ErrorComponent from '@/components/ErrorComponent';
import CheckPermission from '@/requires/CheckPermission';

import { allRoutes } from './routes';
import { PERMISSIONS } from '@/utils/enums';
import { useAuth } from '@/modules/auth/hooks';

// 1️⃣ Root route
const rootRoute = createRootRouteWithContext<{}>()({
    component: MainLayout,
    pendingComponent: Loading,
    errorComponent: ErrorComponent,
});

// 2️⃣ Route yaratish
const createRouteFromConfig = (config: typeof allRoutes[number]) =>
    createRoute({
        getParentRoute: () => rootRoute,
        path: config.path,
        component: lazy(() =>
            config.component().then((m) => ({
                default: (props: any) => {
                    const { isAuthenticated, isFetched } = useAuth();

                    // Auth tekshiruvi
                    if (!config.metadata.requiresAuth) {
                        return <m.default {...props} />;
                    }

                    if (!isFetched) return <Loading full />;

                    if (!isAuthenticated) return <m.default {...props} />;

                    // Permission tekshiruvi
                    const permission: PERMISSIONS = PERMISSIONS.VIEW_DASHBOARD; // Masalan, route uchun belgilash kerak
                    return <CheckPermission permission={permission} page={<m.default {...props} />} />;
                },
                }))
        ),
    });

const routes = Object.fromEntries(
    allRoutes.map((config) => [config.key, createRouteFromConfig(config)])
) as Record<typeof allRoutes[number]['key'], ReturnType<typeof createRouteFromConfig>>;

export const routeTree = rootRoute.addChildren(Object.values(routes));
export { rootRoute };
