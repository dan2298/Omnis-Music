import React, { Component } from 'react';
import { View } from 'react-native';
import styles from '../../styles';
import { LinearGradient } from 'expo-linear-gradient';

import * as FileSystem from 'expo-file-system';
import { connect } from 'react-redux';
import { getSongs, getCurrentSong, play, pause } from '../store'
import { setAudioMode, playOrPause, sliderValueChange, sliderSlidingComplete, seekSliderPosition, MMSSFromMillis, timestamp } from './musicFunctions'
import { Audio } from 'expo-av'
import AppContainter from '../SwitchNavigator'

(async () => {
    const { exists } = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}songs`)
    if (!exists) {
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}songs`)
    }
})()

class Index extends Component {
    constructor() {
        super()
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
            throughEarpiece: false
        }
        this.loadPlayback = this.loadPlayback.bind(this)
        this.playback = this.playback.bind(this)
        this.onPlayPause = this.onPlayPause.bind(this)
        this.getTimestamp = this.getTimestamp.bind(this)
        this.onSeekSliderValueChange = this.onSeekSliderValueChange.bind(this)
        this.getSeekSliderPosition = this.getSeekSliderPosition.bind(this)
        this.onSeekSliderSlidingComplete = this.onSeekSliderSlidingComplete.bind(this)
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
                shouldCorrectPitch: status.shouldCorrectPitch
            });
        }
    }

    async loadPlayback(song) {
        this.setState({ ...this.state, isPlaying: false })
        if (this.playbackInstance != null) {
            await this.playbackInstance.unloadAsync();
            this.playbackInstance.setOnPlaybackStatusUpdate(null);
            this.playbackInstance = null;
        }
        const source = { uri: await `${FileSystem.documentDirectory}songs/${song.songName}` }
        const initialStatus = {
            shouldPlay: this.state.isPlaying,
            rate: this.state.rate,
            shouldCorrectPitch: this.state.shouldCorrectPitch,
            volume: this.state.volume,
            isMuted: this.state.muted,
        };
        const { sound, status } = await Audio.Sound.createAsync(
            source,
            initialStatus,
            this.onPlaybackStatusUpdate
        );
        sound.setProgressUpdateIntervalAsync(250)
        this.playbackInstance = sound;
        this.onPlayPause()
    }

    onPlayPause = playOrPause
    onSeekSliderValueChange = sliderValueChange
    onSeekSliderSlidingComplete = sliderSlidingComplete
    getSeekSliderPosition = seekSliderPosition
    getMMSSFromMillis = MMSSFromMillis
    getTimestamp = timestamp

    playback(song) {
        if (this.props.currentSong.name !== song.songName || !this.props.currentSong.name) {
            this.loadPlayback(song)
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
                        onSlidingComplete: this.onSeekSliderSlidingComplete
                    }}>
                    </AppContainter>
                </LinearGradient>
            </View>

        );
    }
}

const mapStateToProps = state => {
    return {
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