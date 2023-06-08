import youtubeToken from '../youtube-token'
import YTSearch from 'youtube-api-search'
import he from 'he'
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { replaceElemInArr, convertFileName, convertImageName, imagePath }  from '../util'

const GOT_YT_SONGS = 'GOT_YT_SONGS';
const ADD_YT_SONG = 'ADD_YT_SONG';
const ADD_YTDL = 'ADD_YTDL';
const CLEARED_YT_SONGS = 'CLEARED_YT_SONGS';

function gotYTSongs(songs) {
    return {
        type: GOT_YT_SONGS,
        songs
    }
}

function addedYtDL(song){
    return {
        type: ADD_YTDL,
        song
    }
}

function clearedYTSongs(){
    return {
        type: CLEARED_YT_SONGS
    }
}

function addedYtSong(song) {
    return {
      type: ADD_YT_SONG,
      song
    }
}
  
export function getYTSongs(input) {
    return async dispatch => {
        try {
            YTSearch({ key: youtubeToken, term: input }, (videos) => {
                videos = videos.map(video => {
                    video.snippet.title = he.decode(video.snippet.title)
                    return video;
                })
                const type = 'Youtube'
                const songs = videos.map(item => {
                    const image = item.snippet.thumbnails.high.url
                    const name = item.snippet.title
                    const artist = item.snippet.channelTitle
                    const id = item.id.videoId
                    return ({
                        image,
                        name,
                        artist,
                        id,
                        type
                    })
                })
                dispatch(gotYTSongs(songs))
            })
        } catch (err) {
            console.log('ERROR: ', err)
        }
    }
}

export function clearYTSongs() {
    return async dispatch => {
        try {
            dispatch(clearedYTSongs())
        } catch (err) {
            console.log(err)
        }
    }
}

export function addYtSong(song){
    return async dispatch => {
        try {
            song.fileName = convertFileName(song)
            song.download = 0;
            dispatch(addedYtSong(song))
        } catch (err) {
            console.log(err)
        }
      }
}

export function addYtDL(song) {
    return async dispatch => {
      try {
        song.start = true;
        dispatch(addedYtDL(song))
      } catch (err) {
        console.log(err)
      }
    }
}

const youtubeSongs = []

const youtubeReducer = (state = youtubeSongs, action) => {
    switch (action.type) {
        case GOT_YT_SONGS:
            return action.songs;
        case ADD_YT_SONG:
            return replaceElemInArr(state, action.song)
        case ADD_YTDL:
            return replaceElemInArr(state, action.song)
        case CLEARED_YT_SONGS:
            return [];
        default:
            return state;
    }
}

export default youtubeReducer;