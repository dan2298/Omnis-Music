const ADD_SONG = 'ADD_SONG';
const DELETE_SONG = 'DELETE_SONG'

function addedSong(song) {
    return {
        type: ADD_SONG,
        song
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
        } catch (error) {
            console.log(error)
        }
    }
}

const addedQueue = []

const addedQueueReducer = (state = addedQueue, action) => {
    switch (action.type) {
        case ADD_SONG:
            return [...addedQueue, action.song]
        case DELETE_SONG:
            return action.song
        default:
            return state
    }
}

export default addedQueueReducer;


