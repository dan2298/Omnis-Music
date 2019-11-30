import React from 'React'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Song = props => {
    return (
        <TouchableOpacity style={styles.songContainer} onPress={props.playback.bind(this, props)}>
            <Image style={{ width: 50, height: 50, margin: 5 }} source={{ uri: props.img }}></Image>
            <View style={styles.infoContainer}>
                <Text style={{ color: 'white' }}>{props.name}</Text>
                <Text style={{ color: '#d4d2d2', fontSize: 12 }}>{props.creator}</Text>
                <Text style={{ color: props.type === 'Youtube' ? '#ff0011' : '#3bbf19', fontWeight: '300' }}>{props.type}</Text>
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

