import {
  Text,
  View,
  SafeAreaView,
  BackHandler,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import { SwipeListView } from "react-native-swipe-list-view";

const LibraryArtistScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`libraryArtistScreen:${key}`);
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

  const dataList = [
    {
      key: "1",
      image: require("../assets/image/a1.png"),
      title: "Sonu Nigam",
      name: tr("artist"),
    },
    {
      key: "2",
      title: "Badshah  ",
      image: require("../assets/image/a2.png"),
      name: tr("artist"),
    },
    {
      key: "3",
      image: require("../assets/image/a3.png"),
      title: "Shakira",
      name: tr("artist"),
    },
    {
      key: "4",
      image: require("../assets/image/a4.png"),
      title: "Lady Gaga",
      name: tr("artist"),
    },
    {
      key: "5",
      image: require("../assets/image/a5.png"),
      title: "Justin Bieber",
      name: tr("artist"),
    },
    {
      key: "6",
      image: require("../assets/image/a6.png"),
      title: "Darshan raval",
      name: tr("artist"),
    },
  ];

  const [listData, setListData] = useState(
    dataList.map((favoriteItem, index) => ({
      key: `${index}`,
      title: favoriteItem.title,
      image: favoriteItem.image,
      name: favoriteItem.name,
    }))
  );

  const deleteRow = (rowMap, rowKey) => {
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const renderItem = (data, rowMap) => {
    return (
      <View
        style={{
          backgroundColor: Colors.boldBlack,
          borderBottomColor: Colors.lightBlack,
          borderBottomWidth: 1,
          paddingHorizontal: Default.fixPadding * 1.5,
          paddingVertical: Default.fixPadding * 2,
        }}
      >
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
          }}
        >
          <View
            style={{
              flex: 8,
              flexDirection: isRtl ? "row-reverse" : "row",
            }}
          >
            <Image source={data.item.image} />
            <View
              style={{
                marginHorizontal: Default.fixPadding,
                justifyContent: "center",
              }}
            >
              <Text style={{ ...Fonts.SemiBold16White }}>
                {data.item.title}
              </Text>
              <Text style={{ ...Fonts.SemiBold14LightGrey }}>
                {data.item.name}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              deleteRow(rowMap, data.item.key);
            }}
            style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ ...Fonts.SemiBold14LightGrey }}>
              {tr("unfollow")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
        <Text style={Fonts.Bold20White}>{tr("artist")}</Text>
      </View>

      {listData.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Feather name="user-check" color={Colors.lightGrey} size={40} />
          <Text
            style={{
              ...Fonts.Bold14LightGrey,
              marginVertical: Default.fixPadding * 1.5,
            }}
          >
            {tr("noFavorite")}
          </Text>
        </View>
      ) : (
        <SwipeListView
          data={listData}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default LibraryArtistScreen;
