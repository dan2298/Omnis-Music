import React from 'React';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient';

import Header from '../components/Header';
import Song from '../components/Song'
import { FlatList } from 'react-native-gesture-handler';

const Queue = props => {
    const { goBack } = props.navigation
    const { playback } = props.navigation.state.params
    console.log(props.currentSong)
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#1d80b5', '#121212']} style={styles.background}>
                <Header title={'Queue'} goBack={goBack}></Header>
                <Text style={{ color: 'white', fontSize: 20 }}>Now Playing</Text>
                <Song
                    playback={playback}
                    artist={props.currentSong.artist}
                    image={props.currentSong.image}
                    type={props.currentSong.type}
                    name={props.currentSong.name}>
                </Song>
                <Text style={{ color: 'white', fontSize: 20 }}>Next From: Songs</Text>
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