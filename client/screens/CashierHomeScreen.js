import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from 'react-native-vector-icons';
import axios from 'axios';

import {HEROKU_BASE_URL} from '@env'
import { CustomerInfoContext } from '../components/CustomerInfoContext';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import {
    StyledContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledInputLabel,
    StyledFormArea,
    StyledButton,
    StyledTextInput,
    LeftIcon,
    RightIcon,
    InnerContainer,
    ButtonText,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent,
    Colors
} from './../components/styles';

const { secondaryTextColor, secondaryButtonColor, darkLight, brand } = Colors;


/**
 * 
 *  TODO: 
 *  - Text Input field for email/phone #
 *  - "Find user" button to submit input field (WILL SEARCH by email/phone based on searchBy state)
 *  - "Search By" Selector to choose 'email' or 'phone'  
 *  - Button to navigate to Scan customer QR Code screen 
 * 
 *  */ 
function CashierHomeScreen({ navigation }) {

    const [searchBy, setSearchBy] = React.useState('phone')
    const [inputField, setInputField] = React.useState('')
    const [isSubmitting, setSubmitting] = React.useState(false)
    const [message, setMessage] = React.useState();
    const [messageType, setMessageType] = React.useState()
    const {customerInfo, setCustomerInfo} = React.useContext(CustomerInfoContext)

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message)
        setMessageType(type)
    }

    const handleSearch = async () => {
        setSubmitting(true)
        handleMessage(null) //Clear message
        
        let url = HEROKU_BASE_URL + '/users'

        if (searchBy === 'phone') {
            url = url + '/phone/' + inputField
        } else {
            url = url + '/email/' + inputField
        }

        try {
            
            const resp = await axios.get(url)
  
            const result = resp.data
            const {message, status, data} = result
  
            if (status !== 'SUCCESS') {
                console.log("Failed to find customer")
                console.log(message)
                handleMessage(message, status)

            } else {
                setCustomerInfo(data)
                navigation.push('CashierTransactionScreen')
            }

            setSubmitting(false)

        } catch (err) {
            console.error(err)
            handleMessage('A connection error occured. Check network.')
        }

    }

    return (
        <CustomerInfoContext.Provider value={{customerInfo, setCustomerInfo}}>
        <KeyboardAvoidingWrapper withoutScroll={true}>
        <StyledContainer>
            <View style={styles.container}>

                <Text style={styles.title}> Customer Identification </Text>
                
                <View style={{ height: 5 }} />
                    <Line style={{width: '90%'}}/>
                <View style={{ height: 60 }} />


                <StyledButton onPress={() => navigation.push('QRScanCustomerScreen')} style={[styles.button, {backgroundColor: secondaryButtonColor}]}>
                    <View style={styles.rowContainer}>
                        <Icon name="qr-code" size={35} color={secondaryTextColor} style={styles.icon}/>
                        <ButtonText style={styles.secondaryText}>Scan QR Code</ButtonText>
                    </View>
                </StyledButton>

                <View style={{ height: 50 }} />
                    <Text style={[styles.secondaryText, {fontSize: 18}]}> - OR - </Text>
                <View style={{ height: 65 }}/>

                <View style={styles.searchContainerOuter}>
                    <View style={styles.rowContainer}>
                        <View style={styles.textInputContainer}>
                            {searchBy === 'phone' ? 
                                <CustomTextInput
                                    label="Customer Search"
                                    placeholder="example@gmail.com"
                                    placeholderTextColor={darkLight}
                                    onChangeText={(text) => setInputField(text)}
                                    value={inputField}
                                    keyboardType={'phone-pad'}
                                    icon="person-outline"
                                    autoCapitalize='none'
                                    style={styles.textInput}
                                />
                                :
                                <CustomTextInput
                                    label="Customer Search"
                                    placeholder="example@gmail.com"
                                    placeholderTextColor={darkLight}
                                    onChangeText={(text) => setInputField(text)}
                                    value={inputField}
                                    icon="person-outline"
                                    autoCapitalize='none'
                                    style={styles.textInput}
                                />
                            }
                        </View>
                        {!isSubmitting && (
                            <StyledButton onPress={() => handleSearch()} style={[styles.button, {backgroundColor: brand, top: 5.5}]}>
                                <Icon name="arrow-forward" size={30} color={'white'}/>
                                {/* <ButtonText style={styles.secondaryText}>Search</ButtonText> */}
                            </StyledButton>   
                        )}
                        {isSubmitting && (
                            <StyledButton disabled={true} style={[styles.button, {backgroundColor: brand, top: 5.5}]}>
                                <ActivityIndicator size="large" animating={true} color="white" />
                            </StyledButton>
                        )}
   
                    </View>

                    <View style={{ height: 22 }}/>

                    <View style={[styles.rowContainer]}>
                        <View style={[styles.searchByContainer]}>
                            <View style={styles.searchByInitialContainer}>
                                <ButtonText style={styles.secondaryText}>Search by:</ButtonText>
                            </View>
                            <TouchableOpacity style={ searchBy === 'phone' ? styles.searchBySelected : styles.searchByUnselected} onPress={() => setSearchBy('phone')}>
                                <ButtonText style={styles.secondaryText}>Phone</ButtonText>
                            </TouchableOpacity>
                            <TouchableOpacity style={ searchBy === 'email' ? styles.searchBySelected : styles.searchByUnselected} onPress={() => setSearchBy('email')}>
                                <ButtonText style={styles.secondaryText}>Email</ButtonText>
                            </TouchableOpacity>
                        </View>   
                    </View>
                    <View style={{ height: 18 }}/>

                    <MsgBox type={messageType}>{message}</MsgBox>    

                </View>
            </View>

        </StyledContainer>
        </KeyboardAvoidingWrapper>
        </CustomerInfoContext.Provider>
    );
}

const CustomTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
      <View>
        <LeftIcon style={{top:36}}>
          <Ionicons name={icon} size={30} color='black' />
        </LeftIcon>
        <StyledInputLabel>{label}</StyledInputLabel>
        <StyledTextInput {...props} />
      </View>
    );
  };

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#feadd6',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        marginHorizontal: 0
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 80
    },
    icon: {
        marginRight: 14,
        marginLeft: 7
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: '100%'
    },
    searchContainerOuter: {
        width: '88%'
    },
    searchByContainer: {
        marginVertical: 5,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: secondaryButtonColor,
        borderRadius: 5,
        height: 60,
        width: '100%'
    },
    searchByInitialContainer: {
        paddingHorizontal: 10
    },
    searchBySelected: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        height: 45,
        paddingHorizontal: '7%',
        marginLeft: 6
    },
    searchByUnselected: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        height: 45,
        paddingHorizontal: '7%',
        marginLeft: 6
    },
    secondaryText: {
        fontFamily: 'DMSans-Regular',
        fontSize: 17,
        color: secondaryTextColor
    },
    textInput: {
        paddingRight: 20,
        marginRight: 5
    },
    textInputContainer: {
        width: '82%'
    },
    title: {
        fontFamily: 'DMSans-Regular',
        fontSize: 20
    }
})

export default CashierHomeScreen;