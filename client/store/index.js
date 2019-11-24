import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import songs from './songs';
import spotify from './spotify';
import youtube from './youtube';

const reducer = combineReducers({
    songs,
    spotifySongs: spotify,
    youtubeSongs: youtube
})

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store = createStore(reducer, middleware)

export default store
export * from './songs'
export * from './spotify'
export * from './youtube'
