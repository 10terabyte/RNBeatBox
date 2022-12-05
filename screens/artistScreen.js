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
import { useTranslation } from "react-i18next";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Default, Fonts } from "../constants/style";
import BottomMusic from "../components/bottomMusic";
import MainBottomSheet from "../components/mainBottomSheet";
import AddToPlayList from "../components/addToPlayList";
import NewPlayList from "../components/newPlayList";
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { getDatabase, ref, onValue, update, query as d_query, get, child, equalTo, where as db_where, orderByChild, limitToFirst } from "firebase/database";
import { collection, doc, addDoc, getFirestore, setDoc, query, getDocs, where, getCountFromServer, limit } from "firebase/firestore";
const DB = getDatabase();

const { width } = Dimensions.get("window");

const ArtistScreen = (props) => {
  const { user } = useAuthentication();
  const [followers, setFollowers] = useState("");
  const { t, i18n } = useTranslation();
  const [beatList, setBeatList] = useState([]);
  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`artistScreen:${key}`);
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
    console.log(props.route.params.item.key, "artist")
    const beatCollection = d_query(ref(DB, "beats"), orderByChild("track_artist"), equalTo(props.route.params.item.key));
    console.log(beatCollection, "beatCollection")
    onValue(beatCollection, (snapshot) => {
      let data = snapshot.val();
      let _beatData = [];
      if (snapshot.val() == null) {
        setBeatList([]);
        return;
      }
      Object.keys(data).map(beatKey => {
        _beatData.push({
          ...data[beatKey],
          key: beatKey
        })
      });
      setBeatList(_beatData);
    })
  }, [props.route.params.item.key])

  const [visible, setVisible] = useState(false);

  const toggleClose = () => {
    setVisible(!visible);
  };
  const [selectedBeat, setSelectedBeat] = useState();

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
  useEffect(() => {
    const getFollowers = async () => {

      const StoreDB = getFirestore();
      const q = query(collection(StoreDB, "follows"), where("target", "==", props.route.params.item.key))
      const followNum = await getCountFromServer(q);
      // console.log(followNum, "follownum")
      setFollowers(followNum.data().count)
    }
    getFollowers();
  }, [props.route.params.item.key])
  // const albumsData = [
  //   {
  //     key: "1",
  //     name: "Loveyatri",
  //     image: require("../assets/image/m1.png"),
  //   },
  //   {
  //     key: "2",
  //     name: "Teraa Surroor",
  //     image: require("../assets/image/m2.png"),
  //   },
  //   {
  //     key: "3",
  //     name: "Made in china",
  //     image: require("../assets/image/m3.png"),
  //   },
  //   {
  //     key: "4",
  //     name: "Pream ratn dhan..",
  //     image: require("../assets/image/m4.png"),
  //   },
  //   {
  //     key: "5",
  //     name: "Odhani",
  //     image: require("../assets/image/m5.png"),
  //   },
  //   {
  //     key: "6",
  //     name: "Tu Mileya",
  //     image: require("../assets/image/m6.png"),
  //   },
  // ];
  const handleFollow = async () => {
    const StoreDB = getFirestore();
    const q = query(collection(StoreDB, "follows"), where("follower", "==", user.uid), where("target", "==", props.route.params.item.key), where("target_item", "==", "artist"))
    const querySnapshot = await getDocs(q);
    let data = [];
    if(querySnapshot)
    querySnapshot.forEach(doc => {
      // console.log(doc.id, "=>", doc.data())
      data.push(doc);

    })
    if (data.length > 0) {
      ToastAndroid.show("You are following now", ToastAndroid.SHORT)
      return;
    }
    addDoc(collection(StoreDB, "follows"), {
      target: props.route.params.item.key,
      target_item: "artist",
      follower: user.uid
    });
    update(ref(DB), {
      [`/artists/${props.route.params.item.key}/follows`]: followers * 1 + 1
    })
    // console.log("add")
    // const followCollection = query(ref(DB, "follows"), equalTo("artist", "target"), equalTo(props.route.params.item.key, "target_key"), equalTo(user.uid, "user"))
  }
  const renderItemAlbums = ({ item, index }) => {
    const isFirst = index === 0;

    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate("partySongScreen")}
        style={{
          marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
          marginRight: Default.fixPadding * 1.5,
          marginBottom: Default.fixPadding * 1.5,
        }}
      >
        <Image source={item.image} />
        <View
          style={{
            justifyContent: "center",
            marginHorizontal: Default.fixPadding * 0.5,
          }}
        >
          <Text
            style={{
              ...Fonts.SemiBold14White,
              marginTop: Default.fixPadding * 0.5,
              textAlign: "center",
            }}
          >
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const artistData = [];
  const renderItemArtist = ({ item, index }) => {
    const isFirst = index === 0;

    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate("similarArtistScreen")}
        style={{
          marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
          marginRight: Default.fixPadding * 1.5,
          marginBottom: Default.fixPadding * 1.5,
        }}
      >
        <Image source={item.image} />
        <View
          style={{
            justifyContent: "center",
            marginHorizontal: Default.fixPadding * 0.5,
          }}
        >
          <Text
            style={{
              ...Fonts.SemiBold14White,
              marginTop: Default.fixPadding * 0.5,
              textAlign: "center",
            }}
          >
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.darkBlue }}>
      <StatusBar
        backgroundColor={Colors.boldBlack}
        barStyle={Platform.OS === "android" ? "light-content" : "default"}
      />
      <View
        style={{
          paddingVertical: Default.fixPadding,
          backgroundColor: Colors.darkBlue,
        }}
      >
        <TouchableOpacity
          style={{
            marginHorizontal: Default.fixPadding * 1.5,
            alignItems: isRtl ? "flex-end" : "flex-start",
          }}
          onPress={() => props.navigation.goBack()}
        >
          <Ionicons
            name={isRtl ? "arrow-forward" : "arrow-back"}
            size={25}
            color={Colors.white}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginVertical: Default.fixPadding * 1.5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={{ uri: props.route.params.item.ImageURL }} style={{ width: "100%", height: 150 }} />
      </View>
      <View
        style={{
          ...Default.shadow,
          backgroundColor: Colors.lightBlack,
          justifyContent: "center",
          flexDirection: isRtl ? "row-reverse" : "row",
          paddingVertical: Default.fixPadding,
          marginBottom: Default.fixPadding * 1.5,
        }}
      >
        <View
          style={{
            flex: 7,
            marginHorizontal: Default.fixPadding * 1.5,
            alignItems: isRtl ? "flex-end" : "flex-start",
          }}
        >
          <Text style={{ ...Fonts.Bold18White }}>{props.route.params.item.name}</Text>
          <Text
            style={{
              ...Fonts.Medium14White,
              marginVertical: Default.fixPadding * 0.5,
            }}
          >
            {followers ?? 0}  &nbsp;
            {tr("followers")}
          </Text>
          <TouchableOpacity
            onPress={() => {
              handleFollow();
            }}>


            <View
              style={{
                ...Default.shadow,
                backgroundColor: Colors.extraBlack,
                borderRadius: 5,
                borderWidth: 1.5,
                borderColor: Colors.white,
                justifyContent: "center",
                alignItems: "center",
                width: width / 4.5,
                marginVertical: Default.fixPadding * 0.5,
              }}

            >
              <Text
                style={{
                  ...Fonts.Bold14White,
                  padding: Default.fixPadding * 0.5,
                }}
              >
                {tr("follow")}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 3,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          <View
            style={{
              ...Default.shadowPrimary,
              backgroundColor: Colors.primary,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.Bold16White,
                paddingHorizontal: Default.fixPadding * 1.5,
                paddingVertical: Default.fixPadding * 0.5,
              }}
            >
              {tr("playAll")}
            </Text>
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>


        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            justifyContent: "space-between",
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding * 1.5,
          }}
        >
          <Text style={{ ...Fonts.Bold18White }}>{"Beat list"}</Text>
          {/* <TouchableOpacity
            onPress={() => props.navigation.navigate("playListSeeAllScreen")}
          >
            <Text
              style={{
                ...Fonts.SemiBold14LightGrey,
                marginHorizontal: Default.fixPadding * 1.5,
              }}
            >
              {tr("seeAll")}
            </Text>
          </TouchableOpacity> */}
        </View>
        {beatList.map((item, index) => {
          const isFirst = index === 0;
          return (
            <View
              key={item.key}
              style={{
                marginBottom: Default.fixPadding * 1.5,
                marginHorizontal: Default.fixPadding * 1.5,
                flexDirection: isRtl ? "row-reverse" : "row",
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 9,
                  flexDirection: isRtl ? "row-reverse" : "row",
                }}
                onPress={() => props.navigation.navigate("playScreen", { item:{...item, singer:props.route.params.item.name} })}
              >
                <Image source={{ uri: item.track_thumbnail }} style={{ width: 50, height: 50, borderRadius: 5 }} />
                <View
                  style={{
                    justifyContent: "center",
                    marginHorizontal: Default.fixPadding,
                    alignItems: isRtl ? "flex-end" : "flex-start",
                  }}
                >
                  <Text
                    style={{
                      ...(isFirst
                        ? Fonts.SemiBold16Primary
                        : Fonts.SemiBold16White),
                    }}
                  >
                    {item.track_name}
                  </Text>
                  <Text
                    style={{
                      ...Fonts.SemiBold14Grey,
                    }}
                  >
                    {props.route.params.item.name}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {setVisible(true); setSelectedBeat(item); }}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="ellipsis-vertical"
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
            toggleCloseAddPlayList();
            setNewPlayList(true);
          }}
          isClose={toggleCloseAddPlayList}
          beat = {selectedBeat}
        />
        <NewPlayList
          visible={newPlayList}
          onBackButtonPress={toggleCloseNewPlayList}
          onBackdropPress={toggleCloseNewPlayList}
          cancel={toggleCloseNewPlayList}
          beat = {selectedBeat}
        />

        {/* <Text
          style={{
            ...Fonts.Bold18White,
            marginBottom: Default.fixPadding * 1.5,
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          {tr("topAlbums")}
        </Text>
        <FlatList
          horizontal
          scrollEnabled
          data={albumsData}
          renderItem={renderItemAlbums}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
        /> */}

        {/* <Text
          style={{
            ...Fonts.Bold18White,
            marginBottom: Default.fixPadding * 1.5,
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          {tr("similar")}
        </Text>
        <FlatList
          horizontal
          scrollEnabled
          data={artistData}
          renderItem={renderItemArtist}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
        /> */}
      </ScrollView>
      <BottomMusic onSelect={() => props.navigation.navigate("playScreen")} />
    </SafeAreaView>
  );
};

export default ArtistScreen;
