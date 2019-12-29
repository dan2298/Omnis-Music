import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { connect } from 'react-redux'
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
let space;

if (DEVICE_HEIGHT < 812) {
    space = 15;
} else if (DEVICE_HEIGHT >= 812 && DEVICE_HEIGHT < 896) {
    space = 30;
} else {
    space = 60;
}

let loopPressed = false;
let shufflePressed = false;
const Buttons = props => {
    // console.log(props)
    return (
        <View style={{ ...styles.rowContainer, marginLeft: 10 }}>
            <TouchableOpacity onPress={() => {
                shufflePressed = !shufflePressed
                props.onShufflePressed()
            }} >
                {shufflePressed ?
                    <Ionicons name="ios-shuffle" size={24} style={{ marginRight: space, color: "blue" }} ></Ionicons> :
                    <Ionicons name="ios-shuffle" size={24} style={{ marginRight: space, color: "white" }} ></Ionicons>
                }
            </TouchableOpacity>

            <TouchableOpacity onPress={props.onBackward}>
                <MaterialCommunityIcons name="rewind" size={72} color="white"></MaterialCommunityIcons>
            </TouchableOpacity>

            <TouchableOpacity onPress={props.onPlayPause}>
                {props.isPlaying ?
                    <MaterialCommunityIcons name="pause-circle" size={84} color='white'></MaterialCommunityIcons> :
                    <MaterialCommunityIcons name="play-circle" size={84} color="white"></MaterialCommunityIcons>
                }
            </TouchableOpacity>

            <TouchableOpacity onPress={props.onForward}>
                <MaterialCommunityIcons name="fast-forward" size={72} color="white"></MaterialCommunityIcons>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                loopPressed = !loopPressed
                console.log(loopPressed)
                props.onLoopPressed()
            }}>
                <MaterialIcons name="loop" size={24} style={{ marginLeft: space, color: loopPressed ? "blue" : "white" }}></MaterialIcons>
            </TouchableOpacity>
        </View>
    )
}

const mapStateToProps = state => {
    return {
        isPlaying: state.playing
    }
}

export default connect(mapStateToProps)(Buttons);

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
})