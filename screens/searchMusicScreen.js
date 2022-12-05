import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import Ionicons from "react-native-vector-icons/Ionicons";

const SearchMusicScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`searchMusicScreen:${key}`);
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

  const searchData = [
    {
      key: "1",
      name: "Hai Junoon",
      image: require("../assets/image/search1.png"),
    },
    {
      key: "2",
      name: "ThriJaane Dil Meinller",
      image: require("../assets/image/search2.png"),
    },
    {
      key: "3",
      name: "Ek tarafa",
      image: require("../assets/image/search3.png"),
    },
    {
      key: "4",
      name: "Kesariya",
      image: require("../assets/image/search4.png"),
    },
    {
      key: "5",
      name: "Coca Cola Tu",
      image: require("../assets/image/search5.png"),
    },
    {
      key: "6",
      name: "Jaane Dil Mein",
      image: require("../assets/image/search6.png"),
    },
    {
      key: "7",
      name: "Tune Jo Na Kaha",
      image: require("../assets/image/search7.png"),
    },
    {
      key: "8",
      name: "Raataan lambiyan ",
      image: require("../assets/image/search8.png"),
    },
    {
      key: "9",
      name: "The Hook Up ",
      image: require("../assets/image/search1.png"),
    },
    {
      key: "10",
      name: "Kar Gayi Chull",
      image: require("../assets/image/search2.png"),
    },
    {
      key: "11",
      name: "Dancing With Myself",
      image: require("../assets/image/search3.png"),
    },
  ];

  const [search, setSearch] = useState();
  const [filteredDataSource, setFilteredDataSource] = useState(searchData);

  const searchFilter = (text) => {
    if (text) {
      const newData = searchData.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(searchData);
      setSearch(text);
    }
  };

  const [clearAll, setClearAll] = useState();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.darkBlue }}>
      <StatusBar
        backgroundColor={Colors.boldBlack}
        barStyle={Platform.OS === "android" ? "light-content" : "default"}
      />
      <View
        style={{
          paddingVertical: Default.fixPadding,
          backgroundColor: Colors.boldBlack,
        }}
      >
        <View style={{ flexDirection: isRtl ? "row-reverse" : "row" }}>
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
          <Text style={{ ...Fonts.Bold20White }}>{tr("search")}</Text>
        </View>

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            backgroundColor: Colors.lightBlack,
            borderRadius: 10,
            padding: Default.fixPadding * 0.5,
            marginHorizontal: Default.fixPadding * 1.5,
            marginVertical: Default.fixPadding,
          }}
        >
          <Ionicons
            name="search-outline"
            color={Colors.lightGrey}
            size={22}
            style={{
              flex: 0.6,
              justifyContent: "center",
              alignSelf: "center",
              marginLeft: isRtl ? 0 : Default.fixPadding * 0.5,
              marginRight: isRtl ? Default.fixPadding * 0.5 : 0,
            }}
          />
          <TextInput
            style={{
              ...Fonts.SemiBold16White,
              flex: 9.4,
              textAlign: isRtl ? "right" : "left",
              marginHorizontal: Default.fixPadding,
              paddingVertical: Default.fixPadding * 0.5,
            }}
            onChangeText={(text) => searchFilter(text)}
            value={search}
            selectionColor={Colors.primary}
            placeholder={tr("listenTo")}
            placeholderTextColor={Colors.lightGrey}
          />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {clearAll ? null : (
          <View>
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                justifyContent: "space-between",
                marginHorizontal: Default.fixPadding * 1.5,
                marginVertical: Default.fixPadding * 1.5,
              }}
            >
              <Text style={{ ...Fonts.Bold18White }}>
                {tr("recentlySearch")}
              </Text>
              <TouchableOpacity
                onPress={() => setClearAll((preState) => !preState)}
              >
                <Text style={{ ...Fonts.SemiBold14LightGrey }}>
                  {tr("clearAll")}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                marginBottom: Default.fixPadding * 1.5,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.navigate("artistScreen")}
                style={{
                  marginLeft: Default.fixPadding * 2,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image source={require("../assets/image/sin1.png")} />
                <Text
                  style={{
                    ...Fonts.Bold12ExtraWhite,
                    marginTop: Default.fixPadding * 0.5,
                  }}
                >
                  Armaan malik
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("artistScreen")}
                style={{
                  marginHorizontal: Default.fixPadding * 2,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image source={require("../assets/image/sin2.png")} />
                <Text
                  style={{
                    ...Fonts.Bold12ExtraWhite,
                    marginTop: Default.fixPadding * 0.5,
                  }}
                >
                  Darshan raval
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <Text
          style={{
            ...Fonts.Bold18White,
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding * 1.5,
          }}
        >
          {tr("trendingSearch")}
        </Text>
        {filteredDataSource.map((item) => {
          return (
            <TouchableOpacity
              onPress={() => props.navigation.navigate("playScreen")}
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                marginBottom: Default.fixPadding * 1.5,
                marginHorizontal: Default.fixPadding * 1.5,
                alignItems: "center",
              }}
              key={item.key}
            >
              <Image source={item.image} />
              <Text
                style={{
                  ...Fonts.Medium14ExtraWhite,
                  marginHorizontal: Default.fixPadding,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchMusicScreen;
