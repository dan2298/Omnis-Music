import React from 'React';
import { View, Text, StyleSheet, Image, Slider, Dimensions } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
let space;
let gap;

if (DEVICE_HEIGHT < 812) {
    space = 15;
    gap = 0;
} else if (DEVICE_HEIGHT >= 812 && DEVICE_HEIGHT < 896) {
    space = 30;
    gap = 5;
} else {
    space = 60;
    gap = 30;
}

const CurrentSong = props => {
    const { goBack, navigate } = props.navigation
    const methods = props.navigation.state.params
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#1d80b5', '#121212']} style={styles.background}>
                <Header title={'Songs'} goBack={goBack} navigate={navigate}></Header>
                <View style={styles.container}>
                    <Image style={styles.mainImg} source={{ uri: props.currentSong.image }}></Image>
                    <Text numberOfLines={1} style={styles.title}>{props.currentSong.name}</Text>
                    <Text style={styles.artist}>{props.currentSong.artist}</Text>


                    <Slider
                        style={{ width: "90%", marginTop: '9%', marginBottom: 7, height: 5 }}
                        thumbImage={require("../../assets/thumb.png")}
                        minimumTrackTintColor='rgb(255,255,255)'
                        value={methods.getSliderPosition()}
                        onValueChange={methods.onSliderValueChange}
                        onSlidingComplete={methods.onSlidingComplete}
                    />

                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: 'white', marginRight: '35%' }}>{methods.timeStamp().position}</Text>
                        <Text style={{ color: 'white', marginLeft: '35%' }}>{methods.timeStamp().duration}</Text>
                    </View>

                    <View style={{ ...styles.rowContainer, marginLeft: 10 }}>
                        <TouchableOpacity >
                            <Ionicons name="ios-shuffle" size={24} style={{ marginRight: space, color: "white" }} ></Ionicons>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={methods.onBackward}>
                            <MaterialCommunityIcons name="rewind" size={72} color="white"></MaterialCommunityIcons>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={methods.onPlayPause}>
                            {props.isPlaying ?
                                <MaterialCommunityIcons name="pause-circle" size={84} color='white'></MaterialCommunityIcons> :
                                <MaterialCommunityIcons name="play-circle" size={84} color="white"></MaterialCommunityIcons>
                            }
                        </TouchableOpacity>

                        <TouchableOpacity onPress={methods.onForward}>
                            <MaterialCommunityIcons name="fast-forward" size={72} color="white"></MaterialCommunityIcons>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={methods.onLoopPressed}>
                            <MaterialIcons name="loop" size={24} style={{ marginLeft: space, color: "white" }}></MaterialIcons>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.rowContainer}>
                        <Text style={{ color: 'white', marginRight: 10, fontSize: 16 }}>Rate:</Text>
                        <Slider
                            style={styles.slider}
                            thumbImage={require("../../assets/thumb.png")}
                            minimumValue={0.5}
                            maximumValue={1.5}
                            step={0.05}
                            value={props.navigation.state.params.rate}
                            onSlidingComplete={methods.onRateSliderSlidingComplete}
                        />
                        <Text style={{ color: 'white', marginLeft: 10, fontWeight: 'bold' }}>{props.navigation.state.params.rate}</Text>
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
        justifyContent: "center",
        alignItems: "center",
    },
    mainImg: {
        marginTop: space + space * 0.02,
        marginBottom: '2%',
        width: 300,
        height: 300,
        borderRadius: 6,
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    background: {
        height: '100%',
        width: '100%'
    },
    title: {
        color: "white",
        fontSize: 20,
        fontWeight: '700',
        margin: 8,
        marginTop: 2,
        marginBottom: 0,
        textAlign: "center"
    },
    artist: {
        color: "white",
        fontSize: 15,
        marginBottom: gap
    },
    slider: {
        width: DEVICE_WIDTH / 1.5
    }
})


// ** CURRENT SONG ** //

//immediate play and pause cause delay
//rate text/ rate slider back to default on new song

//random buttom on playlist
//show random/loop button clicked
//show queue of next songs 


// ** SONGLIST ** //
//delete on close in songlist
//single line on text on songbar
//song on click restart instead of play/pause


// ** SEARCH ** //
//songbar on different screens
//add screen on how to use app*

// ** DEPLOYMENT ** //
//eject to react native