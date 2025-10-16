import { Hono } from 'hono';
import { trpcServer } from '@hono/trpc-server';
import { appRouter } from './routers';
import { createContext } from './lib/trpc';
import { auth } from './lib/auth';
import {serve} from "@hono/node-server";

const app = new Hono();

app.use('/trpc/*', trpcServer({
		router: appRouter,
		createContext,
}));

// Better-auth endpoints
app.on(['POST', 'GET'], '/api/auth/**', (c) => {
		return auth.handler(c.req.raw);
});

serve({
		fetch: app.fetch,
		port: 3001,
}, (info) => {
		console.log(`Server running on http://localhost:${info.port}`);
});