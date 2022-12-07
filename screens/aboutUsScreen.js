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
import React, { useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Fonts, Default } from "../constants/style";
import { useTranslation } from "react-i18next";

const AboutUsScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`aboutUsScreen:${key}`);
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
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.darkBlue }}>
      <StatusBar
        backgroundColor={Colors.darkBlue}
        barStyle={Platform.OS === "android" ? "light-content" : "default"}
      />
      <View
        style={{
          paddingVertical: Default.fixPadding,
          backgroundColor: Colors.darkBlue,
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
        <Text style={Fonts.Bold20White}>{tr("aboutUs")}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ margin: Default.fixPadding * 1.5 }}>
          <Text
            style={{
              ...Fonts.Medium14White,
              marginBottom: Default.fixPadding,
            }}
          >
            {tr("description")}
          </Text>
          <Text
            style={{
              ...Fonts.Medium14White,
              marginBottom: Default.fixPadding,
            }}
          >
            {tr("subDescription")}
          </Text>
          <Text
            style={{
              ...Fonts.Medium14White,
              marginBottom: Default.fixPadding,
            }}
          >
            {tr("subDescription")}
          </Text>
          <Text
            style={{
              ...Fonts.Medium14White,
              marginBottom: Default.fixPadding,
            }}
          >
            {tr("description")}
          </Text>
          <Text
            style={{
              ...Fonts.Medium14White,
            }}
          >
            {tr("description")}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutUsScreen;
