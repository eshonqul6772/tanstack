import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";
import {RouterProvider as TanstackRouterProvider, createRouter} from '@tanstack/react-router';

import { useAuth } from '@/modules/auth/hooks'

import config from "@/config.ts";
import {routeTree} from '@/router/routeTree';

const auth:any  = useAuth();

const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultStaleTime: 1000 * 60 * 5,
    context: {
        auth: undefined!,
    },
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}


const RouterProvider = () => {
    return (
        <>
            <TanstackRouterProvider router={router} context={{ auth }}/>
            {config.app.isDev && <TanStackRouterDevtools router={router} initialIsOpen={false}/>}
        </>
    );
};

export default RouterProvider;