import axios from 'axios';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import spotifyToken from '../spotify-token';
import { replaceElemInArr, convertFileName, convertImageName, imagePath }  from '../util'

const GOT_SPOT_SONGS = 'GOT_SPOT_SONGS';
const CLEARED_SPOT_SONGS = 'CLEARED_SPOT_SONGS';
const ADD_SPOT_SONG = 'ADD_SPOT_SONG';
const ADD_SPOTDL = 'ADD_SPOTDL';

function gotSpotSongs(songs) {
  return {
    type: GOT_SPOT_SONGS,
    songs
  }
}

function addedSpotSong(song) {
  return {
    type: ADD_SPOT_SONG,
    song
  }
}

function addedSpotDL(song) {
  return {
    type: ADD_SPOTDL,
    song
  }
}


function clearedSpotSongs() {
  return {
    type: CLEARED_SPOT_SONGS
  }
}

export function getSpotSongs(input) {
  const url = 'https://api.spotify.com/v1/search'
  return async dispatch => {
    const token = await spotifyToken()
    try {
      const uri = `${url}?type=track&limit=5&q=${encodeURIComponent(input)}*`
      const { data } = await axios.get(uri, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      const type = 'Spotify'
      const songs = data.tracks.items.map(item => {
        const artist = item.album.artists[0].name
        const image = item.album.images[0].url
        const name = item.name
        const id = item.external_ids.isrc
        const url = item.external_urls.spotify

        return ({
          artist,
          image,
          name,
          id,
          url,
          type
        })
      })
      dispatch(gotSpotSongs(songs))
    } catch (err) {
      console.log(err)
    }
  }
}

export function clearSpotSongs() {
  return async dispatch => {
    try {
      dispatch(clearedSpotSongs())
    } catch (err) {
      console.log(err)
    }
  }
}

export function addSpotSong(song) {
    return async dispatch => {
        try {
            song.fileName = convertFileName(song)
            song.download = 0;
            dispatch(addedSpotSong(song))
        } catch (err) {
            console.log(err)
        }
    }
}

export function addSpotDL(song) {
  return async dispatch => {
    try {
      song.start = true;
      dispatch(addedSpotDL(song))
    } catch (err) {
      console.log(err)
    }
  }
}


const spotifySongs = []

const spotifyReducer = (state = spotifySongs, action) => {
  switch (action.type) {
    case GOT_SPOT_SONGS:
      return action.songs;
    case ADD_SPOT_SONG: 
      return replaceElemInArr(state, action.song)
    case ADD_SPOTDL:
      return replaceElemInArr(state, action.song)
    case CLEARED_SPOT_SONGS:
      return [];
    default:
      return state;
  }
}

export default spotifyReducer;