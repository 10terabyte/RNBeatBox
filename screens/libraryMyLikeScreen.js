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

const LibraryMyLikeScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`libraryMyLikeScreen:${key}`);
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
      image: require("../assets/image/list1.png"),
      title: "Kala chasma",
      singer: "Amar Arshi",
    },
    {
      key: "2",
      title: "The Hook Up ",
      image: require("../assets/image/list2.png"),
      singer: "Shekhar Ravjiani",
    },
    {
      key: "3",
      image: require("../assets/image/list3.png"),
      title: "Kar Gayi Chull",
      singer: "Badshah,Neha Kakkar",
    },
    {
      key: "4",
      image: require("../assets/image/list4.png"),
      title: "Just Dance",
      singer: "Lady Gaga",
    },
    {
      key: "5",
      image: require("../assets/image/list5.png"),
      title: "Brooklyn Barbers",
      singer: "Amar Arshi",
    },
    {
      key: "6",
      image: require("../assets/image/list6.png"),
      title: "Dancing With Myself",
      singer: "Billy Idol",
    },
    {
      key: "7",
      title: "Call Me Maybe",
      image: require("../assets/image/list7.png"),
      singer: "Carly Rae Jepsen",
    },
    {
      key: "8",
      image: require("../assets/image/list8.png"),
      title: "It's the Time to Disco",
      singer: "Shaan,Vasundhara Das",
    },
    {
      key: "9",
      image: require("../assets/image/list9.png"),
      title: "London Thumakda",
      singer: "Labh Janjua, Sonu Kakkar",
    },
  ];

  const [listData, setListData] = useState(
    dataList.map((favoriteItem, index) => ({
      key: `${index}`,
      title: favoriteItem.title,
      image: favoriteItem.image,
      singer: favoriteItem.singer,
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
                {data.item.singer}
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
        <Text style={Fonts.Bold20White}>{tr("myLikes")}</Text>
      </View>

      {listData.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Ionicons name="heart" color={Colors.lightGrey} size={40} />
          <Text
            style={{
              ...Fonts.Bold14LightGrey,
              marginVertical: Default.fixPadding * 1.5,
            }}
          >
            {tr("noLike")}
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

export default LibraryMyLikeScreen;
