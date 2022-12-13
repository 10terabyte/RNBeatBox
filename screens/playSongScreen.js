import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    BackHandler,
    ImageBackground,
    Share,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import Slider from '@react-native-community/slider';
import MainBottomSheet from "../components/mainBottomSheet";
import AddToPlayList from "../components/addToPlayList";
import NewPlayList from "../components/newPlayList";
import LinearGradient from 'react-native-linear-gradient';

const PlaySongScreen = (props) => {
    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() === "rtl";

    function tr(key) {
        return t(`playScreen:${key}`);
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

    const [isVisible, setIsVisible] = useState(false);
    const [value, setValue] = useState(0);

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

    const shareMessage = () => {
        setVisible(false);
        Share.share({
            message: toString(),
        });
    };

    const [Status, SetStatus] = React.useState(false);

    ;

    const LoadAudio = async () => {

    };

    const PlayAudio = async () => {

    };

    const PauseAudio = async () => {

    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.boldBlack }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <ImageBackground
                    source={require("../assets/image/music.png")}
                    style={{ flex: 1 }}
                >
                    <View style={{ justifyContent: "space-between", flex: 1 }}>
                        <LinearGradient colors={[Colors.darkBlue, Colors.darkBlueOpacity]} >
                            <View
                                style={{
                                    flexDirection: isRtl ? "row-reverse" : "row",
                                }}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        marginHorizontal: Default.fixPadding * 1.5,
                                        marginVertical: Default.fixPadding,
                                        paddingVertical: Default.fixPadding * 0.5,
                                    }}
                                >
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
                                </View>
                                <View
                                    style={{
                                        flex: 8,
                                        flexDirection: "row",
                                        justifyContent: isRtl ? "flex-start" : "flex-end",
                                        marginHorizontal: Default.fixPadding * 1.5,
                                        marginVertical: Default.fixPadding,
                                    }}
                                >
                                   
                                    <TouchableOpacity
                                        onPress={() => setVisible(true)}
                                        style={{
                                            paddingVertical: Default.fixPadding * 0.5,
                                        }}
                                    >
                                        <Ionicons
                                            name="ellipsis-vertical"
                                            size={24}
                                            color={Colors.white}
                                            style={{
                                                color: Colors.white,
                                            }}
                                        />
                                    </TouchableOpacity>

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
                                </View>
                            </View>
                        </LinearGradient>
                        <LinearGradient colors={[Colors.darkBlueOpacity, Colors.darkBlue]} >
                            <View>
                               
                                <View
                                    style={{
                                        flexDirection: isRtl ? "row-reverse" : "row",
                                        marginHorizontal: Default.fixPadding * 1.5,
                                    }}
                                >
                                    <View
                                        style={{
                                            flex: 9,
                                            alignItems: isRtl ? "flex-end" : "flex-start",
                                        }}
                                    >
                                        <Text style={{ ...Fonts.Bold24White }}>Let Somebody Go</Text>
                                        <View
                                            style={{
                                                flexDirection: isRtl ? "row-reverse" : "row",
                                                marginVertical: Default.fixPadding * 0.5,
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    ...Fonts.Bold14Grey,
                                                }}
                                            >
                                                Selena Gomez
                                            </Text>
                                            
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Feather name="download" size={30} color={Colors.white} />
                                    </View>
                                </View>

                                <Slider
                                    style={{
                                        height: 40,
                                        width: 380,
                                        marginTop: 25,
                                        flexDirection: 'row',
                                    }}
                                    value={12}
                                    minimumValue={0}
                                    maximumValue={100}
                                    thumbTintColor="#FFD479"
                                    minimumTrackTintColor="#FFD479"
                                    maximumTrackTintColor="#FFFFFF"
                                // onSlidingComplete={TrackPlayer.seekTo}
                                />
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginHorizontal: Default.fixPadding * 3,
                                    }}
                                >
                                    <Text style={{ ...Fonts.SemiBold12Grey }}>15 : 20</Text>
                                    <Text
                                        style={{
                                            ...Fonts.SemiBold12Grey,
                                            marginRight: Default.fixPadding,
                                        }}
                                    >
                                        22 : 45
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginVertical: Default.fixPadding * 1.5,
                                    }}
                                >
                                    <Feather name="shuffle" size={20} color={Colors.darkGrey} />
                                    <Ionicons
                                        name="play-skip-back"
                                        size={30}
                                        color={Colors.white}
                                        style={{ marginHorizontal: Default.fixPadding * 2 }}
                                    />
                                    <TouchableOpacity
                                        onPress={Status === false ? PlayAudio : PauseAudio}
                                        style={{
                                            height: 66,
                                            width: 66,
                                            borderRadius: 33,
                                            backgroundColor: Colors.primary,
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Ionicons
                                            name={Status === false ? "play" : "pause"}
                                            size={25}
                                            color={Colors.white}
                                        />
                                    </TouchableOpacity>
                                    <Ionicons
                                        name="play-skip-forward"
                                        size={30}
                                        color={Colors.white}
                                        style={{ marginHorizontal: Default.fixPadding * 2 }}
                                    />
                                    <Feather name="repeat" size={20} color={Colors.darkGrey} />
                                </View>
                            </View>
                        </LinearGradient>
                    </View>
                </ImageBackground>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PlaySongScreen;
