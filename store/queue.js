const GOT_QUEUE = 'GOT_QUEUE';
const ADD_QUEUE = 'ADD_QUEUE';
const DELETE_QUEUE = 'DELETE_QUEUE'

function gotQueue(songs) {
    return {
        type: GOT_QUEUE,
        songs
    }
}

function deletedQueue(songs) {
    return {
        type: DELETE_QUEUE,
        songs
    }
}

function addedToQueue(song) {
    return {
        type: ADD_QUEUE,
        song
    }
}

export function addToQueue (song) {
    return async (dispatch) => {
        song.onQueue = true;
        dispatch(addedToQueue(song))
    }
}

export function getQueue() {
    return async (dispatch, getState) => {
        try {
            // remove song after set
            const queue = getState().queue
            const newQueue = []
            for (let i = 1; i < queue.length; i++) {
                newQueue.push(queue[i])
            }
            dispatch(gotQueue(newQueue))
        } catch (err) {
            console.error(err)
        }
    }
}

export function deleteSongQueue(song) {
    return async (dispatch, getState) => {
        try {
            // remove song from entire queue
            const queue = getState().queue
            const newQueue = []
            console.log(song)
            console.log('=========')
            for (let i = 0; i < queue.length; i++) {
                console.log(queue[i])
                if(song.fileName !== queue[i].fileName){
                    newQueue.push(queue[i])
                }
            }
            dispatch(gotQueue(newQueue))
        } catch (err) {
            console.error(err)
        }
    }
}

const queue = []

const queueReducer = (state = queue, action) => {
    switch (action.type) {
        case ADD_QUEUE:
            state.push(action.song)
            return state
        case GOT_QUEUE:
            return action.songs
        case DELETE_QUEUE:
            return action.songs
        default:
            return state
    }
}

export default queueReducer;