import axios from 'axios'
import cheerio from 'react-native-cheerio'
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { replaceElemInArr, convertFileName, convertImageName, imagePath }  from '../util'

const GOT_SC_SONGS = 'GOT_SC_SONGS';
const CLEARED_SC_SONGS = 'CLEARED_SC_SONGS'
const ADD_SC_SONG = 'ADD_SC_SONG';
const ADD_SCDL = 'ADD_SCDL';

const gotScSongs = (songs) => {
    return {
        type: GOT_SC_SONGS,
        songs
    }
}

function addedScDL(song){
    return {
        type: ADD_SCDL,
        song
    }
}

function addedScSong(song) {
    return {
      type: ADD_SC_SONG,
      song
    }
}

function clearedScSongs() {
    return {
        type: CLEARED_SC_SONGS
    }
} 

export function getScSongs(input) {
    const encodedURI = encodeURIComponent(input.trim())
    const url = `https://omnis-server-py.herokuapp.com/soundcloud/info?q=${encodedURI}`
    return async dispatch => {
        try {
            const { data } = await axios.get(url)
            // let length;
            // const type = 'Soundcloud'
            // const songs = []
            // const { content } = data
            // const { pics } = data
            // if (content.length > 3) {
            //     length = 3
            // } else {
            //     length = content.length
            // }
            // for (let i = 0; i < length; i++) {
            //     const idx = pics[i].indexOf(`url("https://`)
            //     const lastIdx = pics[i].lastIndexOf(`.jpg")`)
            //     let image = pics[i].substring(idx, lastIdx)
            //     image = image.substring(5) + '.jpg'

            //     const $ = cheerio.load(content[i])
            //     const name = $(`span`, `a`).get(1).children[0].data
            //     const artist = $(`span[class='soundTitle__usernameText']`).text().trim()
            //     const url = $(`a`).get(1).attribs.href
            //     const id = url;

            //     songs.push({
            //         name,
            //         artist,
            //         image,
            //         url,
            //         id,
            //         type
            //     })
            // }
            // dispatch(gotScSongs(songs))
        } catch (err) {
            console.log(err)
        }
    }
}

export function clearScSongs() {
    return async dispatch => {
        try {
            dispatch(clearedScSongs())
        } catch (err) {
            console.log(err)
        }
    }
}

export function addScSong(song){
    return async dispatch => {
        try {
            song.fileName = convertFileName(song)
            song.download = 0;
            dispatch(addedScSong(song))
        } catch (err) {
            console.log(err)
        }
      }
}

export function addScDL(song) {
    return async dispatch => {
      try {
        song.start = true;
        dispatch(addedScDL(song))
      } catch (err) {
        console.log(err)
      }
    }
}


const soundCloudSongs = []

const soundCloudReducer = (state = soundCloudSongs, action) => {
    switch (action.type) {
        case GOT_SC_SONGS:
            return action.songs;
        case CLEARED_SC_SONGS:
            return [];
        case ADD_SC_SONG:
            return replaceElemInArr(state, action.song)
        case ADD_SCDL:
            return replaceElemInArr(state, action.song)
        default:
            return state;
    }
}

export default soundCloudReducer;