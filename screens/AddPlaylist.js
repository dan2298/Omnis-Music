import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { songPath, imagePath }  from '../util'
import { ScrollView } from 'react-native-gesture-handler';
import PlaylistOption from '../components/PlaylistOption';
import { connect } from 'react-redux'
import { addToQueue, deleteSong } from '../store'


class AddPlaylist extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        const { song, queue } = this.props.route.params
        const { goBack, navigate } = this.props.navigation
        return(
            <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <Image style={styles.albumImg} source={{uri: imagePath(song.imageFileName)}}></Image>
                        <Text numberOfLines={1} style={{...styles.titleText, fontSize: 18, marginTop: '3%', marginBottom: '1%'}}>{song.name}</Text>
                        <Text numberOfLines={1} style={{...styles.titleText, color: 'rgba(255,255,255,0.5)', fontWeight: '500', marginTop: '0%'}}>{song.artist}</Text>
                    </View>
                    <View style={styles.optionContainer}>
                        <TouchableOpacity>
                            <PlaylistOption name={'Add to Favorites'}></PlaylistOption>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <PlaylistOption name={'Add to Playlist'}></PlaylistOption>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { 
                            this.props.addToQueue(song);
                            goBack();
                            queue();
                        }}>
                            <PlaylistOption name={'Add to Queue'}></PlaylistOption>
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={() => { navigate('Queue') }}>
                            <PlaylistOption name={'Go to Queue'}></PlaylistOption>
                        </TouchableOpacity> */}
                        <TouchableOpacity onPress={() => { 
                            this.props.deleteSong(song);
                            goBack();
                        }}>
                            <PlaylistOption name={'Remove Song'}></PlaylistOption>
                        </TouchableOpacity>
                    </View>
                <TouchableOpacity style={styles.bottomContainer} onPress={goBack}>
                    <View>
                        <Text style={styles.closeText}>Close</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        backgroundColor:'rgba(0,0,0,0.8)',
    },
    titleText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        margin: '3%'
    },
    topContainer: {
        marginTop: '30%',
        marginBottom: '5%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    albumImg: {
        height: 250,
        width: 250,
    },
    optionContainer: {
        marginTop: '2%',
        marginBottom: '1%',
        flexDirection: 'column',
    },
    bottomContainer: {
        flex: 1,
        borderTopColor: 'rgba(150,150,150,0.5)',
        justifyContent: 'center',
        marginTop: '8%'
    },
    closeText: {
        color:'rgb(245, 245, 245)',
        textAlign: 'center', 
        fontSize: 20, 
        fontWeight: '500',
    }  
})

const mapDispatchToProps = dispatch => {
    return {
        deleteSong: (song) => dispatch(deleteSong(song)),
        addToQueue: (song) => dispatch(addToQueue(song))
    }
}

export default connect(null, mapDispatchToProps)(AddPlaylist)