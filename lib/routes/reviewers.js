const router = require('express').Router();
const Reviewer = require('../models/Reviewer');
const Review = require('../models/Review');

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
        
        Promise.all([
            Reviewer.findById(id)
                .lean(),
        
            Review.find({ reviewer: id })
                .lean()
                .select('rating review')
                .populate({
                    path: 'film',
                    select: 'title'
                })
        ])
            .then(([reviewer, reviews]) => {
                check404(reviewer, id);
                reviewer.reviews = reviews;
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