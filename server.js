const express = require('express');
const fs = require('fs');
const path = require('path');
const noteData = require('/db/db.json');
const uniqid = require ('uniqid');

// Choose a port for the app to use
const PORT = process.env.PORT || 8080;

// use the express module
const app = express();

//Use json to transfer between front and back ends 
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Gets request and directs user to homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Directs user to 'notes' page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Add the note to the database (make it a string)
noteAdded = (notes) => {
    notes = JSON.stringify(notes);

    console.log(notes);

    fs.writeFile("./db/db.json", notes, (err) => {
        if (err) {
            return console.log(err);
        }
        else {
            console.log("Your note has been saved!")
        }
    });
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



module.exports = function (app) {

}

app.listen(PORT, () => {
    console.log(`Server listening on: http//localhost ${PORT}`);
});