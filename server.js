const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const uuid = require('uuid')
const htmlRoutes = require('./routes/htmlRoutes')
const notesRoutes = require('./routes/apiRoutes/notesRoutes')
let notesArray = require('./db/db.json')
const PORT = process.env.PORT || 3001

app.use(express.static('public'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/', htmlRoutes)

app.use('/api/notes', notesRoutes)

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'))
});

app.get('/api/notes/:id', (req, res) => {
    const found = notesArray.some(note => note.id === req.params.id);

    if(found) {
        res.json(notesArray.filter(note => note.id === req.params.id))
    } else {
        res.status(400).json({ msg: `No note found with an id of ${req.params.id}`})
    }
})

app.listen(3001, () => {
    console.log(`Server now on port ${PORT}!`)
})

