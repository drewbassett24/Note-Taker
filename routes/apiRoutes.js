const router = require('express').Router();
const uniqid = require ('uniqid');
const path = require ('path')
const fs = require ('fs');

router.post('/notes', (req, res) => {
    // adds new note to the request body
    const newNote = req.body;
    newNote.id = uniqid();
    // and logs it
    console.log(newNote);

    // get old notes
    let db = require(path.join(__dirname,"../db/db.json"));

    // add new note to the database (make it a string)
    
    let readNotes = fs.readFileSync( path.join(__dirname,"../db/db.json"), "utf8");
    readNotes = JSON.parse(readNotes);
    readNotes.push(newNote); 
    
    fs.writeFileSync(path.join(__dirname,"../db/db.json"), JSON.stringify(readNotes));
   


    return res.json(newNote);
});

function generateNotes(notes) {
    fs.writeFile(path.join(__dirname,"../db/db.json"), notes, (err) => {
     if (err) console.error(err);})
};

router.delete('/notes/:id', (req, res) => {
    const selectedNote = req.params.id;

    // logs newest input
    console.log(selectedNote);

    
    var db = require(path.join(__dirname,"../db/db.json"));
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