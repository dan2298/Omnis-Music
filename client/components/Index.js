import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import SearchBar from './Search';
import Header from './Header';
import styles from '../../styles';
import { LinearGradient } from 'expo-linear-gradient';
import Downloads from '../screens/Downloads';
import Tabbar from './Tabbar'

// import { createBottomTabNavigator } from 'react-navigation-tabs';
const Index = props => {
    return (
        <View contentContainerStyle={styles.container}>
            {/* <LinearGradient colors={['#3f6b6b', '#121212']} style={styles.header} >
                <SearchBar></SearchBar>
            </LinearGradient>
            <FlatList style={styles.list} /> */}
            {/* <Downloads></Downloads> */}
            <Tabbar></Tabbar>
        </View>
    );
}

export default Index;
