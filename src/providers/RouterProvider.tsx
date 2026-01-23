import React from 'react'
import {
    RouterProvider as TanstackRouterProvider,
    createRouter,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import HttpInitializer from '@/bootstrap'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import config from '@/config'
import { routeTree } from '@/router/routeTree'

const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultStaleTime: 1000 * 60 * 5,
    context: {
        auth: undefined!,
    },
})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

const RouterProvider = () => {
    const auth = useAuth()

    const routerContext = React.useMemo(
        () => ({
            auth: {
                isAuthenticated: auth.isAuthenticated,
                token: auth.token || '',
                logout: () => auth.methods.logout(),
            },
        }),
        [auth.isAuthenticated, auth.token]
    )

    React.useEffect(() => {
        router.invalidate().then(r => r)
    }, [auth.isAuthenticated])

    return (
        <>
            <HttpInitializer />
            <TanstackRouterProvider router={router} context={routerContext} />
            {config.app.isDev && (
                <TanStackRouterDevtools router={router} initialIsOpen={false} />
            )}
        </>
    )
}

export default RouterProvider
