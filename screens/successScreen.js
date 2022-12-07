import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
import { Colors, Fonts, Default } from "../constants/style";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useTranslation } from "react-i18next";

const SuccessScreen = (props) => {
  const { t } = useTranslation();

  function tr(key) {
    return t(`successScreen:${key}`);
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.darkBlue,
      }}
    >
      <StatusBar
        backgroundColor={Colors.black}
        barStyle={Platform.OS === "android" ? "light-content" : "default"}
      />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            height: 60,
            width: 60,
            borderRadius: 30,
            backgroundColor: Colors.white,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <FontAwesome5 name="check" size={30} color={Colors.black} />
        </View>
        <Text
          style={{ ...Fonts.SemiBold18White, marginTop: Default.fixPadding }}
        >
          {tr("congratulation")}
        </Text>
        <Text
          style={{
            ...Fonts.Regular14Grey,
            marginTop: Default.fixPadding,
            textAlign: "center",
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          {tr("description")}
        </Text>
      </View>
      <TouchableOpacity onPress={() => props.navigation.navigate("bottomTab")}>
        <Text
          style={{
            ...Fonts.SemiBold18White,
            margin: Default.fixPadding * 2,
            textAlign: "center",
          }}
        >
          {tr("backToHome")}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SuccessScreen;
