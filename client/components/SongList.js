import React from 'react';
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';

const SongList = props => {
    return (
        <FlatList
            keyExtractor={(item, idx) => String(idx)}
            data={props.songs}
            renderItem={result => {
                return (
                    <TouchableOpacity onPress={props.download.bind(this, result.item)}>
                        <View style={{ borderColor: 'white', borderBottomWidth: 1 }}>
                            <Text style={{ color: 'white' }}>{result.item.name}</Text>
                            <Image style={{ width: 50, height: 50 }} source={{ uri: result.item.image }}></Image>
                        </View>
                    </TouchableOpacity>
                )
            }}
        >
        </FlatList>




        // props.type === 'youtube' ?
        //     <FlatList
        //         keyExtractor={item => item.id.videoId}
        //         data={props.youtubeSearchResults}
        //         renderItem={result => {
        //             return (
        //                 <TouchableOpacity onPress={props.youtubeDl.bind(this, result.item)}>
        //                     <View style={{ borderColor: 'white', borderBottomWidth: 1 }}>
        //                         <Text style={{ color: 'white' }}>{result.item.snippet.title}</Text>
        //                         <Image style={{ width: 50, height: 50 }} source={{ uri: result.item.snippet.thumbnails.default.url }}></Image>
        //                     </View>
        //                 </TouchableOpacity>
        //             )
        //         }}
        //     >
        //     </FlatList> :
        //     <FlatList
        //         keyExtractor={item => item.id}
        //         data={props.spotifySearchResults}
        //         renderItem={result => {
        //             return (
        //                 <TouchableOpacity onPress={props.spotifyDl.bind(this, result.item)}>
        //                     <View style={{ borderColor: 'white', borderBottomWidth: 1 }}>
        //                         <Text style={{ color: 'white' }}>{result.item.name}</Text>
        //                         <Image style={{ width: 50, height: 50 }} source={{ uri: result.item.album.images[2].url }}></Image>
        //                     </View>
        //                 </TouchableOpacity>
        //             )
        //         }}
        //     >
        //     </FlatList>
    )
}

export default SongList;