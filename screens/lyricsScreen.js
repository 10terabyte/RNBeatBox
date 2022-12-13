import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  BackHandler,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Default, Fonts } from "../constants/style";
import { useTranslation } from "react-i18next";
// import { Slider } from "react-native-range-slider-expo";
// import { Audio } from "expo-av";

const LyricsScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`lyricsScreen:${key}`);
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
  const [value, setValue] = useState(0);

  // const sound = React.useRef(new Audio.Sound());
  const [Status, SetStatus] = React.useState(false);

  React.useEffect(() => {
    // LoadAudio();
    return () => sound.current.unloadAsync();
  }, []);

  const LoadAudio = async () => {
    // const result = await sound.current.loadAsync(
    //   require("../assets/music/letMe.mp3"),
    //   true
    // );
    // if (result.isLoaded === true) {
    // } else {
    //   PlayAudio();
    // }
  };

  const PlayAudio = async () => {
    // try {
    //   const result = await sound.current.getStatusAsync();
    //   if (result.isLoaded) {
    //     if (result.isPlaying === false) {
    //       sound.current.playAsync();
    //       SetStatus(true);
    //     }
    //   } else {
    //     LoadAudio();
    //   }
    // } catch (error) {
    //   SetStatus(false);
    // }
  };

  const PauseAudio = async () => {
    // try {
    //   const result = await sound.current.getStatusAsync();
    //   if (result.isLoaded) {
    //     if (result.isPlaying === true) {
    //       sound.current.pauseAsync();
    //       SetStatus(false);
    //     }
    //   }
    // } catch (error) {
    //   SetStatus(false);
    // }
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
        <Text style={Fonts.Bold20White}>{tr("lyrics")}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              ...Fonts.Bold16DarkGrey,
              marginTop: Default.fixPadding * 3,
            }}
          >
            If I could save time in a bottle
          </Text>
          <Text
            style={{
              ...Fonts.Bold16DarkGrey,
              marginTop: Default.fixPadding * 3,
            }}
          >
            The first thing that I'd like to do
          </Text>
          <Text
            style={{
              ...Fonts.Bold16White,
              marginTop: Default.fixPadding * 3,
            }}
          >
            Is to save every day 'til eternity passes away
          </Text>

          <Text
            style={{
              ...Fonts.Bold16DarkGrey,
              marginTop: Default.fixPadding * 3,
            }}
          >
            Just to spend them with you
          </Text>

          <Text
            style={{
              ...Fonts.Bold16DarkGrey,
              marginTop: Default.fixPadding * 3,
            }}
          >
            If I could make days last forever
          </Text>

          <Text
            style={{
              ...Fonts.Bold16DarkGrey,
              marginTop: Default.fixPadding * 3,
            }}
          >
            If words could make wishes come true
          </Text>

          <Text
            style={{
              ...Fonts.Bold16DarkGrey,
              marginTop: Default.fixPadding * 3,
            }}
          >
            I'd save every day like a treasure, and then
          </Text>

          <Text
            style={{
              ...Fonts.Bold16DarkGrey,
              marginTop: Default.fixPadding * 3,
            }}
          >
            Again, I would spend them with you
          </Text>

          <Text
            style={{
              ...Fonts.Bold16DarkGrey,
              marginTop: Default.fixPadding * 3,
            }}
          >
            But there never seems to be enough time
          </Text>
          <Text
            style={{
              ...Fonts.Bold16DarkGrey,
              marginTop: Default.fixPadding * 3,
            }}
          >
            If I could save time in a bottle
          </Text>
          <Text
            style={{
              ...Fonts.Bold16DarkGrey,
              marginTop: Default.fixPadding * 3,
            }}
          >
            The first thing that I'd like to do
          </Text>
          <Text
            style={{
              ...Fonts.Bold16DarkGrey,
              marginTop: Default.fixPadding * 3,
            }}
          >
            Is to save every day 'til eternity passes away
          </Text>

          <Text
            style={{
              ...Fonts.Bold16DarkGrey,
              marginTop: Default.fixPadding * 3,
            }}
          >
            Just to spend them with you
          </Text>
        </View>
      </ScrollView>
      <View style={{ height: 180 }}>
        {/* <Slider
          min={0}
          max={40}
          containerStyle={{
            height: 20,
          }}
          valueOnChange={(value) => setValue(value)}
          initialValue={12}
          knobColor={Colors.primary}
          valueLabelsBackgroundColor="black"
          inRangeBarColor={Colors.extraBlack}
          outOfRangeBarColor={Colors.primary}
          styleSize={"small"}
          showRangeLabels={false}
          showValueLabels={false}
        /> */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: Default.fixPadding * 3,
          }}
        >
          <Text style={{ ...Fonts.SemiBold12Grey }}>15 : 20</Text>
          <Text
            style={{
              ...Fonts.SemiBold12Grey,
              marginRight: Default.fixPadding,
            }}
          >
            22 : 45
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginVertical: Default.fixPadding * 1.5,
          }}
        >
          <Ionicons name="refresh-outline" size={25} color={Colors.darkGrey} />
          <Ionicons
            name="play-skip-back"
            size={30}
            color={Colors.white}
            style={{ marginHorizontal: Default.fixPadding * 2 }}
          />
          <TouchableOpacity
            onPress={Status === false ? PlayAudio : PauseAudio}
            style={{
              height: 66,
              width: 66,
              borderRadius: 33,
              backgroundColor: Colors.primary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name={Status === false ? "play" : "pause"}
              size={25}
              color={Colors.white}
            />
          </TouchableOpacity>
          <Ionicons
            name="play-skip-forward"
            size={30}
            color={Colors.white}
            style={{ marginHorizontal: Default.fixPadding * 2 }}
          />
          <Ionicons
            name="swap-horizontal-outline"
            size={25}
            color={Colors.darkGrey}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LyricsScreen;
