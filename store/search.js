const SEARCH_PLATFORMS = 'SEARCH_PLATFORMS';

function searchPlatforms(data) {
    return {
        type: SEARCH_PLATFORMS,
        data
    }
}


export function search(data) {
    return async dispatch => {
        try {
            dispatch(searchPlatforms(data))
        } catch (err) {
            console.log(err)
        }
    }
}

const platforms = ['spotifySongs', 'youtubeSongs', 'soundcloudSongs']

const searchReducer = (state = platforms, action) => {
    switch (action.type) {
        case SEARCH_PLATFORMS:
            return platforms;
        default:
            return state;
    }
}

export default searchReducer;