import React from 'React'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../../styles'

const Song = props => {
    return (
        <TouchableOpacity style={styles.songContainer} onPress={props.loadPlayback.bind(this, props.songName)}>
            <Image style={{ width: 50, height: 50, margin: 5 }} source={{ uri: props.img }}></Image>
            <View style={styles.infoContainer}>
                <Text style={{ color: 'white' }}>{props.name}</Text>
                <Text style={{ color: 'white' }}>{props.creator}</Text>
                <Text style={{ color: props.type === 'Youtube' ? 'red' : 'green' }}>{props.type}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Song;