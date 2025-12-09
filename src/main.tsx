import "@/bootstrap";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App";
import * as Providers from "@/providers";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Providers.QueryProvider>
			<Providers.RouterProvider>
			<App />
			</Providers.RouterProvider>
		</Providers.QueryProvider>
	</StrictMode>,
);
