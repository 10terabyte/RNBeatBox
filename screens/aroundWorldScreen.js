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

const AroundWorldScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`aroundWorldScreen:${key}`);
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

  const aroundWorldData = [
    {
      key: "1",
      name: "Live your best life",
      image: require("../assets/image/w1.png"),
    },
    {
      key: "2",
      name: "Sit down comedy",
      image: require("../assets/image/w2.png"),
    },
    {
      key: "3",
      name: "The left right game",
      image: require("../assets/image/w3.png"),
    },
    {
      key: "4",
      name: "Pattern of purpose",
      image: require("../assets/image/w4.png"),
    },
    {
      key: "5",
      name: "Diet science",
      image: require("../assets/image/w5.png"),
    },
    {
      key: "6",
      name: "The W.I.S.E. podcast",
      image: require("../assets/image/w6.png"),
    },
    {
      key: "7",
      name: "Discovery park",
      image: require("../assets/image/w7.png"),
    },
    {
      key: "8",
      name: "History's most",
      image: require("../assets/image/w8.png"),
    },
    {
      key: "9",
      name: "Unlock me today!",
      image: require("../assets/image/w9.png"),
    },
    {
      key: "10",
      name: "Pod To pluto",
      image: require("../assets/image/w10.png"),
    },
    {
      key: "11",
      name: "Pod To pluto",
      image: require("../assets/image/w11.png"),
    },
    {
      key: "12",
      name: "Naturally inspired",
      image: require("../assets/image/w12.png"),
    },
  ];
  const renderItemAroundWorld = ({ item, index }) => {
    const isEnd =
      index === aroundWorldData.length - 1 ||
      index === aroundWorldData.length - 2;

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
        <Text style={Fonts.Bold20White}>{tr("aroundWorld")}</Text>
      </View>
      <FlatList
        numColumns={2}
        data={aroundWorldData}
        renderItem={renderItemAroundWorld}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default AroundWorldScreen;
