const fs = require("fs");
const express = require("express");
const path = require("path");
const db = require("./Develop/db/db.json");
const uuid = require("./Assets/uuid");

const app = express();
const port = 3001;

const PORT = process.env.PORT || 3001;

// app.get('/', (req, res) =>
//   res.sendFile(path.join(__dirname, 'Develop/public/index.html'))
// );

// app.use(express.static("Develop/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//GET * should return the index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});
//GET /notes should return the notes.html file
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

//GET /api/notes should read the db.json file and return
//all saved notes as JSON.
app.get("/api/notes", (req, res) => {
  return res.json(db);
});

//POST /api/notes should receive a new note to save on
//the request body, add it to the db.json
//file, and then return the new note to the client.
//You'll need to find a way to give each note a unique
//id when it's saved (look into npm packages that could
//do this for you).
app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const addedNote = {
      title,
      text,
      note_id: uuid(),
    };

    db.push(addedNote);
  } else {
    res.json("You must enter a title and a text please");
  }
});

// app.delete('/api/notes/:id', (req, res) => {
//     const noteId = req.params.id;
//     if(noteId){
// for(let i = 0; i < db.length; i++) {
//     const currentIdIndex = db[i].id;
//     if(currentIdIndex === noteId){
//         db.filter(() => {db.id !== noteId})
//     }
// }

app.listen(port, () =>
  console.log(`The server is listening at http://localhost:${PORT}`)
);
