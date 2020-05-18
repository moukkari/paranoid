/**
 * This is a middleware Node.js server for Paranoid App, that handles both requests to
 * SetlistFm API and requests to a SQL database that contains chat messages.
 * 
 * This file is actually just a copy of the actual server file that
 * is being hosted on Heroku.
 * 
 * @author Ilmari Tyrkkö
 */

'use strict'
const express = require('express');
const app = express();
const cors = require('cors');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());


// !!! SQL Database stuff below !!!

// Empty strings for safety
const connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
});

function connectToDatabase() { 
    connection.connect(err => {
        if(err) {
            return err;
        }
    });
}
connectToDatabase();

app.get('/getChat', (req, res) => {
    console.log('Getting chat messages');
    connection.query('SELECT * FROM paranoidchat;', (err, result) => {
        if(err) {
            console.log('Error getting chat messages')
            // Had problems with SQL connection getting 
            // down, so this is for test purproses
            connectToDatabase();
            return res.send(err);
        } else {
            console.log('Got chat messages')
            return res.send(result);
        }
    });
});
app.use('/sendMsg', (req, res) => {
    console.log('hello')
    console.log(req.body)
    const msg = req.body.msg;
    const sender = req.body.sender;
    if (msg !== undefined) {
        let statement = "INSERT INTO paranoidchat (msg, sender) VALUES (" 
            + mysql.escape(msg) + ", " + mysql.escape(sender) + ")";
        console.log(statement)
        connection.query(statement, (err, result) => {
            if(err) {
                console.log(err)
                return res.send(err);
            } else {
                console.log('success')
                return res.send(result);
            }
        });
    } else {
        console.log('Error sending message');
        return res.send('Error sending message');
    }
})




//    !!! Setlist.fm STUFF BELOW HERE !!!

// Artist data
// const url = 'https://api.setlist.fm/rest/1.0/artist/5182c1d9-c7d2-4dad-afa0-ccfeada921a8'

// Artist setlists
const url = 'https://api.setlist.fm/rest/1.0/artist/5182c1d9-c7d2-4dad-afa0-ccfeada921a8/setlists?p=';

// Artis setlist search
const searchUrl = 'https://api.setlist.fm/rest/1.0/search/setlists?artistName=Black%20Sabbath&p=';

const setlistToken = 'WEOfxDrUkDZ6q6DquzTTjhwOu23KXT_I2a4C';

// Fetches Setlist.fm data
app.get('/setlistfm/:page([0-9]+)', (req, res) => {
    const page = req.params.page;
    const xhttp = new XMLHttpRequest;
    xhttp.addEventListener("load", () => {
      console.log('Transfer complete');
      const data = xhttp.responseText;
      res.send(data);
    });
    xhttp.open("GET", url + page);
    xhttp.setRequestHeader('Accept', 'application/json');
    xhttp.setRequestHeader('x-api-key', setlistToken);
    xhttp.send();
});

app.use('/setlistfmsearch/:page([0-9]+)', (req, res) => {
    const page = req.params.page;
    const xhttp = new XMLHttpRequest;

    console.log(page);
    let body = req.body;
    body.cityName = body.cityName.replace(/\s/g,"%20");
    body.tourName = body.tourName.replace(/\s/g,"%20");
    console.log(req.body)
    let searchParams = '';
    if (body.cityName !== '') {
        searchParams += '&cityName=' + body.cityName;
    }
    if (body.year !== null) {
        searchParams += '&year=' + body.year;
    }
    if (body.tourName !== '') {
        searchParams += '&tourName=' + body.tourName;
    }
    console.log(searchParams);
    
    xhttp.addEventListener("load", () => {
        console.log('Search complete');
        const data = xhttp.responseText;
        res.send(data);
    });
    xhttp.open("GET", searchUrl + page + searchParams);
    xhttp.setRequestHeader('Accept', 'application/json');
    xhttp.setRequestHeader('x-api-key', setlistToken);
    xhttp.send();
    
})

var server = app.listen(3000, function () {
  console.log('Server listening in http://localhost:3000/');
});