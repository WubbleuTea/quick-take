const fs = require('fs');
const path = require('path');

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesArray , null, 2)
    );
    return note;
}

function deleteNote(id) {
    notesArray = notesArray.filter((note) => note.id !== id);
    // Writes new arryay to db.json
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesArray , null, 2)
    );
    return notesArray;
}

module.exports = {
    createNewNote,
    deleteNote
}