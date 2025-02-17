import { setCurrentIdx, setCurrentList } from './currentPlaying'

const GOT_CURRENT_LIST = 'GOT_CURRENT_LIST'

const gotCurrentList = currList => ({
    type: GOT_CURRENT_LIST,
    currList
})

export function getCurrentList(idx) {
    return async (dispatch, getState) => {
        try {
            const { currentList } = getState().current
            const newList = [];
            for(let i = idx+1; i < currentList.songs.length; i++){
                newList.push(currentList.songs[i])
            }

            const newPlaylist = Object.assign({}, { ...currentList, songs: newList })
            dispatch(gotCurrentList(newPlaylist))
        } catch (err) {
            console.error(err)
        }
    }
}

export function shuffleList() {
    return async (dispatch, getState) => {
        try {
            const current = getState().current
            const list = getState().lists.filter(list => list.name === current.playlist)[0]
            const map = {}
            const newList = []
            //find current Song index
            for (let i = 0; i < list.songs.length; i++) {
                if (list.songs[i].fileName === current.song.fileName) {
                    map[i] = list.songs[i].fileName
                    newList.push(current.song)
                }
            }

            // randomize songs 
            while (Object.keys(map).length !== list.songs.length) {
                const random = Math.floor(Math.random() * list.songs.length)
                if (!map[random]) {
                    map[random] = list.songs[random].fileName
                    newList.push(list.songs[random])
                }
            }

            const newPlaylist = {}
            Object.assign(newPlaylist, {...list, songs: newList, shuffle: true})
            dispatch(setCurrentList(newPlaylist))
            dispatch(setCurrentIdx(0))
        } catch (err) {
            console.error(err)
        }
    }
}

export function unShuffleList() {
    return async (dispatch, getState) => {
        try {
            const current = getState().current
            const list = getState().lists.filter(list => list.name === current.playlist)[0]
            let index = 0
            //find current Song index
            for (let i = 0; i < list.songs.length; i++) {
                if (list.songs[i].fileName === current.song.fileName) {
                    index = i
                }
            }

            dispatch(setCurrentList(list))
            dispatch(setCurrentIdx(index))
        } catch (err) {
            console.error(err)
        }
    }
}


const current = []

const currentList = (state = current, action) => {
    switch (action.type) {
        // case TOGGLE_SHUFFLE:
        //     return { ...state, shuffle: !!action.shuffle }
        // case GOT_SHUFFLED_LIST:
        //     return action.shuffledList
        case GOT_CURRENT_LIST:
            return action.currList
        default:
            return state
    }
}

export default currentList;