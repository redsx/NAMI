import language from '../config/language.js'
import stateManege from '../util/stateManage.js'
import config from '../config/config.js'
import { mergeUserInfo, updateUserInfo, createRoom } from './user.js'
import { pushSnackbar, setRightManager, setLeftManager, msgContainerScroll } from './pageUI.js'
import { roomsSchema , historySchema } from '../middlewares/schemas.js'
import { socketEmit, dispatchAction, dispatchThunk } from './common.js'
import { updateRoomInfo, mergeRoomInfo } from './activeList.js'
import { normalize } from 'normalizr'
import { 
    getSendFunc, 
    mergeMessage, 
    addMessage, 
    clearHistory, 
    addHistories, 
    initItem,
    removeItemMessage,
} from './messages.js'

export const errPrint = (err) => {
    console.error(err); 
    language[err]? pushSnackbar(language[err]): pushSnackbar(language['ERROR1000']);
}
export const sendMessage = (isPrivate = false) => (content,preContent) => {
    addMessage(preContent);
    getSendFunc(isPrivate)(content)
    .then((ret) => {
        let message = {};
        message[preContent._id] = {isLoading: false};
        mergeMessage(message);
    })
    .catch(err => errPrint(err))
}

export const loadRoomHistory = dispatchThunk( () => {
    return (dispatch,getState) => {
        const state = getState(),
              limit = config.ScreenMessageLenght;
        const curRoomInfo = stateManege.getCurRoomInfo(state),
              messages = state.get('messages'),
              userId =  state.getIn(['user','_id']);
        const first = curRoomInfo.get('histories').first(),
              _id = curRoomInfo.get('_id');
        const timestamp = messages.getIn([first,'_timestamp']) || messages.getIn([first,'timestamp']);
        if(curRoomInfo.get('isPrivate')){
            socketEmit('loadPrivateHistories')({
                limit, timestamp,
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
            socketEmit('loadRoomHistories')({limit, timestamp , _id})
            .then((ret)=>{
                console.log(ret);
                let entity = normalize([ret],roomsSchema).entities;
                let { _id, histories } = entity.rooms[ret._id];
                addHistories({ histories: entity.histories, room: {_id, histories} });
            })
            .catch(err => errPrint(err))
        }
        
    }
})

export const changeRoom = isPrivate => curRoom => {
    msgContainerScroll(true);
    setRightManager({isShow: false});
    clearHistory();
    mergeUserInfo({curRoom});
    dispatchThunk(() => (dispatch,getState) =>{
        const state = getState(),
              maxLength = config.ScreenMessageLenght;
        const curRoom = state.getIn(['user','curRoom']);
        const curRoomInfo = state.getIn(['activeList',curRoom]);
        if(!curRoom) return;
        if(!curRoomInfo) return initItem(isPrivate)(curRoom).then(()=>loadRoomHistory());
        const length = curRoomInfo.get('histories').size;
        if(length < maxLength) return loadRoomHistory();
    })()
}
export const changeUserInfo = info => {
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
    console.log('create group info:',info);
    pushSnackbar(language.newGroup);
    createRoom(info)
    .then(ret => {
        console.log(ret);
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