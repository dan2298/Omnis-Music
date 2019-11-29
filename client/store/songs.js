import * as FileSystem from 'expo-file-system';
import { AsyncStorage } from 'react-native'

const GOT_SONGS = 'GOT_SONGS'
const PLAYING_SONG = 'PLAYING_SONG'

function gotSongs(songs) {
    return {
        type: GOT_SONGS,
        songs
    }
}

function playingSong(song) {
    return {
        type: PLAYING_SONG,
        song
    }
}

export function getSongs() {
    return async dispatch => {
        try {
            const songs = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}songs`)
            const newSongs = songs.map(async (song, idx) => {
                return { name: song, info: JSON.parse(await AsyncStorage.getItem(song)) }
            })

            Promise.all(newSongs).then(values => dispatch(gotSongs(values)))
        } catch (err) {
            console.error(err)
        }
    }
}

const songs = []

const songReducer = (state = songs, action) => {
    switch (action.type) {
        case GOT_SONGS:
            return action.songs
        default:
            return state
    }
}

export default songReducer;

//privacy badger 
//ublock
//enhancer for youtube
