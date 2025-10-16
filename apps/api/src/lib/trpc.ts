import { initTRPC, TRPCError } from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { auth } from './auth';
import { user } from '../db/schema';
import { eq, sql } from 'drizzle-orm';
import {db} from "../db";

export async function createContext(opts: FetchCreateContextFnOptions) {
		const session = await auth.api.getSession({
				headers: opts.req.headers,
		});

		return {
				session,
				db,
		};
}

const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
		if (!ctx.session) {
				throw new TRPCError({ code: 'UNAUTHORIZED' });
		}
		return next({
				ctx: {
						session: ctx.session,
						user: ctx.session.user,
				},
		});
});

export const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
		const [userRecord] = await ctx.db
				.select()
				.from(user)
				.where(eq(user.id, ctx.user.id));

		if (userRecord?.role !== 'admin') {
				throw new TRPCError({ code: 'FORBIDDEN' });
		}
		return next({ ctx });
});