import axios from 'axios'
import spotifyToken from '../../spotify-token'

const GOT_SPOT_SONGS = 'GOT_SPOT_SONGS';
`Object {
    "album_type": "album",
    "artists": Array [
      Object {
        "external_urls": Object {
          "spotify": "https://open.spotify.com/artist/5zctI4wO9XSKS8XwcnqEHk",
        },
        "href": "https://api.spotify.com/v1/artists/5zctI4wO9XSKS8XwcnqEHk",
        "id": "5zctI4wO9XSKS8XwcnqEHk",
        "name": "Lil Mosey",
        "type": "artist",
        "uri": "spotify:artist:5zctI4wO9XSKS8XwcnqEHk",
      },
    ],
    "external_urls": Object {
      "spotify": "https://open.spotify.com/album/0y1rJ1B0Q9MqxX9Svuyuyp",
    },
    "href": "https://api.spotify.com/v1/albums/0y1rJ1B0Q9MqxX9Svuyuyp",
    "id": "0y1rJ1B0Q9MqxX9Svuyuyp",
    "images": Array [
      Object {
        "height": 640,
        "url": "https://i.scdn.co/image/b440640779bcd725fd1b9720d5251e7ac2aa99c2",
        "width": 640,
      },
      Object {
        "height": 300,
        "url": "https://i.scdn.co/image/6add6c4cdbafb5b7c55fc8382249633bc4f333a7",
        "width": 300,
      },
      Object {
        "height": 64,
        "url": "https://i.scdn.co/image/572305a53c36054f607000674128732dd089fa87",
        "width": 64,
      },
    ],
    "name": "Certified Hitmaker",
    "release_date": "2019-11-08",
    "release_date_precision": "day",
    "total_tracks": 14,
    "type": "album",
    "uri": "spotify:album:0y1rJ1B0Q9MqxX9Svuyuyp",
  }`


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
      const type = 'Spotify'
      const songs = data.tracks.items.map(item => {
        const artist = item.album.artists[0].name
        const image = item.album.images[0].url
        const name = item.name
        const isrc = item.external_ids.isrc
        const url = item.external_urls.spotify

        return ({
          artist,
          image,
          name,
          isrc,
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