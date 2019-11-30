
const PLAYING = 'PLAYING';
const PAUSE = 'PAUSE'

function playing() {
    return {
        type: PLAYING
    }
}

function paused() {
    return {
        type: PAUSE
    }
}

export function pause() {
    return async dispatch => {
        try {
            dispatch(paused())
        } catch (err) {
            console.error(err)
        }
    }
}

export function play() {
    return async dispatch => {
        try {
            dispatch(playing())
        } catch (err) {
            console.error(err)
        }
    }
}

const playingState = false

const playingReducer = (state = playingState, action) => {
    switch (action.type) {
        case PLAYING:
            return true
        case PAUSE:
            return false
        default:
            return state
    }
}

export default playingReducer;