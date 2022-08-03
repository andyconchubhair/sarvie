/**
 * @overview This is the express server with defined entrypoints
 * @Author Andy O'Connor
 */

//'use strict'

const express = require('express')
const https = require('https')
//CORS configuration
const cors = require('cors')

const app = express()
const path = require('path')

const port = 8080

app.use(cors())

// Setting up the public directory
//app.use(express.static('public'))

//Serve static files
app.use('/assets', express.static(path.join(__dirname, '/public/assets')))
app.use('/css', express.static(path.join(__dirname, '/public/css')))
app.use('/js', express.static(path.join(__dirname, '/public/js')))

app.get('/', (req, res) => {
    res.sendFile('./public/index.html', { root: __dirname })
})

app.get('/404', (req, res) => {
    res.sendFile('./public/404.html', { root: __dirname })
})

app.get('*', function(req, res) {
    res.redirect('/404')
})

app.listen(port, () => console.log(`Now listening on port ${port}`))