import React from 'React';
import { View, Text, StyleSheet, Image, Slider, Dimensions } from 'react-native';
import { connect } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';

const Queue = props => {
    // console.log(props)
    const { goBack } = props.navigation
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#1d80b5', '#121212']} style={styles.background}>
                <Header title={'Queue'} goBack={goBack}></Header>
                {/* <Text style={{ color: 'white', fontSize: 20 }}>HELLOOOO</Text> */}
                {props.queue.map((song, idx) => {
                    return (<Text numberOfLines={1} key={idx} style={{ color: 'white' }}>{song.info.name}</Text>)
                })}
            </LinearGradient>
        </View>
    )
}

Queue.navigationOptions = {
    header: null
}

mapStateToProps = state => ({
    queue: state.queue
})

export default connect(mapStateToProps)(Queue)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        height: '100%',
        width: '100%'
    }
})