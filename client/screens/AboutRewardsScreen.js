import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


export default function AboutRewardsScreen() {
    return (
        <View style={styles.container}>
            <Text> Info About Rewards System </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }

})

