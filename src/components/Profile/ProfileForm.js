import { useRef } from 'react';
import classes from './ProfileForm.module.css';
import useAuth from '../../store/auth-context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const API_KEY = 'AIzaSyDzwEjIvWQsoay8pviwSR53woljwKRkOVY';
const API_URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;

const ProfileForm = () => {
	const newPasswordRef = useRef();
	const { token } = useAuth();
	const navigateTo = useHistory();

	const submitHandler = async (event) => {
		event.preventDefault();

		const newEnteredPassword = newPasswordRef.current.value;
		const psetData = {
			idToken: token,
			password: newEnteredPassword,
			returnSecureToken: false,
		};

		try {
			if (token) {
				const response = await fetch(API_URL, {
					method: 'POST',
					body: JSON.stringify(psetData),
					headers: {
						'Content-Type': 'application/json',
					},
				});
				console.log(response.status);

				if (response.ok) {
					// const data = await response.json();
					// console.log(data);
					navigateTo.replace('/');
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={submitHandler} className={classes.form}>
			<div className={classes.control}>
				<label htmlFor="new-password">New Password</label>
				<input
					type="password"
					id="new-password"
					required
					ref={newPasswordRef}
					autoComplete=""
				/>
			</div>
			<div className={classes.action}>
				<button>Change Password</button>
			</div>
		</form>
	);
};

export default ProfileForm;
