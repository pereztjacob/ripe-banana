const { assert } = require('chai');
const { Types } = require('mongoose');
const Review = require('../../lib/models/Review');

describe('review model', () => {
    it('review is a valid model', () => {
        const data = {
            rating: 3,
            reviewer: Types.ObjectId(),
            review: 'wait for dvd',
            film: Types.ObjectId()
        };

        const review = new Review(data);
        data._id = review._id;
        assert.deepEqual(review.toJSON(), data);
    });

    const data2 = {
        rating: 6,
        reviewer: Types.ObjectId(),
        review: 'wait for dvd',
        film: Types.ObjectId()
    };

    it('rating is max 5', () => {
        const review = new Review(data2);
        const { errors } = review.validateSync();
        assert(errors.rating.kind, 'max');
    });

    it('rating bust be at least 1', () => {
        data2.rating = 0;
        const review = new Review(data2);
        const { errors } = review.validateSync();
        assert(errors.rating.kind, 'min');
    });

    it('rating, reviewer, and film are required', () => {
        const review = new Review({});
        const { errors } = review.validateSync();
        assert(errors.rating.kind, 'required');
        assert(errors.reviewer.kind, 'required');
        assert(errors.film.kind, 'required');
    });
});

