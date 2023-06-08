import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './screens/Home'
import Search from './screens/Search'
import Songs from './screens/Songs'
import Settings from './screens/Settings'
import Song from './screens/Song'
import Queue from './screens/Queue'
import Playlist from './screens/Playlist'
import AddPlaylist from './screens/AddPlaylist'

const Navigator = () => {
    const Tab = createBottomTabNavigator();
    const AppStack = createStackNavigator();
    const HomeStack = createStackNavigator();
    const SongStack = createStackNavigator();
    const PlaylistStack = createStackNavigator();
    const AddPlaylistStack = createStackNavigator();

    const Tabs = () => (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                      iconName = 'ios-home';
                    } else if (route.name === 'Search') {
                      iconName = 'ios-search';
                    } else if (route.name === 'Songs') {
                      iconName = 'ios-albums'
                    }

                    return <Ionicons name={iconName} size={size} style={{marginTop: 5}} color={color} />;
                    },
                    // activeTintColor: 'red',
                    inactiveTintColor: 'rgb(150,150,150)',
                    tabBarStyle: {
                        backgroundColor: 'rgb(40,40,40)',
                        borderTopColor: 'rgb(30,30,30)',
                    },
                    headerShown: false,
                })}
            >
            <Tab.Screen name="Home" component={HomesStack}/>
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Songs" component={PlaylistsStack} />
        </Tab.Navigator>
    )

    const HomesStack = () => {
      return (
        <HomeStack.Navigator>
          <HomeStack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <HomeStack.Screen
            name="Settings"
            component={Settings}
            options={{ headerShown: false }}
          />
        </HomeStack.Navigator>
      )
    }

    const PlaylistsStack = () => {
      return (
        <PlaylistStack.Navigator>
          <PlaylistStack.Screen
            name="Playlist"
            component={Playlist}
            options={{ headerShown: false }}
          />
          {/* <PlaylistStack.Screen
            name="AddPlaylistStack"
            component={AddPlaylistsStack}
            options={{ headerShown: false }}  
          /> */}
          <PlaylistStack.Screen
            name="Songs"
            component={Songs}
            options={{ headerShown: false }}
          />
        </PlaylistStack.Navigator>
      )
    }

    const SongsStack = () => (
        <SongStack.Navigator mode={'modal'}>
          <SongStack.Screen
            name="Song"
            component={Song}
            options={{ headerShown: false }}
          />
          <SongStack.Screen
            name="Queue"
            component={Queue}
            options={{ headerShown: false }}
          />
        </SongStack.Navigator>
    )

    const AddPlaylistsStack = () => (
      <AddPlaylistStack.Navigator mode={'modal'}>
          {/* <AddPlaylistStack.Screen
            name="Playlist"
            component={PlaylistsStack}
            options={{ headerShown: false }}
          /> */}
          <AddPlaylistStack.Screen
            name="AddPlaylist"
            component={AddPlaylist}
            options={{ headerShown: false }}  
          />
      </AddPlaylistStack.Navigator>
    )

    return (
      <NavigationContainer>
        <AppStack.Navigator mode={'modal'}>
          <AppStack.Screen
            name="Home"
            component={Tabs}
            options={{ headerShown: false }}
          />
          <AppStack.Screen
            name="Song"
            component={SongsStack}
            options={{ headerShown: false }}
          />
          <AppStack.Screen
            name="AddPlaylist"
            component={AddPlaylist}
            options={{ headerShown: false }}
          />
          <AppStack.Screen
            name="Queue"
            component={Queue}
            options={{ headerShown: false }}    
          />
        </AppStack.Navigator>
      </NavigationContainer>
    )
}

export default Navigator;
