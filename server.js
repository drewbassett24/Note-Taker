const express = require('express');
const fs = require('fs');
const path = require('path');
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


