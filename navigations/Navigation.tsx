import {View, Text} from 'react-native';
import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '../utils/NavigationUtils';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SearchScreen from '../screens/SearchScreen';
import CallerScreen from '../screens/CallerScreen';
import DashboardScreen from '../screens/DashboardScreen';
import OTPScreen from '../screens/OTPScreen';
import GettingStartedScreen from '../screens/GettingStartedScreen';
type NavigationProps = {};
const Stack = createNativeStackNavigator();

const Navigation: FC<NavigationProps> = (): JSX.Element => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="CallerScreen" component={CallerScreen} />
        <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} />
        <Stack.Screen
          name="GettingStartedScreen"
          component={GettingStartedScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
