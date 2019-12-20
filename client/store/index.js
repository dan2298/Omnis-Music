import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import songs from './songs';
import spotify from './spotify';
import youtube from './youtube';
import soundcloud from './soundcloud';
import currentSong from './currentSong';
import playing from './playing';

const reducer = combineReducers({
    songs,
    currentSong,
    playing,
    spotifySongs: spotify,
    youtubeSongs: youtube,
    soundcloudSongs: soundcloud
})

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store = createStore(reducer, middleware)

export default store
export * from './songs'
export * from './spotify'
export * from './youtube'
export * from './soundcloud'
export * from './currentSong'
export * from './playing'