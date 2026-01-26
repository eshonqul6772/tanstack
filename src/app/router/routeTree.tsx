import { createRootRouteWithContext, createRoute, Outlet, redirect } from '@tanstack/react-router';
import { lazy } from 'react';
import type { PERMISSIONS } from '@/shared/lib/utils/enums';
import ErrorComponent from '@/shared/ui/ErrorComponent';
import Loading from '@/shared/ui/Loading';
import MainLayout from '@/widgets/layout';
import NotFound from '@/pages/NotFound';

import { allRoutes } from './routes';

interface RouterContext {
  auth: {
    isAuthenticated: boolean;
    isFetched: boolean;
    token: string;
    permissions: PERMISSIONS[];
    logout: () => void;
  };
}

const RootComponent = () => <Outlet />;

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  pendingComponent: Loading,
  errorComponent: ErrorComponent,
  notFoundComponent: NotFound
});

const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'layout',
  component: MainLayout,
  notFoundComponent: NotFound
});

const IndexComponent = () => null;

// 🔹 ROOT "/" → login yoki dashboard
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: IndexComponent,
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/dashboard' });
    }

    throw redirect({ to: '/login' });
  }
});

// 🔹 Route factory
const createAppRoute = (config: (typeof allRoutes)[number]) => {
  const LazyComponent = lazy(() => config.component().then(m => ({ default: m.default })));

  const parentRoute = config.metadata.requiresAuth ? layoutRoute : rootRoute;

  const routeConfig = {
    getParentRoute: () => parentRoute,
    path: config.path,
    component: LazyComponent
  };

  routeConfig.beforeLoad = ({ context, location }: { context: RouterContext; location: Location }) => {
    // ⏳ WAITING FOR AUTH CHECK
    if (!context.auth.isFetched) {
      return; // Don't redirect, wait for profile to load
    }

    // 🔓 LOGIN ROUTE
    if (config.key === 'login') {
      if (context.auth.isAuthenticated) {
        throw redirect({ to: '/dashboard' });
      }

      return;
    }

    // 🔐 PROTECTED ROUTES
    if (config.metadata.requiresAuth) {
      if (!context.auth.isAuthenticated) {
        throw redirect({
          to: '/login',
          search: {
            redirect: location.pathname + location.search
          }
        });
      }

      // ✅ PERMISSION CHECK
      if (config.metadata.requiredPermissions && config.metadata.requiredPermissions.length > 0) {
        const hasPermission = config.metadata.requiredPermissions.some(perm => context.auth.permissions.includes(perm));

        if (!hasPermission) {
          throw redirect({ to: '/no-access' });
        }
      }
    }
  };

  return createRoute(routeConfig);
};

const appRoutes = allRoutes.map(createAppRoute);

const protectedRoutes = appRoutes.filter((_, index) => allRoutes[index].metadata.requiresAuth);

const publicRoutes = appRoutes.filter((_, index) => !allRoutes[index].metadata.requiresAuth);

export const routeTree = rootRoute.addChildren([indexRoute, layoutRoute.addChildren(protectedRoutes), ...publicRoutes]);

export const routeMap = Object.fromEntries(allRoutes.map((config, index) => [config.key, appRoutes[index]]));

export { rootRoute };
