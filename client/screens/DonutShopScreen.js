import React from 'react';
import { useContext } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Image, Alert } from 'react-native';
import { ItemCardPressable } from './../components/styles'
import { Colors } from './../components/styles';
import appleFritterImg from 'donuts/apple-fritter.jpg'
import bavarianCreamFilledImg from 'donuts/bavarian-cream-filled.jpg'
import axios from 'axios';
import items from '../items.json'
import requireImgSrc from '../itemImgSrcHelper'
import { CredentialsContext } from '../components/CredentialsContext';


const { brand, secondaryTextColor } = Colors;

/**
 *  This screen should display all donut coupons available for customers to earn via points
 */
function DonutShopScreen() {

    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)

    /**
     *   This function should:
     *      1. Create the 100% discount (free item) coupon code
     *      2. Post request for coupon code to be added to user's account
     */
    const redeemCoupon = (itemId, pointCost) => {
        
    }

    /**
     *      Check if user has enough points to redeem coupon.
     *      If user has enough points: create alert to confirm redeem and if confirm redeemCoupon()
     *      else: create alert saying user does not have enough points
     * 
     *      NOTE: Points are updated in BACKEND, do not update user's points in Frontend
     * 
     */
    const createRedeemAlert = async (itemName, itemId, pointCost) => {

        if (storedCredentials.points < pointCost) {
            Alert.alert(
                "Insufficient Points",
                "You need " + (pointCost - storedCredentials.points) + " more points to redeem this coupon!"
            )
        } else {
            Alert.alert(
                "Redeem Coupon",
                "1x " + itemName,
                [
                    {
                    text: "Cancel",
                    style: "cancel"
                    },
                    { text: "Redeem", onPress: () => redeemCoupon(itemId, pointCost) }
                ]
            )
        }        
       
    }

    /**
     *  Component to display redeemable coupon item 
     */
    const ItemCard = ({itemId, itemName, pointCost}) => {

        return (
            <ItemCardPressable onPress={() => createRedeemAlert(itemName, itemId, pointCost)}>
                <Image
                    style={styles.itemImage}
                    source={requireImgSrc(itemId)}
                />
                <View style={styles.itemPointsView}>
                    <Text style={styles.itemPointsText}> {pointCost} pts </Text>
                </View>
                <Text style={styles.itemText}>{itemName} </Text>
            </ItemCardPressable>
        )
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView>
                <View style={styles.listingContainer}>
                    {items.donuts.map(donut => (
                        <ItemCard key={donut.id} itemId={donut.id} itemName={donut.name} pointCost={donut.pointCost} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
        
    );
}



const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: 'white'
    },
    listingContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: '2.5%'
    },
    itemImage: {
        height: '73%',
        width: '99.9%',
        borderRadius: 6
    },
    itemText: {
        fontSize: 16,
        margin: 6,
        fontFamily: 'DMSans-Regular',
        color: secondaryTextColor
    },
    itemPointsView: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: -8,
        right: -8,
        padding: 3,
        borderRadius: 10,
        backgroundColor: brand,
        elevation: 2
    },
    itemPointsText: {
        fontSize: 17,
        fontFamily: 'DMSans-Medium',
        color: 'white'
    }
})

export default DonutShopScreen;