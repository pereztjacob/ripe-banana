const { assert } = require('chai');
const request = require('./request');
const { Types } = require('mongoose');
const { dropCollection } = require('./db');
const Film = require('../../lib/models/Film');

describe.only('film api', () => {

    before(() => dropCollection('films'));

   
    let film = {
        title: 'The Shining',
        studio: Types.ObjectId(),
        released: 1970,
        cast: [{ part: 'lead', actor: Types.ObjectId() }]
    };

    let filmB = {
        title: 'Another one',
        studio: Types.ObjectId(),
        released: 2000,
        cast: [{ part: 'vilian', actor: Types.ObjectId() }]
    };

    it('saves and gets film', () => {
        return request.post('/films')
            .send(film)
            .then(({ body }) => {
                const { _id } = body;
                assert.ok(_id);
                assert.ok(body.cast[0].actor);
                film = body;
            });
    });

    const roundTrip = doc => JSON.parse(JSON.stringify(doc.toJSON()));

    it('gets film by id', () => {
        return Film.create(filmB).then(roundTrip)
            .then(saved => {
                filmB = saved;
                return request.get(`/films/${filmB._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, filmB);
            });
    });

    it('gets all films', () => {
        return request.get('/films')
            .then(({ body }) => {
                assert.deepEqual(body, [film, filmB]);
            });
    });
});