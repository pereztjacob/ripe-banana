const { assert } = require('chai');
const request = require('./request');
const { Types } = require('mongoose');
const { dropCollection } = require('./db');
const Actor = require('../../lib/models/Actor');

describe('actor api', () => {

    before(() => dropCollection('actors'));
    before(() => dropCollection('films'));

    let data = {
        name: 'Bob',
        dob: '7/18/90',
        pob: 'Portland'
    };

    let actor = {
        name: 'Bill',
        dob: '5/5/50',
        pob: 'Salem'
    };
 
    it('saves and gets actor', () => {
        return request.post('/actors')
            .send(data)
            .then(({ body }) => {
                const { _id, __v, dob } = body;
                assert.ok(_id);
                assert.deepEqual(body, {
                    ...data,
                    _id, __v, dob
                });
                data = body;
            });
    });

    const roundTrip = doc => JSON.parse(JSON.stringify(doc.toJSON()));

    it('gets actor by id', () => {
        const filmD = {
            title: 'movieD',
            studio: Types.ObjectId(),
            released: 1990,
            cast: [{ part: 'lead1', actor: null }]
        };
        return Actor.create(actor).then(roundTrip)
            .then(saved => {
                actor = saved;
                filmD.cast[0].actor = saved._id;
                return request.post('/films')
                    .send(filmD);
            })
            .then(() => {
                return request.get(`/actors/${actor._id}`);
            }
            )
            .then(({ body }) => {
                assert.deepEqual(body.films[0].title, filmD.title);
            });
    });

    it('gets all actors', () => {
        return request.get('/actors')
            .then(({ body }) => {
                assert.deepEqual(body[0].name, data.name);
                assert.deepEqual(body[1].name, actor.name);
            });
    });

    it('deletes actor by id', () => {
        return request.delete(`/actors/${data._id}`)
            .then(() => {
                return Actor.findById(data._id);
            })
            .then(found => {
                assert.isNull(found);
            });
    });

    it('updates actor', () => {
        actor.name = 'William';

        return request.put(`/actors/${actor._id}`)
            .send(actor)
            .then(({ body }) => {
                assert.deepEqual(body, actor);
            });
    });

});