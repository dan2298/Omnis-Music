import MusicControl from 'react-native-music-control';
import { getQueue } from './queue'
import { getCurrentList } from './currentList'
import { produce } from "immer"

const SET_SONG = 'SET_SONG';
const RESET_STATE = 'RESET_STATE';
const UPDATE_PLAYING = 'UPDATE_PLAYING';
const SET_DURATION = 'SET_DURATION';
const SET_PLAYTIME = 'SET_PLAYTIME';
const UPDATE_SEEK = 'UPDATE_SEEK';
const DONE_SEEK = 'DONE_SEEK';
const SET_RATE = 'SET_RATE';
const SET_LIST = 'SET_LIST';
const UPDATE_CURRENT = 'UPDATE_CURRENT';

const setCurrentSong = (index, song, list) => {    
    return {
        type: SET_SONG,
        index, 
        song,
        list
    }
}

const updatedCurrent = (list, idx) => {
    return {
        type: UPDATE_CURRENT,
        list,
        idx
    }
}

const setCurrentList = (list) => {
    return {
        type: SET_LIST,
        list
    }
}

const resetState = () => {
    return {
        type: RESET_STATE
    }
}

const updatePlaying = (playing) => {
    return {
        type: UPDATE_PLAYING,
        playing
    }
}


const setDuration = (duration) => {
    return {
        type: SET_DURATION,
        duration
    }
}

const setRate = (rate) => {
    return {
        type: SET_RATE,
        rate
    }
}

const setPlayTime = (time) => {
    return {
        type: SET_PLAYTIME,
        time
    }
}

const updateSeek = (time, seek) => {
    return {
        type: UPDATE_SEEK,
        time,
        seek
    }
}

const doneSeeking = (seek) => {
    return {
        type: DONE_SEEK,
        seek
    }
}


export function seek(time) {
    return async (dispatch) => {
        try {
            dispatch(updateSeek(time, true));
        } catch (err) {
            console.error(err)
        }
    }
}

export function seeked() {
    return async (dispatch) => {
        try {
            dispatch(doneSeeking(false));
        } catch (err) {
            console.error(err)
        }
    }
}

export function changeRate(rate) {
    return async (dispatch) => {
        try {
            dispatch(setRate(rate));
        } catch (err) {
            console.error(err)
        }
    }
}

export function playSong() {
    return async (dispatch) => {
        try {
            MusicControl.updatePlayback({
                state: MusicControl.STATE_PLAYING
            });
    
            dispatch(updatePlaying(true));
        } catch (err) {
            console.error(err)
        }
    }
}

export function pauseCurrentSong() {
    return async (dispatch) => {
        try {
            MusicControl.updatePlayback({
                state: MusicControl.STATE_PAUSED,
            });
            dispatch(updatePlaying(false));
        } catch (err) {
            console.error(err)
        }
    }
}

export function setSong(song, idx, list) {
    return async (dispatch, getState) => {    
        try {
            const { lists } = getState()
            dispatch(resetState())
            dispatch(setCurrentSong(idx, song, list))
            for (let i = 0; i < lists.length; i++) {
                if (list === lists[i].name){
                    dispatch(setCurrentList(lists[i].songs))
                    break;
                }
            }

            MusicControl.enableControl('play', true)
            MusicControl.enableControl('pause', true)
            MusicControl.enableControl('nextTrack', true)
            MusicControl.enableControl('previousTrack', true)
            MusicControl.enableControl('changePlaybackPosition', true)
            MusicControl.handleAudioInterruptions(true);
            MusicControl.enableBackgroundMode(true);
    
            MusicControl.on('play', () => dispatch(playSong()));
            MusicControl.on('pause', () => dispatch(pauseCurrentSong()));
            MusicControl.on('nextTrack', () => dispatch(playNextSong()));
            MusicControl.on('previousTrack', () => dispatch(playPreviousSong()));
            MusicControl.on('changePlaybackPosition', (time) => dispatch(seek(time)));

            MusicControl.setNowPlaying({
                title: song.name,
                artwork: song.image || "",
                artist: song.artist || "",
                genre: song.genre || "",
            })

            MusicControl.updatePlayback({
                state: MusicControl.STATE_PLAYING
            });

            dispatch(updatePlaying(true));
        } catch (err) {
            console.log(err)
        }
    }
}

export function playNextSong() {
    return async (dispatch, getState) => {
        const { queue, current } = getState()
        const idx = current.songIndex
        if (queue.length) {
            if(queue[0].fileName === current.song.fileName) {
                dispatch(getQueue())
                dispatch(seek(0))
            } else {
                dispatch(getQueue())
                dispatch(setSong(queue[0], idx, current.playlist))
            }
        } else {
            if(idx+1 === current.currentList.length){
                MusicControl.updatePlayback({
                    state: MusicControl.STATE_PAUSED,
                });
                dispatch(updatePlaying(false))
                // dispatch(updatePlayTime(0))
             } else {
                const song = current.currentList[idx+1]
                dispatch(setSong(song, idx+1, current.playlist));
                dispatch(getCurrentList(idx+1))
            }
        }
    }
};

export function playPreviousSong() {
    return async (dispatch, getState) => {
        const { songIndex, currentList, currentTime, playlist } = getState().current

        if (Number(currentTime) > 3) {
            dispatch(seek(0))
        } else {
            if(songIndex !== 0) {
                const song = currentList[songIndex-1]
                dispatch(setSong(song, songIndex-1, playlist));
                dispatch(getCurrentList(songIndex-1))
            }
        }
    }
}

export function updatePlayTime(currentTime){
    return async (dispatch) => {
        MusicControl.updatePlayback({
            state: MusicControl.STATE_PLAYING,
            elapsedTime: currentTime
        });

        dispatch(setPlayTime(currentTime));
    }
}

export function updateDuration(duration){
    return async (dispatch) => {
        MusicControl.updatePlayback({
            state: MusicControl.STATE_PLAYING,
            duration: duration
        });
        dispatch(setDuration(duration));
    }
}

export function updateCurrent(lists){
    return async (dispatch, getState) => {
        const { current } = getState()
        let idx = -1
        // Update index of current song after download of new song
        for(let i = 0; i < lists[0].songs.length; i++) {
            if (lists[0].songs[i].fileName === current.song.fileName){
                idx = i;
                break;
            }
        }
        dispatch(updatedCurrent(lists[0].songs, idx));
    }
}

const current = {
    song: {},
    songIndex: -1,
    playing: false,
    currentTime: 0,
    duration: 0,
    seek: false,
    seekTime: 0,
    rate: 1,
    playlist: '',
    currentList: []
}

const currentPlayingReducer = (state = current, action) => {
    switch (action.type) {
        case SET_SONG:
            return { ...state, songIndex: action.index, song: action.song, playlist: action.list }
        case RESET_STATE:
            return current
        case UPDATE_PLAYING:
            return { ...state, playing: action.playing }
        case SET_DURATION:
            return { ...state, duration: action.duration }
        case SET_PLAYTIME:
            return { ...state, currentTime: action.time} 
        case UPDATE_SEEK:
            return { ...state, seek: action.seek, seekTime: action.time }
        case DONE_SEEK: 
            return { ...state, seek: action.seek }
        case SET_RATE:
            return { ...state, rate: action.rate }
        case SET_LIST:
            return {...state, currentList: action.list}
        case UPDATE_CURRENT:
            return produce(state, lists => {
                return Object.assign(lists, { currentList: action.list, songIndex: action.idx })
            })
        default:
            return state
    }
}

export default currentPlayingReducer;