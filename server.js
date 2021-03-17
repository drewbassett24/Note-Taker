const express = require('express');
const fs = require('fs');
const path = require('path');
const uniqid = require ('uniqid');

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.static('public'));

// Use Get * here.
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
    
});

//Use json to transfer between front and back ends 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Gets request and directs user to homepage
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Directs user to 'notes' page
app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.listen(PORT, () => {
    console.log(`Server listening on: http//localhost ${PORT}`);
});

// Create api routes here
app.get('/api/notes', function(req, res) {
    res.json(noteData);
});

// Push the note to the page
app.post("/api/notes", (req, res) => {

    // Give each note a unique id
    var postNotes = req.body;
    postNotes.id = uniqid();
    console.log(req.body.id: " + postNotes);
    noteData.push(postNotes);
    noteAdded(noteData);
    res.json(noteData);

});

module.exports = function (app) {

}