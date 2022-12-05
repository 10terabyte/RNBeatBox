import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import BottomMusic from "../components/bottomMusic";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { BottomSheet } from "react-native-btr";
import { getAuth, signOut } from "firebase/auth";
import { useAppContext } from "../context";
const auth = getAuth();

const ProfileScreen = (props) => {
  const {user}= useAppContext();
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`profileScreen:${key}`);
  }
  const [visible, setVisible] = useState(false);

  const toggleClose = () => {
    setVisible(!visible);
  };
  let userAvatar = user.photoURL == null || user.photoURL == '' ? `https://ui-avatars.com/api/?name=${user.displayName}` : user.photoURL;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.boldBlack }}>
      <StatusBar
        backgroundColor={Colors.boldBlack}
        barStyle={Platform.OS === "android" ? "light-content" : "default"}
      />
      <View
        style={{
          paddingVertical: Default.fixPadding,
          backgroundColor: Colors.boldBlack,
          alignItems: "center",
        }}
      >
        <Text style={Fonts.Bold20White}>{tr("profile")}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginHorizontal: Default.fixPadding * 1.5,
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
            marginVertical: Default.fixPadding * 2,
          }}
        >
 
          <Image style={{ width: 50, height: 50, borderRadius: 50 }} source={{
            uri:userAvatar}} />
          <View style={{ marginHorizontal: Default.fixPadding * 1.5 }}>
            <Text style={{ ...Fonts.Bold16White }}>{user.displayName}</Text>
            <Text
              style={{
                ...Fonts.Bold12ExtraWhite,
                marginTop: user.phoneNumber ? Default.fixPadding * 0.5 : 0,
                textAlign: isRtl ? "right" : "left",
              }}
            >
              {user.phoneNumber ?? ''}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("editProfileScreen")}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            marginTop: Default.fixPadding * 1.5,
            marginHorizontal: Default.fixPadding * 1.5,
            borderBottomColor: Colors.lightBlack,
            borderBottomWidth: 1,
            paddingBottom: Default.fixPadding * 2,
          }}
        >
          <View
            style={{ flex: 9, flexDirection: isRtl ? "row-reverse" : "row" }}
          >
            <Feather name="user" size={22} color={Colors.white} />
            <Text
              style={{
                ...Fonts.SemiBold16White,
                marginHorizontal: Default.fixPadding,
              }}
            >
              {tr("editProfile")}
            </Text>
          </View>

          <Ionicons
            name={isRtl ? "chevron-back" : "chevron-forward-outline"}
            size={20}
            color={Colors.white}
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("premiumScreen")}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            marginHorizontal: Default.fixPadding * 1.5,
            borderBottomColor: Colors.lightBlack,
            borderBottomWidth: 1,
            paddingVertical: Default.fixPadding * 2,
          }}
        >
          <View
            style={{ flex: 9, flexDirection: isRtl ? "row-reverse" : "row" }}
          >
            <Ionicons
              name="musical-notes-outline"
              size={22}
              color={Colors.white}
            />
            <Text
              style={{
                ...Fonts.SemiBold16White,
                marginHorizontal: Default.fixPadding,
              }}
            >
              {tr("premium")}
            </Text>
          </View>

          <Ionicons
            name={isRtl ? "chevron-back" : "chevron-forward-outline"}
            size={20}
            color={Colors.white}
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("languageScreen")}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            marginHorizontal: Default.fixPadding * 1.5,
            borderBottomColor: Colors.lightBlack,
            borderBottomWidth: 1,
            paddingVertical: Default.fixPadding * 2,
          }}
        >
          <View
            style={{ flex: 9, flexDirection: isRtl ? "row-reverse" : "row" }}
          >
            <Ionicons name="globe-outline" size={22} color={Colors.white} />
            <Text
              style={{
                ...Fonts.SemiBold16White,
                marginHorizontal: Default.fixPadding,
              }}
            >
              {tr("language")}
            </Text>
          </View>

          <Ionicons
            name={isRtl ? "chevron-back" : "chevron-forward-outline"}
            size={20}
            color={Colors.white}
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("appSettingScreen")}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            marginHorizontal: Default.fixPadding * 1.5,
            borderBottomColor: Colors.lightBlack,
            borderBottomWidth: 1,
            paddingVertical: Default.fixPadding * 2,
          }}
        >
          <View
            style={{ flex: 9, flexDirection: isRtl ? "row-reverse" : "row" }}
          >
            <Ionicons name="settings-outline" size={22} color={Colors.white} />
            <Text
              style={{
                ...Fonts.SemiBold16White,
                marginHorizontal: Default.fixPadding,
              }}
            >
              {tr("appSettings")}
            </Text>
          </View>

          <Ionicons
            name={isRtl ? "chevron-back" : "chevron-forward-outline"}
            size={20}
            color={Colors.white}
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("aboutUsScreen")}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            marginHorizontal: Default.fixPadding * 1.5,
            borderBottomColor: Colors.lightBlack,
            borderBottomWidth: 1,
            paddingVertical: Default.fixPadding * 2,
          }}
        >
          <View
            style={{ flex: 9, flexDirection: isRtl ? "row-reverse" : "row" }}
          >
            <MaterialCommunityIcons
              name="shield-alert-outline"
              size={22}
              color={Colors.white}
            />
            <Text
              style={{
                ...Fonts.SemiBold16White,
                marginHorizontal: Default.fixPadding,
              }}
            >
              {tr("aboutUs")}
            </Text>
          </View>

          <Ionicons
            name={isRtl ? "chevron-back" : "chevron-forward-outline"}
            size={20}
            color={Colors.white}
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("helpAndSupportScreen")}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            marginHorizontal: Default.fixPadding * 1.5,
            borderBottomColor: Colors.lightBlack,
            borderBottomWidth: 1,
            paddingVertical: Default.fixPadding * 2,
          }}
        >
          <View
            style={{ flex: 9, flexDirection: isRtl ? "row-reverse" : "row" }}
          >
            <Ionicons
              name="help-circle-outline"
              size={22}
              color={Colors.white}
            />
            <Text
              style={{
                ...Fonts.SemiBold16White,
                marginHorizontal: Default.fixPadding,
              }}
            >
              {tr("helpSupport")}
            </Text>
          </View>

          <Ionicons
            name={isRtl ? "chevron-back" : "chevron-forward-outline"}
            size={20}
            color={Colors.white}
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            marginBottom: Default.fixPadding * 1.5,
            marginHorizontal: Default.fixPadding * 1.5,
            paddingVertical: Default.fixPadding * 2,
          }}
        >
          <Ionicons name="log-out-outline" size={22} color={Colors.lightRed} />
          <Text
            style={{
              ...Fonts.SemiBold16LightRed,
              marginHorizontal: Default.fixPadding,
            }}
          >
            {tr("logout")}
          </Text>
        </TouchableOpacity>

        <BottomSheet
          visible={visible}
          onBackButtonPress={toggleClose}
          onBackdropPress={toggleClose}
        >
          <View
            style={{
              ...Default.shadow,
              backgroundColor: Colors.white,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          >
            <Text
              style={{
                ...Fonts.Bold20Black,
                textAlign: "center",
                marginVertical: Default.fixPadding,
              }}
            >
              {tr("logout")}
            </Text>
            <Text
              style={{
                ...Fonts.SemiBold16Black,
                textAlign: "center",
                marginBottom: Default.fixPadding * 1.5,
              }}
            >
              {tr("areYouSure")}
            </Text>
            <View
              style={{
                ...Default.shadow,
                backgroundColor: Colors.white,
                flexDirection: isRtl ? "row-reverse" : "row",
              }}
            >
              <TouchableOpacity
                onPress={() => setVisible(false)}
                style={{
                  flex: 1,
                  padding: Default.fixPadding,
                }}
              >
                <Text
                  style={{
                    ...Fonts.Bold18Black,
                    textAlign: "center",
                  }}
                >
                  {tr("cancel")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // setVisible(false);
                  // props.navigation.navigate("signInScreen");
                  signOut(auth);
                }}
                style={{
                  backgroundColor: Colors.primary,
                  flex: 1,
                  padding: Default.fixPadding,
                }}
              >
                <Text
                  style={{
                    ...Fonts.Bold18White,
                    textAlign: "center",
                  }}
                >
                  {tr("logout")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheet>
      </ScrollView>
      <BottomMusic onSelect={() => props.navigation.navigate("playScreen")} />
    </SafeAreaView>
  );
};

export default ProfileScreen;
