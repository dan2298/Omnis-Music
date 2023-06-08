import { combineReducers, applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import youtube from './youtube';
import spotify from './spotify';
import soundcloud from './soundcloud';
import songs from './songs';
import download from './download'
import search from './search';
import queue from './queue';
import categories from './categories';
import currentPlaying from './currentPlaying';
import lists from './lists';
import currentList from './currentList';

const reducer = combineReducers({
    youtubeSongs: youtube,
    spotifySongs: spotify,
    soundcloudSongs : soundcloud,
    platforms: search,
    current: currentPlaying,
    lists,
    queue,
    categories,
    songs,
    download,
    currentList,
})

// const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store = configureStore({
    reducer: {
        youtubeSongs: youtube,
        spotifySongs: spotify,
        soundcloudSongs : soundcloud,
        platforms: search,
        current: currentPlaying,
        lists,
        queue,
        categories,
        songs,
        download,
        currentList,
    }
})

export default store
export * from './youtube'
export * from './spotify'
export * from './soundcloud'
export * from './songs'
export * from './download'
export * from './search'
export * from './queue'
export * from './categories'
export * from './currentPlaying'
export * from './lists'
export * from './currentList'
