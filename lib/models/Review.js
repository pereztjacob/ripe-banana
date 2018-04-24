const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    reviewer: {
        type: Schema.Types.ObjectId,
        ref: 'reviewer',
        required: true
    },
    review: {
        type: String,
        maxlength: 140
    },
    film: {
        type: Schema.Types.ObjectId,
        ref: 'Film',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Review', schema);

