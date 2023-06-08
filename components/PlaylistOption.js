import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native';

const PlaylistOption = ({ name }) => (
  <View style={styles.container}>
        <View style={{paddingRight: '12%'}}>
            <Text numberOfLines={1} style={styles.text}>{name}</Text>
        </View>
  </View>
);

export default PlaylistOption;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        borderBottomWidth: .3,
        borderBottomColor: 'rgba(75,75,75,0.25)'
    },
    text: {
        color:'rgba(250,250,250,0.9)',
        fontSize: 18, 
        margin: '7%',
        marginLeft: '20%',
        fontWeight: '500'
    }
});