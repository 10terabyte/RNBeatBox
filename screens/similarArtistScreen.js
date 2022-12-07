import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  Image,
  BackHandler,
  StatusBar,
  TouchableOpacity,
  Share,
  Dimensions,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Default, Fonts } from "../constants/style";
import BottomMusic from "../components/bottomMusic";
import MainBottomSheet from "../components/mainBottomSheet";
import AddToPlayList from "../components/addToPlayList";
import NewPlayList from "../components/newPlayList";

const { width } = Dimensions.get("window");

const SimilarArtistScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`similarArtistScreen:${key}`);
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

  const albumsData = [
    {
      key: "1",
      name: "Loveyatri",
      image: require("../assets/image/m1.png"),
    },
    {
      key: "2",
      name: "Teraa Surroor",
      image: require("../assets/image/m2.png"),
    },
    {
      key: "3",
      name: "Made in china",
      image: require("../assets/image/m3.png"),
    },
    {
      key: "4",
      name: "Pream ratn dhan..",
      image: require("../assets/image/m4.png"),
    },
    {
      key: "5",
      name: "Odhani",
      image: require("../assets/image/m5.png"),
    },
    {
      key: "6",
      name: "Tu Mileya",
      image: require("../assets/image/m6.png"),
    },
  ];
  const renderItemAlbums = ({ item, index }) => {
    const isFirst = index === 0;

    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate("partySongScreen")}
        style={{
          marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
          marginRight: Default.fixPadding * 1.5,
          marginBottom: Default.fixPadding * 1.5,
        }}
      >
        <Image source={item.image} />
        <View
          style={{
            justifyContent: "center",
            marginHorizontal: Default.fixPadding * 0.5,
          }}
        >
          <Text
            style={{
              ...Fonts.SemiBold14White,
              marginTop: Default.fixPadding * 0.5,
              textAlign: "center",
            }}
          >
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const artistData = [
    {
      key: "1",
      name: "Sonu",
      image: require("../assets/image/top1.png"),
    },
    {
      key: "2",
      name: "lata",
      image: require("../assets/image/top2.png"),
    },
    {
      key: "3",
      name: "Shakira",
      image: require("../assets/image/top3.png"),
    },
    {
      key: "4",
      name: "Darshan",
      image: require("../assets/image/top4.png"),
    },
    {
      key: "5",
      name: "Neha",
      image: require("../assets/image/top5.png"),
    },
    {
      key: "6",
      name: "Vishal",
      image: require("../assets/image/top6.png"),
    },
  ];
  const renderItemArtist = ({ item, index }) => {
    const isFirst = index === 0;

    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate("artistScreen")}
        style={{
          marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
          marginRight: Default.fixPadding * 1.5,
          marginBottom: Default.fixPadding * 1.5,
        }}
      >
        <Image source={item.image} />
        <View
          style={{
            justifyContent: "center",
            marginHorizontal: Default.fixPadding * 0.5,
          }}
        >
          <Text
            style={{
              ...Fonts.SemiBold14White,
              marginTop: Default.fixPadding * 0.5,
              textAlign: "center",
            }}
          >
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const playListData = [
    {
      key: "1",
      name: "Ek tarafa",
      singer: "Dhvni Bhanushali",
      image: require("../assets/image/s1.png"),
    },
    {
      key: "2",
      name: "Kesariya",
      singer: "Arijit Singh",
      image: require("../assets/image/s2.png"),
    },
    {
      key: "3",
      name: "Kar Gayi Chull",
      singer: "Badshah,Neha Kakkar",
      image: require("../assets/image/s3.png"),
    },
    {
      key: "4",
      name: "Just Dance",
      singer: "Lady Gaga",
      image: require("../assets/image/s4.png"),
    },
    {
      key: "5",
      name: "Call Me Maybe",
      singer: "Carly Rae Jepsen",
      image: require("../assets/image/s5.png"),
    },
    {
      key: "6",
      name: "Kar Gayi Chull",
      singer: "Badshah,Neha Kakkar",
      image: require("../assets/image/s6.png"),
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
        }}
      >
        <TouchableOpacity
          style={{
            marginHorizontal: Default.fixPadding * 1.5,
            alignItems: isRtl ? "flex-end" : "flex-start",
          }}
          onPress={() => props.navigation.goBack()}
        >
          <Ionicons
            name={isRtl ? "arrow-forward" : "arrow-back"}
            size={25}
            color={Colors.white}
          />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginVertical: Default.fixPadding * 1.5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/image/similar.png")}
            style={{ resizeMode: "cover" }}
          />
        </View>
        <View
          style={{
            ...Default.shadow,
            backgroundColor: Colors.lightBlack,
            justifyContent: "center",
            flexDirection: isRtl ? "row-reverse" : "row",
            paddingVertical: Default.fixPadding,
            marginBottom: Default.fixPadding * 1.5,
          }}
        >
          <View
            style={{
              flex: 7,
              marginHorizontal: Default.fixPadding * 1.5,
              alignItems: isRtl ? "flex-end" : "flex-start",
            }}
          >
            <Text style={{ ...Fonts.Bold18White }}>Vishal-Shekhar</Text>
            <Text
              style={{
                ...Fonts.Medium14White,
                marginVertical: Default.fixPadding * 0.5,
              }}
            >
              {tr("followers")}
            </Text>
            <View
              style={{
                ...Default.shadow,
                backgroundColor: Colors.extraBlack,
                borderRadius: 5,
                borderWidth: 1.5,
                borderColor: Colors.white,
                justifyContent: "center",
                alignItems: "center",
                width: width / 4,
                marginVertical: Default.fixPadding * 0.5,
              }}
            >
              <Text
                style={{
                  ...Fonts.Bold14White,
                  padding: Default.fixPadding * 0.5,
                }}
              >
                {tr("follow")}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 3,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            <View
              style={{
                ...Default.shadowPrimary,
                backgroundColor: Colors.primary,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.Bold16White,
                  paddingHorizontal: Default.fixPadding * 1.5,
                  paddingVertical: Default.fixPadding * 0.5,
                }}
              >
                {tr("playAll")}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            justifyContent: "space-between",
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding * 1.5,
          }}
        >
          <Text style={{ ...Fonts.Bold18White }}>{tr("playList")}</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("playListSeeAllScreen")}
          >
            <Text
              style={{
                ...Fonts.SemiBold14LightGrey,
                marginHorizontal: Default.fixPadding * 1.5,
              }}
            >
              {tr("seeAll")}
            </Text>
          </TouchableOpacity>
        </View>
        {playListData.map((item, index) => {
          const isFirst = index === 0;
          return (
            <View
              key={item.key}
              style={{
                marginBottom: Default.fixPadding * 1.5,
                marginHorizontal: Default.fixPadding * 1.5,
                flexDirection: isRtl ? "row-reverse" : "row",
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 9,
                  flexDirection: isRtl ? "row-reverse" : "row",
                }}
                onPress={() => props.navigation.navigate("playScreen")}
              >
                <Image source={item.image} />
                <View
                  style={{
                    justifyContent: "center",
                    marginHorizontal: Default.fixPadding,
                    alignItems: isRtl ? "flex-end" : "flex-start",
                  }}
                >
                  <Text
                    style={{
                      ...(isFirst
                        ? Fonts.SemiBold16Primary
                        : Fonts.SemiBold16White),
                    }}
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
              </TouchableOpacity>
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
        })}
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

        <Text
          style={{
            ...Fonts.Bold18White,
            marginBottom: Default.fixPadding * 1.5,
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          {tr("topAlbums")}
        </Text>
        <FlatList
          horizontal
          scrollEnabled
          data={albumsData}
          renderItem={renderItemAlbums}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
        />

        <Text
          style={{
            ...Fonts.Bold18White,
            marginBottom: Default.fixPadding * 1.5,
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          {tr("similar")}
        </Text>
        <FlatList
          horizontal
          scrollEnabled
          data={artistData}
          renderItem={renderItemArtist}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
      <BottomMusic onSelect={() => props.navigation.navigate("playScreen")} />
    </SafeAreaView>
  );
};

export default SimilarArtistScreen;
