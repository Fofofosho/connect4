const express = require("express");
const app = express();

app.get('/', function (req, res) {
    res.send('index.html');
});

app.listen(3000, function () {
    console.log('Listening on 3000');
});