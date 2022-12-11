import {
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
} from "react-native";
import { Colors, Fonts, Default } from "../../constants/style";
import OTPTextView from "react-native-otp-textinput";
import { useTranslation } from "react-i18next";
import Ionicons from "react-native-vector-icons/Ionicons";
import Loader from "../../components/loader";
import React, { useState } from "react";

const { width } = Dimensions.get("window");

const VerificationScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`verificationScreen:${key}`);
  }

  const [visible, setVisible] = useState(false);

  const handleVerify = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      props.navigation.navigate("bottomTab");
    }, 1500);
  };
  const handleRecent = () =>{
    
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.black }}>
      <StatusBar
        backgroundColor={Colors.black}
        barStyle={Platform.OS === "android" ? "light-content" : "default"}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
      >
        <Text
          style={{
            ...Fonts.ExtraBold24White,
            marginVertical: Default.fixPadding,
          }}
        >
          {tr("otp")}
        </Text>
        <Text
          style={{
            ...Fonts.SemiBold14LightGrey,
            maxWidth: "80%",
            textAlign: "center",
          }}
        >
          {tr("pleaseEnter")}
        </Text>
        <OTPTextView
          containerStyle={{
            marginVertical: Default.fixPadding * 2,
            marginHorizontal: Default.fixPadding * 4,
          }}
          textInputStyle={{
            backgroundColor: Colors.lightBlack,
            borderRadius: 10,
            marginHorizontal: Default.fixPadding * 1.5,
            ...Fonts.Medium22White,
            ...Default.shadow,
            marginVertical: Default.fixPadding * 2,
            selectionColor: Colors.primary,
          }}
          tintColor={Colors.transparent}
          offTintColor={Colors.transparent}
          inputCount={4}
          keyboardType="numeric"
        />
        <Loader visible={visible} />
        <TouchableOpacity
          onPress={handleRecent}
         
        >
          <Text style={{ ...Fonts.ExtraBold20White }}>Recend?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleVerify}
          style={{
            ...Default.shadow,
            alignItems: "center",
            width: width / 1.1,
            justifyContent: "center",
            backgroundColor: Colors.primary,
            marginVertical: Default.fixPadding * 3,
            paddingVertical: Default.fixPadding * 1.5,
            borderRadius: 25,
          }}
        >
          <Text style={{ ...Fonts.ExtraBold20White }}>{tr("verify")}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerificationScreen;
