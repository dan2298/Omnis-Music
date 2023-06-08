import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react'
import { Provider } from 'react-redux';
import Index from './screens/Index'
import { NavigationContainer } from '@react-navigation/native';

import store from './store'

class App extends React.Component {
  render() {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <Index></Index>
        </Provider>
      </GestureHandlerRootView>
    )
  }
}

export default App;