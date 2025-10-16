import { useState } from 'react';
import { signUp } from '../lib/auth';
import { trpc } from '../lib/trpc';

export function SignupForm() {
		const [error, setError] = useState('');
		const utils = trpc.useUtils();

		const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
				e.preventDefault();
				setError('');

				const formData = new FormData(e.currentTarget);
				const email = formData.get('email') as string;
				const password = formData.get('password') as string;
				const name = formData.get('name') as string;

				try {
						await signUp.email({
								email,
								password,
								name,
						});

						// Refresh session
						await utils.auth.me.invalidate();
				} catch (err) {
						setError(err instanceof Error ? err.message : 'Signup failed');
				}
		};

		return (
				<form onSubmit={handleSubmit}>
						<input name="name" type="text" placeholder="Name" required />
						<input name="email" type="email" placeholder="Email" required />
						<input name="password" type="password" placeholder="Password" required />
						{error && <div>{error}</div>}
						<button type="submit">Sign Up</button>
				</form>
		);
}