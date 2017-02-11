const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = new Schema({
    nickname: String,
    password: String,
    status: String,
    email: String,
    sex: String,
    onlineState: String,
    lastRoom: String,
    isPrivate: Boolean,
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
        default: 'http://oajmk96un.bkt.clouddn.com/lolo.jpg'
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