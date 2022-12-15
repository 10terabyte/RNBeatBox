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
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Default, Fonts } from "../constants/style";
import BottomMusic from "../components/bottomMusic";
import { AppWrapper, useAppContext } from "../context";
import Loader from "../components/loader";
// import { useAuthentication } from '../utils/hooks/useAuthentication';
import firestore from '@react-native-firebase/firestore';
import { playBeat } from '../controllers/beat'
import sotrage from "@react-native-firebase/storage"

const { width } = Dimensions.get("window");
const FIRESTORE = firestore()
const MyRecordScreen = (props) => {
    const { user } = useAppContext();
    const [recodList, setRecordList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const recordCollection = FIRESTORE.collection("records")
    const beatCollection = FIRESTORE.collection("beats")
    const artistCollection = FIRESTORE.collection("artists")
    console.log(user, "user")
    async function loadSoundAndPlay(musicItem) {
        setIsLoading(true)
        playBeat(musicItem, user.uid).then(result => {
            setIsLoading(false)
            props.navigation.navigate("playScreen", { item: musicItem });

        }).catch(error => {
            // setIsLoading(false)
        })
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
        let _recordData = [];
        let promises = [];
        setIsLoading(true)
        if (user && user.uid)
            recordCollection
                .where('userid', "==", user.uid)
                .onSnapshot(async(querySnap) => {
                    querySnap.forEach(async (doc) => {
                        // console.log(doc.id,"id++++")
                        _recordData.push({...doc.data(), key: doc.id});
                        const index = _recordData.length - 1;
                        // console.log(_recordData[index],"recordData")
                        promises.push(new Promise(async (resolve, reject) => {

                            try {
                                const recordedFileName = `/recorded/${user.uid}/${doc.data().beatid}/${doc.data().filename}`;
                                _recordData[index].url = await sotrage().ref().child(recordedFileName).getDownloadURL();
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
                    try{

                        await Promise.all(promises);
                    }catch(e){
                        console.log("error", e)
                    }
                    // console.log(_recordData,"recordList");
                    setRecordList(_recordData);
                    setIsLoading(false)
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
                                                width:200
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
                                // onPress={() => { setVisible(true); setSelectedBeat(item); }}
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Ionicons
                                    name="play-circle"
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
