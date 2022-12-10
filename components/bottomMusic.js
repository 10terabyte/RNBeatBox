import { Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Fonts, Default } from "../constants/style";
// import { Audio } from "expo-av";
import { useAppContext } from "../context";
import { useNavigation } from '@react-navigation/native';
import { useOnTogglePlayback, useCurrentTrack } from '../hooks';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import TrackPlayer, { State, usePlaybackState, useProgress } from 'react-native-track-player';
const BottomMusic = (props) => {
    const { music } = useAppContext();
    const [isVisible, setVisible] = useState(false);
    const navigation = useNavigation();
    // const sound = React.useRef(new Audio.Sound());
    const [Status, SetStatus] = React.useState(false);
    const onTogglePlayback = useOnTogglePlayback();
    const progress = useProgress();
    const state = usePlaybackState();
    const isPlaying = state === State.Playing;
    const isLoading = useDebouncedValue(
        state === State.Connecting || state === State.Buffering,
        250
    );
    const currentTrack = useCurrentTrack();
    
    return (

        currentTrack?.url ? <TouchableOpacity
            onPress={() => {
                currentTrack ? navigation.navigate("playScreen") : ""
            }}
            style={{
                paddingVertical: Default.fixPadding,
                backgroundColor: Colors.primary,
                flexDirection: "row",
            }}
        >

            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    marginHorizontal: Default.fixPadding,
                }}
            >
                <Image
                    source={{ uri: currentTrack?.artwork }}
                    style={{ alignSelf: "center", width: 50, height: 50 }}
                />
                <View
                    style={{
                        marginHorizontal: Default.fixPadding,
                        justifyContent: "center",
                    }}
                >
                    <Text style={{ ...Fonts.Bold16White }}> {currentTrack?.title}</Text>
                    <Text style={{ ...Fonts.SemiBold14White }}> {currentTrack?.artist}</Text>
                </View>
            </View>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                }}
            >
                <TouchableOpacity
                    style={{ marginHorizontal: Default.fixPadding * 0.5 }}
                    onPress={() => setVisible((preState) => !preState)}
                >
                    <Ionicons
                        name={isVisible ? "heart-outline" : "heart"}
                        size={20}
                        color={Colors.white}
                    />
                </TouchableOpacity>
                <View style={{ marginHorizontal: Default.fixPadding * 0.5 }}>
                    <Ionicons name="play-skip-back" size={24} color={Colors.white} />
                </View>
                <TouchableOpacity
                    onPress={onTogglePlayback}
                    style={{ marginHorizontal: Default.fixPadding * 0.5 }}
                >
                    <Ionicons
                        name={isPlaying === false ? "play-circle" : "pause-circle"}
                        size={28}
                        color={Colors.white}
                    />
                </TouchableOpacity>
                <View style={{ marginHorizontal: Default.fixPadding * 0.5 }}>
                    <Ionicons name="play-skip-forward" size={24} color={Colors.white} />
                </View>
            </View>
        </TouchableOpacity>
            : <View></View>
    );
};

export default BottomMusic;
