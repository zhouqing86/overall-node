import express from 'express';

/* global process*/

const app = express();

app.get('/', function (req, res) {
    res.send("Hello World!");
});

app.get('/about', function (req, res) {
    res.send("About Page!");
});

app.listen(process.env.PORT || 3000);