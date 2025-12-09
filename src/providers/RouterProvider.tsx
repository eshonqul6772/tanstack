// src/providers/RouterProvider.tsx
import * as React from 'react';
import { RouterProvider as TanstackRouterProvider, createRouter } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { routeTree } from '@/routes/routeTree';

// Router yaratish
const router = createRouter({ 
  routeTree,
  defaultPreload: 'intent',
  defaultStaleTime: 1000 * 60 * 5, 
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

interface IProps {
  children?: React.ReactNode;
}

const RouterProvider: React.FC<IProps> = ({ children }) => {
  return (
    <TanstackRouterProvider router={router}>
      {children}
    </TanstackRouterProvider>
  );
};

export default RouterProvider;