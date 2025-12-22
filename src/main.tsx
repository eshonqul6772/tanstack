import "@/bootstrap";

import {StrictMode} from "react";
import {createRoot} from "react-dom/client";

import * as Providers from "@/providers";

import * as AuthContainer from "@/modules/auth/containers";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthContainer.AuthProvider>
            <Providers.QueryProvider>
                <Providers.RouterProvider/>
            </Providers.QueryProvider>
        </AuthContainer.AuthProvider>
    </StrictMode>,
);
