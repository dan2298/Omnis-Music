import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import FadeAnimation from '../components/FadeAnimation';

const DownloadAnim = props => {
    return (
        <FadeAnimation>
            <View style={styles.animation}>
                <Text>Hello!</Text>
            </View>
        </FadeAnimation>
    )
}

export default DownloadAnim;

const styles = StyleSheet.create({
    animation: {
        alignSelf: "center",
        backgroundColor: "white",
        height: 200,
        width: 200,
        position: "absolute",
        marginTop: 200
    }
})