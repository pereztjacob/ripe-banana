const router = require('express').Router();
const Film = require('../models/Film');

const check404 = (film, id) => {
    if(!film){
        throw {
            status: 404,
            error: `film with ${id} does not exist`
        };
    }
};

module.exports = router
    .post('/', (req, res, next) => {
        Film.create(req.body)
            .then(film => res.json(film))
            .catch(next);
    });