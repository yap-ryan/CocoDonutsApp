import React, { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native'
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Image, StatusBar } from 'react-native';
// import { StatusBar } from 'expo-status-bar';

import { CredentialsContext } from '../components/CredentialsContext';
import {
    Colors,
    StyledButton,
    ButtonText
  } from './../components/styles';

const { secondaryTextColor, secondaryButtonColor, darkLight } = Colors;

function HomeScreen({ navigation }) {

    const {storedCredentials} = React.useContext(CredentialsContext)
    console.log('Stored Credentials: ' + JSON.stringify(storedCredentials) + '\n')

        
    // Used to prevent multiple presses of same buttom in quick succession (leading to multiple screens pushed on stack)
    const [buttonPressed, setButtonPressed] = React.useState(false)
    React.useEffect(() => {
      setTimeout(() => {
          setButtonPressed(false)
      }, 10)
    }, [buttonPressed])


    const isFocused = useIsFocused()
    React.useEffect(() => {
        // USED TO CAUSE RERENDER(& therefore update storedCredentials) WHEN WE NAVIGATE(or 'Focus') BACK TO HOME SCREEN
        // IE. If user redeems a coupon on the DonutShopScreen and comes back, we need to updated the user's points displayed
    }, [isFocused])
    
    return (
    <>
        <ImageBackground source={require('../assets/dozendonuts-blurred.png')} style={styles.imageBackground} >
            <View style={styles.imageBackgroundContent}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../assets/cocologowithtext.png')} />
                </View>
                <View style={styles.pointsContainer}>
                    <Text style={styles.imageText}> {storedCredentials ? storedCredentials.name + '\'s Coco Points:' : "My Coco Points:" }</Text>
                    <Text style={styles.pointsText}> {storedCredentials ? storedCredentials.points : "Error" } </Text>
                </View>
            </View>        
        </ImageBackground>
        <View style={styles.contentContainer}>

            <View style={styles.innerContentContainer}>
                { buttonPressed === false ?
                    <>
                        <StyledButton onPress={() => navigation.push('Coupons')} onPressOut={() => setButtonPressed(true)} style={styles.button}>
                            <ButtonText style={styles.text}>My Coupons</ButtonText>
                        </StyledButton>
                        
                        <View style={{ height: 5 }}>
                        </View>

                        <StyledButton onPress={() => navigation.push('DonutShop')} onPressOut={() => setButtonPressed(true)} style={[styles.button, {backgroundColor: secondaryButtonColor}]}>
                            <ButtonText style={styles.secondaryText}>Donuts</ButtonText>
                        </StyledButton>
                        
                        <View style={{ height: 5 }}>
                        </View>

                        <StyledButton onPress={() => navigation.push('CoffeeShop')} onPressOut={() => setButtonPressed(true)} style={[styles.button, {backgroundColor: secondaryButtonColor}]}>
                            <ButtonText style={styles.secondaryText}>Coffee</ButtonText>
                        </StyledButton>
                        
                        <View style={{ height: 5 }}>
                        </View>

                        <StyledButton onPress={() => navigation.push('AboutRewards')} onPressOut={() => setButtonPressed(true)} style={[styles.button, {backgroundColor: secondaryButtonColor}]}>
                            <ButtonText style={styles.secondaryText}>Learn about Coco Donuts Rewards</ButtonText>
                        </StyledButton>
                    </>
                    :
                    <>
                        <StyledButton disabled={true} style={styles.button}>
                            <ButtonText style={styles.text}>My Coupons</ButtonText>
                        </StyledButton>
                        
                        <View style={{ height: 5 }}>
                        </View>

                        <StyledButton disabled={true} style={[styles.button, {backgroundColor: secondaryButtonColor}]}>
                            <ButtonText style={styles.secondaryText}>Donuts</ButtonText>
                        </StyledButton>
                        
                        <View style={{ height: 5 }}>
                        </View>

                        <StyledButton disabled={true} style={[styles.button, {backgroundColor: secondaryButtonColor}]}>
                            <ButtonText style={styles.secondaryText}>Coffee</ButtonText>
                        </StyledButton>
                        
                        <View style={{ height: 5 }}>
                        </View>

                        <StyledButton disabled={true} style={[styles.button, {backgroundColor: secondaryButtonColor}]}>
                            <ButtonText style={styles.secondaryText}>Learn about Coco Donuts Rewards</ButtonText>
                        </StyledButton>
                    </>
                }        

            </View>
        </View>  
    </>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '90%',
        height: 55,
        backgroundColor: '#feadd6',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer: {
        width: '100%',
        flex: 0.58,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#ffffff'
    },
    imageBackground: {
        flex: 0.42,
    },
    imageBackgroundContent: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.55)',
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
        height: 160,
        width: 160,
        top: 5
    },
    logoContainer: {
        flex: 0.67,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pointsContainer: {
        top: 3,
        flex: 0.33,
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
    },
    secondaryText: {
        fontFamily: 'DMSans-Medium',
        fontSize: 16,
        color: secondaryTextColor
    }



})

export default HomeScreen;