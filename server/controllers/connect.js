const jwt = require('jsonwebtoken')
    , moment = require('moment')
    , User = require('../models/user-mongo')
    , crConfig = require('../config/cr-config')
    , Online = require('../models/online-mongo')
    , Room = require('../models/room-mongo')
    , History = require('../models/history-mongo')
    , Private = require('../models/private-mongo')
    , bluebird = require('bluebird')
    , JWT_KEY = require('../config/cr-config').JWT_KEY;

module.exports = {
    autoDisconnect: function *(socket,info) {
        let online = yield Online.findOne({socket:socket.id}).populate('user','_id nickname');
        if(online){
            console.log(online.user.nickname,' --------------->  offline');
            yield User.update({_id: online.user._id},{$set: {onlineState: 'offline', lastOnlineTime: Date.now()}});
            yield Online.remove({socket:socket.id});
        }
    },
    frontDisconnect: function *(info,cb) {
        let user = yield User.findOne({_id: info.token.user}).populate('online');
        console.log(user.nickname,' ---------------> offline');
        if(user.online){
            yield user.online.remove();
            user.onlineState = 'offline';
            user.lastOnlineTime = info.lastOnlineTime || Date.now();
            yield user.save();
        }
        cb({isOk: true});
    },
}