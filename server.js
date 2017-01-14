"use strict";

const express = require("express");
const path = require("path");
const app = express();

app.use(express.static('public'));

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    console.log(path.join(__dirname, 'index.html'));
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/imgData', function(req, res) {
    let fs = require("fs");
    //update the local static image, *cheaper probably than s3*
});

app.post('/gameData', function(req, res) {
    let walkieTalkie = require("./pythonComs.js");
    
    //Get the data Dan's detector sent for the game data
    
});

app.listen(8080, function () {
    console.log('Listening on 8080');
});