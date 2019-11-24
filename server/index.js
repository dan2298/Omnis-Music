const path = require('path')
const express = require('express')
const morgan = require('morgan')
const { exec } = require('child-process-promise')
const fs = require('fs')
const defaultSongPath = path.join(__dirname, 'songs')

const app = express();


app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
})

app.get('/', (req, res, next) => {
    res.json('Working')
})

app.get('/spotify/open.spotify.com/:type/:url', async (req, res, next) => {
    const fileName = req.query.name
    const file = path.join(__dirname, 'songs', fileName)
    try {
        if (fs.existsSync(file)) {
            res.sendFile(file)
        } else {
            console.log('in progress')
            const cmd = await exec(`spotifydl -o ${defaultSongPath} open.spotify.com/${req.params.type}/${req.params.url}`)
            console.log('done')
            res.sendFile(file)
        }
    } catch (err) {
        console.error(err)
    }
})

app.get('/www.youtube.com/:videoId', async (req, res, next) => {
    console.log('here')
    const fileName = `${req.query.name}.mp3`
    const url = `https://www.youtube.com/watch?v=${req.params.videoId}`
    const file = path.join(__dirname, 'songs', fileName)
    try {
        if (fs.existsSync(file)) {
            res.sendFile(file)
        } else {
            const cmd = await exec(`youtube-dl --extract-audio --audio-format mp3 -o "${defaultSongPath}/%(title)s.%(ext)s" ${url}`)
            res.sendFile(file)
        }
    } catch (err) {
        console.error(err)
    }
})

const port = process.env.PORT || 7000

app.listen(port, () => {
    console.log('listening on ' + port)
})

// app.use('/spotify', require('./spotify'))
//==========================================
