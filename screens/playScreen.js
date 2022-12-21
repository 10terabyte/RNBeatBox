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
import Loader from "../components/loader";
import { useOnTogglePlayback, useCurrentTrack } from '../hooks';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import TrackPlayer, { State, usePlaybackState, useProgress, Event, useTrackPlayerEvents } from 'react-native-track-player';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import AudioRecorderPlayer, { AudioEncoderAndroidType, AudioSourceAndroidType, AVEncoderAudioQualityIOSType, AVEncodingOption } from 'react-native-audio-recorder-player';
import { FFmpegKit } from 'ffmpeg-kit-react-native'
import RNFS from "react-native-fs"
import uuid from 'react-native-uuid';
import LinearGradient from 'react-native-linear-gradient';
import { favoriteBeat } from '../controllers/beat'
import firestore from "@react-native-firebase/firestore";
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import RNFetchBlob from "rn-fetch-blob";
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage'
import ProgressBarLoader from "../components/progressbarloader";
import Toast from "react-native-root-toast";
const audioRecorderPlayer = new AudioRecorderPlayer();
const FIRESTORE = firestore()
const favoritesCollection = FIRESTORE.collection('beatFavorites')
const recordedCollection = FIRESTORE.collection('records')
const events = [
    Event.PlaybackState,
    Event.PlaybackError,
];

const PlayScreen = (props) => {
    const { t, i18n } = useTranslation();
    const [isProcessing, setIsProcessing] = useState(false);
    const isRtl = i18n.dir() === "rtl";
    const { user, customerData } = useAppContext();
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
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0.00)
    const [isCounting, setIsCounting] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false)
    const [loaderText, setLoaderText] = useState("Please Wait");
    useTrackPlayerEvents(events, (event) => {
        if (event.type === Event.PlaybackError) {
            console.warn('An error occured while playing the current track.');
        }
        if (event.state == State.Stopped) {
            if (isRecording) {
                stopRecord()
            }
            else {
                props.navigation.goBack()
            }

        }
        // console.log(event.type, event, "Track Play Events")
    });
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

    useEffect(
        () =>
            props.navigation.addListener('beforeRemove', (e) => {
                console.log('checkIsRecord', isRecording)
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
                                    setEmptyTrack()
                                    props.navigation.dispatch(e.data.action)
                                },
                            },
                        ]
                    );
                }

                else {
                    TrackPlayer.reset()
                    setEmptyTrack()
                    props.navigation.dispatch(e.data.action)
                }
                // Prevent default behavior of leaving the screen

            }),
        [props.navigate]
    );
    const downloadBeat = () =>{
        if(customerData.credits < currentTrack?.amount_of_credits){
            Toast.show("You have no credits to download this beat", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
                backgroundColor: Colors.white,
                textColor: Colors.black,
              });
        }
        else{
            const downloadURL = currentTrack?.url
            setIsProcessing(true)
            RNFetchBlob.config({
                fileCache: true,
              })
                .fetch("GET", downloadURL, {
                })
                .then((res) => {
                  // the temp file path
                //   console.log("The file saved to ", res.path());
                const newCreditAmounts = customerData.credits - currentTrack?.amount_of_credits
                firestore().collection('customers').doc(user.uid).update({
                    credits: newCreditAmounts
                });
                Toast.show(`The file saved to ${res.path()}`, {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                    backgroundColor: Colors.white,
                    textColor: Colors.black,
                  });
                  setIsProcessing(false)
                }).catch(error =>{
                    setIsProcessing(false)
                });
        }
    }
    const { currentTrack, setEmptyTrack} = useAppContext();
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

    uploadRecorded = (uri) => {
        return new Promise(function (resolve, reject) {
            const filename = `recorded/${user.uid}/${props.route.params.item.key}/${uri.substring(uri.lastIndexOf('/') + 1)}`;
            const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
            const task = storage()
                .ref(filename)
                .putFile(uploadUri);
            console.log(filename, uploadUri)
            task.on('state_changed', snapshot => {
              console.log((snapshot.bytesTransferred / snapshot.totalBytes) || 0, "UploadProgress")
                setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) || 0)
                //setUploadMaxValue(snapshot.totalBytes)

            });
            try {
                task.then(result => {
                    resolve(result)
                }).catch(e => {
                    console.error(e);
                    reject(e)
                });
            } catch (e) {
                console.error(e);
                reject(e)
            }
        });

    }

    const stopRecord = async () => {
      setIsProcessing(true)
      try{

        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        console.log(currentTrack.url, "Current Track URL")
        TrackPlayer.pause();
        console.log("RecordTempFile", result)
        //const recordedFileURL = `${RNFS.DownloadDirectoryPath}/${uuid.v4()}.mp4`
        const recordedFileURL = Platform.select({
            ios: `${RNFS.LibraryDirectoryPath}/${uuid.v4()}.m4a`,
            android: `${RNFS.DownloadDirectoryPath}/${uuid.v4()}.mp4`,
        });
        FFmpegKit.execute(
            `-i ${currentTrack.url} -i ${result} -filter_complex "[0]asplit[a][b]; [a]atrim=duration=${recordStartTime},volume='1-max(0.25*(t-${recordStartTime}),0)':eval=frame[pre]; [b]atrim=start=${recordStartTime},asetpts=PTS-STARTPTS[song]; [song][1]amix=inputs=2:duration=first:dropout_transition=2[post];  [pre][post]concat=n=2:v=0:a=1[mixed]"  -map "[mixed]" ${recordedFileURL}`
        )
            .then((result) => {
                setIsProcessing(false)
                setIsUploading(true)
                uploadRecorded(recordedFileURL).then(result => {
                    setIsUploading(false)

                    setIsProcessing(true)
                    // setLoaderText("Save record")
                    const uploadedFileName = `${recordedFileURL.substring(recordedFileURL.lastIndexOf('/') + 1)}`;
                    recordedCollection.add({
                        userid: user.uid,
                        beatid: props.route.params.item.key,
                        filename: uploadedFileName,
                        created: database().getServerTime()
                    }).then((result) => {
                        setIsProcessing(false)
                        setIsRecording(false)
                        props.navigation.goBack()
                    }).catch(error => {
                        console.log("Error in Save Record Table 1", error)
                        setIsProcessing(false)
                        setIsRecording(false)
                        props.navigation.goBack()
                    })

                }).catch(e => {
                    console.log("Error in Save Record Table 2", e)
                    setIsUploading(false)
                    setIsRecording(false)
                    props.navigation.goBack()
                })

            }
            ).catch(error => {
                console.log("Error in combine files", error)
                setIsProcessing(false)
                setIsRecording(false)
                props.navigation.goBack()
            });
      }
      catch(error){
        setIsProcessing(false)
      }

    }

    startRecord = async () => {
      console.log("Start Record")
        try {
            setIsCounting(false)
            setIsRecording(true)
            console.log('checkIsRecord', isRecording, 1)
            const path = Platform.select({
                ios: `record_temp.m4a`,
                android: `${RNFS.DownloadDirectoryPath}/record_temp.mp4`,
            });
            const audioSet = {
                AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
                AudioSourceAndroid: AudioSourceAndroidType.MIC,
                AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
                AVNumberOfChannelsKeyIOS: 2,
                AVFormatIDKeyIOS: AVEncodingOption.aac,
            };
            console.log(path, "Record Path")
            console.log('checkIsRecord', isRecording, 2)
            //const result = await
            audioRecorderPlayer.startRecorder(path, audioSet).then(result =>{
                console.log('checkIsRecord', isRecording, 3)
                setRecordStartTime(parseInt(progress.position, 10));

                console.log('checkIsRecord', isRecording, 4)
            }).catch(error =>{
                setIsRecording(false)
                setIsCounting(false)
                console.log(error)
                Toast.show("Error when start record",{ duration: Toast.durations.LONG})
            })


        } catch (e) {
            console.log(e, "Record Error")
            setIsRecording(false)
        }

    }
    const startCountDown = async () => {
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
                    setIsCounting(true)
                } else {
                    console.log('All required permissions not granted');
                    return;
                }
            } catch (err) {
                console.warn(err);
                return;
            }
        }
        else{
          check(PERMISSIONS.IOS.MICROPHONE )
            .then((result) => {
              switch (result) {
                case RESULTS.GRANTED:
                  setIsCounting(true)
                  break;

                default:
                  request(PERMISSIONS.IOS.MICROPHONE).then((result1) => {
                    switch (result1) {
                      case RESULTS.UNAVAILABLE:
                        console.log('This feature is not available (on this device / in this context)');
                        break;
                      case RESULTS.DENIED:
                        console.log('The permission has not been requested / is denied but requestable');
                        break;
                      case RESULTS.LIMITED:
                        console.log('The permission is limited: some actions are possible');
                        break;

                      case RESULTS.BLOCKED:
                        console.log('The permission is denied and not requestable anymore');
                        break;

                    }

                  });
              }
            })
            .catch((error) => {
              // …
            });

        }

    }
    const handleFavorite = () => {
        favoriteBeat(props.route.params.item.key, user.uid).then(result => {
            console.log(result)
        })
        .catch(error => {
            console.log(error)
        })
    }
    useEffect(() => {
        const unsubscribe = favoritesCollection.onSnapshot(snapshot => {
            favoritesCollection.where("target", "==", props.route.params.item.key).where('userid', '==', user.uid).get().then(querySnapshot => {
                if (querySnapshot.size) {
                    setIsFavorited(true)
                }
                else {
                    setIsFavorited(false)
                }
            });
        })

        return () => {
            unsubscribe()
        }
    }, [FIRESTORE])
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
                                        style={{
                                            paddingVertical: Default.fixPadding * 0.5,
                                        }}
                                        onPress={handleFavorite}
                                    >
                                        <Ionicons
                                            name={!isFavorited ? "heart-outline" : "heart"}
                                            size={24}
                                            color={!isFavorited ? Colors.white : Colors.red}
                                            style={{
                                                color: !isFavorited ? Colors.white : Colors.red,
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
                                            downloadBeat()
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

                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
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
                                // onSlidingComplete={isRecording ? stopRecord : () => { }}
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
                                    {/* <Feather name="shuffle" size={20} color={Colors.darkGrey} /> */}

                                    {/* <Ionicons
                                        name="play-skip-back"
                                        size={30}
                                        color={Colors.white}
                                        style={{ marginHorizontal: Default.fixPadding * 2 }}
                                    /> */}

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

                                    {/* <Ionicons
                                        name="play-skip-forward"
                                        size={30}
                                        color={Colors.white}
                                        style={{ marginHorizontal: Default.fixPadding * 2 }}
                                    /> */}
                                    {/* <Feather name="repeat" size={20} color={Colors.darkGrey} /> */}
                                </View>
                            </View>
                        </LinearGradient>
                    </View>
                </ImageBackground>
            </ScrollView>
            <Loader visible={isProcessing} textMessage={loaderText} />
            <ProgressBarLoader visible={isUploading} progress={uploadProgress} />
        </SafeAreaView>
    );
};

export default PlayScreen;
