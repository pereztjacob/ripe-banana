const Studio = require('../../lib/models/Studio');
const { assert } = require('chai');

describe('Studio model', () => {
    it('is a valid model', () => {
        const data = {
            name: 'MGM',
            address: {
                city: 'LA',
                state: 'California',
                country: 'United States'
            }
        };
        const studio = new Studio(data);
        data._id = studio._id;
        assert.deepEqual(studio.toJSON(), data);
    });

    const getValidationErrors = validation => {
        assert.isDefined(validation, 'expected errors but got none');
        return validation.errors;
    };

    it('name is required field', () => {
        const studio = new Studio({});
        const errors = getValidationErrors(studio.validateSync());
        assert.equal(errors.name.kind, 'required');
    });
});