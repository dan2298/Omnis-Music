import React from 'React';
import { View, Text, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import Header from '../components/Header';
import Song from '../components/Song'
import Buttons from '../components/Buttons'


const Queue = props => {
    let color;
    if (props.currentSong.type === 'Youtube') {
        color = '#ff0011'
    } else if (props.currentSong.type === 'Spotify') {
        color = '#26c751'
    } else if (props.currentSong.type === 'Soundcloud') {
        color = '#FF7700'
    }
    const { goBack } = props.navigation
    const { playback } = props.navigation.state.params
    const methods = props.navigation.state.params
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#1d80b5', '#121212']} style={styles.background}>
                <Header title={'Queue'} goBack={goBack}></Header>
                <Text style={styles.subTitles}>Now Playing</Text>

                <TouchableOpacity style={styles.row} onPress={goBack}>
                    <Image style={{ width: 65, height: 65, margin: 5 }} source={{ uri: props.currentSong.image }}></Image>
                    <View style={styles.infoContainer}>
                        <Text style={{ color: 'white' }}>{props.currentSong.name}</Text>
                        <Text style={{ color: '#d4d2d2', fontSize: 12 }}>{props.currentSong.artist}</Text>
                        <Text style={{ color: color, fontWeight: '300' }}>{props.currentSong.type}</Text>
                    </View>
                </TouchableOpacity>

                {props.addedQueue.length ?
                    <View>
                        <Text style={styles.subTitles}>Next In Queue</Text>
                        <FlatList
                            keyExtractor={(item, idx) => String(idx)}
                            data={props.addedQueue}
                            renderItem={result => {
                                const song = result.item
                                return (
                                    <Song
                                        playback={playback}
                                        index={result.index}
                                        artist={song.artist}
                                        image={song.image}
                                        type={song.type}
                                        name={song.name}
                                        onQueue={song.onQueue}
                                        fileName={song.fileName}
                                    >
                                    </Song>
                                )
                            }}
                        >
                        </FlatList>
                    </View> :
                    <View></View>
                }

                <Text style={styles.subTitles}>Next From: Songs</Text>
                <FlatList
                    keyExtractor={(item, idx) => String(idx)}
                    data={props.queue}
                    renderItem={(result, idx) => {
                        const song = result.item
                        return (
                            <Song
                                playback={playback}
                                artist={song.artist}
                                image={song.image}
                                type={song.type}
                                name={song.name}
                                fileName={song.fileName}
                            >
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
    addedQueue: state.addedQueue,
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
    },
    subTitles: {
        color: "white",
        fontSize: 18,
        padding: 4,
        textDecorationLine: "underline"
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#d4d2d2"
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        margin: 5
    }
})