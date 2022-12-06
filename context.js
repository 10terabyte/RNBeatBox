import React,{ createContext, useContext, useEffect, useState } from "react";
import auth from '@react-native-firebase/auth';
import { QueueInitialTracksService, SetupService } from './services';
import { useCurrentTrack } from './hooks';
const AppContext = createContext();

export function AppWrapper({ children }) {
    const [user, setUser] = useState({});
    const [music, setMusic] = useState({});
    const track = useCurrentTrack();
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    function onAuthStateChanged(user){
      setUser(user);
    }
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

      async function run() {
        console.log("Setup Track Player,")
        const isSetup = await SetupService();
        setIsPlayerReady(isSetup);
  
        const queue = await TrackPlayer.getQueue();
        if (isSetup && queue.length <= 0) {
          await QueueInitialTracksService();
        }
      }
  
      run();
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