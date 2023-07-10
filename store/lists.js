import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateCurrent } from './currentPlaying'

const GOT_PLAYLIST = 'GOT_PLAYLIST';
const CREATE_PLAYLIST = 'CREATE_PLAYLIST';
const ADD_TO_LIST = 'ADD_TO_LIST';
const REMOVE_FROM_LIST = 'REMOVE_FROM_LIST';
const GOT_SONGS_LIST = 'GOT_SONGS_LIST';
const DELETE_LIST = 'DELETE_LIST';

const gotLists = (lists) => ({
    type: GOT_PLAYLIST,
    lists
})
const gotSongsLists = (lists) => ({
    type: GOT_SONGS_LIST,
    lists
})
const createdList = (list) => ({
    type: CREATE_PLAYLIST,
    list
})
const addedToList = (lists) => ({
    type: ADD_TO_LIST,
    lists
})
const removedFromList = (lists) => ({
    type: REMOVE_FROM_LIST,
    lists
})
const deletedList = (lists) => ({
    type: DELETE_LIST,
    lists
})

export function getLists() {
    return async dispatch => {
        try {
            if (!(await AsyncStorage.getItem('lists'))){
                dispatch(createList('All Songs'))
                await AsyncStorage.setItem('lists', JSON.stringify([]))
            }
            const lists = JSON.parse(await AsyncStorage.getItem('lists'));
            dispatch(gotLists(lists))
        } catch (err) {
            console.error(err)
        }
    }
}

export function deleteList(name) {
    return async dispatch => {
        try {
            const lists = JSON.parse(await AsyncStorage.getItem('lists'));
            const newLists = lists.filter((list) => list.name !== name)
            await AsyncStorage.setItem('lists', JSON.stringify(newLists))
            dispatch(deletedList(newLists))
        } catch (err) {
            console.error(err)
        }
    }
}

export function getSongsList(songs) {
    return async dispatch => {
        try {
            const lists = JSON.parse(await AsyncStorage.getItem('lists'));
            lists[0].songs = songs
            await AsyncStorage.setItem('lists', JSON.stringify(lists))
            dispatch(gotSongsLists(lists))
        } catch (err) {
            console.error(err)
        }
    }
}

export function addToList(song, name) {
    return async dispatch => {
        try {
            let inArray = false
            const lists = JSON.parse(await AsyncStorage.getItem('lists'));
            let newList = [];
            newList.push(song);
            lists.forEach((list) => {
                if(list.name === name) {
                    list.songs.forEach((song) => {
                        if (song.name === newList[0].name && song.artist === newList[0].artist) {
                            inArray = true;
                        }
                    })
                    if (!inArray) {
                        list.songs = newList.concat(list.songs)
                    }
                }
            })
            await AsyncStorage.setItem('lists', JSON.stringify(lists))
            dispatch(addedToList(lists))
            if (name === 'All Songs'){
                dispatch(updateCurrent(lists))
            }
        } catch (err) {
            console.error(err)
        }
    }
}

export function removeFromList(song, name) {
    return async dispatch => {
        try {
            
            const lists = JSON.parse(await AsyncStorage.getItem('lists'));
            const newLists = lists.map((list) => {
                if(list.name === name) {
                    list.songs = list.songs.filter((songs) => songs.id !== song.id)
                    return list
                }
                return list
            })
            await AsyncStorage.setItem('lists', JSON.stringify(newLists))
            dispatch(removedFromList(newLists))
            // if (name === 'All Songs'){
                // dispatch(updateCurrent(lists))
            // }
        } catch (err) {
            console.error(err)
        }
    }
}

export function createList(name) {
    return async dispatch => {
        try {
            let lists = JSON.parse(await AsyncStorage.getItem('lists'));
            if (name) {
                let listExists = false;
                for (let i = 0; i < lists.length; i++) {
                  if (lists[i].name === name) {
                    listExists = true;
                    break;
                  }
                }
                if (!listExists) {
                  lists.push({ name: name.trim(), songs: [], image: [] });
                }
            } else {
                const newName = `My playlist #${lists.length}`
                lists.push({name: newName, songs: [], image: []})
            }
            await AsyncStorage.setItem('lists', JSON.stringify(lists))
            dispatch(createdList(lists))
            dispatch(getLists())
        } catch (err) {
            console.error(err)
        }
    }
}

// export function deleteSong(song) {
//     return async (dispatch, getState) => {
//         try {
//             const songs = getState().songs
//             await RNFS.unlink(songPath(song.fileName))
//             await RNFS.unlink(imagePath(song.imageFileName))
//             await AsyncStorage.removeItem(song.fileName)
//             const newSongs = songs.filter(el => el.fileName !== song.fileName && el.image !== song.image)
//             dispatch(deletedSong(newSongs))
//         } catch (err) {
//             console.error(err)
//         }
//     }
// }

const playlists = []
const playlistReducer = (state = playlists, action) => {
    switch (action.type) {
        case GOT_PLAYLIST:
            return action.lists
        case GOT_SONGS_LIST:
            return action.lists
        case CREATE_PLAYLIST: 
            return [...state, ...action.list]
        case ADD_TO_LIST:
            return action.lists
        case REMOVE_FROM_LIST:
            return action.lists
        case DELETE_LIST:
            return action.lists
        default:
            return state
    }
}
export default playlistReducer;