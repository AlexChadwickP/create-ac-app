import { createFileRoute, Navigate } from '@tanstack/react-router';
import { useSession } from '../lib/auth';

export const Route = createFileRoute('/')({
		component: Index,
});

function Index() {
		const { data: session } = useSession();

		if (!session) {
				return <Navigate to="/login" />;
		}

		return (
				<div>
						<h1>Welcome, {session.user.name}!</h1>
				</div>
		);
}