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
        let user = yield User.findOne({email: email}),
            userN = yield User.findOne({nickname: nickname}),
            room = yield Room.findOne({name: config.INIT_ROOM}),
            salt = yield bluebird.promisify(bcrypt.genSalt)(10);
        password = yield bluebird.promisify(bcrypt.hash)(password,salt,null); 
        if(user && room && userN)  {
            return cb({ isError: true, errMsg: 'ERROR1002'});
        }
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
        if(!user)  {
            user = yield User.findOne({nickname: email});
            if(!user){
                return cb({ isError: true, errMsg: 'ERROR1003'});
            }
        }
        let resault = yield bluebird.promisify(bcrypt.compare)(password,user.password);
        if(resault){ 
            let exp = Math.floor((new Date().getTime())/1000) + 60 * 60 * 24 * 30;
            let verify = jwt.sign({user: user._id, exp: exp },JWT_KEY);
            const room = yield Room.findOne({name: config.INIT_ROOM});
            return cb({ token:verify });
        }
        return cb({isError: true, errMsg: 'ERROR1004'});
    },

    getUserInfo: function*(info,socket,cb){
        let { token, device } = info;
        let user = yield User.findOne({_id: token.user}).populate('online');
        if(user){
            // 判断是否在线，如果在线将之前在线用户踢下线
            // if(user.online){
            //     console.log('forcedOffline: ',user.nickname);
            //     socket.broadcast.to(user.online.socket).emit('forcedOffline');
            // }
            let onliner = new Online({socket: socket.id,user: user._id});
            socket.join(user._id);
            user.device = device;
            user.onlineState = 'online';
            user.online = onliner._id;
            user.onlineDevice = user.onlineDevice && user.onlineDevice > 0 ? user.onlineDevice + 1 : 1;
            let { nickname, avatar, _id, status, expressions, blocks, blockAll } = user;
            blocks = blocks || [];
            expressions = expressions || [];
            yield onliner.save();
            yield user.save();
            cb({
                nickname, 
                avatar, 
                device, 
                _id, 
                status, 
                expressions, 
                blocks , 
                blockAll, 
                onlineState: 'online',
            });
        } else {
            cb({ isError: true, errMsg:'ERROR1003' });
        }
    },
    updateUserInfo: function*(info,cb){
        if(info.nickname) {
            const user = yield User.findOne({nickname: info.nickname});
            if(user) {
                return cb({ isError: true, errMsg:'ERROR10014'});
            }
        }
        const user = yield User.update({_id: info._id},{$set: info});
        if(user){
            return cb({isOk: true});
        }
        cb({ isError: true, errMsg:'ERROR1003'});
    },
    getUsersList: function*(info,cb){
        if(info.nickname.trim()===''){
            delete info.nickname;
        }else{
            info.nickname = new RegExp(info.nickname,'i');
        }
        const users = yield User.find(
            info,
            '_id avatar nickname status onlineState device',
            {limit: 20, sort: '-lastOnlineTime'}
        );
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
    },
    deleteExpression: function*(info,cb){
        const { expression, _id } = info;
        const user = yield User.findOne({_id: _id});
        if(user){
            const expressions = user.expressions || [];
            const index = expressions.indexOf(expression);
            if(index !== -1){
                user.expressions.splice(expression, 1);
                yield user.save();
            }
            cb({isOk: true});
        } else{
            cb({ isError: true, errMsg:'ERROR1003' });
        }
    },
    addBlock: function*(info,cb){
        const { blockId, _id } = info;
        const user = yield User.findOne({_id: _id});
        if(user){
            const blocks = user.blocks || [];
            if(blocks.length > config.MAX_BLOCK){
                return cb({isError: true, errMsg:'超出最大屏蔽人数'})
            }
            if(blocks.indexOf(blockId) === -1){
                blocks.push(blockId);
                user.blocks = blocks;
                yield user.save();
            }
            cb({isOk: true});
        } else{
            cb({ isError: true, errMsg:'ERROR1003' });
        }
    },
    removeBlock: function*(info,cb){
        const { blockId, _id } = info;
        const user = yield User.findOne({_id: _id});
        if(user){
            const blocks = user.blocks || [];
            const index = blocks.indexOf(blockId)
            if(index !== -1){
                user.blocks = blocks.slice(0,index).concat(blocks.slice(index+1));;
                yield user.save();
            }
            cb({isOk: true});
        } else{
            cb({ isError: true, errMsg:'ERROR1003' });
        }
    },
    /**
     * 
     * 
     * @param {object} info _id
     * @param {function} cb callback
     */
    getBlockList: function*(info,cb){
        const _id = info._id;
        const user = yield User.findOne({_id: _id},'blocks -_id').populate({path: 'blocks', select: '_id onlineState avatar nickname status'});
        if(user){
            const blocks = user.blocks || [];
            cb({blocks});
        } else{
            cb({ isError: true, errMsg:'ERROR1003' });
        }
    },
    getAdminId: function*(cb){
        const admin = yield User.findOne({email: config.INIT_ADMIN_EMAIL});
        if(admin){
            cb({_id: admin._id});
        } else{
            cb({ isError: true, errMsg:'ERROR1003' });
        }
    }
}
