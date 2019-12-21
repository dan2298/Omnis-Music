import axios from 'axios'
import cheerio from 'react-native-cheerio'

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
            let length;
            const type = 'Soundcloud'
            const songs = []
            const { content } = data
            const { pics } = data
            if (content.length > 3) {
                length = 3
            } else {
                length = content.length
            }
            for (let i = 0; i < length; i++) {
                const idx = pics[i].indexOf(`url("https://`)
                const lastIdx = pics[i].lastIndexOf(`.jpg")`)
                let image = pics[i].substring(idx, lastIdx)
                image = image.substring(5) + '.jpg'

                const $ = cheerio.load(content[i])
                const name = $(`span`, `a`).get(1).children[0].data
                const artist = $(`span[class='soundTitle__usernameText']`).text()
                const url = $(`a`).get(1).attribs.href
                songs.push({
                    name,
                    artist,
                    image,
                    url,
                    type
                })
            }
            console.log('songs', songs)
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