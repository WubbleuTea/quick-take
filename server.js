const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const uuid = require('uuid')
const db = require('./db/db.json')
const PORT = process.env.PORT || 3001

app.use(express.static('public'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'))
});

function createNewNote(body, notesArray) {
    const note = body;
    console.log(body)
    console.log(notesArray)
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray , null, 2)
    );
    return note;
}

app.post('/api/notes', (req, res) => {
    req.body.id = uuid.v4()
    const note = createNewNote(req.body, db)
    res.json(note)
});

app.listen(3001, () => {
    console.log(`Server now on port ${PORT}!`)
})

