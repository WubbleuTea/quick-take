const path = require('path')
const router = require('express').Router();

//runs the index.html at localhost:3001
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'))
});
//runs the notes page html at http://localhost:3001/notes
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'))
});

module.exports = router