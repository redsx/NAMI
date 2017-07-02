const request = require('request')
    , bluebird = require('bluebird')
    , User = require('../models/user-mongo')
    , History = require('../models/history-mongo')
    , Private = require('../models/private-mongo')
    , RichText = require('../models/richtext-mongo')
    , Room = require('../models/room-mongo')
    , {test}=require('chat-room-filter')
    , config = require('../config/cr-config');
let filterNum = 0;
module.exports = {
    saveMessage: function *(message,socket,cb) {
        let { _id, room, content, type, token } = message,
            timestamp = Date.now();
        content = message.content.slice(0,500);
        _id = _id || token.user;
        let history = { room, type, content, timestamp };
        if(test(content)){
            filterNum++;
            console.log('filter --------------------> ',filterNum);
            return cb(history);
        }
        let user = yield User.findOne({ _id });
        if(user){
            history.owner = user._id;
            let owner = {avatar: user.avatar, _id: user._id,nickname: user.nickname},
                newHistory = new History(history),
                tRoom = yield Room.findOne({_id: message.room});
            if(tRoom && user.rooms.indexOf(tRoom._id) !== -1){
                tRoom.histories.push(newHistory._id);
                tRoom.lastMessage = timestamp;
                yield newHistory.save();
                yield tRoom.save();
                let ret = { owner, room , content, type, timestamp, _id: newHistory._id };
                socket.broadcast.to(message.room).emit('newMessage',ret);
                // cb({isOk: true}); //这里可以选择不返回消息内容
                cb(ret);
            } else{
                cb({ isError: true, errMsg:'ERROR1005' });
            }
        } else{
            cb({ isError: true, errMsg:'ERROR1003'});
        }
    },
    /**
     * 
     * 
     * @param {object} info _id & ownerId
     * @param {function} cb callback
     */
    revokeMessage: function*(info,socket,cb){
        const _id = info._id,
            ownerId = info.ownerId;
        const ret = yield History.remove({_id: _id, owner: ownerId}); 
        if(ret){
            socket.broadcast.emit('revokeMessage', info);
            return cb({isOk: true});
        } else{
            return cb({isError: true, errMsg:'ERROR1003'});
        }
    }
}