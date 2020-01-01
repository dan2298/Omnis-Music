import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import FadeAnimation from '../components/FadeAnimation';
import { Octicons, Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux'

class DownloadAnim extends React.Component {
    reset() {
        setTimeout(() => this.props.finish(), 2000)
    }

    render() {
        if (this.props.state) {
            this.reset()
        }

        return (
            <View style={styles.container}>
                {this.props.state ?
                    <FadeAnimation >
                        <View style={styles.animation}>
                            {/* {this.props.downloaded ? */}
                            <Ionicons name='ios-checkmark-circle-outline' size={96} style={styles.icon}></Ionicons>
                            {/* <Octicons name='x' size={96} style={styles.icon}></Octicons> */}
                            {/* } */}
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