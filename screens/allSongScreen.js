import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Share,
} from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import Ionicons from "react-native-vector-icons/Ionicons";
import BottomMusic from "../components/bottomMusic";
import MainBottomSheet from "../components/mainBottomSheet";
import AddToPlayList from "../components/addToPlayList";
import NewPlayList from "../components/newPlayList";

const AllSongScreen = (props) => {
  const { i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  const [visible, setVisible] = useState(false);

  const toggleClose = () => {
    setVisible(!visible);
  };

  const [addPlayList, setAddPlayList] = useState(false);

  const toggleCloseAddPlayList = () => {
    setAddPlayList(!addPlayList);
  };

  const [newPlayList, setNewPlayList] = useState(false);

  const toggleCloseNewPlayList = () => {
    setNewPlayList(!newPlayList);
  };

  const shareMessage = () => {
    setVisible(false);
    Share.share({
      message: toString(),
    });
  };

  const artistData = [
    {
      key: "1",
      name: "Kala chasma",
      singer: "Amar Arshi",
      image: require("../assets/image/list1.png"),
    },
    {
      key: "2",
      name: "The Hook Up ",
      singer: "Shekhar Ravjiani",
      image: require("../assets/image/list2.png"),
    },
    {
      key: "3",
      name: "Kar Gayi Chull",
      singer: "Badshah,Neha Kakkar",
      image: require("../assets/image/list3.png"),
    },
    {
      key: "4",
      name: "Just Dance",
      singer: "Lady Gaga",
      image: require("../assets/image/list4.png"),
    },
    {
      key: "5",
      name: "Dancing With Myself",
      singer: "Billy Idol",
      image: require("../assets/image/list5.png"),
    },
    {
      key: "6",
      name: "Call Me Maybe",
      singer: "Carly Rae Jepsen",
      image: require("../assets/image/list6.png"),
    },
    {
      key: "7",
      name: "It's the Time to Disco",
      singer: "Shaan,Vasundhara Das",
      image: require("../assets/image/list7.png"),
    },
    {
      key: "8",
      name: "London Thumakda",
      singer: "Labh Janjua, Sonu Kakkar",
      image: require("../assets/image/list8.png"),
    },
    {
      key: "9",
      name: "Besharmi Ki Height",
      singer: "Shalmali Kholgade",
      image: require("../assets/image/list9.png"),
    },
    {
      key: "10",
      name: "Crazy Kiya Re",
      singer: "Sunidhi Chauhan",
      image: require("../assets/image/list10.png"),
    },
    {
      key: "11",
      name: "In da Club",
      singer: "50 Cent",
      image: require("../assets/image/list11.png"),
    },
    {
      key: "12",
      name: "Desi Girl",
      singer: "Sunidhi Chauhan",
      image: require("../assets/image/list12.png"),
    },
  ];
  const renderItemArtist = ({ item, index }) => {
    const isFirst = index === 0;

    return (
      <View
        style={{
          marginTop: isFirst ? Default.fixPadding * 1.5 : 0,
          marginBottom: Default.fixPadding * 1.5,
          marginHorizontal: Default.fixPadding * 1.5,
          flexDirection: isRtl ? "row-reverse" : "row",
        }}
      >
        <Image source={item.image} />

        <View
          style={{
            justifyContent: "center",
            marginHorizontal: Default.fixPadding,
            alignItems: isRtl ? "flex-end" : "flex-start",
            flex: 7.5,
          }}
        >
          <Text
            style={[isFirst ? Fonts.SemiBold16Primary : Fonts.SemiBold16White]}
          >
            {item.name}
          </Text>
          <Text
            style={{
              ...Fonts.SemiBold14Grey,
            }}
          >
            {item.singer}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="ellipsis-vertical"
            color={Colors.white}
            size={24}
            style={{
              justifyContent: "center",
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.boldBlack }}>
      <FlatList
        data={artistData}
        renderItem={renderItemArtist}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />

      <MainBottomSheet
        visible={visible}
        onBackButtonPress={toggleClose}
        onBackdropPress={toggleClose}
        close={toggleClose}
        onDownload={() => {
          toggleClose();
          props.navigation.navigate("premiumScreen");
        }}
        shareMessage={() => {
          shareMessage();
        }}
        onPlaylist={() => {
          toggleClose();
          setAddPlayList(true);
        }}
        onLyrics={() => {
          toggleClose();
          props.navigation.navigate("lyricsScreen");
        }}
        onInformation={() => {
          toggleClose();
          props.navigation.navigate("songInformation");
        }}
      />

      <AddToPlayList
        visible={addPlayList}
        onBackButtonPress={toggleCloseAddPlayList}
        onBackdropPress={toggleCloseAddPlayList}
        close={toggleCloseAddPlayList}
        onSelect={() => {
          setAddPlayList(false);
          setNewPlayList(true);
        }}
        isClose={toggleCloseAddPlayList}
      />
      <NewPlayList
        visible={newPlayList}
        onBackButtonPress={toggleCloseNewPlayList}
        onBackdropPress={toggleCloseNewPlayList}
        cancel={toggleCloseNewPlayList}
      />

      <BottomMusic onSelect={() => props.navigation.navigate("playScreen")} />
    </SafeAreaView>
  );
};

export default AllSongScreen;
