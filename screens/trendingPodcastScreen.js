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

const TrendingPodcastScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`trendingPodcastScreen:${key}`);
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

  const trendingData = [
    {
      key: "1",
      name: "Vedanta talks",
      image: require("../assets/image/t1.png"),
    },
    {
      key: "2",
      name: "Pattern of purpose",
      image: require("../assets/image/t2.png"),
    },
    {
      key: "3",
      name: "Open question",
      image: require("../assets/image/t3.png"),
    },
    {
      key: "4",
      name: "The W.I.S.E. podcast",
      image: require("../assets/image/t4.png"),
    },
    {
      key: "5",
      name: "Stories for kids",
      image: require("../assets/image/t5.png"),
    },
    {
      key: "6",
      name: "Bill Gates ",
      image: require("../assets/image/t6.png"),
    },
    {
      key: "7",
      name: "Motivational poems",
      image: require("../assets/image/t7.png"),
    },
    {
      key: "8",
      name: "Sit Down Comedy",
      image: require("../assets/image/t8.png"),
    },
    {
      key: "9",
      name: "Tomorrow's legends",
      image: require("../assets/image/t9.png"),
    },
    {
      key: "10",
      name: "Pod To Pluto",
      image: require("../assets/image/t10.png"),
    },
  ];
  const renderItemTreading = ({ item, index }) => {
    const isEnd =
      index === trendingData.length - 1 || index === trendingData.length - 2;

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
        <Text style={Fonts.Bold20White}>{tr("treading")}</Text>
      </View>
      <FlatList
        numColumns={2}
        data={trendingData}
        renderItem={renderItemTreading}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default TrendingPodcastScreen;
