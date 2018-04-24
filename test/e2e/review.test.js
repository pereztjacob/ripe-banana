const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');
// const Review = require('../../lib/models/Review');
const { Types } = require('mongoose');
const Film = require('../../lib/models/Film');

describe('review tests', () => {
    before(() => dropCollection('reviews'));

    let reviewA = {
        rating: 5,
        reviewer: Types.ObjectId(),
        review: 'this was good',
        film: Types.ObjectId(),
    };

    let reviewB = {
        rating: 4,
        reviewer: Types.ObjectId(),
        review: 'this was not good',
        film: Types.ObjectId(),
    };
    let filmC = {
        title: 'ToyStory',
        studio: Types.ObjectId(),
        released: 1995,
        cast: [],
    };

    const roundTrip = doc => JSON.parse(JSON.stringify(doc.toJSON()));

    before(() => {
        return Film.create(filmC).then(roundTrip)
            .then(saved => {
                filmC = saved;
                reviewA.film = saved._id;
                reviewB.film = saved._id;
            });
    });

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

    it.skip('returns all the reviews', () => {
        return request.get('/reviews')
            .then(({ body }) => {
                const { _id, name } = reviewA;
                assert.deepEqual(body, [{ _id, name }]);
            });
    });
});