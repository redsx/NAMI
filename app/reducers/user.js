import immutable from 'immutable'

import { 
    MERGE_USER_INFO
} from '../constants/user.js'

let defaultState = immutable.fromJS({});

export default function reducer(state = defaultState,action) {
    switch (action.type) {
        case MERGE_USER_INFO: {
            return state.merge(immutable.fromJS(action.payload));
        }
        default: {
            return state;
        }
    }
}