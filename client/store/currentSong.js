const GOT_CURRENT_SONG = 'GOT_CURRENT_SONG';

function gotCurrentSong(song) {
    return {
        type: GOT_CURRENT_SONG,
        song
    }
}

export function getCurrentSong(song) {
    return async dispatch => {
        try {
            dispatch(gotCurrentSong(song))
        } catch (err) {
            console.error(err)
        }
    }
}

const currentSong = {}

const currentSongReducer = (state = currentSong, action) => {
    switch (action.type) {
        case GOT_CURRENT_SONG:
            return action.song
        default:
            return state
    }
}

export default currentSongReducer;