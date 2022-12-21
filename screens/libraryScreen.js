import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,

  Dimensions,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import BottomMusic from "../components/bottomMusic";
import functions from '@react-native-firebase/functions';
import { useAppContext } from "../context";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { playBeat } from '../controllers/beat'
import Loader from "../components/loader";
const FIRESTORE = firestore()

const LibraryScreen = (props) => {
  const favoritesCollection = FIRESTORE.collection('beatFavorites')
  const followsCollection = FIRESTORE.collection('follows')
  const recordsCollection = FIRESTORE.collection('records')
  const beatCollection = FIRESTORE.collection('beats')

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";
  const { user } = useAppContext();
  function tr(key) {
    return t(`libraryScreen:${key}`);
  }
  const [isLoading, setIsLoading] = useState(false);

  async function loadSoundAndPlay(musicItem) {
    console.log("Play Beat-----------", musicItem)
    setIsLoading(true)
    console.log("Play Beat-----------")
    playBeat(musicItem, user.uid).then(result => {
      console.log('--------------------------------------------')
      props.navigation.navigate("playScreen", { item: musicItem });
      setIsLoading(false)
    }).catch(error => {
      setIsLoading(false)
    })
  }

  useEffect(() => {

    const unsubscribe = recordsCollection.onSnapshot(async (snapshot) => {
      try{
        const qSnapshot = await recordsCollection.where('userid', '==', user.uid).get()
        console.log('Step 1 => getRecord List')
        let beatList = qSnapshot.docs.map(doc => { return { ...doc.data(), key: doc.id } })
        let recordList = []
        for (var i = 0; i < qSnapshot.size; i++) {

          // console.log(qSnapshot.docs.at(i))
          const beatID = beatList[i].beatid
          console.log('Step 2 => getRecord List')
          const beatData = await beatCollection.doc(beatID).get()
          console.log('Step 3 => getRecord List')
          const recordedFileName = `/recorded/${user.uid}/${beatID}/${beatList[i].filename}`
          console.log('Step 3-1 => getRecord List', recordedFileName)
          const storageRef = storage().ref().child(recordedFileName)
          console.log('Step 4 => getRecord List')
          const downloadURL = await storageRef.getDownloadURL()
          console.log('Step 5 => getRecord List', downloadURL)
          recordList.push({
            ...beatList[i], ...beatData.data(),
            recordUrl: downloadURL
          })

        }
        console.log('Step 11 => getRecord List')
        setMyRecords(recordList)
      }
      catch(error){
        console.log('Step 12 => Error in get record list', error)
      }
      // .then(async (qSnapshot) => {
        

      // })
    })

    return () => {
      unsubscribe()
    }
  }, [FIRESTORE])
  useEffect(() => {

    const unsubscribe = followsCollection.onSnapshot(snapshot => {
      followsCollection.where('follower', '==', user.uid).get().then(qSnapshot => {
        let artistList = []
        qSnapshot.forEach(result => {
          const artistID = result.data().target
          artistList.push(artistID)
        })
        const refArr = artistList.map(id => FIRESTORE.collection("artists").doc(id));
        FIRESTORE.collection('artists').where(firestore.FieldPath.documentId(), "in", refArr).get().then(rSnapshot => {
          let artData = [];
          rSnapshot.forEach(result => {
            console.log("ARTIST", result.data().follows)
            artData.push({ ...result.data(), key: result.id })
          })
          setFollwsList(artData)
        }).catch(error => {

        })
      })
    })

    return () => {
      unsubscribe()
    }
  }, [FIRESTORE])
  useEffect(() => {

    const unsubscribe = favoritesCollection.onSnapshot(snapshot => {
      functions()
        .httpsCallable(`getFavoriteBeats?userid=${user.uid}`)()
        .then(response => {
          setMyFavorites(response.data)
        });
    })

    return () => {
      unsubscribe()
    }
  }, [FIRESTORE])
  const [myFavorites, setMyFavorites] = useState([])
  const [followList, setFollwsList] = useState([])
  const [recordList, setMyRecords] = useState([])
  const renderItemArtists = ({ item, index }) => {
    const isFirst = index === 0;
    // console.log(item.ImageURL,"name")
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate("artistScreen", { item })}
        style={{
          marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
          marginRight: Default.fixPadding * 1.5,
        }}
      >
        <Image style={{ height: 80, width: 80, borderRadius: 80 }} source={{ uri: item.ImageURL }} />
        <View
          style={{ width: 80 }}
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
  const renderBeatItem = ({ item, index }) => {
    const isFirst = index === 0;
    return (
      <TouchableOpacity
        onPress={() => loadSoundAndPlay(item)}
        style={{
          marginLeft: isFirst ? Default.fixPadding : 0,
          marginRight: Default.fixPadding,
          marginBottom: Default.fixPadding * 2,
        }}
      >
        <View
          style={{
            width: Dimensions.get("window").width / 4,
            // height: Dimensions.get("window").width / 4
          }}
        >
          <Image source={{ uri: item.track_thumbnail }} style={{
            width: Dimensions.get("window").width / 4 - Default.fixPadding,
            height: Dimensions.get("window").width / 4
          }} />
          <Text
            style={{
              ...Fonts.SemiBold14White,
              marginTop: Default.fixPadding * 0.3,
              textAlign: "center",
            }}
          >
            {item.track_name}
          </Text>

        </View>

      </TouchableOpacity>
    );
  };
  const loadRecordAndPlay = ({ item, index }) => {
    props.navigation.navigate("playSongScreen")
  }
  const renderRecordItem = ({ item, index }) => {
    const isFirst = index === 0;
    return (
      <TouchableOpacity
        onPress={() => loadRecordAndPlay(item)}
        style={{
          marginLeft: isFirst ? Default.fixPadding : 0,
          marginRight: Default.fixPadding,
          marginBottom: Default.fixPadding * 2,
        }}
      >
        <View
          style={{
            width: Dimensions.get("window").width / 4,
            // height: Dimensions.get("window").width / 4
          }}
        >
          <Image source={{ uri: item.track_thumbnail }} style={{
            width: Dimensions.get("window").width / 4 - Default.fixPadding,
            height: Dimensions.get("window").width / 4
          }} />
          <Text
            style={{
              ...Fonts.SemiBold14White,
              marginTop: Default.fixPadding * 0.3,
              textAlign: "center",
            }}
          >
            {item.track_name}
          </Text>

        </View>

      </TouchableOpacity>
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
          alignItems: "center",
        }}
      >
        <Text style={Fonts.Bold20White}>{tr("library")}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            ...Fonts.Bold20White,
            marginHorizontal: Default.fixPadding * 1.5,
            marginVertical: Default.fixPadding,
          }}
        >
          Favourite Beat
        </Text>

        <FlatList
          horizontal
          nestedScrollEnabled
          data={myFavorites}
          renderItem={renderBeatItem}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
        />

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            justifyContent: "space-between",
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding,
            marginTop: Default.fixPadding * 1.5,
          }}
        >
          <Text style={{ ...Fonts.Bold18White }}>{tr("myFollowers")}</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("libraryArtistScreen")}
          >
            <Text style={{ ...Fonts.Bold14Primary }}>{tr("seeAll")}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          nestedScrollEnabled
          data={followList}
          renderItem={renderItemArtists}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
        />

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            justifyContent: "space-between",
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding,
            marginTop: Default.fixPadding * 1.5,
          }}
        >
          <Text style={{ ...Fonts.Bold18White }}>{tr("myRecords")}</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("myRecordScreen")}
          >
            <Text style={{ ...Fonts.Bold14Primary }}>{tr("seeAll")}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          nestedScrollEnabled
          data={recordList}
          renderItem={renderRecordItem}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>

      <Loader visible={isLoading} />
      <BottomMusic onSelect={() => props.navigation.navigate("playScreen")} />

    </SafeAreaView>
  );
};

export default LibraryScreen;
