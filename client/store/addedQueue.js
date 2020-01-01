const ADD_SONG = 'ADD_SONG';
const DELETE_SONG = 'DELETE_SONG'
const FINISHED_SONG = 'FINISHED_SONG'
const FINISHED_QUEUE = 'FINISHED_QUEUE'
const ON_PICKED = 'ON_PICKED'

function finishedQueue() {
    return {
        type: FINISHED_QUEUE
    }
}

function addedSong(song) {
    return {
        type: ADD_SONG,
        song
    }
}

function finishedSong() {
    return {
        type: FINISHED_SONG
    }
}

function onPicked(songs) {
    return {
        type: ON_PICKED,
        songs
    }
}

function deletedSong(song) {
    return {
        type: DELETE_SONG,
        song
    }
}

export function deleteQSong() {
    return async dispatch => {
        try {
            dispatch(deletedSong())
        } catch (err) {
            console.error(err)
        }
    }
}

export function addQSong(song) {
    return async dispatch => {
        try {
            dispatch(addedSong(song))
        } catch (err) {
            console.error(err)
        }
    }
}

export function onPick(song) {
    return async (dispatch, getState) => {
        try {
            const current = getState().addedQueue
            dispatch(onPicked(current.slice(song.index + 1)))
        } catch (err) {
            console.error(err)
        }
    }
}

export function finishSong() {
    return async dispatch => {
        try {
            dispatch(finishedSong())
        } catch (err) {
            console.error(err)
        }
    }
}

export function finishQueue() {
    return async dispatch => {
        try {
            dispatch(finishedQueue())
        } catch (err) {
            console.error(err)
        }
    }
}

const addedQueue = []

const addedQueueReducer = (state = addedQueue, action) => {
    switch (action.type) {
        case ADD_SONG:
            return [...state, { ...action.song, onQueue: true }]
        case DELETE_SONG:
            return action.song
        case ON_PICKED:
            return action.songs
        case FINISHED_SONG:
            return state.slice(1)
        default:
            return state
    }
}

export default addedQueueReducer;


