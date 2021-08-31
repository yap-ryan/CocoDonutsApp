import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios'
import { Octicons, Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';



import { CredentialsContext } from '../components/CredentialsContext';
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';
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

const { darkLight, brand } = Colors;

function SignUpScreen({ navigation }) {

    const [hidePassword, setHidePassword] = React.useState(true)
    const [message, setMessage] = React.useState();
    const [messageType, setMessageType] = React.useState()
    const {setStoredCredentials} = React.useContext(CredentialsContext)


    // TODO: Function to handle signup (talk to backend)
    const handleSignup = async (credentials, setSubmitting) => {
        handleMessage(null) //Clear message

        const url = 'https://coco-donuts-heroku.herokuapp.com/users/signup'
        try {
          const resp = await axios.post(url, credentials)

          const result = resp.data
          const {message, status, data} = result

          if (status !== 'SUCCESS') {
            console.log('FAILED TO SIGN UP')
            handleMessage(message, status)
          } else {
            console.log('SIGNED UP with credentials: ' + JSON.stringify(resp.data))
            presistLogin({...data}, message, status)
          }
          setSubmitting(false)
        } catch (err) {
          setSubmitting(false)
          handleMessage('An error occured connecting. Check your network and try again.')
          console.error(err)
        }

    }

    // Function to change message state (if there is a message, it will be displayed)
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
        initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
        onSubmit={(values, { setSubmitting }) => {
            values = { ...values};
            if (
              values.email == '' ||
              values.password == '' ||
              values.name == '' ||
              values.confirmPassword == ''
            ) {
              handleMessage('Please fill in all fields')
              setSubmitting(false)
            } else if (values.password !== values.confirmPassword) {
              handleMessage('Passwords do not match')
              setSubmitting(false)
            } else {
              handleSignup(values, setSubmitting)
            }
          }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
          <StyledFormArea>
            <MyTextInput
              placeholder="Name"
              placeholderTextColor={darkLight}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              icon="person"
            />
            <MyTextInput
              placeholder="Email"
              placeholderTextColor={darkLight}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              icon="mail"
              autoCapitalize='none'
            />
            <MyTextInput
              placeholder="Password"
              placeholderTextColor={darkLight}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry={hidePassword}
              icon="lock"
              isPassword={true}
              hidePassword={hidePassword}
              setHidePassword={setHidePassword}
            />
            <MyTextInput
              placeholder="Confirm Password"
              placeholderTextColor={darkLight}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              secureTextEntry={hidePassword}
              icon="lock"
              isPassword={true}
              hidePassword={hidePassword}
              setHidePassword={setHidePassword}
            />
            <MsgBox style={{ fontFamily: 'DMSans-Regular' }} type={messageType}>{message}</MsgBox>

            {!isSubmitting && (
              <StyledButton onPress={handleSubmit}>
                <ButtonText style={styles.text}>Submit</ButtonText>
              </StyledButton>
            )}
            {isSubmitting && (
              <StyledButton disabled={true}>
                <ActivityIndicator size="large" color={brand} />
              </StyledButton>
            )}

            <Line />
            <ExtraView>
              <ExtraText style={styles.smallText}>Already have an account? </ExtraText>
              <TextLink onPress={() => navigation.navigate('LoginScreen')}>
                <TextLinkContent style={styles.smallText}>Login</TextLinkContent>
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
          <Octicons name={icon} size={30} color='black' />
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
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    text: {
        fontFamily: 'DMSans-Medium',
        fontSize: 16
    },
    smallText: {
        fontFamily: 'DMSans-Regular',
        fontSize: 14
    },
})

export default SignUpScreen;