// const serverUrl = 'https://omnis-server-py.herokuapp.com/'
const serverUrl = 'http://127.0.0.1:5000/';

export function convertFileName(song) {
    let fileName;
    let saveFileName = ''
    if (song.type === 'Spotify') {
        fileName = `${song.name}-spt.mp3`.split(' ').join('-');        
    } else if (song.type === 'Youtube') {
        fileName = song.name.split('-').map(el => el.trim()).join('-').split(' ').join('-') + '-yt.mp3'
    } else if (song.type === 'Soundcloud') {
        fileName = song.name.split(' ').join('-') + '-sc.mp3';
    }

    for (let i = 0; i < fileName.length; i++) {
        if (fileName[i].match(/[\]\[a-zA-Z0-9\s-(.)]/g)) {
            saveFileName += fileName[i]
        }
    }
    return saveFileName;
}

export function convertImageName(song) {
    let fileName;
    let saveFileName = ''
    if (song.type === 'Spotify') {
        fileName = `${song.name}-spt.png`.split(' ').join('-');        
    } else if (song.type === 'Youtube') {
        fileName = song.name.split('-').map(el => el.trim()).join('-').split(' ').join('-') + '-yt.png'
    } else if (song.type === 'Soundcloud') {
        fileName = song.name.split(' ').join('-') + '-sc.png';
    }

    for (let i = 0; i < fileName.length; i++) {
        if (fileName[i].match(/[\]\[a-zA-Z0-9\s-(.)]/g)) {
            saveFileName += fileName[i]
        }
    }
    return saveFileName
}

export function convertFileUrl(song) {
    let songUrl;
    if (song.type === 'Spotify') {
        const spotifyUrl = song.url.slice(8)
        songUrl = `${serverUrl}spotify/${spotifyUrl}?isrc=${song.id}`;
    } else if (song.type === 'Youtube') {
        const url = `www.youtube.com/${song.id}`
        songUrl = serverUrl + url
    } else if (song.type === 'Soundcloud') {
        const encodedName = encodeURIComponent(song.name)
        const url = `soundcloud${song.url}?name=${encodedName}`
        songUrl = serverUrl + url
    }
    return songUrl;
}

export function MMSSfromMillis(time) {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60);

    const padWithZero = number => {
        const string = number.toString();
        if (number < 10) {
            return "0" + string;
        }
        return string;
    };
    return padWithZero(minutes) + ":" + padWithZero(seconds);
}