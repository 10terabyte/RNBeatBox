import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  BackHandler,
  TextInput,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Fonts, Default } from "../constants/style";
import { useTranslation } from "react-i18next";
import Loader from "../components/loader";

const HelpAndSupportScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`helpAndSupportScreen:${key}`);
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
  const [visible, setVisible] = useState(false);
  const [text, onChangeText] = useState();
  const [textEmail, onChangeTextEmail] = useState();
  const [textMessage, onChangeTextMessage] = useState();

  const handleSummit = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      props.navigation.navigate("profileScreen");
    }, 1500);
  };

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
        <Text style={Fonts.Bold20White}>{tr("helpSupport")}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            ...Fonts.Medium16White,
            marginHorizontal: Default.fixPadding * 1.5,
            marginTop: Default.fixPadding * 1.5,
          }}
        >
          {tr("name")}
        </Text>
        <View
          style={{
            ...Default.shadow,
            borderRadius: 10,
            backgroundColor: Colors.lightBlack,
            margin: Default.fixPadding * 1.5,
            padding: Default.fixPadding,
          }}
        >
          <TextInput
            onChangeText={onChangeText}
            selectionColor={Colors.primary}
            value={text}
            style={{
              ...Fonts.SemiBold15White,
              textAlign: isRtl ? "right" : "left",
            }}
            placeholder={tr("enterName")}
            placeholderTextColor={Colors.lightGrey}
          />
        </View>

        <Text
          style={{
            ...Fonts.Medium16White,
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          {tr("email")}
        </Text>
        <View
          style={{
            ...Default.shadow,
            borderRadius: 10,
            backgroundColor: Colors.lightBlack,
            margin: Default.fixPadding * 1.5,
            padding: Default.fixPadding,
          }}
        >
          <TextInput
            onChangeText={onChangeTextEmail}
            selectionColor={Colors.primary}
            value={textEmail}
            style={{
              ...Fonts.SemiBold15White,
              textAlign: isRtl ? "right" : "left",
            }}
            placeholder={tr("enterEmail")}
            placeholderTextColor={Colors.lightGrey}
            keyboardType="email-address"
          />
        </View>

        <Text
          style={{
            ...Fonts.Medium16White,
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          {tr("message")}
        </Text>
        <View
          style={{
            ...Default.shadow,
            borderRadius: 10,
            backgroundColor: Colors.lightBlack,
            margin: Default.fixPadding * 1.5,
            padding: Default.fixPadding,
          }}
        >
          <TextInput
            textAlignVertical="top"
            multiline={true}
            numberOfLines={5}
            style={{
              ...Fonts.SemiBold15White,
              textAlign: isRtl ? "right" : "left",
            }}
            onChangeText={onChangeTextMessage}
            selectionColor={Colors.primary}
            value={textMessage}
            placeholder={tr("writeMessage")}
            placeholderTextColor={Colors.lightGrey}
          />
        </View>
      </ScrollView>
      <Loader visible={visible} />
      <TouchableOpacity
        onPress={handleSummit}
        style={{
          ...Default.shadow,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.primary,
          marginHorizontal: Default.fixPadding * 1.5,
          marginVertical: Default.fixPadding * 1.5,
          paddingVertical: Default.fixPadding * 1.5,
          borderRadius: 25,
        }}
      >
        <Text
          style={{
            ...Fonts.ExtraBold20White,
          }}
        >
          {tr("submit")}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HelpAndSupportScreen;
