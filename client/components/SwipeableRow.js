import React from 'react';
import { View, Text, Animated, Dimensions, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import Song from './Song'
import { connect } from 'react-redux'
import { deleteSong, deleteQueue } from '../store'

const { width: DEVICE_WIDTH } = Dimensions.get("window");
const notFound = {
    name: 'Error',
    image: '',
    type: 404,
    artist: ''
}

class SwipeableRow extends React.Component {
    rightAction(progress, dragX, item) {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        })
        return (
            <TouchableOpacity style={styles.rightAction} onPress={() => {
                this.close()
                this.delete(item)
            }}>
                <View >
                    <Text style={{ fontSize: 20, color: 'white', padding: 10 }}>Delete</Text>
                </View>
            </TouchableOpacity>
        )
    }

    leftAction(progress, dragX) {
        const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        })
        return (
            <Animated.View style={{ ...styles.leftAction, transform: [{ scale }] }}>
                <MaterialIcons name='playlist-add' size={48} style={{ paddingLeft: 15, color: 'white' }}></MaterialIcons>
            </Animated.View>
        )
    }

    addQueue(song) {
        this.props.addQ(song)
        this.close()
    }

    delete = async (song) => {
        this.props.deleteSong(song.fileName)
        this.props.deleteQueue(song.fileName)
    }

    updateRef = ref => {
        this._swipeableRow = ref;
    };

    close = () => {
        this._swipeableRow.close();
    };

    render() {
        let song;
        this.props.item ? song = this.props.item : song = notFound
        return (
            <Swipeable
                ref={this.updateRef}
                renderRightActions={(prog, drag) => this.rightAction(prog, drag, song)}
                renderLeftActions={(prog, drag) => this.leftAction(prog, drag)}
                onSwipeableLeftOpen={() => this.addQueue(song)}
            >
                <Song
                    playback={this.props.playback}
                    artist={song.artist}
                    image={song.image}
                    type={song.type}
                    name={song.name}
                    fileName={song.fileName}
                >
                </Song>
            </Swipeable >
        )
    }
}

const mapDispatchToProps = dispatch => ({
    deleteSong: (name) => dispatch(deleteSong(name)),
    deleteQueue: (name) => dispatch(deleteQueue(name))
})

export default connect(null, mapDispatchToProps)(SwipeableRow);

const styles = StyleSheet.create({
    rightAction: {
        backgroundColor: 'red',
        justifyContent: 'center',
        flex: 1
    },
    leftAction: {
        flexDirection: 'row',
        alignItems: "center",
        width: DEVICE_WIDTH * .25
    }
})
