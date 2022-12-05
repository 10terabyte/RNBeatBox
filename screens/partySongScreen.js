import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  BackHandler,
  StatusBar,
  TouchableOpacity,
  Share,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Default, Fonts } from "../constants/style";
import BottomMusic from "../components/bottomMusic";
import MainBottomSheet from "../components/mainBottomSheet";
import AddToPlayList from "../components/addToPlayList";
import NewPlayList from "../components/newPlayList";
import { getDatabase, ref, query, onValue, orderByChild, equalTo, set } from "firebase/database";
const DB = getDatabase();
const PartySongScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";
  const [beatsOfPlayList, setBeatsOfPlayList] = useState([]);
  function tr(key) {
    return t(`partySongScreen:${key}`);
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
  useEffect(() => {
    onValue(query(ref(DB, "/beatsOfPlayList"), orderByChild("PLKey"), equalTo(props.route.params.item.key)),
      async (snapshot) => {
        let data = snapshot.val();
        let _beatsOfPlayList = [];
        if (data == null) {
          setBeatsOfPlayList([]);
          return;
        }
        Object.keys(data).map(key => {
          _beatsOfPlayList.push({
            ...data[key],
            key
          });

        });
        // console.log(_beatsOfPlayList, "beatsofPlaylist")
        let promises = [];

        _beatsOfPlayList.forEach((item, index) => {
          promises.push(new Promise((resolve, reject) => {

            onValue(ref(DB, "beats/" + item.BtKey), snapshot => {
              let beatData = snapshot.val();

              if (beatData == null) {
                resolve();
                return;

              }
              if (beatData.track_artist) {
                onValue(ref(DB, "artists/" + beatData.track_artist), snapshot => {
                  _beatsOfPlayList[index] = {
                    ...item,
                    key: item.BtKey,
                    ...beatData,
                   
                  }

                  if (snapshot.val()) {
                    _beatsOfPlayList[index].singer=snapshot.val().name
                  }
                  resolve();
                })
              }
              else {

                _beatsOfPlayList[index] = {
                  ...item,
                  key: item.BtKey,
                  ...beatData
                }

                // console.log(_beatsOfPlayList,"beatdata")
                resolve();
              }
            }, { onlyOnce: true })

          }))

        })
        await Promise.all(promises);
        // console.log(_beatsOfPlayList,"beatsofplaylist")
        setBeatsOfPlayList(_beatsOfPlayList);
      });

  }, [])

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
  const [isVisible, setIsVisible] = useState(false);

  const shareMessage = () => {
    setVisible(false);
    Share.share({
      message: toString(),
    });
  };

  const renderItemPlayList = ({ item, index }) => {
    const isFirst = index === 0;



    return (
      <View
        style={{
          marginTop: isFirst ? Default.fixPadding * 1.5 : 0,
          marginBottom: Default.fixPadding * 1.5,
          flexDirection: isRtl ? "row-reverse" : "row",
          marginHorizontal: Default.fixPadding * 1.5,
        }}
      >
        <TouchableOpacity
          onPress={() => props.navigation.navigate("playScreen", { item })}
          style={{ flex: 9, flexDirection: isRtl ? "row-reverse" : "row" }}
        >
          <Image source={{ uri: item.track_thumbnail }} style={{ width: 50, height: 50 }} />
          <View
            style={{
              justifyContent: "center",
              marginHorizontal: Default.fixPadding,
              alignItems: isRtl ? "flex-end" : "flex-start",
            }}
          >
            <Text
              style={{
                ...(isFirst ? Fonts.SemiBold16Primary : Fonts.SemiBold16White),
              }}
            >
              {item.track_name}
            </Text>
            <Text
              style={{
                ...Fonts.SemiBold14Grey,
              }}
            >
              {item.singer}
            </Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => setVisible(true)}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="ellipsis-vertical"
            color={Colors.white}
            size={24}
            style={{
              justifyContent: "center",
            }}
          />
        </TouchableOpacity> */}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.darkBlue }}>
      <StatusBar
        backgroundColor={Colors.black}
        barStyle={Platform.OS === "android" ? "light-content" : "default"}
      />
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          marginHorizontal: Default.fixPadding * 1.5,
          marginVertical: Default.fixPadding,
          backgroundColor: Colors.darkBlue,
        }}
      >
        <View style={{ flex: 7, flexDirection: isRtl ? "row-reverse" : "row" }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Ionicons
              name={isRtl ? "arrow-forward" : "arrow-back"}
              size={25}
              color={Colors.white}
              style={{
                alignSelf: isRtl ? "flex-end" : "flex-start",
                color: Colors.white,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              ...Fonts.Bold20White,
              marginHorizontal: Default.fixPadding,
            }}
          >
            {tr("partySongs")}
          </Text>
        </View>
        <View
          style={{
            flex: 3,
            flexDirection: "row",
            justifyContent: isRtl ? "flex-start" : "flex-end",
          }}
        >
          <TouchableOpacity
            onPress={() => setIsVisible((preState) => !preState)}
          >
            <Ionicons
              name={isVisible ? "heart-outline" : "heart"}
              size={24}
              color={Colors.white}
              style={{
                color: Colors.white,
                marginHorizontal: Default.fixPadding,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Ionicons
              name="ellipsis-vertical"
              size={24}
              color={Colors.white}
              style={{
                color: Colors.white,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          marginVertical: Default.fixPadding * 1.5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: props.route.params.item.image }}
          style={{ resizeMode: "cover", width: "100%", height: 300, objectFit: "fill" }}
        />
      </View>
      <View
        style={{
          ...Default.shadow,
          backgroundColor: Colors.lightBlack,
          justifyContent: "center",
          flexDirection: isRtl ? "row-reverse" : "row",
          paddingVertical: Default.fixPadding * 1.5,
          marginBottom: Default.fixPadding * 1.5,
        }}
      >
        <View style={{ flex: 7, marginHorizontal: Default.fixPadding * 1.5 }}>
          <Text style={{ ...Fonts.Bold18White }}>{tr("partySongs")}</Text>
          <Text style={{ ...Fonts.SemiBold14LightGrey }}>{tr("hitSong")}</Text>
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
              backgroundColor: Colors.darkBlue,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.Bold16White,
                paddingHorizontal: Default.fixPadding * 1.5,
                paddingVertical: Default.fixPadding * 0.5,
              }}
            >
              {tr("playAll")}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          marginHorizontal: Default.fixPadding * 1.5,
        }}
      >
        <Text style={{ ...Fonts.Bold18White }}>Songs of this list</Text>
      </View>

      <FlatList
        data={beatsOfPlayList}
        renderItem={renderItemPlayList}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />

      <MainBottomSheet
        visible={visible}
        onBackButtonPress={toggleClose}
        onBackdropPress={toggleClose}
        close={toggleClose}
        onDownload={() => {
          toggleClose();
          props.navigation.navigate("premiumScreen");
        }}
        shareMessage={() => {
          shareMessage();
        }}
        onPlaylist={() => {
          toggleClose();
          setAddPlayList(true);
        }}
        onLyrics={() => {
          toggleClose();
          props.navigation.navigate("lyricsScreen");
        }}
        onInformation={() => {
          toggleClose();
          props.navigation.navigate("songInformation");
        }}
      />

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

      <BottomMusic onSelect={() => props.navigation.navigate("playScreen")} />
    </SafeAreaView>
  );
};

export default PartySongScreen;
