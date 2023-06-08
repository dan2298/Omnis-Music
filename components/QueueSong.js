import React from 'react';

import { View, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const QueueSong = (props) => (
  <View style={styles.container}>
    <TouchableOpacity style={{ margin: '2%' , paddingRight: '4%'}}>
        <Entypo name='circle' size={20} color={'rgba(255,255,255,0.25)'}></Entypo>
    </TouchableOpacity>
    <View style={styles.subContainer}>
        <Text numberOfLines={1} style={styles.message}>{props.name}</Text>
        <Text numberOfLines={1} style={styles.subText}>{props.artist}</Text>
    </View>
  </View>
);

export default QueueSong;

const styles = StyleSheet.create({
    container: {
        paddingTop: 12,
        paddingBottom: 12,
        flexDirection: 'row',
        borderColor: 'rgba(60,60,60, .5)',
        borderBottomWidth: .50,
        padding: 18, 
    },
    subContainer: {
        // flex: 1,
        flexDirection: 'column'
    },
    message: {
        // flex: 1,
        color: 'rgba(255, 255, 255, 0.90)',
        fontWeight: 'bold',
        fontSize: 16,
        paddingRight: '15%'
    },
    subText: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontWeight: 'bold',
        fontSize: 12
    }
});