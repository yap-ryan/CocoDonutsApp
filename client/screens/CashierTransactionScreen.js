import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { CustomerInfoContext } from '../components/CustomerInfoContext';
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

export default function CashierTransactionScreen() {

    const {customerInfo, setCustomerInfo} = React.useContext(CustomerInfoContext)

    return (
        <StyledContainer>
                <Text>Add Points:</Text>
                <StyledButton onPress={() => console.log('temp')} style={[styles.button, {backgroundColor: secondaryButtonColor}]}>
                    <ButtonText style={styles.secondaryText}>Add Points</ButtonText>
                </StyledButton>


                <Text>Coupon Code:</Text>


        </StyledContainer>
    );
}

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
    },
    secondaryText: {
        fontFamily: 'DMSans-Regular',
        fontSize: 17,
        color: secondaryTextColor
    },
})

