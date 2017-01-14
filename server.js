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

app.get('/imgData', function(req, res) {
    let fs = require("fs");
    let walkieTalkie = require("./pythonComs.js");
});

app.get('/gameData', function(req, res) {
    let walkieTalkie = require("./pythonComs.js");
    
});

app.listen(8080, function () {
    console.log('Listening on 8080');
});