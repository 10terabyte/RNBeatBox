import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    StatusBar,
    FlatList,
    Dimensions,
    Platform,
} from "react-native";
import Carousel from 'react-native-banner-carousel';
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
// import LinearGradient from 'react-native-linear-gradient'
;
import BottomMusic from "../components/bottomMusic";
// import { useAuthentication } from '../utils/hooks/useAuthentication';
// import Firebase from "firebase";
import { useAppContext } from "../context";
import { getDatabase, ref, onValue, query, orderByChild, limitToFirst, equalTo } from "firebase/database";
import { ref as s_ref, } from "firebase/storage";
const { width } = Dimensions.get("window");
const DB = getDatabase();
const HomeScreen = (props) => {
    const { t, i18n } = useTranslation();
    const { user } = useAppContext();
    console.log(user, "homeUser")
    const [userData, setUserData] = useState({});
    const isRtl = i18n.dir() === "rtl";

    function tr(key) {
        return t(`homeScreen:${key}`);
    }
    useEffect(() => {
        setUserData(user);
    }, [user])
    useEffect(() => {
        const collection = ref(DB, "artists/");
        const topArtistsRef = query(collection, orderByChild("follows"), limitToFirst(5))
        const bannerListRef    = query(ref(DB, "banners/"), orderByChild("follows"), limitToFirst(5))
        onValue(topArtistsRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data, "topdata")
            let artData = [];
            if (data == null) {
                setArtistsData([]);
                return;
            }
            Object.keys(data).map(key => {
                artData.push({
                    ...data[key],
                    key: key
                })
            })
            setArtistsData(artData)

        })
        onValue(bannerListRef, (snapshot) => {
            const data = snapshot.val();
            let bannerData = [];
             
            Object.keys(data).map(key => {
                bannerData.push({
                    ...data[key],
                    key: key
                })
            })
            setBannerList(bannerData)

        })
    }, [])
    const [artistsData, setArtistsData] = useState([]);
    const [bannerList, setBannerList] = useState([]);
    const renderItemArtists = ({ item, index }) => {
        const isFirst = index === 0;
        // console.log(item.ImageURL,"name")
        return (
            <TouchableOpacity
                onPress={() => props.navigation.navigate("artistScreen", { item })}
                style={{
                    marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
                    marginRight: Default.fixPadding * 1.5,
                }}
            >
                <Image style={{ height: 80, width: 80, borderRadius: 80 }} source={{ uri: item.ImageURL }} />
                <View
                    style={{ width: 80 }}
                >

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

            </TouchableOpacity>
        );
    };

    const recentlyPlayed = [
      {
        key: "1",
        name: "Ek tarafa",
        image: require("../assets/image/pic1.png"),
        singer: "Dhvni Bhanushali",
      },
      {
        key: "2",
        name: "Kesariya",
        image: require("../assets/image/pic2.png"),
        singer: "Arijit Singh",
      },
      {
        key: "3",
        name: "Raataan lambiyan ",
        image: require("../assets/image/pic3.png"),
        singer: "Dhvni Bhanushali",
      },
      {
        key: "4",
        name: "Halki Si Barsaat",
        image: require("../assets/image/pic4.png"),
        singer: "Saaj Bhatt",
      },
      {
        key: "5",
        name: "Ek Tu Hi Toh Hai",
        image: require("../assets/image/pic5.png"),
        singer: "Stebin Ben",
      },
    ];
    const renderItemRecentlyPlayed = ({ item, index }) => {
        const isFirst = index === 0;
        return (
            <TouchableOpacity
                onPress={() => props.navigation.navigate("playScreen")}
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
                <Image source={item.image} style={{
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
                    {item.name}
                </Text>
                <Text
                    style={{
                        ...Fonts.SemiBold12Grey,
                        marginTop: Default.fixPadding * 0.3,
                        textAlign:  "center",
                    }}
                >
                    {item.singer}
                </Text>
                </View>
                
            </TouchableOpacity>
        );
    };

    const [playlistForYou, setPlayListForYou] = useState([]);
    useEffect(() => {
        if (!user || !user.uid)
            return;
        console.log(user, "user")
        onValue(query(ref(DB, "playlists"), orderByChild("user"), equalTo(user.uid)), snapshot => {
            let data = snapshot.val();
            if (data == null) {
                setPlayListForYou([]);
                return;
            }
            let _playListForYou = [];
            Object.keys(data).map(key => {
                _playListForYou.push({
                    ...data[key],
                    key

                })
            });
            setPlayListForYou(_playListForYou);
        })
    }, [user])
    const renderItemPlaylistForYou = ({ item, index }) => {
        const isFirst = index === 0;
        return (
            <TouchableOpacity
                onPress={() => props.navigation.navigate("partySongScreen", { item })}
                style={{
                    marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
                    marginRight: Default.fixPadding * 1.5,
                    marginBottom: Default.fixPadding * 2,
                }}
            >
                <Image source={{ uri: item.image }} style={{ width: 100, height: 100, borderRadius: 8 }} />
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

    function renderBannerImage(image, index){
        return (
            <View key={index}>
                <Image style={{ width: "100%", height: 160 }} source={{ uri: image.ImageURL }} />
            </View>
        );
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.darkBlue }}>
            <StatusBar
                backgroundColor={Colors.darkBlue}
                barStyle={Platform.OS === "android" ? "light-content" : "default"}
            />
            <View
                style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                    margin: Default.fixPadding * 1.5,
                    backgroundColor: Colors.darkBlue,
                }}
            >
                <View style={{ flex: 9 }}>
                    <Text style={{ ...Fonts.Bold18White }}>{tr("hello")} {userData && userData.displayName},</Text>
                    <Text style={{ ...Fonts.SemiBold14Grey }}>{tr("hearToday")}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate("notificationScreen")}
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Ionicons
                        name="notifications-outline"
                        size={25}
                        color={Colors.white}
                    />
                    <View
                        style={{
                            height: 7,
                            width: 7,
                            borderRadius: 7 / 2,
                            backgroundColor: Colors.red,
                            justifyContent: "center",
                            alignItems: "center",
                            top: "25%",
                            left: "50%",
                            position: "absolute",
                        }}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Carousel
                        autoplay
                        autoplayTimeout={5000}
                        loop
                        index={0}
                        pageSize={Dimensions.get('window').width}
                    >
                        {bannerList.map((image, index) => renderBannerImage(image, index))}
                </Carousel>

                <View
                    style={{
                        flexDirection: isRtl ? "row-reverse" : "row",
                        justifyContent: "space-between",
                        marginHorizontal: Default.fixPadding * 1.5,
                        marginBottom: Default.fixPadding,
                        marginTop: Default.fixPadding * 1.5,
                    }}
                >
                    <Text style={{ ...Fonts.Bold18White }}>{tr("topArtists")}</Text>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("topArtistsScreen")}
                    >
                        <Text style={{ ...Fonts.Bold14Primary }}>{tr("seeAll")}</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    horizontal
                    nestedScrollEnabled
                    data={artistsData}
                    renderItem={renderItemArtists}
                    keyExtractor={(item) => item.key}
                    showsHorizontalScrollIndicator={false}
                />
   
                  <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            justifyContent: "space-between",
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding,
            marginTop: Default.fixPadding,
          }}
        >
          <Text style={{ ...Fonts.Bold18White }}>{tr("recently")}</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("recentlyPlayScreen")}
          >
            <Text style={{ ...Fonts.Bold14Primary }}>{tr("seeAll")}</Text>
          </TouchableOpacity>
        </View>  
                  <FlatList
          horizontal
          nestedScrollEnabled
          data={recentlyPlayed}
          renderItem={renderItemRecentlyPlayed}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
        />  

                {playlistForYou.length > 0 && (<View
                    style={{
                        flexDirection: isRtl ? "row-reverse" : "row",
                        justifyContent: "space-between",
                        marginHorizontal: Default.fixPadding * 1.5,
                        marginBottom: Default.fixPadding,
                    }}
                >
                    <Text style={{ ...Fonts.Bold18White }}>{tr("playList")}</Text>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("playListScreen")}
                    >
                        <Text style={{ ...Fonts.Bold14Primary }}>{tr("seeAll")}</Text>
                    </TouchableOpacity>
                </View>)}
                <FlatList
                    horizontal
                    nestedScrollEnabled
                    data={playlistForYou}
                    renderItem={renderItemPlaylistForYou}
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
          <Text style={{ ...Fonts.Bold18White }}>{tr("freshMusic")}</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("freshMusicScreen")}
          >
            <Text style={{ ...Fonts.Bold14Primary }}>{tr("seeAll")}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          nestedScrollEnabled
          data={freshMusic}
          renderItem={renderItemFreshMusic}
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
          <Text style={{ ...Fonts.Bold18White }}>{tr("bhakti")}</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("bhaktiScreen")}
          >
            <Text style={{ ...Fonts.Bold14Primary }}>{tr("seeAll")}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          nestedScrollEnabled
          data={bhakti}
          renderItem={renderItemBhakti}
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
          <Text style={{ ...Fonts.Bold18White }}>{tr("mood")}</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("moodScreen")}
          >
            <Text style={{ ...Fonts.Bold14Primary }}>{tr("seeAll")}</Text>
          </TouchableOpacity>
        </View> */}
                {/* <FlatList
          horizontal
          nestedScrollEnabled
          data={mood}
          renderItem={renderItemMood}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
        /> */}
            </ScrollView>
            <BottomMusic onSelect={() => props.navigation.navigate("playScreen")} />
        </SafeAreaView>
    );
};

export default HomeScreen;
