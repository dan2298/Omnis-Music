import React from 'React';
import { View, Text, StyleSheet, Image, Slider } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header'
import ty from '../../styles';
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
                    {/* <Ionicons name="md-checkmark-circle" size={32} color="green" /> */}
                    <Text style={styles.title}>{props.currentSong.name}</Text>
                    <Text style={styles.artist}>{props.currentSong.artist}</Text>
                    <Slider
                        style={{ width: "90%" }}
                        // trackImage={ICON_TRACK_1.module}
                        // thumbImage={ICON_THUMB_1.module}
                        value={props.navigation.state.params.getSliderPosition()}
                        onValueChange={props.navigation.state.params.onSliderValueChange}
                        onSlidingComplete={props.navigation.state.params.onSlidingComplete}
                    />
                    <Text style={{ color: 'white' }}>{props.navigation.state.params.timeStamp()}</Text>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity onPress={props.navigation.state.params.onBackward}>
                            <MaterialCommunityIcons name="rewind" size={96} color="white"></MaterialCommunityIcons>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            onPlayPause()
                        }}>
                            {props.isPlaying ?
                                <MaterialCommunityIcons name="pause-circle" size={96} color='white'></MaterialCommunityIcons> :
                                <MaterialCommunityIcons name="play-circle" size={96} color="white"></MaterialCommunityIcons>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={props.navigation.state.params.onFoward}>
                            <MaterialCommunityIcons name="fast-forward" size={96} color="white"></MaterialCommunityIcons>
                        </TouchableOpacity>
                    </View>
                    <Slider
                        style={ty.rateSlider}
                        //   trackImage={ICON_TRACK_1.module}
                        //   thumbImage={ICON_THUMB_1.module}
                        minimumValue={0.5}
                        maximumValue={1.5}
                        step={0.05}
                        value={props.navigation.state.params.rate}
                        onSlidingComplete={props.navigation.state.params.onRateSliderSlidingComplete}
                    />
                    {/* <Slider
                        minimumValue={0}
                        maximumValue={7}
                        minimumTrackTintColor="#1EB1FC"
                        maximumTractTintColor="#1EB1FC"
                        step={1}
                        value={props.navigation.state.params.rate}
                        onValueChange={value => console.log(value)}
                        style={styles.slider}
                        thumbTintColor="#1EB1FC"
                    /> */}
                    {/* <Text style={{ color: 'white' }}>{props.navigation.state.params.rate}</Text> */}
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
    },
    // slider: {
    //     position: 'absolute',
    //     marginTop: height * 0.57,
    //     width: height * 0.3,
    //     transform: [{ rotateZ: '-90deg' }],
    //     marginLeft: 125,
    // }
})