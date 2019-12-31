import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import songs from './songs';
import spotify from './spotify';
import youtube from './youtube';
import soundcloud from './soundcloud';
import currentSong from './currentSong';
import playing from './playing';
import queue from './queue'
import buttons from './buttons'

const reducer = combineReducers({
    songFiles: songs,
    currentSong,
    playing,
    queue,
    buttons,
    spotifySongs: spotify,
    youtubeSongs: youtube,
    soundcloudSongs: soundcloud,
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
export * from './queue'
export * from './buttons'