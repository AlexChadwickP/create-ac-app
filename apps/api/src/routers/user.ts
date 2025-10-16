import { router, protectedProcedure } from '../lib/trpc';
import { user } from '../db/schema';

export const userRouter = router({
		list: protectedProcedure.query(async ({ ctx }) => {
				return ctx.db.select().from(user);
		}),
});