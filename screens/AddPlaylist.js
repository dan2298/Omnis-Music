import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { songPath, imagePath }  from '../util'
import SongOption from '../components/SongOption';
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
                {/* <ScrollView> */}
                    <View style={styles.topContainer}>
                        <Image style={styles.albumImg} source={{uri: imagePath(song.imageFileName)}}></Image>
                        <Text numberOfLines={1} style={{...styles.titleText, fontSize: 18, marginTop: '3%', marginBottom: '1%'}}>{song.name}</Text>
                        <Text numberOfLines={1} style={{...styles.titleText, color: 'rgba(255,255,255,0.5)', fontWeight: '500', marginTop: '0%'}}>{song.artist}</Text>
                    </View>
                    <View style={styles.optionContainer}>
                        <SongOption name={'Add to Favorites'} iconName={'heart-outline'}></SongOption>
                        <SongOption name={'Add to Playlist'} iconName={'playlist-plus'} navigate={navigate} song={song}></SongOption>
                        {/* <TouchableOpacity onPress={() => { 
                            this.props.addToQueue(song);
                            goBack();
                            queue();
                        }}> */}
                        <SongOption name={'Add to Queue'} iconName={'queue-music'} back={true} action={this.props.addToQueue} song={song} goBack={goBack}></SongOption>
                        {/* <PlaylistOption name={'Go to Queue'}></PlaylistOption> */}
                        <SongOption name={'Remove Song'} iconName={'remove-circle-outline'} back={true} action={this.props.deleteSong} song={song} goBack={goBack}></SongOption>
                    </View>
                    {/* </ScrollView> */}
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
        marginTop: '20%',
        marginBottom: '5%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    albumImg: {
        height: 230,
        width: 230,
    },
    optionContainer: {
        marginTop: '2%',
        marginBottom: '2%',
        flexDirection: 'column',
    },
    bottomContainer: {
        flex: 1,
        borderTopColor: 'rgba(150,150,150,0.5)',
        justifyContent: 'flex-end',
        marginBottom: '5%'
    },
    closeText: {
        color:'rgb(235, 235, 235)',
        textAlign: 'center', 
        fontSize: 18, 
        fontWeight: '400',
    },
})

const mapDispatchToProps = dispatch => {
    return {
        deleteSong: (song) => dispatch(deleteSong(song)),
        addToQueue: (song) => dispatch(addToQueue(song))
    }
}

export default connect(null, mapDispatchToProps)(AddPlaylist)