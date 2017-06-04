import timeDeal from './time.js'
import immutable from 'immutable'
import handleMessage from '../util/message.js'
import language from '../config/language.js'

export default {
    getItemInfo: function(showPre = true){
        const item = this.props.room,
              history = this.props.history || immutable.fromJS({});
        let secondary,
            time,
            unreadCount = item.get('unread'),
            avatar = item.get('avatar'),
            name = item.get('name');
        if(history.get('owner')){
            secondary = history.getIn(['owner','nickname'])+ ': ' + handleMessage.getMessagePreview(history);
            time = timeDeal.getTimeString(history.get('timestamp'));
        } else if(history.get('from')){
            secondary = history.get('content');
            time = timeDeal.getTimeString(history.get('timestamp'));
        } else {
            secondary = language.startConv;
            time = timeDeal.getTimeString(Date.now());
        }
        if(!showPre) {
            secondary = '[ hidden ]';
            unreadCount = 0;
        }
        return { secondary, time, avatar, name, unreadCount }; 
    },
    getUserInfo: function(){
        const user = this.props.user;
        const { avatar, onlineState, nickname , status, device } = user;
        let sec = onlineState || 'offline';
        if(onlineState === 'online' && device){
            sec = device;
        }
        const secondary = `[ ${sec} ] ${status|| '...'}`;
        return {secondary,avatar,name: nickname};
    }
}