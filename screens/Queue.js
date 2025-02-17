import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';

import Header from '../components/QueueHeader'
import DownloadedSong from '../components/DownloadedSong'
import QueueSong from '../components/QueueSong'
import Controls from '../components/Controls'
import { pauseCurrentSong, playSong, playNextSong, playPreviousSong } from '../store'

class Queue extends React.Component {
    constructor() {
        super()
        this.state = {}
        this.play = this.play.bind(this)
        this.tapOptions = this.tapOptions.bind(this)
    }

    play() {
        if(this.props.current.playing){
            this.props.pauseCurrentSong()
        } else {
            this.props.playSong()
        }
    }

    tapOptions(song) {
        this.props.navigation.navigate("AddToPlaylistSong", { song, queue: this.onQueue });
    }

    render() {
        const { goBack, navigate } = this.props.navigation
        const current = this.props.current

        return(
            <View style={styles.container}>
                <LinearGradient style={{flex: 1}} colors={['rgb(50,50,50)', 'rgb(10,10,10)']}>
                    <Header navigation={this.props.navigation} onDownPress={goBack} onQueuePress={navigate} message={'Queue'}></Header>
                    <ScrollView>
                    <View style={styles.subContainer}>
                        <Text style={styles.subheaderText}>Now Playing</Text>
                        <DownloadedSong options={this.tapOptions}  song={this.props.current.song} highlighted={true} dl={false} tap={goBack}></DownloadedSong>
                    </View>
                    {this.props.queue.length ? 
                        <View style={styles.subContainer}>
                            <Text style={styles.subheaderText}>Next In Queue</Text>
                            {this.props.queue.map((item, idx) => {
                                return (
                                    <QueueSong name={item.name} artist={item.artist} key={idx}></QueueSong>
                                )
                            })}
                        </View>
                        : <View></View> }
                        <View style={styles.subContainer}>
                            <Text style={styles.subheaderText}>Next From: {this.props.current.playlist}</Text>
                            <View style={styles.subContainer}>
                            {this.props.currentList.map((item, idx) => {
                                return (
                                    <QueueSong name={item.name} artist={item.artist} key={idx}></QueueSong>
                                )
                            })}
                            </View>
                        </View>
                    </ScrollView>
                    <Controls playing={current.playing} play={this.play} playNext={this.props.playNextSong} playPrevious={this.props.playPreviousSong}></Controls>
                    <View style={{ marginBottom: '10%' }}></View>
                </LinearGradient>
            </View>
        )
    }

}

const mapStateToProps = state => {
    return {
        queue: state.queue,
        current: state.current,
        playlist: state.lists,
        currentList: state.currentList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        pauseCurrentSong: () => dispatch(pauseCurrentSong()),
        playSong: () => dispatch(playSong()),
        playNextSong: () => dispatch(playNextSong()),
        playPreviousSong: () => dispatch(playPreviousSong()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Queue);

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        backgroundColor:'rgb(20,20,20)',
    },
    subheaderText: {
        fontSize: 18,
        fontWeight: '700',
        color:'white',
        marginLeft: '2%',
        marginBottom: '2%'
    },
    subContainer: {
        marginBottom: '5%'
    }
})