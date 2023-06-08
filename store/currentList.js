const GOT_CURRENT_LIST = 'GOT_CURRENT_LIST';

function gotCurrentList(songs) {
    return {
        type: GOT_CURRENT_LIST,
        songs
    }
}

export function getCurrentList(idx) {
    return async (dispatch, getState) => {
        try {
            const { currentList } = getState().current
            const newList = [];
            for(let i = idx+1; i < currentList.length; i++){
                newList.push(currentList[i])
            }
            dispatch(gotCurrentList(newList))
        } catch (err) {
            console.error(err)
        }
    }
}


const current = []

const currentList = (state = current, action) => {
    switch (action.type) {
        case GOT_CURRENT_LIST:
            return action.songs
        default:
            return state
    }
}

export default currentList;