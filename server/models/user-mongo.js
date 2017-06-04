const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = new Schema({
    nickname: String,
    password: String,
    status: String,
    email: String,
    sex: String,
    onlineState: String,
    onlineDevice: {
        type: Number,
        default: 0,
    },
    blockAll: {
        type: Boolean,
        default: false,
    },
    expressions: {
        type: Array,
        default: []
    },
    blocks: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    lastOnlineTime: {
        type: Number,
        default: Date.now()
    },   
    device: {
        type: String,
        default: 'PC'
    },
    rooms: [{
        type: Schema.Types.ObjectId,
        ref: 'room'
    }],
    avatar: {
        type: String, 
        default: 'http://oj7h98lzb.bkt.clouddn.com/avatar' + Date.now()%9 +'.jpeg'
    },
    createdAt: {
        type: Date, 
        default: Date.now()
    },
    online: {
        type: Schema.Types.ObjectId,
        ref: 'online'
    },
})
module.exports = mongoose.model('user',user);