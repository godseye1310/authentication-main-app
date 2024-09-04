import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import useAuth from '../../store/auth-context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const MainNavigation = () => {
	const { isLoggedIn, logout } = useAuth();

	const navigate = useHistory();

	const handleLogout = () => {
		navigate.replace('/auth');
		logout();
	};

	return (
		<header className={classes.header}>
			<Link to="/">
				<div className={classes.logo}>React Auth</div>
			</Link>
			<nav>
				<ul>
					{!isLoggedIn && (
						<li>
							<Link to="/auth">Login</Link>
						</li>
					)}
					{isLoggedIn && (
						<li>
							<Link to="/profile">Profile</Link>
						</li>
					)}

					{isLoggedIn && (
						<li>
							<button onClick={handleLogout}>Logout</button>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;
