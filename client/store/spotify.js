import axios from 'axios'
import spotifyToken from '../../spotify-token'

const GOT_SPOT_SONGS = 'GOT_SPOT_SONGS';

function gotSpotSongs(songs) {
    return {
        type: GOT_SPOT_SONGS,
        songs
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
            dispatch(gotSpotSongs(data.tracks.items))
        } catch (err) {
            console.log(err)
        }
    }
}

const spotifySongs = []

const spotifyReducer = (state = spotifySongs, action) => {
    switch (action.type) {
        case GOT_SPOT_SONGS:
            return action.songs
        default:
            return state
    }
}

export default spotifyReducer;