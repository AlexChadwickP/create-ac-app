import { router, protectedProcedure } from '../lib/trpc';
import {role, user} from '../db/schema';
import {eq} from "drizzle-orm";

export const userRouter = router({
		list: protectedProcedure.query(async ({ ctx }) => {
				const records = await ctx.db.select().from(user).leftJoin(role, eq(user.roleId, role.id));

				return records.map((record) => ({
						...record.user,
						role: record.role
				}));
		}),
});