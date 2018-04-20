const express = require('express');
const app = express();
const studios = require('./routes/studios');
const actors = require('./routes/actor');
const films = require('./routes/films');

app.use(express.json());

app.use('/studios', studios);
app.use('/actors', actors);
app.use('/films', films);

module.exports = app;