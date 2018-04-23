const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');
// const Review = require('../../lib/models/Review');
const { Types } = require('mongoose');

describe('review tests', () => {
    before(() => dropCollection('reviews'));

    let reviewA = {
        rating: 5,
        reviewer: Types.ObjectId(),
        review: 'this was good',
        film: Types.ObjectId(),
    };

    // let reviewB = {
    //     rating: 4,
    //     reviewer: Types.ObjectId(),
    //     review: 'this was not good',
    //     film: Types.ObjectId(),
    // };

    it('saves and gets review', () => {
        return request.post('/reviews')
            .send(reviewA)
            .then(({ body }) => {
                const { _id, __v, updatedAt, createdAt } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                assert.ok(updatedAt);
                assert.ok(createdAt);
                assert.equal(body.review, reviewA.review);
                reviewA = body;
            });
    });
});