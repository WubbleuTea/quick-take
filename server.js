const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const uuid = require('uuid')
const htmlRoutes = require('./routes/htmlRoutes')
let notesArray = require('./db/db.json')
const PORT = process.env.PORT || 3001

app.use(express.static('public'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/', htmlRoutes)

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


function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray , null, 2)
    );
    return note;
}

app.post('/api/notes', (req, res) => {
    req.body.id = uuid.v4()
    const note = createNewNote(req.body, notesArray)
    res.json(note)
});

function deleteNote(id) {

    notesArray = notesArray.filter((note) => note.id !== id);
    console.log(notesArray)
    
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray , null, 2)
    );

    return notesArray;
}

app.delete('/api/notes/:id', (req, res) => {
    const toBeDeleted = notesArray.some(note => note.id === req.params.id);
    console.log(req.params.id)
    

    if(toBeDeleted) {
        res.json({ msg: 'Note deleted', notesArray: notesArray.filter(note => note.id !== req.params.id)});
        deleteNote(req.params.id)
    } else {
        res.status(400).json({ msg: `Cannot delete this note`})
    }
})

app.listen(3001, () => {
    console.log(`Server now on port ${PORT}!`)
})

