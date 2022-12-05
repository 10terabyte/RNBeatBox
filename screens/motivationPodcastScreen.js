import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  BackHandler,
  StatusBar,
  Image,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import Ionicons from "react-native-vector-icons/Ionicons";

const MotivationPodcastScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`motivationPodcastScreen:${key}`);
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

  const motivationData = [
    {
      key: "1",
      name: "Gaur Gopal Das",
      image: require("../assets/image/mo1.png"),
    },
    {
      key: "2",
      name: "Mann Ki Medha",
      image: require("../assets/image/mo2.png"),
    },
    {
      key: "3",
      name: "IThrive",
      image: require("../assets/image/mo3.png"),
    },
    {
      key: "4",
      name: "Living Fearless",
      image: require("../assets/image/mo4.png"),
    },
    {
      key: "5",
      name: "Abdul Kalam",
      image: require("../assets/image/mo5.png"),
    },
    {
      key: "6",
      name: "Motivation Spark",
      image: require("../assets/image/mo6.png"),
    },
    {
      key: "7",
      name: "MD Motivation",
      image: require("../assets/image/mo7.png"),
    },
    {
      key: "8",
      name: "PositiVation",
      image: require("../assets/image/mo8.png"),
    },
    {
      key: "9",
      name: "Sachin Tendulkar",
      image: require("../assets/image/mo9.png"),
    },
    {
      key: "10",
      name: "Happy Mind",
      image: require("../assets/image/mo10.png"),
    },
    {
      key: "11",
      name: "Steve Jobs",
      image: require("../assets/image/mo11.png"),
    },
    {
      key: "12",
      name: "Voice Of Achievers",
      image: require("../assets/image/mo12.png"),
    },
  ];
  const renderItemMotivation = ({ item, index }) => {
    const isEnd =
      index === motivationData.length - 1 ||
      index === motivationData.length - 2;

    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate("podcastDetailScreen")}
        style={{
          marginLeft: Default.fixPadding * 1.5,
          marginRight: index % 2 === 0 ? 0 : Default.fixPadding * 1.5,
          marginTop: Default.fixPadding * 1.5,
          marginBottom: isEnd ? Default.fixPadding * 1.5 : 0,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Image source={item.image} style={{ alignSelf: "center" }} />
        <Text
          style={{
            ...Fonts.SemiBold16White,
            marginTop: Default.fixPadding * 0.5,
            textAlign: isRtl ? "right" : "left",
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
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
        <Text style={Fonts.Bold20White}>{tr("motivation")}</Text>
      </View>
      <FlatList
        numColumns={2}
        data={motivationData}
        renderItem={renderItemMotivation}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default MotivationPodcastScreen;
