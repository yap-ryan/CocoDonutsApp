import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../shared/AuthContext'

function AccountScreen() {

    const { logOut } = React.useContext(AuthContext)

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.signOutButton} onPress={() => logOut()}>
                <Text>Log Out of Account</Text>
            </TouchableOpacity>   
        </View>
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
    }

})

export default AccountScreen;