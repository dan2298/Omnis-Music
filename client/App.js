import React from 'react';
import Index from './components/Index'
import { Provider } from 'react-redux'
import store from './store'

export default function App() {
  return (
    <Provider store={store}>
      <Index></Index>
    </Provider>
  );
}