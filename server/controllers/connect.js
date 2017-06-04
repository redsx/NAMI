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
        let online = yield Online.findOne({socket:socket.id}).populate('user','_id nickname onlineDevice');
        if(online){
            console.log(online.user.nickname,' --------------->  offline');
            const onlineDevice = online.user.onlineDevice;
            if(onlineDevice > 1) {
                yield User.update({_id: online.user._id},{$set: {onlineDevice: onlineDevice - 1}});
            } else {
                yield User.update(
                    {_id: online.user._id},
                    {
                        $set: {
                            onlineState: 'offline', 
                            lastOnlineTime: Date.now(),
                            onlineDevice: 0,
                        }
                    }
                );
            }
            yield Online.remove({socket:socket.id});
        }
    },
    frontDisconnect: function *(info,cb) {
        // 此处为前端断开连接后重连触发
        const user = yield User.findOne({_id: info.token.user});
        console.log(user.nickname,' ---------------> offline');
        const onlineDevice = user.onlineDevice;
        if(onlineDevice <= 1){
            user.onlineState = 'offline';
        }
        user.onlineDevice = onlineDevice - 1;
        user.lastOnlineTime = info.lastOnlineTime || Date.now();
        yield user.save();
        cb({isOk: true});
    },
}