const DOWNLOAD_ATTEMPTED = 'DOWNLOAD_ATTEMPTED'
const DOWNLOAD_SUCCESS = 'DOWNLOAD_SUCCESS';
const DOWNLOAD_ERROR = 'DOWNLOAD_ERROR';
const ANIMATION_DONE = 'ANIMATION_DONE'

function downloadAttempt() {
    return {
        type: DOWNLOAD_ATTEMPTED
    }
}

function downloadSuccess() {
    return {
        type: DOWNLOAD_SUCCESS
    }
}

function downloadError() {
    return {
        type: DOWNLOAD_ERROR
    }
}

function animationDone() {
    return {
        type: ANIMATION_DONE
    }
}

export function downloadAttempted() {
    return async dispatch => {
        try {
            dispatch(downloadAttempt())
        } catch (err) {
            console.error(err)
        }
    }
}

export function downloaded() {
    return async dispatch => {
        try {
            dispatch(downloadSuccess())
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

export function animationFinished() {
    return async dispatch => {
        try {
            dispatch(animationDone())
        } catch (err) {
            console.error(err)
        }
    }
}

const downloadState = {
    success: false,
    error: false,
    downloadAttempt: false
}

const downloadReducer = (state = downloadState, action) => {
    switch (action.type) {
        case ANIMATION_DONE:
            return { downloadAttempt: false, success: false, error: false }
        case DOWNLOAD_ATTEMPTED:
            return { ...state, downloadAttempt: !state.downloadAttempt }
        case DOWNLOAD_SUCCESS:
            return { ...state, success: !state.success }
        case DOWNLOAD_ERROR:
            return { ...state, error: !state.errors }
        default:
            return state
    }
}

export default downloadReducer;