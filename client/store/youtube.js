import youtubeToken from '../../youtube-token'
import YTSearch from 'youtube-api-search'
import he from 'he'

const GOT_YT_SONGS = 'GOT_YT_SONGS';

function gotYTSongs(songs) {
    return {
        type: GOT_YT_SONGS,
        songs
    }
}

export function getYTSongs(input) {
    const youtubeApiKey = youtubeToken
    return async dispatch => {
        try {
            YTSearch({ key: youtubeApiKey, term: input }, (videos) => {
                videos = videos.map(video => {
                    video.snippet.title = he.decode(video.snippet.title)
                    return video;
                })
                dispatch(gotYTSongs(videos))
            })
        } catch (err) {
            console.log(err)
        }
    }
}

const youtubeSongs = []

const youtubeReducer = (state = youtubeSongs, action) => {
    switch (action.type) {
        case GOT_YT_SONGS:
            return action.songs
        default:
            return state
    }
}

export default youtubeReducer;