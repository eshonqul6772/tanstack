import {RouterProvider as TanstackRouterProvider, createRouter} from '@tanstack/react-router';
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";
import {routeTree} from '@/routes/routeTree';
import config from "@/config.ts";

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