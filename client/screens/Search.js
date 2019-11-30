import React from 'react';
import { Text, View, ScrollView, AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { connect } from 'react-redux'
import { getYTSongs, getSpotSongs, getSongs } from '../store'

import SearchBar from '../components/SearchBar';
import SongList from '../components/SongList';
import styles from '../../styles'
import * as FileSystem from 'expo-file-system';

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
        if (this.state.input) {
            this.props.getYTSongs(this.state.input)
            this.props.getSpotSongs(this.state.input)
        }
    }

    spotifyDl = async (song) => {
        const fileName = `${song.name} - ${song.artists[0].name}.mp3`
        const saveFileName = `${song.name}-${song.artists[0].name}.mp3`.split(' ').join('-')

        const localUrl = 'http://192.168.86.211:7000/spotify/'
        const spotifyUrl = song.external_urls.spotify.slice(8)
        const songFile = encodeURI(`${localUrl}${spotifyUrl}?name=${fileName}`)
        const listSongs = this.props.songs.map(song => song.name)
        if (!listSongs.includes(saveFileName)) {
            //download locally
            await FileSystem.downloadAsync(songFile, `${FileSystem.documentDirectory}songs/${saveFileName}`)
        }
        try {
            //save info locally
            await AsyncStorage.setItem(saveFileName, JSON.stringify(song));
        } catch (error) {
            console.log(error.message);
        }
        this.props.getSongs()
    }

    youtubeDl = async (song) => {
        const fileName = song.snippet.title
        const saveFileName = fileName.split('-').map(el => el.trim()).join(' ').split(' ').join('-') + '.mp3'

        const localUrl = 'http://192.168.86.211:7000/'
        const url = `www.youtube.com/${song.id.videoId}?name=${fileName}`
        const songFile = encodeURI(localUrl + url)
        const listSongs = this.props.songs.map(song => song.name)
        if (!listSongs.includes(saveFileName)) {
            //download locally
            await FileSystem.downloadAsync(songFile, `${FileSystem.documentDirectory}songs/${saveFileName}`)
        }
        try {
            //save info locally
            await AsyncStorage.setItem(saveFileName, JSON.stringify(song));
        } catch (error) {
            console.log(error.message);
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