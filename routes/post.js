// Needs moving to apiRoutes
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