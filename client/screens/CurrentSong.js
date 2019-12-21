import React from 'React';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header'

import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler';

const CurrentSong = props => {
    let { onPlayPause } = props.navigation.state.params
    const { goBack } = props.navigation
    return (
        <View>
            <LinearGradient colors={['#1d80b5', '#121212']} style={styles.background}>
                <Header title={'Songs'} back={true} goBack={goBack}></Header>
                <View style={styles.container}>
                    <Image style={styles.mainImg} source={{ uri: props.currentSong.image }}></Image>
                    {/* <Text style={styles.circle}>View</Text> */}
                    {/* <Ionicons name="md-checkmark-circle" size={32} color="green" /> */}
                    <Text style={styles.title}>{props.currentSong.name}</Text>
                    <Text style={styles.artist}>{props.currentSong.artist}</Text>
                    <View style={styles.buttonsContainer}>
                        {<MaterialCommunityIcons name="rewind" size={96} color="white"></MaterialCommunityIcons>}
                        <TouchableOpacity onPress={() => {
                            onPlayPause()
                        }}>
                            {props.isPlaying ?
                                <MaterialCommunityIcons name="pause-circle" size={96} color='white'></MaterialCommunityIcons> :
                                <MaterialCommunityIcons name="play-circle" size={96} color="white"></MaterialCommunityIcons>
                            }
                        </TouchableOpacity>
                        {<MaterialCommunityIcons name="fast-forward" size={96} color="white"></MaterialCommunityIcons>}
                    </View>
                </View>
            </LinearGradient>
        </View >

    )
}

const mapStateToProps = state => {
    return {
        currentSong: state.currentSong,
        isPlaying: state.playing
    }
}

CurrentSong.navigationOptions = {
    header: null
}

export default connect(mapStateToProps)(CurrentSong)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    mainImg: {
        width: 300,
        height: 300,
        borderRadius: 12
    },
    buttonsContainer: {
        flexDirection: "row",
        margin: 20
    },
    background: {
        height: '100%',
        width: '100%'
    },
    title: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        padding: 4,
        margin: 5,
        textAlign: "center"
    },
    artist: {
        color: "white",
        fontSize: 14,
        padding: 2
    }
})