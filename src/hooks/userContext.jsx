import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userName, setUserName] = useState(null);
	const [userEmail, setUserEmail] = useState(null);

	const logIn = name => {
		setIsLoggedIn(true);
		setUserName(name);
	};
	const signUp = (name, email) => {
		setIsLoggedIn(true);
		setUserName(name);
		setUserEmail(email);
	};

	const logOut = () => {
		setIsLoggedIn(false);
		setUserName(null);
		setUserEmail(null);
	};

	return (
		<UserContext.Provider
			value={{ isLoggedIn, userName, userEmail, logIn, logOut, signUp }}
		>
			{children}
		</UserContext.Provider>
	);
};
