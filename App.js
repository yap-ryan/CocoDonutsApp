import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './app/screens/LoginScreen';
import SignUpScreen from './app/screens/SignUpScreen';
import HomeScreen from './app/screens/HomeScreen';
import PromotionsScreen from './app/screens/PromotionsScreen';
import GameScreen from './app/screens/GameScreen';
import AccountScreen from './app/screens/AccountScreen';

export default function App() {

  const AuthStack = createStackNavigator()
  const Tabs = createBottomTabNavigator()

  return (
    <NavigationContainer>
      <Tabs.Navigator>
        <Tabs.Screen name="Home" component={HomeScreen} />
        <Tabs.Screen name="Promotions" component={PromotionsScreen} />
        <Tabs.Screen name="Game" component={GameScreen} />
        <Tabs.Screen name="Account" component={AccountScreen} />
      </Tabs.Navigator>

        {/* <AuthStack.Navigator>
            <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} options={{ title:"Sign Up" }}/>
        </AuthStack.Navigator> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
