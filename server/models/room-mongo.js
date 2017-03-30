const mongoose = require('mongoose')
    , jwt = require('jsonwebtoken')
    , JWT_KEY = require('../config/cr-config').JWT_KEY
    , config = require('../config/cr-config.js');
const Schema = mongoose.Schema;
const room = new Schema({
    name: {
        type: String,
        require: true
    },
    avatar: {
        type: String, 
        default: config.DEFAULT_GROUP_AVATAR
    },
    inviteLink: String,
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    creater: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    histories: [{
        type: Schema.Types.ObjectId,
        ref: 'history'
    }],
    lastMessage: Number,
    bulletin: {
        type: String,
        default: '群主没有留下任何公告'
    },
    createdAt: {
        type: Date, 
        default: Date.now()
    }
});
module.exports = mongoose.model('room',room);
