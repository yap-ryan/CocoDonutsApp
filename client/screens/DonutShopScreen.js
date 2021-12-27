import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Image } from 'react-native';
import { ItemCardPressable } from './../components/styles'


function DonutShopScreen() {
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.listingContainer}>
                    <ItemCard itemName='Apple Fritter' imgSrc={require('../assets/donuts/apple-fritter.jpg')} pointCost={5}/>
                    <ItemCard itemName='Bavarian Cream Filled' imgSrc={require('../assets/donuts/bavarian-cream-filled.jpg')} pointCost={5}/>
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
                    <ItemCard itemName='Mochi Sugar' imgSrc={require('../assets/donuts/apple-fritter.jpg')} pointCost={5}/>

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

const ItemCard = ({itemName, imgSrc, pointCost}) => {
    return (
        <ItemCardPressable>
            <Image
                style={styles.itemImage}
                source={imgSrc}
            />
            <Text style={styles.itemText}>{itemName} </Text>
            {/* <Text> {pointCost} pts </Text> */}
        </ItemCardPressable>
    )
}

const styles = StyleSheet.create({
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

    }
})

export default DonutShopScreen;