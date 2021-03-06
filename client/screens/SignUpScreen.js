import { HEROKU_BASE_URL } from '@env'
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

import { StatusBar } from 'expo-status-bar';
// Datetimepicker
import DateTimePickerModal from 'react-native-modal-datetime-picker';

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

const { darkLight, brand, secondaryTextColor } = Colors;

function SignUpScreen({ navigation }) {

    const [hidePassword, setHidePassword] = React.useState(true)
    const [message, setMessage] = React.useState()
    const [messageType, setMessageType] = React.useState()
    const {setStoredCredentials} = React.useContext(CredentialsContext)

    // Date being displayed on DateTimePicker
    const [date, setDate] = React.useState(new Date());
    // State to show/hide date selector 
    const [show, setShow] = React.useState(false);
    // Actual Date of Birth value to be sent
    const [dob, setDob] = React.useState();

    // Handles when DateTimePicker changes
    const onConfirm = (selectedDate) => {
      const currentDate = selectedDate || date
      setShow(false)
      setDate(currentDate)
      setDob(currentDate)
    }

    const showDatePicker = () => {
      console.log("SHOW DATE PICKER")
      setShow(true)
    }

    // Function to handle signup (tell backend to record new user to backend)
    const handleSignup = async (credentials, setSubmitting) => {
        handleMessage(null) //Clear message

        const url = HEROKU_BASE_URL + '/users/signup'
        try {
          const resp = await axios.post(url, credentials)

          const result = resp.data
          const {message, status, data} = result

          if (status !== 'SUCCESS') {
            console.log('FAILED TO SIGN UP')
            handleMessage(message, status)
          } else {
            console.log('SIGNED UP with credentials: ' + JSON.stringify(data))
            presistLogin({...data}, message, status)
          }
          setSubmitting(false)
        } catch (err) {
          setSubmitting(false)
          handleMessage('Connection error. Check your network and try again.')
          console.error(err)
        }

    }

    // Function to change message state (if there is a message, it will be displayed)
    const handleMessage = (msg, type = 'FAILED') => {
      setMessage(msg)
      setMessageType(type)
    }

    const presistLogin = async (credentials, msg, status) => {
      try {
        // await AsyncStorage.setItem('cocoAppCredentials',JSON.stringify(credentials))
        await SecureStore.setItemAsync('cocoAppCredentials',JSON.stringify(credentials))

        handleMessage(msg, status)
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

      { show && 
        <DateTimePickerModal
          isVisible={true}
          date={date}
          mode="date"
          // is24Hour={true}
          onConfirm={onConfirm}
          onCancel={() => setShow(false)}
          // style={{
          //   width: 700
          // }}
        />
      }


      <Formik
        initialValues={{ name: '', email: '', phone: '', birthday: '', password: '', confirmPassword: '' }}
        onSubmit={(values, { setSubmitting }) => {
            values = { ...values, birthday: dob};
            if (
              values.name == '' ||
              values.email == '' ||
              values.phone == '' ||
              values.birthday == '' ||
              values.password == '' ||
              values.confirmPassword == ''
            ) {
              handleMessage('Please fill in all fields')
              setSubmitting(false)
            } else if (values.password !== values.confirmPassword) {
              handleMessage('Passwords do not match')
              setSubmitting(false)
            } else {
              console.log(dob)
              handleSignup(values, setSubmitting)
            }
          }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
          <StyledFormArea>
            <CustomTextInput
              placeholder="Name"
              placeholderTextColor={darkLight}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              icon="person-outline"
            />
            <CustomTextInput
              placeholder="Email"
              placeholderTextColor={darkLight}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              icon="mail-outline"
              autoCapitalize='none'
            />
            <CustomTextInput
              placeholder="Phone Number"
              placeholderTextColor={darkLight}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
              keyboardType="phone-pad"
              icon="call-outline"
              autoCapitalize='none'
            />
            <CustomTextInput
              placeholder="Birthday"
              placeholderTextColor={darkLight}
              onChangeText={handleChange('birthday')}
              onBlur={handleBlur('birthday')}
              value={dob ? dob.toDateString() : ''}
              icon="calendar-outline"
              editable={false}
              isDate={true}
              showDatePicker={showDatePicker}
            />
            <CustomTextInput
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
            <CustomTextInput
              placeholder="Confirm Password"
              placeholderTextColor={darkLight}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              secureTextEntry={hidePassword}
              icon="lock-closed-outline"
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

const CustomTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props }) => {
    return (
      <View style={{marginVertical: 4}}>
        <LeftIcon>
          <Ionicons name={icon} size={30} color='black' />
        </LeftIcon>
        {/* <StyledInputLabel>{label}</StyledInputLabel> */}

        {isDate ? (
          <TouchableOpacity onPress={showDatePicker}>
            <StyledTextInput onPressOut={showDatePicker} {...props} />
          </TouchableOpacity>
          ) : 
          <StyledTextInput {...props} />
        }        

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
        fontSize: 16,
    },
    smallText: {
        fontFamily: 'DMSans-Regular',
        fontSize: 14
    },
})

export default SignUpScreen;