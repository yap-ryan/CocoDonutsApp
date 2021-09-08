import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';

import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';
import { CredentialsContext } from '../components/CredentialsContext';
import {
    StyledContainer,
    PageTitle,
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
    SubTitle,
    Colors,
  } from './../components/styles';

const { secondaryTextColor, tertiary, brand } = Colors;

function AccountScreen() {

    const { setStoredCredentials } = React.useContext(CredentialsContext)

    // Date (of Birth)
    const [date, setDate] = React.useState(new Date(2000, 0, 1));
    // State to show/hide date selector 
    const [show, setShow] = React.useState(false);
    // Actual Date of Birth value to be sent
    const [dob, setDob] = React.useState();

    // Clear storedCredentials state and async storage on logout
    const clearCredentialsOnLogout = async () => {
        try {
            await AsyncStorage.removeItem('cocoAppCredentials')
            setStoredCredentials(null)
        } catch (err) {
            console.error(err)
        }
    }

    // TODO: MAKE THIS FUNCTION
    const handleUpdateAccount = async (changedCredentials, setSubmitting) => {

    }

    

    return (
        <KeyboardAvoidingWrapper>
            <View style={styles.container}>

            <Formik
                initialValues={{ name: '', email: '', phone: '', birthday: ''}}
                onSubmit={(values, { setSubmitting }) => {
                    values = { ...values, birthday: dob};
                    if (
                    values.name == '' ||
                    values.email == '' ||
                    values.phone == '' ||
                    values.birthday == ''
                    ) {
                    handleMessage('Please fill in all fields')
                    setSubmitting(false)
                    } else if (values.password !== values.confirmPassword) {
                    handleMessage('Passwords do not match')
                    setSubmitting(false)
                    } else {
                    console.log(dob)
                    handleUpdateAccount(values, setSubmitting)
                    }
                }}
            >

            </Formik>

            <StyledButton onPress={() => clearCredentialsOnLogout()} style={styles.signOutButton}>
                <ButtonText style={styles.text}>Log Out</ButtonText>
            </StyledButton>

            </View> 
        </KeyboardAvoidingWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 55,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    signOutButton: {
        width: '90%',
        backgroundColor: tertiary
    },
    text: {
        fontFamily: 'DMSans-Medium',
        fontSize: 16,
        color: secondaryTextColor
    }

})

export default AccountScreen;