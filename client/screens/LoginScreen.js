import React from 'react';
import { Button, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { Octicons, Ionicons } from 'react-native-vector-icons';

import { AuthContext } from '../components/AuthContext'
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

    const [hidePassword, setHidePassword] = React.useState(true);
    const { logIn } = React.useContext(AuthContext)

    return (
        <KeyboardAvoidingWrapper>
        <StyledContainer>
        <InnerContainer>
            <Formik 
              initialValues={{ email: '', password: '' }}
              onSubmit={values => console.log(values)}
              >
                {({ handleChange, handleBlur, handleSubmit, values }) => ( 
                <StyledFormArea>
                    <MyTextInput
                        placeholder="Email"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        icon="mail"
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
                    
                    <View style={{paddingTop: 20}} > 
                        {/* TODO: handleSubmit HERE */}
                        <StyledButton onPress={() => logIn()}>
                            <ButtonText style={styles.text}>
                                Submit
                            </ButtonText>
                        </StyledButton>
                    </View>
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
        </InnerContainer>
        </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
}

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
      <View>
        <LeftIcon>
          <Octicons name={icon} size={30} color={'black'} />
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