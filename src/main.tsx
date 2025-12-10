import "@/bootstrap";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import * as Providers from "@/providers";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Providers.QueryProvider>
			<Providers.RouterProvider/>
		</Providers.QueryProvider>
	</StrictMode>,
);
