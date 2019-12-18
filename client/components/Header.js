import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Header = (props) => {
    return (
        <View style={styles.container}>
            {props.back ?
                <TouchableOpacity onPress={() => props.goBack()}>
                    <MaterialCommunityIcons name='keyboard-backspace' size={32} style={styles.back}></MaterialCommunityIcons>
                </TouchableOpacity> :
                <View style={styles.space}></View>
            }
            <Text style={styles.title}>{props.title}</Text>
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
        justifyContent: 'center',
        position: "relative",
        borderBottomColor: "#2b2b2b",
        borderBottomWidth: 1
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: "center",
        paddingRight: 36,
        flex: 1
    },
    back: {
        color: "white",
        marginLeft: 5,
        marginTop: 6
    },
    space: {
        width: 36
    }
})