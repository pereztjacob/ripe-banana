const { assert } = require('chai');
const { Types } = require('mongoose');
const Actor = require('../../lib/models/Actor');

describe('actor model', () => {
    it('actor is a valid model', () => {
        const data = {
            name: 'Joe Smith',
            dob: '4/19/1970',
            pob: 'LA'
        };

        const actor = new Actor(data);
        data._id = actor._id;
        data.dob = actor.dob;
        assert.deepEqual(actor.toJSON(), data);
    });

    it('title, studio, released are required', () => {
        const actor = new Actor({});
        const { errors } = actor.validateSync();
        assert.equal(errors.name.kind, 'required');
    });
});