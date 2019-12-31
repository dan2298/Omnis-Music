import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import Song from './Song'

import { connect } from 'react-redux'
import { deleteSong, deleteQueue } from '../store'

const notFound = {
    name: 'Error',
    image: '',
    type: 404,
    artist: ''
}

class SwipeableRow extends React.Component {
    rightAction = (progress, dragX, item) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        })
        return (
            <TouchableOpacity style={styles.leftAction} onPress={() => {
                this.close()
                this.delete(item)
            }}>
                <View >
                    <Text style={{ fontSize: 20, color: 'white', padding: 10 }}>Delete</Text>
                </View>
            </TouchableOpacity>
        )
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
                renderRightActions={(prop, drag) => this.rightAction(prop, drag, this.props.item)}
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
    leftAction: {
        backgroundColor: 'red',
        justifyContent: 'center',
        flex: 1
    },
})
