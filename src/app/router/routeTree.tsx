import { lazy } from 'react'
import {
    createRoute,
    createRootRouteWithContext,
    redirect,
    Outlet,
    type Route,
} from '@tanstack/react-router'

import MainLayout from '@/widgets/layout'
import Loading from '@/shared/ui/Loading'
import ErrorComponent from '@/shared/ui/ErrorComponent'

import { allRoutes } from './routes'

interface RouterContext {
    auth: {
        isAuthenticated: boolean
        token: string
        logout: () => void
    }
}

const RootComponent = () => <Outlet />

const rootRoute = createRootRouteWithContext<RouterContext>()({
    component: RootComponent,
    pendingComponent: Loading,
    errorComponent: ErrorComponent,
})

const layoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: 'layout',
    component: MainLayout,
})

const IndexComponent = () => null

// 🔹 ROOT "/" → login yoki dashboard
const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: IndexComponent,
    beforeLoad: ({ context }) => {
        if (context.auth.isAuthenticated) {
            throw redirect({ to: '/dashboard' })
        }

        throw redirect({ to: '/login' })
    },
})

// 🔹 Route factory
const createAppRoute = (
    config: (typeof allRoutes)[number]
): Route<any> => {
    const LazyComponent = lazy(() =>
        config.component().then((m) => ({ default: m.default }))
    )

    const parentRoute = config.metadata.requiresAuth
        ? layoutRoute
        : rootRoute

    const routeConfig: any = {
        getParentRoute: () => parentRoute,
        path: config.path,
        component: LazyComponent,
    }

    routeConfig.beforeLoad = ({
                                  context,
                                  location,
                              }: {
        context: RouterContext
        location: Location
    }) => {
        // 🔓 LOGIN ROUTE
        if (config.key === 'login') {
            if (context.auth.isAuthenticated) {
                throw redirect({ to: '/dashboard' })
            }

            return
        }

        // 🔐 PROTECTED ROUTES
        if (config.metadata.requiresAuth) {
            if (!context.auth.isAuthenticated) {
                throw redirect({
                    to: '/login',
                    search: {
                        redirect:
                            location.pathname + location.search,
                    },
                })
            }
        }
    }

    return createRoute(routeConfig)
}

const appRoutes = allRoutes.map(createAppRoute)

const protectedRoutes = appRoutes.filter(
    (_, index) =>
        allRoutes[index].metadata.requiresAuth
)

const publicRoutes = appRoutes.filter(
    (_, index) =>
        !allRoutes[index].metadata.requiresAuth
)

export const routeTree = rootRoute.addChildren([
    indexRoute,
    layoutRoute.addChildren(protectedRoutes),
    ...publicRoutes,
])

export const routeMap = Object.fromEntries(
    allRoutes.map((config, index) => [
        config.key,
        appRoutes[index],
    ])
)

export { rootRoute }
