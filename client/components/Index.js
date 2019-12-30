import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import * as FileSystem from 'expo-file-system';
import { connect } from 'react-redux';
import { getSongs, getQueue, getCurrentSong, play, pause } from '../store'
import {
    setAudioMode, playOrPause, sliderValueChange, sliderSlidingComplete, rateSliderSlidingComplete, setRate,
    seekSliderPosition, MMSSFromMillis, timestamp
} from './musicFunctions'
import { Audio } from 'expo-av'
import AppContainter from '../SwitchNavigator'

const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;

class Index extends Component {
    constructor() {
        super()
        this.index = 0;
        this.playbackInstance = null;
        this.state = {
            muted: false,
            playbackInstancePosition: null,
            playbackInstanceDuration: null,
            shouldPlay: false,
            isPlaying: false,
            isLoading: true,
            fontLoaded: false,
            shouldCorrectPitch: true,
            volume: 1.0,
            rate: 1.0,
            poster: false,
            useNativeControls: false,
            throughEarpiece: false,
            loopingType: LOOPING_TYPE_ALL
        }
        this.loadPlayback = this.loadPlayback.bind(this)
        this.playback = this.playback.bind(this)
        this.onPlayPause = this.onPlayPause.bind(this)
        this.getTimestamp = this.getTimestamp.bind(this)
        this.onSeekSliderValueChange = this.onSeekSliderValueChange.bind(this)
        this.getSeekSliderPosition = this.getSeekSliderPosition.bind(this)
        this.onSeekSliderSlidingComplete = this.onSeekSliderSlidingComplete.bind(this)
        this.onRateSliderSlidingComplete = this.onRateSliderSlidingComplete.bind(this)
        this.trySetRate = this.trySetRate.bind(this)
        this.onForward = this.onForward.bind(this)
        this.onBackward = this.onBackward.bind(this)
        this.onLoopPressed = this.onLoopPressed.bind(this)
        this.onShufflePressed = this.onShufflePressed.bind(this)
    }

    async componentDidMount() {
        (async () => {
            const { exists } = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}songs`)
            if (!exists) {
                await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}songs`)
            }
        })()
        this.props.getSongs()
        setAudioMode()
    }

    onPlaybackStatusUpdate = status => {
        if (status.isLoaded) {
            this.setState({
                playbackInstancePosition: status.positionMillis,
                playbackInstanceDuration: status.durationMillis,
                shouldPlay: status.shouldPlay,
                isPlaying: status.isPlaying,
                isBuffering: status.isBuffering,
                rate: status.rate,
                muted: status.isMuted,
                volume: status.volume,
                loopingType: status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL,
                shouldCorrectPitch: status.shouldCorrectPitch
            });
            if (status.didJustFinish && !status.isLooping) {
                this.onForward();
            }
        } else {
            if (status.error) {
                console.log(`FATAL PLAYER ERROR: ${status.error}`);
            }
        }
    }

    async loadPlayback(song) {
        let name;
        if (!song && this.props.list.length) {
            name = this.props.list[this.index].fileName
        } else {
            name = song.fileName
        }
        if (this.playbackInstance != null) {
            await this.playbackInstance.unloadAsync();
            this.playbackInstance.setOnPlaybackStatusUpdate(null);
            this.playbackInstance = null;
        }
        const source = { uri: await `${FileSystem.documentDirectory}songs/${name}` }
        const initialStatus = {
            shouldPlay: true,
            rate: 1.0,
            shouldCorrectPitch: this.state.shouldCorrectPitch,
            volume: this.state.volume,
            isMuted: this.state.muted,
            isLooping: this.state.loopingType === LOOPING_TYPE_ONE,
            progressUpdateIntervalMillis: 300
        };
        const { sound, status } = await Audio.Sound.createAsync(
            source,
            initialStatus,
            this.onPlaybackStatusUpdate
        );
        this.playbackInstance = sound;
        this.onPlayPause()
    }

    onForward = () => {
        if (this.playbackInstance != null) {
            this.advanceIndex(1);
        }
    };

    onBackward = () => {
        if (this.playbackInstance != null) {
            this.advanceIndex(-1);
        }
    };

    onLoopPressed = () => {
        if (this.playbackInstance != null) {
            this.playbackInstance.setIsLoopingAsync(
                this.state.loopingType !== LOOPING_TYPE_ONE
            );
        }
    };

    advanceIndex(forward) {
        if (this.props.list[this.index + forward]) {
            this.index += forward
            this.props.getCurrentSong(this.props.list[this.index])
            this.loadPlayback()
            this.props.getQueue()
        }
    }

    onShufflePressed() {
        // console.log(this.props.list.length)

        // const map = {}

        //loop until all songs found
        // Math.random(this.props.list.length)


        //need a reset on store to go back to original list when false/true
    }

    onPlayPause = playOrPause
    onSeekSliderValueChange = sliderValueChange
    onSeekSliderSlidingComplete = sliderSlidingComplete
    getSeekSliderPosition = seekSliderPosition
    getMMSSFromMillis = MMSSFromMillis
    getTimestamp = timestamp
    onRateSliderSlidingComplete = rateSliderSlidingComplete
    trySetRate = setRate

    playback(song) {
        for (let i = 0; i < this.props.list.length; i++) {
            if (song.fileName === this.props.list[i].fileName) {
                this.index = i
                break;
            }
        }
        if (this.props.currentSong.name !== song.name || !this.props.currentSong.name) {
            this.setState({ ...this.state, isPlaying: false })
            this.loadPlayback(song)
        } else {
            this.onPlayPause()
        }
        this.props.getCurrentSong(song)
        this.props.getQueue(this.props.list)
    }

    render() {
        return (
            <View contentContainerStyle={styles.container}>
                <LinearGradient colors={['#3f6b6b', '#121212']} style={styles.header} >
                    <AppContainter screenProps={{
                        playback: this.playback,
                        onPlayPause: this.onPlayPause,
                        isPlaying: this.state.isPlaying,
                        timeStamp: this.getTimestamp,
                        getSliderPosition: this.getSeekSliderPosition,
                        onSliderValueChange: this.onSeekSliderValueChange,
                        onSlidingComplete: this.onSeekSliderSlidingComplete,
                        onRateSliderSlidingComplete: this.onRateSliderSlidingComplete,
                        onForward: this.onForward,
                        onBackward: this.onBackward,
                        onLoopPressed: this.onLoopPressed,
                        onShufflePressed: this.onShufflePressed,
                        rate: this.state.rate
                    }}>
                    </AppContainter>
                </LinearGradient>
            </View>

        );
    }
}

const mapStateToProps = state => {
    return {
        songs: state.songFiles.songs,
        list: state.songFiles.list,
        currentSong: state.currentSong,
        isPlaying: state.playing,
        queue: state.queue
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCurrentSong: (song) => dispatch(getCurrentSong(song)),
        play: () => dispatch(play()),
        pause: () => dispatch(pause()),
        getSongs: () => dispatch(getSongs()),
        getQueue: () => dispatch(getQueue())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        width: '100%',
        height: '100%'
    },
})