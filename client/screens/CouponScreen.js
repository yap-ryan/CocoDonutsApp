import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';

/**
 *  This screen should list out all of the customer's coupons
 */
function CouponScreen() {
    return (
        <SafeAreaView style={styles.safeAreaView}>

        </SafeAreaView>
    );
}

/**
 *  Coupon display component
 */
const CouponCard = ({itemName, imgSrc, pointCost}) => {
    return (
        <View>

        </View>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: 'white'
    },
    listingContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: '2.5%'
    }

})

export default CouponScreen;