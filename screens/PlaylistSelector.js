import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { songPath, imagePath }  from '../util'
import { ScrollView } from 'react-native-gesture-handler';
import PlaylistOption from '../components/PlaylistOption';
import { connect } from 'react-redux'
import { addToList, addToQueue, deleteSong } from '../store'
​
​
class PlaylistSelector extends React.Component {
    constructor() {
        super()
        this.state = {}
    }
​
    render() {
        const { song } = this.props.route.params
        const { goBack, navigate } = this.props.navigation
        return(
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Add To Playlist</Text>
                </View>
                    <View style={styles.optionContainer}>
                        {this.props.playlists.map((playlist, idx) => {
                            if (idx) {
                                return (
                                    <TouchableOpacity key={idx} onPress={() => {
                                        this.props.addToList(song, playlist.name)
                                        goBack()
                                    }}>
                                        <PlaylistOption name={playlist.name}></PlaylistOption>
                                    </TouchableOpacity>
                                )
                            }
                        })}
                    </View>
                <TouchableOpacity style={styles.bottomContainer} onPress={goBack}>
                    <View>
                        <Text style={styles.closeText}>Close</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
​
}
​
const styles = StyleSheet.create({
    container: { 
        flex: 1,
        backgroundColor:'rgba(0,0,0,0.8)',
    },
    titleContainer: {
        marginTop: '10%',
    },
    titleText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        margin: '3%',
        textAlign: 'center'
    },
    topContainer: {
        marginTop: '15%',
        marginBottom: '5%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    albumImg: {
        height: 250,
        width: 250,
    },
    optionContainer: {
        marginTop: '20%',
        marginBottom: '1%',
        flexDirection: 'column',
    },
    bottomContainer: {
        flex: 1,
        borderTopColor: 'rgba(150,150,150,0.5)',
        justifyContent: 'flex-end',
        marginBottom: '5%'
    },
    closeText: {
        color:'rgb(245, 245, 245)',
        textAlign: 'center', 
        fontSize: 20, 
        fontWeight: '500',
    }  
})
​
const mapStateToProps = state => {
    return {
        playlists: state.lists,
    }
}
​
const mapDispatchToProps = dispatch => {
    return {
        deleteSong: (song) => dispatch(deleteSong(song)),
        addToQueue: (song) => dispatch(addToQueue(song)),
        addToList: (song, name) => dispatch(addToList(song, name))
    }
}
​
export default connect(mapStateToProps, mapDispatchToProps)(PlaylistSelector)