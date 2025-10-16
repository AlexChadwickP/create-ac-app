import { createFileRoute, Navigate, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { signUp, useSession } from '../lib/auth';
import styles from './auth.module.css';

export const Route = createFileRoute('/register')({
		component: Register,
});

function Register() {
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
						await signUp.email({
								email: formData.get('email') as string,
								password: formData.get('password') as string,
								name: formData.get('name') as string,
						});
						navigate({ to: '/' });
				} catch (err) {
						setError(err instanceof Error ? err.message : 'Signup failed');
				} finally {
						setLoading(false);
				}
		};

		return (
				<div className={styles.container}>
						<form onSubmit={handleSubmit} className={styles.form}>
								<h1 className={styles.title}>Create Account</h1>

								<div className={styles.field}>
										<label htmlFor="name">Name</label>
										<input id="name" name="name" type="text" required />
								</div>

								<div className={styles.field}>
										<label htmlFor="email">Email</label>
										<input id="email" name="email" type="email" required />
								</div>

								<div className={styles.field}>
										<label htmlFor="password">Password</label>
										<input id="password" name="password" type="password" required minLength={8} />
								</div>

								{error && <div className={styles.error}>{error}</div>}

								<button type="submit" disabled={loading} className={styles.button}>
										{loading ? 'Creating account...' : 'Sign Up'}
								</button>
						</form>
				</div>
		);
}