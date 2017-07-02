import { browserHistory } from 'react-router'

import language from '../config/language.js'
import stateManege from '../util/stateManage.js'
import config from '../config/config.js'
import socket from './socket.js'

import { normalize } from 'normalizr'
import { initState } from './batched.js'
import { roomsSchema , historySchema } from '../middlewares/schemas.js'
import { socketEmit, dispatchAction, dispatchThunk } from './common.js'
import { updateRoomInfo, mergeRoomInfo, clearUnreadCount } from './activeList.js'
import { 
    pushSnackbar, 
    setRightManager,
    setLeftManager, 
    msgContainerScroll, 
    setMenuState 
} from './pageUI.js'
import { 
    getSendFunc, 
    mergeMessage, 
    addMessage, 
    clearHistory, 
    addHistories, 
    initItem,
    removeItemMessage,
    getRevokeFunc,
    removeHistories,
} from './messages.js'
import { 
    mergeUserInfo, 
    updateUserInfo, 
    createRoom, 
    pushExpression,
    addBlockContact,
    removeBlockContact,
    pushBlock,
    deleteBlock,
} from './user.js'

function mergeCbMessage(preMsg,ret){
    let message = {};
    message[preMsg._id] = {isLoading: false};
    message[preMsg._id].Tid = ret._id;
    message[preMsg._id].Ttimestamp = ret.timestamp;
    message[preMsg._id].Tcontent = ret.content;
    mergeMessage(message);
}

export const errPrint = (err) => {
    console.error(err, language[err]);
    language[err]? pushSnackbar(language[err]): pushSnackbar(language['ERROR1000']);
}


export const sendMessage = (isPrivate = false) => (msg,preMsg) => {
    addMessage(preMsg);
    getSendFunc(isPrivate)(msg)
    .then((ret) => mergeCbMessage(preMsg, ret))
    .catch(err => {
        errPrint(err);
        browserHistory.push('/login');
    })
}

export const sendFile = (isPrivate = false) => (msg,fileHandle) => {
    fileHandle.getUrlData()
    .then(ret=>{
        if(msg.preMessage.type === 'file'){
            msg.preMessage.content = JSON.stringify(fileHandle.getFileInfo());
        } else {
            msg.preMessage.content =  ret;
        }
        addMessage(msg.preMessage);
        return fileHandle.upload();
    })
    .then(ret => {
        if(msg.message.type === 'file'){
            msg.message.content = JSON.stringify({...fileHandle.getFileInfo(),src: ret.src});
        } else {
            msg.message.content = ret.src;
        }
        return getSendFunc(isPrivate)(msg.message);
    })
    .then((ret) => mergeCbMessage(msg.preMessage,ret))
    .catch((err) => errPrint(err))
}

export const loadRoomHistory = dispatchThunk( () => {
    return (dispatch,getState) => {
        const state = getState(),
              limit = config.ScreenMessageLenght;
        const curRoomInfo = stateManege.getCurRoomInfo(state),
              messages = state.get('messages'),
              userId =  state.getIn(['user','_id']);
        const first = curRoomInfo.get('histories') && curRoomInfo.get('histories').first(),
              _id = curRoomInfo.get('_id');
        const timestamp = messages.getIn([first,'Ttimestamp']) || messages.getIn([first,'timestamp']) || 0;
        if(curRoomInfo.get('isPrivate')){
            return socketEmit('loadPrivateHistories')({
                limit, 
                timestamp,
                fromUserId: _id,
                toUserId: userId,
            })
            .then((ret) => {
                const normalizeHis = normalize(ret,historySchema);
                addHistories({
                    histories: normalizeHis.entities.histories, 
                    room: {_id , histories: normalizeHis.result} 
                });
            })
        } else{
            return socketEmit('loadRoomHistories')({limit, timestamp , _id})
            .then((ret)=>{
                let entity = normalize([ret],roomsSchema).entities;
                let { _id, histories } = entity.rooms[ret._id];
                addHistories({ histories: entity.histories, room: {_id, histories} });
            })
        }
        
    }
})

export const changeRoom = isPrivate => curRoom => {
    msgContainerScroll(true);
    setRightManager({isShow: false});
    clearHistory();
    clearUnreadCount({_id: curRoom});
    mergeUserInfo({curRoom});
    setMenuState(false);
    dispatchThunk(() => (dispatch,getState) =>{
        const state = getState(),
              maxLength = config.ScreenMessageLenght;
        const curRoom = state.getIn(['user','curRoom']);
        const curRoomInfo = state.getIn(['activeList',curRoom]);
        if(!curRoom) {
            return ;
        }
        if(!curRoomInfo || !curRoomInfo.get('_id')) {
            initItem(isPrivate)(curRoom)
            .then(()=>loadRoomHistory())
            .catch(err=>errPrint(err));
        } else {
            const length = curRoomInfo.get('histories').size;
            if(length < maxLength) {
                loadRoomHistory()
                .catch(err=>errPrint(err));
            }
        }
    })()
}
export const changeUserInfo = (info) => {
    updateUserInfo(info)
    .then(ret => mergeUserInfo(info))
    .catch(err => errPrint(err))
}

export const changeRoomInfo = info => {
    updateRoomInfo(info)
    .then(ret => {
        mergeRoomInfo(info);
    })
    .catch(err => errPrint(err))
}

export const createGroup = (info) => {
    pushSnackbar(language.newGroup);
    createRoom(info)
    .then(ret => {
        pushSnackbar(language.success);
        setLeftManager({isShow: false});
        changeRoom(false)(ret._id);
    })
    .catch(err => errPrint(err));
}

export const exitRoom = (info) => {
    socketEmit('exitRoom')(info)
    .then(ret => {
        changeRoom(false)('');
        removeItemMessage(info);
    })
    .catch(err => errPrint(err))
}

export const joinRoom = (info) => {
    socketEmit('joinRoom')(info)
    .then(ret => { 
        if(ret.isOk) {
            browserHistory.push('/');
            pushSnackbar(language.joinRoomSuccess);
            changeRoom(false)(ret._id);

        }
    })
    .catch(err => pushSnackbar(language.inviteLinkDisabled))
}

export const addExpression = (info) => {
    socketEmit('addExpression')(info)
    .then(()=>{
        pushExpression(info.expression);
        pushSnackbar(language.addExpression);
    })
    .catch((err)=>errPrint(err));
};

// export const deleteExpression = (info) => {
//     socketEmit('deleteExpression')(info)
//     .then(()=>{
//         pushExpression(info.expression);
//         pushSnackbar(language.addExpression);
//     })
//     .catch((err)=>errPrint(err));
// };

export const addBlock = (info) => {
    addBlockContact(info)
    .then(()=>{
        pushBlock(info.blockId);
        pushSnackbar(language.blockContact);
    })
    .catch(()=>pushSnackbar('block contact error'))
}
export const removeBlock = (info) => {
    removeBlockContact(info)
    .then(()=>{
        deleteBlock(info.blockId);
        pushSnackbar(language.removeBlock);
    })
    .catch(()=>pushSnackbar('delete block contact error'))
}

export const logout = () => {
    initState();
    browserHistory.push('/login');
    delete localStorage.token;
    socket.disconnect();
    socket.connect();
}

/**
 * 
 * 
 * @param {object} info _id & ownerId & isPrivate & Tid
 * 
 */
export const revokeMessage = (info) => {
    const _id = info.Tid || info._id;
    const timestamp = info.timestamp;
    if(Date.now() - timestamp > config.revokeMsgTimeLimit){
        return errPrint('ERROR10016');
    }
    getRevokeFunc(info.isPrivate)({ownerId: info.ownerId, _id, timestamp})
    .then(()=>{
        removeHistories([info._id]);
        pushSnackbar(language.withdrawn);
    })
    .catch((err => errPrint(err)))
}