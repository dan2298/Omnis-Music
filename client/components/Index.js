import React from 'react';
import { View } from 'react-native';
import styles from '../../styles';
import { LinearGradient } from 'expo-linear-gradient';

import Search from './Search';
import Downloads from '../screens/Downloads';

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

const TabNavigator = createBottomTabNavigator({
    Downloads: { screen: Downloads },
    Search: { screen: Search }
},
    {
        tabBarOptions: {
            activeBackgroundColor: 'black',
            style: {
                backgroundColor: 'black',
                height: 40
            }
        }
    }
);

const AppContainter = createAppContainer(TabNavigator);

const Index = props => {
    return (
        <View contentContainerStyle={styles.container}>
            <LinearGradient colors={['#3f6b6b', '#121212']} style={styles.header} >
                <AppContainter style={styles.tabbar}></AppContainter>
            </LinearGradient>
        </View>
    );
}

export default Index;
