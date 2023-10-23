import React, { useState, useEffect, createContext } from 'react';

import InMemory from './Auth/InMemory';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState({ user: null, token: undefined });

    useEffect(() => {
        console.log('useEffect UserProvider is called');
        const checkLoggedIn = async () => {
            setCurrentUser({ user: InMemory.getProfile(), token: InMemory.getToken() });
        };
        checkLoggedIn();
    }, []);

    return (
        <UserContext.Provider value={[currentUser, setCurrentUser]}>
            { children }
        </UserContext.Provider>
    );

};

export default UserContext;
