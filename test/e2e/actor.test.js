const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');
const Actor = require('../../lib/models/Actor');

describe.only('actor api', () => {

    before(() => dropCollection('actors'));
    
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

    it.skip('gets actor by id', () => {
        return Actor.create(actor).then(roundTrip)
            .then(saved => {
                actor = saved;
                return request.get(`/studios/${actor._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, actor);
            });
    });
});