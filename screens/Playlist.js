import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native'
import SongBar from '../components/SongBar';
import { updatePlayTime, updateDuration, playNextSong, seeked, createList, deleteList} from '../store'
import Video from 'react-native-video';
import { songPath } from '../util'
import { connect } from 'react-redux'
import PlaylistContainer from '../components/PlaylistContainer'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from "react-native-modal";

class Playlist extends React.Component {
    constructor() {
        super()
        this.state = {
            
        }
        this.seek = this.seek.bind(this)
    }

    onPlayProgress = ({ currentTime, playableDuration }) => {
        this.props.updatePlayTime(currentTime)
    }
  
    loadSong = (data) => {
        this.props.updateDuration(Math.round(Number(data.duration)))
    }

    onPlayEnd = () => {
        this.props.playNextSong()
    }

    seek(time) {
        time = Math.round(time);
        this.refs.audio && this.refs.audio.seek(time);
        this.props.seeked()
    }

    render() {
        const video = (
            <Video source={{uri: songPath(this.props.current.song.fileName) }}
                ref="audio"
                volume={1}
                muted={false}
                paused={!this.props.current.playing}
                playInBackground={true}
                playWhenInactive={true}
                progressUpdateInterval={1000}
                onProgress={this.onPlayProgress}
                onLoad={this.loadSong}
                onEnd={this.onPlayEnd}
                repeat={false}/>
        );

        if (this.props.current.seek) {
            this.seek(this.props.current.seekTime)
        }

        const { navigate } = this.props.navigation
        // const [isModalVisible, setIsModalVisible] = React.useState(false);

        let isModalVisible = false
        const handleModal = () => !isModalVisible;

        return(
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <Text style={{color: 'white', fontSize: 24, margin: '8%', marginTop: '13%', textAlign: 'center'}}>Songs</Text>
                    <ScrollView>
                    {/* <TouchableOpacity onPress={() => this.props.deleteList('My playlist #4')}> */}
                    <TouchableOpacity onPress={handleModal}>
                        <PlaylistContainer key={'key'} list={{ name: 'Create Playlist', songs: [] }} tap={this.createPlaylist}></PlaylistContainer>
                    </TouchableOpacity>
                    <Modal isVisible={isModalVisible}>
                        <View style={{ flex: 1 }}>
                            <Text>Hello!</Text>
                            <Button title="Hide modal" onPress={handleModal} />
                        </View>
                    </Modal>

                    <TouchableOpacity onPress={() => navigate('PlaylistSongs', {list: this.props.playlists[0]})}>
                        <PlaylistContainer key={0} list={this.props.playlists[0]} tap={navigate}></PlaylistContainer>
                    </TouchableOpacity>
                    {this.props.playlists.map((list,idx) => {
                        if (idx) {
                            return (
                                <TouchableOpacity key={idx} onPress={() => navigate('PlaylistSongs', { list, removePlaylist: true})}>
                                    <PlaylistContainer list={list} tap={navigate}></PlaylistContainer>
                                </TouchableOpacity>
                            )
                        }
                    })}
                    </ScrollView>
                </View>
                {video}
                <TouchableOpacity onPress={() => navigate('Song')}>
                    <SongBar navigate={navigate}></SongBar>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        playlists: state.lists,
        current: state.current,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        playNextSong: () => dispatch(playNextSong()),
        updateDuration: (data) => dispatch(updateDuration(data)),
        updatePlayTime: (time) => dispatch(updatePlayTime(time)),
        seeked: () => dispatch(seeked()),
        createList: () => dispatch(createList()),
        deleteList: (name) => dispatch(deleteList(name)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        backgroundColor:'rgb(20,20,20)',
    },
})