import React from 'React';
import { View, Text, StyleSheet, Image, Slider, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Asset } from "expo-asset";
import { connect } from 'react-redux'

import Header from '../components/Header'
import Buttons from '../components/Buttons'

class Icon {
    constructor(module, width, height) {
        this.module = module;
        this.width = width;
        this.height = height;
        Asset.fromModule(this.module).downloadAsync();
    }
}

const thumb = new Icon(require("../../assets/thumb.png"), 12, 12);

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
let space;
let gap;

if (DEVICE_HEIGHT < 812) {
    space = 25;
    gap = 0;
} else if (DEVICE_HEIGHT >= 812 && DEVICE_HEIGHT < 896) {
    space = 35;
    gap = 30;
} else {
    space = 60;
    gap = 60;
}

const CurrentSong = props => {
    const { goBack, navigate } = props.navigation
    const methods = props.navigation.state.params
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#1d80b5', '#121212']} style={styles.background}>
                <Header
                    title={'Songs'}
                    goBack={goBack}
                    navigate={navigate}
                    playback={methods.playback}
                    onShufflePressed={methods.onShufflePressed}
                    onBackward={methods.onBackward}
                    onPlayPause={methods.onPlayPause}
                    onForward={methods.onForward}
                    onLoopPressed={methods.onLoopPressed}
                    isPlaying={props.isPlaying}
                >
                </Header>
                <View style={styles.container}>
                    <Image style={styles.mainImg} source={{ uri: props.currentSong.image }}></Image>
                    <Text numberOfLines={1} style={styles.title}>{props.currentSong.name}</Text>
                    <Text style={styles.artist}>{props.currentSong.artist}</Text>


                    <Slider
                        style={{ width: "90%", marginTop: '9%', marginBottom: 7, height: 5 }}
                        thumbImage={thumb.module}
                        minimumTrackTintColor='rgb(255,255,255)'
                        value={methods.getSliderPosition()}
                        onValueChange={methods.onSliderValueChange}
                        onSlidingComplete={methods.onSlidingComplete}
                    />

                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: 'white', marginRight: '35%' }}>{methods.timeStamp().position}</Text>
                        <Text style={{ color: 'white', marginLeft: '35%' }}>{methods.timeStamp().duration}</Text>
                    </View>
                    <Buttons
                        onShufflePressed={methods.onShufflePressed}
                        onBackward={methods.onBackward}
                        onPlayPause={methods.onPlayPause}
                        onForward={methods.onForward}
                        onLoopPressed={methods.onLoopPressed}
                    >
                    </Buttons>
                    <View style={styles.rowContainer}>
                        <Text style={{ color: 'white', marginRight: 10, fontSize: 16 }}>Rate:</Text>
                        <Slider
                            style={styles.slider}
                            thumbImage={thumb.module}
                            minimumValue={0.5}
                            maximumValue={1.5}
                            step={0.05}
                            value={props.navigation.state.params.rate}
                            onSlidingComplete={methods.onRateSliderSlidingComplete}
                        />
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
//rate text/ rate slider back to default on new song** (Add to store)
//shuffle button functionality

// ** SEARCH ** //
//add notification and status of download(modal)

// ** DEPLOYMENT ** //
//eject to react native