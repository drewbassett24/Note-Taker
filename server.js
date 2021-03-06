const express = require('express');
const fs = require('fs');
const path = require('path');
const noteData = require('./db/db.json');
const apiRoutes = require('./routes/apiRoutes')
const htmlRoutes = require('./routes/htmlRoutes')


// Choose a port for the app to use
const PORT = process.env.PORT || 8080;

// use the express module
const app = express();


//Use json to transfer between front and back ends 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Gets request and directs user to homepage


app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'))
});
app.get('/assets/js/index.js', (req, res) => {
    res.sendFile(path.join(__dirname, './public/assets/js/index.js'))
});
app.get('/assets/css/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, './public/assets/css/styles.css'))
});


// add the note and recreate the notes file
function generateNotes(notes) {
    fs.writeFile("./db/db.json", notes, (err) =>
    err ? console.error(err) : console.log('Your note has been deleted.'));
};



app.listen(PORT, () => {
    console.log(`Server listening on: http//localhost ${PORT}`);
});