import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


export default function CashierTransactionScreen() {
    return (
        <View style={styles.container}>
            <Text> Cashier Transaction Screen </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

