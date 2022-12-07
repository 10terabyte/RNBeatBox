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
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import { SwipeListView } from "react-native-swipe-list-view";

const LibraryPlayListScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`libraryPlayListScreen:${key}`);
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
      image: require("../assets/image/i1.png"),
      title: "Hindi Romance",
      other: tr("50songs"),
    },
    {
      key: "2",
      title: "Latest in dance",
      image: require("../assets/image/i2.png"),
      other: tr("50songs"),
    },
    {
      key: "3",
      image: require("../assets/image/i3.png"),
      title: "Love Hit",
      other: tr("30songs"),
    },
    {
      key: "4",
      image: require("../assets/image/i4.png"),
      title: "International song",
      other: tr("90songs"),
    },
    {
      key: "5",
      image: require("../assets/image/i5.png"),
      title: "Workout song",
      other: tr("90songs"),
    },
  ];

  const [listData, setListData] = useState(
    dataList.map((favoriteItem, index) => ({
      key: `${index}`,
      title: favoriteItem.title,
      image: favoriteItem.image,
      other: favoriteItem.other,
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
          backgroundColor: Colors.darkBlue,
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
              alignItems: "center",
            }}
          >
            <Image source={data.item.image} />
            <View
              style={{
                marginHorizontal: Default.fixPadding,
                alignItems: isRtl ? "flex-end" : "flex-start",
                justifyContent: "center",
              }}
            >
              <Text style={{ ...Fonts.SemiBold16White }}>
                {data.item.title}
              </Text>
              <Text style={{ ...Fonts.SemiBold14LightGrey }}>
                {data.item.other}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              deleteRow(rowMap, data.item.key);
            }}
            style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ ...Fonts.SemiBold14LightGrey }}>{tr("remove")}</Text>
          </TouchableOpacity>
        </View>
      </View>
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
        <Text style={Fonts.Bold20White}>{tr("playlist")}</Text>
      </View>

      {listData.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Ionicons name="musical-notes" color={Colors.lightGrey} size={40} />
          <Text
            style={{
              ...Fonts.Bold14LightGrey,
              marginVertical: Default.fixPadding * 1.5,
            }}
          >
            {tr("NoPlayList")}
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

export default LibraryPlayListScreen;
