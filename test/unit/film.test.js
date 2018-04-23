const { assert } = require('chai');
const { Types } = require('mongoose');
const Film = require('../../lib/models/Film');

describe('film model', () => {
    it('film is a valid model', () => {
        const starWars = {
            title: 'Star Wars',
            studio: Types.ObjectId(),
            released: 1977,
            cast: [{ part: 'Luke', actor: Types.ObjectId() }]
        };

        const film = new Film(starWars);
        starWars._id = film._id;
        starWars.cast[0]._id = film.cast[0]._id;
        assert.deepEqual(film.toJSON(), starWars);
    });

    const getValidationErrors = validation => {
        assert.isDefined(validation, 'expected errors but got none');
        return validation.errors;
    };

    it('title, studio, released are required', () => {
        const film = new Film({});
        const errors = getValidationErrors(film.validateSync());
        assert.equal(errors.title.kind, 'required');
        assert.equal(errors.studio.kind, 'required');
        assert.equal(errors.released.kind, 'required');
    });

    const film = {
        title: 'test',
        studio: Types.ObjectId(),
        released: 12345
    };

    it('released is max 4 digits', () => {
        const data = new Film(film);
        const errors = getValidationErrors(data.validateSync());
        assert.equal(errors.released.kind, 'max');
    });

    it('released is min 4 digits', () => {
        film.released = 1;
        const data = new Film(film);
        const errors = getValidationErrors(data.validateSync());
        assert.equal(errors.released.kind, 'min');
    });
});