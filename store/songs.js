import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { replaceElemInArr, convertFileName, convertImageName, noDuplicateArrays, songPath, imagePath } from '../util'
import { createList, addToList, getSongsList, getLists } from './lists'
const originalSongPath = `${RNFS.DocumentDirectoryPath}/songs`

const GOT_SONGS = 'GOT_SONGS'
const DOWNLOAD_STARTED = 'DOWNLOAD_STARTED'
const DOWNLOADED_SONG = 'DOWNLOADED_SONG'
const DELETE_SONG = 'DELETE_SONG'
// const GOT_SHUFFLED_LIST = 'GET_SHUFFLED_LIST'

const gotSongs = (songs) => ({
    type: GOT_SONGS,
    songs
})

// const gotShuffledList = songs => ({
//     type: GOT_SHUFFLED_LIST,
//     songs
// })

const deletedSong = (songs) => {
    return {
        type: DELETE_SONG,
        songs
    }
}

const downloadStarted = (song) => {
    return {
        type: DOWNLOAD_STARTED,
        song
    }
}

const downloaded = (song) => ({
    type: DOWNLOADED_SONG,
    song
})


export function getSongs() {
    //get playlist instead of songs
    return async dispatch => {
        try {
            const songs = await RNFS.readdir(originalSongPath)
            console.log(songs)
            if (songs.length) {
                const newSongs = songs.map(async (song, idx) => {
                    const info = JSON.parse(await AsyncStorage.getItem(song))
                    if(info) {
                        return info
                    }
                })

                Promise.all(newSongs).then(values => {
                    values = values.filter(el => {if(el) return el})
                    values = values.sort((a, b) => a.date < b.date)
                    dispatch(getSongsList(values))
                    dispatch(gotSongs(values))
                })
            }
            else {
                dispatch(createList('All Songs'))
                dispatch(gotSongs([]))
            }
        } catch (err) {
            console.error(err)
        }
    }
}

// export function shuffleList() {
//     return async (dispatch, getState) => {
//         try {
//             const list = getState().songFiles.list
//             const currSong = getState().currentSong

//             const map = {}
//             const newList = []
//             //find current Song index
//             for (let i = 0; i < list.length; i++) {
//                 if (list[i].fileName === currSong.fileName) {
//                     map[i] = list[i].fileName
//                     newList.push(currSong)
//                 }
//             }
//             //randomize songs 
//             while (Object.keys(map).length !== list.length) {
//                 const random = Math.floor(Math.random() * list.length)
//                 if (!map[random]) {
//                     map[random] = list[random].fileName
//                     newList.push(list[random])
//                 }
//             }
//             dispatch(gotShuffledList(newList))
//         } catch (err) {
//             console.error(err)
//         }
//     }
// }

export function startDownload(song) {
    return async (dispatch) => {
        try {
            console.log('here in startDownload')
            const iname = convertImageName(song)
            await RNFS.downloadFile({ fromUrl: song.image, toFile: imagePath(iname) })
            const sname = convertFileName(song)
            song.fileName = sname
            song.download = 0;
            song.date = String(new Date())
            console.log(song)
            dispatch(downloadStarted(song))
        } catch (err) {
            console.log(err)
        }
    }
}

export function downloadSong (song) {
    //add to playlist instead of song
    return async (dispatch) => {
        try {
            if(song.download === true) {
                const iname = convertImageName(song)
                song.imageFileName = iname
                await AsyncStorage.setItem(song.fileName, JSON.stringify(song))
                dispatch(addToList(song, 'All Songs'))
            }
            dispatch(downloaded(song)) 
        } catch (err) {
            console.log(err)
        }
    }
}

export function deleteSong(song) {
    return async dispatch => {
        try {
            let lists = JSON.parse(await AsyncStorage.getItem('lists')) 
            const newList = lists[0].songs.filter(el => el.fileName !== song.filename && el.image !== song.image)
            lists[0].songs = newList

            await AsyncStorage.removeItem(song.fileName)
            await AsyncStorage.setItem('lists', JSON.stringify(lists))
            await RNFS.unlink(songPath(song.fileName))
            await RNFS.unlink(imagePath(song.imageFileName))

            dispatch(deletedSong(lists[0].songs))
            dispatch(getLists())
        } catch (err) {
            console.error(err)
        }
    }
}


const songs = []

const songReducer = (state = songs, action) => {
    switch (action.type) {
        case GOT_SONGS:
            if(state.length === 0) return [...action.songs]
            const newSongs = noDuplicateArrays(state, action.songs)
            return [...state, ...newSongs]
        case DOWNLOAD_STARTED:
            return [action.song, ...state]
        case DOWNLOADED_SONG:
            return replaceElemInArr(state, action.song)
        case DELETE_SONG:
            return action.songs
        default:
            return state
    }
}

export default songReducer;