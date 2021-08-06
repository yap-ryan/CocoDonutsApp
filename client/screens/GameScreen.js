import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


function GameScreen() {
    return (
        <View style={styles.container}>
            <Text> GAME SCREEN </Text>
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

export default GameScreen;