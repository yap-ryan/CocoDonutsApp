import React from 'react';
import { useState, useContext } from 'react';
import { StyleSheet, Modal, Pressable, View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { Colors } from './../components/styles';
import items from '../items.json'
import requireImgSrc from '../itemImgSrcHelper'
import { CredentialsContext } from '../components/CredentialsContext';

const { brand, secondaryTextColor } = Colors;

/**
 *  This screen should list out all of the customer's coupons
 */
function CouponScreen() {

    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)
    const [popUpVisible, setPopUpVisible] = useState(false)

    // qrCode is an array where index 0 = code to display as QR code & index 1 = coupon ID
    const [qrCode, setQrCode] = useState(["",""])
    const [selectedItem, setSelectedItem] = useState("")
    const testCouponCodeList = ["0#0#0#ABC123","5#50#0#0", "20#50#2022-10-05T07:00:00.000Z#0"]
    const couponList = storedCredentials.coupons

    return (
        <ScrollView >
            <QrCodePopUp qrCode={qrCode} selectedItem={selectedItem} popUpVisible={popUpVisible} setPopUpVisible={setPopUpVisible}/>
            <View style={styles.listingContainer}>
                {couponList.map((code, index) => displayCoupon(code, index, popUpVisible, setPopUpVisible, setQrCode, setSelectedItem))}
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
 *    'C': Expiration Date in ISO 8601 format ('0' if no expiration date)
 *    'D': Coupon ID (Unqiue to the user) 
 *    '#': Seperator
 * 
 */
const displayCoupon = (couponCode, index, popUpVisible, setPopUpVisible, setQrCode, setSelectedItem) => {
    const data = couponCode.split("#")
    const itemID = parseInt(data[0])
    const discount = parseInt(data[1])
    const expDate = data[2]
    const couponID = data[3]

    // Look through all donuts for itemID match
    for (let i in items.donuts) {
        if (items.donuts[i].id == itemID) {
            return (
                <CouponCard 
                    key={index}
                    itemID={itemID} 
                    discount={discount} 
                    expDate={expDate} 
                    couponID={couponID}
                    itemName={items.donuts[i].name} 
                    couponCode={couponCode}
                    popUpVisible={popUpVisible}
                    setPopUpVisible={setPopUpVisible}
                    setQrCode={setQrCode}
                    setSelectedItem={setSelectedItem}
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
                    expDate={expDate} 
                    couponID={couponID}
                    itemName={items.coffee[j].name} 
                    couponCode={couponCode}
                    popUpVisible={popUpVisible}
                    setPopUpVisible={setPopUpVisible}
                    setQrCode={setQrCode}
                    setSelectedItem={setSelectedItem}
                />
            )
        }
    }
    return (
        <Text> Error displaying coupon </Text>
    )  
}

// Component for pop up that displays a coupon's QR Code
const QrCodePopUp = ({qrCode, selectedItem, popUpVisible, setPopUpVisible}) => {
    const logoImg = require('../assets/cocorounded.png');

    return (
        <Modal
            visible={popUpVisible}
            animationType="slide"
            statusBarTranslucent={true}
            transparent={true}
            onRequestClose={() => {
                setPopUpVisible(!popUpVisible);
            }}
        >
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalHeader}>Show to Cashier</Text>
                <Text style={styles.modalText}> {selectedItem}</Text>
                <QRCode value={qrCode[0]} logo={logoImg} size={190}/>
                <Text style={styles.modalCodeText}>Code: {qrCode[1]}</Text>
                <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setPopUpVisible(!popUpVisible)}
                >
                <Text style={styles.textStyle}>Close QR Code</Text>
                </Pressable>
            </View>
            </View>
        </Modal>
    )
}


/**
 *  Coupon display component
 */
const CouponCard = ({itemID, discount, expDate, couponID, itemName, couponCode, popUpVisible, setPopUpVisible, setQrCode, setSelectedItem}) => {

    const handleCardPress = () => {
        setPopUpVisible(true) 
        setQrCode([couponCode,couponID])
        setSelectedItem(itemName)
    }

    return (
        <TouchableOpacity style={styles.couponCard} onPress={() => handleCardPress()}>
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
        height: 25,
        width: 130,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
    },
    couponExpiryText: {
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
        color: '#9c9895'
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 15,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "85%"
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonClose: {
        backgroundColor: brand,
      },
      textStyle: {
        color: "white",
        fontFamily: 'DMSans-Regular',
        textAlign: "center"
      },
      modalCodeText: {
        fontSize: 18,
        marginVertical: 15,
        fontFamily: 'DMSans-Medium',
        textAlign: "center"
      },
      modalHeader: {
        marginBottom: 5,
        fontFamily: 'DMSans-Bold',
        textAlign: "center",
        fontSize: 18

      },
      modalText: {
        marginBottom: 20,
        fontFamily: 'DMSans-Regular',
        textAlign: "center",
        fontSize: 16
        
      }
})

export default CouponScreen;