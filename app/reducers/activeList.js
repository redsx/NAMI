import immutable from 'immutable'
import recoderHandle from '../util/recorderHandle.js'

import {
    INIT_ROOM_LIST,
    ADD_ROOM_ITEM,
    PUSH_HISTORY,
    UNSHIFT_HISTORY,
    MERGE_ROOM_INFO,
    REMOVE_ROOM_ITEM,
    ADD_UNREAD_COUNT,
    CLEAR_UNREAD_COUNT,
 } from '../constants/activeList.js'
import browers from '../util/browers.js'

let defaultState = immutable.fromJS({});

export default function reducer(state = defaultState,action) {
    switch (action.type) {
        case INIT_ROOM_LIST: {
            return state.merge(immutable.fromJS(action.payload));
        }
        case ADD_ROOM_ITEM: {
            return state.merge(immutable.fromJS(action.payload));
        }
        case MERGE_ROOM_INFO: {
            const roomInfo = state.get(action.payload._id).merge(immutable.fromJS(action.payload));
            return state.set(action.payload._id,roomInfo);
        }
        case REMOVE_ROOM_ITEM: {
            return state.delete(action.payload);
        }
        case ADD_UNREAD_COUNT: {
            const count = state.getIn([action.payload._id, 'unread']) || 0;
            return state.setIn([action.payload._id, 'unread'], count+1);
        }
        case CLEAR_UNREAD_COUNT: {
            return state.setIn([action.payload._id, 'unread'], 0);
        }
        case PUSH_HISTORY: 
        case UNSHIFT_HISTORY: {
            let histories = state.getIn([action.payload._id,'histories'])
            histories = histories || immutable.fromJS([]);
            histories = action.type === UNSHIFT_HISTORY ? 
                immutable.fromJS(action.payload.histories).reverse().concat(histories)
                :histories.concat(immutable.fromJS(action.payload.histories));
            return state.setIn([action.payload._id,'histories'],histories);
        }
        default: {
            return state;
        }
    }
}