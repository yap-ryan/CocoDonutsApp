import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


function CoffeeShopScreen() {
    return (
        <View style={styles.container}>
            <Text> Coffee </Text>
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

export default CoffeeShopScreen;