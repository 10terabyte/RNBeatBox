import i18n from "./languages/index"; //don't remove this line
import React from "react";
import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { withTranslation } from "react-i18next";
import firebaseApp from './config/firebase'
import { useAuthentication } from './utils/hooks/useAuthentication';
import AuthStack from "./stacks/AuthStack";
import MainStack from "./stacks/MainStack";
const Stack = createStackNavigator();
 
const MainNavigation = (props) => {
  const { user } = useAuthentication();
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
const ReloadAppOnLanguageChange = withTranslation("translation", {
  bindI18n: "languageChanged",
  bindStore: false,
})(MainNavigation);

export default function App() {
  const [loaded] = useFonts({
    Regular: require("./assets/font/Mulish-Regular.ttf"),
    Medium: require("./assets/font/Mulish-Medium.ttf"),
    SemiBold: require("./assets/font/Mulish-SemiBold.ttf"),
    Bold: require("./assets/font/Mulish-Bold.ttf"),
    ExtraBold: require("./assets/font/Mulish-ExtraBold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return <ReloadAppOnLanguageChange />;
}
