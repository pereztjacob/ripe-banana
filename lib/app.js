const express = require('express');
const app = express();
require('./models/register-plugin');
const errorHandler = require('./util/error-handler');
const createEnsureAuth = require('./util/ensure-auth');
app.use(express.json());

const studios = require('./routes/studios');
const actors = require('./routes/actor');
const films = require('./routes/films');
const reviewers = require('./routes/reviewers');
const reviews = require('./routes/reviews');
const auth = require('./routes/auth');

const ensureAuth = createEnsureAuth();

app.use('/api/auth', auth);
app.use('/studios', ensureAuth, studios);
app.use('/actors', actors);
app.use('/films', films);
app.use('/reviewers', /*ensureAuth, */reviewers);
app.use('/reviews', reviews);

app.use(errorHandler());

module.exports = app;