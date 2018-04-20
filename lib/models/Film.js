const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    studio: {
        type: Schema.Types.ObjectId,
        required: true
    },
    released: {
        type: Number,
        max: 9999,
        min: 1000,
        required: true
    },
    cast: [{
        part: String,
        actor: Schema.Types.ObjectId,
    }]
});

module.exports = mongoose.model('Film', schema);