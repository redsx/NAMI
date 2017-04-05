const co = require('co')
    , jwt = require('jsonwebtoken')
    , online = require('../controllers/online')
    , user = require('../controllers/user')
    , message = require('../controllers/message')
    , room = require('../controllers/room')
    , private = require('../controllers/private')
    , JWT_KEY = require('../config/cr-config').JWT_KEY
    , connect = require('../controllers/connect');

function callbackError(cb,err){
    console.log(err);
    cb({ isError:true, errMsg: typeof err === 'string' ? err : 'ERROR1000'});
}
function parseToken(info){
    return new Promise((resolve,reject)=>{
        try{
            info.token = jwt.verify(info.token,JWT_KEY);
            resolve(info);
        }catch(err){
            reject('ERROR1001');
        }
    })
}
module.exports = function (io) {
    io.on('connect',function (socket) {
        socket.on('disconnect',() => {
            co(connect.autoDisconnect(socket))
            .catch((err) => callbackError(cb,err));
        })
        socket.on('frontDisconnect',(info,cb)=>{
            parseToken(info)
            .then((info)=> co(connect.frontDisconnect(info,cb)))
            .catch((err) => callbackError(cb,err));
        })
        socket.on('login',(info,cb) => {
            co(user.verifyUser(info,cb))
            .catch((err) => callbackError(cb,err));
        })
        socket.on('signUp',(info,cb) => {
            co(user.createUser(info,cb))
            .catch((err) => callbackError(cb,err));
        })
        socket.on('getUserInfo',(info,cb) => {
            parseToken(info)
            .then((info)=>co(user.getUserInfo(info,socket,cb)))
            .catch((err) => callbackError(cb,err));
        })
        socket.on('getUsersList',(info,cb)=>{
            co(user.getUsersList(info,cb))
            .catch((err) => callbackError(cb,err));
        })
        socket.on('updateUserInfo',(info,cb)=>{
            co(user.updateUserInfo(info,cb))
            .catch((err) => callbackError(cb,err));
        })
        socket.on('getAdminId',(info,cb)=>{
            co(user.getAdminId(cb))
            .catch((err) => callbackError(cb,err));
        })
        socket.on('addExpression',(info,cb)=>{
            co(user.addExpression(info,cb))
            .catch((err) => callbackError(cb,err));
        })
        socket.on('addBlock',(info,cb)=>{
            co(user.addBlock(info,cb))
            .catch((err) => callbackError(cb,err));
        })
        socket.on('removeBlock',(info,cb)=>{
            co(user.removeBlock(info,cb))
            .catch((err) => callbackError(cb,err));
        })
        socket.on('getBlockList',(info,cb)=>{
            co(user.getBlockList(info,cb))
            .catch((err) => callbackError(cb,err));
        })
        socket.on('initRoomList',(info,cb)=>{
            parseToken(info)
            .then((info)=>co(room.initRoomList(info,socket,cb)))
            .catch((err) => callbackError(cb,err));
        })
        socket.on('initRoomItem',(info,cb)=>{
            co(room.initRoomItem(info,cb))
            .catch((err) => callbackError(cb,err));
        })
        socket.on('loadRoomHistories',(info,cb)=>{
            co(room.loadRoomHistories(info,cb))
            .catch((err) => callbackError(cb,err));
        })
        socket.on('getRoomInfo',(info,cb)=>{
            co(room.getRoomInfo(info,cb))
            .catch((err) => callbackError(cb,err));
        })
        socket.on('getRoomUsers',(info,cb)=>{
            co(room.getRoomUsers(info,cb))
            .catch((err) => callbackError(cb,err));
        })
        socket.on('joinRoom',(info,cb)=>{
            co(room.joinRoom(info,socket,cb))
            .catch((err) => callbackError(cb,err));
        })
        socket.on('exitRoom',(info,cb)=>{
            co(room.exitRoom(info,socket,cb))
            .catch((err) => callbackError(cb,err));
        })
        socket.on('getInviteLink',(info,cb)=>{
            co(room.getInviteLink(info,cb))
            .catch((err) => callbackError(cb,err));
        })
        socket.on('refreshInviteLink',(info,cb)=>{
            co(room.refreshInviteLink(info,cb))
            .catch((err) => callbackError(cb,err));
        })
        socket.on('updateRoomInfo',(info,cb)=>{
            co(room.updateRoomInfo(info,cb))
            .catch((err) => callbackError(cb,err));
        })
        socket.on('initMessage',(info,cb) => {
            parseToken(info)
            .then((info)=>co(message.initMessages(info,cb)))
            .catch((err) => callbackError(cb,err));
        })
        socket.on('message',(msg,cb) => {
            parseToken(msg)
            .then(msg=>co(message.saveMessage(msg,socket,cb)))
            .catch((err) => callbackError(cb,err));
        })
        socket.on('revokeMessage',(info,cb)=>{
            co(message.revokeMessage(info,cb))
            .catch((err) => callbackError(cb,err));
        })
        socket.on('revokePrivate',(info,cb)=>{
            co(private.revokePrivate(info,cb))
            .catch((err) => callbackError(cb,err));
        })
        socket.on('initPrivateList',(info,cb)=>{
            parseToken(info)
            .then((info)=>co(private.initPrivateList(info,cb)))
            .catch((err) => callbackError(cb,err));
        })
        socket.on('initPrivateItem',(info,cb)=>{
            co(private.initPrivateItem(info,cb))
            .catch((err) => callbackError(cb,err));
        })
        socket.on('getPrivateInfo',(info,cb)=>{
            co(private.getPrivateInfo(info,cb))
            .catch((err) => callbackError(cb,err));
        })
        //
        socket.on('loadPrivateHistories',(info,cb)=>{
            co(private.loadPrivateHistories(info,cb))
            .catch((err) => callbackError(cb,err));
        })
        socket.on('private',(msg,cb) => {
            parseToken(msg)
            .then(msg=>co(private.savePrivateMessage(msg,socket,cb)))
            .catch((err) => callbackError(cb,err));
        })
        
        socket.on('createRoom',(info,cb) => {
            co(room.createRoom(info,socket,cb))
            .catch((err) => callbackError(cb,err));
        })
    })
}