import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  BackHandler,
  Image,
  StyleSheet,
  Animated,
  Pressable,
  Dimensions,
  Platform,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Fonts, Default } from "../constants/style";
import { useTranslation } from "react-i18next";
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get("window");

const CreditCardScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`creditCardScreen:${key}`);
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

  const [name, onChangeName] = useState();
  const [textNo, onChangeTextNo] = useState();
  const [textCvv, onChangeTextCvv] = useState();
  const [textValid, onChangeTextValid] = useState();

  const flipAnimation = useRef(new Animated.Value(0)).current;
  let flipRotation = 0;
  flipAnimation.addListener(({ value }) => (flipRotation = value));

  const flipToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ["0deg", "180deg"],
        }),
      },
    ],
  };
  const flipToBackStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ["180deg", "360deg"],
        }),
      },
    ],
  };
  const flipToFront = () => {
    Animated.timing(flipAnimation, {
      toValue: 180,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const flipToBack = () => {
    Animated.timing(flipAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
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
        <Text style={Fonts.Bold20White}>{tr("creditCard")}</Text>
      </View>

      <Pressable
        style={style.cardWrapper}
        onPress={() => (!!flipRotation ? flipToBack() : flipToFront())}
      >
        <Animated.View style={{ ...style.cardFront, ...flipToFrontStyle }}>
          <LinearGradient
            start={[0, 1]}
            end={[1, 0]}
            colors={[Colors.lightPrimary, Colors.lightPink]}
            style={{
              borderRadius: 10,
              marginTop: Default.fixPadding,
              marginHorizontal: Default.fixPadding * 1.5,
              width: width / 1.1,
              height: height / 3.5,
            }}
          >
            <View
              style={{
                marginHorizontal: Default.fixPadding * 2,
                marginVertical: Default.fixPadding * 1.5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: Default.fixPadding * 2.5,
                }}
              >
                <Text style={{ ...Fonts.Bold14White }}>Credit Card</Text>
                <Image
                  source={require("../assets/image/credit.png")}
                  style={{ alignSelf: "flex-end" }}
                />
              </View>
              <TextInput
                value={textNo}
                placeholderTextColor={Colors.white}
                placeholder={"XXXX XXXX XXXX XXXX"}
                style={{
                  ...Fonts.SemiBold18White,
                }}
                editable={false}
                selectTextOnFocus={false}
              />
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: Default.fixPadding * 2,
                }}
              >
                <TextInput
                  value={name}
                  placeholderTextColor={Colors.white}
                  placeholder={"Card holder"}
                  style={{
                    ...Fonts.Bold16White,
                    paddingVertical: Default.fixPadding,
                    maxWidth: "80%",
                    flex: 8,
                  }}
                  editable={false}
                  selectTextOnFocus={false}
                />

                <TextInput
                  value={textValid}
                  placeholderTextColor={Colors.white}
                  placeholder={"DD/MM"}
                  style={{
                    ...Fonts.Bold14White,
                    paddingVertical: Default.fixPadding,
                    flex: 2,
                    textAlign: "center",
                  }}
                  editable={false}
                  selectTextOnFocus={false}
                />
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={{ ...style.cardBack, ...flipToBackStyle }}>
          <LinearGradient
            start={[0, 1]}
            end={[1, 0]}
            colors={[Colors.lightPrimary, Colors.lightPink]}
            style={{
              borderRadius: 10,
              marginTop: Default.fixPadding,
              marginHorizontal: Default.fixPadding * 1.5,
              width: width / 1.1,
              height: height / 3.5,
            }}
          >
            <View
              style={{
                backgroundColor: Colors.white,
                paddingVertical: 20,
                width: width / 1.1,
                marginVertical: Default.fixPadding * 2,
              }}
            />

            <TextInput
              value={textCvv}
              placeholderTextColor={Colors.white}
              placeholder={"CVV"}
              style={{
                ...Fonts.SemiBold14White,
                backgroundColor: Colors.boldBlack,
                width: width / 4,
                textAlign: "center",
                alignSelf: "flex-end",
                marginHorizontal: Default.fixPadding * 2,
                paddingVertical: Default.fixPadding * 0.5,
              }}
              editable={false}
              selectTextOnFocus={false}
              secureTextEntry={true}
            />
          </LinearGradient>
        </Animated.View>
      </Pressable>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding * 1.5,
          }}
        >
          <Text
            style={{
              ...Fonts.Medium16White,
            }}
          >
            {tr("name")}
          </Text>

          <TextInput
            onChangeText={(text) => {
              flipToBack();
              onChangeName(text);
            }}
            selectionColor={Colors.primary}
            value={name}
            placeholderTextColor={Colors.lightGrey}
            placeholder={tr("enterName")}
            style={{
              ...Fonts.SemiBold15White,
              marginBottom: Default.fixPadding * 2,
              padding: Default.fixPadding,
              textAlign: isRtl ? "right" : "left",
              backgroundColor: Colors.lightBlack,
              borderRadius: 10,
              marginTop: Default.fixPadding,
            }}
          />
          <Text
            style={{
              ...Fonts.Medium16White,
            }}
          >
            {tr("cardNo")}
          </Text>

          <TextInput
            selectionColor={Colors.primary}
            onChangeText={(text) => {
              flipToBack();
              onChangeTextNo(text);
            }}
            value={textNo}
            placeholderTextColor={Colors.lightGrey}
            placeholder={tr("enterCard")}
            keyboardType={"number-pad"}
            maxLength={16}
            style={{
              ...Fonts.SemiBold15White,
              marginBottom: Default.fixPadding * 2,
              padding: Default.fixPadding,
              textAlign: isRtl ? "right" : "left",
              backgroundColor: Colors.lightBlack,
              borderRadius: 10,
              marginTop: Default.fixPadding,
            }}
          />

          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  ...Fonts.Medium16White,
                  textAlign: isRtl ? "right" : "left",
                }}
              >
                MM/YY
              </Text>

              <TextInput
                onChangeText={(text) => {
                  flipToBack();
                  onChangeTextValid(text);
                }}
                value={textValid}
                placeholder={tr("expiryDate")}
                placeholderTextColor={Colors.lightGrey}
                maxLength={5}
                keyboardType="cc-exp"
                style={{
                  ...Fonts.SemiBold15White,
                  marginBottom: Default.fixPadding,
                  marginRight: isRtl ? 0 : Default.fixPadding,
                  marginLeft: isRtl ? Default.fixPadding * 0.5 : 0,
                  padding: Default.fixPadding,
                  borderRadius: 10,
                  textAlign: isRtl ? "right" : "left",
                  backgroundColor: Colors.lightBlack,
                  marginTop: Default.fixPadding,
                }}
                selectionColor={Colors.primary}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  ...Fonts.Medium16White,
                  textAlign: isRtl ? "right" : "left",
                }}
              >
                CVV Code
              </Text>

              <TextInput
                onChangeText={(text) => {
                  flipToFront();
                  onChangeTextCvv(text);
                }}
                value={textCvv}
                placeholder={tr("enterCvv")}
                maxLength={3}
                keyboardType="number-pad"
                placeholderTextColor={Colors.lightGrey}
                style={{
                  ...Fonts.SemiBold15White,
                  marginBottom: Default.fixPadding,
                  padding: Default.fixPadding,
                  borderRadius: 10,
                  textAlign: isRtl ? "right" : "left",
                  backgroundColor: Colors.lightBlack,
                  marginTop: Default.fixPadding,
                }}
                selectionColor={Colors.primary}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => props.navigation.navigate("successScreen")}
        style={{
          ...Default.shadow,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.primary,
          marginHorizontal: Default.fixPadding * 1.5,
          marginVertical: Default.fixPadding * 1.5,
          paddingVertical: Default.fixPadding * 1.5,
          borderRadius: 25,
        }}
      >
        <Text style={{ ...Fonts.ExtraBold20White }}>{tr("payment")}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CreditCardScreen;
const style = StyleSheet.create({
  cardWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  cardFront: {
    position: "absolute",
    marginVertical: Default.fixPadding * 2,
  },
  cardBack: {
    backfaceVisibility: "hidden",
    marginVertical: Default.fixPadding * 2,
  },
});
