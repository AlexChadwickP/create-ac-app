import { createFileRoute } from '@tanstack/react-router';
import { trpc } from '../lib/trpc';
import styles from './users.module.css';

export const Route = createFileRoute('/users')({
		component: Users,
});

function Users() {
		const { data: users, isLoading } = trpc.user.list.useQuery();
		const { data: me } = trpc.auth.me.useQuery();

		if (isLoading) return <div>Loading...</div>;

		return (
				<div>
						<h1>Users</h1>
						<div className={styles.grid}>
								{users?.map((user) => (
										<div key={user.id} className={styles.card}>
												<h3>{user.name}</h3>
												<p>{user.email}</p>
												<div className={styles.badges}>
														{user.role?.sysName === 'admin' && <span className={styles.admin}>Admin</span>}
														{user.id === me?.id && <span className={styles.you}>You</span>}
												</div>
										</div>
								))}
						</div>
				</div>
		);
}