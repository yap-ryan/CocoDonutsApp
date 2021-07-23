import React from 'react';
import { TouchableOpacity, ImageBackground, StyleSheet, View, Image, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignUpScreen from './SignUpScreen';

function LoginScreen({ navigation }) {


    return (
    <ImageBackground style={styles.background} source={require('../assets/background.jpg')}>

        <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('../assets/cocodonutslogo.png')} />
            <Text>Coco Donuts</Text>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={() => console.log('TODO')}>
            <Text>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.push('SignUpScreen')}>
            <Text>Sign Up</Text>
        </TouchableOpacity>        

    </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1  ,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center'
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

})

export default LoginScreen;