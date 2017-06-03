import immutable from 'immutable'

import { 
    MERGE_USER_INFO,
    PUSH_EXPRESSION,
    PUSH_BLOCK,
    DELETE_BLOCK,
    SET_ONLINE_STATE,
} from '../constants/user.js'

let defaultState = immutable.fromJS({
        blocks: [],
        onlineState: 'online',
});

export default function reducer(state = defaultState,action) {
    switch (action.type) {
        case MERGE_USER_INFO: {
            return state.merge(immutable.fromJS(action.payload));
        }
        case PUSH_EXPRESSION: {
            let exp = state.get('expressions');
            if(!exp.includes(action.payload)){ 
                exp = exp.push(action.payload); 
            }
            return state.set('expressions',exp);
        }
        case PUSH_BLOCK: {
            let blocks = state.get('blocks');
            if(!blocks.includes(action.payload)){
                blocks = blocks.push(action.payload);
            }
            return state.set('blocks',blocks);
        }
        case DELETE_BLOCK: {
            let blocks = state.get('blocks');
            const index = blocks.indexOf(action.payload);
            if(index !== -1){
                blocks = blocks.delete(index);            
            }
            return state.set('blocks',blocks);
        }
        case SET_ONLINE_STATE: {
            return state.set('onlineState', action.payload);
        }
        default: {
            return state;
        }
    }
}