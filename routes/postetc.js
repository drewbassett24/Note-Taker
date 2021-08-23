app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'))
});

// Gets the notes.html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/notes.html'))
});


// Gets the api route for notes (db.json)
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname + '/db/db.json'))
});

// Post a new note to the api
// Posting to the api (/api/notes)
app.post('/api/notes',  (req, res) => {
    // The value of the note will be the request body, i.e. the user's input into the notes.html page
    const addNote = req.body;
    // Assign a unique id to each new note
    addNote.id = uniqid();
    console.log(addNote);
    // A variable initialised with the values of the db.json file
    // i.e. a variable that contains all existing notes in the array of JSON objects in db.json
    const oldNotes = require('./db/db.json');
    // Push the new note to the oldNotes variable
    // Simply adding new notes to the oldNotes array, not yet permanently writing to the db.json file
    oldNotes.push(addNote);
    console.log(oldNotes);
    // A variable initialised by the value of oldNotes that's been JSON.stringified
    // Parameters: null = all properties of object are present in JSON string, 5 = added whitespace for readability
    const addToDatabase = JSON.stringify(oldNotes, null, 5);
    // A parameter for the updateDatabase function
    const method = 'POST';
    // Calls the updateDatabase function
    updateDatabase(addToDatabase, method);
    // Returns the oldNotes array (Allows the list to update without reloading the page)
    return res.json(oldNotes);
});

// Delete an existing note in the api
// Deleting from the api (/api/notes)
app.delete('/api/notes/:id', (req, res) => {
    // req.params tells express to retrieve the id via parameter id
    // https://www.digitalocean.com/community/tutorials/nodejs-req-object-in-expressjs
    const deleteNoteID = req.params.id;
    const oldNotes = require('./db/db.json');
    
    // Loops through the oldNotes array
    for(let i = 0; i < oldNotes.length; i++){
        // If the ID of the selected note matches the ID of a note in the array, delete that note
        if(deleteNoteID === oldNotes[i].id){
            // Removes the item at index i & only deletes one item
            oldNotes.splice(i, 1);
        }
    }

    const addToDatabase = JSON.stringify(oldNotes, null, 5);
    const method = 'DELETE';
    updateDatabase(addToDatabase, method);
    return res.json(oldNotes);
})

// Function to write the added notes to the db.json file
updateDatabase = (note, method) => {
    // Writing to file db.json with the parameter being the addToDatabase variable, & a callback function if error
    fs.writeFile('./db/db.json', note, (err) => {
        if (err) throw err;
        // Shows a message depending on whether a note was posted or deleted
        if(method === 'POST'){
            console.log('Note successfuly posted!');
        } else{
            console.log('Note deleted successfuly!');
        }
    })
}

// Starting the server
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));