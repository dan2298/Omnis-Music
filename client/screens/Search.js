import React from 'react';
import { Text, View, ScrollView, AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { connect } from 'react-redux'
import { getYTSongs, getSpotSongs, getSongs } from '../store'

import SearchBar from '../components/SearchBar';
import SongList from '../components/SongList';
import styles from '../../styles'
import * as FileSystem from 'expo-file-system';

const defaultPath = `${FileSystem.documentDirectory}songs/`
const localUrl = 'https://omnis-server-py.herokuapp.com/'

class Search extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super()
        this.state = {
            input: '',
        }
        this.searchInputHandler = this.searchInputHandler.bind(this)
    }

    searchInputHandler = input => {
        this.setState({ input })
    }

    apiWorking = async () => {
        // await FileSystem.deleteAsync(`${FileSystem.documentDirectory}songs`)
        // console.log(await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}songs`))
        if (this.state.input) {
            this.props.getYTSongs(this.state.input)
            this.props.getSpotSongs(this.state.input)
        }
    }

    spotifyDl = async (song) => {
        const isrc = song.external_ids.isrc
        let saveFileName = `${song.name}-${song.artists[0].name}.mp3`.split(' ').join('-')
        const spotifyUrl = song.external_urls.spotify.slice(8)
        const songUrl = `${localUrl}spotify/${spotifyUrl}?isrc=${isrc}`
        const listSongs = this.props.songs.map(song => song.name)
        try {
            if (!listSongs.includes(saveFileName)) {
                //download and save locally
                await FileSystem.downloadAsync(songUrl, `${defaultPath}${saveFileName}`)
                await AsyncStorage.setItem(saveFileName, JSON.stringify(song));
            }
        } catch (error) {
            console.log(error);
        }
        this.props.getSongs()
    }

    youtubeDl = async (song) => {
        const saveFileName = song.snippet.title.split('-').map(el => el.trim()).join('-').split(' ').join('-') + '.mp3'
        const encodedFileName = encodeURIComponent(fileName)
        const url = `www.youtube.com/${song.id.videoId}?name=${encodedFileName}`
        const songFile = localUrl + url
        const listSongs = this.props.songs.map(song => song.name)
        try {
            if (!listSongs.includes(saveFileName)) {
                //download and save locally
                await FileSystem.downloadAsync(songFile, `${FileSystem.documentDirectory}songs/${saveFileName}`)
                await AsyncStorage.setItem(saveFileName, JSON.stringify(song));
            }
        } catch (error) {
            console.log(error);
        }
        this.props.getSongs()
    }

    render() {
        return (
            <View style={styles.searchResults}>
                <LinearGradient colors={['#1d80b5', '#121212']} style={styles.header} >
                    <SearchBar searchInputHandler={this.searchInputHandler} apiWorking={this.apiWorking}></SearchBar>
                    <ScrollView>
                        {/* Youtube List */}
                        <Text style={{ color: 'red' }}>Youtube</Text>
                        <SongList type='youtube' youtubeSearchResults={this.props.youtubeSongs} youtubeDl={this.youtubeDl}></SongList>
                        {/* Spotify List */}
                        <Text style={{ color: 'green' }}>Spotify</Text>
                        <SongList type='spotify' spotifySearchResults={this.props.spotifySongs} spotifyDl={this.spotifyDl}></SongList>
                    </ScrollView>
                </LinearGradient>
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
        getSongs: () =>
            dispatch(getSongs()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)