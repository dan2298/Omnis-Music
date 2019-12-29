import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Header = (props) => {
    return (
        <View style={styles.container}>
            {props.goBack ?
                <TouchableOpacity onPress={props.goBack}>
                    <MaterialIcons name='keyboard-arrow-down' size={36} style={styles.back}></MaterialIcons>
                </TouchableOpacity>
                :
                <View style={{ width: 36 }}></View>
            }
            <Text style={styles.title}>{props.title}</Text>
            {props.navigate ?
                <TouchableOpacity onPress={() => props.navigate("Queue", {
                    playback: props.playback,
                    onShufflePressed: props.onShufflePressed,
                    onBackward: props.onBackward,
                    onPlayPause: props.onPlayPause,
                    onForward: props.onForward,
                    onLoopPressed: props.onLoopPressed,
                })}>
                    <MaterialIcons name='list' size={32} style={styles.list}></MaterialIcons>
                </TouchableOpacity> :
                <View style={{ width: 32 }}></View>}
        </View>
    );
}

export default Header;

Header.navigationOptions = () => ({
    Downloads: 'Downloads'
})


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: 'black',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: "#2b2b2b",
        borderBottomWidth: 1
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    back: {
        color: "white",
        marginLeft: 5,
        marginTop: 6
    },
    list: {
        color: "white",
        marginRight: 5,
        marginTop: 6
    },
})