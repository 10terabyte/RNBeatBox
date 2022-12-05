import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import BottomMusic from "../components/bottomMusic";

const PodcastScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`podcastScreen:${key}`);
  }

  const trendingData = [
    {
      key: "1",
      name: "Vedanta talks",
      image: require("../assets/image/trending1.png"),
    },
    {
      key: "2",
      name: "Open question",
      image: require("../assets/image/trending2.png"),
    },
    {
      key: "3",
      name: "Stories for kids",
      image: require("../assets/image/trending3.png"),
    },
    {
      key: "4",
      name: "Motivational poems",
      image: require("../assets/image/trending4.png"),
    },
    {
      key: "5",
      name: "Tomorrow's legends",
      image: require("../assets/image/trending5.png"),
    },
  ];
  const renderItemTrending = ({ item, index }) => {
    const isFirst = index === 0;
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate("podcastDetailScreen")}
        style={{
          marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
          marginRight: Default.fixPadding * 1.5,
          marginBottom: Default.fixPadding * 2,
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
      </TouchableOpacity>
    );
  };

  const aroundWorldData = [
    {
      key: "1",
      name: "Live your best life",
      image: require("../assets/image/world1.png"),
    },
    {
      key: "2",
      name: "The left right game",
      image: require("../assets/image/world2.png"),
    },
    {
      key: "3",
      name: "Diet science",
      image: require("../assets/image/world3.png"),
    },
    {
      key: "4",
      name: "Discovery park",
      image: require("../assets/image/world4.png"),
    },
    {
      key: "5",
      name: "Unlock me today!",
      image: require("../assets/image/world5.png"),
    },
  ];
  const renderItemAroundWorld = ({ item, index }) => {
    const isFirst = index === 0;
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate("podcastDetailScreen")}
        style={{
          marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
          marginRight: Default.fixPadding * 1.5,
          marginBottom: Default.fixPadding * 2,
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
      </TouchableOpacity>
    );
  };

  const famousData = [
    {
      key: "1",
      name: "Sachin Tendulkar",
      image: require("../assets/image/famous1.png"),
    },
    {
      key: "2",
      name: "Donald Trump",
      image: require("../assets/image/famous2.png"),
    },
    {
      key: "3",
      name: "Mark Zuckerberg",
      image: require("../assets/image/famous3.png"),
    },
    {
      key: "4",
      name: "Abdul Kalam",
      image: require("../assets/image/famous4.png"),
    },
    {
      key: "5",
      name: "Mahatma Gandhi",
      image: require("../assets/image/famous5.png"),
    },
    {
      key: "6",
      name: "Steve Jobs",
      image: require("../assets/image/famous6.png"),
    },
    {
      key: "7",
      name: "Sundar Pichai",
      image: require("../assets/image/famous7.png"),
    },
  ];
  const renderItemFamous = ({ item, index }) => {
    const isFirst = index === 0;
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate("podcastDetailScreen")}
        style={{
          marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
          marginRight: Default.fixPadding * 1.5,
          marginBottom: Default.fixPadding * 2,
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
      </TouchableOpacity>
    );
  };

  const motivationData = [
    {
      key: "1",
      name: "Gaur Gopal Das",
      image: require("../assets/image/motivation1.png"),
    },
    {
      key: "2",
      name: "IThrive",
      image: require("../assets/image/motivation2.png"),
    },
    {
      key: "3",
      name: "Abdul Kalam",
      image: require("../assets/image/motivation3.png"),
    },
    {
      key: "4",
      name: "MD Motivation",
      image: require("../assets/image/motivation4.png"),
    },
    {
      key: "5",
      name: "Sachin Tendulkar",
      image: require("../assets/image/motivation5.png"),
    },
    {
      key: "6",
      name: "Steve Jobs",
      image: require("../assets/image/motivation6.png"),
    },
    {
      key: "7",
      name: "Voice Of Achievers",
      image: require("../assets/image/motivation7.png"),
    },
  ];
  const renderItemMotivation = ({ item, index }) => {
    const isFirst = index === 0;
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate("podcastDetailScreen")}
        style={{
          marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
          marginRight: Default.fixPadding * 1.5,
          marginBottom: Default.fixPadding * 2,
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
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.darkBlue }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            justifyContent: "space-between",
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding,
            marginTop: Default.fixPadding * 1.5,
          }}
        >
          <Text style={{ ...Fonts.SemiBold18White }}>{tr("trending")}</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("trendingPodcastScreen")}
          >
            <Text style={{ ...Fonts.Bold14Primary }}>{tr("seeAll")}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          nestedScrollEnabled
          data={trendingData}
          renderItem={renderItemTrending}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
        />

        {/* <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            justifyContent: "space-between",
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding,
          }}
        >
          <Text style={{ ...Fonts.SemiBold18White }}>{tr("aroundWorld")}</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("aroundWorldScreen")}
          >
            <Text style={{ ...Fonts.Bold14Primary }}>{tr("seeAll")}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          nestedScrollEnabled
          data={aroundWorldData}
          renderItem={renderItemAroundWorld}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
        />

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            justifyContent: "space-between",
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding,
          }}
        >
          <Text style={{ ...Fonts.SemiBold18White }}>{tr("famous")}</Text>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("famousPersonalitiesScreen")
            }
          >
            <Text style={{ ...Fonts.Bold14Primary }}>{tr("seeAll")}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          nestedScrollEnabled
          data={famousData}
          renderItem={renderItemFamous}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
        /> */}

        {/* <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            justifyContent: "space-between",
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding,
          }}
        >
          <Text style={{ ...Fonts.SemiBold18White }}>{tr("motivation")}</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("motivationPodcastScreen")}
          >
            <Text style={{ ...Fonts.Bold14Primary }}>{tr("seeAll")}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          nestedScrollEnabled
          data={motivationData}
          renderItem={renderItemMotivation}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
        /> */}
      </ScrollView>
      <BottomMusic onSelect={() => props.navigation.navigate("playScreen")} />
    </SafeAreaView>
  );
};

export default PodcastScreen;
