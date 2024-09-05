import React, { useContext, useEffect, useState } from 'react';

const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem('token'));

	const isLoggedIn = !!token;

	const loginHandler = (token) => {
		setToken(token);
		localStorage.setItem('token', token);
	};

	const logoutHandler = () => {
		setToken(null);
		localStorage.removeItem('token');
	};

	useEffect(() => {
		localStorage.getItem('token');
		const logTimer = setTimeout(() => {
			logoutHandler();
			alert('session expired. Please Login Again');
		}, 5 * 60 * 1000);

		return () => clearTimeout(logTimer);
	});

	const ContextValue = {
		token,
		isLoggedIn,
		login: loginHandler,
		logout: logoutHandler,
	};

	// console.log(token);

	return <AuthContext.Provider value={ContextValue}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
