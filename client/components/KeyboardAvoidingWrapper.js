import React from 'react';

// keyboard avoiding view
import { KeyboardAvoidingView, Keyboard, ScrollView, TouchableWithoutFeedback } from 'react-native';

//colors
import { Colors } from './../components/styles';
const { primary } = Colors;

const KeyboardAvoidingWrapper = ({ withoutScroll, children }) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: primary }}>
      { withoutScroll ? 
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
          :
          <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
          </ScrollView>
      }
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingWrapper;