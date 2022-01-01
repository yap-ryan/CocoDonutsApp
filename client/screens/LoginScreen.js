// Thirdy party imports
import React from 'react';
import { Button, StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import { Ionicons } from 'react-native-vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';


import { CredentialsContext } from '../components/CredentialsContext';
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
    Colors,
  } from './../components/styles';

const { darkLight, brand } = Colors;

function LoginScreen({ navigation }) {

    const [message, setMessage] = React.useState();
    const [messageType, setMessageType] = React.useState()
    const [hidePassword, setHidePassword] = React.useState(true);
    const {setStoredCredentials} = React.useContext(CredentialsContext)

    const handleLogin = async (credentials, setSubmitting) => {
        handleMessage(null) //Clear message

        const url = 'https://coco-donuts-heroku.herokuapp.com/users/login'
        try {
          const resp = await axios.post(url, credentials)

          const result = resp.data
          const {message, status, data} = result

          if (status !== 'SUCCESS') {
            console.log('FAILED TO LOGGED IN')
            handleMessage(message, status)
          } else {
            console.log('LOGGED IN with credentials: ' + JSON.stringify({...data}) + '\n')
            presistLogin({...data}, message, status)
          }
          setSubmitting(false)
        } catch (err) {
          setSubmitting(false)
          handleMessage('An error occured connecting. Check your network and try again.')
          console.error(err)
        }
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message)
        setMessageType(type)
      }

    const presistLogin = async (credentials, message, status) => {
      try {
        await AsyncStorage.setItem('cocoAppCredentials',JSON.stringify(credentials))
        handleMessage(message, status)
        setStoredCredentials(credentials)
      } catch (err) {
        console.error(err)
        handleMessage('Persisting login failed')
      }
    }

    return (
        <KeyboardAvoidingWrapper>
        <StyledContainer>
        <InnerContainer>
            <Formik 
              initialValues={{ email: '', password: '' }}
              onSubmit={(values, { setSubmitting }) => {
                if (values.email == '' || values.password == '') {
                    handleMessage('Please fill in all fields')
                    setSubmitting(false)
                } else {
                    handleLogin(values, setSubmitting)
                }
               }}
            >
                {({ handleChange, handleBlur, handleSubmit, isSubmitting, values }) => ( 
                <StyledFormArea>
                    <MyTextInput
                        placeholder="Email"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        icon="mail-outline"
                        autoCapitalize='none'
                    />

                    <MyTextInput
                        placeholder="Password"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry={hidePassword}
                        icon="lock-closed-outline"
                        isPassword={true}
                        hidePassword={hidePassword}
                        setHidePassword={setHidePassword}
                    />
                    
                    <MsgBox style={{ fontFamily: 'DMSans-Regular' }} type={messageType}>{message}</MsgBox>

                    {!isSubmitting && (
                      <StyledButton onPress={handleSubmit}>
                        <ButtonText style={styles.text}>
                            Submit
                        </ButtonText>
                    </StyledButton>
                    )}
                    {isSubmitting && (
                        <StyledButton disabled={true}>
                            <ActivityIndicator size="large" animating={true} color={brand} />
                        </StyledButton>
                    )}
                    
                    <Line />
                    <ExtraView>
                        <ExtraText style={styles.smallText}>Don't have an account? </ExtraText>
                        <TextLink onPress={() => navigation.navigate('SignUpScreen')}>
                            <TextLinkContent style={styles.smallText}>Create Account</TextLinkContent>
                        </TextLink>
                    </ExtraView>
                </StyledFormArea>
                )}
            </Formik>
            <StatusBar style="dark" />
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
        {isPassword && (
          <RightIcon
            onPress={() => {
              setHidePassword(!hidePassword);
            }}
          >
            <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
          </RightIcon>
        )}
      </View>
    );
  };


const styles = StyleSheet.create({
    text: {
        fontFamily: 'DMSans-Medium',
        fontSize: 16
    },
    smallText: {
        fontFamily: 'DMSans-Regular',
        fontSize: 14
    }
})

export default LoginScreen;