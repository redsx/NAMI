import timeDeal from './time.js'
import immutable from 'immutable'
import language from '../config/language.js'

export default {
    getItemInfo: function(){
        const item = this.props.room,
              history = this.props.history || immutable.fromJS({});
        let secondary,
            time,
            avatar = item.get('avatar'),
            name = item.get('name');
        if(history.get('owner')){
            secondary = history.getIn(['owner','nickname'])+ ': ' + history.get('content') ;
            time = timeDeal.getTimeString(history.get('timestamp'));
        } else if(history.get('from')){
            secondary = history.get('content');
            time = timeDeal.getTimeString(history.get('timestamp'));
        } else {
            secondary = language.startConv;
            time = timeDeal.getTimeString(Date.now());
        }
        return {secondary,time,avatar,name}    
    },
    getUserInfo: function(){
        const user = this.props.user;
        const { avatar, onlineState, nickname , status } = user;
        const secondary = `[${onlineState || 'offline'}] ${status|| '...'}`;
        return {secondary,avatar,name: nickname};
    }
}