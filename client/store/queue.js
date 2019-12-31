const GOT_QUEUE = 'GOT_QUEUE';
const DELETED_QUEUE = 'DELETE_QUEUE'

function gotQueue(songs) {
    return {
        type: GOT_QUEUE,
        songs
    }
}

function deletedQueue(songs) {
    return {
        type: DELETED_QUEUE,
        songs
    }
}

export function deleteQueue(songName) {
    return async (dispatch, getState) => {
        try {
            const queue = getState().queue
            const newQueue = []
            for (let i = 0; i < queue.length; i++) {
                if (queue[i].fileName !== songName) {
                    newQueue.push(queue[i])
                }
            }
            dispatch(deletedQueue(newQueue))
        } catch (err) {
            console.error(err)
        }
    }
}

export function getQueue(original) {
    return async (dispatch, getState) => {
        try {
            let songs;
            if (original) {
                songs = getState().songFiles.songs
            } else {
                songs = getState().songFiles.list
            }
            const currSong = getState().currentSong
            let el;
            for (let i = 0; i < songs.length; i++) {
                if (currSong.fileName === songs[i].fileName) {
                    el = i + 1
                }
            }
            const newSongList = songs.slice(el)
            dispatch(gotQueue(newSongList))
        } catch (error) {
            console.log(error)
        }
    }
}

const queue = []

const queueReducer = (state = queue, action) => {
    switch (action.type) {
        case GOT_QUEUE:
            return action.songs
        case DELETED_QUEUE:
            return action.songs
        default:
            return state
    }
}

export default queueReducer;


