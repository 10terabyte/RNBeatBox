import {
    Text,
    TextInput,
    View,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Image,
    Share,
} from "react-native";
import React, { useState,useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import Ionicons from "react-native-vector-icons/Ionicons";
import BottomMusic from "../components/bottomMusic";
import MainBottomSheet from "../components/mainBottomSheet";
import AddToPlayList from "../components/addToPlayList";
import firestore from '@react-native-firebase/firestore';
import NewPlayList from "../components/newPlayList";
const FIRESTORE = firestore()
// import { snapshotEqual } from "firebase/firestore";
const ArtistSearchScreen = (props) => {
    const { t, i18n } = useTranslation();
    const artistCollection = FIRESTORE.collection('artists')
    const isRtl = i18n.dir() === "rtl";
    const [visible, setVisible] = useState(false);
    const [search, setSearch] = useState("");
    const [allList, setAllList] = useState([])
    const [artistList, setArtists] = useState([]);
    useEffect(()=>{
        handleFilter()
    },[props])
    useEffect(() =>{
        
        const unsubscribe = artistCollection.onSnapshot(snpShot =>{
            artistCollection.get().then(snapshot =>{
                let artData = [];
                snapshot.forEach(result =>{
                    artData.push({...result.data(), key: result.id})
                })
                setAllList(artData)
            }) 
        })
        return () =>{
            unsubscribe()
        }
    }, [FIRESTORE])
    useEffect(() =>{
        handleFilter()
    }, [allList])
    const handleFilter = () => {
        let searchResult = []
        allList.forEach(item =>{
            if(item?.name?.toLowerCase().includes(search.toLowerCase()) || item?.description?.toLowerCase().includes(search.toLowerCase())){
                searchResult.push(item)
            }
        })
        setArtists(searchResult)
        // console.log("filter")
        // onValue(ref(DB, "artists"),  (snapshot)=>{
        //     console.log("datadd")
        //     if(snapshot.val()){
                
        //         let data = snapshot.val();
        //         let artists = [];
        //         let promises = [];
        //         let index = 0;
                
        //         Object.keys(data).map(key=>{
                  
        //             if(data[key].name.includes(search)){

        //                 artists.push({...data[key],key});
             
        //         }   
        //         });
        //         console.log(artists,"artists");
               
               
        //         setArtists(artists);
        //         return;
        //     }
        //     setArtists([]);
        // }, {onlyOnce:true})
    }

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

    const renderItemArtist = ({ item, index }) => {
        const isFirst = index === 0;

        return (
            <View
                style={{
                    marginTop: isFirst ? Default.fixPadding * 1.5 : 0,
                    marginBottom: Default.fixPadding * 1.5,
                    marginHorizontal: Default.fixPadding * 1.5,
                    flexDirection: isRtl ? "row-reverse" : "row",
                }}
            >
                <Image source={{uri:item.ImageURL}} style = {{ width:50, height:50}}/>

                <View
                    style={{
                        justifyContent: "center",
                        marginHorizontal: Default.fixPadding,
                        alignItems: isRtl ? "flex-end" : "flex-start",
                        flex: 7.5,
                    }}
                >
                    <Text
                        style={[isFirst ? Fonts.SemiBold16Primary : Fonts.SemiBold16White]}
                    >
                        {item.name}
                    </Text>
                    <Text
                        style={{
                            ...Fonts.SemiBold14Grey,
                        }}
                    >
                        {item.follows}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => {props.navigation.navigate("artistScreen",{item})}}
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Ionicons
                        name="ios-arrow-forward-outline"
                        color={Colors.white}
                        size={24}
                        style={{
                            justifyContent: "center",
                        }}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.darkBlue }}>
            <View
                style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                    backgroundColor: Colors.lightBlack,
                    borderRadius: 10,
                    padding: Default.fixPadding * 0.5,
                    marginHorizontal: Default.fixPadding * 1.5,
                    marginVertical: Default.fixPadding,
                }}
            >
                <Ionicons
                    name="search-outline"
                    color={Colors.lightGrey}
                    size={22}
                    style={{
                        flex: 0.6,
                        justifyContent: "center",
                        alignSelf: "center",
                        marginLeft: isRtl ? 0 : Default.fixPadding * 0.5,
                        marginRight: isRtl ? Default.fixPadding * 0.5 : 0,
                    }}
                />
                <TextInput
                    style={{
                        ...Fonts.SemiBold16White,
                        flex: 9.4,
                        textAlign: isRtl ? "right" : "left",
                        marginHorizontal: Default.fixPadding,
                        paddingVertical: Default.fixPadding * 0.5,
                    }}
                    onChangeText={(text) => setSearch(text)}
                    onEndEditing={handleFilter}
                    value={search}
                    selectionColor={Colors.primary}
                    placeholder={"Please enter artist's name"}
                    placeholderTextColor={Colors.lightGrey}
                />
            </View>
            {
                artistList.length === 0 &&(
                    <View style={{ flexDirection: isRtl ? "row-reverse" : "row", justifyContent:"center", margin:25 }}>
                       
                            <Ionicons
                            name={"ios-briefcase-outline"}
                            size={25}
                            color={Colors.grey}
                            />
                        
                        <Text style={{ ...Fonts.Bold20White,color:"grey" }}>No Artists to match</Text>
                    </View>
                )
            }       
            <FlatList
                data={artistList}
                renderItem={renderItemArtist}
                keyExtractor={(item) => item.key}
                showsVerticalScrollIndicator={false}
            />
   
            <BottomMusic onSelect={() => props.navigation.navigate("playScreen")} />
        </SafeAreaView>
    );
};

export default ArtistSearchScreen;
