import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import DownloadedSongList from '../components/DownloadedSongList';
import { getSongs, setNewSong, getCurrentList, seek } from '../store'
import { ScrollView } from 'react-native-gesture-handler';
import SongBar from '../components/SongBar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import QueueAnimation from '../components/QueueAnimation';
import Entypo from 'react-native-vector-icons/Entypo';

class Songs extends React.Component {
    constructor() {
        super()
        this.state = {
            queued: false
        }
        this.start = this.start.bind(this)
        this.tapOptions = this.tapOptions.bind(this)
        this.onQueue = this.onQueue.bind(this)
        this.animationFinish = this.animationFinish.bind(this)
    }
    
    animationFinish = () => {
        this.setState({ queued: false })
    }

    onQueue = () => {
        this.setState({ queued: true })
    }

    start(song, idx, list) {
        if(this.props.current.song.fileName === song.fileName){
            this.props.seek(0);
        } else {
            this.props.setNewSong(song, idx, list)
            this.props.getCurrentList(idx)
        }
    }

    tapOptions(song) {
        this.props.navigation.navigate("AddToPlaylist", { song, queue: this.onQueue });
    }

    render() {
        let songList;
        let listName;
        if(this.props.route.params) {
            songList = this.props.route.params.list.songs
            listName = this.props.route.params.list.name
        } else {
            songList = this.props.songs
            listName = 'All Songs'
        }  

        const removePlaylist = this.props.route.params.removePlaylist
        const { goBack, navigate } = this.props.navigation
        return ( 
            <View style={{ flex: 1, backgroundColor:'rgb(20,20,20)' }}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={goBack}>
                        <Entypo name='chevron-small-left' size={32} color={'rgba(255,255,255,0.75)'}></Entypo>
                    </TouchableOpacity>
                        <Text style={styles.headerTitle}>{listName.toUpperCase()}</Text>
                    <View style={{ width: 32}}></View>
                </View>
                {songList.length ?
                <View style={{flex: 1}}>
                    <ScrollView>
                        <DownloadedSongList remove={removePlaylist} onQueue={this.onQueue} tap={this.start} options={this.tapOptions} 
                        songs={songList} list={listName} currentSong={this.props.current.song.id}></DownloadedSongList>
                        {/* refresh={this.props.getSongs}  */}
                    </ScrollView>
                    
                    <QueueAnimation time={2000} state={this.state.queued} finish={this.animationFinish} text={'Queued'}></QueueAnimation> 
                    
                    <TouchableOpacity onPress={() => navigate('Song')}>
                        <SongBar navigate={navigate}></SongBar>
                    </TouchableOpacity> 
                </View> :
                <View style={styles.beforeAdd}>
                    <Text style={styles.middleText}>Looking for your music</Text>
                    <Text style={styles.middleSubText}>Music you download will appear here!</Text>
                </View>
                }
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        songs: state.songs,
        queue: state.queue,
        current: state.current,
        playlists: state.lists,
        currentList: state.currentList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSongs: () => dispatch(getSongs()),
        setNewSong: (song, index, list) => dispatch(setNewSong(song, index, list)),
        playNextSong: () => dispatch(playNextSong()),
        updateDuration: (data) => dispatch(updateDuration(data)),
        updatePlayTime: (time) => dispatch(updatePlayTime(time)),
        seek: (time) => dispatch(seek(time)),
        seeked: () => dispatch(seeked()),
        getCurrentList: (idx) => dispatch(getCurrentList(idx)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Songs);

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        width:'100%',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 12,
        paddingRight: 12,
        marginTop: '9%',
        borderBottomColor: 'rgb(30,30,30)',
        borderBottomWidth: 0.25
    },
    headerTitle: {
        flex: 1,
        color: 'white',
        alignSelf: 'center',
        textAlign: 'center', 
        color: 'rgba(255, 255, 255, 0.80)', 
        fontWeight: 'bold', 
        fontSize: 12,
    },
    beforeAdd: {
        flex: 1,
        marginBottom: '10%',
        justifyContent: "center",
        alignItems: "center",
    },
    middleText: { 
        color: 'rgb(155,155,155)', 
        fontSize: 22,
        fontWeight: '600' 
    },
    middleSubText: {
        color: 'rgb(125,125,125)',
        fontSize: 14,
        fontWeight: '400'
    }
})