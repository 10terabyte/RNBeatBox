import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import React, { useState, useEffect } from "react";
import HomeScreen from "../screens/homeScreen";
import SearchScreen from "../screens/searchScreen";
import LibraryScreen from "../screens/libraryScreen";
import ProfileScreen from "../screens/profileScreen";
import { Colors, Default } from "../constants/style";
import { BackHandler, Dimensions } from "react-native";
import Toast from "react-native-root-toast";

export const Tab = createBottomTabNavigator();

const { height } = Dimensions.get("window");

const BackHandlerExitApp = (props) => {
  const { t } = useTranslation();

  function tr(key) {
    return t(`bottomTab:${key}`);
  }

  const [exitApp, setExitApp] = useState(0);
  const backAction = () => {
    setTimeout(() => {
      setExitApp(0);
    }, 2000);

    if (exitApp === 0) {
      setExitApp(exitApp + 1);

      Toast.show(tr("exitApp"), {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: Colors.white,
        textColor: Colors.black,
      });
    } else if (exitApp === 1) {
      BackHandler.exitApp();
    }
    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  });
  return <></>;
};

const BottomTab = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`bottomTab:${key}`);
  }
  const title1 = isRtl ? tr("profile") : tr("home");
  const title2 = isRtl ? tr("home") : tr("profile");
  const title3 = isRtl ? "Playlist" : tr("search");
  const title4 = isRtl ? tr("search") : "Playlist";

  return (
    <>
      <Tab.Navigator
        initialRouteName="homeScreen"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: Colors.black,
            padding: Default.fixPadding * 0.5,
            height: height / 13,
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarLabelStyle: {
            fontFamily: "Medium",
            fontSize: 14,
            paddingBottom: Default.fixPadding * 0.5,
          },
        }}
      >
        <Tab.Screen
          name={isRtl ? "profileScreen" : "homeScreen"}
          component={isRtl ? ProfileScreen : HomeScreen}
          options={{
            title: title1,
            tabBarActiveTintColor: Colors.primary,
            headerShown: false,
            tabBarIcon: ({ focused, size }) => (
              <Ionicons
                name={isRtl ? "person-outline" : "home-outline"}
                color={focused ? Colors.primary : Colors.lightGrey}
                size={22}
              />
            ),
          }}
        />
        <Tab.Screen
          name={isRtl ? "libraryScreen" : "searchScreen"}
          component={isRtl ? HomeScreen : SearchScreen}
          options={{
            title: title3,
            tabBarActiveTintColor: Colors.primary,
            headerShown: false,
            tabBarIcon: ({ focused, size }) => (
              <MaterialIcons
                name={isRtl ? "queue-music" : "search"}
                color={focused ? Colors.primary : Colors.lightGrey}
                size={25}
              />
            ),
          }}
        />
        <Tab.Screen
          name={isRtl ? "searchScreen" : "libraryScreen"}
          component={isRtl ? SearchScreen : HomeScreen}
          options={{
            title: title4,
            tabBarActiveTintColor: Colors.primary,
            headerShown: false,
            tabBarIcon: ({ focused, size }) => (
              <MaterialIcons
                name={isRtl ? "search" : "queue-music"}
                color={focused ? Colors.primary : Colors.lightGrey}
                size={25}
              />
            ),
          }}
        />
        <Tab.Screen
          name={isRtl ? "homeScreen" : "profileScreen"}
          component={isRtl ? HomeScreen : ProfileScreen}
          options={{
            title: title2,
            tabBarActiveTintColor: Colors.primary,
            headerShown: false,
            tabBarIcon: ({ focused, size }) => (
              <Ionicons
                name={isRtl ? "home-outline" : "person-outline"}
                color={focused ? Colors.primary : Colors.lightGrey}
                size={22}
              />
            ),
          }}
        />
      </Tab.Navigator>

      <BackHandlerExitApp />
    </>
  );
};
export default BottomTab;
