import React from 'react';
import { View } from 'react-native';
import styles from '../../styles';
import { LinearGradient } from 'expo-linear-gradient';

import * as FileSystem from 'expo-file-system';
import { connect } from 'react-redux';
import { getSongs } from '../store'
import AppContainter from '../SwitchNavigator'

(async () => {
    const { exists } = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}songs`)
    if (!exists) {
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}songs`)
    }
})()

const Index = props => {
    props.getSongs()
    return (
        <View contentContainerStyle={styles.container}>
            <LinearGradient colors={['#3f6b6b', '#121212']} style={styles.header} >
                <AppContainter></AppContainter>
            </LinearGradient>
        </View>

    );
}

const mapDispatchToProps = dispatch => {
    return {
        getSongs: () => dispatch(getSongs()),
    }
}

export default connect(null, mapDispatchToProps)(Index);