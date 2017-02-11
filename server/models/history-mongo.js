const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const history = new Schema({
    content: String,
    timestamp: Number,
    room: String,
    type: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = mongoose.model('history',history);
