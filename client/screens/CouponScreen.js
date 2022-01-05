import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from './../components/styles';
import items from '../items.json'
import requireImgSrc from '../itemImgSrcHelper'

const { brand, secondaryTextColor } = Colors;

/**
 *  This screen should list out all of the customer's coupons
 */
function CouponScreen() {

    const testCouponCodeList = ["0#0#123#0","5#50#123#0", "20#50#123#2022-10-05T07:00:00.000Z"]

    return (
        <ScrollView>
            <View style={styles.listingContainer}>
                {testCouponCodeList.map((code, index) => displayCoupon(code, index))}
            </View>
        </ScrollView>
    );
}

/**
 * 
 *    Takes in a coupon code and returns a CouponCard component with corresponding details
 * 
 *    COUPON CODE FORMAT:
 *    AA#BB#CCCCC#DDDDD
 *      
 *    'A': Item ID 
 *    'B': Percentage Discount represented by 1-2 digits (0-99 with 0 meaning 100% off)
 *    'C': User/Customer ID
 *    'D': Expiration Date in ISO 8601 format ('0' if no expiration date)
 *    '#': Seperator
 * 
 */
 const displayCoupon = (couponCode, index) => {
    const data = couponCode.split("#")
    const itemID = parseInt(data[0])
    const discount = parseInt(data[1])
    const userID = data[2]
    const expDate = data[3]

    // Look through all donuts for itemID match
    for (let i in items.donuts) {
        if (items.donuts[i].id == itemID) {
            return (
                <CouponCard 
                    key={index}
                    itemID={itemID} 
                    discount={discount} 
                    userID={userID} 
                    expDate={expDate} 
                    itemName={items.donuts[i].name} 
                    couponCode={couponCode}
                />
            )
        }
    }
    // Look through all coffee for itemID match
    for (let j in items.coffee) {
        if (items.coffee[j].id == itemID) {
            return (
                <CouponCard 
                    key={index}
                    itemID={itemID} 
                    discount={discount} 
                    userID={userID} 
                    expDate={expDate} 
                    itemName={items.coffee[j].name} 
                    couponCode={couponCode}
                />
            )
        }
    }
    return (
        <Text> Error displaying coupon </Text>
    )  
}

/**
 *  Coupon display component
 */
const CouponCard = ({itemID, discount, userID, expDate, itemName, couponCode}) => {
    return (
        <TouchableOpacity style={styles.couponCard}>
            <Image
                style={styles.couponImage}
                source={requireImgSrc(itemID)}
            />
            <View style={styles.couponTextContainer}>
                <View style={styles.couponDiscountTag}>
                    <Text style={styles.couponDiscountText}>
                        { 
                            discount == 0 
                            ? "Free Item"
                            : discount + "% Off"
                        }
                    </Text>
                </View>
                <Text style={styles.couponItemName}>
                    {itemName}
                </Text>
                {expDate == "0"
                        ?  <Text style={styles.couponExpiryText}>No Expiry </Text>
                        : <Text style={styles.couponExpiryText}>Use By: {parseISOString(expDate).toDateString()} </Text>
                    }
            </View>
            {/* <View style={styles.couponDiscountTag}>
                    {expDate == "0"
                        ? <Text style={styles.couponItemType}> Expires: {expDate} </Text>
                        : <Text style={styles.couponItemType}> No Expiry </Text>
                    }
            </View> */}
        </TouchableOpacity>
    )
}

function parseISOString(s) {
    let b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: 'white'
    },
    listingContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginHorizontal: '3%',
        marginVertical: 8
    },
    couponCard: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 135,
        borderRadius: 6,
        elevation: 2,
        alignItems: 'center',
        marginVertical: 6
    },
    couponImage: {
        height: 100,
        width: 100,
        marginHorizontal: 10
    },
    couponItemName: {
        fontSize: 16,
        fontFamily: 'DMSans-Regular',
        color: secondaryTextColor,
        marginTop: 2,
        marginBottom: 6
    },
    couponDiscountText: {
        fontSize: 16,
        fontFamily: 'DMSans-Medium',
        color: secondaryTextColor,
    },
    couponTextContainer: {
        height: 95,
        width: '60%',
    },
    couponDiscountTag: {
        backgroundColor: '#ffd4ea',
        height: 27,
        width: 130,
        borderRadius: 3,
        paddingVertical: 5,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 2.5
    },
    couponExpiryText: {
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
        color: '#9c9895'
    }
})

export default CouponScreen;