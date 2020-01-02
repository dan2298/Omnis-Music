import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Header from '../components/Header'
import SongBar from '../components/SongBar'
import SwipeableRow from '../components/SwipeableRow'
import DownloadAnim from '../components/DownloadAnim';

import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { addQSong } from '../store'

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");

class Downloads extends React.Component {
    constructor() {
        super()
        this.addQueue = this.addQueue.bind(this)
        this.state = {
            show: false
        }
    }

    static navigationOptions = {
        header: null
    }

    addQueue(song) {
        if (!this.state.show) {
            this.props.addQSong(song)
            this.setState({ show: true })
        }
    }

    animationFinish = () => {
        this.setState({ show: false })
    }

    render() {
        const { navigate } = this.props.navigation
        const methods = this.props.screenProps
        return (
            <View style={styles.downloadContainer}>
                <LinearGradient colors={['#1d80b5', '#121212']} style={styles.header} >
                    <Header title={'Downloads'}></Header>
                    {this.props.songs.length ?
                        <FlatList
                            keyExtractor={(item, idx) => String(idx)}
                            data={this.props.songs}
                            renderItem={result => {
                                return (
                                    <SwipeableRow key={result.index}
                                        addQ={this.addQueue}
                                        item={result.item}
                                        playback={methods.playback}
                                    >
                                    </SwipeableRow>
                                )
                            }}
                        >
                        </FlatList> :
                        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                            <Text style={{ color: '#b8bece', fontSize: 16, fontWeight: '600' }}>Your downloaded songs will appear here</Text>
                        </View>
                    }

                    <View style={{ position: 'absolute', alignSelf: "center", top: DEVICE_HEIGHT * .35 }}>
                        <DownloadAnim time={1000} state={this.state.show} finish={this.animationFinish} text={'Added to Queue'}></DownloadAnim>
                    </View>

                    {this.props.currentSong.name ?
                        <TouchableOpacity onPress={() => navigate("CurrentSong", {
                            onPlayPause: methods.onPlayPause,
                            timeStamp: methods.timeStamp,
                            getSliderPosition: methods.getSliderPosition,
                            onSliderValueChange: methods.onSliderValueChange,
                            onSlidingComplete: methods.onSlidingComplete,
                            onRateSliderSlidingComplete: methods.onRateSliderSlidingComplete,
                            onForward: methods.onForward,
                            onBackward: methods.onBackward,
                            onLoopPressed: methods.onLoopPressed,
                            onShufflePressed: methods.onShufflePressed,
                            playback: methods.playback,
                            rate: methods.rate
                        })}>
                            <SongBar isPlaying={methods.isPlaying} onPlayPause={methods.onPlayPause}></SongBar>
                        </TouchableOpacity> :
                        <View></View>
                    }
                </LinearGradient>
            </View >
        )
    }
}

const mapStateToProps = state => {
    return {
        songs: state.songFiles.songs,
        currentSong: state.currentSong,
        isPlaying: state.playing
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addQSong: (song) => dispatch(addQSong(song)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Downloads)

const styles = StyleSheet.create({
    downloadContainer: {
        flex: 1,
    },
    header: {
        width: '100%',
        height: '100%'
    },
})