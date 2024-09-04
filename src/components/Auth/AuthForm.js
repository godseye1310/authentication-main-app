import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';
import useAuth from '../../store/auth-context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const API_KEY = 'AIzaSyDzwEjIvWQsoay8pviwSR53woljwKRkOVY';
const API_SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
const API_SIGNIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

const AuthForm = () => {
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const navigateTo = useHistory();

	const { login } = useAuth();

	const [isLogin, setIsLogin] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	const switchAuthModeHandler = () => {
		setIsLogin((prevState) => !prevState);
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		const userData = {
			email: enteredEmail,
			password: enteredPassword,
			returnSecureToken: true,
		};

		setIsLoading(true);

		try {
			if (isLogin) {
				// SIGN IN LOGIC...(Logging in Account)
				const response = await fetch(API_SIGNIN_URL, {
					method: 'POST',
					body: JSON.stringify(userData),
					headers: {
						'Content-Type': 'application/json',
					},
				});
				setIsLoading(false);

				if (response.ok) {
					const data = await response.json();
					// console.log(data);
					// console.log('idToken (JWT) : ', data.idToken); //log idToken
					login(data.idToken);
					navigateTo.replace('/');
				} else {
					const errorData = await response.json();
					console.log(errorData);
					// can show an Failed Login error modal
					let errorMessage = 'Login Failed ' + errorData.error.message;
					throw new Error(errorMessage);
				}

				////
			} else {
				// SIGN UP LOGIC (Create Account)//
				const response = await fetch(API_SIGNUP_URL, {
					method: 'POST',
					body: JSON.stringify(userData),
					headers: {
						'Content-Type': 'application/json',
					},
				});
				setIsLoading(false);
				if (response.ok) {
					console.log('Success:', response.status);
					const data = await response.json();
					console.log(data);
					login(data.idToken);

					emailInputRef.current.value = '';
					passwordInputRef.current.value = '';
					// ...
				} else {
					const data = await response.json();
					// show an error Failed SignUp modal
					console.error('Error:', data);
					let errorMessage = 'Authentication Failed';
					if (data && data.error && data.error.message) {
						errorMessage = data.error.message;
					}
					alert(errorMessage);
				}
			}
		} catch (error) {
			// console.error('Something went wrong:', error.message);
			alert(error.message);
		}
	};

	return (
		<section className={classes.auth}>
			<h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
			<form onSubmit={submitHandler}>
				<div className={classes.control}>
					<label htmlFor="email">Your Email</label>
					<input type="email" id="email" required ref={emailInputRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor="password">Your Password</label>
					<input
						type="password"
						id="password"
						required
						ref={passwordInputRef}
						autoComplete=""
					/>
				</div>
				<div className={classes.actions}>
					{!isLoading && (
						<button type="submit">{isLogin ? 'Login' : 'Create Account'}</button>
					)}
					{isLoading && (
						<img src="https://i.gifer.com/9izJ.gif" alt="creating acc" height="35px" />
					)}
					<button
						type="button"
						className={classes.toggle}
						onClick={switchAuthModeHandler}
					>
						{isLogin ? 'Create new account' : 'Login with existing account'}
					</button>
				</div>
			</form>
		</section>
	);
};

export default AuthForm;
