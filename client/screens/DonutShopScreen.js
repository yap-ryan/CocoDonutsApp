import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Image, Alert } from 'react-native';
import { ItemCardPressable } from './../components/styles'
import { Colors } from './../components/styles';
import appleFritterImg from 'donuts/apple-fritter.jpg'
import bavarianCreamFilledImg from 'donuts/bavarian-cream-filled.jpg'


const { brand, secondaryTextColor } = Colors;

/**
 *  This screen should display all donut coupons available for customers to earn via points
 */
function DonutShopScreen() {

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView>
                <View style={styles.listingContainer}>
                    <ItemCard itemName='Apple Fritter' imgSrc={appleFritterImg} pointCost={5}/>
                    <ItemCard itemName='Bavarian Cream Filled' imgSrc={bavarianCreamFilledImg} pointCost={5}/>
                    <ItemCard itemName='Chocolate Buttermilk' imgSrc={require('../assets/donuts/chocolate-buttermilk.jpg')} pointCost={5}/>
                    <ItemCard itemName='Chocolate Coconut Cake' imgSrc={require('../assets/donuts/chocolate-coconut-cake.jpg')} pointCost={5}/>
                    <ItemCard itemName='Chocolate Old Fashion' imgSrc={require('../assets/donuts/chocolate-old-fashion.jpg')} pointCost={5}/>
                    <ItemCard itemName='Chocolate or Vanilla Peanut Cake' imgSrc={require('../assets/donuts/chocolate-or-vanilla-peanut-cake.jpg')} pointCost={5}/>
                    <ItemCard itemName='Chocolate or Vanilla Sprinkle Cake' imgSrc={require('../assets/donuts/chocolate-or-vanilla-sprinkle-cake.jpg')} pointCost={5}/>
                    <ItemCard itemName='Chocolate Raised Bar' imgSrc={require('../assets/donuts/chocolate-raised-bar.jpg')} pointCost={5}/>
                    <ItemCard itemName='Chocolate Sprinkle Raised' imgSrc={require('../assets/donuts/chocolate-sprinkle-raised.jpg')} pointCost={5}/>
                    <ItemCard itemName='Cinnamon Roll' imgSrc={require('../assets/donuts/cinnamon-roll.jpg')} pointCost={5}/>
                    <ItemCard itemName='Cinnamon Sugar Raised' imgSrc={require('../assets/donuts/cinnamon-sugar-raised.jpg')} pointCost={5}/>
                    <ItemCard itemName='Cinnamon Sugar Twist' imgSrc={require('../assets/donuts/cinnamon-sugar-twist.jpg')} pointCost={5}/>
                    <ItemCard itemName='Coconut Chocolate Raised' imgSrc={require('../assets/donuts/coconut-chocolate-raised.jpg')} pointCost={5}/>
                    <ItemCard itemName='Crumb Raised' imgSrc={require('../assets/donuts/crumb-raised.jpg')} pointCost={5}/>
                    <ItemCard itemName='Glazed Buttermilk' imgSrc={require('../assets/donuts/glazed-buttermilk.jpg')} pointCost={5}/>
                    <ItemCard itemName='Glazed or Maple Old Fashion' imgSrc={require('../assets/donuts/glazed-or-maple-old-fashion.jpg')} pointCost={5}/>
                    <ItemCard itemName='Glazed Raised' imgSrc={require('../assets/donuts/glazed-raised.jpg')} pointCost={5}/>
                    <ItemCard itemName='Lavendar Cake' imgSrc={require('../assets/donuts/lavendar-cake.jpg')} pointCost={5}/>
                    <ItemCard itemName='Lavendar Raised' imgSrc={require('../assets/donuts/lavender-raised.jpg')} pointCost={5}/>
                    <ItemCard itemName='Lemon Jelly Filled' imgSrc={require('../assets/donuts/lemon-jelly-filled.jpg')} pointCost={5}/>
                    <ItemCard itemName='Maple Buttermilk' imgSrc={require('../assets/donuts/maple-buttermilk.jpg')} pointCost={5}/>
                    <ItemCard itemName='Maple Raised Bar' imgSrc={require('../assets/donuts/maple-raised-bar.jpg')} pointCost={5}/>
                    {/* TODO: Combine Mochi flavors into 1 card & combine images into gif ??? */}
                    <ItemCard itemName='Mochi Chocolate' imgSrc={require('../assets/donuts/mochi-chocolate.jpg')} pointCost={5}/>
                    <ItemCard itemName='Mochi Matcha' imgSrc={require('../assets/donuts/mochi-matcha.jpg')} pointCost={5}/>
                    <ItemCard itemName='Mochi Oreo' imgSrc={require('../assets/donuts/mochi-oreo.jpg')} pointCost={5}/>
                    <ItemCard itemName='Mochi Sugar' imgSrc={require('../assets/donuts/mochi-sugar.jpg')} pointCost={5}/>

                    <ItemCard itemName='Peanut Chocolate Raised' imgSrc={require('../assets/donuts/peanut-chocolate-raised.jpg')} pointCost={5}/>
                    <ItemCard itemName='Raspberry Jelly Filled' imgSrc={require('../assets/donuts/raspberry-jelly-filled.jpg')} pointCost={5}/>
                    <ItemCard itemName='Signature Coco Raised' imgSrc={require('../assets/donuts/signature-coco-raised.jpg')} pointCost={5}/>
                    <ItemCard itemName='Sugar Twist' imgSrc={require('../assets/donuts/sugar-twist.jpg')} pointCost={5}/>
                    <ItemCard itemName='Vanilla Cake' imgSrc={require('../assets/donuts/vanilla-cake.jpg')} pointCost={5}/>
                    <ItemCard itemName='Vanilla Coconut Cake' imgSrc={require('../assets/donuts/vanilla-coconut-cake.jpg')} pointCost={5}/>

                </View>
            </ScrollView>
        </SafeAreaView>
        
    );
}

const createRedeemAlert = (itemName) => {
    Alert.alert(
        "Redeem Coupon",
        "1x " + itemName,
        [
            {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
            },
            { text: "Redeem", onPress: () => console.log("Redeem Pressed") }
        ]
    );
}

/**
 *  Component to display redeemable coupon item 
 */
const ItemCard = ({itemName, imgSrc, pointCost}) => {
    return (
        <ItemCardPressable onPress={() => createRedeemAlert(itemName)}>
            <Image
                style={styles.itemImage}
                source={imgSrc}
            />
            <View style={styles.itemPointsView}>
                <Text style={styles.itemPointsText}> {pointCost} pts </Text>
            </View>
            <Text style={styles.itemText}>{itemName} </Text>
        </ItemCardPressable>
    )
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