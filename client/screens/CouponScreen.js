import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


function CouponScreen() {
    return (
        <View style={styles.container}>
            <Text> List of user's Coupons </Text>
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

export default CouponScreen;