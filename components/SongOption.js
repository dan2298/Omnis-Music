import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SongOption = ({ name, iconName, navigate, song, action, back, goBack}) => (
    <TouchableOpacity style={styles.container} onPress={() => { 
        if (navigate) {
            navigate('PlaylistSelector', { song })
        } else {
            action(song)
            if (back) {
                goBack();
            }
        }
    }}>
        {iconName === 'remove-circle-outline' || iconName === 'queue-music' ?
            <MaterialIcons name={iconName} size={24} style={{ alignItems: 'center', color:'white', marginLeft: '5%'}}></MaterialIcons>:
            <MaterialCommunityIcons name={iconName} size={24} style={{ alignItems: 'center', color:'white', marginLeft: '5%'}}></MaterialCommunityIcons>
        } 
        <View style={styles.textContainer}>
                <View style={{paddingRight: '12%'}}>
                    <Text numberOfLines={1} style={styles.text}>{name}</Text>
                </View>
        </View>
    </TouchableOpacity>
);

export default SongOption;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row", 
        alignItems: 'center',
        margin: '2%',
        marginBottom: '3%'
    },
    textContainer: {
        borderBottomWidth: .3,
        borderBottomColor: 'rgba(75,75,75,0.25)'
    },
    text: {
        color:'rgba(250,250,250,0.9)',
        fontSize: 18, 
        margin: '6%',
        marginLeft: '10%',
        marginBottom: '8%',
        fontWeight: '400'
    }
});