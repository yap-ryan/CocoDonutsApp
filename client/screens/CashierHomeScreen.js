import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


function CashierHomeScreen() {
    return (
        <View style={styles.container}>
            <Text> CASHIER SCREEN </Text>
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

export default CashierHomeScreen;