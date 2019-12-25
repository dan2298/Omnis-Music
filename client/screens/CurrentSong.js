import React from 'React';
import { View, Text, StyleSheet, Image, Slider, Dimensions } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header'
import { connect } from 'react-redux'
import { Asset } from "expo-asset";
import { TouchableOpacity } from 'react-native-gesture-handler';
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");

class Icon {
    constructor(module, width, height) {
        this.module = module;
        this.width = width;
        this.height = height;
        Asset.fromModule(this.module).downloadAsync();
    }
}
const thumb = new Icon(require("../../assets/thumb.png"), 10, 10)

const CurrentSong = props => {
    // let { onPlayPause } = props.navigation.state.params
    const { goBack } = props.navigation
    const methods = props.navigation.state.params

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#1d80b5', '#121212']} style={styles.background}>
                <Header title={'Songs'} back={true} goBack={goBack}></Header>
                <View style={styles.container}>
                    <Image style={styles.mainImg} source={{ uri: props.currentSong.image }}></Image>
                    <Text style={styles.title}>{props.currentSong.name}</Text>
                    <Text style={styles.artist}>{props.currentSong.artist}</Text>

                    <Slider
                        style={{ width: "90%", height: 2 }}
                        thumbImage={thumb.module}
                        minimumTrackTintColor='rgb(255,255,255)'
                        value={methods.getSliderPosition()}
                        onValueChange={methods.onSliderValueChange}
                        onSlidingComplete={methods.onSlidingComplete}
                    />

                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: 'white', marginRight: '35%', margin: 5 }}>{methods.timeStamp().position}</Text>
                        <Text style={{ color: 'white', marginLeft: '35%', margin: 5 }}>{methods.timeStamp().duration}</Text>
                    </View>

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity>
                            <Ionicons name="ios-shuffle" size={24} color="white"></Ionicons>
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
                            <MaterialCommunityIcons name="fast-forward" size={84} color="white"></MaterialCommunityIcons>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={props.navigation.state.params.onLoopPressed}>
                            <MaterialIcons name="loop" size={24} color="white"></MaterialIcons>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* <View style={styles.buttonsContainer}> */}
                {/* <Slider
                        style={ty.rateSlider}
                        //   trackImage={ICON_TRACK_1.module}
                        //   thumbImage={ICON_THUMB_1.module}
                        minimumValue={0.5}
                        maximumValue={1.5}
                        step={0.05}
                        value={props.navigation.state.params.rate}
                        onSlidingComplete={props.navigation.state.params.onRateSliderSlidingComplete}
                    /> */}
                {/* <TouchableOpacity
                            // underlayColor={BACKGROUND_COLOR}
                            // style={styles.wrapper}
                            onPress={props.navigation.state.params.onLoopPressed}
                        > */}
                {/* <Text style={{ color: 'white' }}>here</Text> */}
                {/* <Image
                            style={{ backgroundColor: 'white', height: 50, width: 50 }}
                            source={{ uri: 'https://www.google.com/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwjFj6TwtM_mAhVEmuAKHYbOCyEQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.iconfinder.com%2Ficons%2F134221%2Farrow_refresh_reload_repeat_sync_update_icon&psig=AOvVaw3ScQfntDCh6tBMdFbe-M4g&ust=1577315659730168' }}
                        /> */}
                {/* </TouchableOpacity> */}

                {/* </View> */}
                {/* </View> */}
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
        alignItems: "center",
    },

    mainImg: {
        marginTop: DEVICE_HEIGHT * 0.05,
        width: 300,
        height: 300,
        borderRadius: 6,
    },
    buttonsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        // marginTop: 20,
    },
    background: {
        height: '100%',
        width: '100%'
    },
    title: {
        color: "white",
        fontSize: 20,
        fontWeight: '700',
        margin: 5,
        marginTop: 3,
        marginBottom: 0,
        textAlign: "center"
    },
    artist: {
        color: "white",
        fontSize: 15,
        marginBottom: '5%'
    },
    // slider: {
    //     position: 'absolute',
    //     marginTop: height * 0.57,
    //     width: height * 0.3,
    //     transform: [{ rotateZ: '-90deg' }],
    //     marginLeft: 125,
    // }
})


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
{/* <Text style={{ color: 'white' }}>{props.navigation.state.params.rate}</Text> */ }

{/* <Ionicons name="md-checkmark-circle" size={32} color="green" /> */ }


// const Content = styled.View`
//   display:flex;
//   padding-left: 20px;
//   flex-direction: row;
//   align-items: center;
//   height: 80px;
// `;

// const Caption = styled.Text`
//   color: #3c4560;
//   font-size: 20px;
//   font-weight: 600;
// `;

// const Container = styled.View`
//   background: white;
//   width: 315px;
//   height: 280px;
//   border-radius: 14px;
//   margin: 10px 10px;
//   box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
// `;