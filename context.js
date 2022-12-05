import React,{ createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
const AppContext = createContext();
const auth = getAuth();
export function AppWrapper({ children }) {
    const [user, setUser] = useState({});
    const [music, setMusic] = useState({});
	
    useEffect(() => {
        const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (_user) => {
          if (user) {
            
            setUser(_user);
          } else {
            // User is signed out
            setUser(undefined);
          }
        });
    
        return unsubscribeFromAuthStatuChanged;
      },[])
    const context = {
		user, setUser,
        music, setMusic,
	}
	return (
		<AppContext.Provider value={context}>
			{children}
		</AppContext.Provider>
	)
}

export function useAppContext() {
	return useContext(AppContext);
}