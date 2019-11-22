const path = require('path')
const express = require('express')
const morgan = require('morgan')
const { exec } = require('child-process-promise')

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

app.post('/spotify/open.spotify.com/:type/:url', async (req, res, next) => {
    // path.join(__dirname, 'songs')
    // console.log(`spotifydl -o ${path.join(__dirname, 'songs')} open.spotify.com/album/2uDTi1PlpSpvAv7IRAoAEU`)
    // const url = req.params.url
    console.log('body', req.body)
    // res.send('hi')
    try {
        // const cmd = await exec(`spotifydl -o ${path.join(__dirname, 'songs')} open.spotify.com/${req.params.type}/${req.params.url}`)
        // if (cmd.stderr) throw cmd.stderr
        console.log('name', path.join(__dirname, 'songs', req.body.name))
        const file = path.join(__dirname, 'songs', req.body.name)
        console.log('done')
        res.send(file)
    } catch (error) {
        console.log('ERROR FETCHING DATA', error)
    }
    // console.log('====== cmd ', cmd)
    // const song = cmd.stdout
    // console.log('======== song', song)
})

const port = process.env.PORT || 7000

app.listen(port, () => {
    console.log('listening on ' + port)
})

// app.use('/spotify', require('./spotify'))
//==========================================
