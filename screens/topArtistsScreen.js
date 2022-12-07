import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  BackHandler,
  StatusBar,
  Image,
  Platform,
} from "react-native";
import React, { useEffect,useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import Ionicons from "react-native-vector-icons/Ionicons";
import {ref , getDatabase, onValue, query, orderByChild, limitToFirst} from "firebase/database";
const DB = getDatabase();
const TopArtistsScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`topArtistsScreen:${key}`);
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
  useEffect(()=>{
    const collection = ref(DB, "artists/");
    const topArtistsRef = query(collection, orderByChild("follows"), limitToFirst(20))
    onValue(topArtistsRef, (snapshot)=>{
      const data = snapshot.val();
      let artData = [];
      if(data == null) {
        setArtistsdata([]);

      }
      Object.keys(data).map(key=>{
        artData.push({
          ...data[key],
          key:key
        })
      });
      setArtistsdata(artData);
    })
  },[]);
  const [artistsData, setArtistsdata] = useState([]);
  const renderItemArtists = ({ item, index }) => {
    const isEnd =
      index === artistsData.length - 1 ||
      index === artistsData.length - 2 ||
      index === artistsData.length - 3;
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate("artistScreen", { item })}
        style={{
          marginTop: Default.fixPadding * 1.5,
          marginBottom: isEnd ? Default.fixPadding * 1.5 : 0,
          marginHorizontal: Default.fixPadding * 1.5,
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Image style = {{width:100, height:100}} source={{uri:item.ImageURL}} />
        <Text
          style={{
            ...Fonts.SemiBold14White,
            marginTop: Default.fixPadding * 0.5,
            textAlign: "center",
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
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
        <Text style={Fonts.Bold20White}>{tr("topArtists")}</Text>
      </View>
      <FlatList
        numColumns={3}
        data={artistsData}
        renderItem={renderItemArtists}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default TopArtistsScreen;
