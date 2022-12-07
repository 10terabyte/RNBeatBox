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

const RecentlyPlayScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`recentlyPlayScreen:${key}`);
  }

  const backAction = () => {
    props.navigation.navigate("bottomTab");
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const recentlyPlayed = [
    {
      key: "1",
      name: "Ek tarafa",
      image: require("../assets/image/rece1.png"),
      singer: "Dhvni Bhanushali",
    },
    {
      key: "2",
      name: "Kesariya",
      image: require("../assets/image/rece2.png"),
      singer: "Arijit Singh",
    },
    {
      key: "3",
      name: "Raataan lambiyan ",
      image: require("../assets/image/rece3.png"),
      singer: "Dhvni Bhanushali",
    },
    {
      key: "4",
      name: "Halki Si Barsaat",
      image: require("../assets/image/rece4.png"),
      singer: "Saaj Bhatt",
    },
    {
      key: "5",
      name: "Ek Tu Hi Toh Hai",
      image: require("../assets/image/rece5.png"),
      singer: "Stebin Ben",
    },
    {
      key: "6",
      name: "Ek tarafa",
      image: require("../assets/image/rece6.png"),
      singer: "Dhvni Bhanushali",
    },
    {
      key: "7",
      name: "Kesariya",
      image: require("../assets/image/rece7.png"),
      singer: "Arijit Singh",
    },
    {
      key: "8",
      name: "Raataan lambiyan ",
      image: require("../assets/image/rece8.png"),
      singer: "Dhvni Bhanushali",
    },
    {
      key: "9",
      name: "Ek tarafa",
      image: require("../assets/image/rece1.png"),
      singer: "Dhvni Bhanushali",
    },
    {
      key: "10",
      name: "Kesariya",
      image: require("../assets/image/rece2.png"),
      singer: "Arijit Singh",
    },
    {
      key: "11",
      name: "Raataan lambiyan ",
      image: require("../assets/image/rece3.png"),
      singer: "Dhvni Bhanushali",
    },
    {
      key: "12",
      name: "Halki Si Barsaat",
      image: require("../assets/image/rece4.png"),
      singer: "Saaj Bhatt",
    },
    {
      key: "13",
      name: "Ek Tu Hi Toh Hai",
      image: require("../assets/image/rece5.png"),
      singer: "Stebin Ben",
    },
    {
      key: "14",
      name: "Ek tarafa",
      image: require("../assets/image/rece6.png"),
      singer: "Dhvni Bhanushali",
    },
  ];
  const renderItemRecentlyPlayed = ({ item, index }) => {
    const isEnd =
      index === recentlyPlayed.length - 1 ||
      index === recentlyPlayed.length - 2;

    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate("playScreen")}
        style={{
          marginLeft: Default.fixPadding * 1.5,
          marginRight: index % 2 === 0 ? 0 : Default.fixPadding * 1.5,
          marginTop: Default.fixPadding * 1.5,
          marginBottom: isEnd ? Default.fixPadding * 1.5 : 0,
          flex: 1,
          justifyContent: "center",
          alignItems: isRtl ? "flex-end" : "flex-start",
        }}
      >
        <Image source={item.image} style={{ alignSelf: "center" }} />
        <Text
          style={{
            ...Fonts.SemiBold14White,
            marginTop: Default.fixPadding * 0.5,
            textAlign: isRtl ? "right" : "left",
          }}
        >
          {item.name}
        </Text>
        <Text
          style={{
            ...Fonts.SemiBold12Grey,
            textAlign: isRtl ? "right" : "left",
          }}
        >
          {item.singer}
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
          onPress={() => props.navigation.navigate("bottomTab")}
        >
          <Ionicons
            name={isRtl ? "arrow-forward" : "arrow-back"}
            size={25}
            color={Colors.white}
          />
        </TouchableOpacity>
        <Text style={Fonts.Bold18White}>Darshan Raval {tr("recently")}</Text>
      </View>
      <FlatList
        numColumns={2}
        data={recentlyPlayed}
        renderItem={renderItemRecentlyPlayed}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default RecentlyPlayScreen;
