import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  StatusBar,
  Platform,
  ActivityIndicator,
  Image
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Fonts, Default } from "../constants/style";
import { useTranslation } from "react-i18next";
import DashedLine from "react-native-dashed-line";
import Loader from "../components/loader";
import { getDatabase, onValue, orderByChild, query, ref, limitToFirst } from "firebase/database";
import functions, { FirebaseFunctionsTypes } from '@react-native-firebase/functions';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { useAppContext } from "../context";
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
const FIRESTORE = firestore()
const DB = getDatabase();
const PremiumScreen = (props) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { t, i18n } = useTranslation();
  const customerCollection = FIRESTORE.collection('customers')
  const isRtl = i18n.dir() === "rtl";
  const [subscriptionData, setSubscriptionData] = useState({})
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
  useEffect(() => {
    const collection = ref(DB, "/subscriptions");
    const orderCollection = query(collection, orderByChild("charge_amount"));
    console.log(orderCollection, "orderCollection")
    onValue(orderCollection, snapshot => {
      const data = snapshot.val();
      let premiumData = [];
      if (data == null) {
        setOptionCategory([]);
      }
      Object.keys(data).map(key => {
        premiumData.push({
          ...data[key],
          key
        })
      });

      setOptionCategory(premiumData);
    })
  }, [])

  useEffect(() => {
    const unsubscribe = customerCollection.doc(user.uid).onSnapshot(snpShot => {
      console.log("Subscription changed", snpShot.data())
      let subscription = {
        subscriptionStarted: snpShot.data().subscriptionStarted,
        subscriptionEnded: snpShot.data().subscriptionEnded,
        subscriptionProductID: snpShot.data().subscriptionProductID,
        subscriptionProductName: snpShot.data().subscriptionProductName
      }
      setSubscriptionData(subscription)
    })
    return () => {
      unsubscribe()
    }
  }, [FIRESTORE])
  const [visible, setVisible] = useState(false);
  const [workingWithStripe, setWorkingWithStripe] = useState(false)
  const { user } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState({});

  const continuePremium = () => {

    if (selectedCategory?.stripe_product_details) {
      initializeStripePayment(selectedCategory)
    }
    else {
      console.log("Please select a plan to continue.")
    }
  }
  const initializeStripePayment = async (item) => {
    setWorkingWithStripe(true)
    console.log({ ...item })
    functions().httpsCallable('initStripePayment')(
      { stripe_price_id: item.stripe_product_details.price_id, userid: user.uid }
    ).then(async (response) => {
      console.log(response)
      if(response){
        const { setupIntent, ephemeralKey, customer } = response.data;
        setWorkingWithStripe(false)
        const { error } = await initPaymentSheet({
          merchantDisplayName: "Subscription",
          customerId: customer,
          customerEphemeralKeySecret: ephemeralKey,
          paymentIntentClientSecret: setupIntent,
          // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
          //methods that complete payment after a delay, like SEPA Debit and Sofort.
          allowsDelayedPaymentMethods: true,
          defaultBillingDetails: {
            name: 'Jane Doe',
          }
        });
        const { error1 } = await presentPaymentSheet();
      }

    }).catch(error => {
      setWorkingWithStripe(false)
      console.log("Function Error", error)
    })

  }

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
            console.log("Server Time",  database().getServerTime(), subscriptionData?.subscriptionEnded?.toDate())
            const isCurrentPlan = subscriptionData?.subscriptionProductID == item?.stripe_product_details?.product_id && database().getServerTime() < subscriptionData?.subscriptionEnded.toDate()
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
                  backgroundColor: isCurrentPlan ? Colors.grey : item.color,
                  marginVertical: Default.fixPadding,
                  borderColor:
                    selectedCategory === item ? Colors.yellow : null,
                  borderWidth: selectedCategory === item ? 2 : 0,
                }}
                disabled={isCurrentPlan}
                onPress={() => {
                  setSelectedCategory(item)
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
                    {
                      selectedCategory == item ?
                        <Ionicons
                          name={"play-circle"}
                          size={28}
                          color={Colors.white}
                        />
                        : <View></View>
                    }
                  </View>
                  <View style={{ flex: 8, marginLeft: 10 }}>
                    <Text
                      style={
                        selectedCategory === item
                          ? Fonts.Bold16Yellow
                          : Fonts.Bold16White
                      }
                    >
                      {item.subscription_name}
                    </Text>
                    <Text style={{ ...Fonts.Bold14LightGrey }}>
                      Amount: {item.charge_amount}
                    </Text>
                    {
                      isCurrentPlan ? <Text style={{ ...Fonts.Bold14LightGrey }}>
                        Your current plan will finish at {new Date( subscriptionData?.subscriptionEnded?.toDate() ).toDateString()}
                      </Text> : <View></View>
                    }
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
            <Text
              style={{
                ...Fonts.Medium16LightGrey,
                marginHorizontal: Default.fixPadding * 0.5,
              }}
            >
              {selectedCategory?.description}
            </Text>

          </View>


        </View>
      </ScrollView>
      <Loader visible={visible} />
      <TouchableOpacity
        onPress={continuePremium}
        disabled={!selectedCategory?.stripe_product_details}
        style={{
          ...Default.shadow,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: selectedCategory?.stripe_product_details ? Colors.primary : Colors.grey,
          marginHorizontal: Default.fixPadding * 1.5,
          marginVertical: Default.fixPadding * 1.5,
          paddingVertical: Default.fixPadding * 1.5,
          borderRadius: 25,
        }}
      >
        {workingWithStripe ? <ActivityIndicator size={30} /> : <Text style={{ ...Fonts.ExtraBold20White }}>{tr("continue")}</Text>}

      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PremiumScreen;
