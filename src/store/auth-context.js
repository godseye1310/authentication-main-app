import React, { useContext, useState } from 'react';

const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
	const [token, setToken] = useState(null);

	const isLoggedIn = !!token;

	const loginHandler = (token) => {
		setToken(token);
	};

	const logoutHandler = () => {
		setToken(null);
	};

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
