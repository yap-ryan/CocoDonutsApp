import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CredentialsContext } from '../components/CredentialsContext';


function AccountScreen() {

    const { setStoredCredentials } = React.useContext(CredentialsContext)

    // Clear storedCredentials state and async storage on logout
    const clearCredentialsOnLogout = async () => {
        try {
            await AsyncStorage.removeItem('cocoAppCredentials')
            setStoredCredentials(null)
        } catch (err) {
            console.error(err)
        }
    }

    return (
    <>
        <View style={styles.container}>
            <TouchableOpacity style={styles.signOutButton} onPress={() => clearCredentialsOnLogout()}>
                <Text style={styles.text} >Log Out of Account</Text>
            </TouchableOpacity> 
        </View> 
    </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      signOutButton: {
        width: '100%',
        height: 70,
        backgroundColor: '#fafafa',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'DMSans-Medium',
        fontSize: 16
    }

})

export default AccountScreen;