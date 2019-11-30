import React from 'react';
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import styles from '../../styles'
import Header from '../components/Header'
import Song from '../components/Song'
import SongBar from '../components/SongBar'
import { getCurrentSong, play, pause } from '../store'

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av'

class Downloads extends React.Component {
    static navigationOptions = {
        header: null
    }

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
    }

    async componentDidMount() {
        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                playsInSilentModeIOS: true,
                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
                shouldDuckAndroid: true,
                staysActiveInBackground: true,
                playThroughEarpieceAndroid: true
            })
        } catch (err) {
            console.log(err)
        }
    }

    async loadPlayback(song) {
        this.setState({ ...this.state, isPlaying: false })
        if (this.playbackInstance != null) {
            await this.playbackInstance.unloadAsync();
            // this.playbackInstance.setOnPlaybackStatusUpdate(null);
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
            this._onPlaybackStatusUpdate
        );
        this.playbackInstance = sound;
        this.onPlayPause()
    }

    async onPlayPause() {
        if (this.playbackInstance != null) {
            if (this.state.isPlaying) {
                this.playbackInstance.pauseAsync();
                this.setState({ ...this.state, isPlaying: false })
                this.props.pause()
            } else {
                this.playbackInstance.playAsync();
                this.setState({ ...this.state, isPlaying: true })
                this.props.play()
            }
        }
    }

    playback(song) {
        if (this.props.currentSong.name !== song.songName || !this.props.currentSong.name) {
            this.loadPlayback(song)
        } else {
            this.onPlayPause()
        }
        this.props.getCurrentSong(song)
    }

    render() {
        const { navigate } = this.props.navigation
        return (
            <View style={styles.downloadContainer}>

                <LinearGradient colors={['#1d80b5', '#121212']} style={styles.header} >
                    <Header title={'Downloads'}></Header>
                    <ScrollView>
                        {this.props.songs.map((song, idx) => {
                            let ytName; let ytPic; let ytChannel;
                            let sptName; let sptArtist; let sptPic;
                            if (song.info.snippet) {
                                ytName = song.info.snippet.title
                                ytChannel = song.info.snippet.channelTitle
                                ytPic = song.info.snippet.thumbnails.high.url
                            } else {
                                sptArtist = song.info.artists[0].name
                                sptName = song.info.name
                                sptPic = song.info.album.images[0].url
                            }
                            return (
                                <Song key={idx}
                                    name={ytName ? ytName : sptName}
                                    playback={this.playback}
                                    creator={ytChannel ? ytChannel : sptArtist}
                                    img={ytPic ? ytPic : sptPic}
                                    type={ytName ? 'Youtube' : 'Spotify'}
                                    songName={song.name}
                                >
                                </Song>
                            )
                        })}
                    </ScrollView>
                    {this.props.currentSong.name ?
                        <TouchableOpacity onPress={() => navigate("CurrentSong", {
                            isPlaying: this.state.isPlaying,
                            onPlayPause: this.onPlayPause
                        })}>
                            <SongBar isPlaying={this.state.isPlaying} onPlayPause={this.onPlayPause}></SongBar>
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
        getCurrentSong: (song) => dispatch(getCurrentSong(song)),
        play: () => dispatch(play()),
        pause: () => dispatch(pause())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Downloads)