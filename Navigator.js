import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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
import PlaylistSelector from './screens/PlaylistSelector';
import { ModalPresentationIOS } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';

const Navigator = () => {
    const Tab = createBottomTabNavigator();
    const AppStack = createStackNavigator();
    const HomeStack = createStackNavigator();
    const SongStack = createStackNavigator();
    const PlaylistStack = createStackNavigator();
    const Tabs = () => (
        <Tab.Navigator
            // initialRouteName={Home}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') iconName = 'home';
                    else if (route.name === 'Search') iconName = 'search';
                    else if (route.name === 'Songs') iconName = 'albums'          
                    return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    // tabBarActiveTintColor: 'rgb(15,50,241,0.10)',
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
            name="MainHome"
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
          <PlaylistStack.Screen
            name="PlaylistSongs"
            component={Songs}
            options={{ headerShown: false }}
          />
          <PlaylistStack.Screen
            name="AddToPlaylist"
            component={AddPlaylist}
            options={{...TransitionPresets.ModalSlideFromBottomIOS, headerShown: false }}  
          />
          <PlaylistStack.Screen
            name="PlaylistSelector"
            component={PlaylistSelector}
            options={{...TransitionPresets.ModalSlideFromBottomIOS, cardOverlayEnabled: true, headerShown: false }}  
          />
        </PlaylistStack.Navigator>
      )
    }
    const SongsStack = () => (
        <SongStack.Navigator>
          <SongStack.Screen
            name="CurrentSong"
            component={Song}
            options={{ headerShown: false }}
          />
          <SongStack.Screen
            name="Queue"
            component={Queue}
            options={{...TransitionPresets.ModalSlideFromBottomIOS, headerShown: false }}
          />
          <SongStack.Screen
            name="AddToPlaylistSong"
            component={AddPlaylist}
            options={{...TransitionPresets.ModalSlideFromBottomIOS, headerShown: false }}  
          />
          <SongStack.Screen
            name="PlaylistSelectorSong"
            component={PlaylistSelector}
            options={{...TransitionPresets.ModalSlideFromBottomIOS, headerShown: false }}  
          />
        </SongStack.Navigator>
    )
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <AppStack.Navigator >
            <AppStack.Screen
              name="Tabs"
              component={Tabs}
              options={{ headerShown: false }}
            />
            <AppStack.Screen
              name="Song"
              component={SongsStack}
              options={{ ...TransitionPresets.ModalSlideFromBottomIOS, headerShown: false }}
            />
            <AppStack.Screen
              name="Queue"
              component={Queue}
              options={{ headerShown: false }}    
            />
          </AppStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    )
}
export default Navigator;
