// Third Party imports
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Font from 'expo-font';
import React  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';


// 'Stuff I made' imports
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import AccountScreen from './screens/AccountScreen';
import CouponScreen from './screens/CouponScreen';
import DonutShopScreen from './screens/DonutShopScreen';
import CoffeeShopScreen from './screens/CoffeeShopScreen';
import AboutRewardsScreen from './screens/AboutRewardsScreen';
import { CredentialsContext } from './components/CredentialsContext';


const HomeStack = createStackNavigator()
const HomeStackScreen = () => {
  return(
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={HomeScreen} 
      options={{ headerShown: false, animationEnabled: false }} />
    <HomeStack.Screen name="Coupons" component={CouponScreen} 
      options={{ animationEnabled: false }}/>
    <HomeStack.Screen name="DonutShop" component={DonutShopScreen} 
      options={{ title:"Donuts", animationEnabled: false }}/>
    <HomeStack.Screen name="CoffeeShop" component={CoffeeShopScreen} 
      options={{ title:"Coffee", animationEnabled: false }}/>
    <HomeStack.Screen name="AboutRewards" component={AboutRewardsScreen} 
      options={{ title:"About Rewards", animationEnabled: false }} />
  </HomeStack.Navigator>
  )
}

const AuthStack = createStackNavigator()
const AuthStackScreen = () => {
  return(
    <AuthStack.Navigator>
      <AuthStack.Screen name="WelcomeScreen" component={WelcomeScreen} 
        options={{ headerShown: false }} />
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} 
        options={{ title:"Login", headerBackTitle:"Back", animationEnabled: false }} />
      <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} 
        options={{ title:"Sign Up", headerBackTitle:"Back", animationEnabled: false }}/>
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
          <Icon name="home" size={25} color={focused ? '#feadd6' : '#a3a3a3'} />
        )
        }}/>
      {/* <Tabs.Screen name="Game" component={GameScreen} options={{
        tabBarIcon: ({ focused} ) => (
          <Icon name="game-controller" size={25} color={focused ? '#feadd6' : '#a3a3a3'} />
        )
        }}/> */}
      <Tabs.Screen name="Account" component={AccountScreen} options={{
        tabBarIcon: ({ focused} ) => (
          <Icon name="person-circle" size={25} color={focused ? '#feadd6' : '#a3a3a3'} />
        )
        }}/>
    </Tabs.Navigator>
  )
}

const RootStack = createStackNavigator()
const RootStackScreen = () => {
  return (
    <CredentialsContext.Consumer>
      {({storedCredentials, setStoredCredentials}) => (
        <RootStack.Navigator headerMode='none'>
        {/* If there are storedCredentials (already logged in) render
          main app Tab Navigation Screens else render Authentication Stack*/}
        { storedCredentials ? (
          <RootStack.Screen name='App' component={TabsScreen} />
        ) : (
          <RootStack.Screen name='Auth' component={AuthStackScreen}/>
        )}
      </RootStack.Navigator>
      )}
    </CredentialsContext.Consumer>
    
  )
}



export default function App() {

  // Authentication and Loading states
  const [appReady, setAppReady] = React.useState(false)
  const [storedCredentials, setStoredCredentials] = React.useState(null)

  // Cache all assets when loading app initially
  const _cacheAssetsAsync = async () => {
    try {
      const images = [require('./assets/dozendonuts.png'), 
        require('./assets/windowlogo.jpg')
      ]

      const cachedImages = images.map(image => {
        return Asset.fromModule(image).downloadAsync()
      })

      const fonts = [
        {'DMSans-Bold': require('./assets/fonts/DMSans-Bold.ttf')},
        {'DMSans-Medium': require('./assets/fonts/DMSans-Medium.ttf')},
        {'DMSans-Regular': require('./assets/fonts/DMSans-Regular.ttf')}
      ]

      const cachedFonts = fonts.map(font => Font.loadAsync(font))

      return Promise.all([...cachedImages,...cachedFonts])
    } catch (err) {
      console.error(err)
    }
  }

  /** Check if login credentials already exist in async storage on client device.
   *  IF there are stored credentials, then update stored credentials from server 
  RUNS ON APP LOADING SCREEN */
  const checkLoginCreds = async () => {
    try {
      const creds = await AsyncStorage.getItem('cocoAppCredentials')
      if (creds != null && creds.id != null) {

        console.log(creds.id)

        const url = `https://coco-donuts-heroku.herokuapp.com/users/${creds.id}`
        let updatedCreds;

        // Get updated credentials from server
        try {

          const resp = await axios.get(url)
          updatedCreds = resp.data    
          console.log(updatedCreds)


        } catch (err) {
          console.error(err)
        }        

        console.log("Credentials in AsyncStorage found, will presist login with credentials: " + updatedCreds + '\n')
        setStoredCredentials(updatedCreds)
      } else {
        console.log("No credentials in AsyncStorage found")
        setStoredCredentials(null)
      }
    } catch (err) {
      console.error(err)
    }
  }


  // List of functions to run ASYNCHRONOUSLY when app loading
  const startAppLoading = async () => {
    try {
      await _cacheAssetsAsync()
      await checkLoginCreds()
    } catch (err) {
      console.error('Error with app loading: \n' + err)
    }
  }

  // Asynchronously cache assets and set load state to false when done
  if (!appReady) {
    return <AppLoading 
      startAsync={startAppLoading} 
      onFinish={() => setAppReady(true)}
      onError={console.warn}
    /> 
  }
  
  return (
    <CredentialsContext.Provider value={{storedCredentials, setStoredCredentials}}>
      <NavigationContainer>
        <RootStackScreen/>
        <StatusBar style="auto" />
      </NavigationContainer> 
    </CredentialsContext.Provider>
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
