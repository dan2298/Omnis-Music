import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux'
import { pauseCurrentSong, playSong, playNextSong, playPreviousSong, seek, turnShuffleOn, turnShuffleOff, changeRate } from '../store'
import { MMSSfromMillis, imagePath } from '../util'
import Header from '../components/Header'
import AlbumArt from '../components/AlbumArt'
import Controls from '../components/Controls'

class CurrentSong extends React.Component {
    constructor() {
        super();
        this.play = this.play.bind(this)
        this.shuffle = this.shuffle.bind(this)
    }

    play() {
        if(this.props.current.playing){
            this.props.pauseCurrentSong()
        } else {
            this.props.playSong()
        }
    }

    shuffle() {
        if (this.props.current.currentList.shuffle) {
            this.props.turnShuffleOff(this.props.current.currentList)
        } else {
            this.props.turnShuffleOn(this.props.current.currentList)
        }
    }

    render() {
        const { goBack, navigate } = this.props.navigation
        const current = this.props.current
        return (
            <LinearGradient style={styles.container} colors={['rgb(60,60,60)', 'rgb(20,20,20)']}>
                <Header navigation={this.props.navigation} onDownPress={goBack} onQueuePress={navigate} message={current.song.name}></Header>
                    <AlbumArt image={imagePath(current.song.imageFileName)}></AlbumArt>
                    <View style={styles.trackContainer}>
                        <View style={styles.detailsWrapper}>
                            <Text numberOfLines={1} style={styles.title}>{current.song.name}</Text>
                            <Text numberOfLines={1} style={styles.artist}>{current.song.artist}</Text>
                        </View> 
                    </View>
                    <Slider 
                        thumbImage={require('../img/thumb.png')} 
                        minimumTrackTintColor='rgb(255,255,255)' 
                        maximumValue={current.duration}
                        onSlidingComplete={this.props.seek}
                        value={current.currentTime}
                        style={{ marginBottom: 0, marginTop: '3%', width: '91%'}}
                    />
                    <View style={{ flexDirection: "row" , bottom: 12}}>
                        <Text style={{ color: 'white', marginRight: '36%', fontSize: 14, opacity: 0.7 }}>{MMSSfromMillis(current.currentTime)}</Text>
                        <Text style={{ color: 'white', marginLeft: '36%', fontSize: 14, opacity: 0.7}}>{MMSSfromMillis(current.duration)}</Text>
                    </View>
                    <Controls playing={current.playing} play={this.play} playNext={this.props.playNextSong} playPrevious={this.props.playPreviousSong} isShuffleOn={current.currentList.shuffle} onPressShuffle={this.shuffle}></Controls>
                <View style={styles.rateContainer}>
                    <Text style={{color: 'white', fontSize: 18, marginRight: 20 }}>Rate:</Text>
                    <Slider 
                        value={1} 
                        thumbImage={require('../img/thumb.png')} 
                        minimumTrackTintColor='rgb(255,255,255)'
                        minimumValue={0.5}
                        maximumValue={1.5}
                        default={1}
                        step={.05}
                        onSlidingComplete={this.props.changeRate}
                        style={{ width: '80%'}}></Slider>
                </View>
            </LinearGradient>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        current: state.current,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        pauseCurrentSong: () => dispatch(pauseCurrentSong()),
        playSong: () => dispatch(playSong()),
        playNextSong: () => dispatch(playNextSong()),
        playPreviousSong: () => dispatch(playPreviousSong()),
        turnShuffleOn: (list) => dispatch(turnShuffleOn(list)),
        turnShuffleOff: (list) => dispatch(turnShuffleOff(list)),
        seek: (time) => dispatch(seek(time)),
        changeRate: (rate) => dispatch(changeRate(rate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentSong)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    background: {
        height: '100%',
        width: '100%'
    },
    trackContainer: {
        paddingTop: 20,
        flexDirection: 'row',
        paddingLeft: 48,
        alignItems: 'center',
        paddingRight: 48,
        paddingBottom: 4
    },
    detailsWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    artist: {
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: 14,
        marginTop: 4,
    },
    rateContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 50,
        marginRight: '5%',
        width: '70%'
    },
})