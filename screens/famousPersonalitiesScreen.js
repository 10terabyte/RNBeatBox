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

const FamousPersonalitiesScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`famousPersonalitiesScreen:${key}`);
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
  const famousData = [
    {
      key: "1",
      name: "Sachin Tendulkar",
      image: require("../assets/image/f1.png"),
    },
    {
      key: "2",
      name: "Sit down comedy",
      image: require("../assets/image/f2.png"),
    },
    {
      key: "3",
      name: "The left right game",
      image: require("../assets/image/f3.png"),
    },
    {
      key: "4",
      name: "Pattern of purpose",
      image: require("../assets/image/f4.png"),
    },
    {
      key: "5",
      name: "Diet science",
      image: require("../assets/image/f5.png"),
    },
    {
      key: "6",
      name: "The W.I.S.E. podcast",
      image: require("../assets/image/f6.png"),
    },
    {
      key: "7",
      name: "Discovery park",
      image: require("../assets/image/f7.png"),
    },
    {
      key: "8",
      name: "History's most",
      image: require("../assets/image/f8.png"),
    },
    {
      key: "9",
      name: "Mahatma Gandhi",
      image: require("../assets/image/f9.png"),
    },
    {
      key: "10",
      name: "Walt Disney",
      image: require("../assets/image/f10.png"),
    },
    {
      key: "11",
      name: "Steve Jobs",
      image: require("../assets/image/f11.png"),
    },
    {
      key: "12",
      name: "Simon Sinek",
      image: require("../assets/image/f12.png"),
    },
  ];

  const renderItemFamous = ({ item, index }) => {
    const isEnd =
      index === famousData.length - 1 || index === famousData.length - 2;

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
        <Text style={Fonts.Bold20White}>{tr("famous")}</Text>
      </View>
      <FlatList
        numColumns={2}
        data={famousData}
        renderItem={renderItemFamous}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default FamousPersonalitiesScreen;
