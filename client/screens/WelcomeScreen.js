import React from 'react';

import { TouchableOpacity, ImageBackground, StyleSheet, View, Image, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import { AuthContext } from '../components/AuthContext'

function WelcomeScreen({ navigation }) {


    return (
    <View style={styles.background} >

        <Image style={styles.image} source={require('../assets/windowlogo.jpg')}/>
        {/* <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('../assets/cocodonutslogo.png')} />
            <Text>Coco Donuts</Text>
        </View> */}

        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.push('LoginScreen')}>
            <Text style={styles.text}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.push('SignUpScreen')}>
            <Text style={styles.text}>No account? Sign Up Here</Text>
        </TouchableOpacity>        

    </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1  ,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }, 
    image: {
        flex:1,
        resizeMode: 'contain'
    },
    loginButton: {
        width: '100%',
        height: 70,
        backgroundColor: '#feadd6',
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    logoContainer: {
        position:'absolute',
        top: 150,
        alignItems: 'center'
    },
    logo: {
        width: 150,
        height: 130,
        position: 'relative',
        left: 3
    },
    signUpButton: {
        width: '100%',
        height: 70,
        backgroundColor: '#fafafa',
        justifyContent: 'center',
        alignItems: 'center'

    }, 
    text: {
        fontFamily: 'DMSans-Medium',
        fontSize: 18
    }

})

export default WelcomeScreen;