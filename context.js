import React,{ createContext, useContext, useEffect, useState } from "react";
import auth from '@react-native-firebase/auth';
const AppContext = createContext();

export function AppWrapper({ children }) {
    const [user, setUser] = useState({});
    const [music, setMusic] = useState({});
    function onAuthStateChanged(user){
      setUser(user);
    }
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
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