import React, { createContext, useContext, useEffect, useState } from "react";
import auth, { firebase } from '@react-native-firebase/auth';
import { QueueInitialTracksService, SetupService } from './services';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
  State, Track
} from 'react-native-track-player';
const AppContext = createContext();
const events = [
  Event.PlaybackTrackChanged, Event.PlaybackState
];
export function AppWrapper({ children }) {
  const [user, setUser] = useState({});
  const [customerData, setCustomerData] = useState({})
  const [music, setMusic] = useState({});
  const [trackIndex, setTrackIndex] = useState(undefined);
  const [currentTrack, setTrack] = useState({});
  const setEmptyTrack = () => {
    setTrack(undefined)
    setTrackIndex(undefined)

  }
  useTrackPlayerEvents(events, async (event) => {
    console.log("UpdateTrackPlayerEvent", event)
    // setTrackIndex(event.nextTrack)
    if (event.nextTrack !== undefined) {
      console.log("Next Track Index", event.nextTrack)
      const track = await TrackPlayer.getTrack(event.nextTrack);
      console.log("Get Track", track)
      setTrack(track || undefined);
    }

  });
  // useEffect(() => {
  //   console.log("UseEffect for trackIndex")
  //   if (trackIndex === undefined) return;
  //   (async () => {
  //     const track = await TrackPlayer.getTrack(trackIndex);
  //     setTrack(track || undefined);
  //   })();
  // }, [trackIndex]);
  // console.log(currentTrack,"in useCurrentTrack")
  // return {currentTrack, setEmptyTrack};

  const [isPlayerReady, setIsPlayerReady] = useState(false);
  function onAuthStateChanged(user) {
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
  useEffect(() => {
    const subscriber = auth().onUserChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if(user && user?.uid){
      console.log("userID", user.uid)
      const unsubscribe = firebase.firestore().collection('customers').doc(user.uid).onSnapshot(snpShot => {
        // console.log(snpShot.data(), "customer details")
        setCustomerData(snpShot.data())
      })
      return () => {
        unsubscribe()
      }
    }
    
  }, [user])

  const context = {
    user, setUser,
    music, setMusic,
    currentTrack, setEmptyTrack, customerData

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
