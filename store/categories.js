import axios from 'axios';
import spotifyToken from '../spotify-token';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GOT_SPOT_CATEGORIES = 'GOT_SPOT_CATEGORIES';
const GOT_SPOT_RELEASES = 'GOT_SPOT_RELEASES';

function gotSpotCategories(categories) {
    return {
      type: GOT_SPOT_CATEGORIES,
      categories
    }
}

function gotSpotNewReleases(releases) {
  return {
    type: GOT_SPOT_RELEASES,
    releases
  }
}

export function getSpotNewReleases() {
  return async dispatch => {
    const token = await spotifyToken()
    try {
      const uri = 'https://api.spotify.com/v1/browse/new-releases'
      const { data } = await axios.get(uri, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      const releases = data.albums.items.map(item => {
        return {
          id: item.id,
          image: item.images[0].url,
          name: item.name,
          type: item.type,
          artist: item.artists[0].name,
          url: item.external_urls.spotify,
          date: String(new Date())
        }
      })

      await AsyncStorage.setItem('releases', JSON.stringify({releases, date: String(new Date())}))
      dispatch(gotSpotNewReleases(releases))
    } catch (err) {
      console.log(err)
    }
  }
}

export function getSpotCategories() {
    return async dispatch => {
      const token = await spotifyToken()
      try {
        const uri = 'https://api.spotify.com/v1/browse/categories'
        const { data } = await axios.get(uri, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })

        const categories = data.categories.items.map(item => {
          return {
            id: item.id,
            image: item.icons[0].url,
            name: item.name,
            type: 'category',
          }
        })

        await AsyncStorage.setItem('categories', JSON.stringify({categories, date: String(new Date())}))
        dispatch(gotSpotCategories(categories))
      } catch (err) {
        console.log(err)
      }
    }
}

const categories = {
    genres: [],
    releases: []
}

const categoryReducer = (state = categories, action) => {
  switch (action.type) {
    case GOT_SPOT_CATEGORIES:
      return { ...state, genres: action.categories }
    case GOT_SPOT_RELEASES:
      return { ...state, releases: action.releases }
    default:
      return state;
  }
}

export default categoryReducer;