import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux'
import { songPath, imagePath }  from '../util'
​
class DownloadedSong extends React.Component {
    constructor() {
        super()
        this.state = {
            progress: ''
        }
    }
​
    render() {
        let color;
        const song = this.props.song
        let width = this.props.width
        if (song.type === 'Youtube') {
            color = '#ff0011'
        } else if (song.type === 'Spotify') {
            color = '#26c751'
        } else if (song.type === 'Soundcloud') {
            color = '#ff8924'
        }
​
        return (
            <View>
                {song.name ?
                <TouchableOpacity style={{...styles.songContainer, borderBottomWidth: width}} onPress={() => this.props.tap(song, this.props.idx, this.props.list)}>
                    <View style={styles.container}>
                        <Image style={styles.albumImg} source={{ uri: song.imageFileName === true ? imagePath(song.imageFileName) : song.image}}></Image>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={{ flexDirection: "row" }}>
                            {song.download === true && this.props.dl === true?
                                <Ionicons name='arrow-down-circle' style={{color: '#0244de', marginRight: 3, marginTop: 1}} size={15}></Ionicons> :
                                <View></View>
                            }
                            <Text numberOfLines={1} style={{ color: 'white' , fontSize: 15,
                             fontWeight: '500', color: song.name === this.props.current.song.name ? '#002df7' : 'white'}}>{song.name}</Text>
                        </View>
                        <Text numberOfLines={1} style={{ color: 'rgb(180, 180, 180)', fontSize: 14}}>{song.artist}</Text>
                        <Text style={{ color: color, fontWeight: '500', fontSize: 12 }}>{song.type}</Text>
                    </View>
                    {song.download < 100 && song.download !== true ? 
                        <ProgressCircle
                            percent={Number(song.download)/100}
                            radius={10}
                            borderWidth={1}
                            color="#3399FF"
                            shadowColor="rgb(50,50,50)"
                            bgColor="rgb(30,30,30)"
                            outerCircleStyle={styles.downloadIndicator}
                        /> :
                        <TouchableOpacity style={{ marginTop:'6%' }} onPress={() => this.props.options(song)}>
                            <Icon name='dots-three-horizontal' size={18} style={styles.optionButtons}></Icon>
                        </TouchableOpacity>
                    }
                </TouchableOpacity> :
                <View>
​
                </View>
                }
            </View>
        )
    }
}
​
const mapStateToProps = state => {
    return {
        current: state.current,
        download: state.download,
        songs: state.songs,
    }
}
​
export default connect(mapStateToProps)(DownloadedSong)
​
const styles = StyleSheet.create({
    container: {
        shadowColor: "rgb(50,50,50)",
        shadowOffset: { width: 1},
        shadowOpacity: 0.5,
    },
    albumImg: {
        width: 50,
        height: 50,
        margin: 10, 
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginTop: 8,
        margin: 5,
        marginRight: 40
    },
    songContainer: {
        paddingBottom: 1,
        flexDirection: 'row',
        borderColor: 'rgb(25,25,25)',
    },
    optionButtons: {
        color:'#b8bece',
        marginRight: '4%'
    },
    downloadIndicator: {
        marginTop: '6%',
        marginRight: '3%'
    },
    audioElement: {
        height: 0,
        width: 0,
    }
})