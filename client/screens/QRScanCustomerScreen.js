import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { CustomerInfoContext } from '../components/CustomerInfoContext';
import {
    StyledButton,
    ButtonText,
    Colors
} from './../components/styles';
const { secondaryTextColor, secondaryButtonColor, darkLight, brand } = Colors;


export default function QRScanCustomerScreen() {

    const [hasPermission, setHasPermission] = useState(null)
    const [scanned, setScanned] = useState(false)
    const [text, setText] = useState('')
    const {customerInfo, setCustomerInfo} = React.useContext(CustomerInfoContext)

    const askForCameraPermission = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync()
        setHasPermission(status == 'granted')
    }

    // Request Camera Permission
    useEffect(() => {
        askForCameraPermission()
    },[])

    // What happens when any bar code is scanned
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true)
        
        
        // ............ CODE HERE

        setText(data)
        console.log('Type: ' + type + '\nData: ' + data)
    }

    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}> Requesting camera permission </Text>
            </View>
        )
    } else if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={[styles.text, {margin: 15}]}> No access to camera </Text>
                <StyledButton onPress={() => askForCameraPermission()}>
                    <ButtonText>Allow Camera</ButtonText>
                </StyledButton>
            </View>
        )
    }

    return (
        <View style={styles.container}>

            <View style={styles.barcodebox}>
                <BarCodeScanner 
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                    style={{ height: 400, width: 400 }}
                    />
            </View>
            <Text style={styles.maintext}>{text}</Text>

            <View style={styles.scanAgainContainer}>
                {scanned &&
                    <StyledButton onPress={() => setScanned(false)} color='tomato' >
                        <ButtonText>Scan Again</ButtonText>
                    </StyledButton>
                }
            </View>
            
            
            {/* <StyledButton onPress={() => setHasPermission(false)}>
                <ButtonText>Disallow Camera</ButtonText>
            </StyledButton> */}
        </View>
    );
}

const styles = StyleSheet.create({
    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 20,
        backgroundColor: 'tomato'
      },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    maintext: {
        fontFamily: 'DMSans-Regular',
        fontSize: 16,
        margin: 20,
    },
    text: {
        fontFamily: 'DMSans-Regular',
        fontSize: 16
    },
    scanAgainContainer: {
        height: 100,
        width: '50%'
    }


})

