const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Auth API', () => {
    
    beforeEach(() => dropCollection('users'));

    let token = null;

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send({
                email: 'a@a.com',
                password: 'abc'
            })
            .then(({ body }) => token = body.token);
    });

    it.only('signup', () => {
        assert.ok(token);
    });

});