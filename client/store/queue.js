const GOT_QUEUE = 'GOT_QUEUE';

function gotQueue(songs) {
    return {
        type: GOT_QUEUE,
        songs
    }
}

export function getQueue() {
    return async (dispatch, getState) => {
        try {
            const songs = getState().songFiles.songs
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
        default:
            return state
    }
}

export default queueReducer;


