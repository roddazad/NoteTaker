const fs = require('fs');
const express = require('express');
const path = require('path');
const db = require('./Develop/db/db.json')

const app = express();
const port = 3001;

const PORT = process.env.PORT || 3001;

//GET * should return the index.html file.
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//GET /notes should return the notes.html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/sendFile.html'))
});

//GET /api/notes should read the db.json file and return 
//all saved notes as JSON.
app.get('/api/notes', (req, res) => {
    res.json(db)
});

//POST /api/notes should receive a new note to save on 
//the request body, add it to the db.json
//file, and then return the new note to the client. 
//You'll need to find a way to give each note a unique 
//id when it's saved (look into npm packages that could 
//do this for you).
app.post('/api/notes', (req, res) => {

});

app.listen(port, () => console.log(`The server is listening at http://localhost:${PORT}`));