import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Audio } from 'expo-av'
import axios from 'axios';
import spotifyToken from '../../spotify-token'
import youtubeToken from '../../youtube-token'
import YTSearch from 'youtube-api-search'
import SearchBar from './SearchBar';
import SongList from './SongList';
import styles from '../../styles'
import * as FileSystem from 'expo-file-system';

export default class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            input: '',
            spotifySearchResults: [],
            youtubeSearchResults: []
        }
        this.apiWorking = this.apiWorking.bind(this)
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
        } catch (e) {
            console.log(e)
        }
    }

    searchInputHandler = input => {
        this.setState({ input })
    }

    apiWorking = async () => {
        const url = 'https://api.spotify.com/v1/search'
        const token = await spotifyToken()
        const youtubeApiKey = youtubeToken

        const searchYT = term => {
            YTSearch({ key: youtubeApiKey, term }, videos => {
                this.setState({ youtubeSearchResults: videos })
            })
        }
        // const uri = `${url}?type=album,artist,track,playlist&limit=20&q=${encodeURIComponent(this.state.input)}*`
        if (this.state.input) {
            searchYT(this.state.input)
            const uri = `${url}?type=track&limit=10&q=${encodeURIComponent(this.state.input)}*`
            const { data } = await axios.get(uri, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            this.setState({ spotifySearchResults: data.tracks.items })
        } else {
            console.log('empty search')
        }
    }

    async spotifyPlay(song) {
        const downloadedFiles = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}songs`)
        const fileName = `${song.name} - ${song.artists[0].name}.mp3`
        const saveFileName = `${song.name}-${song.artists[0].name}.mp3`.split(' ').join('-')

        const localUrl = 'http://192.168.86.211:7000/spotify/'
        const spotifyUrl = song.external_urls.spotify.slice(8)

        const songFile = encodeURI(`${localUrl}${spotifyUrl}?name=${fileName}`)

        if (!downloadedFiles.includes(saveFileName)) {
            //download locally
            await FileSystem.downloadAsync(songFile, `${FileSystem.documentDirectory}songs/${saveFileName}`)
        }
        const checker = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}songs`)
        console.log(checker)
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
            console.log(source)
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
                    <SongList type='youtube' youtubeSearchResults={this.state.youtubeSearchResults} youtubePlay={this.youtubePlay}></SongList>
                    {/* Spotify List */}
                    <Text style={{ color: 'green' }}>Spotify</Text>
                    <SongList type='spotify' spotifySearchResults={this.state.spotifySearchResults} spotifyPlay={this.spotifyPlay}></SongList>
                </ScrollView>
            </View>
        )
    }
}

//make a simple server that can accept a url and respond with a file thats downloaded (mp3)
//server needs to use exec with spotify dl

// const url = 'https://omnis-music.herokuapp.com/spotify/'
//sqllite3
//firebase