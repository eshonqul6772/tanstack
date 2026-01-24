import { createRoot } from 'react-dom/client'

import * as Providers from '@/app/providers'
import * as AuthProviders from '@/features/auth/providers'

createRoot(
    document.getElementById('root')!
).render(
    <Providers.QueryProvider>
        <Providers.MantineProvider>
        <AuthProviders.AuthProvider>
            <Providers.RouterProvider />
        </AuthProviders.AuthProvider>
        </Providers.MantineProvider>
    </Providers.QueryProvider>
)
