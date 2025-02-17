/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { PropsWithChildren } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import Index from './screens/Index'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home'
import Search from './screens/Search'
import Playlist from './screens/Playlist';
import Navigator from './Navigator';
import { Provider } from 'react-redux';
import store from './store'
import Index from './screens/Index';

  function App() {
    // render() {
      return (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Provider store={store}>
            <Index></Index>
          </Provider>
        </GestureHandlerRootView>
      )
    // }
  }
  
export default App;
