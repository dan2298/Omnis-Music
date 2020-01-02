import React from 'react';
import { Text, View, ScrollView, AsyncStorage, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { connect } from 'react-redux'
import { downloadAttempted, getYTSongs, getSpotSongs, getScSongs, getSongs, addSong } from '../store'

import SearchBar from '../components/SearchBar';
import SongList from '../components/SongList';
import SongBar from '../components/SongBar';
import DownloadAnim from '../components/DownloadAnim';

import * as FileSystem from 'expo-file-system';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
            searched: false,
            downloadAttempted: false,
        }
        this.searchInputHandler = this.searchInputHandler.bind(this)
        this.animationFinish = this.animationFinish.bind(this)
    }

    searchInputHandler = input => {
        this.setState({ input })
    }

    clearSearch = () => {
        this.setState({ input: '', searched: false })
    }

    animationFinish = () => {
        this.setState({ downloadAttempted: false })
    }

    search = async () => {
        if (this.state.input) {
            this.props.getScSongs(this.state.input)
            this.props.getYTSongs(this.state.input)
            this.props.getSpotSongs(this.state.input)
            this.setState({ searched: true })
        }
    }

    spotifyDl = async (song) => {
        if (!this.state.downloadAttempted) {
            const isrc = song.isrc
            const fileName = `${song.name}-spt.mp3`.split(' ').join('-')
            let saveFileName = ''
            for (let i = 0; i < fileName.length; i++) {
                if (fileName[i].match(/[\]\[a-zA-Z0-9\s-(.)]/g)) {
                    saveFileName += fileName[i]
                }
            }
            const spotifyUrl = song.url.slice(8)
            const songUrl = `${localUrl}spotify/${spotifyUrl}?isrc=${isrc}`
            const listSongs = this.props.songs.map(song => song.fileName)
            try {
                if (!listSongs.includes(saveFileName)) {
                    //download and save locally
                    this.setState({ downloadAttempted: true })
                    await FileSystem.downloadAsync(songUrl, `${defaultPath}${saveFileName}`)
                    await AsyncStorage.setItem(saveFileName, JSON.stringify(song));
                }
            } catch (error) {
                console.log(error);
            }
            this.props.getSongs()
            this.props.addSong(saveFileName)
        }
    }

    youtubeDl = async (song) => {
        if (!this.state.downloadAttempted) {
            const fileName = song.name.split('-').map(el => el.trim()).join('-').split(' ').join('-') + '-yt.mp3'
            let saveFileName = ''
            for (let i = 0; i < fileName.length; i++) {
                if (fileName[i].match(/[\]\[a-zA-Z0-9\s-(.)]/g)) {
                    saveFileName += fileName[i]
                }
            }
            const url = `www.youtube.com/${song.id}`
            const songFile = localUrl + url
            const listSongs = this.props.songs.map(song => song.fileName)
            try {
                if (!listSongs.includes(saveFileName)) {
                    //download and save locally
                    this.setState({ downloadAttempted: true })
                    await FileSystem.downloadAsync(songFile, `${FileSystem.documentDirectory}songs/${saveFileName}`)
                    await AsyncStorage.setItem(saveFileName, JSON.stringify(song));
                }
            } catch (error) {
                console.log(error);
            }
            this.props.getSongs()
            this.props.addSong(saveFileName)
        }
    }

    soundcloudDl = async (song) => {
        if (!this.state.downloadAttempted) {
            const fileName = song.name.split(' ').join('-') + '-sc.mp3'
            let saveFileName = ''
            for (let i = 0; i < fileName.length; i++) {
                if (fileName[i].match(/[\]\[a-zA-Z0-9\s-(.)]/g)) {
                    saveFileName += fileName[i]
                }
            }
            const encodedName = encodeURIComponent(song.name)
            const url = `soundcloud${song.url}?name=${encodedName}`
            const songFile = localUrl + url
            const listSongs = this.props.songs.map(song => song.fileName)
            try {
                if (!listSongs.includes(saveFileName)) {
                    //download and save locally
                    this.setState({ downloadAttempted: true })
                    await FileSystem.downloadAsync(songFile, `${FileSystem.documentDirectory}songs/${saveFileName}`)
                    await AsyncStorage.setItem(saveFileName, JSON.stringify(song));
                }
            } catch (error) {
                console.log(error);
            }
            this.props.getSongs()
            this.props.addSong(saveFileName)
        }
    }

    render() {
        const { navigate } = this.props.navigation
        const methods = this.props.screenProps
        return (
            <View>
                <LinearGradient colors={['#1d80b5', '#121212']} style={styles.background} >
                    <SearchBar searchInputHandler={this.searchInputHandler} search={this.search} clear={this.clearSearch} input={this.state.input}></SearchBar>

                    {this.state.searched ?
                        <ScrollView >
                            {/* Youtube List */}
                            {this.props.youtubeSongs.length ?
                                <View style={styles.platforms}>
                                    <Text style={{ color: 'white', fontSize: 14 }}>{`${this.props.youtubeSongs.length} results were found`}</Text>
                                    <Text style={{ ...styles.platformTitles, color: '#ff0011' }}>Youtube</Text>
                                </View> :
                                <Text></Text>
                            }
                            <SongList songs={this.props.youtubeSongs} download={this.youtubeDl}></SongList>
                            {/* Spotify List */}
                            {this.props.spotifySongs.length ?
                                <View style={styles.platforms}>
                                    <Text style={{ color: 'white', fontSize: 14 }}>{`${this.props.spotifySongs.length} results were found`}</Text>
                                    <Text style={{ ...styles.platformTitles, color: '#26c751' }}>Spotify</Text>
                                </View> :
                                <Text></Text>
                            }
                            <SongList songs={this.props.spotifySongs} download={this.spotifyDl}></SongList>
                            {/* SoundCloud List */}
                            {this.props.soundcloudSongs.length ?
                                <View style={styles.platforms}>
                                    <Text style={{ color: 'white', fontSize: 14 }}>{`${this.props.soundcloudSongs.length} results were found`}</Text>
                                    <Text style={{ ...styles.platformTitles, color: '#FF7700' }}>SoundCloud</Text>
                                </View> :
                                <Text></Text>
                            }
                            <SongList songs={this.props.soundcloudSongs} download={this.soundcloudDl}></SongList>
                        </ScrollView> :
                        <View style={styles.beforeSearch}>
                            <Text style={{ color: '#b8bece', fontSize: 16, fontWeight: '600' }}>Search for songs to download</Text>
                            <Text style={{ color: '#b8bece', fontSize: 14, fontWeight: '600' }}>SoundCloud may take a while to show up</Text>
                        </View>
                    }

                    {/* ON DOWNLOAD ATTEMPT */}
                    <DownloadAnim time={2000} state={this.state.downloadAttempted} finish={this.animationFinish} text={'Added to downloads'}></DownloadAnim>
                    {/* ON ERROR
                    <DownloadAnim state={this.state.error} finish={this.animationFinish} downloaded={false} text={'Error Downloading'}></DownloadAnim>
                    ON SUCCESS
                    <DownloadAnim state={this.state.success} finish={this.animationFinish} downloaded={true} text={'Successfully Downloaded'}></DownloadAnim> */}

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
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        songs: state.songFiles.songs,
        spotifySongs: state.spotifySongs,
        youtubeSongs: state.youtubeSongs,
        soundcloudSongs: state.soundcloudSongs,
        currentSong: state.currentSong,
        download: state.download
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getYTSongs: (input) =>
            dispatch(getYTSongs(input)),
        getSpotSongs: (input) =>
            dispatch(getSpotSongs(input)),
        getScSongs: (input) =>
            dispatch(getScSongs(input)),
        getSongs: () =>
            dispatch(getSongs()),
        addSong: (fileName) =>
            dispatch(addSong(fileName)),
        downloadAttempted: () =>
            dispatch(downloadAttempted()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    platforms: {
        width: '100%',
        opacity: 0.9,
        backgroundColor: '#444',
        borderRadius: 2,
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    platformTitles: {
        fontWeight: 'bold',
        padding: '1%',
        fontSize: 16,
        textDecorationLine: "underline"
    },
    beforeSearch: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})