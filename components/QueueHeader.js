import React from 'react';

import { View, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native';

const QueueHeader = ({ message, onDownPress, onMessagePress }) => (
  <View style={styles.container}>
        <TouchableOpacity style={{paddingRight: '12%'}} onPress={onDownPress}>
            <Image style={styles.button}
                source={require('../img/ic_keyboard_arrow_down_white.png')} />
        </TouchableOpacity>
        <Text onPress={onMessagePress} style={styles.message} ellipsizeMode='tail' numberOfLines={1}>{message}</Text>
        <TouchableOpacity style={{paddingLeft:'12%'}} onPress={() => { onQueuePress('Queue') }}>
            <View style={{width: 24}}></View>
        </TouchableOpacity>
  </View>
);

export default QueueHeader;

const styles = StyleSheet.create({
    container: {
        height: 72,
        paddingTop: 20,
        paddingLeft: 18,
        paddingRight: 18,
        flexDirection: 'row',
        marginTop: '9%'
    },
    message: {
        flex: 1,
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.90)',
        fontWeight: 'bold',
        fontSize: 16,
    },
    button: {
        opacity: 0.85
    }
});