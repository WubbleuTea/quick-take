const fs = require('fs');
const path = require('path');
let notesArray = require('../db/db.json');

// Creates new note
function createNewNote(note) {
    //pushes new note to the array
    notesArray.push(note);
    // Wrie the new item and places it in the file
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
}
// delete function
function deleteNote(id) {
    // filters out the deleted item
    notesArray = notesArray.filter(note => note.id !== id);
    // Writes new array to db.json
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
}

module.exports = {
    createNewNote,
    deleteNote
}

