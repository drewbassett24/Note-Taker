const express = require('express');
const path = require('path');
const uniqid = require ('uniqid');
const { json } = require("express");
const { stringify } = require("querystring");

const router = express();

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});