import immutable from 'immutable'
import recoderHandle from '../util/recorderHandle.js'

import { 
    SET_LEFT_MANAGER, 
    SET_RIGHT_MANAGER,
    SET_LOADING_STATE,
    PUSH_SNACKBAR,
    SHIFT_SNACKBAR,
    MESSAGE_CONTAINER_SCROLL,
    SET_EXPRESSION_STATE,
    SET_NOTIFICATIONS_STATE,
    SET_MENU_STATE,
    SET_OWL_STATE,
} from '../constants/pageUI.js'
import browers from '../util/browers.js'

let defaultState = immutable.fromJS({
    snackbars: [],
    expressionState: false,
    menuState: true,
    owlState: false,
    language: browers.language,
    isSupportRecorder: false,
    leftManagerState: {isShow: false},
    rightManagerState: {
        isShow: false, 
        state: 'invite'
    },
    loadingState: {
        isShow: false, 
        text: ''
    },
    msgContainerScroll: {
        needScroll: true, 
        _id: Date.now()
    },
    notifications: {
        desktopAlerts: true,
        showDesktopPreviews: true,
        showMessagePreviews: true,
        showImages: true,
        showExpressions: true,
    }
});

export default function reducer(state = defaultState,action) {
    switch (action.type) {
        case SET_LEFT_MANAGER: {
            return state.set('leftManagerState',immutable.fromJS(action.payload));
        }
        case SET_RIGHT_MANAGER: {
            return state.set('rightManagerState',immutable.fromJS(action.payload));
        }
        case SET_LOADING_STATE: {
            return state.set('loadingState',immutable.fromJS(action.payload));
        }
        case PUSH_SNACKBAR: {
            let snackbars = state.get('snackbars').push(action.payload);
            return state.set('snackbars',snackbars);
        }
        case SHIFT_SNACKBAR: {
            let snackbars = state.get('snackbars');
            return state.set('snackbars',snackbars.slice(1,4));
        }
        case MESSAGE_CONTAINER_SCROLL: {
            return state.set('msgContainerScroll',immutable.fromJS({needScroll: action.payload, _id: Date.now()}));
        }
        case SET_EXPRESSION_STATE: {
            return state.set('expressionState',action.payload);
        }
        case SET_NOTIFICATIONS_STATE: {
            const notifications = state.get('notifications').merge(immutable.fromJS(action.payload));
            try{
                localStorage.setItem('notifications',JSON.stringify(notifications.toJS()));
            }catch(err){
                console.warn(err);
            }
            return state.set('notifications',notifications);
        }
        case SET_MENU_STATE: {
            let ret = state;
            if(action.payload) {
                ret = state.set('owlState', false);
            }
            return ret.set('menuState', action.payload);
        }
        case SET_OWL_STATE: {
            return state.set('owlState', action.payload)
        }
        default: {
            return state;
        }
    }
}