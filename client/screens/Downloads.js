import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../styles'
import Header from '../components/Header'
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

const Downloads = props => {
    return (
        <View style={styles}>
            <Header title={'Downloads'}></Header>
            <ScrollView>
                {props.songs.map((song, idx) => <Text key={idx} style={{ color: 'white' }}>{song}</Text>)}
            </ScrollView>
        </View>
    )
}

const mapStateToProps = state => {
    return {
        songs: state.songs
    }
}

export default connect(mapStateToProps)(Downloads)