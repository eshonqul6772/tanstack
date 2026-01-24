import { createRouter, RouterProvider as TanstackRouterProvider } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import React from 'react';

import HttpInitializer from '@/app/init/HttpInitializer';
import { routeTree } from '@/app/router/routeTree';
import { useAuth } from '@/features/auth/hooks/useAuth';
import config from '@/shared/config';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultStaleTime: 1000 * 60 * 5,
  context: {
    auth: undefined!
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
        logout: () => auth.methods.logout()
      }
    }),
    [auth.isAuthenticated, auth.isFetched, auth.token]
  );

  React.useEffect(() => {
    router.invalidate().then(r => r);
  }, [auth.isAuthenticated]);

  return (
    <>
      <HttpInitializer />
      <TanstackRouterProvider router={router} context={routerContext} />
      {config.app.isDev && <TanStackRouterDevtools router={router} initialIsOpen={false} />}
    </>
  );
};

export default RouterProvider;
