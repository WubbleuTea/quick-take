const fs = require('fs');
const path = require('path');
let notesArray = require('../db/db.json');

function createNewNote(note) {
    let notesNewArray = notesArray
    notesNewArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesNewArray, null, 2)
    );
    return note;
}

function deleteNote(id) {
    notesArray = notesArray.filter(note => note.id !== id);
    // Writes new array to db.json
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return notesArray;
}

module.exports = {
    createNewNote,
    deleteNote
}

