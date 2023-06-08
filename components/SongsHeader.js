import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

const SongsHeader = props => {
    let name;
    let color;
    if (props.type === 'youtubeSongs') {
        name = 'Youtube'
        color = '#ff0011'
    } else if (props.type === 'spotifySongs') {
        name = 'Spotify'
        color = '#26c751'
    } else if (props.type === 'soundcloudSongs') {
        name = 'SoundCloud'
        color = '#ff8924'
    }

    return (
        <View style={styles.platforms}>
            <Text style={{ color: 'white', fontSize: 14, marginLeft:5 }}>{`${props.songs.length} results were found`}</Text>
            <Text style={{ ...styles.platformTitles, color: color }}>{name}</Text>
        </View>
    )
}

export default SongsHeader;

const styles = StyleSheet.create({
    platforms: {
        width: '100%',
        opacity: 0.9,
        backgroundColor: 'rgb(20,20,20)',
        borderRadius: 2,
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    platformTitles: {
        padding: '1%',
        fontSize: 14,
        textDecorationLine: "underline",
        marginRight: 1,
    },
})

