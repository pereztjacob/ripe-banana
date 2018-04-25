const express = require('express');
const app = express();
require('./models/register-plugin');
const studios = require('./routes/studios');
const actors = require('./routes/actor');
const films = require('./routes/films');
const reviewers = require('./routes/reviewers');
const reviews = require('./routes/reviews');
const auth = require('./routes/auth');

// const createEnsureAuth = require('./util/ensure-auth');
// const ensureAuth = createEnsureAuth();

app.use(express.json());

app.use('/api/auth', auth);
app.use('/studios', studios);
app.use('/actors', actors);
app.use('/films', films);
app.use('/reviewers', /*ensureAuth, */reviewers);
app.use('/reviews', reviews);

module.exports = app;