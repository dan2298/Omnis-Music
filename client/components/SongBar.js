import React from 'React';
import { View, Text, StyleSheet, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { connect } from 'react-redux'
import { toggle } from '../store'
import { TouchableOpacity } from 'react-native-gesture-handler';

const SongBar = props => {
    return (
        <View style={styles.container}>
            <View style={styles.text}>
                <Text numberOfLines={1} style={styles.singleText}>{props.currentSong.name}</Text>
                <Text style={styles.singleText}>{props.currentSong.artist}</Text>
            </View>
            <View style={styles.buttonContainer}>
                {props.isPlaying ?
                    <TouchableOpacity onPress={props.onPlayPause}>
                        <MaterialIcons name="pause-circle-outline" size={36} style={styles.button}></MaterialIcons>
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={props.onPlayPause}>
                        <MaterialIcons name="play-circle-outline" size={36} style={styles.button}></MaterialIcons>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

const mapStateToProps = state => {
    return {
        currentSong: state.currentSong,
        isPlaying: state.playing
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggle: () => dispatch(toggle)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongBar)

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "black",
        borderTopWidth: 1,
        borderColor: "#6a6b6a",
        borderRadius: 6,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
    },
    text: {
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 50,
        flex: 1
    },
    button: {
        color: "white",
        margin: 5
    },
    singleText: {
        color: "white",
        textAlign: "center",
        fontSize: 12,
        fontWeight: "bold"
    }
})