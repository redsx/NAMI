import { dispatchAction } from './common.js'
import { 
    SET_LEFT_MANAGER, 
    SET_RIGHT_MANAGER,
    SET_LOADING_STATE,
    PUSH_SNACKBAR,
    SHIFT_SNACKBAR,
    MESSAGE_CONTAINER_SCROLL,
 } from '../constants/pageUI.js'
// payload: bool
export const setLeftManager = dispatchAction(SET_LEFT_MANAGER);
export const setRightManager = dispatchAction(SET_RIGHT_MANAGER);
//payload: object { isShow: bool, text: string }
export const setLoadingState = dispatchAction(SET_LOADING_STATE);

export const msgContainerScroll = dispatchAction(MESSAGE_CONTAINER_SCROLL);

export const pushSnackbar = (content) => {
    dispatchAction(PUSH_SNACKBAR)(content);
    setTimeout(dispatchAction(SHIFT_SNACKBAR),3000);
}