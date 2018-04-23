const router = require('express').Router();
const Review = require('../models/Review');

// const check404 = (studio, id) => {
//     if(!studio){
//         throw {
//             status: 404,
//             error: `Studio with ${id} does not exist`
//         };
//     }
// };

module.exports = router
    .post('/', (req, res, next) => {
        Review.create(req.body)
            .then(review => res.json(review))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Review.find(req.query)
            .lean()
            .select('rating review film')
            .populate({
                path: 'Film',
                select: 'title'
            })
            .then(reviews => res.json(reviews))
            .catch(next);
    });