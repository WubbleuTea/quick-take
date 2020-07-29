const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001

app.listen(3001, () => {
    console.log(`Server now on port 3001!`)
})