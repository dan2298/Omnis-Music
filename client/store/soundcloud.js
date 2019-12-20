import axios from 'axios'
import cheerio from 'react-native-cheerio'
const sc = 'https://soundcloud.com'

const GOT_SC_SONGS = 'GOT_SC_SONGS';

const gotScSongs = (songs) => {
    return {
        type: GOT_SC_SONGS,
        songs
    }
}

export function getScSongs(input) {
    const encodedURI = encodeURIComponent(input.trim())
    const url = `https://omnis-server-py.herokuapp.com/soundcloud/info?q=${encodedURI}`
    return async dispatch => {
        try {
            const { data } = await axios.get(url)
            const songs = []
            const { content } = data
            const { pics } = data
            for (let i = 0; i < data.pics.length; i++) {
                const idx = pics[i].indexOf(`url("https://`)
                const lastIdx = pics[i].lastIndexOf(`;'></span>`)
                const image = pics[i].slice(idx, lastIdx)

                const $ = cheerio.load(content[i])
                const song = $(`span[class='']`).text()
                const artist = $(`span[class='soundTitle__usernameText']`).text()
                const link = $(`a[class='soundTitle__title sc-link-dark']`).attr('href')
                const url = `${sc}${link}`
                songs.push({
                    song,
                    artist,
                    image,
                    url
                })
            }
            dispatch(gotScSongs(songs))
        } catch (err) {
            console.log(err)
        }
    }
}

const soundCloudSongs = []

const soundCloudReducer = (state = soundCloudSongs, action) => {
    switch (action.type) {
        case GOT_SC_SONGS:
            return action.songs
        default:
            return state
    }
}

export default soundCloudReducer;