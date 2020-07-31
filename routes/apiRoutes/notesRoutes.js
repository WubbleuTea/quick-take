const router = require('express').Router();
const notesArray = require('../../db/db.json');
const uuid = require('uuid')
const { createNewNote, deleteNote } = require('../../lib/notes')


router.post('/', (req, res) => {
    req.body.id = uuid.v4()
    const note = createNewNote(req.body, notesArray)
    res.json(note)
});

router.delete('/api/notes/:id', (req, res) => {
    // check all the items in the array to see if the id of the deleted item matches one of the items
    const toBeDeleted = notesArray.some(note => note.id === req.params.id);
    // if matching lets the user know in the console what is being deleted and 
    if(toBeDeleted) {
        res.json({ msg: 'Note deleted', notesArray: notesArray.filter(note => note.id !== req.params.id)});
        deleteNote(req.params.id)
    } else {
        res.status(400).json({ msg: `Cannot delete this note`})
    }
})

module.exports = router;