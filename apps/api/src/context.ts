import { User } from './db/schema';

export type Context = {
		user: User | null;
};

export const createContext = async (opts: {
		req: Request;
}): Promise<Context> => {
		// We'll implement auth token verification here later
		return {
				user: null,
		};
};