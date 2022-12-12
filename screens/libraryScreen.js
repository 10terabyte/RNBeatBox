import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,

  Dimensions,
  Platform,
} from "react-native";
import React, { useState , useEffect} from "react";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import BottomMusic from "../components/bottomMusic";
import functions from '@react-native-firebase/functions';
import { useAppContext } from "../context";
import firestore from "@react-native-firebase/firestore";
import { playBeat} from '../controllers/beat'
import Loader from "../components/loader";
const FIRESTORE = firestore()

const LibraryScreen = (props) => {
  const favoritesCollection = FIRESTORE.collection('beatFavorites')
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";
  const { user } = useAppContext();
  function tr(key) {
    return t(`libraryScreen:${key}`);
  }
  const [isLoading, setIsLoading] = useState(false);
  async function loadSoundAndPlay(musicItem) {
    console.log("Play Beat-----------", musicItem)
    setIsLoading(true)
    console.log("Play Beat-----------")
    playBeat(musicItem, user.uid).then(result =>{
        console.log('--------------------------------------------')
        props.navigation.navigate("playScreen", { item: musicItem });
        setIsLoading(false)
    }).catch(error =>{
        setIsLoading(false)
    })
}
  useEffect(() => {
    
    const unsubscribe = favoritesCollection.onSnapshot(snapshot =>{
      functions()
      .httpsCallable(`getFavoriteBeats?userid=${user.uid}`)()
      .then(response => {
        setMyFavorites(response.data)
      });
    })
    
    return () =>{
        unsubscribe()
    }
}, [FIRESTORE])
  const [myFavorites, setMyFavorites] = useState([])
  const renderItemRecentlyPlayed = ({ item, index }) => {
    const isFirst = index === 0;
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate("playScreen")}
        style={{
          marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
          marginRight: Default.fixPadding * 1.5,
          marginBottom: Default.fixPadding * 3,
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
        <Text
          style={{
            ...Fonts.SemiBold12Grey,
            marginTop: Default.fixPadding * 0.5,
            textAlign: isRtl ? "right" : "left",
          }}
        >
          {item.singer}
        </Text>
      </TouchableOpacity>
    );
  };

  const albumData = [
    {
      key: "1",
      title: tr("myLikes"),
      name: tr("50songs"),
      image: require("../assets/image/library1.png"),
      navigateTo: "libraryMyLikeScreen",
    },
    {
      key: "2",
      title: tr("artist"),
      name: tr("10artist"),
      image: require("../assets/image/library2.png"),
      navigateTo: "libraryArtistScreen",
    },
    {
      key: "3",
      title: tr("playlist"),
      name: tr("10playlist"),
      image: require("../assets/image/library3.png"),
      navigateTo: "libraryPlayListScreen",
    },
    {
      key: "4",
      title: tr("podcast"),
      name: tr("4podcast"),
      image: require("../assets/image/library4.png"),
      navigateTo: "libraryPodcastScreen",
    },
  ];
  const renderBeatItem = ({ item, index }) => {
    const isFirst = index === 0;
    return (
        <TouchableOpacity
            onPress={() => loadSoundAndPlay(item)}
            style={{
                marginLeft: isFirst ? Default.fixPadding  : 0,
                marginRight: Default.fixPadding ,
                marginBottom: Default.fixPadding * 2,
            }}
        >
            <View
              style={{
                width: Dimensions.get("window").width / 4 ,
                // height: Dimensions.get("window").width / 4
            }}
            >
            <Image source={{uri: item.track_thumbnail}} style={{
                    width: Dimensions.get("window").width / 4 - Default.fixPadding,
                    height: Dimensions.get("window").width / 4
                }} />
            <Text
                style={{
                    ...Fonts.SemiBold14White,
                    marginTop: Default.fixPadding * 0.3,
                    textAlign:   "center",
                }}
            >
                {item.track_name}
            </Text>
           
            </View>
            
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
          alignItems: "center",
        }}
      >
        <Text style={Fonts.Bold20White}>{tr("library")}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            ...Fonts.Bold20White,
            marginHorizontal: Default.fixPadding * 1.5,
            marginVertical: Default.fixPadding,
          }}
        >
          Favourite Beat
        </Text>

        <FlatList
          horizontal
          nestedScrollEnabled
          data={myFavorites}
          renderItem={renderBeatItem}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
        />

        {albumData.map((item) => {
          return (
            <TouchableOpacity
              onPress={() => props.navigation.navigate(item.navigateTo)}
              key={item.key}
              style={{
                marginBottom: Default.fixPadding * 3,
                marginHorizontal: Default.fixPadding * 1.5,
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
              }}
            >
              <Image source={item.image} />
              <View>
                <Text
                  style={{
                    ...Fonts.Bold18White,
                    marginHorizontal: Default.fixPadding * 1.5,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    ...Fonts.Bold14LightGrey,
                    marginHorizontal: Default.fixPadding * 1.5,
                  }}
                >
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <Loader visible={isLoading} />
      <BottomMusic onSelect={() => props.navigation.navigate("playScreen")} />
      
    </SafeAreaView>
  );
};

export default LibraryScreen;
