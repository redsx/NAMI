import { changeRoom, sendMessage } from '../actions/combin.js'
import immutable from 'immutable';

const handleMessage = {
    createMessage: function(user,content,isPrivate,type='text',to){
        const { _id, nickname, curRoom, avatar, token } = user;
        const timestamp = Date.now(),
              room = to || curRoom;
        if(content){
            const owner = { _id, avatar, nickname }
            const message = isPrivate ? {from: _id, to: room, type, content, room, token } : {token,_id,type,room,content};
            const preMessage = isPrivate? 
                {from: _id, to: room, type, content, room, timestamp, _id: 'P'+timestamp, isLoading: true}
                :{ _id: 'P'+timestamp, isLoading: true, room, content, timestamp, type, owner};
            return {isPrivate,message,preMessage};
        }
        return false;
    },
    redirectMessage: function (user,conetent,type,cb){
        return function(){
            const room = this.props.room;
            const isPrivate = !!room.get('isPrivate');
            const msg = handleMessage.createMessage(user,conetent,isPrivate,type,room.get('_id'));
            typeof cb === 'function' && cb();
            if(msg){
                sendMessage(isPrivate)(msg.message,msg.preMessage);
            }
            changeRoom(isPrivate)(room.get('_id'));
        }
    },
    getMessagePreview: function(message){
        let { type, content } = message;
        if(!!message.toJS){
            type = message.get('type');
            content = message.get('content');
        }
        switch(type){
            case 'text': return content;
            case 'file': return '[ file message ]';
            case 'image': return '[ image message ]';
            default: return '[ undefined ]';
        }
    }
}
export default handleMessage;