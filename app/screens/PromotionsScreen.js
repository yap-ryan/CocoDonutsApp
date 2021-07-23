import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


function PromotionsScreen() {
    return (
        <View style={styles.container}>
            <Text> PROMOTIONS SCREEN </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },

})

export default PromotionsScreen;