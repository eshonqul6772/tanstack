import React from 'react';
import { RouterProvider as TanstackRouterProvider, createRouter } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import config from '@/shared/config';
import type { PERMISSIONS } from '@/shared/lib/utils/enums';

import { useAuth } from '@/features/auth/hooks/useAuth';

import HttpInitializer from '@/app/init/HttpInitializer';
import { routeTree } from '@/app/router/routeTree';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultStaleTime: 1000 * 60 * 5,
  context: {
    auth: {
      isAuthenticated: false,
      isFetched: false,
      token: '',
      permissions: [] as PERMISSIONS[],
      logout: () => {}
    }
  }
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const RouterProvider = () => {
  const auth = useAuth();

  const routerContext = React.useMemo(
    () => ({
      auth: {
        isAuthenticated: auth.isAuthenticated,
        isFetched: auth.isFetched,
        token: auth.token || '',
        permissions: auth.profile.permissions || [],
        logout: auth.methods.logout
      }
    }),
    [auth.isAuthenticated, auth.isFetched, auth.token, auth.profile.permissions, auth.methods.logout]
  );

  React.useEffect(() => {
    router.invalidate().then(r => r);

    if (!auth.isAuthenticated && auth.isFetched && !auth.token) {
      router.navigate({to: '/login'}).then(r =>r);
    }
  }, [auth.isAuthenticated, auth.isFetched, auth.token]);

  return (
    <>
      <HttpInitializer />
      <TanstackRouterProvider router={router} context={routerContext} />
      {config.app.isDev && <TanStackRouterDevtools router={router} initialIsOpen={false} />}
    </>
  );
};

export default RouterProvider;
