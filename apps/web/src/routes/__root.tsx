import {Outlet, createRootRoute, Link} from '@tanstack/react-router'
import {signOut, useSession} from "../lib/auth.ts";
import styles from './root.module.css';

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
		const { data: session } = useSession();

		return (
				<div className={styles.container}>
						<nav className={styles.nav}>
								<div className={styles.navContent}>
										<Link to="/" className={styles.logo}>App</Link>
										<div className={styles.navLinks}>
												{session ? (
														<>
																<Link to="/users" className={styles.link}>Users</Link>
																<span className={styles.user}>{session.user.name}</span>
																<button onClick={() => signOut()} className={styles.button}>
																		Logout
																</button>
														</>
												) : (
														<>
																<Link to="/login" className={styles.link}>Login</Link>
																<Link to="/register" className={styles.link}>Register</Link>
														</>
												)}
										</div>
								</div>
						</nav>
						<main className={styles.main}>
								<Outlet />
						</main>
				</div>
  )
}
