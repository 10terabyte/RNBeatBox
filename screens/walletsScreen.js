import {
    Text,
    View,
    TouchableOpacity,
    BackHandler,
    Animated,
    Dimensions,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Image,
    FlatList
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { useTranslation } from "react-i18next";
  import { Colors, Fonts, Default } from "../constants/style";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import { SwipeListView } from "react-native-swipe-list-view";
  import { AppWrapper, useAppContext } from "../context";
  const WalletsScreen = (props) => {
    const { t, i18n } = useTranslation();
    const { user, customerData } = useAppContext();
    const isRtl = i18n.dir() === "rtl";
  
    function tr(key) {
      return t(`notificationScreen:${key}`);
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
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.darkBlue }}>
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
          <Text style={Fonts.Bold20White}>My Wallets</Text>
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
            <Ionicons
            name={isRtl ? "chevron-back" : "chevron-forward-outline"}
            size={20}
            color={Colors.white}
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          />
            <View
              style={{
                marginHorizontal: Default.fixPadding,
                alignItems: isRtl ? "flex-end" : "flex-start",
              }}
            >
              <Text style={{ ...Fonts.SemiBold16White }}>{customerData?.credits} Credits remaining</Text>
              <Text style={{ ...Fonts.SemiBold14LightGrey, flexWrap: 'wrap' }}>
                Your current plan will finish at {new Date( customerData?.subscriptionEnded?.toDate() ).toDateString()}
              </Text>
            </View>
          </View>
        </View>
        
      </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default WalletsScreen;
  const style = StyleSheet.create({
    mainView: {
      ...Default.shadow,
      borderRadius: 10,
      marginHorizontal: Default.fixPadding * 1.6,
      marginVertical: Default.fixPadding * 0.8,
      backgroundColor: Colors.lightBlack,
      paddingHorizontal: Default.fixPadding * 1.5,
      justifyContent: "center",
    },
  });
  