import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from 'react-native-vector-icons';



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
function CashierHomeScreen() {

    const [searchBy, setSearchBy] = React.useState('phone')
    const [inputField, setInputField] = React.useState('')

    // Holds current customer info: name, birthday, points, coupons (INCLUDE EMAIL/PHONE? prob not)
    const [customerInfo, setCustomerInfo] = React.useState(null)

    return (
        <KeyboardAvoidingWrapper>
        <StyledContainer>
        <InnerContainer>
            <View style={styles.container}>

                <View style={[styles.rowContainer, { width: '78%' }]}>
                    <MyTextInput
                        label="Customer Identification"
                        placeholder="example@gmail.com"
                        placeholderTextColor={darkLight}
                        onChangeText={(text) => setInputField(text)}
                        value={inputField}
                        keyboardType={searchBy === 'phone' ? 'phone-pad':''}
                        icon="person-outline"
                        autoCapitalize='none'
                        style={styles.textInput}
                    />
                    
                    <View style={{ width: 6 }}/>

                    <StyledButton onPress={() => navigation.push('DonutShop')} style={[styles.button, {backgroundColor: brand, top: 5}]}>
                        <Icon name="arrow-forward" size={30} color={'white'}/>
                        {/* <ButtonText style={styles.secondaryText}>Search</ButtonText> */}
                    </StyledButton>      
                </View>

                <View style={{ height: 22 }}/>

                <View style={[styles.rowContainer, {alignSelf: 'flex-start'}]}>
                    <View style={styles.searchByContainer}>
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

                <View style={{ height: 145 }}/>

                <StyledButton onPress={() => navigation.push('CoffeeShop')} style={[styles.button, {backgroundColor: secondaryButtonColor}]}>
                    <View style={styles.rowContainer}>
                        <Icon name="qr-code" size={35} color={secondaryTextColor} style={styles.icon}/>
                        <ButtonText style={styles.secondaryText}>Scan QR Code</ButtonText>
                    </View>
                </StyledButton>
            </View>

        </InnerContainer> 
        </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
}

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
      <View>
        <LeftIcon>
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
        height: 60
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 225
    },
    icon: {
        marginRight: 14,
        marginLeft: 7
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
    },
    searchByContainer: {
        marginVertical: 5,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: secondaryButtonColor,
        borderRadius: 5,
        height: 60,
        width: '85%'
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
        paddingHorizontal: 15,
        marginLeft: 6
    },
    searchByUnselected: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        height: 45,
        paddingHorizontal: 15,
        marginLeft: 6

    },
    secondaryText: {
        fontFamily: 'DMSans-Regular',
        fontSize: 17,
        color: secondaryTextColor
    },
    textInput: {
        paddingRight: 20
    }
})

export default CashierHomeScreen;