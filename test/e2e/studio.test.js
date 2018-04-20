const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');
const Studio = require('../../lib/models/Studio');

describe('studio api', () => {
    before(() => dropCollection('studios'));

    let studioA = {
        name: 'StudioA',
        address: {
            city: 'Portland',
            state: 'OR',
            country: 'USA'
        }
    };

    let studioB = {
        name: 'StudioB',
        address: {
            city: 'Olympia',
            state: 'Washington',
            country: 'USA'
        }
    };

    it('saves and gets studio', () => {
        return request.post('/studios')
            .send(studioA)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.ok(_id);
                assert.deepEqual(body, {
                    ...studioA,
                    _id, __v
                });
                studioA = body;
            });
    });

    const roundTrip = doc => JSON.parse(JSON.stringify(doc.toJSON()));

    it('gets studio by id', () => {
        return Studio.create(studioB).then(roundTrip)
            .then(saved => {
                studioB = saved;
                return request.get(`/studios/${studioB._id}`);
            })
            .then(({ body }) => {
                const { _id, name } = studioB;
                assert.deepEqual(body, { _id, name });
            });
    });
});