import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  BackHandler,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Fonts, Default } from "../constants/style";
import { useTranslation } from "react-i18next";
import ToggleSwitch from "toggle-switch-react-native";

const AppSettingScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`appSettingScreen:${key}`);
  }

  const backAction = () => {
    props.navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const [notification, setNotification] = useState(true);
  const switchNotification = () =>
    setNotification((previousState) => !previousState);

  const [darkMode, setDarkMode] = useState(true);
  const switchDarkMode = () => setDarkMode((previousState) => !previousState);

  const [update, setUpdate] = useState(false);
  const switchUpdate = () => setUpdate((previousState) => !previousState);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.boldBlack }}>
      <StatusBar
        backgroundColor={Colors.boldBlack}
        barStyle={Platform.OS === "android" ? "light-content" : "default"}
      />
      <View
        style={{
          paddingVertical: Default.fixPadding,
          backgroundColor: Colors.boldBlack,
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{ marginHorizontal: Default.fixPadding * 1.5 }}
          onPress={() => props.navigation.goBack()}
        >
          <Ionicons
            name={isRtl ? "arrow-forward" : "arrow-back"}
            size={25}
            color={Colors.white}
          />
        </TouchableOpacity>
        <Text style={Fonts.Bold20White}>{tr("appSettings")}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            marginTop: Default.fixPadding * 2,
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          <View style={{ flex: 8.5 }}>
            <Text style={{ ...Fonts.Bold18White }}>{tr("notification")}</Text>
            <Text style={{ ...Fonts.Regular14Grey }}>{tr("description")}</Text>
          </View>

          <ToggleSwitch
            style={{ flex: 1.5 }}
            isOn={notification}
            onColor={Colors.primary}
            offColor={Colors.lightGrey}
            size="medium"
            onToggle={switchNotification}
          />
        </View>

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            marginTop: Default.fixPadding * 2,
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          <View style={{ flex: 8.5 }}>
            <Text style={{ ...Fonts.Bold18White }}>{tr("darkMode")}</Text>
            <Text style={{ ...Fonts.Regular14Grey }}>{tr("description")}</Text>
          </View>

          <ToggleSwitch
            style={{ flex: 1.5 }}
            isOn={darkMode}
            onColor={Colors.primary}
            offColor={Colors.lightGrey}
            size="medium"
            onToggle={switchDarkMode}
          />
        </View>

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            marginTop: Default.fixPadding * 2,
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          <View style={{ flex: 8.5 }}>
            <Text style={{ ...Fonts.Bold18White }}>{tr("update")}</Text>
            <Text style={{ ...Fonts.Regular14Grey }}>{tr("description")}</Text>
          </View>

          <ToggleSwitch
            style={{ flex: 1.5 }}
            isOn={update}
            onColor={Colors.primary}
            offColor={Colors.lightGrey}
            size="medium"
            onToggle={switchUpdate}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppSettingScreen;
