import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { connect } from 'react-redux'
import { playSong, playNextSong, pauseCurrentSong, updateDuration, updatePlayTime } from '../store'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';

import { songPath, imagePath } from '../util'

class SongBar extends React.Component {
    constructor() {
        super();
        this.state = {
            currentTime: 0.0001
        }
    }

    play = () => {
        if(this.props.current.playing){
            this.props.pauseCurrentSong()
        } else {
            this.props.playSong()
        }
    }

    render() {
        const current = this.props.current
        return (
                <View style={{...styles.container, display: current.song.fileName ? 'flex' : 'none'}}>
                    <Progress.Bar progress={current.currentTime ? current.currentTime/current.duration : 0} width={null} height={.6} borderRadius={0} color={'rgb(150,150,150)'}></Progress.Bar>
                        <View style={styles.subContainer}>
                        <Image style={{height:52, width:52}} source={{uri: imagePath(current.song.imageFileName)}}></Image>
                        <View style={styles.text}>
                            <Text numberOfLines={1} style={{color: "white", fontSize: 14}}>{current.song.name}</Text>
                            <Text style={{color: "rgb(150,150,150)", fontSize: 12,}}>{current.song.artist}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            {current.playing ?
                                <TouchableOpacity onPress={this.play}>
                                    <View style={styles.playButton}>
                                        <Image style={{height: 24, width: 24 }} source={require('../img/ic_pause_white_48pt.png')}/>
                                    </View>
                                </TouchableOpacity> :
                                <TouchableOpacity onPress={this.play}>
                                    <View style={styles.playButton}>
                                        <Image style={{height: 24, width: 24 }} source={require('../img/ic_play_arrow_white_48pt.png')}/>
                                    </View>
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        current: state.current,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        playSong: () => dispatch(playSong()),
        pauseCurrentSong: () => dispatch(pauseCurrentSong()),
        playNextSong: () => dispatch(playNextSong()),
        updateDuration: (data) => dispatch(updateDuration(data)),
        updatePlayTime: (time) => dispatch(updatePlayTime(time))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongBar)

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgb(40,40,40)",
        height: 52,
    },
    subContainer: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        alignContent: "flex-start",
        justifyContent: "center",
        marginLeft: '2.5%',
        marginRight: '2%',
        flex: 1
    },
    button: {
        color: "white",
        margin: 5
    },
    playButton: {
        height: 32,
        width: 32,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 32 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '2%'
      },
})