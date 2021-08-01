import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import React  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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



const HomeStack = createStackNavigator()
const HomeStackScreen = () => {
  return(
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={HomeScreen} 
      options={{ headerShown: false, animationEnabled: false }} />
    <HomeStack.Screen name="Coupons" component={CouponScreen} 
      options={{ animationEnabled: false }}/>
    <HomeStack.Screen name="AboutRewards" component={AboutRewardsScreen} 
      options={{ title:"About Rewards", animationEnabled: false }} />
  </HomeStack.Navigator>
  )
}

const AuthStack = createStackNavigator()
const AuthStackScreen = () => {
  return(
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} 
        options={{ headerShown: false }} />
      <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} 
        options={{ title:"Sign Up", animationEnabled: false }}/>
    </AuthStack.Navigator>
  )
}

const Tabs = createBottomTabNavigator()
const TabsScreen = () => {
  return (
    <Tabs.Navigator initialRouteName='Home' 
      tabBarOptions={{
        labelStyle: {
          ...styles.navtext
        },
        activeTintColor: '#feadd6',
      }}>
      <Tabs.Screen name="Home" component={HomeStackScreen} options={{
        tabBarIcon: ({ focused} ) => (
          <Icon name="home" size={25} color={focused ? '#feadd6' : 'gray'} />
        )
        }}/>
      <Tabs.Screen name="Game" component={GameScreen} />
      <Tabs.Screen name="Account" component={AccountScreen} />
    </Tabs.Navigator>
  )
}

const RootStack = createStackNavigator()
const RootStackScreen = ({ userToken }) => {
  return (
    <RootStack.Navigator headerMode='none'>
      {/* If there is a userToken (already logged in) render
        main app Tab Navigation Screens else render Authentication Stack*/}
      { userToken ? (
        <RootStack.Screen name='App' component={TabsScreen} />
      ) : (
        <RootStack.Screen name='Auth' component={AuthStackScreen}/>
      )}
    </RootStack.Navigator>
  )
}


export default function App() {

  // Authentication and Loading states
  const [isLoading, setIsLoading] = React.useState(true)
  const [userToken, setUserToken] = React.useState(null)


  // TODO: CONNECT FUNCTIONS TO BACKEND
  // Memoize functions so we dont re-run functions on every render
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


  // Cache all assets when loading app initially
  const _cacheAssetsAsync = async () => {
    const images = [require('./app/assets/dozendonuts.png'), 
      require('./app/assets/windowlogo.jpg')
    ]

    const cachedImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync()
    })

    const fonts = [
      {'DMSans-Bold': require('./app/assets/fonts/DMSans-Bold.ttf')},
      {'DMSans-Medium': require('./app/assets/fonts/DMSans-Medium.ttf')},
      {'DMSans-Regular': require('./app/assets/fonts/DMSans-Regular.ttf')}
    ]

    const cachedFonts = fonts.map(font => Font.loadAsync(font))

    return await Promise.all([...cachedImages,...cachedFonts])
  }


  // Asynchronously cache assets and set load state to false when done
  if (isLoading) {
    return <AppLoading 
      startAsync={_cacheAssetsAsync}
      onFinish={() => setIsLoading(false)}
      onError={console.warn}
    />
  }
  
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken}/>
      </NavigationContainer> 
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navtext: {
    fontFamily: 'DMSans-Regular',
    fontSize: 12,
    padding: 1
  }
});
