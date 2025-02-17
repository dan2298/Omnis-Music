const RNFS = require('react-native-fs');
import { produce } from "immer"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { replaceElemInArr, convertFileName, convertImageName, noDuplicateArrays, songPath, imagePath } from '../util'
import { createList, addToList, getSongsList, getLists } from './lists'
const originalSongPath = `${RNFS.DocumentDirectoryPath}/songs/`

const GOT_SONGS = 'GOT_SONGS'
const DOWNLOAD_STARTED = 'DOWNLOAD_STARTED'
const DOWNLOADED_SONG = 'DOWNLOADED_SONG'
const DELETE_SONG = 'DELETE_SONG'

const gotSongs = (songs) => ({
    type: GOT_SONGS,
    songs
})

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

const downloaded = (song, dl) => ({
    type: DOWNLOADED_SONG,
    song, 
    dl
})


export function getSongs() {
    //get playlist instead of songs
    return async dispatch => {
        try {
            const songs = await RNFS.readdir(originalSongPath)
            // console.log('songs in dir', songs)
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

export function startDownload(song) {
    return async (dispatch) => {
        try {
            const iname = convertImageName(song)
            await RNFS.downloadFile({ fromUrl: song.image, toFile: imagePath(iname) })
            const sname = convertFileName(song)
            console.log('SONG INFO')
            console.log(Object.assign({fileName: sname, imageFileName: iname, download: 0, date: String(new Date())}, song))
            dispatch(downloadStarted(Object.assign({fileName: sname, imageFileName: iname, download: 0, date: String(new Date())}, song)))
        } catch (err) {
            console.log(err)
        }
    }
}

export function downloadSong (song, download) {
    //add to playlist instead of song
    return async (dispatch) => {
        try {
            console.log('download', download)
            if (download === true) {
                const newSong = {...song, download: true, imageFileName: convertImageName(song) }
                await AsyncStorage.setItem(song.fileName, JSON.stringify(newSong))
                dispatch(addToList(newSong, 'All Songs'))
            } 
            dispatch(downloaded(song, download))
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
            if(state.length === 0) return action.songs
            const newSongs = noDuplicateArrays(state, action.songs)
            return newSongs
        case DOWNLOAD_STARTED:
            return produce(state, songs => {
                songs.push(action.song)
            })
        case DOWNLOADED_SONG:
            return produce(state, songs => {
                songs.push( Object.assign(action.song, { download: action.dl }))
            })
        case DELETE_SONG:
            return action.songs
        default:
            return state
    }
}

export default songReducer;