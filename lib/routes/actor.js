const router = require('express').Router();
const Actor = require('../models/Actor');

const check404 = (studio, id) => {
    if(!studio){
        throw {
            status: 404,
            error: `Studio with ${id} does not exist`
        };
    }
};

module.exports = router
    .post('/', (req, res, next) => {
        Actor.create(req.body)
            .then(actor => res.json(actor))
            .catch(next);
    });