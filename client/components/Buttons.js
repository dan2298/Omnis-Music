import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { connect } from 'react-redux'
import { loopPress, shufflePress } from '../store'

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
let space;

if (DEVICE_HEIGHT < 812) {
    space = 15;
} else if (DEVICE_HEIGHT >= 812 && DEVICE_HEIGHT < 896) {
    space = 30;
} else {
    space = 60;
}

class Buttons extends React.Component {
    constructor() {
        super()
        this.state = {
            loopPressed: false,
            shufflePressed: false
        }
    }

    componentDidMount() {
        this.setState({ ...this.props.buttons })
    }

    render() {
        return (
            <View style={{ ...styles.rowContainer, marginLeft: 10 }}>
                <TouchableOpacity onPress={() => {
                    this.props.shufflePress()
                    this.setState({ shufflePressed: !this.state.shufflePressed })
                    this.props.onShufflePressed()
                }} >
                    <Ionicons name="ios-shuffle" size={24} style={{ marginRight: space, color: this.props.buttons.shufflePressed ? "blue" : "white" }} ></Ionicons>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.props.onBackward}>
                    <MaterialCommunityIcons name="rewind" size={72} color="white"></MaterialCommunityIcons>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.props.onPlayPause}>
                    {this.props.isPlaying ?
                        <MaterialCommunityIcons name="pause-circle" size={84} color='white'></MaterialCommunityIcons> :
                        <MaterialCommunityIcons name="play-circle" size={84} color="white"></MaterialCommunityIcons>
                    }
                </TouchableOpacity>

                <TouchableOpacity onPress={this.props.onForward}>
                    <MaterialCommunityIcons name="fast-forward" size={72} color="white"></MaterialCommunityIcons>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    this.props.loopPress()
                    this.setState({ loopPressed: !this.state.loopPressed })
                    this.props.onLoopPressed()
                }}>
                    <MaterialIcons name="loop" size={24} style={{ marginLeft: space, color: this.props.buttons.loopPressed ? "blue" : "white" }}></MaterialIcons>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        buttons: state.buttons,
        isPlaying: state.playing
    }
}

const mapDispatchToProps = dispatch => {
    return {
        shufflePress: () => dispatch(shufflePress()),
        loopPress: () => dispatch(loopPress())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
})