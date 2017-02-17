import timeDeal from './time.js'
import immutable from 'immutable'
import language from '../config/language.js'

export default {
    getItemInfo: function(item,history = immutable.fromJS({})){
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
    }
}