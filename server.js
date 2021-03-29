const express = require('express');
const fs = require('fs');
const path = require('path');
const noteData = require('/db/db.json');
const uniqid = require ('uniqid');
const { json } = require("express");
const { stringify } = require("querystring");

// Choose a port for the app to use
const PORT = process.env.PORT || 8080;

// use the express module
const app = express();

//Use json to transfer between front and back ends 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

// Gets request and directs user to homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// All the routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(___dirname, './db/db.json'))
});
app.get('/assets/js/index.js', (req, res) => {
    res.sendFile(path.join(___dirname, './public/assets/js/index.js'))
});
app.get('/assets/css/styles.css', (req, res) => {
    res.sendFile(path.join(___dirname, './public/assets/css/styles.css'))
});

app.post('/api/notes', (req, res) => {
    // adds new note to the request body
    const newNote = req.body;
    newNote.id = uniqid();
    // and logs it
    console.log(newNote);

    // get old notes
    var db = require("./db/db.json");
    // add new note to the database (make it a string)
    db.push(newNote);
    // show  current notes
    console.log(db);

    const writeFile = JSON.stringify(db, null, 2);
    generateNotes(writeFile);

    return res.json(db);
});

app.delete('/api/notes/:id', (req, res) => {
    const selectedNote = req.params.id;

    // logs newest input
    console.log(selectedNote);

    // gets old inputs
    var db = require("./db/db/json");
    for (let i = 0; i < db.length; i++) {
        if (selectedNote == db[i].id) {
            console.log(db[i]);
            db.splice(i,1);
        }
    }

    // show current notes
    console.log(db);
    // stringify
    const writeFile = JSON.stringify(db, null, 2);

    // add to db,json
    deletedNotes(writeFile);
    return res.json(db);
});

// add the note and recreate the notes file
function generateNotes(notes) {
    fs.writeFile("./db/db.json", notes, (err) =>
    err ? console.error(err) : console.log('Your note has been deleted.'));
}




// Create api routes here
app.get('/api/notes', (req, res) => {
    res.json(noteData);
});

// Push the note to the page
app.post("/api/notes", (req, res) => {

    // Give each note a unique id
    var postNotes = req.body;
    postNotes.id = uniqid();
    console.log("req.body.id: " + postNotes);
    
    // Push note data to the page
    noteData.push(postNotes);
    noteAdded(noteData);
    res.json(noteData);

});

noteAdded(noteData);

res.json(noteData);



// module.exports = function (app) {

// }

app.listen(PORT, () => {
    console.log(`Server listening on: http//localhost ${PORT}`);
});