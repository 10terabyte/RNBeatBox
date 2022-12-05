import { Text, View, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import PodcastScreen from "./podcastScreen";
// import AllSongScreen from "./allSongScreen";
// import AlbumsScreen from "./albumsScreen";
import ArtistSearchScreen from "./artistSearchScreen";
import SongSearchScreen from "./songSearchScreen"
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createMaterialTopTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`searchScreen:${key}`);
  }

  return (
    <View
      style={{
        backgroundColor: Colors.darkBlue,
      }}
    >
      <Text
        style={{
          ...Fonts.ExtraBold20White,
          textAlign: "center",
          marginVertical: Default.fixPadding,
        }}
      >
        {tr("search")}
      </Text>

      {/* <TouchableOpacity
        onPress={() => navigation.navigate("searchMusicScreen")}
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          backgroundColor: Colors.lightBlack,
          borderRadius: 10,
          padding: Default.fixPadding * 0.8,
          marginHorizontal: Default.fixPadding * 1.5,
          marginBottom: Default.fixPadding,
        }}
      >
        <Ionicons
          name="search-outline"
          color={Colors.lightGrey}
          size={22}
          style={{
            flex: 0.6,
            justifyContent: "center",
            alignSelf: "center",
            marginLeft: isRtl ? 0 : Default.fixPadding * 0.5,
            marginRight: isRtl ? Default.fixPadding * 0.5 : 0,
          }}
        />
        <Text
          style={{
            ...Fonts.SemiBold16LightGrey,
            flex: 9.4,
            textAlign: isRtl ? "right" : "left",
            marginHorizontal: Default.fixPadding,
            paddingVertical: Default.fixPadding * 0.5,
          }}
        >
          {tr("search")}
        </Text>
      </TouchableOpacity> */}

      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                alignItems: "center",
                borderBottomColor: isFocused ? Colors.primary : Colors.black,
                borderBottomWidth: isFocused ? 3 : 0,
                paddingBottom: Default.fixPadding,
              }}
            >
              <Text
                style={{
                  ...(isFocused ? Fonts.Bold18Primary : Fonts.Bold18White),
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const SearchScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`searchScreen:${key}`);
  }
  const title = "All Artists";
  // const title2 = isRtl ? tr("prodcast") : tr("albums");

  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: false,
      }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen
        name="allArtist"
        component={ArtistSearchScreen}
        options={{
          title: title,
        }}
      />
      <Tab.Screen
        name="allSongScreen"
        component={SongSearchScreen}
        options={{
          title: "All Songs",
        }}
      />
      {/* <Tab.Screen
        name={isRtl ? "podcastScreen" : "albumsScreen"}
        component={isRtl ? PodcastScreen : AlbumsScreen}
        options={{
          title: title2,
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default SearchScreen;
