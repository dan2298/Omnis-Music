import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import FadeAnimation from './FadeAnimation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux'

class QueueAnimation extends React.Component {
    reset() {
        setTimeout(() => this.props.finish(), this.props.time)
    }

    render() {
        if (this.props.state) {
            this.reset()
        }

        return (
            <View style={styles.container}>
                {this.props.state ?
                    <FadeAnimation time={this.props.time}>
                        <View style={styles.animation}>
                            <Ionicons name='checkmark' size={84} style={styles.icon}></Ionicons>
                            <Text style={styles.text}>{this.props.text}</Text>
                        </View>
                    </FadeAnimation> :
                    <View></View>
                }
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        download: state.download
    }
}

export default connect(mapStateToProps)(QueueAnimation);

const styles = StyleSheet.create({
    container: {
        marginTop: '50%',
        position: 'absolute',
        alignSelf: "center",
    },
    animation: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        height: 155,
        width: 155,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        color: "white"
    },
    text: {
        color: "white",
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center"
    }
})