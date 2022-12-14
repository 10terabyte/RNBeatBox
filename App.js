import i18n from "./languages/index"; //don't remove this line
import React, {useState, useEffect} from "react";
import "react-native-gesture-handler";
// import { useFonts, loadAsync } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { withTranslation } from "react-i18next";
import firebaseApp from './config/firebase'
import auth from '@react-native-firebase/auth';
import AuthStack from "./stacks/AuthStack";
import MainStack from "./stacks/MainStack";
import { AppWrapper,useAppContext } from "./context";
const Stack = createStackNavigator();
import TrackPlayer, { State } from 'react-native-track-player';
import { QueueInitialTracksService, SetupService } from './services';
const MainNavigation = (props) => {
  const [initializing, setInitializing] = useState(true);
  const { user, setUser } = useAppContext();
  // Handle user state changes
  function onAuthStateChanged(_user) {
    setUser(_user);
    if (initializing) setInitializing(false);
  }
  
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    
    return subscriber; // unsubscribe on unmount
  }, []);
  return (
    <NavigationContainer>
      {user ? <MainStack screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}/> : <AuthStack screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}/>}
    </NavigationContainer>
  );
};
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import firestore from '@react-native-firebase/firestore';
// const FIRESTORE = firestore()
// const artistCollection = FIRESTORE.collection('artists')
// const beatCollection = FIRESTORE.collection('beats')
// const beats = require('./beatbox_database.json').beats
// const artists = require('./beatbox_database.json').artists
//             Object.keys(beats).map(beatKey => {
//               beatCollection.doc(beatKey).set({...beats[beatKey], playCount: 0})
//             });
const ReloadAppOnLanguageChange = withTranslation("translation", {
  bindI18n: "languageChanged",
  bindStore: false,
})(MainNavigation);


export default  function App() {
  // const [loaded] = useFonts({
    
  //   Regular: require("./assets/font/Mulish-Regular.ttf"),
  //   Medium: require("./assets/font/Mulish-Medium.ttf"),
  //   SemiBold: require("./assets/font/Mulish-SemiBold.ttf"),
  //   Bold: require("./assets/font/Mulish-Bold.ttf"),
  //   ExtraBold: require("./assets/font/Mulish-ExtraBold.ttf"),
  // });

  // if (!loaded) {
  //   return null;
  // }
  

  return <GestureHandlerRootView style={{ flex: 1 }}>
  <AppWrapper><ReloadAppOnLanguageChange /></AppWrapper>
</GestureHandlerRootView>;
}
