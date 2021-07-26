import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


function AboutRewardsScreen() {
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

export default AboutRewardsScreen;