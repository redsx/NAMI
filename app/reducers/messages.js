import immutable from 'immutable'
import recoderHandle from '../util/recorderHandle.js'

import {
    INIT_MESSAGES,
    ADD_MESSAGE,
    MERGE_MESSAGE,
    CLEAR_MESSAGES,
 } from '../constants/messages.js'

let defaultState = immutable.fromJS({});

export default function reducer(state = defaultState,action) {
    switch (action.type) {
        case INIT_MESSAGES: {
            return state.merge(immutable.fromJS(action.payload)); 
        }
        case ADD_MESSAGE: {
            return state.merge(immutable.fromJS(action.payload));
        }
        case MERGE_MESSAGE: {
            return state.mergeDeep(immutable.fromJS(action.payload));
        }
        case CLEAR_MESSAGES: {
            let messages = state;
            action.payload.forEach((history) => messages = messages.delete(history));
            return messages;
        }
        default: {
            return state;
        }
    }
}