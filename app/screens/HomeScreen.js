import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text> HOME SCREEN </Text>
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

export default HomeScreen;