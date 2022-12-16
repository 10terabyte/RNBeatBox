import {
    Text,
    View,
    ScrollView,
    SafeAreaView,
    FlatList,
    Image,
    BackHandler,
    StatusBar,
    TouchableOpacity,
    Share,
    Dimensions,
    Platform,
    ToastAndroid
} from "react-native";
import React, { useEffect, useState } from "react";
import { useOnTogglePlayback, useCurrentTrack } from '../hooks';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Default, Fonts } from "../constants/style";
import BottomMusic from "../components/bottomMusic";
import { AppWrapper, useAppContext } from "../context";
import Loader from "../components/loader";
// import { useAuthentication } from '../utils/hooks/useAuthentication';
import firestore from '@react-native-firebase/firestore';
import { playBeat } from '../controllers/beat'
import sotrage from "@react-native-firebase/storage"
import TrackPlayer, { State, usePlaybackState, useProgress } from 'react-native-track-player';
const { width } = Dimensions.get("window");
const FIRESTORE = firestore()
const MyRecordScreen = (props) => {
    const { user, track } = useAppContext();
    const currentTrack = useCurrentTrack()
    const [recodList, setRecordList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const recordCollection = FIRESTORE.collection("records")
    const beatCollection = FIRESTORE.collection("beats")
    const artistCollection = FIRESTORE.collection("artists")
    const state = usePlaybackState();
    const isPlaying = state === State.Playing;
    async function loadSoundAndPlay(musicItem) {
        //recodList;
        let trackList = recodList.map(item => {
            return {
                url: item.url, // Load media from the network
                title: item.track_name,
                artist: item.artist,
                artwork: item.track_thumbnail, // Load artwork from the network
                isRecorded: true,
                key: item.key
            };
        })

        setIsLoading(true)
        TrackPlayer.reset();
        await TrackPlayer.add(trackList);
        if(trackList.length){
            await TrackPlayer.skip(0)
            TrackPlayer.play()
            const tracks = await TrackPlayer.getQueue();
            console.log(`Track Length: ${tracks.length}`);
        }
       
        setIsLoading(false)
        
    }
    const backAction = () => {
        props.navigation.goBack();
        return true;
    };

    const onPressedTogglePlay = async (item, index) => {
        if (currentTrack && currentTrack.url == item.url) {
            onTogglePlayback()
        }
        else {
            console.log(index)
            setIsLoading(true)
            await TrackPlayer.skip(index)
            TrackPlayer.play()
            setIsLoading(false)

        }
    }
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);
    const onTogglePlayback = useOnTogglePlayback();
    useEffect(() => {
        let _recordData = [];
        let promises = [];
        setIsLoading(true)
        if (user && user.uid)
            recordCollection
                .where('userid', "==", user.uid)
                .onSnapshot(async (querySnap) => {
                    querySnap.forEach(async (doc) => {
                        // console.log(doc.id,"id++++")
                        _recordData.push({ ...doc.data(), key: doc.id });
                        const index = _recordData.length - 1;
                        // console.log(_recordData[index],"recordData")
                        promises.push(new Promise(async (resolve, reject) => {

                            try {
                                const recordedFileName = `/recorded/${user.uid}/${doc.data().beatid}/${doc.data().filename}`;
                                _recordData[index].url = await sotrage().ref().child(recordedFileName).getDownloadURL();
                                _recordData[index].key = doc.id
                                const beatData = await beatCollection.doc(doc.data().beatid).get();
                                // console.log(beatData.data(),"beatdata")
                                _recordData[index].track_name = beatData.data().track_name;
                                _recordData[index].track_thumbnail = beatData.data().track_thumbnail;
                                const artistData = await artistCollection.doc(beatData.data().track_artist).get();
                                _recordData[index].artist = artistData.data().name;
                                // console.log(_recordData[index],"recordIndex")
                                resolve();
                            } catch (e) {

                                reject(e);
                            }
                        }))

                    });
                    try {

                        await Promise.all(promises);
                    } catch (e) {
                        console.log("error", e)
                    }
                    // console.log(_recordData,"recordList");
                    setRecordList(_recordData);
                    setIsLoading(false)
                    loadSoundAndPlay()
                })
    }, [user])
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
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <TouchableOpacity
                    style={{ marginHorizontal: Default.fixPadding * 1.5 }}
                    onPress={() => props.navigation.goBack()}
                >
                    <Ionicons
                        name={"arrow-back"}
                        size={25}
                        color={Colors.white}
                    />
                </TouchableOpacity>
                <Text style={Fonts.Bold20White}>All My Records</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>


                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginHorizontal: Default.fixPadding * 1.5,
                        marginBottom: Default.fixPadding * 1.5,
                    }}
                >
                    <Text style={{ ...Fonts.Bold18White }}>{"record list"}</Text>

                </View>
                {recodList.map((item, index) => {
                    const isFirst = index === 0;
                    return (
                        <View
                            key={item.key}
                            style={{
                                marginBottom: Default.fixPadding * 1.5,
                                marginHorizontal: Default.fixPadding * 1.5,
                                flexDirection: "row",
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    flex: 9,
                                    flexDirection: "row",
                                }}
                            // onPress={() => loadSoundAndPlay({ ...item, singer: props.route.params.item.name })}
                            >
                                <Image source={{ uri: item.track_thumbnail }} style={{ width: 50, height: 50, borderRadius: 5 }} />
                                <View
                                    style={{
                                        justifyContent: "center",
                                        marginHorizontal: Default.fixPadding,
                                        alignItems: "flex-start",
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...(isFirst
                                                ? Fonts.SemiBold16Primary
                                                : Fonts.SemiBold16White),
                                            width: 200
                                        }}
                                    >
                                        {item.track_name}
                                    </Text>
                                    <Text
                                        style={{
                                            ...Fonts.SemiBold14Grey,
                                        }}
                                    >
                                        {item.artist}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => onPressedTogglePlay(item, index)}
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Ionicons
                                    name={currentTrack && currentTrack.url == item.url ? (isPlaying ? "pause-circle" : "play-circle") : "play-circle"}
                                    color={Colors.white}
                                    size={24}
                                    style={{
                                        justifyContent: "center",
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    );
                })}
                {/* <MainBottomSheet
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
                /> */}

                {/* <AddToPlayList
                    visible={addPlayList}
                    onBackButtonPress={toggleCloseAddPlayList}
                    onBackdropPress={toggleCloseAddPlayList}
                    close={toggleCloseAddPlayList}
                    onSelect={() => {
                        toggleCloseAddPlayList();
                        setNewPlayList(true);
                    }}
                    isClose={toggleCloseAddPlayList}
                    beat={selectedBeat}
                />
                <NewPlayList
                    visible={newPlayList}
                    onBackButtonPress={toggleCloseNewPlayList}
                    onBackdropPress={toggleCloseNewPlayList}
                    cancel={toggleCloseNewPlayList}
                    beat={selectedBeat}
                /> */}


            </ScrollView>
            <BottomMusic onSelect={() => props.navigation.navigate("playScreen")} />
            <Loader visible={isLoading} />
        </SafeAreaView>
    );
};

export default MyRecordScreen;
