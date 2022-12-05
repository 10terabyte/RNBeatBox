import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  Dimensions,
  Platform,
} from "react-native";
import React from "react";
import { Colors, Fonts } from "../constants/style";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAuthentication } from '../utils/hooks/useAuthentication';
const { width, height } = Dimensions.get("window");

const SplashScreen = (props) => {
  const { user } = useAuthentication();
  setTimeout(() => {
    
    props.navigation.push(user ? "bottomTab" : "onboardingScreen");
  }, 2000);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={Colors.black}
        barStyle={Platform.OS === "android" ? "light-content" : "default"}
      />
      <ImageBackground
        source={require("../assets/image/splash.png")}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <View
          style={{
            height: height / 12,
            width: width / 6,
            borderRadius: 10,
            backgroundColor: Colors.primary,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="musical-notes" size={40} />
        </View>
        <Text style={{ ...Fonts.SemiBold50Primary }}>MUSIC</Text>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SplashScreen;
