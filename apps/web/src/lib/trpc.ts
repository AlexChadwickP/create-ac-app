import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../api/src/routers';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
		links: [
				httpBatchLink({
						url: '/trpc',
				}),
		],
});