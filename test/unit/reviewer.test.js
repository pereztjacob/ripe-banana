const { assert } = require('chai');
const Reviewer = require('../../lib/models/Reviewer');

describe('reviewer model', () => {
    it('reviewer is a valid model', () => {
        const data = {
            name: 'Roger Ebert',
            company: 'roger-ebert.com',
            email: 'me@me.com',
            hash: '12ljsdf',
            roles: ['admin']
        };

        const reviewer = new Reviewer(data);
        data._id = reviewer._id;
        assert.deepEqual(reviewer.toJSON(), data);
    });

    it('name and company are required', () => {
        const reviewer = new Reviewer({});
        const { errors } = reviewer.validateSync();
        assert.equal(errors.name.kind, 'required');
        assert.equal(errors.company.kind, 'required');
    });
});