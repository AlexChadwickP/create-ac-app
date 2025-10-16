import { createFileRoute, Navigate, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { signIn, useSession } from '../lib/auth';
import styles from './auth.module.css';

export const Route = createFileRoute('/login')({
		component: Login,
});

function Login() {
		const { data: session } = useSession();
		const navigate = useNavigate();
		const [error, setError] = useState('');
		const [loading, setLoading] = useState(false);

		if (session) {
				return <Navigate to="/" />;
		}

		const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
				e.preventDefault();
				setError('');
				setLoading(true);

				const formData = new FormData(e.currentTarget);

				try {
						await signIn.email({
								email: formData.get('email') as string,
								password: formData.get('password') as string,
						});
						navigate({ to: '/' });
				} catch (err) {
						setError(err instanceof Error ? err.message : 'Login failed');
				} finally {
						setLoading(false);
				}
		};

		return (
				<div className={styles.container}>
						<form onSubmit={handleSubmit} className={styles.form}>
								<h1 className={styles.title}>Sign In</h1>

								<div className={styles.field}>
										<label htmlFor="email">Email</label>
										<input id="email" name="email" type="email" required />
								</div>

								<div className={styles.field}>
										<label htmlFor="password">Password</label>
										<input id="password" name="password" type="password" required />
								</div>

								{error && <div className={styles.error}>{error}</div>}

								<button type="submit" disabled={loading} className={styles.button}>
										{loading ? 'Signing in...' : 'Sign In'}
								</button>
						</form>
				</div>
		);
}