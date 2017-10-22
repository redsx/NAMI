const mongoose = require('mongoose')
    , jwt = require('jsonwebtoken')
    , JWT_KEY = require('../config/cr-config').JWT_KEY
    , config = require('../config/cr-config.js');
const Schema = mongoose.Schema;
const relation = new Schema({
    name: {
        type: String,
        require: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    creater: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    createdAt: {
        type: Date, 
        default: Date.now()
    }
});
module.exports = mongoose.model('relation',relation);
