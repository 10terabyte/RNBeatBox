import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, Fonts, Default } from "../constants/style";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Loader from "../components/loader";

const LanguageScreen = (props) => {
  const [visible, setVisible] = useState(false);
  const backAction = () => {
    props.navigation.navigate("profileScreen");
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const { t, i18n } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState(
    i18n.resolvedLanguage
  );

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`languageScreen:${key}`);
  }

  async function onChangeLang(lang) {
    i18n.changeLanguage(lang);
    try {
      await AsyncStorage.setItem("@APP:languageCode", lang);
    } catch (error) {
      alert("something went wrong");
    }
  }

  const onDisableHandler = i18n.language === selectedLanguage;

  function languageOpt({ name, lang }) {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedLanguage(lang);
        }}
        style={{
          backgroundColor: Colors.lightBlack,
          ...Default.shadow,
          borderRadius: 8,
          alignItems: "center",
          paddingVertical: Default.fixPadding * 1.5,
          marginBottom: Default.fixPadding * 1.5,
          flexDirection: isRtl ? "row-reverse" : "row",
        }}
      >
        <MaterialCommunityIcons
          name={selectedLanguage === lang ? "circle-slice-8" : "circle-outline"}
          size={24}
          color={selectedLanguage === lang ? Colors.primary : Colors.white}
          style={{ marginHorizontal: Default.fixPadding * 1.5 }}
        />
        <Text style={{ ...Fonts.Bold16White }}>{name}</Text>
      </TouchableOpacity>
    );
  }

  const handleUpdate = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      onChangeLang(selectedLanguage);
    }, 1500);
  };

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
        <Text style={Fonts.Bold20White}>{tr("languages")}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: Default.fixPadding * 1.5,
            marginVertical: Default.fixPadding * 1.5,
          }}
        >
          {languageOpt({ name: "English", lang: "en" })}
          {languageOpt({ name: "हिन्दी", lang: "hi" })}
          {languageOpt({ name: "bahasa Indonesia", lang: "id" })}
          {languageOpt({ name: "中国人", lang: "ch" })}
          {languageOpt({ name: "عربي", lang: "ar" })}
        </View>
      </ScrollView>
      <Loader visible={visible} />
      <TouchableOpacity
        onPress={handleUpdate}
        disabled={onDisableHandler}
        style={[onDisableHandler ? styles.disableStyle : styles.enableStyle]}
      >
        <Text
          style={{
            ...Fonts.ExtraBold20White,
          }}
        >
          {tr("update")}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  disableStyle: {
    ...Default.shadow,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.grey,
    marginHorizontal: Default.fixPadding * 1.5,
    marginVertical: Default.fixPadding * 1.5,
    paddingVertical: Default.fixPadding * 1.5,
    borderRadius: 25,
  },
  enableStyle: {
    ...Default.shadow,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    marginHorizontal: Default.fixPadding * 1.5,
    marginVertical: Default.fixPadding * 1.5,
    paddingVertical: Default.fixPadding * 1.5,
    borderRadius: 25,
  },
});
export default LanguageScreen;
