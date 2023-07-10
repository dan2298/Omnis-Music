import React from 'react'
import { View } from 'react-native';
import DownloadedSong from './DownloadedSong';
import Swipeable from 'react-native-swipeable-v1';
import { connect } from 'react-redux'
import { addToQueue, deleteSong, removeFromList } from '../store'

import Icon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const DownloadedSongList = props => {    
    return (
        <View>
            {props.songs.length ?
                <View>
                    {props.songs.map((song,idx) => {
                        return (
                            <Swipeable key={idx}
                            leftContent={(
                                <View style={{flex:1, alignItems: 'flex-end', marginRight:1, justifyContent: 'center', paddingRight: '6%', backgroundColor: '#069c29'}}>
                                    <Icon name='playlist-add' size={36} color={"white"}></Icon>
                                </View>
                            )}
                            rightContent={(
                                <View style={{flex:1, justifyContent: 'center', paddingLeft: '6%', backgroundColor: '#bd0404'}}>                                    
                                    <MCIcon name='playlist-remove' size={36} color={"white"}></MCIcon>
                                </View>
                            )}
                            onRightActionRelease={() => {
                                if (props.remove) {
                                    props.removeFromList(song, props.list)
                                } else {
                                    props.deleteSong(song)
                                }
                            }}
                            onLeftActionRelease={() => {
                                props.onQueue()
                                props.addToQueue(song)
                            }}>
                                <DownloadedSong options={props.options} tap={props.tap} song={song} idx={idx} width={1} list={props.list} 
                                dl={true} highlighted={song.id === props.currentSong ? true: false }></DownloadedSong>
                            </Swipeable>
                        )
                    })} 
                </View> :
                <View>
                    <DownloadedSong song={{}}></DownloadedSong>
                </View>
            }
        </View>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        removeFromList: (song, name) => dispatch(removeFromList(song, name)),
        deleteSong: (song) => dispatch(deleteSong(song)),
        addToQueue: (song) => dispatch(addToQueue(song))
    }
}

export default connect(null, mapDispatchToProps)(DownloadedSongList)