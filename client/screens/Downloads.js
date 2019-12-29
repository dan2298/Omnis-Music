import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Header from '../components/Header'
import SongBar from '../components/SongBar'
import SwipeableRow from '../components/SwipeableRow'

import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
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
                    {this.props.songs.length ?
                        <FlatList
                            keyExtractor={(item, idx) => String(idx)}
                            data={this.props.songs}
                            renderItem={result => {
                                return (
                                    <SwipeableRow key={result.index}
                                        item={result.item}
                                        playback={methods.playback}
                                    >
                                    </SwipeableRow>
                                )
                            }}
                        >
                        </FlatList> :
                        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                            <Text style={{ color: '#b8bece', fontSize: 16, fontWeight: '600' }}>Your downloaded songs will appear here</Text>
                        </View>
                    }
                    {this.props.currentSong.name ?
                        <TouchableOpacity onPress={() => navigate("CurrentSong", {
                            isPlaying: methods.isPlaying,
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
        songs: state.songs,
        currentSong: state.currentSong,
        isPlaying: state.playing
    }
}

export default connect(mapStateToProps)(Downloads)

const styles = StyleSheet.create({
    downloadContainer: {
        flex: 1
    },
    header: {
        width: '100%',
        height: '100%'
    },
})