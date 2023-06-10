const DOWNLOAD_SUCCESS = 'DOWNLOAD_SUCCESS';
const DOWNLOAD_ERROR = 'DOWNLOAD_ERROR';

function downloadSuccess(name) {
    return {
        type: DOWNLOAD_SUCCESS,
        name
    }
}

function downloadError() {
    return {
        type: DOWNLOAD_ERROR
    }
}

export function downloaded(song) {
    return async dispatch => {
        try {
            dispatch(downloadSuccess(song.fileName))
        } catch (err) {
            console.error(err)
        }
    }
}

export function notDownloaded() {
    return async dispatch => {
        try {
            dispatch(downloadError())
        } catch (err) {
            console.error(err)
        }
    }
}

const downloadState = {
    downloadedNames: [],
    downloadedError: [],
}

const downloadReducer = (state = downloadState, action) => {
    switch (action.type) {
        case DOWNLOAD_SUCCESS:
            const downloadedNames = [...state.downloadedNames, action.name]
            return Object.assign({ downloadedNames }, state)
        case DOWNLOAD_ERROR:
            return { ...state, downloadedError: [...action.song] }
        default:
            return state
    }
}

export default downloadReducer;
