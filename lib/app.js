const express = require('express');
const app = express();
const studios = require('./routes/studios');
const actors = require('./routes/actor');
const films = require('./routes/films');
const reviewers = require('./routes/reviewers');

app.use(express.json());

app.use('/api/studios', studios);
app.use('/actors', actors);
app.use('/films', films);
app.use('/reviewers', reviewers);

module.exports = app;