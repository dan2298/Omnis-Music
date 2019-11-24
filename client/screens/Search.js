import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Audio } from 'expo-av'

import { connect } from 'react-redux'
import { getYTSongs } from '../store/youtube'
import { getSpotSongs } from '../store/spotify'

import SearchBar from '../components/SearchBar';
import SongList from '../components/SongList';
import styles from '../../styles'
import * as FileSystem from 'expo-file-system';

class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            input: '',
        }
        this.searchInputHandler = this.searchInputHandler.bind(this)
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
            // this.loadAudio()
        } catch (err) {
            console.log(err)
        }
    }

    searchInputHandler = input => {
        this.setState({ input })
    }

    apiWorking = async () => {
        if (this.state.input) {
            this.props.getYTSongs(this.state.input)
            this.props.getSpotSongs(this.state.input)
        }
    }

    async spotifyPlay(song) {
        const fileName = `${song.name} - ${song.artists[0].name}.mp3`
        const saveFileName = `${song.name}-${song.artists[0].name}.mp3`.split(' ').join('-')

        const localUrl = 'http://192.168.86.211:7000/spotify/'
        const spotifyUrl = song.external_urls.spotify.slice(8)

        const songFile = encodeURI(`${localUrl}${spotifyUrl}?name=${fileName}`)

        if (!this.props.songs.includes(saveFileName)) {
            //download locally
            await FileSystem.downloadAsync(songFile, `${FileSystem.documentDirectory}songs/${saveFileName}`)
        }

        try {
            const soundObject = new Audio.Sound();
            const source = { uri: await `${FileSystem.documentDirectory}songs/${saveFileName}` }
            const status = { shouldPlay: true, volume: 1.0 }
            await soundObject.loadAsync(source, status, false)
            await soundObject.playAsync();
        } catch (err) {
            console.log(err)
        }
    }

    async youtubePlay(song) {
        const fileName = song.snippet.title
        const localUrl = 'http://192.168.86.211:7000/'
        const url = `www.youtube.com/${song.id.videoId}?name=${fileName}`
        try {
            const soundObject = new Audio.Sound();
            const source = { uri: encodeURI(localUrl + url) }
            const status = { shouldPlay: true, volume: 1.0 }
            await soundObject.loadAsync(source, status, false)
            await soundObject.playAsync();
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <View style={styles.searchResults}>
                <SearchBar searchInputHandler={this.searchInputHandler} apiWorking={this.apiWorking}></SearchBar>
                {/* Youtube List */}
                <ScrollView>
                    <Text style={{ color: 'red' }}>Youtube</Text>
                    <SongList type='youtube' youtubeSearchResults={this.props.youtubeSongs} youtubePlay={this.youtubePlay}></SongList>
                    {/* Spotify List */}
                    <Text style={{ color: 'green' }}>Spotify</Text>
                    <SongList type='spotify' spotifySearchResults={this.props.spotifySongs} spotifyPlay={this.spotifyPlay}></SongList>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        songs: state.songs,
        spotifySongs: state.spotifySongs,
        youtubeSongs: state.youtubeSongs
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getYTSongs: (input) =>
            dispatch(getYTSongs(input)),
        getSpotSongs: (input) =>
            dispatch(getSpotSongs(input)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)

// const url = 'https://omnis-music.herokuapp.com/spotify/'
//sqllite3
//firebase