import React from 'react';
import { useContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Image, Alert } from 'react-native';


import { ItemCardPressable } from './../components/styles'
import { Colors } from './../components/styles';
import items from '../items.json'
import requireImgSrc from '../itemImgSrcHelper'
import { CredentialsContext } from '../components/CredentialsContext';
import { HEROKU_BASE_URL } from '@env'

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
    const handleRedeemCoupon = async (itemId, pointCost) => {
        const url = HEROKU_BASE_URL  + `/users/addCoupon/${storedCredentials._id}`

        // NOTE: The coupon code is completed in the backend where a unique coupon id is set 
        // FullCode =  PartialCode + "#" + UniqueID
        // Partial Coupon Code Format: <ItemID>#<Discount%>#<Expiry>
        const couponCode = '' + itemId + '#' + 0 + '#' + 0 

        const body = {
            couponToAdd: couponCode,
            pointCost: pointCost
        }

        try {
            const resp = await axios.patch(url, body)
            const result = resp.data
            const {message, status, data} = result
            console.log(data)

            if (status == 'SUCCESS') {
                const { couponAdded, newPointBal } = data
                
                storedCredentials.coupons.push(couponAdded)
                storedCredentials.points = newPointBal
    
                console.log(storedCredentials)
    
                try{
                    await AsyncStorage.setItem('cocoAppCredentials',JSON.stringify(storedCredentials))
                    setStoredCredentials(storedCredentials)
                } catch (err) {
                    console.error(err)
                }         
         
                console.log(message + '\n')
            } else {
                console.log('UPDATE FAILED with message: ')
                console.log(message + '\n')
            }            

        } catch (err) {
            console.error(err)
        }

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
                    { text: "Redeem", onPress: () => handleRedeemCoupon(itemId, pointCost) }
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
                <View style={styles.itemImageView}>
                    <Image
                        style={styles.itemImage}
                        source={requireImgSrc(itemId)}
                    />
                </View>
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
        height: '92%',
        width: '92%',
        borderRadius: 7
    },
    itemImageView: {
        height: '73%',
        width: '99.9%',
        borderRadius: 7,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
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