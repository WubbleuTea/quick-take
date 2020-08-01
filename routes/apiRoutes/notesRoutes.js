const router = require('express').Router();
let notesArray = require('../../db/db.json');
const uuid = require('uuid')
const path = require('path');
const { createNewNote, deleteNote } = require('../../lib/notes')

// Gets the database for this server
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../db/db.json'))
});

// Adds notes to the database for this server
router.post('/', (req, res) => {
    req.body.id = uuid.v4()
    const note = createNewNote(req.body)
    res.json(note)
});

// Gets a specific note by id
router.get('/:id', (req, res) => {
    const found = notesArray.some(note => note.id === req.params.id);
    // if it is a found then show that object
    if(found) {
        res.json(notesArray.filter(note => note.id === req.params.id))
    } else {
        res.status(400).json({ msg: `No note found with an id of ${req.params.id}`})
    }
})

// Deletes a specific note by id
router.delete('/:id', (req, res) => {
    // filters out the array and returns it.
    res.json(deleteNote(req.params.id));
    
})

module.exports = router;