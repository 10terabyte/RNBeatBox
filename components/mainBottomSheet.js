import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import { BottomSheet } from "react-native-btr";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const MainBottomSheet = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`mainBottomSheet:${key}`);
  }

  return (
    <BottomSheet
      visible={props.visible}
      onBackButtonPress={props.onBackButtonPress}
      onBackdropPress={props.onBackdropPress}
    >
      <View style={styles.bottomSheetMain}>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={props.onDownload}
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              paddingVertical: Default.fixPadding * 2,
              paddingHorizontal: Default.fixPadding * 2,
            }}
          >
            <Feather name="download" size={20} color={Colors.black} />
            <Text
              style={{
                ...Fonts.SemiBold15Black,
                marginHorizontal: Default.fixPadding,
              }}
            >
              {tr("download")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={props.close}
            style={{
              margin: Default.fixPadding * 0.5,
            }}
          >
            <Ionicons name="close" size={24} color={Colors.lightGrey} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={props.shareMessage}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            paddingBottom: Default.fixPadding * 2,
            paddingHorizontal: Default.fixPadding * 2,
          }}
        >
          <Feather name="share-2" size={20} color={Colors.black} />
          <Text
            style={{
              ...Fonts.SemiBold15Black,
              marginHorizontal: Default.fixPadding,
            }}
          >
            {tr("share")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={props.onPlaylist}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            paddingBottom: Default.fixPadding * 2,
            paddingHorizontal: Default.fixPadding * 2,
          }}
        >
          <Ionicons name="add-circle-outline" size={22} color={Colors.black} />
          <Text
            style={{
              ...Fonts.SemiBold15Black,
              marginHorizontal: Default.fixPadding,
            }}
          >
            {tr("playlist")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={props.onLyrics}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            paddingBottom: Default.fixPadding * 2,
            paddingHorizontal: Default.fixPadding * 2,
          }}
        >
          <MaterialIcons name="queue-music" size={20} color={Colors.black} />
          <Text
            style={{
              ...Fonts.SemiBold15Black,
              marginHorizontal: Default.fixPadding,
            }}
          >
            {tr("lyrics")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={props.onInformation}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            paddingBottom: Default.fixPadding * 2,
            paddingHorizontal: Default.fixPadding * 2,
          }}
        >
          <Ionicons name="list" size={20} color={Colors.black} />
          <Text
            style={{
              ...Fonts.SemiBold15Black,
              marginHorizontal: Default.fixPadding,
            }}
          >
            {tr("information")}
          </Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};


export default MainBottomSheet;

const styles = StyleSheet.create({
  bottomSheetMain: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
