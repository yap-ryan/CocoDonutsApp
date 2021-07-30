import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../shared/AuthContext'


function SignUpScreen() {

    const { signUp } = React.useContext(AuthContext)

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.signUpButton} onPress={() => signUp()}>
                <Text>Done</Text>
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
    signUpButton: {
        width: '100%',
        height: 70,
        backgroundColor: '#fafafa',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SignUpScreen;