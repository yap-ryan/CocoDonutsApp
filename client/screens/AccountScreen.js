import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
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

const { secondaryTextColor, secondaryButtonColor, brand, darkLight } = Colors;

function AccountScreen() {

    const [message, setMessage] = React.useState()
    const [messageType, setMessageType] = React.useState()
    const { storedCredentials, setStoredCredentials } = React.useContext(CredentialsContext)

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

        const url = `https://coco-donuts-heroku.herokuapp.com/users/${storedCredentials.id}`

        try {
            const resp = await axios.patch(url, changedCredentials)
            const result = resp.data
            const {msg, status, data} = result

            if (status !== 'SUCCESS') {
                console.log('UPDATE FAILED')
                handleMessage(msg, status)
            } else {
                console.log('UPDATE SUCCESSFUL new credentials: ' + JSON.stringify(data))
                presistLogin({...data}, msg, status)
            }


            setSubmitting(false)

        } catch (err) {
            setSubmitting(false)
            handleMessage('Connection error. Check your network and try again.')
            console.error(err)
        }
        

    }

    // Function to change message and messageType state (if there is a message, it will be displayed)
    const handleMessage = (msg, type = 'FAILED') => {
        setMessage(msg)
        setMessageType(type)
    }

    const presistLogin = async (credentials, msg, status) => {
        try {
            await AsyncStorage.setItem('cocoAppCredentials',JSON.stringify(credentials))
            handleMessage(msg, status)
            setStoredCredentials(credentials)
        } catch (err) {
            console.error(err)
            handleMessage('Persisting login failed')
        }
    }

    return (
        <KeyboardAvoidingWrapper>
            <View style={styles.container}>

            <Text>Account Info</Text>

            <Formik
                initialValues={ storedCredentials ?
                                { name: storedCredentials.name, 
                                email: storedCredentials.email, 
                                phone: storedCredentials.phone, 
                                birthday: storedCredentials.birthday} :
                                { name: '', 
                                    email: '', 
                                    phone: '', 
                                    birthday: ''}}
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
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                <StyledFormArea>
                    <MyTextInput
                        label="Name"
                        placeholder="Name"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        icon="person-outline"
                    />
                    <MyTextInput
                        label="Email"
                        placeholder="Email"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        keyboardType="email-address"
                        icon="mail-outline"
                        autoCapitalize='none'
                    />
                    <MyTextInput
                        label="Phone Number"
                        placeholder="Phone Number"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                        value={values.phone}
                        keyboardType="phone-pad"
                        icon="call-outline"
                        autoCapitalize='none'
                    />
                    <MyTextInput
                        label="Birthday (Cannot Change)"
                        placeholder="Birthday"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('birthday')}
                        onBlur={handleBlur('birthday')}
                        value={dob ? dob.toDateString() : ''}
                        icon="calendar-outline"
                        editable={false}
                        isDate={true}
                    />
                    <MsgBox style={{ fontFamily: 'DMSans-Regular' }} type={messageType}>{message}</MsgBox>

                    {!isSubmitting && (
                    <StyledButton onPress={handleSubmit}>
                        <ButtonText style={styles.text}>Save Changes</ButtonText>
                    </StyledButton>
                    )}
                    {isSubmitting && (
                    <StyledButton disabled={true}>
                        <ActivityIndicator size="large" color={brand} />
                    </StyledButton>
                    )}

                    <Line />
                </StyledFormArea>
            )}
            </Formik>

            <StyledButton onPress={() => clearCredentialsOnLogout()} style={styles.signOutButton}>
                <ButtonText style={styles.secondaryText}>Log Out</ButtonText>
            </StyledButton>

            </View> 
        </KeyboardAvoidingWrapper>
    );
}

const MyTextInput = ({ label, icon, isPassword, hidePassword, isDate, ...props }) => {
    return (
      <View style={{ marginTop: 6, marginBottom: 6 }}>
        <LeftIcon top={33}>
          {/* <Octicons name={icon} size={30} color='black' /> */}
          <Ionicons name={icon} size={30} color='black' />
        </LeftIcon>
        <StyledInputLabel>{label}</StyledInputLabel>

        <StyledTextInput {...props} />

      </View>
    )
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
        backgroundColor: secondaryButtonColor
    },
    text: {
        fontFamily: 'DMSans-Medium',
        fontSize: 16
    },
    secondaryText: {
        fontFamily: 'DMSans-Medium',
        fontSize: 16,
        color: secondaryTextColor
    }

})

export default AccountScreen;