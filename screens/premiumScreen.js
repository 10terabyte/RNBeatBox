import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  StatusBar,
  Platform,
  Image
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Fonts, Default } from "../constants/style";
import { useTranslation } from "react-i18next";
import DashedLine from "react-native-dashed-line";
import Loader from "../components/loader";
import { getDatabase, onValue, orderByChild, query, ref,limitToFirst } from "firebase/database";
const DB = getDatabase();
const PremiumScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`premiumScreen:${key}`);
  }

  const backAction = () => {
    props.navigation.goBack();
    return true;
  };
  const [optionsCategory, setOptionCategory] = useState([]);
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
  useEffect(()=>{
    const collection = ref(DB, "/subscriptions");
    const orderCollection = query(collection, orderByChild("charge_amount"));
    console.log(orderCollection,"orderCollection")
    onValue(orderCollection, snapshot=>{
      const data = snapshot.val();
      let premiumData = [];
      if(data == null){
        setOptionCategory([]);
      }
      Object.keys(data).map(key=>{
        premiumData.push({
          ...data[key],
          key
        })
      });
  
      setOptionCategory(premiumData);
    })
  },[])

  const [visible, setVisible] = useState(false);


  const [selectedCategory, setSelectedCategory] = useState("");
  const category = (key) => {
    setSelectedCategory(key);
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
        <Text style={Fonts.Bold20White}>{tr("premium")}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ margin: Default.fixPadding * 1.5 }}>
          <Text
            style={{
              ...Fonts.Bold16White,
              marginBottom: Default.fixPadding,
            }}
          >
            {tr("premiumPlans")}
          </Text>

          {optionsCategory.map((item, index) => {
            return (
              <TouchableOpacity
                key={item.key}
                style={{
                  ...Default.shadow,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  paddingVertical: Default.fixPadding * 1.5,
                  paddingHorizontal: Default.fixPadding,
                  backgroundColor: item.color,
                  marginVertical: Default.fixPadding,
                  borderColor:
                    selectedCategory === item.key ? Colors.yellow : null,
                  borderWidth: selectedCategory === item.key ? 2 : 0,
                }}
                onPress={() => {
                  category(item.key);
                }}
              >
                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                  }}
                >
                   <View
                    style={{
                      
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image source={{uri: item.icon_path}} style={{width: 50, height: 50}}/>
                  </View>
                  <View style={{ flex: 8, marginLeft: 10 }}>
                    <Text
                      style={
                        selectedCategory === item.text
                          ? Fonts.Bold16Yellow
                          : Fonts.Bold16White
                      }
                    >
                      {item.subscription_name}
                    </Text>
                    <Text style={{ ...Fonts.Bold14LightGrey }}>
                      Amount: {item.charge_amount}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 2,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ ...Fonts.Bold20White }}>${item.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <DashedLine
          axis="horizontal"
          dashLength={2}
          dashColor={Colors.lightGrey}
        />
        <View style={{ margin: Default.fixPadding * 1.5 }}>
          <Text style={{ ...Fonts.Bold16White }}>{tr("benefits")}</Text>
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              marginTop: Default.fixPadding,
            }}
          >
            <Ionicons
              name="ellipse"
              size={7}
              color={Colors.lightGrey}
              style={{
                alignSelf: "center",
              }}
            />
            <Text
              style={{
                ...Fonts.Medium16LightGrey,
                marginHorizontal: Default.fixPadding * 0.5,
              }}
            >
              {tr("hdMusic")}
            </Text>
          </View>

          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              marginTop: Default.fixPadding,
            }}
          >
            <Ionicons
              name="ellipse"
              size={7}
              color={Colors.lightGrey}
              style={{
                alignSelf: "center",
              }}
            />
            <Text
              style={{
                ...Fonts.Medium16LightGrey,
                marginHorizontal: Default.fixPadding * 0.5,
              }}
            >
              {tr("experience")}
            </Text>
          </View>

          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              marginTop: Default.fixPadding,
            }}
          >
            <Ionicons
              name="ellipse"
              size={7}
              color={Colors.lightGrey}
              style={{
                alignSelf: "center",
              }}
            />
            <Text
              style={{
                ...Fonts.Medium16LightGrey,
                marginHorizontal: Default.fixPadding * 0.5,
              }}
            >
              {tr("unlimited")}
            </Text>
          </View>
        </View>
      </ScrollView>
      <Loader visible={visible} />
      <TouchableOpacity
        onPress={() => props.navigation.navigate("creditCardScreen")}
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
        <Text style={{ ...Fonts.ExtraBold20White }}>{tr("continue")}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PremiumScreen;
