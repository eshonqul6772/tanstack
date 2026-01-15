import {createRoot} from "react-dom/client";

// Mantine CSS imports (must be imported before any Mantine components)
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/modals/styles.css';
import '@mantine/dates/styles.css';

import * as Providers from "@/providers";

import * as AuthContainer from "@/modules/auth/containers";

createRoot(document.getElementById("root")!).render(
    <Providers.QueryProvider>
        <Providers.MantineProvider>
            <AuthContainer.AuthProvider>
                <Providers.RouterProvider/>
            </AuthContainer.AuthProvider>
        </Providers.MantineProvider>
    </Providers.QueryProvider>
);
