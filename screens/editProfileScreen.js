import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Animated,
  StatusBar,
  BackHandler,
  Dimensions,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Fonts, Default } from "../constants/style";
import { BottomSheet } from "react-native-btr";
import Toast from "react-native-root-toast";
import * as ImagePicker from "react-native-image-picker";
import { useTranslation } from "react-i18next";
// import { useAuthentication } from '../utils/hooks/useAuthentication';
import { useAppContext } from "../context";
import { getAuth, updateProfile } from "firebase/auth";

const ModalUpdate = ({ visibleUpdate, children }) => {
  const [showModal, setShowModal] = React.useState(visibleUpdate);
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    toggleModal();
  }, [visibleUpdate]);
  const toggleModal = () => {
    if (visibleUpdate) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalUpdate, { transform: [{ scale: scaleValue }] }]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};
const { width } = Dimensions.get("window");

const EditProfileScreen = (props) => {
  const { t, i18n } = useTranslation();
  const {user,setUser} = useAppContext();
  const isRtl = i18n.dir() === "rtl";
  // console.log(user,"user")
  function tr(key) {
    return t(`editProfileScreen:${key}`);
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

  const [visibleUpdate, setVisibleUpdate] = useState(false);

  const [text, onChangeText] = useState("");
  const [textEmail, onChangeTextEmail] = useState("");
  const [textNo, onChangeTextNo] = useState("");
  const [visible, setVisible] = useState(false);
  useEffect(()=>{
    onChangeText(user.displayName);
    onChangeTextEmail(user.email);
    onChangeTextNo(user.phoneNumber);
  },[user])
  const toggleClose = () => {
    setVisible(!visible);
  };
  const UpdateUserProfile = ()=>{
    const auth = getAuth();
    console.log(text, textEmail, textNo)
    updateProfile(auth.currentUser,{
      displayName:text,
      phoneNumber:textNo
    }).then(()=>{
      
      
      setUser({
        ...user,
        displayName:text,
        phoneNumber:textNo
      });
      setVisibleUpdate(true);
      
    })
    
  }
  const toastRemoveImage = () => {
    Toast.show(tr("removeImage"), {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
    setVisible(false);
  };

  const [pickedImage, setPickedImage] = useState();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      toggleClose();
      setPickedImage(result.uri);
    }
  };

  const getPermissionAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  };

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({});
    if (!result.cancelled) {
      setVisible(false);
      setPickedImage(result.uri);
    }
  };

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
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{ marginHorizontal: Default.fixPadding * 1.5 }}
          onPress={() => props.navigation.goBack()}
        >
          <Ionicons
            name={isRtl ? "arrow-forward" : "arrow-back"}
            size={25}
            color={Colors.white}
          />
        </TouchableOpacity>
        <Text style={Fonts.Bold20White}>{tr("editProfile")}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <BottomSheet
          visible={visible}
          onBackButtonPress={toggleClose}
          onBackdropPress={toggleClose}
        >
          <View style={styles.bottomSheetMain}>
            <Text
              style={{
                ...Fonts.Bold18Black,
                marginHorizontal: Default.fixPadding * 2,
                marginVertical: Default.fixPadding,
              }}
            >
              {tr("changeProfile")}
            </Text>
            <TouchableOpacity
              onPress={openCamera}
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                paddingVertical: Default.fixPadding,
                alignItems: "center",
                marginHorizontal: Default.fixPadding * 2,
              }}
            >
              <View style={[Default.shadow, styles.round]}>
                <Ionicons name="camera" size={24} color={Colors.blue} />
              </View>
              <Text
                style={{
                  ...Fonts.Medium16Black,
                  marginHorizontal: Default.fixPadding,
                }}
              >
                {tr("camera")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={pickImage}
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                paddingVertical: Default.fixPadding,
                alignItems: "center",
                marginHorizontal: Default.fixPadding * 2,
              }}
            >
              <View style={[Default.shadow, styles.round]}>
                <Ionicons name="image" size={24} color={Colors.green} />
              </View>
              <Text
                style={{
                  ...Fonts.Medium16Black,
                  marginHorizontal: Default.fixPadding,
                }}
              >
                {tr("gallery")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toastRemoveImage}
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                paddingVertical: Default.fixPadding,
                alignItems: "center",
                marginHorizontal: Default.fixPadding * 2,
              }}
            >
              <View style={[Default.shadow, styles.round]}>
                <Ionicons name="trash" size={24} color={Colors.red} />
              </View>
              <Text
                style={{
                  ...Fonts.Medium16Black,
                  marginHorizontal: Default.fixPadding,
                }}
              >
                {tr("remove")}
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheet>

        {!pickedImage ? (
          <Image
            source={require("../assets/image/profile2.png")}
            style={{
              alignSelf: "center",
              marginVertical: Default.fixPadding * 2,
            }}
          />
        ) : (
          <Image
            style={{
              marginVertical: Default.fixPadding * 2,
              alignSelf: "center",
              height: 120,
              width: 120,
              borderRadius: 60,
            }}
            source={{ uri: pickedImage }}
          />
        )}

        <TouchableOpacity
          onPress={toggleClose}
          style={{
            height: 38,
            width: 38,
            borderRadius: 19,
            backgroundColor: Colors.darkBlue,
            top: "25%",
            left: "55%",
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons style={{ color: Colors.white }} name="camera" size={20} />
        </TouchableOpacity>

        <Text
          style={{
            ...Fonts.Bold16White,
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          {tr("name")}
        </Text>
        <View
          style={{
            ...Default.shadow,
            borderRadius: 10,
            backgroundColor: Colors.lightBlack,
            margin: Default.fixPadding * 1.5,
            padding: Default.fixPadding,
          }}
        >
          <TextInput
            onChangeText={onChangeText}
            selectionColor={Colors.primary}
            value={text}
            style={{
              ...Fonts.Medium15LightGrey,
              textAlign: isRtl ? "right" : "left",
            }}
            placeholder={tr("EnterName")}
            placeholderTextColor={Colors.lightGrey}
          />
        </View>

        <Text
          style={{
            ...Fonts.Bold16White,
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          {tr("email")}
        </Text>
        <View
          style={{
            ...Default.shadow,
            borderRadius: 10,
            backgroundColor: Colors.lightBlack,
            margin: Default.fixPadding * 1.5,
            padding: Default.fixPadding,
          }}
        >
          <TextInput
            onChangeText={onChangeTextEmail}
            selectionColor={Colors.primary}
            value={textEmail}
            keyboardType={"email-address"}
            editable= {false}
            style={{
              ...Fonts.Medium15LightGrey,
              textAlign: isRtl ? "right" : "left",
            }}
            
           
            placeholderTextColor={Colors.lightGrey}
          />
        </View>

        <Text
          style={{
            ...Fonts.Bold16White,
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          {tr("mobile")}
        </Text>
        <View
          style={{
            ...Default.shadow,
            borderRadius: 10,
            backgroundColor: Colors.lightBlack,
            margin: Default.fixPadding * 1.5,
            padding: Default.fixPadding,
          }}
        >
          <TextInput
            onChangeText={onChangeTextNo}
            selectionColor={Colors.primary}
            value={textNo}
            keyboardType={"phone-pad"}
            maxLength={10}
            style={{
              ...Fonts.Medium15LightGrey,
              textAlign: isRtl ? "right" : "left",
            }}
            placeholder={tr("EnterMobile")}
            placeholderTextColor={Colors.lightGrey}
          />
        </View>
      </ScrollView>

      <ModalUpdate visibleUpdate={visibleUpdate}>
        <View
          style={{
            paddingHorizontal: Default.fixPadding * 1.5,
            paddingVertical: Default.fixPadding,
          }}
        >
          <Text
            style={{
              ...Fonts.SemiBold15Black,
              marginVertical: Default.fixPadding,
            }}
          >
            {tr("successfully")}
          </Text>

          <View
            style={{
              justifyContent: "flex-end",
              flexDirection: isRtl ? "row-reverse" : "row",
            }}
          >
            <TouchableOpacity
              onPress={() => {
               setVisible(false);
               props.navigation.navigate("profileScreen");
              }}
            >
              <Text
                style={{
                  ...Fonts.SemiBold15Primary,
                  marginHorizontal: Default.fixPadding,
                }}
              >
                {tr("ok")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalUpdate>

      <TouchableOpacity
        onPress={() =>UpdateUserProfile()}
        style={{
          ...Default.shadow,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.primary,
          marginHorizontal: Default.fixPadding * 1.5,
          marginVertical: Default.fixPadding * 1.5,
          paddingVertical: Default.fixPadding * 1.5,
          borderRadius: 25,
        }}
      >
        <Text style={{ ...Fonts.ExtraBold20White }}>{tr("update")}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalUpdate: {
    backgroundColor: Colors.white,
    paddingHorizontal: Default.fixPadding,
    borderRadius: 10,
    elevation: 20,
    width: width / 1.5,
  },
  bottomSheetMain: {
    backgroundColor: Colors.white,
    paddingVertical: Default.fixPadding,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  round: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
});
