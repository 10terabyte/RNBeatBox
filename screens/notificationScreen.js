import {
  Text,
  View,
  TouchableOpacity,
  BackHandler,
  Animated,
  Dimensions,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SwipeListView } from "react-native-swipe-list-view";

const NotificationScreen = (props) => {
  const { t, i18n } = useTranslation();

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

  const notificationList = [
    {
      key: "1",
      title: tr("success"),
      description: tr("description"),
      status: tr("2min"),
    },
    {
      key: "2",
      title: tr("success"),
      description: tr("description"),
      status: tr("2min"),
    },
    {
      key: "3",
      title: tr("active"),
      description: tr("secondDescription"),
      status: tr("2min"),
    },
    {
      key: "4",
      title: tr("offer"),
      description: tr("secondDescription"),
      status: tr("2min"),
    },
    {
      key: "5",
      title: tr("success"),
      description: tr("description"),
      status: tr("2min"),
    },
    {
      key: "6",
      title: tr("offer"),
      description: tr("secondDescription"),
      status: tr("2min"),
    },
  ];
  const rowTranslateAnimatedValues = {};
  notificationList.forEach((_, i) => {
    rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
  });

  const [listData, setListData] = useState(
    notificationList.map((NotificationItem, i) => ({
      key: `${i}`,
      title: NotificationItem.title,
      description: NotificationItem.description,
      status: NotificationItem.status,
    }))
  );

  const onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;
    if (value < -Dimensions.get("window").width) {
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        const newData = [...listData];
        const prevIndex = listData.findIndex((item) => item.key === key);
        newData.splice(prevIndex, 1);
        setListData(newData);
      });
    }
  };

  const renderItem = (data) => {
    return (
      <Animated.View
        style={[
          style.mainView,
          {
            height: rowTranslateAnimatedValues[data.item.key].interpolate({
              inputRange: [0, 1],
              outputRange: [0, 100],
            }),
          },
        ]}
      >
        <Text
          style={{
            ...Fonts.Bold18White,
            marginBottom: Default.fixPadding * 0.5,
          }}
        >
          {data.item.title}
        </Text>
        <Text style={Fonts.Bold14Grey}>{data.item.description}</Text>
        <Text
          style={{
            ...Fonts.Bold12Grey,
            marginBottom: Default.fixPadding * 0.5,
          }}
        >
          {data.item.status}
        </Text>
      </Animated.View>
    );
  };

  const renderHiddenItem = () => (
    <View style={{ backgroundColor: Colors.darkBlue, flex: 1 }}></View>
  );

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
        <Text style={Fonts.Bold20White}>{tr("notification")}</Text>
      </View>

      {listData.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Ionicons
            name="notifications-outline"
            size={32}
            color={Colors.lightGrey}
          />
          <Text style={{ ...Fonts.SemiBold18LightGrey }}>
            {tr("noNotification")}
          </Text>
        </View>
      ) : (
        <SwipeListView
          disableRightSwipe
          data={listData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-Dimensions.get("window").width}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onSwipeValueChange={onSwipeValueChange}
          useNativeDriver={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default NotificationScreen;
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
