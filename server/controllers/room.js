const Room = require('../models/room-mongo')
    , jwt = require('jsonwebtoken')
    , User = require('../models/user-mongo')
    , listUtil = require('../util/list.js')
    , config = require('../config/cr-config')
    , JWT_KEY = require('../config/cr-config').JWT_KEY;
module.exports = {
    initRoomList: function*(info,socket,cb){
        let userId = info.token.user
            rooms = [];
        let userRooms = yield User.findOne({_id: info.token.user}).populate({
            path: 'rooms', 
            select: 'histories lastMessage name avatar',
            options: { limit: 20 },
            populate: {
                path: 'histories',
                options: { limit: 1, sort: '-timestamp' },
                populate: {path: 'owner', select: '_id avatar nickname'}
            }
        });
        rooms = userRooms.rooms.map(function(room){
            socket.join(room._id);
            return room;
        });
        cb(rooms);
    },
    initRoomItem: function *(info,cb){
        const room = yield Room.findOne({_id: info._id},'lastMessage name avatar');
        if(room) return cb({_id: room._id, lastMessage: room.lastMessage, name: room.name, avatar: room.avatar, histories: []});
        return cb({isError: true, errMsg: 'ERROR1005'});
    },
    loadRoomHistories: function *(info,cb){
        const { _id, limit } = info;
        const timestamp = info.timestamp || Date.now();
        const room = yield Room.findOne({_id: _id},'histories lastMessage name avatar').populate({
            path: 'histories',
            match: {timestamp: {'$lt': timestamp}},
            options: { sort:'-timestamp', limit },
            populate: {path: 'owner', select: '_id avatar nickname'}
        });
        if(room) return cb(room);
        return cb({isError: true, errMsg: 'ERROR1005'});
    },
    createRoom: function *(info,socket,cb) {
        const user = yield User.findOne({_id: info.user});
        const count = yield Room.count({creater: user._id});
        if(count >= config.MAX_ROOM) return cb({isError: true,errMsg: 'ERROR10010'});
        if(user){
            const room = new Room({name: info.roomName,creater: user._id, users:[user._id]});
            user.rooms.push(room._id);
            yield user.save();
            yield room.save();
            socket.join(room.name);
            cb({ isOk: true, _id: room._id});
        } else{
            cb({ isError: true, errMsg: 'ERROR10012'});
        }
    },
    
    getRoomInfo: function *(info,cb){
        const room = yield Room.findOne({_id:info._id},'avatar createdAt bulletin name creater').populate({path: 'creater', select: '_id avatar nickname status'});
        if(room){
            cb(room);
        } else{
            cb({ isError: true, errMsg: 'ERROR1005' });
        }
    },
    getInviteLink: function*(info,cb){
        const room = yield Room.findOne({_id:info._id},'avatar name inviteLink creater');
        if(room){
            cb(room);
        } else{
            cb({ isError: true, errMsg: 'ERROR1005' });
        }
    },
    refreshInviteLink: function *(info,cb){
        const room = yield Room.findOne({_id:info._id,creater: info.creater},'avatar name inviteLink');
        if(room){
            let inviteLink = jwt.sign({ link: Date.now() },JWT_KEY);
            inviteLink = inviteLink.slice(inviteLink.length-20,inviteLink.length);
            room.inviteLink = inviteLink;
            const success =  yield room.save();
            cb({inviteLink});
        } else{
            cb({ isError: true, errMsg: 'ERROR1005' });
        }
    },
    updateRoomInfo: function *(info,cb){
        const { _id, creater } = info;
        yield Room.update({_id,creater},{$set: info});
        cb({isOk: true});
    },
    exitRoom: function *(info,socket,cb){
        const user = yield User.findOne({_id: info.user});
        let roomArr = user.rooms || [];
        const index = user.rooms.indexOf(info.room);
        if( index !== -1){
            roomArr.splice(index,1);
            socket.leave(info.room);
            user.rooms = roomArr;
            yield user.save();
        }
        cb({isOk: true});
    },
    joinRoom: function *(info,socket,cb) {
        const user = yield User.findOne({_id: info.user});
        const room = yield Room.findOne({inviteLink: info.inviteLink});
        if(user.rooms.indexOf(room._id) !== -1){
            return cb({ isOk: true})
        } else if(room && user){
            user.rooms.push(room._id);
            room.users.push(user._id);
            yield room.save();
            yield user.save();
            socket.join(room.name)
            cb({ isOk: true})
        } else {
            return cb({ isError: true, errMsg: 'ERROR1005'})
        }
    },
    
}