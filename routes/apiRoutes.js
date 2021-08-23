const router = require('express').Router();
const uniqid = require ('uniqid');
const fs = require ('fs');

router.post('/notes', (req, res) => {
    // adds new note to the request body
    const newNote = req.body;
    newNote.id = uniqid();
    // and logs it
    console.log(newNote);

    // get old notes
    let db = require("../db/db.json");

    // add new note to the database (make it a string)
    
    let readNotes = fs.readFileSync("../db/db.json", "utf8");
    readNotes = JSON.parse(readNotes);
    db.push(newNote); 
    
    fs.writeFileSync();
   
    // show  current notes
    console.log(db);

    const writeFile = JSON.stringify(db, null, 2);
    generateNotes(writeFile);

    return res.json(db);
});

function generateNotes(notes) {
    fs.writeFile("./db/db.json", notes, (err) =>
    err ? console.error(err) : console.log('Your note has been deleted.'));
};

router.delete('/api/notes/:id', (req, res) => {
    const selectedNote = req.params.id;

    // logs newest input
    console.log(selectedNote);

    
    var db = require("./db/db.json");
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

module.exports = router;