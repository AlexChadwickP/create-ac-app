import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc, trpcClient } from './lib/trpc';
import ReactDOM from "react-dom/client";

import { routeTree } from './routeTree.gen'
import {createRouter, RouterProvider} from "@tanstack/react-router";

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
		interface Register {
				router: typeof router
		}
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
				<QueryClientProvider client={queryClient}>
						<RouterProvider router={router} />
				</QueryClientProvider>
		</trpc.Provider>
);