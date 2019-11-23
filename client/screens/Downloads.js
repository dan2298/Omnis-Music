import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../styles'
import Header from '../components/Header'

const Downloads = props => {
    return (
        <View style={styles}>
            <Header title={'Downloads'}></Header>
            <Text style={{ color: 'white' }}>No Downloads</Text>
        </View>
    );
}

export default Downloads;
