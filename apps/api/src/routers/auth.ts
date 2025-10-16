import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../lib/trpc';
import { auth } from '../lib/auth';
import { user } from '../db/schema';
import { eq, sql } from 'drizzle-orm';

export const authRouter = router({
		signup: publicProcedure
				.input(z.object({
						email: z.string().email(),
						password: z.string().min(8),
						name: z.string().min(1),
				}))
				.mutation(async ({ input, ctx }) => {
						// Check if first user
						const [{ count }] = await ctx.db
								.select({ count: sql<number>`cast(count(*) as integer)` })
								.from(user);

						const isFirstUser = count === 0;

						// Create user via better-auth
						await auth.api.signUpEmail({
								body: input,
						});

						// Get the created user
						const [newUser] = await ctx.db
								.select()
								.from(user)
								.where(eq(user.email, input.email));

						// Make first user admin
						if (isFirstUser && newUser) {
								await ctx.db
										.update(user)
										.set({ role: 'admin' })
										.where(eq(user.id, newUser.id));

								return { ...newUser, role: 'admin' };
						}

						return newUser;
				}),

		me: protectedProcedure.query(async ({ ctx }) => {
				const [userRecord] = await ctx.db
						.select()
						.from(user)
						.where(eq(user.id, ctx.user.id));

				return userRecord;
		}),
});