import React from 'React';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList } from 'react-native-gesture-handler';

import Header from '../components/Header';
import Song from '../components/Song'
import Buttons from '../components/Buttons'


const Queue = props => {
    const { goBack } = props.navigation
    const { playback } = props.navigation.state.params
    const methods = props.navigation.state.params
    // console.log(props)
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#1d80b5', '#121212']} style={styles.background}>
                <Header title={'Queue'} goBack={goBack}></Header>
                <Text style={{ color: 'white', fontSize: 20, padding: 4 }}>Now Playing</Text>
                {/* <Song
                    playback={playback}
                    artist={props.currentSong.artist}
                    image={props.currentSong.image}
                    type={props.currentSong.type}
                    name={props.currentSong.name}>
                </Song> */}
                <Text style={{ padding: 4, fontSize: 40 }}>Current song go here</Text>
                <Text style={{ color: 'white', fontSize: 20, padding: 4 }}>Next From: Songs</Text>
                <FlatList
                    keyExtractor={(item, idx) => String(idx)}
                    data={props.queue}
                    renderItem={result => {
                        const song = result.item.info
                        return (
                            <Song
                                playback={playback}
                                artist={song.artist}
                                image={song.image}
                                type={song.type}
                                name={song.name}>
                            </Song>
                        )
                    }}
                >
                </FlatList>
                <Buttons
                    onShufflePressed={methods.onShufflePressed}
                    onBackward={methods.onBackward}
                    onPlayPause={methods.onPlayPause}
                    onForward={methods.onForward}
                    onLoopPressed={methods.onLoopPressed}
                ></Buttons>
            </LinearGradient>
        </View>
    )
}

Queue.navigationOptions = {
    header: null
}

mapStateToProps = state => ({
    currentSong: state.currentSong,
    queue: state.queue
})

export default connect(mapStateToProps)(Queue)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        height: '100%',
        width: '100%'
    }
})