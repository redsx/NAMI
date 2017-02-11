const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const online = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    socket: String,
    createdAt: {
        type: Date, 
        default: Date.now()
    }
})
module.exports = mongoose.model('online',online);
