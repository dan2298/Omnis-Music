import React from 'react';
import { TextInput, Text, View, Button, FlatList, Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av'
import styles from '../../styles'
import axios from 'axios';
import newToken from '../../spotify-token'
import YTSearch from 'youtube-api-search'

export default class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            input: '',
            searchResults: [],
            youtubeSearchResults: []
        }
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
        const token = await newToken()

        const youtubeApiKey = 'AIzaSyCl0-LMjzGMfPXv-xQvdEBQbL0lHhhtxtA';

        const searchYT = term => {
            YTSearch({ key: youtubeApiKey, term }, videos => {
                this.setState({ youtubeSearchResults: videos })
            })
        }
        // const uri = `${url}?type=album,artist,track,playlist&limit=20&q=${encodeURIComponent(this.state.input)}*`
        if (this.state.input) {
            searchYT(this.state.input)
            const uri = `${url}?type=track&limit=5&q=${encodeURIComponent(this.state.input)}*`
            const { data } = await axios.get(uri, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            this.setState({ searchResults: data.tracks.items })
        } else {
            console.log('empty search')
        }
    }

    async loadAudio() {
        try {

        } catch (err) {
            console.log(err)
        }
    }

    async startPlaying(song) {
        // <audio src-'/spotify/album/asdfasdfasdfsadf'></audio>
        // const soundObject = new Audio.Sound();
        const fileName = `${song.name} - ${song.artists[0].name}.mp3`
        const url = 'https://omnis-music.herokuapp.com/spotify/'
        const spotifyUrl = song.external_urls.spotify.slice(8)
        // console.log(`/spotify/${spotifyUrl}`)
        let source;
        // console.log(fileName.split('-')[0].trim().split(' ').join('-'))
        try {
            const { data } = await axios.post(`${url}${spotifyUrl}`, { name: fileName })
            // source = require(`../../server/songs/${data}`)
            console.log('data', data)
        } catch (error) {
            console.log(error, ':')
        }
        // const file = await axios.get(`/ spotify / ${ spotifyUrl }`)
        // console.log('=====file', file) 
        // const source = require('../../server/songs/STUPID')
        // console.log(source)

        if (song.preview_url.length) {
            try {
                // <audio src-'/spotify/album/asdfasdfasdfsadf'></audio>
                const soundObject = new Audio.Sound();
                // const source = { uri: song.preview_url }
                const status = { shouldPlay: true, volume: 1.0 }
                await soundObject.loadAsync(source, status, false)
                // console.log(soundObject)
                await soundObject.playAsync();
            } catch (err) {
                console.log(err)
            }
        }
    }

    render() {
        return (
            <View>

                <View style={styles.searchBarContainer}>
                    <TextInput
                        placeholder="Search"
                        style={styles.searchBar}
                        onChangeText={this.searchInputHandler}
                    >
                    </TextInput>
                    <Button title="Search" onPress={this.apiWorking}></Button>
                </View>
                {/* Youtube List */}
                <Text style={{ color: 'red' }}>Youtube</Text>
                <FlatList
                    keyExtractor={item => item.id}
                    data={this.state.youtubeSearchResults}
                    renderItem={result => {
                        return (
                            <View style={{ borderColor: 'white', borderBottomWidth: 1 }}>
                                <Text style={{ color: 'white' }}>{result.item.snippet.title}</Text>
                                <Image style={{ width: 50, height: 50 }} source={{ uri: result.item.snippet.thumbnails.default.url }}></Image>
                            </View>
                        )
                    }}
                >
                </FlatList>

                {/* Spotify List */}
                <Text style={{ color: 'green' }}>Spotify</Text>
                <FlatList
                    keyExtractor={item => item.id}
                    data={this.state.searchResults}
                    renderItem={result => {
                        // console.log(result.item)
                        // console.log(result.item.preview_url)
                        // console.log('=====================')
                        return (
                            <TouchableOpacity onPress={this.startPlaying.bind(this, result.item)}>
                                <View style={{ borderColor: 'white', borderBottomWidth: 1 }}>
                                    <Text style={{ color: 'white' }}>{result.item.name}</Text>
                                    <Image style={{ width: 50, height: 50 }} source={{ uri: result.item.album.images[2].url }}></Image>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                >
                </FlatList>
            </View>
        )
    }
}

//make a simple server that can accept a url and respond with a file thats downloaded (mp3)
//server needs to use exec with spotify dl

// sqllite3
//firebase