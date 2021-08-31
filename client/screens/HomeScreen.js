import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Image, StatusBar } from 'react-native';
// import { StatusBar } from 'expo-status-bar';

import { CredentialsContext } from '../components/CredentialsContext';

function HomeScreen({ navigation }) {

    const {storedCredentials} = React.useContext(CredentialsContext)
    console.log('Stored Credentials: ' + JSON.stringify(storedCredentials) + '\n')
    
    return (
    <>
        <ImageBackground source={require('../assets/dozendonuts-blurred.png')} style={styles.imageBackground} >
            <View style={styles.imageBackgroundContent}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../assets/cocologopink.png')} />
                </View>
                <View style={styles.pointsContainer}>
                    <Text style={styles.imageText}> {storedCredentials ? storedCredentials.name + '\'s Coco Points:' : "My Coco Points:" }</Text>
                    <Text style={styles.pointsText}> {storedCredentials ? storedCredentials.points : "Error" } </Text>
                </View>
            </View>        
        </ImageBackground>
        <View style={styles.contentContainer}>

            <View style={styles.innerContentContainer}>

                <TouchableOpacity style={[styles.button, {backgroundColor: '#ffffff'}]} onPress={() => navigation.push('Coupons')}>
                        <Text style={styles.text}>My Coupons</Text>
                    </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.push('AboutRewards')}>
                    <Text style={styles.text}>Learn about Coco Donuts Rewards</Text>
                </TouchableOpacity>
            </View>
        </View>  
    </>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 70,
        backgroundColor: '#feadd6',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer: {
        width: '100%',
        flex: 0.57,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#ffffff'
    },
    imageBackground: {
        flex: 0.43,
    },
    imageBackgroundContent: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.40)',
        alignItems: 'center',
        justifyContent: 'flex-start', 
    },
    imageText: {
        fontFamily: 'DMSans-Medium',
        fontSize: 22,
        color: 'white',
    },
    innerContentContainer:{
        top: 20,
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    logo: {
        height: 95,
        width: 95,
        top: 5
    },
    logoContainer: {
        flex: 0.65,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pointsContainer: {
        flex: 0.35,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    pointsText: {
        fontFamily: 'DMSans-Bold',
        fontSize: 32,
        color: 'white',
    },
    text: {
        fontFamily: 'DMSans-Medium',
        fontSize: 16
    }

})

export default HomeScreen;