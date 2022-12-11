import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    BackHandler,
    ImageBackground,
    Share,
    ActivityIndicator,
    PermissionsAndroid,
    Permission,
    Platform,
    Alert
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import Feather from "react-native-vector-icons/Feather";
import Slider from '@react-native-community/slider';
import MainBottomSheet from "../components/mainBottomSheet";
import AddToPlayList from "../components/addToPlayList";
import NewPlayList from "../components/newPlayList";
// import { Audio } from "expo-av";
import { useAppContext } from "../context";
import { useOnTogglePlayback, useCurrentTrack } from '../hooks';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import TrackPlayer, { State, usePlaybackState, useProgress } from 'react-native-track-player';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import AudioRecorderPlayer, { AudioEncoderAndroidType, AudioSourceAndroidType, AVEncoderAudioQualityIOSType, AVEncodingOption } from 'react-native-audio-recorder-player';
import { FFmpegKit } from 'ffmpeg-kit-react-native'
import RNFS from "react-native-fs"
import uuid from 'react-native-uuid';
import LinearGradient from 'react-native-linear-gradient';
const audioRecorderPlayer = new AudioRecorderPlayer();
const PlayScreen = (props) => {
    const { setMusic, music } = useAppContext();
    const { t, i18n } = useTranslation();
    const [isLoaded, setIsLoaded] = useState(false);

    const isRtl = i18n.dir() === "rtl";

    function tr(key) {
        return t(`playScreen:${key}`);
    }

    const backAction = () => {
        props.navigation.goBack();
        return true;
    };
    const onTogglePlayback = useOnTogglePlayback();
    const progress = useProgress();
    const state = usePlaybackState();
    const isPlaying = state === State.Playing;
    const [isRecording, setIsRecording] = useState(false);
    const [isCounting, setIsCounting] = useState(false);
    const { countDownNumber, setCountDownNumber } = useState(3);
    const isLoading = useDebouncedValue(
        state === State.Connecting || state === State.Buffering,
        250
    );
    useEffect(() => {
        // console.log(props)
        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);
    useEffect(() => {
        if (isPlaying == false) {
            if (isRecording) {
                console.log("Music play has been stoped")
                stopRecord()
            }
        }
    }, [isPlaying])
    useEffect(
        () =>
            props.navigation.addListener('beforeRemove', (e) => {

                if (isRecording) {
                    e.preventDefault();

                    // Prompt the user before leaving the screen
                    Alert.alert(
                        'Discard recording?',
                        'Are you sure to stop recordings?',
                        [
                            { text: "Don't leave", style: 'cancel', onPress: () => { } },
                            {
                                text: 'Discard',
                                style: 'destructive',
                                // If the user confirmed, then we dispatch the action we blocked earlier
                                // This will continue the action that had triggered the removal of the screen
                                onPress: () => {
                                    TrackPlayer.reset()
                                    props.navigation.dispatch(e.data.action)
                                },
                            },
                        ]
                    );
                }

                else {
                    TrackPlayer.reset()
                    props.navigation.dispatch(e.data.action)
                }
                // Prevent default behavior of leaving the screen

            }),
        [props.navigate]
    );

    const currentTrack = useCurrentTrack();
    const [isVisible, setIsVisible] = useState(false);
    const [value, setValue] = useState(0);
    const [recordStartTime, setRecordStartTime] = useState(0);
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

    async function getPermissions() {
        if (Platform.OS === 'android') {
            try {
                const grants = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                ]);

                console.log('write external stroage', grants);

                if (
                    grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    grants['android.permission.READ_EXTERNAL_STORAGE'] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    grants['android.permission.RECORD_AUDIO'] ===
                    PermissionsAndroid.RESULTS.GRANTED
                ) {
                    console.log('Permissions granted');
                } else {
                    console.log('All required permissions not granted');
                    return;
                }
            } catch (err) {
                console.warn(err);
                return;
            }
        }
    }

    stopRecord = async () => {
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        console.log(currentTrack.url, "Current Track URL")
        TrackPlayer.pause();
        FFmpegKit.execute(
            `-i ${currentTrack.url} -i ${result} -filter_complex "[0]asplit[a][b]; [a]atrim=duration=${recordStartTime},volume='1-max(0.25*(t-${recordStartTime}),0)':eval=frame[pre]; [b]atrim=start=${recordStartTime},asetpts=PTS-STARTPTS[song]; [song][1]amix=inputs=2:duration=first:dropout_transition=2[post];  [pre][post]concat=n=2:v=0:a=1[mixed]"  -map "[mixed]" ${RNFS.DownloadDirectoryPath}/${uuid.v4()}.mp4`
        )
            .then((result) => {
                setVisible(false)
                setIsRecording(false)
                props.navigation.goBack()
                console.log("Stop Record", result);
                console.log(`FFmpeg process exited with rc=${result.getAllLogs()}.`)
            }
            );
    }

    startRecord = async () => {
        setIsCounting(false)
        setIsRecording(true)
        const path = Platform.select({
            ios: 'hello.m4a',
            android: `${RNFS.DownloadDirectoryPath}/hello.mp4`,
        });
        const audioSet = {
            AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
            AudioSourceAndroid: AudioSourceAndroidType.MIC,
            AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
            AVNumberOfChannelsKeyIOS: 2,
            AVFormatIDKeyIOS: AVEncodingOption.aac,
        };
        const result = await audioRecorderPlayer.startRecorder(path, audioSet);
        setRecordStartTime(parseInt(progress.position, 10));
        audioRecorderPlayer.addRecordBackListener((e) => {
            return;
        });
    }
    function startCountDown() {
        setIsCounting(true)
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.darkBlue }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
            >

                <ImageBackground
                    source={currentTrack && currentTrack.artwork ? { uri: currentTrack.artwork } : require("../assets/image/music.png")}
                    style={{ flex: 1 }}
                >
                    <View style={{ justifyContent: "space-between", flex: 1 }}>
                        <LinearGradient colors={[Colors.darkBlue,  Colors.darkBlueOpacity]} >
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
                                        style={{
                                            paddingVertical: Default.fixPadding * 0.5,
                                        }}
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
                                    <Text style={{ ...Fonts.Bold24White }}>{currentTrack?.title}</Text>
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
                                            {currentTrack?.artist}
                                        </Text>
                                        <View
                                            style={{
                                                backgroundColor: Colors.extraBlack,
                                                borderRadius: 5,
                                                marginHorizontal: Default.fixPadding,
                                                paddingVertical: Default.fixPadding * 0.5,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    ...Fonts.Bold14White,
                                                    paddingHorizontal: Default.fixPadding,
                                                }}
                                            >
                                                {tr("follow")}
                                            </Text>
                                        </View>
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
                                value={progress.position}
                                minimumValue={0}
                                maximumValue={progress.duration}
                                thumbTintColor="#FFD479"
                                minimumTrackTintColor="#FFD479"
                                maximumTrackTintColor="#FFFFFF"
                                onSlidingComplete={TrackPlayer.seekTo}
                            />

                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginHorizontal: Default.fixPadding * 3,
                                }}
                            >
                                <Text style={{ ...Fonts.SemiBold12Grey }}>{new Date(progress.position * 1000).toISOString().slice(14, 19)}</Text>
                                <Text
                                    style={{
                                        ...Fonts.SemiBold12Grey,
                                        marginRight: Default.fixPadding,
                                    }}
                                >
                                    {new Date((progress.duration - progress.position) * 1000)
                                        .toISOString()
                                        .slice(14, 19)}
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
                                {
                                    isLoading ? <View style={{ height: 70, width: 70 }}>
                                        {isLoading && <ActivityIndicator size={70} />}
                                    </View> :

                                        isCounting ? <CountdownCircleTimer
                                            isPlaying
                                            duration={3}
                                            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                                            colorsTime={[3, 2, 1, 0]}
                                            strokeWidth={5}
                                            size={70}
                                            onComplete={startRecord}
                                        >
                                            {({ remainingTime }) => <View style={{
                                                height: 66,
                                                width: 66,
                                                borderRadius: 33,
                                                backgroundColor: Colors.primary,
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}><Text style={{
                                                ...Fonts.SemiBold12Grey,
                                                marginRight: Default.fixPadding, fontSize: 25, textAlign: "center"
                                            }}>{remainingTime}</Text></View>}
                                        </CountdownCircleTimer> : <TouchableOpacity
                                            onPress={isPlaying ? (
                                                isRecording ? stopRecord : startCountDown
                                            ) : onTogglePlayback}
                                            style={{
                                                height: 66,
                                                width: 66,
                                                borderRadius: 33,
                                                backgroundColor: Colors.primary,
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Fontisto
                                                name={isPlaying ? (
                                                    isRecording ? "stop" : "record"
                                                ) : "play"}
                                                size={25}
                                                color={Colors.white}
                                            />

                                        </TouchableOpacity>

                                }

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

export default PlayScreen;
