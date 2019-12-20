import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import styles from '../../styles'
import Header from '../components/Header'
import Song from '../components/Song'
import SongBar from '../components/SongBar'

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

class Downloads extends React.Component {
    static navigationOptions = {
        header: null
    }

    render() {
        const { navigate } = this.props.navigation
        const methods = this.props.screenProps
        return (
            <View style={styles.downloadContainer}>
                <LinearGradient colors={['#1d80b5', '#121212']} style={styles.header} >
                    <Header title={'Downloads'}></Header>
                    <ScrollView>
                        {this.props.songs.map((item, idx) => {
                            console.log('songs', song)
                            const song = item.info
                            // let ytName; let ytPic; let ytChannel;
                            // let sptName; let sptArtist; let sptPic;
                            // if (song.info.snippet) {
                            //     ytName = song.info.snippet.title
                            //     ytChannel = song.info.snippet.channelTitle
                            //     ytPic = song.info.snippet.thumbnails.high.url
                            // } else {
                            //     sptArtist = song.info.artists[0].name
                            //     sptName = song.info.name
                            //     sptPic = song.info.album.images[0].url
                            // }
                            return (
                                <Song key={idx}
                                    name={song.name}
                                    playback={methods.playback}
                                    artist={song.artist}
                                    image={song.image}
                                    type={song.type}
                                    songName={item.name}
                                >
                                </Song>
                            )
                        })}
                    </ScrollView>
                    {this.props.currentSong.name ?
                        <TouchableOpacity onPress={() => navigate("CurrentSong", {
                            isPlaying: methods.isPlaying,
                            onPlayPause: methods.onPlayPause
                        })}>
                            <SongBar isPlaying={methods.isPlaying} onPlayPause={methods.onPlayPause}></SongBar>
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

export default connect(mapStateToProps)(Downloads)