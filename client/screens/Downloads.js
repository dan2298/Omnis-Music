import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Header from '../components/Header'
import Song from '../components/Song'
import SongBar from '../components/SongBar'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { getSongs } from '../store'

import * as FileSystem from 'expo-file-system';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

class Downloads extends React.Component {
    static navigationOptions = {
        header: null
    }

    rightAction = (progress, dragX, item) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        })
        return (
            <TouchableOpacity style={styles.leftAction} onPress={() => {
                this.delete(item)
            }}>
                <View >
                    <Text style={{ fontSize: 20, color: 'white', padding: 10 }}>Delete</Text>
                </View>
            </TouchableOpacity>
        )
    }

    delete = async (song) => {
        await FileSystem.deleteAsync(`${FileSystem.documentDirectory}songs/${song.name}`)
        this.props.getSongs()
    }

    // updateRef = ref => {
    //     this._swipeableRow = ref;
    // };

    // close = () => {
    //     this._swipeableRow.close();
    // };


    render() {
        const { navigate } = this.props.navigation
        const methods = this.props.screenProps
        return (
            <View style={styles.downloadContainer}>
                <LinearGradient colors={['#1d80b5', '#121212']} style={styles.header} >
                    <Header title={'Downloads'}></Header>
                    <FlatList
                        keyExtractor={(item, idx) => String(idx)}
                        data={this.props.songs}
                        renderItem={result => {
                            const song = result.item.info
                            return (
                                <Swipeable
                                    // ref={this.updateRef}
                                    // renderLeftActions={(prog, drag) => this.leftAction(prog, drag, item)}
                                    renderRightActions={(prop, drag) => this.rightAction(prop, drag, result.item)}
                                // onSwipeableLeftOpen={() => this.delete(item)}
                                >
                                    <Song key={result.index}
                                        playback={methods.playback}
                                        artist={song.artist}
                                        image={song.image}
                                        type={song.type}
                                        name={song.name}
                                    >
                                    </Song>
                                </Swipeable>
                            )
                        }}
                    >
                    </FlatList>
                    {this.props.currentSong.name ?
                        <TouchableOpacity onPress={() => navigate("CurrentSong", {
                            isPlaying: methods.isPlaying,
                            onPlayPause: methods.onPlayPause,
                            timeStamp: methods.timeStamp,
                            getSliderPosition: methods.getSliderPosition,
                            onSliderValueChange: methods.onSliderValueChange,
                            onSlidingComplete: methods.onSlidingComplete,
                            onRateSliderSlidingComplete: methods.onRateSliderSlidingComplete,
                            onForward: methods.onForward,
                            onBackward: methods.onBackward,
                            onLoopPressed: methods.onLoopPressed,
                            rate: methods.rate
                        })}>
                            <SongBar isPlaying={methods.isPlaying} onPlayPause={methods.onPlayPause}></SongBar>
                        </TouchableOpacity> : <View></View>
                    }
                </LinearGradient>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        songs: state.songs,
        currentSong: state.currentSong,
        isPlaying: state.playing
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSongs: () =>
            dispatch(getSongs())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Downloads)

const styles = StyleSheet.create({
    leftAction: {
        backgroundColor: 'red',
        justifyContent: 'center',
        flex: 1
    },
    downloadContainer: {
        flex: 1
    },
    header: {
        width: '100%',
        height: '100%'
    },
})