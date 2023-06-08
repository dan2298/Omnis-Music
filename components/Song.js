import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Ionicons';

import RNFS  from 'react-native-fs';
import { downloadSong, addSpotDL, addYtDL, addScDL, downloaded } from '../store'

import { connect } from 'react-redux';
import { convertFileUrl, convertFileName, songPath }  from '../util'
import AsyncStorage from '@react-native-async-storage/async-storage';

class Song extends React.Component {
    constructor() {
        super()
        this.state = {
            progress: '',
        }
    }

    async componentDidMount() {
        const fileName = convertFileName(this.props.song)
        const song = JSON.parse(await AsyncStorage.getItem(fileName))
        console.log('is already song', song) 
        if(song) {
            if(song.artist === this.props.song.artist && song.name === this.props.song.name && song.image === this.props.song.image){
                this.props.song.download = true;
            }
        }
    }

    async download(song) {
        console.log('here in DLLL ===================')
        const url = convertFileUrl(song)
        console.log(url)
        if (song.type === 'Spotify') {
            this.props.addSpotDL(song)
        } else if (song.type === 'Youtube') {
            this.props.addYtDL(song)
        } else if (song.type === 'Soundcloud') {
            this.props.addScDL(song)
        }

        try {
            await RNFS.downloadFile({
            fromUrl: url, 
            toFile: songPath(song.fileName),
            background: true, // Continue the download in the background after the app terminates (iOS only)**
            discretionary: true, // Allow the OS to control the timing and speed of the download to improve perceived performance  (iOS only)**
            cacheable: true, // Whether the download can be stored in the shared NSURLCache (iOS only, defaults to true)**
            begin: (res) => {
                console.log('BEGIN DOWNLOAD')
            },  
            progress: (res) => {
                    let progressPercent = (res.bytesWritten / res.contentLength)*100; // to calculate in percentage
                    // song.download = Number(progressPercent.toFixed(2))
                    // this.props.downloadSong(song)
                }
            })
            .promise.then((r) => {
                console.log('=====================')
                console.log('=====================')
                console.log('=====================')
                console.log('HERE', r)
                song.download = true
                this.props.downloadSong(song)
                this.props.downloaded(song)
            });
        } catch (err) {
            console.error('Error', err)
        }
    }

    render() {
    let color;
    if (this.props.song.type === 'Youtube') {
        color = '#ff0011'
    } else if (this.props.song.type === 'Spotify') {    
        color = '#26c751'
    } else if (this.props.song.type === 'Soundcloud') {
        color = '#ff8924'
    }

    if (this.props.song.download !== undefined) {
        console.log('here in DLL first')
        if(this.props.song.download === 0 && !this.props.song.start) {
            console.log('here in DLL first second in IF')
            this.download(this.props.song);
        } 
    }
    
    return (
            <View>
            <TouchableOpacity style={styles.songContainer} onPress={() => this.props.tap(this.props.song)}>
                <View style={styles.container}>
                    <Image style={styles.albumImg} source={{ uri: this.props.song.image }}></Image>
                </View>
                <View style={styles.infoContainer}>
                    <View style={{ flexDirection: "row" }}>
                        {this.props.song.download === true ?
                            <Icon name='ios-checkmark-circle' style={{color: '#0244de', marginRight:5, marginTop: 1}} size={16}></Icon> :
                            <View></View>
                        }
                        <Text numberOfLines={1} style={{ color: 'white' , fontSize: 16, fontWeight: '400'}}>{this.props.song.name}</Text>
                    </View>
                    <Text numberOfLines={1} style={{ color: 'rgb(180, 180, 180)', fontSize: 14}}>{this.props.song.artist}</Text>
                    <Text style={{ color: color, fontWeight: '500', fontSize: 12 }}>{this.props.song.type}</Text>
                </View>

                {this.props.song.download !== undefined?
                <View style={styles.downloadIndicator}>
                    {this.props.song.download === true?                      
                        <View></View> :
                        <Progress.Circle progress={this.props.song.download/100} size={18} thickness={2} style={styles.downloadIndicator}/> 
                    }
                </View> :
                <View></View>
                }
            </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        songs: state.songs,
        spotifySongs: state.spotifySongs,
        youtubeSongs: state.youtubeSongs,
        soundcloudSongs: state.soundcloudSongs,
        download: state.download,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        downloadSong: (song) =>
            dispatch(downloadSong(song)),
        addSpotDL: (song) =>
            dispatch(addSpotDL(song)),
        addYtDL: (song) =>
            dispatch(addYtDL(song)),
        addScDL: (song) =>
            dispatch(addScDL(song)),
        downloaded: (song) =>
            dispatch(downloaded(song)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Song)

const styles = StyleSheet.create({
    container: {
        shadowColor: "rgb(50,50,50)",
        shadowOffset: { width: 1},
        shadowOpacity: 0.5,
    },
    albumImg: {
        width: 50,
        height: 50,
        margin: 10, 
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 8,
        margin: 5,
        marginRight: 40
    },
    songContainer: {
        paddingBottom: 1,
        flexDirection: 'row',
        borderColor: 'rgb(30,30,30)',
        borderBottomWidth: .50
    },
    optionButtons: {
        color:'#b8bece',
        marginTop: '6%',
        marginRight: '4%'
    },
    downloadIndicator: {
        marginTop: '6%',
        marginRight: '3%'
    }
})

