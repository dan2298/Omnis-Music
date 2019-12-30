import * as FileSystem from 'expo-file-system';
import { AsyncStorage } from 'react-native'

const GOT_SONGS = 'GOT_SONGS'
const RESET_LIST = 'RESET_LIST'

function gotSongs(songs) {
    return {
        type: GOT_SONGS,
        songs
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

const songFiles = {
    songs: [],
    list: []
}

const songReducer = (state = songFiles, action) => {
    switch (action.type) {
        case GOT_SONGS:
            return { list: action.songs, songs: action.songs, }
        default:
            return state
    }
}

export default songReducer;

