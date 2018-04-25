const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    }, 
    email: String,
    hash: String,
    roles: [String]
});

module.exports = mongoose.model('Reviewer', schema);

