"use strict";

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Amazon specific declarations
const AWS = require("aws-sdk");
AWS.config.loadFromPath('./awsconfig.json');
const s3 = new AWS.S3();
const sqs = new AWS.SQS();
const objectBucketName = 'connect4-hackaz17';

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    console.log(path.join(__dirname, 'index.html'));
    res.sendFile(path.join(__dirname, 'index.html'));
});

// app.post('/', function(req, res) {
// });

app.post('/imgData', function(req, res) {
    let fs = require("fs");
    //update the local static image, *cheaper probably than s3*
});

app.post('/gameData', function(req, res) {
    //Get the data Dan's detector sent for the game data
    console.log(req);
    console.log(req.body);
    let dansBody = req.body;
    io.emit('dan', {
        "arrayInfo": dansBody
    });
    
    res.end();
});

io.on('connection', function(socket) {
    console.log("server socket established");
    io.emit("picUpdate", {
        "objectName": `https://s3-us-west-2.amazonaws.com/${objectBucketName}/poop.png`
    });
    
    // setInterval(readIncomingMessages(), 20000);
    readIncomingMessages();
});

function checkDate() {
    console.log("checkDate:");
    //could do this on the server portion too
    let lastCheck = new Date();
    setInterval(function() {
        console.log("Checking s3");
        let params = {
            "Bucket": objectBucketName, /* required */
            "Key": 'poop.png', /* required */
            "IfModifiedSince": lastCheck,
        }
        s3.headObject(params, function(err, data) {
            if(err) {
                console.log("ERROR with GET " + err);
            }
            else {
                lastCheck = new Date();
                io.emit("picUpdate", {
                    objectName: `https://s3-us-west-2.amazonaws.com/${objectBucketName}/${params.key}`
                });
            }
        });
    }, 5000);
}

function readIncomingMessages() {
    let getParams = {
        "QueueUrl" : "https://sqs.us-west-2.amazonaws.com/107655416657/the-queue",
        "VisibilityTimeout": 60,
        "WaitTimeSeconds": 20
    }
    
    sqs.receiveMessage(getParams, function(err, data) {
        if (err) {
            console.log(err, err.stack);
        }
        else {
            console.log("Queue: successfully received");
            console.log(data);
            
            io.emit("picUpdate", {
                objectName: `https://s3-us-west-2.amazonaws.com/${objectBucketName}/poop.png`
            });
            
            if(data.Messages) {
                let delParams = {
                    "QueueUrl" : getParams.QueueUrl,
                    "ReceiptHandle" : data.Messages[0].ReceiptHandle
                }
                sqs.deleteMessage(delParams, function(err, data) {
                    if(err) {
                        console.log(err, err.stack);
                    }
                    else {
                        console.log("Queue: successfully deleted");
                    }
                });
            }
        }
    });
}

http.listen(8080, function () {
    console.log('Listening on 8080');
});