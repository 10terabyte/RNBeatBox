import React from 'react';
import { createStackNavigator , TransitionPresets} from '@react-navigation/stack';

import LoginScreen from '../screens/auth/signInScreen';
import SignupScreen from '../screens/auth/signUpScreen';
import SplashScreen from '../screens/splashScreen';
import OnboardingScreen from '../screens/auth/onboardingScreen';
const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator headerMode='none' 
        screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}>
       
        
        <Stack.Screen
          name="onboardingScreen"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        
        
      <Stack.Screen
          name="signUpScreen"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="signInScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
    </Stack.Navigator>
  );
}