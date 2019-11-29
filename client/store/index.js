import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import songs from './songs';
import spotify from './spotify';
import youtube from './youtube';
import currentSong from './currentSong'

const reducer = combineReducers({
    songs,
    currentSong,
    spotifySongs: spotify,
    youtubeSongs: youtube
})

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store = createStore(reducer, middleware)

export default store
export * from './songs'
export * from './spotify'
export * from './youtube'
export * from './currentSong'
