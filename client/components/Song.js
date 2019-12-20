import React from 'React'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
let color;
if (props.type === 'youtube') {
    color = '#ff0011'
} else if (props.type === 'spotify') {
    color = '#3bbf19'
} else if (props.type === 'soundcloud') {
    color = '#FF7700'
}

const Song = props => {
    return (
        <TouchableOpacity style={styles.songContainer} onPress={props.playback.bind(this, props)}>
            <Image style={{ width: 50, height: 50, margin: 5 }} source={{ uri: props.image }}></Image>
            <View style={styles.infoContainer}>
                <Text style={{ color: 'white' }}>{props.name}</Text>
                <Text style={{ color: '#d4d2d2', fontSize: 12 }}>{props.artist}</Text>
                <Text style={{ color: color, fontWeight: '300' }}>{props.type}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Song;

const styles = StyleSheet.create({
    infoContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        margin: 5
    },
    songContainer: {
        flex: 1,
        flexDirection: 'row',
        borderColor: '#8a8a8a',
        borderBottomWidth: 1
    }
})

