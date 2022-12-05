import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import { BottomSheet } from "react-native-btr";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { getDatabase, ref, query, push, update, onValue, equalTo, get } from "firebase/database";
const DB = getDatabase();
const NewPlayList = (props) => {
  const { t, i18n } = useTranslation();
  const {user} = useAuthentication();
  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`newPlayList:${key}`);
  }
  const [title, onChangeTitle] = useState();
  const [description, onChangeDescription] = useState();
  const handleCreate = ()=>{
    let newkey = push(ref(DB,"playlists")).key;
    update(ref(DB, "playlists/"+newkey),{
      name:title,
      description:description,
      user:user.uid,
      amount:1,
      image:props.beat.track_thumbnail,
    })
    props.cancel();
  }
  return (
    <BottomSheet
      visible={props.visible}
      onBackButtonPress={props.onBackButtonPress}
      onBackdropPress={props.onBackdropPress}
    >
      <View style={styles.bottomSheetMain}>
        <Text
          style={{
            ...Fonts.Bold12Black,
            textAlign: "center",
            marginVertical: Default.fixPadding,
          }}
        >
          {tr("newPlaylist")}
        </Text>

        <Text
          style={{
            ...Fonts.SemiBold14Black,
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          {tr("title")}
        </Text>
        <TextInput
          style={{
            ...Default.shadow,
            ...Fonts.SemiBold14Black,
            padding: Default.fixPadding,
            backgroundColor: Colors.white,
            marginHorizontal: Default.fixPadding * 1.5,
            marginVertical: Default.fixPadding,
            borderRadius: 10,
            textAlign: isRtl ? "right" : "left",
          }}
          placeholder={tr("title")}
          placeholderTextColor={Colors.lightGrey}
          onChangeText={onChangeTitle}
          value={title}
          selectionColor={Colors.primary}
        />

        <Text
          style={{
            ...Fonts.SemiBold14Black,
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          {tr("description")}
        </Text>
        <TextInput
          style={{
            ...Default.shadow,
            ...Fonts.SemiBold14Black,
            padding: Default.fixPadding,
            backgroundColor: Colors.white,
            marginHorizontal: Default.fixPadding * 1.5,
            marginVertical: Default.fixPadding,
            borderRadius: 10,
            textAlign: isRtl ? "right" : "left",
          }}
          placeholder={tr("description")}
          placeholderTextColor={Colors.lightGrey}
          onChangeText={onChangeDescription}
          value={description}
          selectionColor={Colors.primary}
        />

        <View
          style={{
            ...Default.shadow,
            flexDirection: isRtl ? "row-reverse" : "row",
            marginTop: Default.fixPadding,
            backgroundColor: Colors.white,
          }}
        >
          <TouchableOpacity
            onPress={props.cancel}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: Default.fixPadding * 1.5,
            }}
          >
            <Text style={{ ...Fonts.Bold18Black }}>{tr("cancel")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>{
              handleCreate()
              
            }}
            style={{
              flex: 1,
              backgroundColor: Colors.primary,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: Default.fixPadding * 1.5,
            }}
          >
            <Text style={{ ...Fonts.Bold18White }}>{tr("create")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

export default NewPlayList;

const styles = StyleSheet.create({
  bottomSheetMain: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
