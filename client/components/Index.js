import React, { Component } from 'react';
import { View } from 'react-native';
import styles from '../../styles';
import { LinearGradient } from 'expo-linear-gradient';

import * as FileSystem from 'expo-file-system';
import { connect } from 'react-redux';
import { getSongs, getCurrentSong, play, pause } from '../store'
import {
    setAudioMode, playOrPause, sliderValueChange, sliderSlidingComplete, rateSliderSlidingComplete, setRate,
    seekSliderPosition, MMSSFromMillis, timestamp
} from './musicFunctions'
import { Audio } from 'expo-av'
import AppContainter from '../SwitchNavigator'

(async () => {
    const { exists } = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}songs`)
    if (!exists) {
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}songs`)
    }
})()

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
    }

    async componentDidMount() {
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

    async loadPlayback() {
        const name = this.props.songs[this.index].name
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
        this.index += forward
        this.props.getCurrentSong(this.props.songs[this.index].info)
        this.loadPlayback()
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
        for (let i = 0; i < this.props.songs.length; i++) {
            if (song.name === this.props.songs[i].info.name) {
                this.index = i
                break;
            }
        }
        if (this.props.currentSong.name !== song.name || !this.props.currentSong.name) {
            this.setState({ ...this.state, isPlaying: false })
            this.loadPlayback()
        } else {
            this.onPlayPause()
        }
        this.props.getCurrentSong(song)
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
        songs: state.songs,
        currentSong: state.currentSong,
        isPlaying: state.playing
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCurrentSong: (song) => dispatch(getCurrentSong(song)),
        play: () => dispatch(play()),
        pause: () => dispatch(pause()),
        getSongs: () => dispatch(getSongs()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);