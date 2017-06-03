const User = require('../models/user-mongo')
    , Private = require('../models/private-mongo');
module.exports = {
    initPrivateList: function *(info,cb){
        const _id = info.token.user;
        const user = yield User.findOne({_id: _id});
        if(user){
            const lastOnlineTime = user.lastOnlineTime;
            const privateHistories = yield Private.find(
                {timestamp: {$gt: lastOnlineTime},to: _id},
                null,
                {sort:'-_id'})
                .populate({path: 'from', select: '_id avatar nickname'});
            cb(privateHistories);
        } else{
            cb({ isError: true, errMsg:'ERROR1003'});
        }
    },
    savePrivateMessage: function *(message,socket,cb) {
        let { from, to, content, type } = message,
            timestamp = Date.now();
        content = content.slice(0,500);
        const toUser = yield User.findOne({_id: to}).populate('online'),
              fromUser = yield User.findOne({_id: from});
        if(fromUser && toUser){
            const msg = {from, to, timestamp, type, content };
            if(toUser.blocks.indexOf(from) !== -1 || toUser.blockAll){
                return cb(msg);
            }
            const privateMessage = new Private(msg);
            yield privateMessage.save();
            if(toUser.online) {
                socket.broadcast.to(toUser.online.socket).emit('privateMessage',privateMessage);
            }
            cb(privateMessage);
        } else{
            cb({ isError: true, errMsg:'ERROR1003'});
        }
    },
    initPrivateItem: function *(info,cb){
        const user = yield User.findOne({_id: info._id},'avatar nickname _id');
        if(user) return cb({_id: user._id, avatar: user.avatar, name: user.nickname, histories: [], isPrivate: true});
        cb({ isError: true, errMsg:'ERROR1003'});
    },
    getPrivateInfo: function *(info,cb){
        const user = yield User.findOne({_id: info._id},'avatar nickname lastOnlineTime status');
        if(user) return cb(user);
        cb({ isError: true, errMsg:'ERROR1003'});
    },
    loadPrivateHistories: function *(info,cb) {
        const { fromUserId, toUserId, limit } = info;
        const timestamp = info.timestamp || Date.now();
        const privateMessage = yield Private.find(
        { 
            $or: [{from: fromUserId, to: toUserId},{from: toUserId, to: fromUserId}],
            timestamp: {'$lt': timestamp}
        },
        null,
        {sort:'-_id',limit})
        if(privateMessage) return cb(privateMessage);
        return cb({ isError: true, errMsg:'ERROR1005'});
    },
    /**
     * 
     * 
     * @param {object} info _id & ownerId
     * @param {function} cb callback
     */
    revokePrivate: function*(info,socket,cb){
        const _id = info._id,
            userId = info.ownerId;
        const message = yield Private.findOne({_id: id});
        if(message){
            const ret = yield Private.remove({_id: _id, from: userId}); 
            socket.broadcast.to(message.to).emit('revokeMessage', info);
            return cb({isOk: true});
        } else{
            return cb({isError: true, errMsg:'ERROR1003'});
        }
    }
}