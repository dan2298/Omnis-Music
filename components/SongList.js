import React from 'react'
import { View, TouchableOpacity } from 'react-native';
import Song from '../components/Song';

const SongList = props => {
    return (
        <View>
            {props.songs.map((song,idx) => {
                return (
                    <TouchableOpacity key={idx}>
                        <Song tap={props.tap} song={song}></Song>
                    </TouchableOpacity>
                )
            })} 
        </View>
    )
}


export default SongList;