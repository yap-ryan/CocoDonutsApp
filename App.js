import { StatusBar } from 'expo-status-bar';
import React  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';

import LoginScreen from './app/screens/LoginScreen';
import SignUpScreen from './app/screens/SignUpScreen';
import HomeScreen from './app/screens/HomeScreen';
import GameScreen from './app/screens/GameScreen';
import AccountScreen from './app/screens/AccountScreen';
import CouponScreen from './app/screens/CouponScreen';
import AboutRewardsScreen from './app/screens/AboutRewardsScreen';
import LoadingScreen from './app/screens/LoadingScreen';
import { AuthContext } from './app/shared/AuthContext';

const HomeStackScreen = () => {

  const HomeStack = createStackNavigator()

  return(
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <HomeStack.Screen name="Coupons" component={CouponScreen} />
    <HomeStack.Screen name="AboutRewards" component={AboutRewardsScreen} options={{ title:"About Rewards" }} />
  </HomeStack.Navigator>
  )
}

export default function App() {

  const AuthStack = createStackNavigator()
  const Tabs = createBottomTabNavigator()

  const [isLoading, setIsLoading] = React.useState(true)
  const [userToken, setUserToken] = React.useState(null)

  const authContext = React.useMemo(() => {
    return {
      logIn: () => {
        setIsLoading(false)
        setUserToken('abc')
      },
      signUp: () => {
        setIsLoading(false)
        setUserToken('abc')
      },
      logOut: () => {
        setIsLoading(false)
        setUserToken(null)
      }
    }
  }, [])

  // Code to simulate loding time ie. waiting for authentication
  React.useEffect( () => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <NavigationContainer>
      
      {/* If there is a userToken (already logged in) render
      main Tab Navigation Screens else render Authentication Stack*/}
      { userToken ? (
        <Tabs.Navigator 
          tabBarOptions={{
          activeTintColor: '#feadd6',
        }}>
          <Tabs.Screen name="Home" component={HomeStackScreen} options={{
            tabBarIcon: () => (
              <Icon name="home" color="#feadd6" size={25} />
            ),
          }}/>
          <Tabs.Screen name="Game" component={GameScreen} />
          <Tabs.Screen name="Account" component={AccountScreen} />
        </Tabs.Navigator>
      ) : (
        <AuthStack.Navigator>
            <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} options={{ title:"Sign Up" }}/>
        </AuthStack.Navigator>
      )}
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
