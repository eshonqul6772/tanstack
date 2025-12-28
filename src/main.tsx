import {createRoot} from "react-dom/client";

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
