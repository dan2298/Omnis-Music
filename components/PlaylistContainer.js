import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';
// import { convertFileUrl, convertFileName, songPath }  from '../util'
import Playlist from '../screens/Playlist';
import { imagePath } from '../util';

class PlaylistContainer extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

render() {
    return (
        <View>
            <TouchableOpacity style={styles.songContainer}>
                <View style={styles.container}>
                {this.props.list.name === 'Create Playlist'? 
                    <View style={styles.createContainer}>
                        <Icon style={styles.addIcon} name={'ios-add'} size={50}></Icon>
                    </View> : 
                    <View>
                        {this.props.list.name === 'All Songs' ?
                        <Image style={styles.albumImg} source={require('../img/liked-songs.png')}></Image> :
                        <Image style={styles.albumImg} source={require('../img/emptyPlaylist.png')}></Image>
                        }
                    </View>
                }
                </View>
                <View style={{flexDirection: 'column'}}>
                    <Text numberOfLines={1} style={{ color: 'white' , fontSize: 16, fontWeight: '400'}}>{this.props.list.name}</Text>
                    {this.props.list.name === 'Create Playlist'? 
                        <View></View> :
                        <Text style={{ color: 'rgba(200,200,200,0.6)' , fontSize: 14,}}>{this.props.list.songs.length} songs</Text>
                    }
                </View>
            </TouchableOpacity>
        </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        // songs: state.songs,
    }
}

export default connect(mapStateToProps)(PlaylistContainer)

const styles = StyleSheet.create({
    container: {
        shadowColor: "rgb(50,50,50)",
        shadowOffset: { width: 1},
        shadowOpacity: 0.5,
    },
    createContainer: {
        width: 75,
        height: 75,
        margin: 10, 
        padding: 0,
        backgroundColor: 'rgb(30,30,30)',
        borderWidth: .75,
        borderColor: 'rgba(40,40,40,.4)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addIcon: {
        color: 'rgb(220,220,220)',
        padding: 0,
        marginTop: '5%',
    },
    albumImg: {
        width: 75,
        height: 75,
        margin: 10, 
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 8,
        margin: 5,
        marginRight: 40
    },
    songContainer: {
        paddingBottom: 1,
        flexDirection: 'row',
        borderColor: 'rgb(30,30,30)',
        borderBottomWidth: .50,
        alignItems: 'center'
    },
    optionButtons: {
        color:'#b8bece',
        marginTop: '6%',
        marginRight: '4%'
    },
    downloadIndicator: {
        marginTop: '6%',
        marginRight: '3%'
    }
})

