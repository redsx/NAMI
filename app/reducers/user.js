import immutable from 'immutable'

import { 
    MERGE_USER_INFO,
    PUSH_EXPRESSION,
} from '../constants/user.js'

let defaultState = immutable.fromJS({});

export default function reducer(state = defaultState,action) {
    switch (action.type) {
        case MERGE_USER_INFO: {
            return state.merge(immutable.fromJS(action.payload));
        }
        case PUSH_EXPRESSION: {
            let exp = state.get('expressions');
            if(!exp.includes(action.payload)){ exp = exp.push(action.payload); }
            return state.set('expressions',exp);
        }
        default: {
            return state;
        }
    }
}