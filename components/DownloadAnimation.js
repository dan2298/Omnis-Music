import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import FadeAnimation from './FadeAnimation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux'

class DownloadAnim extends React.Component {
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
                            <Ionicons name='checkmark-circle-outline' size={96} style={styles.icon}></Ionicons>
                            {/* <Octicons name='x' size={96} style={styles.icon}></Octicons> */}
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

export default connect(mapStateToProps)(DownloadAnim);

const styles = StyleSheet.create({
    container: {
        marginTop: '50%',
        position: 'absolute',
        alignSelf: "center",
    },
    animation: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: 205,
        width: 205,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#5c5c5c',
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        color: "white"
    },
    text: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center"
    }
})