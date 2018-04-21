const router = require('express').Router();
const Reviewer = require('../models/Reviewer');

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
        Reviewer.create(req.body)
            .then(reviewer => res.json(reviewer))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Reviewer.find(req.query)
            .lean()
            .then(reviewers => res.json(reviewers))
            .catch(next);
    })
    
    .get('/:id', (req, res, next) => {
        const { id } = req.params;

        Reviewer.findById(id)
            .lean()
            .then(reviewer => {
                check404(reviewer, id);
                res.json(reviewer);
            })
            .catch(next);
    })
    
    .put('/:id', (req, res, next) => {
        Reviewer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidatiors: true
        }).then(reviewer => res.json(reviewer))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Reviewer.findByIdAndRemove(req.params.id)
            .then(removed => res.json({ removed }))
            .catch(next);
    });