const path = require('path')
const express = require('express')
const morgan = require('morgan')
const { exec } = require('child-process-promise')
const fs = require('fs')

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
    const file2 = path.join(__dirname, 'songs', fileName)
    try {
        if (fs.existsSync(file2)) {
            res.sendFile(file2)
        } else {
            console.log('in progress')
            const cmd = await exec(`spotifydl -o ${path.join(__dirname, 'songs')} open.spotify.com/${req.params.type}/${req.params.url}`)
            console.log('done')
            res.sendFile(file2)
        }
    } catch (err) {
        console.error(err)
    }
})

// app.get('/youtube/', async (req, res, next) => {

// })

const port = process.env.PORT || 7000

app.listen(port, () => {
    console.log('listening on ' + port)
})

// app.use('/spotify', require('./spotify'))
//==========================================
