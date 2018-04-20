const router = require('express').Router();
const Studio = require('../models/Studio');

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
        Studio.create(req.body)
            .then(studio => res.json(studio))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const { id } = req.params;

        Studio.findById(id)
            .lean()
            .select('name')
            .then(studio => {
                check404(studio, id);
                res.json(studio);
            })
            .catch(next);
    });