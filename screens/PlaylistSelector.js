import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Keyboard } from 'react-native'
import { songPath, imagePath }  from '../util'
import { ScrollView } from 'react-native-gesture-handler';
import SongOption from '../components/SongOption';
import { connect } from 'react-redux'
import { addToList, addToQueue, deleteSong } from '../store'
import Ionicons from 'react-native-vector-icons/Ionicons';
import PlaylistAlbumArt from '../components/PlaylistAlbumArt'

class PlaylistSelector extends React.Component {
    constructor() {
        super()
        this.state = {
            input: '',
            searched: false,
        }
        this.searchInputHandler = this.searchInputHandler.bind(this)
        this.clearSearch = this.clearSearch.bind(this)
    }

    searchInputHandler = input => {
        this.setState({ input })
    }

    softClear = () => {
        this.setState({ input: '' })
    }

    clearSearch = () => {
        this.setState({ input: '', searched: false })
    }

    search = () => {
        console.log('test WORK')
    }

    render() {
        const { song } = this.props.route.params
        const { goBack, navigate } = this.props.navigation
        return(
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.closeContainer} onPress={() => {
                            goBack()
                            goBack()
                        }
                        }>
                        <Text style={styles.closeText}>Cancel</Text>
                    </TouchableOpacity>
                    <Text style={styles.titleText}>Add To Playlist</Text>
                </View>
                <TouchableOpacity style={styles.newPlaylistButton}>
                    <Text style={styles.newPlaylistText}>New Playlist</Text>
                </TouchableOpacity>

                {/* SearchBar */}
                <View style={styles.searchContainer}>
                    <View style={this.state.input || this.state.searched ? styles.searchBarAfterContainer : styles.searchBarContainer}>
                        <TouchableOpacity onPress={this.search}>
                            <Ionicons name='ios-search' size={24} color='#b8bece' style={{ padding: 4 }}></Ionicons>
                        </TouchableOpacity>
                        <TextInput
                            placeholder="Find playlist"
                            placeholderTextColor='#b8bece'
                            style={styles.searchBar}
                            onSubmitEditing={this.search}
                            onChangeText={this.searchInputHandler}
                            ref={input => { this.textInput = input }}
                        >
                        </TextInput>
                        {this.state.input ?
                            <TouchableOpacity style={{ padding: 2 }} onPress={() => {
                                this.textInput.clear()
                                this.softClear()
                            }}>
                                <Ionicons name='ios-close' size={28} color='#b8bece' style={{ padding: 2, paddingBottom: 0 }}></Ionicons>
                            </TouchableOpacity> :
                            <View style={{ paddingLeft: 16, padding: 2, paddingBottom: 3 }}></View>
                        }
                    </View> 
                    {this.state.input || this.state.searched ?
                        <TouchableOpacity style={{ marginBottom: '5%' }} onPress={() => {
                            this.textInput.clear()
                            this.clearSearch()
                            Keyboard.dismiss()
                        }}>
                            <Text style={{color:'white', fontSize: 15, paddingTop: 20, marginLeft: '14%', fontWeight: '600'}}>Cancel</Text>
                        </TouchableOpacity> :
                        <View></View>
                    }
                </View>

                {/* list of playlist */}
                <View style={styles.optionContainer}>
                    {this.props.playlists.map((playlist, idx) => {
                        if (idx) {
                            return (
                                <TouchableOpacity style={styles.playlistContainer} key={idx} onPress={() => {
                                    this.props.addToList(song, playlist.name)
                                    goBack()
                                    goBack()
                                }}>
                                    {playlist.songs.length > 0 ? 
                                        <PlaylistAlbumArt height={30} width={30} songs={playlist.songs}></PlaylistAlbumArt> :
                                        <Image style={styles.albumImg} source={require('../img/emptyPlaylist.png')}></Image>
                                    }
                                    <View style={{marginTop: 10}}>
                                        <Text style={styles.playlistName}>{playlist.name}</Text>
                                        <Text style={{ color: 'white' }}>{playlist.songs.length} tracks</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                    })}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        backgroundColor:'rgb(40,40,40)',
    },
    headerContainer: {
        backgroundColor:'rgba(30,30,30,0.95)',
        flexDirection: 'row',
        paddingTop: '6%',
        paddingLeft: '5%',
    },
    titleText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        margin: '5%',
        marginBottom: '4%',
        textAlign: 'center',  
    },
    closeText: {
        color:'rgba(245, 245, 245, 0.9)',
        fontSize: 13, 
        fontWeight: '500',
        marginTop: '25%',
        margin: '4%',
        marginRight: '8%'
    },
    newPlaylistButton: {
        margin: '5%',
        marginTop: '8%',
        marginBottom: '2%',
        width: '40%',
        height: '7%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 40,
    },
    newPlaylistText: {
        fontSize: 18,
        fontWeight: '700'
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: '10%',
        backgroundColor: "rgb(40,40,40)",
        borderBottomColor: "rgb(60,60,60)",
        borderBottomWidth: .5
    },
    searchBarContainer: {
        alignItems: "center",
        marginLeft: 12,
        marginBottom: 6,
        padding: 3,
        width: '94%',
        backgroundColor: '#444',
        flexDirection: 'row',
        borderRadius: 12,
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        justifyContent: "space-around"
    },
    searchBarAfterContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 12,
        width: "78%",
        backgroundColor: '#444',
        flexDirection: 'row',
        borderRadius: 12,
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        justifyContent: "space-around"
    },
    searchBar: {
        height: 36,
        width: '80%',
        fontSize: 16,
        color: 'white',
    },
    playlistContainer: {
        flexDirection: 'row',
        marginTop: '2%'
    },
    albumImg: {
        height: 60,
        width: 60,
        margin: 10 
    },
    playlistName: {
        margin: '2%',
        fontSize: 18,
        color: 'white',
        fontWeight: '600'
    }
})

const mapStateToProps = state => {
    return {
        playlists: state.lists,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteSong: (song) => dispatch(deleteSong(song)),
        addToQueue: (song) => dispatch(addToQueue(song)),
        addToList: (song, name) => dispatch(addToList(song, name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistSelector)