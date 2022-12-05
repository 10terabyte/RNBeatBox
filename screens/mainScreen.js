import i18n from "../languages/index"; //don't remove this line
import React from "react";
import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { withTranslation } from "react-i18next";
import SplashScreen from "../screens/splashScreen";
import OnboardingScreen from "../screens/auth/onboardingScreen";
import SignInScreen from "../screens/auth/signInScreen";
import SignUpScreen from "../screens/auth/signUpScreen";
import VerificationScreen from "../screens/auth/verificationScreen";
import BottomTab from "../components/bottomTab";
import TopArtistsScreen from "../screens/topArtistsScreen";
import RecentlyPlayScreen from "../screens/recentlyPlayScreen";
import PlayListScreen from "../screens/playListScreen";
import FreshMusicScreen from "../screens/freshMusicScreen";
import BhaktiScreen from "../screens/bhaktiScreen";
import MoodScreen from "../screens/moodScreen";
import ArtistScreen from "../screens/artistScreen";
import PlayScreen from "../screens/playScreen";
import PayListSeeAllScreen from "../screens/playListSeeAllScreen";
import TrendingPodcastScreen from "../screens/trendingPodcastScreen";
import AroundWorldScreen from "../screens/aroundWorldScreen";
import FamousPersonalitiesScreen from "../screens/famousPersonalitiesScreen";
import MotivationPodcastScreen from "../screens/motivationPodcastScreen";
import PodcastDetailScreen from "../screens/podcastDetailScreen";
import SearchMusicScreen from "../screens/searchMusicScreen";
import PremiumScreen from "../screens/premiumScreen";
import AddToPlayList from "../components/addToPlayList";
import NewPlayList from "../components/newPlayList";
import MainBottomSheet from "../components/mainBottomSheet";
import LyricsScreen from "../screens/lyricsScreen";
import SongInformation from "../screens/songInformation";
import NotificationScreen from "../screens/notificationScreen";
import PartySongScreen from "../screens/partySongScreen";
import LibraryMyLikeScreen from "../screens/libraryMyLikeScreen";
import LibraryArtistScreen from "../screens/libraryArtistScreen";
import LibraryPlayListScreen from "../screens/libraryPlayListScreen";
import LibraryPodcastScreen from "../screens/libraryPodcastScreen";
import EditProfileScreen from "../screens/editProfileScreen";
import LanguageScreen from "../screens/languageScreen";
import AboutUsScreen from "../screens/aboutUsScreen";
import HelpAndSupportScreen from "../screens/helpAndSupportScreen";
import AppSettingScreen from "../screens/appSettingScreen";
import CreditCardScreen from "../screens/creditCardScreen";
import SuccessScreen from "../screens/successScreen";
import SimilarArtistScreen from "../screens/similarArtistScreen";
const Stack = createStackNavigator();
const MainScreen = (props) => {
   
    const isRtl = i18n.dir() === "rtl";
  
    function tr(key) {
      return t(`mainScreen:${key}`);
    }
 
     
  
    return (
        <Stack.Navigator
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen
          name="bottomTab"
          component={BottomTab}
          options={{
            ...TransitionPresets.DefaultTransition,
            headerShown: false,
          }}
        />
        
      </Stack.Navigator>
    );
  };
  
  export default MainScreen;
  