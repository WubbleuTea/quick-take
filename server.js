const express = require('express');
const app = express();
const htmlRoutes = require('./routes/htmlRoutes')
const notesRoutes = require('./routes/apiRoutes/notesRoutes')
const PORT = process.env.PORT || 3001

// Uses the public static folder
app.use(express.static('public'));
// JSON-reader
app.use(express.json());
// Body-parser
app.use(express.urlencoded({ extended: true }));
// Route to html files
app.use('/', htmlRoutes)
// Route to api used files.
app.use('/api/notes', notesRoutes)

app.listen(PORT, () => {
    console.log(`Server now on port ${PORT}!`)
})

