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

    it('signup', () => {
        assert.ok(token);
    });

    it('signin', () => {
        return request 
            .post('/api/auth/signin')
            .send({
                email: 'a@a.com',
                password: 'abc'
            })
            .then(({ body }) => {
                assert.ok(body.token);
            });
    });

    it('verifies', () => {
        return request
            .get('/api/auth/verify')
            .set('Authorization', token)
            .then(({ body }) => {
                assert.isOk(body.verified);
            });
    });

});