import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../lib/trpc';
import { auth } from '../lib/auth';
import {role, user} from '../db/schema';
import { eq, sql } from 'drizzle-orm';
import {generateId} from "better-auth";

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


						// Ensure roles exist
						let adminRole = await ctx.db.query.role.findFirst({
								where: eq(role.sysName, 'admin')
						});

						console.log("Admin role: ", adminRole);

						let userRole = await ctx.db.query.role.findFirst({
								where: eq(role.sysName, 'user')
						});

						if (!adminRole) {
								[adminRole] = await ctx.db.insert(role).values({
										id: generateId(15),
										sysName: 'admin',
										name: 'Administrator',
										description: 'Full system access',
								}).returning();
						}

						if (!userRole) {
								[userRole] = await ctx.db.insert(role).values({
										id: generateId(15),
										sysName: 'user',
										name: 'User',
										description: 'Standard user access',
								}).returning();
						}

						// Create user via better-auth
						await auth.api.signUpEmail({
								body: input,

						});

						// Get the created user
						const [newUser] = await ctx.db
								.select()
								.from(user)
								.where(eq(user.email, input.email));

						if (newUser) {
								const assignedRoleId = isFirstUser ? adminRole.id : userRole.id;

								await ctx.db
										.update(user)
										.set({ roleId: assignedRoleId })
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