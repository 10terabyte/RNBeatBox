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
import Loader from "../components/loader";
import BottomMusic from "../components/bottomMusic";
// import { useAuthentication } from '../utils/hooks/useAuthentication';
// import Firebase from "firebase";
import { useAppContext } from "../context";
import { playBeat} from '../controllers/beat'
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
const { width } = Dimensions.get("window");
// const DB = getDatabase();
const FIRESTORE = firestore()
const HomeScreen = (props) => {
    const artistCollection = FIRESTORE.collection('artists')
    const beatCollection = FIRESTORE.collection('beats')
    const followsCollection = FIRESTORE.collection('follows');
    const playLogCollection = FIRESTORE.collection('beatPlayLog')
    // followsCollection.orderBy()
    const { t, i18n } = useTranslation();
    const { user } = useAppContext();
    console.log(user, "homeUser")
    const [userData, setUserData] = useState({});
    const isRtl = i18n.dir() === "rtl";
    const [followChangeEvent, setFollowChangeEvent] = useState(0)
    const [followDocChanges, setFollowDocChanges] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [weeklyTrendings, setWeeklyTrendings] = useState([])
    function tr(key) {
        return t(`homeScreen:${key}`);
    }
    useEffect(() => {
        functions()
          .httpsCallable('getWeeklyTrending')()
          .then(response => {
            setWeeklyTrendings(response.data)
          });
      }, []);
    useEffect(() => {
        setUserData(user);
        if(!user.emailVerified ){
            // props.navigation.navigate("verification");
        }

    }, [user])
    const [artistsData, setArtistsData] = useState([]);
    useEffect(() =>{
        const unsubscribe = artistCollection.onSnapshot(snpShot =>{
            artistCollection.orderBy('follows', "desc").limit(5).get().then(snapshot =>{
                let artData = [];
                snapshot.forEach(result =>{
                    console.log("ARTIST", result.data().follows)
                    artData.push({...result.data(), key: result.id})
                })
                setArtistsData(artData)
            }) 
        })
        return () =>{
            unsubscribe()
        }
    }, [FIRESTORE])
    useEffect(() =>{
        const unsubscribe = beatCollection.onSnapshot(snpShot =>{
            beatCollection.orderBy('playCount', "desc").limit(5).get().then(snapshot =>{
                let artData = [];
                snapshot.forEach(result =>{
                    console.log("ARTIST", result.data().follows)
                    artData.push({...result.data(), key: result.id})
                })
                setMostlyPlayed(artData)
            }) 
        })
        return () =>{
            unsubscribe()
        }
    }, [FIRESTORE])
    // refreshTopArtist()
    
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
    const [mostlyPlayed, setMostlyPlayed] = useState([]);
    async function loadSoundAndPlay(musicItem) {
        setIsLoading(true)
        playBeat(musicItem, user.uid).then(result =>{
            props.navigation.navigate("playScreen", { item: musicItem });
            setIsLoading(false)
        }).catch(error =>{
            setIsLoading(false)
        })
        
    }
     
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

    const [playlistForYou, setPlayListForYou] = useState([]);
    useEffect(() => {
        if (!user || !user.uid)
            return;
        // console.log(user, "user")
        // onValue(query(ref(DB, "playlists"), orderByChild("user"), equalTo(user.uid)), snapshot => {
        //     let data = snapshot.val();
        //     if (data == null) {
        //         setPlayListForYou([]);
        //         return;
        //     }
        //     let _playListForYou = [];
        //     Object.keys(data).map(key => {
        //         _playListForYou.push({
        //             ...data[key],
        //             key

        //         })
        //     });
        //     setPlayListForYou(_playListForYou);
        // })
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
                {/* <Carousel
                        autoplay
                        autoplayTimeout={5000}
                        loop
                        index={0}
                        pageSize={Dimensions.get('window').width}
                        useNativeDriver = {false}
                    >
                        {bannerList.map((image, index) => renderBannerImage(image, index))}
                </Carousel> */}

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
          <Text style={{ ...Fonts.Bold18White }}>{tr("mostly_played")}</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("recentlyPlayScreen")}
          >
            <Text style={{ ...Fonts.Bold14Primary }}>{tr("seeAll")}</Text>
          </TouchableOpacity>
        </View>  
                  <FlatList
          horizontal
          nestedScrollEnabled
          data={mostlyPlayed}
          renderItem={renderBeatItem}
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
          <Text style={{ ...Fonts.Bold18White }}>{tr("weekly_trendings")}</Text>
          <TouchableOpacity
            onPress={() => {}}
          >
            <Text style={{ ...Fonts.Bold14Primary }}>{tr("seeAll")}</Text>
          </TouchableOpacity>
        </View>  
                  <FlatList
          horizontal
          nestedScrollEnabled
          data={weeklyTrendings}
          renderItem={renderBeatItem}
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
            <BottomMusic   />
            <Loader visible={isLoading} />
        </SafeAreaView>
    );
};

export default HomeScreen;
