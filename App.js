import React from 'react';
import Index from './client/components/Index'
import { Provider } from 'react-redux'
import store from './client/store'

export default function App() {
  return (
    <Provider store={store}>
      <Index></Index>
    </Provider>
  );
}