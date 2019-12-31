import * as FileSystem from 'expo-file-system';
import { AsyncStorage } from 'react-native'

const GOT_SONGS = 'GOT_SONGS'
const GOT_ORIGINAL_LIST = 'GET_ORIGINAL_LIST'
const GOT_SHUFFLED_LIST = 'GET_SHUFFLED_LIST'
const DELETED_SONG = 'DELETE_SONG'
const ADDED_SONG = 'ADDED_SONG'

const gotSongs = songs => ({
    type: GOT_SONGS,
    songs
})

const gotOriginalList = songs => ({
    type: GOT_ORIGINAL_LIST,
    songs
})

const gotShuffledList = songs => ({
    type: GOT_SHUFFLED_LIST,
    songs
})

const addedSong = (list) => ({
    type: ADDED_SONG,
    list
})

const deletedSong = (songs, list) => ({
    type: DELETED_SONG,
    songs,
    list
})

export function getOriginalList() {
    return async dispatch => {
        try {
            const songs = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}songs`)
            const newSongs = songs.map(async (song, idx) => {
                const info = JSON.parse(await AsyncStorage.getItem(song))
                return { ...info, fileName: song }
            })

            Promise.all(newSongs).then(values => {
                dispatch(gotOriginalList(values))
            })
        } catch (err) {
            console.error(err)
        }
    }
}

export function getSongs() {
    return async dispatch => {
        try {
            const songs = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}songs`)
            const newSongs = songs.map(async (song, idx) => {
                const info = JSON.parse(await AsyncStorage.getItem(song))
                return { ...info, fileName: song }
            })

            Promise.all(newSongs).then(values => {
                dispatch(gotSongs(values))
            })
        } catch (err) {
            console.error(err)
        }
    }
}

export function shuffleList() {
    return async (dispatch, getState) => {
        try {
            const list = getState().songFiles.list
            const currSong = getState().currentSong

            const map = {}
            const newList = []
            //find current Song index
            for (let i = 0; i < list.length; i++) {
                if (list[i].fileName === currSong.fileName) {
                    map[i] = list[i].fileName
                    newList.push(currSong)
                }
            }
            //randomize songs 
            while (Object.keys(map).length !== list.length) {
                const random = Math.floor(Math.random() * list.length)
                if (!map[random]) {
                    map[random] = list[random].fileName
                    newList.push(list[random])
                }
            }
            dispatch(gotShuffledList(newList))
        } catch (err) {
            console.error(err)
        }
    }
}

export function addSong(fileName) {
    return async (dispatch, getState) => {
        try {
            const newList = getState().songFiles.list
            const newSong = JSON.parse(await AsyncStorage.getItem(fileName))
            newList.push({ ...newSong, fileName })
            dispatch(addedSong(newList))
        } catch (err) {
            console.error(err)
        }
    }
}

export function deleteSong(songName) {
    return async (dispatch, getState) => {
        try {
            const songs = getState().songFiles.songs
            const list = getState().songFiles.list
            await FileSystem.deleteAsync(`${FileSystem.documentDirectory}songs/${songName}`)
            const newSongs = []
            const newList = []
            for (let i = 0; i < songs.length; i++) {
                if (songs[i].fileName !== songName) {
                    newSongs.push(songs[i])
                }
                if (list[i].fileName !== songName) {
                    newList.push(list[i])
                }
            }
            dispatch(deletedSong(newSongs, newList))
        } catch (err) {
            console.error(err)
        }
    }
}


const songFiles = {
    songs: [],
    list: []
}

const songReducer = (state = songFiles, action) => {
    switch (action.type) {
        case GOT_SONGS:
            return { ...state, songs: action.songs, }
        case ADDED_SONG:
            return { ...state, list: action.list }
        case GOT_ORIGINAL_LIST:
            return { ...state, list: action.songs }
        case GOT_SHUFFLED_LIST:
            return { ...state, list: action.songs }
        case DELETED_SONG:
            return { songs: action.songs, list: action.list }
        default:
            return state
    }
}

export default songReducer;

