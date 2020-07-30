const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001

app.listen(3001, () => {
    console.log(`Server now on port ${PORT}!`)
})

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})