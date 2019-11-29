import React from 'react';
import { View } from 'react-native';
import styles from '../../styles';
import { LinearGradient } from 'expo-linear-gradient';

import Search from '../screens/Search';
import Downloads from '../screens/Downloads';
import CurrentSong from '../screens/CurrentSong';
import Header from './Header'

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator, } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import * as FileSystem from 'expo-file-system';
import { connect } from 'react-redux';
import { getSongs } from '../store'

(async () => {
    const { exists } = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}songs`)
    if (!exists) {
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}songs`)
    }
})()

const DownloadsStack = createStackNavigator({
    Downloads,
    CurrentSong,
})

const SearchStack = createStackNavigator({
    Search,
    CurrentSong
})

const TabNavigator = createBottomTabNavigator({
    Downloads: DownloadsStack,
    Search: SearchStack
},
    {
        tabBarOptions: {
            activeBackgroundColor: 'black',
            style: {
                backgroundColor: 'black',
                height: 50,
                borderTopColor: '#302f2f'
            }
        }
    }
);

const AppContainter = createAppContainer(TabNavigator);

const Index = props => {
    props.getSongs()
    return (

        <View contentContainerStyle={styles.container}>
            {/* <Container> */}
            <LinearGradient colors={['#3f6b6b', '#121212']} style={styles.header} >
                <AppContainter></AppContainter>
            </LinearGradient>

            {/* </Container> */}
        </View>

    );
}

const mapDispatchToProps = dispatch => {
    return {
        getSongs: () => dispatch(getSongs()),
    }
}

export default connect(null, mapDispatchToProps)(Index);