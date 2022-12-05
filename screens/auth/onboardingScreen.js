import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Platform,
} from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../constants/style";

const { width } = Dimensions.get("window");

const OnboardingScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`onboardingScreen:${key}`);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={Colors.black}
        barStyle={Platform.OS === "android" ? "light-content" : "default"}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <ImageBackground
          source={require("../../assets/image/onboarding.png")}
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              marginHorizontal: Default.fixPadding * 1.5,
              alignItems: isRtl ? "flex-end" : "flex-start",
            }}
          >
            <Text
              style={{
                ...Fonts.ExtraBold28White,
                marginVertical: Default.fixPadding,
                maxWidth: "50%",
              }}
            >
              {tr("lifeIs")}
            </Text>
            <Text
              style={{
                ...Fonts.Medium14White,
                marginBottom: Default.fixPadding * 3,
              }}
            >
              {tr("description")}
            </Text>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("signInScreen")}
              style={{
                backgroundColor: Colors.white,
                borderRadius: 30,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                marginVertical: Default.fixPadding * 2,
                width: width / 1.1,
                paddingVertical: Default.fixPadding * 1.5,
              }}
            >
              <Text style={{ ...Fonts.ExtraBold20Primary }}>
                {tr("getStart")}
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
