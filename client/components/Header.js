import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../styles'

const Header = props => {
    return (
        <View style={styles.headerBar}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    );
}

export default Header;
