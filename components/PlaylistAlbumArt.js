import React from 'react';
import { View, StyleSheet, Image, Dimensions,} from 'react-native';

const PlaylistAlbumArt = ({songs, height, width}) => {
    const length = songs.length - 1
    return (
        <View>
            {songs.length >= 4 ?
             <View style={{ height: height * 2, width: width * 2, margin: 10}}>
                <View style={{flexDirection: 'row'}}>
                    <Image style={{ height, width }} source={{ uri: songs[0].imageFileName === true ? imagePath(songs[length-3].imageFileName) : songs[length-3].image}} ></Image> 
                    <Image style={{ height, width }} source={{ uri: songs[1].imageFileName === true ? imagePath(songs[length-2].imageFileName) : songs[length-2].image}} ></Image> 
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Image style={{ height, width }} source={{ uri: songs[2].imageFileName === true ? imagePath(songs[length-1].imageFileName) : songs[length-1].image}} ></Image> 
                    <Image style={{ height, width }} source={{ uri: songs[3].imageFileName === true ? imagePath(songs[length].imageFileName) : songs[length].image}} ></Image> 
                </View>
             </View>
             :
             <Image style={{height: height * 2, width: width * 2, margin: 10}} source={{ uri: songs[0].imageFileName === true ? imagePath(songs[length].imageFileName) : songs[length].image}}/> 
            }
        </View>
    )
};

export default PlaylistAlbumArt;
