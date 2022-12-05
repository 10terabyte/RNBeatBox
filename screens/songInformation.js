import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  BackHandler,
  FlatList,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import Ionicons from "react-native-vector-icons/Ionicons";

const SongInformation = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`songInformation:${key}`);
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

  const singerData = [
    {
      key: "1",
      name: "Pritam",
      image: require("../assets/image/img1.png"),
    },
    {
      key: "2",
      name: "Atif",
      image: require("../assets/image/img2.png"),
    },
    {
      key: "3",
      name: "Kamil",
      image: require("../assets/image/img3.png"),
    },
  ];

  const renderItemSinger = ({ item, index }) => {
    const isFirst = index === 0;

    return (
      <View
        style={{
          marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
          marginRight: Default.fixPadding * 1.5,
          marginTop: Default.fixPadding * 1.5,
          marginBottom: Default.fixPadding * 2,
          alignItems: "center",
        }}
      >
        <Image source={item.image} />

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
    );
  };

  const albumData = [
    {
      key: "1",
      title: tr("album"),
      name: "Tiger Zinda Hai",
      image: require("../assets/image/img4.png"),
    },
    {
      key: "2",
      title: tr("lyricist"),
      name: "Irshad Kamil",
      image: require("../assets/image/img5.png"),
    },
    {
      key: "3",
      title: tr("composer"),
      name: "Vishal-Shekhar",
      image: require("../assets/image/img6.png"),
    },
  ];

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
        <Text style={Fonts.Bold20White}>{tr("songInfo")}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            ...Default.shadow,
            backgroundColor: Colors.lightBlack,
            justifyContent: "center",
            paddingVertical: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding * 1.5,
          }}
        >
          <View
            style={{
              marginHorizontal: Default.fixPadding * 1.5,
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
            }}
          >
            <Image source={require("../assets/image/photo1.png")} />
            <View
              style={{
                marginHorizontal: Default.fixPadding,
                alignItems: isRtl ? "flex-end" : "flex-start",
              }}
            >
              <Text style={{ ...Fonts.SemiBold16White }}>Dil Diya Gallan</Text>
              <Text style={{ ...Fonts.SemiBold14LightGrey }}>
                Tiger Zinda Hai
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            alignItems: isRtl ? "flex-end" : "flex-start",
          }}
        >
          <Text
            style={{
              ...Fonts.Bold16White,
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            {tr("singer")}
          </Text>
          <FlatList
            horizontal
            scrollEnabled
            data={singerData}
            renderItem={renderItemSinger}
            keyExtractor={(item) => item.key}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        {albumData.map((item, index) => {
          return (
            <View
              key={item.key}
              style={{
                marginBottom: Default.fixPadding * 1.5,
                marginHorizontal: Default.fixPadding * 1.5,
              }}
            >
              <Text
                style={{
                  ...Fonts.Bold16White,
                  marginVertical: Default.fixPadding,
                }}
              >
                {item.title}
              </Text>
              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                }}
              >
                <Image source={item.image} />
                <Text
                  style={{
                    ...Fonts.Bold14ExtraWhite,
                    marginHorizontal: Default.fixPadding,
                  }}
                >
                  {item.name}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SongInformation;
