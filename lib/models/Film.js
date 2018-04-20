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
        max: 4,
        min: 4,
        required: true
    },
    cast: [{
        part: String,
        actor: Schema.Types.ObjectId,
    }]
});