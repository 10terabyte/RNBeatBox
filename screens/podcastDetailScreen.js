import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  BackHandler,
  StatusBar,
  StyleSheet,
  Share,
  Dimensions,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import Ionicons from "react-native-vector-icons/Ionicons";
import BottomMusic from "../components/bottomMusic";
import { BottomSheet } from "react-native-btr";
import Feather from "react-native-vector-icons/Feather";
import AddToPlayList from "../components/addToPlayList";
import NewPlayList from "../components/newPlayList";

const { width } = Dimensions.get("window");

const PodcastDetailScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`podcastDetailScreen:${key}`);
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
        }}
      >
        <View style={{ flex: 9, flexDirection: isRtl ? "row-reverse" : "row" }}>
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
          <Text style={{ ...Fonts.Bold20White }}>The Left Right Game</Text>
        </View>
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="ellipsis-vertical" color={Colors.white} size={24} />
        </TouchableOpacity>

        <BottomSheet
          visible={visible}
          onBackButtonPress={toggleClose}
          onBackdropPress={toggleClose}
        >
          <View style={styles.bottomSheetMain}>
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setVisible(false);
                  props.navigation.navigate("premiumScreen");
                }}
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  paddingVertical: Default.fixPadding * 2,
                  paddingHorizontal: Default.fixPadding * 2,
                }}
              >
                <Feather name="download" size={20} color={Colors.black} />
                <Text
                  style={{
                    ...Fonts.SemiBold15Black,
                    marginHorizontal: Default.fixPadding,
                  }}
                >
                  {tr("download")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setVisible(false)}
                style={{
                  margin: Default.fixPadding * 0.5,
                }}
              >
                <Ionicons name="close" size={24} color={Colors.lightGrey} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={shareMessage}
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                paddingBottom: Default.fixPadding * 2,
                paddingHorizontal: Default.fixPadding * 2,
              }}
            >
              <Feather name="share-2" size={20} color={Colors.black} />
              <Text
                style={{
                  ...Fonts.SemiBold15Black,
                  marginHorizontal: Default.fixPadding,
                }}
              >
                {tr("share")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setVisible(false);
                setAddPlayList(true);
              }}
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                paddingBottom: Default.fixPadding * 2,
                paddingHorizontal: Default.fixPadding * 2,
              }}
            >
              <Ionicons
                name="add-circle-outline"
                size={22}
                color={Colors.black}
              />
              <Text
                style={{
                  ...Fonts.SemiBold15Black,
                  marginHorizontal: Default.fixPadding,
                }}
              >
                {tr("playlist")}
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheet>
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
            source={require("../assets/image/detail.png")}
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
            <Text style={{ ...Fonts.SemiBold18White }}>
              The Left Right Game
            </Text>
            <Text style={{ ...Fonts.SemiBold14LightGrey }}>{tr("season")}</Text>
            <View
              style={{
                ...Default.shadow,
                backgroundColor: Colors.extraBlack,
                borderRadius: 5,
                borderWidth: 1.5,
                borderColor: Colors.white,
                justifyContent: "center",
                alignItems: "center",
                width: width / 4.5,
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
                  paddingHorizontal: Default.fixPadding * 3,
                  paddingVertical: Default.fixPadding * 0.5,
                }}
              >
                {tr("play")}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding * 1.5,
          }}
        >
          <Text style={{ ...Fonts.Bold18White }}>{tr("allEpisode")}</Text>
        </View>

        <View
          style={{
            marginBottom: Default.fixPadding * 1.5,
            borderBottomColor: Colors.lightBlack,
            borderBottomWidth: 2,
          }}
        >
          <Text
            style={{
              ...Fonts.SemiBold14White,
              marginBottom: Default.fixPadding,
              marginHorizontal: Default.fixPadding * 1.5,
              textAlign: isRtl ? "right" : "left",
            }}
          >
            Episode 1
          </Text>
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            <View
              style={{ flex: 7, flexDirection: isRtl ? "row-reverse" : "row" }}
            >
              <View
                style={{
                  backgroundColor: Colors.white,
                  height: 24,
                  width: 24,
                  borderRadius: 12,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: isRtl ? 0 : Default.fixPadding * 0.5,
                  marginLeft: isRtl ? Default.fixPadding * 0.5 : 0,
                }}
              >
                <Ionicons name="play" size={14} color={Colors.primary} />
              </View>
              <Text style={{ ...Fonts.Medium16White }}>
                Trailer: The Left Right Game
              </Text>
            </View>

            <View
              style={{
                flex: 3,
                alignItems: isRtl ? "flex-start" : "flex-end",
              }}
            >
              <Text style={{ ...Fonts.SemiBold12Grey }}>20 apr 2020</Text>
            </View>
          </View>
          <Text
            style={{
              ...Fonts.SemiBold12LightWhite,
              marginTop: Default.fixPadding,
              marginBottom: Default.fixPadding * 2,
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </Text>
        </View>

        <View
          style={{
            marginBottom: Default.fixPadding * 1.5,
            borderBottomColor: Colors.lightBlack,
            borderBottomWidth: 2,
          }}
        >
          <Text
            style={{
              ...Fonts.SemiBold14White,
              marginBottom: Default.fixPadding,
              marginHorizontal: Default.fixPadding * 1.5,
              textAlign: isRtl ? "right" : "left",
            }}
          >
            Episode 2
          </Text>
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            <View
              style={{ flex: 7, flexDirection: isRtl ? "row-reverse" : "row" }}
            >
              <View
                style={{
                  backgroundColor: Colors.white,
                  height: 24,
                  width: 24,
                  borderRadius: 12,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: isRtl ? 0 : Default.fixPadding * 0.5,
                  marginLeft: isRtl ? Default.fixPadding * 0.5 : 0,
                }}
              >
                <Ionicons name="play" size={14} color={Colors.primary} />
              </View>
              <Text style={{ ...Fonts.SemiBold16Primary }}>
                Trailer: The Left Right Game
              </Text>
            </View>

            <View
              style={{
                flex: 3,
                alignItems: isRtl ? "flex-start" : "flex-end",
              }}
            >
              <Text style={{ ...Fonts.SemiBold12Grey }}>20 apr 2020</Text>
            </View>
          </View>
          <Text
            style={{
              ...Fonts.SemiBold12LightWhite,
              marginTop: Default.fixPadding,
              marginBottom: Default.fixPadding * 2,
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </Text>
        </View>

        <View
          style={{
            marginBottom: Default.fixPadding * 1.5,
            borderBottomColor: Colors.lightBlack,
            borderBottomWidth: 2,
          }}
        >
          <Text
            style={{
              ...Fonts.SemiBold14White,
              marginBottom: Default.fixPadding,
              marginHorizontal: Default.fixPadding * 1.5,
              textAlign: isRtl ? "right" : "left",
            }}
          >
            Episode 3
          </Text>
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            <View
              style={{ flex: 7, flexDirection: isRtl ? "row-reverse" : "row" }}
            >
              <View
                style={{
                  backgroundColor: Colors.white,
                  height: 24,
                  width: 24,
                  borderRadius: 12,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: isRtl ? 0 : Default.fixPadding * 0.5,
                  marginLeft: isRtl ? Default.fixPadding * 0.5 : 0,
                }}
              >
                <Ionicons name="play" size={14} color={Colors.primary} />
              </View>
              <Text style={{ ...Fonts.Medium16White }}>
                Trailer: The Left Right Game
              </Text>
            </View>

            <View
              style={{
                flex: 3,
                alignItems: isRtl ? "flex-start" : "flex-end",
              }}
            >
              <Text style={{ ...Fonts.SemiBold12Grey }}>20 apr 2020</Text>
            </View>
          </View>
          <Text
            style={{
              ...Fonts.SemiBold12LightWhite,
              marginTop: Default.fixPadding,
              marginBottom: Default.fixPadding * 2,
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </Text>
        </View>

        <View
          style={{
            marginBottom: Default.fixPadding * 1.5,
            borderBottomColor: Colors.lightBlack,
            borderBottomWidth: 2,
          }}
        >
          <Text
            style={{
              ...Fonts.SemiBold14White,
              marginBottom: Default.fixPadding,
              marginHorizontal: Default.fixPadding * 1.5,
              textAlign: isRtl ? "right" : "left",
            }}
          >
            Episode 4
          </Text>
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            <View
              style={{ flex: 7, flexDirection: isRtl ? "row-reverse" : "row" }}
            >
              <View
                style={{
                  backgroundColor: Colors.white,
                  height: 24,
                  width: 24,
                  borderRadius: 12,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: isRtl ? 0 : Default.fixPadding * 0.5,
                  marginLeft: isRtl ? Default.fixPadding * 0.5 : 0,
                }}
              >
                <Ionicons name="play" size={14} color={Colors.primary} />
              </View>
              <Text style={{ ...Fonts.Medium16White }}>
                Trailer: The Left Right Game
              </Text>
            </View>

            <View
              style={{
                flex: 3,
                alignItems: isRtl ? "flex-start" : "flex-end",
              }}
            >
              <Text style={{ ...Fonts.SemiBold12Grey }}>20 apr 2020</Text>
            </View>
          </View>
          <Text
            style={{
              ...Fonts.SemiBold12LightWhite,
              marginTop: Default.fixPadding,
              marginBottom: Default.fixPadding * 2,
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </Text>
        </View>

        <View
          style={{
            marginBottom: Default.fixPadding * 1.5,
            borderBottomColor: Colors.lightBlack,
            borderBottomWidth: 2,
          }}
        >
          <Text
            style={{
              ...Fonts.SemiBold14White,
              marginBottom: Default.fixPadding,
              marginHorizontal: Default.fixPadding * 1.5,
              textAlign: isRtl ? "right" : "left",
            }}
          >
            Episode 5
          </Text>
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            <View
              style={{ flex: 7, flexDirection: isRtl ? "row-reverse" : "row" }}
            >
              <View
                style={{
                  backgroundColor: Colors.white,
                  height: 24,
                  width: 24,
                  borderRadius: 12,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: isRtl ? 0 : Default.fixPadding * 0.5,
                  marginLeft: isRtl ? Default.fixPadding * 0.5 : 0,
                }}
              >
                <Ionicons name="play" size={14} color={Colors.primary} />
              </View>
              <Text style={{ ...Fonts.Medium16White }}>
                Trailer: The Left Right Game
              </Text>
            </View>

            <View
              style={{
                flex: 3,
                alignItems: isRtl ? "flex-start" : "flex-end",
              }}
            >
              <Text style={{ ...Fonts.SemiBold12Grey }}>20 apr 2020</Text>
            </View>
          </View>
          <Text
            style={{
              ...Fonts.SemiBold12LightWhite,
              marginTop: Default.fixPadding,
              marginBottom: Default.fixPadding * 2,
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </Text>
        </View>

        <View>
          <Text
            style={{
              ...Fonts.SemiBold14White,
              marginBottom: Default.fixPadding,
              marginHorizontal: Default.fixPadding * 1.5,
              textAlign: isRtl ? "right" : "left",
            }}
          >
            Episode 6
          </Text>
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            <View
              style={{ flex: 7, flexDirection: isRtl ? "row-reverse" : "row" }}
            >
              <View
                style={{
                  backgroundColor: Colors.white,
                  height: 24,
                  width: 24,
                  borderRadius: 12,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: isRtl ? 0 : Default.fixPadding * 0.5,
                  marginLeft: isRtl ? Default.fixPadding * 0.5 : 0,
                }}
              >
                <Ionicons name="play" size={14} color={Colors.primary} />
              </View>
              <Text style={{ ...Fonts.Medium16White }}>
                Trailer: The Left Right Game
              </Text>
            </View>

            <View
              style={{
                flex: 3,
                alignItems: isRtl ? "flex-start" : "flex-end",
              }}
            >
              <Text style={{ ...Fonts.SemiBold12Grey }}>20 apr 2020</Text>
            </View>
          </View>
          <Text
            style={{
              ...Fonts.SemiBold12LightWhite,
              marginTop: Default.fixPadding,
              marginBottom: Default.fixPadding * 2,
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </Text>
        </View>
      </ScrollView>
      <BottomMusic onSelect={() => props.navigation.navigate("playScreen")} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomSheetMain: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default PodcastDetailScreen;
