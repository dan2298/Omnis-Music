import React from 'react';
import { View, StyleSheet, Text} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { convertFileName, convertFileUrl } from '../util'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { getYTSongs, getSpotSongs, getScSongs, clearYTSongs, clearSpotSongs,
     clearScSongs, startDownload, addSpotSong, addYtSong, addScSong } from '../store'

import SongBar from '../components/SongBar';
import SearchBar from '../components/SearchBar';
import SongList from '../components/SongList';
import SongsHeader from '../components/SongsHeader'
import DownloadAnimation from '../components/DownloadAnimation';

class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            input: '',
            searched: false,
            downloadAttempted: false,
            tapped: false,
        }
        this.searchInputHandler = this.searchInputHandler.bind(this)
        this.animationFinish = this.animationFinish.bind(this)
    }

    searchInputHandler = input => {
        this.setState({ input })
    }

    softClear = () => {
        this.setState({ input: '' })
    }

    animationFinish = () => {
        this.setState({ downloadAttempted: false })
    }

    clearSearch = () => {
        this.setState({ input: '', searched: false })
        this.props.clearYTSongs()
        this.props.clearSpotSongs()
        this.props.clearScSongs()
    }

    search = () => {
        if (!this.state.searched) {
            if (this.state.input.trim()) {
                this.props.getScSongs(this.state.input)
                this.props.getYTSongs(this.state.input)
                this.props.getSpotSongs(this.state.input)
                this.setState({ searched: true })
            }
        } else {
            if (this.state.input.trim()) {
                this.props.getScSongs(this.state.input)
                this.props.getYTSongs(this.state.input)
                this.props.getSpotSongs(this.state.input)
                this.props.clearYTSongs()
                this.props.clearSpotSongs()
                this.props.clearScSongs()
            }
        }
    }

    download = async (song) => {
        console.log('1')
        const url = convertFileUrl(song)
        if (song.type !== 'Spotify') {
            this.setState({ downloadAttempted: true })
            if(!await AsyncStorage.getItem(convertFileName(song))){
                console.log('2')
                if (song.type === 'Spotify') {
                    this.props.addSpotSong(song)
                } else if (song.type === 'Youtube') {
                    this.props.addYtSong(song)
                } else if (song.type === 'Soundcloud') {
                    this.props.addScSong(song)
                }
                this.props.startDownload(song)
            }
        }
    }

    render() {
        const { navigate } = this.props.navigation
        return(
            <View style={styles.container}> 
                <SearchBar searchInputHandler={this.searchInputHandler} search={this.search} softClear={this.softClear} clear={this.clearSearch} input={this.state.input} searched={this.state.searched}></SearchBar>
                {this.state.searched ?
                    <View style={{flex: 1}}>
                        <ScrollView>
                            <SongsHeader songs={this.props.spotifySongs} type={'spotifySongs'}></SongsHeader>
                            <SongList tap={this.download} songs={this.props.spotifySongs}></SongList>
                            <SongsHeader songs={this.props.youtubeSongs} type={'youtubeSongs'}></SongsHeader>
                            <SongList tap={this.download} songs={this.props.youtubeSongs}></SongList>
                            <SongsHeader songs={this.props.soundcloudSongs} type={'soundcloudSongs'}></SongsHeader>
                            <SongList tap={this.download} songs={this.props.soundcloudSongs}></SongList>
                        </ScrollView>
                        <DownloadAnimation time={2000} state={this.state.downloadAttempted} finish={this.animationFinish} text={'Added to downloads'}></DownloadAnimation> 
                    </View> :
                    <View style={styles.beforeSearch}>
                        <Text style={styles.middleText}>Search for songs to download</Text>
                    </View>
            }
            <TouchableOpacity onPress={() => navigate('Song', {seek: this.seek})}>
                <SongBar navigate={navigate}></SongBar>
            </TouchableOpacity>
            </View>
        )
    }
}


const mapStateToProps = state => {
    return {
        spotifySongs: state.spotifySongs,
        youtubeSongs: state.youtubeSongs,
        soundcloudSongs: state.soundcloudSongs,
        platforms: state.platforms,
        download: state.download,
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
        addSpotSong: (song) =>
            dispatch(addSpotSong(song)),
        addYtSong: (song) =>
            dispatch(addYtSong(song)),
        addScSong: (song) =>
            dispatch(addScSong(song)),
        clearYTSongs: () => 
            dispatch(clearYTSongs()),
        clearSpotSongs: () => 
            dispatch(clearSpotSongs()),
        clearScSongs: () => 
            dispatch(clearScSongs()),
        startDownload: (song) =>
            dispatch(startDownload(song)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(20,20,20)'
    },
    beforeSearch: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    middleText: { 
        color: 'rgb(125,125,125)', 
        fontSize: 22,
        fontWeight: '600' 
    },
})
