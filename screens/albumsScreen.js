import {
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import BottomMusic from "../components/bottomMusic";

const AlbumsScreen = (props) => {
  const { i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  const albumData = [
    {
      key: "1",
      name: "History",
      singer: "Michael Jackson",
      image: require("../assets/image/album1.png"),
    },
    {
      key: "2",
      name: "Thriller",
      singer: "Michael Jackson",
      image: require("../assets/image/album2.png"),
    },
    {
      key: "3",
      name: "I'm Your",
      singer: "Leonard Cohen",
      image: require("../assets/image/album3.png"),
    },
    {
      key: "4",
      name: "Love Never Fails",
      singer: "Sandy & Junior",
      image: require("../assets/image/album4.png"),
    },
    {
      key: "5",
      name: "Dj wale Babu",
      singer: "Badshah",
      image: require("../assets/image/album5.png"),
    },
    {
      key: "6",
      name: "It won't be soon",
      singer: "Maroon 5",
      image: require("../assets/image/album6.png"),
    },
    {
      key: "7",
      name: "Off the Wall",
      singer: "Michael Jackson",
      image: require("../assets/image/album7.png"),
    },
    {
      key: "8",
      name: "Invincible",
      singer: "Michael Jackson",
      image: require("../assets/image/album8.png"),
    },
    {
      key: "9",
      name: "Ek tarafa",
      singer: "Dhvni Bhanushali",
      image: require("../assets/image/album9.png"),
    },
    {
      key: "10",
      name: "Moves Like Jagger",
      singer: "Maroon 5",
      image: require("../assets/image/album5.png"),
    },
  ];
  const renderItemAlbum = ({ item, index }) => {
    const isEnd =
      index === albumData.length - 1 || index === albumData.length - 2;

    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate("partySongScreen")}
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
      <FlatList
        numColumns={2}
        data={albumData}
        renderItem={renderItemAlbum}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />
      <BottomMusic onSelect={() => props.navigation.navigate("playScreen")} />
    </SafeAreaView>
  );
};

export default AlbumsScreen;
