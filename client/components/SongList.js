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
                        <View style={{ borderColor: '#8a8a8a', borderBottomWidth: 1 }}>
                            <Text style={{ color: 'white' }}>{result.item.name}</Text>
                            <Image style={{ width: 50, height: 50 }} source={{ uri: result.item.image }}></Image>
                        </View>
                    </TouchableOpacity>
                )
            }}
        >
        </FlatList>
    )
}

export default SongList;