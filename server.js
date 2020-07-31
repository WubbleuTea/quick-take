const path = require('path');
const express = require('express');
const app = express();
const uuid = require('uuid')
const PORT = process.env.PORT || 3001

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'))
})

app.listen(3001, () => {
    console.log(`Server now on port ${PORT}!`)
})

