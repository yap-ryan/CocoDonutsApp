import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


function AccountScreen() {
    return (
        <View style={styles.container}>
            <Text> ACCOUNT SCREEN </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },

})

export default AccountScreen;