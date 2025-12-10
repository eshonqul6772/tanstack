import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";
import {RouterProvider as TanstackRouterProvider, createRouter} from '@tanstack/react-router';

import config from "@/config.ts";
import {routeTree} from '@/router/routeTree';

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


const RouterProvider = () => {
    return (
        <>
            <TanstackRouterProvider router={router}/>
            {config.app.isDev && <TanStackRouterDevtools router={router} initialIsOpen={false}/>}
        </>
    );
};

export default RouterProvider;