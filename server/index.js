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
    console.log('body', req.body)
    const fileName = req.body.name.split('-')[0].trim().split(' ').join('-');
    console.log('file in server', fileName)
    // res.send('hi')
    try {
        const cmd = await exec(`spotifydl -o ${path.join(__dirname, 'songs')} open.spotify.com/${req.params.type}/${req.params.url}`)
        // if (cmd.stderr) throw cmd.stderr
        // console.log('cmd', cmd)
        // console.log('name', path.join(__dirname, 'songs', req.body.name))
        console.log('cmd done')
        const dir = 'server/songs/'
        // console.log(`${dir}STUPID (feat. Yung  Baby Tate) - Ashnikko.mp3 STUPID.mp3`)
        const cmd2 = await exec(`mv '${dir}${req.body.name}' ${dir}${fileName}`)
        console.log('passed')

        // console.log('cmd', cmd2.stdout)
        // const file2 = path.join(__dirname, 'songs', 'STUPID')
        res.send(fileName)
    } catch (error) {
        console.log('ERROR FETCHING DATA IN ROUTES', error)
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
