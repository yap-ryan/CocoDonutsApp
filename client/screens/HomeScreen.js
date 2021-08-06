import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';

function HomeScreen({ navigation }) {
    
    return (

        <ImageBackground source={require('../assets/dozendonuts.png')} blurRadius={1.5} style={styles.background}>

            <View style={styles.contentContainer}>
                <Text style={styles.text}> HOME SCREEN </Text>
            </View>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={[styles.button, {backgroundColor: '#ffffff'}]} onPress={() => navigation.push('Coupons')}>
                        <Text style={styles.text}>My Coupons</Text>
                    </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.push('AboutRewards')}>
                    <Text style={styles.text}>Learn about Coco Donuts Rewards</Text>
                </TouchableOpacity>
            </View>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    contentContainer: {
        top: 80,
        width: '100%',
        flex: 0.75,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    buttonsContainer:{
        top: 0,
        width: '100%',
        flex: 0.25,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    button: {
        width: '100%',
        height: 70,
        backgroundColor: '#feadd6',
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    text: {
        fontFamily: 'DMSans-Medium',
        fontSize: 16
    }

})

export default HomeScreen;