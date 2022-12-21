import {
  Text,
  View,
  SafeAreaView,
  BackHandler,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import { SwipeListView } from "react-native-swipe-list-view";
import { useAppContext } from "../context";
import firestore from "@react-native-firebase/firestore";
const LibraryArtistScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`libraryArtistScreen:${key}`);
  }
  const { user } = useAppContext();
  const backAction = () => {
    props.navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);


  const [follows, setFollows] = useState([])
  const getFollows = () =>{
    firestore().collection('follows').where("follower" , '==', user.uid).get().then(snapShot =>{
      let targetArray = []
      let follows = []
      snapShot.forEach(result =>{ targetArray.push(result.data().target)})
      console.log(targetArray, "Target Array")
      firestore().collection('artists').get().then(result =>{
        result.forEach(artResultt =>{
          if(targetArray.includes(artResultt.id)){
            follows.push({...artResultt.data(), key: artResultt.id})
          } 
        })
        setFollows(follows)
      })
    })
  }
  useEffect(()=>{
    getFollows()
  }, [user])

 

  const deleteRow = (rowMap, rowKey) => {
    const newData = [...follows];
    const prevIndex = follows.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setFollows(newData);
  };

  const renderItem = (data, rowMap) => {
    console.log(data)
    return (
      <View
        style={{
          backgroundColor: Colors.darkBlue,
          borderBottomColor: Colors.lightBlack,
          borderBottomWidth: 1,
          paddingHorizontal: Default.fixPadding * 1.5,
          paddingVertical: Default.fixPadding * 2,
        }}
      >
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
          }}
        >
          <View
            style={{
              flex: 8,
              flexDirection: isRtl ? "row-reverse" : "row",
            }}
          >
            <Image source={{uri: data.item.ImageURL}} style = {{width: 50, height: 50}}  />
            <View
              style={{
                marginHorizontal: Default.fixPadding,
                justifyContent: "center",
              }}
            >
              <Text style={{ ...Fonts.SemiBold16White }}>
                {data.item.name}
              </Text>
              <Text style={{ ...Fonts.SemiBold14LightGrey }}>
                {data.item.description}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              firestore().collection('follows').where('follower', '==', user.uid).where('target', '==', data.item.key).get().then(snapShot =>{
                snapShot.forEach(dSnap =>{
                  dSnap.ref.delete()
                })
              })
              deleteRow(rowMap, data.item.key);
            }}
            style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ ...Fonts.SemiBold14LightGrey }}>
              {tr("unfollow")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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
        <Text style={Fonts.Bold20White}>{tr("artist")}</Text>
      </View>

      {follows.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Feather name="user-check" color={Colors.lightGrey} size={40} />
          <Text
            style={{
              ...Fonts.Bold14LightGrey,
              marginVertical: Default.fixPadding * 1.5,
            }}
          >
            {tr("noFavorite")}
          </Text>
        </View>
      ) : (
        <SwipeListView
          data={follows}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default LibraryArtistScreen;
