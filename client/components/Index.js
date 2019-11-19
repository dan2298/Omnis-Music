import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import SearchBar from './Search';
import styles from '../../styles'
import { LinearGradient } from 'expo-linear-gradient';

const Index = props => {
    return (
        <View contentContainerStyle={styles.container}>
            <LinearGradient colors={['#3f6b6b', '#121212']} style={styles.header} >
                <SearchBar></SearchBar>
            </LinearGradient>
            <FlatList style={styles.list} />
        </View>
    );
}

export default Index;
