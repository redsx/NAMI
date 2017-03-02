const User = require('../models/user-mongo')
    , Online = require('../models/online-mongo')
    , Room = require('../models/room-mongo')
    , bcrypt = require('bcrypt-nodejs')
    , bluebird = require('bluebird')
    , moment = require('moment')
    , jwt = require('jsonwebtoken')
    , config = require('../config/cr-config')
    , JWT_KEY = require('../config/cr-config').JWT_KEY;
module.exports = {
    createUser: function *(info,cb) {
        let { password, nickname, email } = info;
        console.log('info: ', info);
        let user = yield User.findOne({email: email}),
            room = yield Room.findOne({name: config.INIT_ROOM}),
            salt = yield bluebird.promisify(bcrypt.genSalt)(10);
        password = yield bluebird.promisify(bcrypt.hash)(password,salt,null); 
        if(user && room)  return cb({ isError: true, errMsg: 'ERROR1002'});
        let rooms = [room._id];
        let resault  = yield User.create({ nickname, email, password, rooms });
        if(resault){ 
            room.users.push(resault._id);
            if(email === config.INIT_ADMIN_EMAIL) room.creater = resault._id;
            yield room.save();
            let exp = Math.floor((new Date().getTime())/1000) + 60 * 60 * 24 * 30;
            let verify = jwt.sign({ user: resault._id, exp: exp },JWT_KEY);
            return cb({ token:verify });
        }
        return cb({ isError: true, errMsg: 'ERROR1000'});
    },

    verifyUser: function *(info,cb) {
        let { email, password } = info;
        let user = yield User.findOne({email: email});
        if(!user) return cb({ isError: true, errMsg: 'ERROR1003'});
        let resault = yield bluebird.promisify(bcrypt.compare)(password,user.password);
        if(resault){ 
            let exp = Math.floor((new Date().getTime())/1000) + 60 * 60 * 24 * 30;
            let verify = jwt.sign({user: user._id, exp: exp },JWT_KEY);
            return cb({ token:verify });
        }
        return cb({isError: true, errMsg: 'ERROR1004'});
    },

    getUserInfo: function*(info,socket,cb){
        socket.join(socket.id);
        let { token, device } = info;
        let user = yield User.findOne({_id: token.user}).populate('online');
        if(user){
            // 判断是否在线，如果在线将之前在线用户踢下线
            if(user.online){
                console.log('forcedOffline: ',user.nickname);
                socket.broadcast.to(user.online.socket).emit('forcedOffline');
            }
            let onliner = new Online({socket: socket.id,user: user._id});
            user.device = device;
            user.onlineState = 'online';
            user.online = onliner._id;
            let { nickname, avatar, _id, status, expressions } = user;
            expressions = expressions || [];
            yield onliner.save();
            yield user.save();
            cb({nickname, avatar, device, _id, status, expressions});
        } else {
            cb({ isError: true, errMsg:'ERROR1003' });
        }
    },
    updateUserInfo: function*(info,cb){
        const user = yield User.update({_id: info._id},{$set: info});
        if(user) return cb({isOk: true});
        cb({ isError: true, errMsg:'ERROR1003'});
    },
    getUsersList: function*(info,cb){
        if(info.nickname.trim()===''){
            delete info.nickname;
        }else{
            info.nickname = new RegExp(info.nickname,'i');
        }
        const users = yield User.find(info,'_id avatar nickname status onlineState',{limit: 20, sort: '-lastOnlineTime'});
        cb(users);
    },
    addExpression: function*(info,cb){
        const { expression, _id } = info;
        const user = yield User.findOne({_id: _id});
        if(user){
            const expressions = user.expressions || [];
            if(expressions.indexOf(expression) === -1){
                expressions.push(expression);
                user.expressions = expressions;
                yield user.save();
            }
            cb({isOk: true});
        } else{
            cb({ isError: true, errMsg:'ERROR1003' });
        }
    }
}