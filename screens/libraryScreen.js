import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import BottomMusic from "../components/bottomMusic";

const LibraryScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`libraryScreen:${key}`);
  }

  const recentlyPlayed = [
    {
      key: "1",
      name: "Ek tarafa",
      image: require("../assets/image/pic1.png"),
      singer: "Dhvni Bhanushali",
    },
    {
      key: "2",
      name: "Kesariya",
      image: require("../assets/image/pic2.png"),
      singer: "Arijit Singh",
    },
    {
      key: "3",
      name: "Raataan lambiyan ",
      image: require("../assets/image/pic3.png"),
      singer: "Dhvni Bhanushali",
    },
    {
      key: "4",
      name: "Halki Si Barsaat",
      image: require("../assets/image/pic4.png"),
      singer: "Saaj Bhatt",
    },
    {
      key: "5",
      name: "Ek Tu Hi Toh Hai",
      image: require("../assets/image/pic5.png"),
      singer: "Stebin Ben",
    },
  ];
  const renderItemRecentlyPlayed = ({ item, index }) => {
    const isFirst = index === 0;
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate("playScreen")}
        style={{
          marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
          marginRight: Default.fixPadding * 1.5,
          marginBottom: Default.fixPadding * 3,
        }}
      >
        <Image source={item.image} />
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
            marginTop: Default.fixPadding * 0.5,
            textAlign: isRtl ? "right" : "left",
          }}
        >
          {item.singer}
        </Text>
      </TouchableOpacity>
    );
  };

  const albumData = [
    {
      key: "1",
      title: tr("myLikes"),
      name: tr("50songs"),
      image: require("../assets/image/library1.png"),
      navigateTo: "libraryMyLikeScreen",
    },
    {
      key: "2",
      title: tr("artist"),
      name: tr("10artist"),
      image: require("../assets/image/library2.png"),
      navigateTo: "libraryArtistScreen",
    },
    {
      key: "3",
      title: tr("playlist"),
      name: tr("10playlist"),
      image: require("../assets/image/library3.png"),
      navigateTo: "libraryPlayListScreen",
    },
    {
      key: "4",
      title: tr("podcast"),
      name: tr("4podcast"),
      image: require("../assets/image/library4.png"),
      navigateTo: "libraryPodcastScreen",
    },
  ];

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
          alignItems: "center",
        }}
      >
        <Text style={Fonts.Bold20White}>{tr("library")}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            ...Fonts.Bold20White,
            marginHorizontal: Default.fixPadding * 1.5,
            marginVertical: Default.fixPadding,
          }}
        >
          Favourite Beat
        </Text>

        <FlatList
          horizontal
          nestedScrollEnabled
          data={recentlyPlayed}
          renderItem={renderItemRecentlyPlayed}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
        />

        {albumData.map((item) => {
          return (
            <TouchableOpacity
              onPress={() => props.navigation.navigate(item.navigateTo)}
              key={item.key}
              style={{
                marginBottom: Default.fixPadding * 3,
                marginHorizontal: Default.fixPadding * 1.5,
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
              }}
            >
              <Image source={item.image} />
              <View>
                <Text
                  style={{
                    ...Fonts.Bold18White,
                    marginHorizontal: Default.fixPadding * 1.5,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    ...Fonts.Bold14LightGrey,
                    marginHorizontal: Default.fixPadding * 1.5,
                  }}
                >
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <BottomMusic onSelect={() => props.navigation.navigate("playScreen")} />
    </SafeAreaView>
  );
};

export default LibraryScreen;
