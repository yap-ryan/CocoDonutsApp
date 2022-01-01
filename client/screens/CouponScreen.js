import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';

/**
 *  This screen should list out all of the customer's coupons
 */
function CouponScreen() {
    return (
        <View style={styles.listingContainer}>
            <CouponCard/>
        </View>
    );
}

/**
 *  Coupon display component
 */
const CouponCard = ({itemName, imgSrc, pointCost}) => {
    return (
        <TouchableOpacity style={styles.couponCard}>
            <Text> Test </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: 'white'
    },
    listingContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: '3%'
    },
    couponCard: {
        backgroundColor: 'white',
        height: 90,
        borderRadius: 6,
        elevation: 2
    }
})

export default CouponScreen;