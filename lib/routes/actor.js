const router = require('express').Router();
const Actor = require('../models/Actor');
const Film = require('../models/Film');

const check404 = (actor, id) => {
    if(!actor){
        throw {
            status: 404,
            error: `Actor with ${id} does not exist`
        };
    }
};

module.exports = router
    .post('/', (req, res, next) => {
        Actor.create(req.body)
            .then(actor => res.json(actor))
            .catch(next);
    })



    .get('/:id', (req, res, next) => {
        const { id } = req.params;

        Promise.all([
            Actor.findById(id)
                .lean(),
    
            Film.find({ 'cast.actor' : id })
                .lean()
                .select('title released')
        ])
            .then(([film, actor]) => {
                check404(film, id);
                actor.films = film;
                res.json(actor);
            })
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Actor.find(req.query)
            .lean()
            .select('name')
            .then(actors => res.json(actors))
            .catch(next);
    });